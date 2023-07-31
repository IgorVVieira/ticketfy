import { Ticket } from "../ticket";

describe("Ticket", () => {
  it("should create a valid ticket", () => {
    const ticket = Ticket.create({
      event_id: "1",
      user_id: "1",
      payment_id: "1",
    });

    expect(ticket).toBeTruthy();
    expect(ticket.eventId).toBe("1");
    expect(ticket.userId).toBe("1");
    expect(ticket.paymentId).toBe("1");
  });
});
