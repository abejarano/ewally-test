import { Repository } from "../Domain/repository";
import { db } from "../app";
import { Person } from "../Domain/person";
import { CpfValidator } from "../Domain/cpf.validator";

export class RepositoryMemory implements Repository {
  static instance() {
    return new RepositoryMemory();
  }

  async findByCpf(cpf: CpfValidator): Promise<Person | undefined> {
    const person = db.filter((person) => person.cpf === cpf.getValue())[0];

    if (!person) {
      return undefined;
    }

    return Person.instance(person.name, person.cpf, person.friends);
  }

  async addPerson(person: Person): Promise<string> {
    db.push(person.toJson());

    return person.getCPF();
  }

  clean(): void {
    // @ts-ignore
    db = [];
  }

  relatedToCpf(cpf: CpfValidator): Promise<Person[] | undefined> {
    return Promise.resolve(undefined);
  }

  async relationship(
    cpf: string,
    person: Person
  ): Promise<{ cpf: string; cpf_other: string }> {
    return db.forEach((p: any, index: number) => {
      if (p.cpf === cpf) {
        const personJson = person.toJson();
        delete personJson.friends;

        db[index].friends.push(personJson);

        return {
          cpf: cpf,
          cpf_other: person.getCPF(),
        };
      }
    });
  }
}
