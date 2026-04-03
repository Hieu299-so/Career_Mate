export class CV {
  constructor(
    public id: number | null,
    public candidateId: number,
    public fileUrl: string,
    public createdAt: Date = new Date()
  ) {}

  public static fromRow(row: any): CV {
    return new CV(
      row.id,
      row.candidate_id,
      row.file_url,
      new Date(row.created_at)
    );
  }
}
