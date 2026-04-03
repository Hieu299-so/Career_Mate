import { Database } from 'sqlite';
import { getDatabase } from '../db';
import { CV } from '../entities/CV';

export interface ICVRepository {
  findById(id: number): Promise<CV | null>;
  findByCandidateId(candidateId: number): Promise<CV[]>;
  save(cv: CV): Promise<number>;
}

export class SqliteCVRepository implements ICVRepository {
  private async getDb(): Promise<Database> {
    return await getDatabase();
  }

  async findById(id: number): Promise<CV | null> {
    const db = await this.getDb();
    const row = await db.get('SELECT * FROM cvs WHERE id = ?', id);
    return row ? CV.fromRow(row) : null;
  }

  async findByCandidateId(candidateId: number): Promise<CV[]> {
    const db = await this.getDb();
    const rows = await db.all('SELECT * FROM cvs WHERE candidate_id = ?', candidateId);
    return rows.map(row => CV.fromRow(row));
  }

  async save(cv: CV): Promise<number> {
    const db = await this.getDb();
    const result = await db.run(
      `INSERT INTO cvs (candidate_id, file_url, created_at) 
       VALUES (?, ?, ?)`,
      cv.candidateId, cv.fileUrl, cv.createdAt.toISOString()
    );
    return result.lastID!;
  }
}
