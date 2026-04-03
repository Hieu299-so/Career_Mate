export class User {
  constructor(
    public id: number | null,
    public email: string,
    public password?: string,
    public fullName?: string,
    public role: 'candidate' | 'recruiter' | 'admin' = 'candidate',
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date()
  ) {}

  public static fromRow(row: any): User {
    return new User(
      row.id,
      row.email,
      row.password,
      row.full_name,
      row.role,
      new Date(row.created_at),
      new Date(row.updated_at)
    );
  }
}
