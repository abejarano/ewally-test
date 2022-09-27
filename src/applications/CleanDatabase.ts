import { Repository } from "../Domain/repository";

export class CleanDatabase {
  constructor(private readonly repository: Repository) {}

  static instance(repository: Repository) {
    return new CleanDatabase(repository);
  }

  async make(): Promise<void> {
    await this.repository.clean();
  }
}
