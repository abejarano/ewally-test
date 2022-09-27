import { Repository } from "../Domain/repository";
import { CpfValidator } from "../Domain/cpf.validator";
import { Person } from "../Domain/person";
import { PersonNotFound } from "../Domain/exceptions/PersonNotFound";

export class SearchPersonByCpf {
  constructor(private readonly repository: Repository) {}

  static instance(repository: Repository) {
    return new SearchPersonByCpf(repository);
  }

  async make(cpf: string): Promise<Person> {
    const cpfValidator = new CpfValidator(cpf);

    const person = await this.repository.findByCpf(cpfValidator);

    if (person) {
      return person;
    }

    throw new PersonNotFound(cpfValidator.getValue());
  }
}
