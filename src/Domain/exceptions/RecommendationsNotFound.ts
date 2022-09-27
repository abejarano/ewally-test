import ExceptionDomain from "../Exception";

export class RecommendationsNotFound extends ExceptionDomain {
  name = "recommendations_not_found";

  constructor(cpf: string) {
    super();
    this.message = `O CPF ${cpf} não tem relacionamento`;
  }
}
