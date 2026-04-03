export class Application {
  constructor(
    public id: number | null,
    public candidateId: number,
    public jobId: number,
    public status: string = 'pending',
    public appliedAt: Date = new Date()
  ) {}

  public static fromRow(row: any): Application {
    return new Application(
      row.id,
      row.candidate_id,
      row.job_id,
      row.status,
      new Date(row.applied_at)
    );
  }
}
