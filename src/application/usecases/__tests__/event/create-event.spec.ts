import { Event, EventProps } from "../../../../domain/entities/events/event";
import { User, UserProps } from "../../../../domain/entities/users/user";
import { IEventRepository } from "../../../../domain/repositories/events/event.repository";
import { CreateEvent } from "../../event/create-event";

const mockEventRepository: IEventRepository = {
  findAll: jest.fn(),
  findById: jest.fn(),
  findByOwner: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
};

describe("CreateEvent", () => {
  let createEvent: CreateEvent;

  beforeEach(() => {
    createEvent = new CreateEvent(mockEventRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create and return a new event", async () => {
    const userProps: UserProps = {
      name: "John Doe",
      email: "john.doe@example.com",
      password: "P@ssw0rd",
    };
    const user = User.create(userProps);

    const eventProps: EventProps = {
      id: "1",
      userId: user.getId(),
      name: "Event Name",
      datetime: "2023-08-15T18:00:00",
      location: "Event Location",
      participants_limit: 100,
      unitary_price: 50,
      avaliable_tickets: 100,
    };

    const expectedEvent: Event = Event.create(eventProps);

    (mockEventRepository.create as jest.Mock).mockResolvedValue(expectedEvent);

    const result = await createEvent.execute(user, eventProps);

    expect(result).toEqual(expectedEvent);
    expect(mockEventRepository.create).toHaveBeenCalledWith(expectedEvent);
    expect(mockEventRepository.create).toHaveBeenCalledTimes(1);
  });
});
