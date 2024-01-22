import { Response } from 'express';
import { BaseHttpController, controller, httpPost, interfaces, queryParam, response } from 'inversify-express-utils';

import { TicketService } from '../services/ticket.service';
import { inject } from 'inversify';
import { TYPES } from '../shared/types';
import { authMiddleware } from '../middlewares/auth.middleware';
import { checkUserIdMatch } from '../middlewares/check-user-id-match.middleware';

@controller('/tickets', authMiddleware)
export class TicketControler extends BaseHttpController implements interfaces.Controller {
  constructor(@inject(TYPES.TicketService) private readonly ticketService: TicketService) {
    super();
  }

  @httpPost('/', checkUserIdMatch)
  async get(@queryParam('userId') userId: string, @response() res: Response): Promise<Response> {
    const tickets = await this.ticketService.get(userId);
    return res.status(200).json(tickets);
  }
}
