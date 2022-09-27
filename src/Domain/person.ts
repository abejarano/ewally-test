import { CpfValidator } from "./cpf.validator";
import { PersonType } from "./PersonType";

export class Person {
  private readonly cpf;
  private readonly friends: PersonType[];

  constructor(
    private readonly name: string,
    cpf: string,
    friends?: PersonType[]
  ) {
    this.cpf = new CpfValidator(cpf).getValue();

    this.friends = friends ?? [];
  }

  static instance(name: string, cpf: string, friends?: PersonType[]) {
    return new Person(name, cpf, friends);
  }

  getFriends(): PersonType[] {
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
