import { CpfValidator } from "./cpf.validator";

export class Person {
  private readonly cpf;
  private readonly friends: Person[];

  constructor(private readonly name: string, cpf: string, friends?: Person[]) {
    this.cpf = new CpfValidator(cpf).getValue();

    this.friends = friends ?? [];
  }

  static instance(name: string, cpf: string, friends?: Person[]) {
    return new Person(name, cpf, friends);
  }

  getFriends(): Person[] {
    return this.friends;
  }

  getCPF(): string {
    return this.cpf;
  }

  getCPFValidator(): CpfValidator {
    return new CpfValidator(this.cpf);
  }

  toJson() {
    return {
      name: this.name,
      cpf: this.cpf,
      friends: this.friends,
    };
  }
}
