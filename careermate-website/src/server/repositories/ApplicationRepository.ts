import { Database } from 'sqlite';
import { getDatabase } from '../db';
import { Application } from '../entities/Application';

export interface IApplicationRepository {
  findById(id: number): Promise<Application | null>;
  findByCandidateId(candidateId: number): Promise<Application[]>;
  findByJobId(jobId: number): Promise<Application[]>;
  save(application: Application): Promise<number>;
  updateStatus(id: number, status: string): Promise<void>;
}

export class SqliteApplicationRepository implements IApplicationRepository {
  private async getDb(): Promise<Database> {
    return await getDatabase();
  }

  async findById(id: number): Promise<Application | null> {
    const db = await this.getDb();
    const row = await db.get('SELECT * FROM applications WHERE id = ?', id);
    return row ? Application.fromRow(row) : null;
  }

  async findByCandidateId(candidateId: number): Promise<Application[]> {
    const db = await this.getDb();
    const rows = await db.all('SELECT * FROM applications WHERE candidate_id = ?', candidateId);
    return rows.map(row => Application.fromRow(row));
  }

  async findByJobId(jobId: number): Promise<Application[]> {
    const db = await this.getDb();
    const rows = await db.all('SELECT * FROM applications WHERE job_id = ?', jobId);
    return rows.map(row => Application.fromRow(row));
  }

  async save(application: Application): Promise<number> {
    const db = await this.getDb();
    const result = await db.run(
      `INSERT INTO applications (candidate_id, job_id, status, applied_at) 
       VALUES (?, ?, ?, ?)`,
      application.candidateId, application.jobId, application.status, application.appliedAt.toISOString()
    );
    return result.lastID!;
  }

  async updateStatus(id: number, status: string): Promise<void> {
    const db = await this.getDb();
    await db.run('UPDATE applications SET status = ? WHERE id = ?', status, id);
  }
}
