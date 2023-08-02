import { Event, EventProps } from "../../../../domain/entities/events/event";
import { TicketProps } from "../../../../domain/entities/ticket";
import { ITicketRepository } from "../../../../domain/repositories/ticket.repository";
import { CreateTicket } from "../../ticket/create-ticket";

const mockTicketRepository: ITicketRepository = {
  createMany: jest.fn(),
  getByUserId: jest.fn(),
  getByEventId: jest.fn(),
};

describe("CreateTicket", () => {
  let createTicket: CreateTicket;

  beforeEach(() => {
    createTicket = new CreateTicket(mockTicketRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create multiple tickets and decrement available tickets", async () => {
    const eventProps: EventProps = {
      userId: "user123",
      name: "Event Name",
      datetime: "2023-08-15T18:00:00",
      location: "Event Location",
      participants_limit: 100,
      unitary_price: 50,
      avaliable_tickets: 10,
    };

    const event = Event.create(eventProps);
    const ticketProps: TicketProps = {
      eventId: event.getId(),
      userId: "user123",
      paymentId: "payment123",
    };

    const quantity = 3;

    await createTicket.execute(ticketProps, quantity, event);
  });

  it("should throw an error when there are not enough available tickets", async () => {
    // Arrange
    const eventProps: EventProps = {
      userId: "user123",
      name: "Event Name",
      datetime: "2023-08-15T18:00:00",
      location: "Event Location",
      participants_limit: 100,
      unitary_price: 50,
      avaliable_tickets: 2,
    };

    const event = Event.create(eventProps);
    const ticketProps: TicketProps = {
      eventId: event.getId(),
      userId: "user123",
      paymentId: "payment123",
    };

    const quantity = 3;

    await expect(
      createTicket.execute(ticketProps, quantity, event)
    ).rejects.toThrowError("Not enough tickets available");
    expect(mockTicketRepository.createMany).not.toHaveBeenCalled();
  });
});
