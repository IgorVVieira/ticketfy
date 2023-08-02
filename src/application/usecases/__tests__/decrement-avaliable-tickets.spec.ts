import { Event, EventStatus } from "../../../domain/entities/events/event";
import { IEventRepository } from "../../../domain/repositories/events/event.repository";
import { DecrementAvaliableTickets } from "../event/decrement-avaliable-tickets";

const mockEventRepository: IEventRepository = {
  findAll: jest.fn(),
  findById: jest.fn(),
  findByOwner: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
};

describe("DecrementAvaliableTickets", () => {
  let decrementAvaliableTickets: DecrementAvaliableTickets;

  beforeEach(() => {
    decrementAvaliableTickets = new DecrementAvaliableTickets(
      mockEventRepository
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should decrement the available tickets of an event", async () => {
    const existingEvent = Event.create({
      userId: "user123",
      name: "Sample Event",
      datetime: "2023-08-01T10:00:00Z",
      location: "Sample Location",
      participants_limit: 100,
      unitary_price: 50,
      avaliable_tickets: 50,
      status: EventStatus.OPEN,
    });

    const decrementQuantity = 10;
    existingEvent.decrementAvailableTickets(decrementQuantity);

    (mockEventRepository.update as jest.Mock).mockResolvedValueOnce(
      existingEvent
    );

    await decrementAvaliableTickets.execute(existingEvent, decrementQuantity);

    expect(mockEventRepository.update).toHaveBeenCalledWith(
      existingEvent.getId(),
      existingEvent
    );
  });
});
