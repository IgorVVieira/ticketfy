import { Event, EventStatus } from '../../../../domain/entities/events/event';
import { IEventRepository } from '../../../../domain/repositories/events/event.repository';
import { UpdateEventStatus } from '../../event/update-event-status';

const mockEventRepository: IEventRepository = {
  findAll: jest.fn(),
  findById: jest.fn(),
  findByOwner: jest.fn(),
  create: jest.fn(),
  update: jest.fn()
};

describe('UpdateEventStatus', () => {
  let updateEventStatus: UpdateEventStatus;

  beforeEach(() => {
    updateEventStatus = new UpdateEventStatus(mockEventRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should update the status of an event successfully', async () => {
    const existingEvent = Event.create({
      userId: 'user123',
      name: 'Sample Event',
      datetime: '2023-08-10T12:00:00',
      location: 'Sample Location',
      participants_limit: 100,
      unitary_price: 20,
      avaliable_tickets: 50,
      status: EventStatus.OPEN
    });

    (mockEventRepository.findById as jest.Mock).mockResolvedValueOnce(
      existingEvent.getId()
    );

    const updatedEvent = { ...existingEvent, status: EventStatus.CANCELED };

    (mockEventRepository.update as jest.Mock).mockResolvedValueOnce(
      updatedEvent
    );

    const eventStatus = 'CANCELED';
    const event = await updateEventStatus.execute(existingEvent, eventStatus);

    expect(mockEventRepository.update).toHaveBeenCalledWith(
      existingEvent.getId(),
      updatedEvent
    );

    expect(event).toEqual(updatedEvent);
  });
});
