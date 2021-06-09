export class ManagedUserVm {
  constructor(
    public role: string,
    public email: string,
    public firstName: string | null,
    public langKey: string,
    public lastName: string | null,
    public password: string,
    public nom: string | null
  ) {}
}
