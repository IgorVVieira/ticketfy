import { CreatePayment } from "../../application/usecases/payment/create-payment";
import { UserService } from "./user.service";

export class PaymentService {
  constructor(
    private createPayment: CreatePayment,
    private userService: UserService
  ) {}

  // payment, buscar conta, e event, depois criar o pagamento e decrementar a quantidade

  // async create(userId: string, eventId: string): Promise<void> {
  //   const user = await this.userService.findById(userId);
  //   if (!user) throw new Error("User not found");

  //   await this.createPayment.execute(user, eventId);
  // }
}
