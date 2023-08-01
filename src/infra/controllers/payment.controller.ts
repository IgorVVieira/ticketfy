import { PaymentEnum } from "../../domain/entities/payment-enum";
import { EventService } from "../services/event.service";
import { PaymentService } from "../services/payment.service";
import { Request, Response } from "express";

export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly eventService: EventService
  ) {
    this.create = this.create.bind(this);
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const userId = req.userId;
      const { event_id, user_account_id, type, quantity } = req.body;

      const event = await this.eventService.findById(event_id);
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }

      const payment = await this.paymentService.create(
        userId,
        {
          event_id,
          user_account_id,
          value: event.unitaryPrice,
          type: type as PaymentEnum,
        },
        quantity
      );
      return res.status(201).json(payment);
    } catch (error: any) {
      if (error.message === "Not enough tickets available") {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: error.message });
    }
  }
}
