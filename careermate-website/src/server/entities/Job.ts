export class Job {
  constructor(
    public id: number | null,
    public recruiterId: number,
    public title: string,
    public description?: string,
    public requirements?: string,
    public salary?: string,
    public location?: string,
    public createdAt: Date = new Date()
  ) {}

  public static fromRow(row: any): Job {
    return new Job(
      row.id,
      row.recruiter_id,
      row.title,
      row.description,
      row.requirements,
      row.salary,
      row.location,
      new Date(row.created_at)
    );
  }
}
