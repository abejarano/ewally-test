import { Repository } from "../Domain/repository";
import { db } from "../app";
import { Person } from "../Domain/person";
import { CpfValidator } from "../Domain/cpf.validator";
import { PersonType } from "../Domain/PersonType";

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

  async findFriendsByCpf(cpf: string): Promise<PersonType[]> {
    return db
      .map((person) => {
        if (person.cpf === cpf) {
          return person.friends as PersonType;
        }

        return undefined;
      })
      .filter((friends) => friends !== undefined);
  }

  async addPerson(person: Person): Promise<string> {
    db.push(person.toJson());

    return person.getCPF();
  }

  clean(): void {
    // @ts-ignore
    db = [];
  }

  async relationship(
    cpf: string,
    person: Person
  ): Promise<{ cpf: string; cpf_other: string }> {
    const index = this.findIndexToPersoninDB(cpf);
    const personJson = person.toJson();

    delete personJson.friends;
    db[index].friends.push(personJson);

    return {
      cpf: cpf,
      cpf_other: person.getCPF(),
    };
  }

  private findIndexToPersoninDB(cpf: string): number | undefined {
    db.forEach((p, index) => {
      if (p.cpf === cpf) {
        return index;
      }
    });

    return undefined;
  }
}
