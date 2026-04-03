import { Database } from 'sqlite';
import { getDatabase } from '../db';
import { CandidateProfile } from '../entities/CandidateProfile';

export interface ICandidateProfileRepository {
  findById(id: number): Promise<CandidateProfile | null>;
  findByUserId(userId: number): Promise<CandidateProfile | null>;
  save(profile: CandidateProfile): Promise<number>;
  findAll(): Promise<CandidateProfile[]>;
}

export class SqliteCandidateProfileRepository implements ICandidateProfileRepository {
  private async getDb(): Promise<Database> {
    return await getDatabase();
  }

  async findById(id: number): Promise<CandidateProfile | null> {
    const db = await this.getDb();
    const row = await db.get('SELECT * FROM candidate_profiles WHERE id = ?', id);
    return row ? CandidateProfile.fromRow(row) : null;
  }

  async findByUserId(userId: number): Promise<CandidateProfile | null> {
    const db = await this.getDb();
    const row = await db.get('SELECT * FROM candidate_profiles WHERE user_id = ?', userId);
    return row ? CandidateProfile.fromRow(row) : null;
  }

  async save(profile: CandidateProfile): Promise<number> {
    const db = await this.getDb();
    const result = await db.run(
      `INSERT INTO candidate_profiles (user_id, bio, education, experience, created_at) 
       VALUES (?, ?, ?, ?, ?)`,
      profile.userId, profile.bio, profile.education, profile.experience, profile.createdAt.toISOString()
    );
    return result.lastID!;
  }

  async findAll(): Promise<CandidateProfile[]> {
    const db = await this.getDb();
    const rows = await db.all('SELECT * FROM candidate_profiles');
    return rows.map(row => CandidateProfile.fromRow(row));
  }
}
