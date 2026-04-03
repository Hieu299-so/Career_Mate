export class AIAnalysis {
  constructor(
    public id: number | null,
    public cvId: number,
    public score: number,
    public feedback?: string,
    public createdAt: Date = new Date()
  ) {}

  public static fromRow(row: any): AIAnalysis {
    return new AIAnalysis(
      row.id,
      row.cv_id,
      row.score,
      row.feedback,
      new Date(row.created_at)
    );
  }
}
