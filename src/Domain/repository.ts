import { Person } from "./person";
import { CpfValidator } from "./cpf.validator";

export interface Repository {
  addPerson(person: Person): Promise<string>;
  findByCpf(cpf: CpfValidator): Promise<Person | undefined>;
  relationship(
    cpf: string,
    person: Person
  ): Promise<{ cpf: string; cpf_other: string }>;
  relatedToCpf(cpf: CpfValidator): Promise<Person[] | undefined>;
  clean(): void;
}
