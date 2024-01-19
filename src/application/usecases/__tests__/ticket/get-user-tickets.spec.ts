import { Ticket } from '../../../../domain/entities/ticket';
import { ITicketRepository } from '../../../../domain/repositories/ticket.repository';
import { GetUserTickets } from '../../ticket/get-user-tickets';

const mockTicketRepository: ITicketRepository = {
  createMany: jest.fn(),
  getByUserId: jest.fn(),
  getByEventId: jest.fn()
};

describe('GetUserTickets', () => {
  let getUserTickets: GetUserTickets;

  beforeEach(() => {
    getUserTickets = new GetUserTickets(mockTicketRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return an array of user tickets', async () => {
    const userId = 'user123';
    const ticketValues = [
      {
        id: 'ticket1',
        eventId: 'event123',
        userId: userId,
        paymentId: 'payment123'
      },
      {
        id: 'ticket2',
        eventId: 'event456',
        userId: userId,
        paymentId: 'payment456'
      }
    ];

    const mockTickets: Ticket[] = ticketValues.map((ticketValue) => {
      return Ticket.create(ticketValue);
    });

    (mockTicketRepository.getByUserId as jest.Mock).mockResolvedValue(
      mockTickets
    );

    const result = await getUserTickets.execute(userId);

    expect(result).toEqual(mockTickets);
    expect(mockTicketRepository.getByUserId).toHaveBeenCalledWith(userId);
    expect(mockTicketRepository.getByUserId).toHaveBeenCalledTimes(1);
  });

  it('should return an empty array when the user has no tickets', async () => {
    const userId = 'user123';

    (mockTicketRepository.getByUserId as jest.Mock).mockResolvedValue([]);

    const result = await getUserTickets.execute(userId);

    expect(result).toEqual([]);
    expect(mockTicketRepository.getByUserId).toHaveBeenCalledWith(userId);
    expect(mockTicketRepository.getByUserId).toHaveBeenCalledTimes(1);
  });
});
