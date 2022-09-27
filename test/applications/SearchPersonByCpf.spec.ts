import { Repository } from "../../src/Domain/repository";
import { createMock } from "ts-auto-mock";
import { SearchPersonByCpf } from "../../src/applications/SearchPersonByCpf";
import { InvalidCpf } from "../../src/Domain/exceptions/InvalidCpf";
import { PersonNotFound } from "../../src/Domain/exceptions/PersonNotFound";
import { Person } from "../../src/Domain/person";

describe("Caso de uso Buscar pessoa por cpf", () => {
  const mockRepository = createMock<Repository>();

  it("Envio de um cpf invalido", async () => {
    try {
      await SearchPersonByCpf.instance(mockRepository).make("235235234");
    } catch (e) {
      expect(e).toBeInstanceOf(InvalidCpf);
    }
  });

  it("Procuando uma pessoa que não existe", async () => {
    jest.spyOn(mockRepository, "findByCpf").mockResolvedValue(undefined);

    try {
      await SearchPersonByCpf.instance(mockRepository).make("70860822280");
    } catch (e) {
      expect(e).toBeInstanceOf(PersonNotFound);
    }
  });

  it("Retorna uma pessoa", async () => {
    const mockPerson = new Person("angel", "12323467843");

    jest.spyOn(mockRepository, "findByCpf").mockResolvedValue(mockPerson);

    const person = await SearchPersonByCpf.instance(mockRepository).make(
      "12323467843"
    );

    expect(person).toBe(mockPerson);
  });
});
