export class Recruiter {
  constructor(
    public id: number | null,
    public userId: number,
    public companyName: string,
    public description?: string,
    public website?: string,
    public createdAt: Date = new Date()
  ) {}

  public static fromRow(row: any): Recruiter {
    return new Recruiter(
      row.id,
      row.user_id,
      row.company_name,
      row.description,
      row.website,
      new Date(row.created_at)
    );
  }
}
