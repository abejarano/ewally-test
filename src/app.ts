import * as dotenv from "dotenv";
import { Request, Response, Router } from "express";
import server from "./infrastructure/server";
import { PersonController } from "./infrastructure/http/PersonController";
import { RelationshipController } from "./infrastructure/http/RelationshipController";
export let db: any = [];

if (process.env.NODE_ENV === "dev") {
  dotenv.config({
    path: process.env.PWD + "/.env.dev",
  });
}

const app = server();
const route = Router();

route.post("/person", async (req: Request, res: Response) => {
  await PersonController.instance(res).addPerson(req.body.name, req.body.cpf);
});

route.get("/person/:cpf", async (req: Request, res: Response) => {
  await PersonController.instance(res).searchPerson(req.params.cpf);
});

route.delete("/clean", async (req: Request, res: Response) => {
  await PersonController.instance(res).databaseClean();
});

route.post("/relationship", async (req: Request, res: Response) => {
  await RelationshipController.instance(res).relationship(
    req.body.cpf,
    req.body.cpf_other
  );
});

route.get("/recommendations/:cpf", async (req: Request, res: Response) => {
  await RelationshipController.instance(res).recommendations(req.params.cpf);
});

app.use(route);

app.listen(process.env.APP_PORT, () =>
  console.log(`server running on port ${process.env.APP_PORT}`)
);
