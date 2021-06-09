export class Account {
  constructor(
    public activated: boolean,
    public id: number,
    public authorities: any,
    public email: string,
    public firstName: string | null,
    public langKey: string,
    public lastName: string | null,
    public accountId: number | null,
    public login: string,
    public imageUrl: string | null
  ) {}
}
