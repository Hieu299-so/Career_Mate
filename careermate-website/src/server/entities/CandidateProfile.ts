export class CandidateProfile {
  constructor(
    public id: number | null,
    public userId: number,
    public bio?: string,
    public education?: string,
    public experience?: string,
    public createdAt: Date = new Date()
  ) {}

  public static fromRow(row: any): CandidateProfile {
    return new CandidateProfile(
      row.id,
      row.user_id,
      row.bio,
      row.education,
      row.experience,
      new Date(row.created_at)
    );
  }
}
