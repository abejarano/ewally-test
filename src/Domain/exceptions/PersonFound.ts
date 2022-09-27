import ExceptionDomain from "../Exception";

export class PersonFound extends ExceptionDomain {
  name = "person_found";

  constructor(cpf: string) {
    super();
    this.message = `O cpf ${cpf} já está cadastrado.`;
  }
}
