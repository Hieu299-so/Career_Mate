import { Database } from 'sqlite';
import { getDatabase } from '../db';
import { AIAnalysis } from '../entities/AIAnalysis';

export interface IAIAnalysisRepository {
  findById(id: number): Promise<AIAnalysis | null>;
  findByCvId(cvId: number): Promise<AIAnalysis | null>;
  save(analysis: AIAnalysis): Promise<number>;
}

export class SqliteAIAnalysisRepository implements IAIAnalysisRepository {
  private async getDb(): Promise<Database> {
    return await getDatabase();
  }

  async findById(id: number): Promise<AIAnalysis | null> {
    const db = await this.getDb();
    const row = await db.get('SELECT * FROM ai_analyses WHERE id = ?', id);
    return row ? AIAnalysis.fromRow(row) : null;
  }

  async findByCvId(cvId: number): Promise<AIAnalysis | null> {
    const db = await this.getDb();
    const row = await db.get('SELECT * FROM ai_analyses WHERE cv_id = ?', cvId);
    return row ? AIAnalysis.fromRow(row) : null;
  }

  async save(analysis: AIAnalysis): Promise<number> {
    const db = await this.getDb();
    const result = await db.run(
      `INSERT INTO ai_analyses (cv_id, score, feedback, created_at) 
       VALUES (?, ?, ?, ?)`,
      analysis.cvId, analysis.score, analysis.feedback, analysis.createdAt.toISOString()
    );
    return result.lastID!;
  }
}
