import { IEventRepository } from "../../../../domain/repositories/events/event.repository";
import { FindAllEvents } from "../../event/find-all-events";

const mockEventRepository: IEventRepository = {
  findAll: jest.fn(),
  findById: jest.fn(),
  findByOwner: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
};

describe("FindAllEvents", () => {
  let findAllEvents: FindAllEvents;

  beforeEach(() => {
    findAllEvents = new FindAllEvents(mockEventRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return an empty list of events when there are no events in the repository", async () => {
    (mockEventRepository.findAll as jest.Mock).mockResolvedValue([]);

    const result = await findAllEvents.execute();

    expect(result).toEqual([]);
    expect(mockEventRepository.findAll).toHaveBeenCalledTimes(1);
  });

  it("should return a list of events when there are events in the repository", async () => {
    const mockEvents = [
      { id: "1", name: "Event 1", datetime: "2023-08-15T18:00:00" },
      { id: "2", name: "Event 2", datetime: "2023-08-20T20:00:00" },
    ];
    (mockEventRepository.findAll as jest.Mock).mockResolvedValue(mockEvents);

    const result = await findAllEvents.execute();

    expect(result).toEqual(mockEvents);
    expect(mockEventRepository.findAll).toHaveBeenCalledTimes(1);
  });
});
