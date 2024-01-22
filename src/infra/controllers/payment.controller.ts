import { Request, Response } from 'express';
import { inject } from 'inversify';
import { BaseHttpController, controller, httpPost, interfaces, request, requestBody, response } from 'inversify-express-utils';

import { PaymentEnum } from '../../domain/entities/payment-enum';
import { EventService } from '../services/event.service';
import { PaymentService } from '../services/payment.service';
import { TYPES } from '../shared/types';
import { authMiddleware } from '../middlewares/auth.middleware';
import { FindEventDTO } from '../dto/find-event.dto';

@controller('/payments', authMiddleware)
export class PaymentController extends BaseHttpController implements interfaces.Controller {
  constructor(
    @inject(TYPES.PaymentService) private readonly paymentService: PaymentService,
    @inject(TYPES.EventService) private readonly eventService: EventService
  ) {
    super();
  }

  @httpPost('/')
  async create(@requestBody() findEVentDTO: FindEventDTO, @request() req: Request, @response() res: Response): Promise<Response> {
    try {
      const { userId } = req;
      const { eventId, userAccountId, type, quantity } = findEVentDTO;

      const event = await this.eventService.findById(eventId);
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }

      const payment = await this.paymentService.create(
        userId,
        {
          eventId,
          userAccountId,
          value: event.unitaryPrice,
          type: type as PaymentEnum
        },
        quantity
      );
      return res.status(201).json(payment);
    } catch (error) {
      if (error.message === 'Not enough tickets available') {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: error.message });
    }
  }
}
