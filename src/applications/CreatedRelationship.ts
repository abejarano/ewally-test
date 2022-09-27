import { Repository } from "../Domain/repository";
import { SearchPersonByCpf } from "./SearchPersonByCpf";
import { Person } from "../Domain/person";
import { CpfValidator } from "../Domain/cpf.validator";

export class CreatedRelationship {
  private findPerson: SearchPersonByCpf;

  constructor(private readonly repository: Repository) {
    this.findPerson = SearchPersonByCpf.instance(repository);
  }

  static instance(repository: Repository) {
    return new CreatedRelationship(repository);
  }

  private async existsCPF(cpf: string): Promise<Person> {
    return await this.findPerson.make(cpf);
  }

  async make(
    cpf: string,
    cpfOther: string
  ): Promise<{ cpf: string; cpf_other: string }> {
    await this.existsCPF(cpf);
    const person = await this.existsCPF(cpfOther);

    return await this.repository.relationship(CpfValidator.format(cpf), person);
  }
}
