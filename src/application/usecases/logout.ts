import { IAuthRepository } from "../../domain/repositories/auth.repository";

export class Logout {
  constructor(private readonly authRepository: IAuthRepository) {}

  execute(): void {
    try {
      this.authRepository.logout();
    } catch (error) {
      throw new Error("Error on logout");
    }
  }
}
