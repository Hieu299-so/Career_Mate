export class Chat {
  constructor(
    public id: number | null,
    public userId: number,
    public message: string,
    public response?: string,
    public createdAt: Date = new Date()
  ) {}

  public static fromRow(row: any): Chat {
    return new Chat(
      row.id,
      row.user_id,
      row.message,
      row.response,
      new Date(row.created_at)
    );
  }
}
