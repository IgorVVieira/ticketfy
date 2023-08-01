import { CreateTicket } from "../../application/usecases/ticket/create-ticket";
import { GetUserTickets } from "../../application/usecases/ticket/get-user-tickets";
import { Ticket } from "../../domain/entities/ticket";
import { CreateTicketDto } from "../dto/create-ticket.dto";
import { EventService } from "./event.service";
import { UserService } from "./user.service";

export class TicketService {
  constructor(
    private readonly createTicket: CreateTicket,
    private readonly getUserTickets: GetUserTickets,
    private readonly eventService: EventService,
    private readonly userService: UserService
  ) {
    this.create = this.create.bind(this);
    this.get = this.get.bind(this);
  }

  async create(
    createTicketDto: CreateTicketDto,
    quantity: number
  ): Promise<void> {
    const event = await this.eventService.findById(createTicketDto.eventId);
    const user = await this.userService.findById("id", createTicketDto.userId);
    if (!event) throw new Error("Event not found");
    if (!user) throw new Error("User not found");

    await this.createTicket.execute(createTicketDto, quantity, event);
  }

  async get(userId: string): Promise<Ticket[]> {
    return this.getUserTickets.execute(userId);
  }
}
