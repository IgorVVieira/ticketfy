import { Event, EventProps } from "../../../../domain/entities/events/event";
import { Payment, PaymentProps } from "../../../../domain/entities/payment";
import { PaymentEnum } from "../../../../domain/entities/payment-enum";
import { IPaymentRepository } from "../../../../domain/repositories/payment.repository";
import { CreatePayment } from "../../payment/create-payment";

const mockPaymentRepository: IPaymentRepository = {
  create: jest.fn(),
};

describe("CreatePayment", () => {
  let createPayment: CreatePayment;

  beforeEach(() => {
    createPayment = new CreatePayment(mockPaymentRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a new payment", async () => {
    const eventProps: EventProps = {
      id: "event123",
      userId: "user123",
      name: "Event Name",
      datetime: "2023-08-15T18:00:00",
      location: "Event Location",
      participants_limit: 100,
      unitary_price: 50,
      avaliable_tickets: 100,
    };

    const event = Event.create(eventProps);
    const paymentProps: PaymentProps = {
      id: "payment123",
      eventId: event.getId(),
      userAccountId: "account123",
      value: 100,
      type: "CREDIT" as PaymentEnum,
    };

    const payment = Payment.create(paymentProps);
    const quantity = 1;

    (mockPaymentRepository.create as jest.Mock).mockResolvedValue(payment);

    const result = await createPayment.execute(paymentProps, event, quantity);

    expect(result).toEqual(payment);
    expect(mockPaymentRepository.create).toHaveBeenCalledWith(payment);
    expect(mockPaymentRepository.create).toHaveBeenCalledTimes(1);
  });

  it("should throw an error when there are not enough available tickets", async () => {
    const eventProps: EventProps = {
      userId: "user123",
      name: "Event Name",
      datetime: "2023-08-15T18:00:00",
      location: "Event Location",
      participants_limit: 100,
      unitary_price: 50,
      avaliable_tickets: 0,
    };

    const event = Event.create(eventProps);
    const paymentProps: PaymentProps = {
      eventId: event.getId(),
      userAccountId: "account123",
      value: 100,
      type: "CREDIT" as PaymentEnum,
    };

    const quantity = 1;

    await expect(
      createPayment.execute(paymentProps, event, quantity)
    ).rejects.toThrowError("Not enough tickets avaliable");
    expect(mockPaymentRepository.create).not.toHaveBeenCalled();
  });
});
