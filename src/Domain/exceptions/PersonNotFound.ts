import ExceptionDomain from "../Exception";

export class PersonNotFound extends ExceptionDomain {
  name = "person_not_found";

  constructor(cpf: string) {
    super();
    this.message = `O ${cpf} não está cadastrado.`;
  }
}
