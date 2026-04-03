import { Database } from 'sqlite';
import { getDatabase } from '../db';
import { User } from '../entities/User';

export interface IUserRepository {
  findById(id: number): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  save(user: User): Promise<number>;
  update(user: User): Promise<void>;
  findAll(): Promise<User[]>;
}

export class SqliteUserRepository implements IUserRepository {
  private async getDb(): Promise<Database> {
    return await getDatabase();
  }

  async findById(id: number): Promise<User | null> {
    const db = await this.getDb();
    const row = await db.get('SELECT * FROM users WHERE id = ?', id);
    return row ? User.fromRow(row) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const db = await this.getDb();
    const row = await db.get('SELECT * FROM users WHERE email = ?', email);
    return row ? User.fromRow(row) : null;
  }

  async save(user: User): Promise<number> {
    const db = await this.getDb();
    const result = await db.run(
      `INSERT INTO users (email, password, full_name, role, created_at, updated_at) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      user.email, user.password, user.fullName, user.role, user.createdAt.toISOString(), user.updatedAt.toISOString()
    );
    return result.lastID!;
  }

  async update(user: User): Promise<void> {
    const db = await this.getDb();
    await db.run(
      `UPDATE users SET email = ?, password = ?, full_name = ?, role = ?, updated_at = ? 
       WHERE id = ?`,
      user.email, user.password, user.fullName, user.role, new Date().toISOString(), user.id
    );
  }

  async findAll(): Promise<User[]> {
    const db = await this.getDb();
    const rows = await db.all('SELECT * FROM users');
    return rows.map(row => User.fromRow(row));
  }
}
