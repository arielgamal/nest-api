export class AllUsersDTO {
  constructor(
    private readonly id: number,
    readonly name: string,
    readonly email: string,
    readonly acceptTerms: boolean,
  ) {}
}
