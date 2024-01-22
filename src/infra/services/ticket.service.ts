import { inject, injectable } from 'inversify';

import { CreateTicket } from '../../application/usecases/ticket/create-ticket';
import { GetUserTickets } from '../../application/usecases/ticket/get-user-tickets';
import BusinessError from '../../core/domain/business-error';
import { Ticket } from '../../domain/entities/ticket';
import { CreateTicketDto } from '../dto/create-ticket.dto';
import { EventService } from './event.service';
import { ITicketServiceInterface } from './interfaces/ticket.service.interface';
import { UserService } from './user.service';
import { TYPES } from '../shared/types';

@injectable()
export class TicketService implements ITicketServiceInterface {
  constructor(
    private readonly createTicket: CreateTicket,
    private readonly getUserTickets: GetUserTickets,
    @inject(TYPES.EventService) private readonly eventService: EventService,
    @inject(TYPES.UserService) private readonly userService: UserService
  ) {
  }

  async create(
    createTicketDto: CreateTicketDto,
    quantity: number
  ): Promise<void> {
    const [event, user] = await Promise.all([
      this.eventService.findById(createTicketDto.eventId),
      this.userService.findById('id', createTicketDto.userId)
    ]);
    if (!event) throw new BusinessError('Event not found');
    if (!user) throw new BusinessError('User not found');

    await this.createTicket.execute(createTicketDto, quantity, event);
  }

  async get(userId: string): Promise<Ticket[]> {
    return this.getUserTickets.execute(userId);
  }
}
