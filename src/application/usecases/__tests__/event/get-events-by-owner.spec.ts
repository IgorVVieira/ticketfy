import { IEventRepository } from '../../../../domain/repositories/events/event.repository';
import { GetEventsByOwner } from '../../event/get-events-by-owner';

const mockEventRepository: IEventRepository = {
  findAll: jest.fn(),
  findById: jest.fn(),
  findByOwner: jest.fn(),
  create: jest.fn(),
  update: jest.fn()
};

describe('GetEventsByOwner', () => {
  let getEventsByOwner: GetEventsByOwner;

  beforeEach(() => {
    getEventsByOwner = new GetEventsByOwner(mockEventRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return a list of events owned by the given owner ID', async () => {
    const ownerId = 'user123';
    const mockEvents = [
      { id: '1', name: 'Event 1', datetime: '2023-08-15T18:00:00' },
      { id: '2', name: 'Event 2', datetime: '2023-08-20T20:00:00' }
    ];
    (mockEventRepository.findByOwner as jest.Mock).mockResolvedValue(
      mockEvents
    );

    const result = await getEventsByOwner.execute(ownerId);

    expect(result).toEqual(mockEvents);
    expect(mockEventRepository.findByOwner).toHaveBeenCalledWith(ownerId);
    expect(mockEventRepository.findByOwner).toHaveBeenCalledTimes(1);
  });
});
