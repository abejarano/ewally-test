import ExceptionDomain from "../Exception";

export class InvalidCpf extends ExceptionDomain {
  name = "invalid_cpf";
  message = "CPF inválido.";
}
