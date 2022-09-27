import { createMock } from "ts-auto-mock";
import { Repository } from "../../src/Domain/repository";
import { Person } from "../../src/Domain/person";
import { AddPerson } from "../../src/applications/AddPerson";
import { InvalidCpf } from "../../src/Domain/exceptions/InvalidCpf";
import { PersonFound } from "../../src/Domain/exceptions/PersonFound";

describe("Caso de Cadastrar Pessoas", () => {
  const mockRepository = createMock<Repository>();

  it("cpf invalido", async () => {
    try {
      Person.instance("Jose", "70860822", []);
    } catch (e) {
      expect(e).toBeInstanceOf(InvalidCpf);
      expect(e.getMessage()).toEqual("CPF inválido.");
    }
  });

  it("cadastra com sucesso", async () => {
    const mockPerson = Person.instance("Jose", "70860822282", []);

    jest.spyOn(mockRepository, "findByCpf").mockResolvedValue(undefined);

    jest
      .spyOn(mockRepository, "addPerson")
      .mockResolvedValue(mockPerson.getCPF());

    const r = await AddPerson.instance(mockRepository).make(mockPerson);

    expect(r).toBeDefined();
    expect(r).toBe(mockPerson.getCPF());
  });

  it("pesso já está cadastrada na base", async () => {
    const mockPerson = Person.instance("Jose", "70860822282", []);

    jest.spyOn(mockRepository, "findByCpf").mockResolvedValue(mockPerson);

    try {
      await AddPerson.instance(mockRepository).make(mockPerson);
    } catch (e) {
      expect(e).toBeDefined();
      expect(e).toBeInstanceOf(PersonFound);
      expect(e.getMessage()).toEqual(
        `O cpf ${mockPerson.getCPF()} já está cadastrado.`
      );
    }
  });
});
