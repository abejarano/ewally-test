import { Person } from "./person";
import { CpfValidator } from "./cpf.validator";
import { PersonType } from "./PersonType";

export interface Repository {
  addPerson(person: Person): Promise<string>;
  findByCpf(cpf: CpfValidator): Promise<Person | undefined>;
  relationship(
    cpf: string,
    person: Person
  ): Promise<{ cpf: string; cpf_other: string }>;
  clean(): void;

  findFriendsByCpf(cpf: string): Promise<PersonType[]>;
}
