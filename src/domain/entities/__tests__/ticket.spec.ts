import { Ticket } from "../ticket";

describe("Ticket", () => {
  it("should create a valid ticket", () => {
    const ticket = Ticket.create({
      event_id: "1",
      user_id: "1",
      payment_id: "1",
    });

    expect(ticket).toBeTruthy();
    expect(ticket.props.event_id).toBe("1");
    expect(ticket.props.user_id).toBe("1");
    expect(ticket.props.payment_id).toBe("1");
  });
});
