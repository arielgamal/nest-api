export class FindByOneDTO {
  constructor(
    private readonly id: number,
    readonly name: string,
    readonly email: string,
    readonly createdAt: string,
    readonly acceptTerms: boolean,
  ) {}
}
