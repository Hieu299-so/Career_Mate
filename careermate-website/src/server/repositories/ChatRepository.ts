import { Database } from 'sqlite';
import { getDatabase } from '../db';
import { Chat } from '../entities/Chat';

export interface IChatRepository {
  findById(id: number): Promise<Chat | null>;
  findByUserId(userId: number): Promise<Chat[]>;
  save(chat: Chat): Promise<number>;
}

export class SqliteChatRepository implements IChatRepository {
  private async getDb(): Promise<Database> {
    return await getDatabase();
  }

  async findById(id: number): Promise<Chat | null> {
    const db = await this.getDb();
    const row = await db.get('SELECT * FROM chats WHERE id = ?', id);
    return row ? Chat.fromRow(row) : null;
  }

  async findByUserId(userId: number): Promise<Chat[]> {
    const db = await this.getDb();
    const rows = await db.all('SELECT * FROM chats WHERE user_id = ?', userId);
    return rows.map(row => Chat.fromRow(row));
  }

  async save(chat: Chat): Promise<number> {
    const db = await this.getDb();
    const result = await db.run(
      `INSERT INTO chats (user_id, message, response, created_at) 
       VALUES (?, ?, ?, ?)`,
      chat.userId, chat.message, chat.response, chat.createdAt.toISOString()
    );
    return result.lastID!;
  }
}
