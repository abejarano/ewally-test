import { RecommendationsNotFound } from "../../src/Domain/exceptions/RecommendationsNotFound";
import { createMock } from "ts-auto-mock";
import { Repository } from "../../src/Domain/repository";
import { Recommendations } from "../../src/applications/Recommendations";
import { Person } from "../../src/Domain/person";
import {
  personWithFriends,
  personWithFriendsOfJesus,
  personWithFriendsOfMari,
} from "../db.mock";

describe("Caso de Recomenção", () => {
  const mockRepository = createMock<Repository>();

  it("o cpf informado não tem recomendações", async () => {
    try {
      const mockPerson = Person.instance("vicente", "12323467843");

      jest.spyOn(mockRepository, "findByCpf").mockResolvedValue(mockPerson);

      await Recommendations.instance(mockRepository).make(mockPerson.getCPF());
    } catch (e) {
      expect(e).toBeInstanceOf(RecommendationsNotFound);
    }
  });

  it("retorna recomendações", async () => {
    const mockPersonWithFriends = Person.instance(
      personWithFriends.name,
      personWithFriends.cpf,
      personWithFriends.friends
    );

    const recommendedCpf = [
      "012.233.212-19",
      "612.239.212-19",
      "224.563.212-22",
    ];

    jest
      .spyOn(mockRepository, "findByCpf")
      .mockResolvedValue(mockPersonWithFriends);

    jest
      .spyOn(mockRepository, "findFriendsByCpf")
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce(personWithFriendsOfJesus.friends)
      .mockResolvedValueOnce(personWithFriendsOfMari.friends);

    const recommendations = await Recommendations.instance(mockRepository).make(
      mockPersonWithFriends.getCPF()
    );

    expect(recommendations.length).toEqual(3);

    recommendations.forEach((e) => {
      expect(recommendedCpf).toContain(e);
    });
  });
});
