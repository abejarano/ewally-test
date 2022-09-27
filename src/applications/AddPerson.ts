import { Repository } from "../Domain/repository";
import { Person } from "../Domain/person";
import { CpfValidator } from "../Domain/cpf.validator";
import { PersonFound } from "../Domain/exceptions/PersonFound";

export class AddPerson {
  constructor(private readonly repository: Repository) {}

  static instance(repository: Repository) {
    return new AddPerson(repository);
  }

  private async personExists(cpf: CpfValidator): Promise<boolean> {
    const person = await this.repository.findByCpf(cpf);

    return !!person;
  }

  async make(person: Person): Promise<string> {
    if (await this.personExists(person.getCPFValidator())) {
      throw new PersonFound(person.getCPF());
    }

    return this.repository.addPerson(person);
  }
}
