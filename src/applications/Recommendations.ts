import { Repository } from "../Domain/repository";
import { CpfValidator } from "../Domain/cpf.validator";
import { SearchPersonByCpf } from "./SearchPersonByCpf";
import { RecommendationsNotFound } from "../Domain/exceptions/RecommendationsNotFound";

export class Recommendations {
  constructor(private readonly repository: Repository) {}

  static instance(repository: Repository) {
    return new Recommendations(repository);
  }

  private async existsCPF(cpf: string): Promise<void> {
    await SearchPersonByCpf.instance(this.repository).make(cpf);
  }

  async make(cpf: string): Promise<any> {
    const cpfValidator = new CpfValidator(cpf);
    await this.existsCPF(cpf);

    const data = await this.repository.relatedToCpf(cpfValidator);

    if (!data) {
      throw new RecommendationsNotFound(cpf);
    }

    return data.sort(
      (p1, p2) => p1.getFriends().length - p2.getFriends().length
    );
  }
}
