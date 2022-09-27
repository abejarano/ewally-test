import { createMock } from "ts-auto-mock";
import { Repository } from "../../src/Domain/repository";
import { Person } from "../../src/Domain/person";
import { CreatedRelationship } from "../../src/applications/CreatedRelationship";
import { PersonNotFound } from "../../src/Domain/exceptions/PersonNotFound";

describe("Caso de uso criar relacionamento", () => {
  const mockRepository = createMock<Repository>();
  const mockPerson = Person.instance("Jose", "70860822282", []);

  it("Criar relacionamento com suscesso", async () => {
    const mockPersonTwo = Person.instance("Angel", "70860822280", []);
    const mockRelationshop = {
      cpf: mockPerson.getCPF(),
      cpf_other: mockPersonTwo.getCPF(),
    };

    jest
      .spyOn(mockRepository, "findByCpf")
      .mockResolvedValueOnce(mockPerson)
      .mockResolvedValueOnce(mockPersonTwo);

    jest
      .spyOn(mockRepository, "relationship")
      .mockResolvedValue(mockRelationshop);

    const d = await CreatedRelationship.instance(mockRepository).make(
      mockPerson.getCPF(),
      mockPersonTwo.getCPF()
    );

    expect(d.cpf).toBeDefined();
    expect(d.cpf_other).toBeDefined();
    expect(d).toBe(mockRelationshop);
  });

  it("Falha no relacionamento, cpf não cadastrado", async () => {
    jest
      .spyOn(mockRepository, "findByCpf")
      .mockResolvedValueOnce(mockPerson)
      .mockResolvedValueOnce(undefined);

    try {
      const d = await CreatedRelationship.instance(mockRepository).make(
        mockPerson.getCPF(),
        "70860822280"
      );
    } catch (e) {
      expect(e).toBeInstanceOf(PersonNotFound);
      expect(e.getMessage()).toEqual(`O 708.608.222-80 não está cadastrado.`);
    }
  });
});
