import { Event } from "../../../domain/entities/events/event";
import { IEventRepository } from "../../../domain/repositories/events/event.repository";
import { FindEvent } from "../event/find-event";

// Mock the event repository
const mockEventRepository: IEventRepository = {
  findAll: jest.fn(),
  findById: jest.fn(),
  findByOwner: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
};

describe("FindEvent", () => {
  let findEvent: FindEvent;

  beforeEach(() => {
    findEvent = new FindEvent(mockEventRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should find and return an existing event", async () => {
    const mockEvent: Event = Event.create({
      userId: "user123",
      name: "Sample Event",
      datetime: "2023-08-10T12:00:00",
      location: "Sample Location",
      participants_limit: 100,
      unitary_price: 20,
      avaliable_tickets: 50,
    });

    (mockEventRepository.findById as jest.Mock).mockResolvedValueOnce(
      mockEvent
    );

    const eventId = "event123";
    const event = await findEvent.execute(eventId);

    expect(mockEventRepository.findById).toHaveBeenCalledWith(eventId);

    expect(event).toEqual(mockEvent);
  });

  it("should return null when the event does not exist", async () => {
    (mockEventRepository.findById as jest.Mock).mockResolvedValueOnce(null);

    const eventId = "nonexistent123";
    const event = await findEvent.execute(eventId);

    expect(mockEventRepository.findById).toHaveBeenCalledWith(eventId);

    expect(event).toBeNull();
  });
});
