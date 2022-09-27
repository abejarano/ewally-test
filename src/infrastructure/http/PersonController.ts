import { AddPerson } from "../../applications/AddPerson";
import { RepositoryMemory } from "../RepositoryMemory";
import { Person } from "../../Domain/person";
import { Response } from "express";
import ExceptionDomain from "../../Domain/Exception";
import { SearchPersonByCpf } from "../../applications/SearchPersonByCpf";
import { CleanDatabase } from "../../applications/CleanDatabase";

export class PersonController {
  constructor(private readonly res: Response) {}

  static instance(res: Response): PersonController {
    return new PersonController(res);
  }

  async addPerson(name: string, cpf: string): Promise<void> {
    try {
      await new AddPerson(RepositoryMemory.instance()).make(
        Person.instance(name, cpf)
      );
      this.res.status(200).send("Pessoa cadastrada com sucesso.");
    } catch (e) {
      if (e instanceof ExceptionDomain) {
        this.res.status(400).send(e.message);
        return;
      }

      this.res.status(500).send(e.message);
    }
  }

  async searchPerson(cpf: string): Promise<void> {
    try {
      const person = await SearchPersonByCpf.instance(
        RepositoryMemory.instance()
      ).make(cpf);

      this.res.status(200).json(person.toJson());
    } catch (e) {
      if (e instanceof ExceptionDomain) {
        this.res.status(400).send(e.message);
        return;
      }

      this.res.status(500).send(e.message);
    }
  }

  async databaseClean(): Promise<void> {
    try {
      await CleanDatabase.instance(RepositoryMemory.instance()).make();
      this.res.status(200).send("clean processado com sucesso.");
    } catch (e) {
      this.res.status(500).send(e.message);
    }
  }
}
