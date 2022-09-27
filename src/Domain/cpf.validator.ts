import { InvalidCpf } from "./exceptions/InvalidCpf";

export class CpfValidator {
  private regex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;

  constructor(private readonly cpf: string) {
    const cpfFormat = CpfValidator.format(cpf);

    if (!this.regex.test(cpfFormat)) {
      throw new InvalidCpf(cpf);
    }

    this.cpf = cpfFormat;
  }

  static format(cpf: string): string {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }

  public getValue(): string {
    return this.cpf;
  }
}
