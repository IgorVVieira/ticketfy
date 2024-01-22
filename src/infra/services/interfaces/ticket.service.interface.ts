import { Ticket } from '../../../domain/entities/ticket';
import { CreateTicketDto } from '../../dto/create-ticket.dto';

export interface ITicketServiceInterface {
  create(
    createTicketDto: CreateTicketDto,
    quantity: number
  ): Promise<void>;
  get(userId: string): Promise<Ticket[]>;
}
