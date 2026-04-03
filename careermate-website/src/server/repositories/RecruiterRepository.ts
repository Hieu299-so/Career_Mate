import { Database } from 'sqlite';
import { getDatabase } from '../db';
import { Recruiter } from '../entities/Recruiter';

export interface IRecruiterRepository {
  findById(id: number): Promise<Recruiter | null>;
  findByUserId(userId: number): Promise<Recruiter | null>;
  save(recruiter: Recruiter): Promise<number>;
  findAll(): Promise<Recruiter[]>;
}

export class SqliteRecruiterRepository implements IRecruiterRepository {
  private async getDb(): Promise<Database> {
    return await getDatabase();
  }

  async findById(id: number): Promise<Recruiter | null> {
    const db = await this.getDb();
    const row = await db.get('SELECT * FROM recruiters WHERE id = ?', id);
    return row ? Recruiter.fromRow(row) : null;
  }

  async findByUserId(userId: number): Promise<Recruiter | null> {
    const db = await this.getDb();
    const row = await db.get('SELECT * FROM recruiters WHERE user_id = ?', userId);
    return row ? Recruiter.fromRow(row) : null;
  }

  async save(recruiter: Recruiter): Promise<number> {
    const db = await this.getDb();
    const result = await db.run(
      `INSERT INTO recruiters (user_id, company_name, description, website, created_at) 
       VALUES (?, ?, ?, ?, ?)`,
      recruiter.userId, recruiter.companyName, recruiter.description, recruiter.website, recruiter.createdAt.toISOString()
    );
    return result.lastID!;
  }

  async findAll(): Promise<Recruiter[]> {
    const db = await this.getDb();
    const rows = await db.all('SELECT * FROM recruiters');
    return rows.map(row => Recruiter.fromRow(row));
  }
}
