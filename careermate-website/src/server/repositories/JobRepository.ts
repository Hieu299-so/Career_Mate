import { Database } from 'sqlite';
import { getDatabase } from '../db';
import { Job } from '../entities/Job';

export interface IJobRepository {
  findById(id: number): Promise<Job | null>;
  findByRecruiterId(recruiterId: number): Promise<Job[]>;
  save(job: Job): Promise<number>;
  findAll(): Promise<Job[]>;
}

export class SqliteJobRepository implements IJobRepository {
  private async getDb(): Promise<Database> {
    return await getDatabase();
  }

  async findById(id: number): Promise<Job | null> {
    const db = await this.getDb();
    const row = await db.get('SELECT * FROM jobs WHERE id = ?', id);
    return row ? Job.fromRow(row) : null;
  }

  async findByRecruiterId(recruiterId: number): Promise<Job[]> {
    const db = await this.getDb();
    const rows = await db.all('SELECT * FROM jobs WHERE recruiter_id = ?', recruiterId);
    return rows.map(row => Job.fromRow(row));
  }

  async save(job: Job): Promise<number> {
    const db = await this.getDb();
    const result = await db.run(
      `INSERT INTO jobs (recruiter_id, title, description, requirements, salary, location, created_at) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      job.recruiterId, job.title, job.description, job.requirements, job.salary, job.location, job.createdAt.toISOString()
    );
    return result.lastID!;
  }

  async findAll(): Promise<Job[]> {
    const db = await this.getDb();
    const rows = await db.all('SELECT * FROM jobs');
    return rows.map(row => Job.fromRow(row));
  }
}
