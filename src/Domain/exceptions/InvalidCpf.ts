import ExceptionDomain from "../Exception";

export class InvalidCpf extends ExceptionDomain {
  name = "invalid_cpf";

  constructor(cpf: string) {
    super();
    this.message = `CPF ${cpf} inválido.`;
  }
}
