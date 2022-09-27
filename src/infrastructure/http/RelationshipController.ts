import { Response } from "express";
import ExceptionDomain from "../../Domain/Exception";
import { CreatedRelationship } from "../../applications/CreatedRelationship";
import { RepositoryMemory } from "../RepositoryMemory";
import { Recommendations } from "../../applications/Recommendations";

export class RelationshipController {
  constructor(private readonly res: Response) {}

  static instance(res: Response): RelationshipController {
    return new RelationshipController(res);
  }

  async relationship(cpf: string, cpfOther: string): Promise<void> {
    try {
      await new CreatedRelationship(RepositoryMemory.instance()).make(
        cpf,
        cpfOther
      );
      this.res.status(200).send("Relacionamento feita com sucesso.");
    } catch (e) {
      if (e instanceof ExceptionDomain) {
        this.res.status(400).send(e.message);
        return;
      }

      this.res.status(500).send(e.message);
    }
  }

  async recommendations(cpf: string): Promise<void> {
    try {
      const data = await new Recommendations(RepositoryMemory.instance()).make(
        cpf
      );

      this.res.status(200).json(data);
    } catch (e) {
      if (e instanceof ExceptionDomain) {
        this.res.status(400).send(e.message);
        return;
      }

      this.res.status(500).send(e.message);
    }
  }
}
