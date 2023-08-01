import { Router } from "express";
import { AppDataSource } from "./infra/database/data-source";
import { UserDB } from "./infra/database/entities/user";
import { AuthController } from "./infra/controllers/auth.controller";
import { Login } from "./application/usecases/login";
import { UserRepository } from "./infra/database/repositories/user.repository";
import { JwtService } from "./infra/jwt/jwt.service";
import { UserController } from "./infra/controllers/user.controller";
import { CreateUser } from "./application/usecases/user/create-user";
import { FindUser } from "./application/usecases/user/find-user";
import { UpdateUserPicture } from "./application/usecases/user/update-user-picture";
import { authMiddleware } from "./infra/middlewares/auth.middleware";
import { UserService } from "./infra/services/user.service";
import { EventController } from "./infra/controllers/event.controller";
import { EventService } from "./infra/services/event.service";
import { CreateEvent } from "./application/usecases/event/create-event";
import { FindEvent } from "./application/usecases/event/find-event";
import { EventDB } from "./infra/database/entities/event";
import { EventRepository } from "./infra/database/repositories/event.repository";
import { DecrementAvaliableTickets } from "./application/usecases/event/decrement-avaliable-tickets";
import { PaymentController } from "./infra/controllers/payment.controller";
import { PaymentService } from "./infra/services/payment.service";
import { PaymentDB } from "./infra/database/entities/payment";
import { PaymentRepository } from "./infra/database/repositories/payment.repository";
import { CreatePayment } from "./application/usecases/payment/create-payment";
import { UserAccountDB } from "./infra/database/entities/user-account";
import { UserAccountRepository } from "./infra/database/repositories/user-account.repository";
import { UserAccountController } from "./infra/controllers/user-account.controller";
import { UserAccountService } from "./infra/services/user-account.service";
import { CreateUserAccount } from "./application/usecases/user/create-user-account";
import { FindUserAccount } from "./application/usecases/user/find-user-account";
import { DecrementUserAccountValue } from "./application/usecases/user/decrement-user-account-value";
import { TicketDB } from "./infra/database/entities/ticket";
import { TicketRepository } from "./infra/database/repositories/ticket.repository";
import { TicketService } from "./infra/services/ticket.service";
import { CreateTicket } from "./application/usecases/ticket/create-ticket";
import { GetUserTickets } from "./application/usecases/ticket/get-user-tickets";
import { FindAllEvents } from "./application/usecases/event/find-all-events";

const userDb = AppDataSource.getRepository(UserDB);
const eventDb = AppDataSource.getRepository(EventDB);
const userAccountDb = AppDataSource.getRepository(UserAccountDB);
const paymentDb = AppDataSource.getRepository(PaymentDB);
const ticketDb = AppDataSource.getRepository(TicketDB);

const userRepository = new UserRepository(userDb);
const eventRepository = new EventRepository(eventDb);
const userAccountRepository = new UserAccountRepository(userAccountDb);
const paymentRepository = new PaymentRepository(paymentDb);
const ticketRepository = new TicketRepository(ticketDb);

const authController = new AuthController(
  new Login(userRepository, new JwtService())
);
const userService = new UserService(
  new CreateUser(userRepository),
  new FindUser(userRepository),
  new UpdateUserPicture(userRepository)
);
const eventService = new EventService(
  new CreateEvent(eventRepository),
  new FindEvent(eventRepository),
  new DecrementAvaliableTickets(eventRepository),
  new FindAllEvents(eventRepository),
  userService
);
const userAccountService = new UserAccountService(
  new CreateUserAccount(userAccountRepository),
  new FindUserAccount(userAccountRepository),
  new DecrementUserAccountValue(userAccountRepository),
  userService
);
const ticketService = new TicketService(
  new CreateTicket(ticketRepository),
  new GetUserTickets(ticketRepository),
  eventService,
  userService
);

const userController = new UserController(userService);
const eventController = new EventController(eventService);
const userAccountController = new UserAccountController(userAccountService);

const paymentController = new PaymentController(
  new PaymentService(
    new CreatePayment(paymentRepository),
    userService,
    userAccountService,
    eventService,
    ticketService
  ),
  eventService
);

const router = Router();

router.post("/login", authController.login);
router.post("/users", userController.create);
router.get("/users/:id", authMiddleware, userController.findById);

router.get("/user-accounts/:id", authMiddleware, userAccountController.find);
router.post("/user-accounts", authMiddleware, userAccountController.create);

router.get("/events", eventController.findAll);
router.post("/events", authMiddleware, eventController.create);
router.get("/events/:id", authMiddleware, eventController.findById);

router.post("/payments", authMiddleware, paymentController.create);

export default router;
