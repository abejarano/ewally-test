import { Repository } from "../Domain/repository";
import { CpfValidator } from "../Domain/cpf.validator";
import { SearchPersonByCpf } from "./SearchPersonByCpf";
import { Person } from "../Domain/person";
import { PersonType } from "../Domain/PersonType";
import { RecommendationsNotFound } from "../Domain/exceptions/RecommendationsNotFound";

export class Recommendations {
  constructor(private readonly repository: Repository) {}

  static instance(repository: Repository) {
    return new Recommendations(repository);
  }

  private async existsCPF(cpf: string): Promise<Person> {
    return await SearchPersonByCpf.instance(this.repository).make(cpf);
  }

  private async searchRecommendation(
    myFriends: PersonType[],
    friendsOfMyFriends: PersonType[]
  ): Promise<string[]> {
    let recommendations = [];

    // friendsOfMyFriends.forEach(async (friendOfMyfriend: PersonType) => {

    for (const friendOfMyfriend of friendsOfMyFriends) {
      let found = false;
      for (const myFriend of myFriends) {
        if (myFriend.cpf === friendOfMyfriend.cpf) {
          found = true;
          break;
        }
      }

      if (!found) {
        recommendations.push(friendOfMyfriend.cpf);

        const friends = await this.repository.findFriendsByCpf(
          friendOfMyfriend.cpf
        );

        if (friends.length > 0) {
          recommendations[0].concat(
            this.searchRecommendation(myFriends, friends)
          );
        }
      }
    }

    return recommendations;
  }

  async make(cpf: string): Promise<any> {
    const cpfValidator = new CpfValidator(cpf);
    const person = await this.existsCPF(cpfValidator.getValue());

    const recommendations = [];

    for (const myFriend of person.getFriends()) {
      const friendsOfMyFriends = await this.repository.findFriendsByCpf(
        myFriend.cpf
      );

      if (friendsOfMyFriends.length > 0) {
        recommendations.push(
          await this.searchRecommendation(
            person.getFriends(),
            friendsOfMyFriends
          )
        );
      }
    }

    if (recommendations.length === 0) {
      throw new RecommendationsNotFound(cpf);
    }

    return recommendations[0];
  }
}
