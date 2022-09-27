import { RecommendationsNotFound } from "../../src/Domain/exceptions/RecommendationsNotFound";
import { createMock } from "ts-auto-mock";
import { Repository } from "../../src/Domain/repository";
import { Recommendations } from "../../src/applications/Recommendations";
import { Person } from "../../src/Domain/person";

describe("Caso de Recomenção", () => {
  const mockRepository = createMock<Repository>();

  it("o cpf informado não tem recomendações", async () => {
    try {
      const mockPerson = Person.instance("vicente", "12323467843");

      jest.spyOn(mockRepository, "findByCpf").mockResolvedValue(mockPerson);

      jest.spyOn(mockRepository, "relatedToCpf").mockResolvedValue(undefined);

      await Recommendations.instance(mockRepository).make("12323467843");
    } catch (e) {
      expect(e).toBeInstanceOf(RecommendationsNotFound);
    }
  });

  it("retorna recomendações", async () => {
    const mockPerson = Person.instance("jesus", "12345675431");

    const mockFriends = [
      Person.instance("angel", "12345675430"),
      Person.instance("jose", "12345675439"),
    ];

    jest.spyOn(mockRepository, "findByCpf").mockResolvedValue(mockPerson);

    // const data = Recommendations.instance(mockRepository).make();
  });
});
