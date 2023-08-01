import { CreateEvent } from "../../../application/usecases/event/create-event";
import { DecrementAvaliableTickets } from "../../../application/usecases/event/decrement-avaliable-tickets";
import { FindAllEvents } from "../../../application/usecases/event/find-all-events";
import { FindEvent } from "../../../application/usecases/event/find-event";
import { Login } from "../../../application/usecases/login";
import { CreatePayment } from "../../../application/usecases/payment/create-payment";
import { CreatePermission } from "../../../application/usecases/permission/create-permission";
import { CreateUserPermission } from "../../../application/usecases/permission/create-user-permission";
import { FindPermission } from "../../../application/usecases/permission/find-permission";
import { FindUserPermission } from "../../../application/usecases/permission/find-user-permission";
import { CreateTicket } from "../../../application/usecases/ticket/create-ticket";
import { GetUserTickets } from "../../../application/usecases/ticket/get-user-tickets";
import { CreateUser } from "../../../application/usecases/user/create-user";
import { CreateUserAccount } from "../../../application/usecases/user/create-user-account";
import { DecrementUserAccountValue } from "../../../application/usecases/user/decrement-user-account-value";
import { FindUser } from "../../../application/usecases/user/find-user";
import { FindUserAccount } from "../../../application/usecases/user/find-user-account";
import { GetAllUserAccounts } from "../../../application/usecases/user/get-all-user-accounts";
import { UpdateUserPicture } from "../../../application/usecases/user/update-user-picture";
import { AuthController } from "../../controllers/auth.controller";
import { EventController } from "../../controllers/event.controller";
import { PaymentController } from "../../controllers/payment.controller";
import { PermissionController } from "../../controllers/permission.controller";
import { TicketControler } from "../../controllers/ticket.controller";
import { UserAccountController } from "../../controllers/user-account.controller";
import { UserPermissionController } from "../../controllers/user-permission.controller";
import { UserController } from "../../controllers/user.controller";
import { AppDataSource } from "../../database/data-source";
import { EventDB } from "../../database/entities/event";
import { PaymentDB } from "../../database/entities/payment";
import { PermissionDB } from "../../database/entities/permission";
import { TicketDB } from "../../database/entities/ticket";
import { UserDB } from "../../database/entities/user";
import { UserAccountDB } from "../../database/entities/user-account";
import { UserPermissionDB } from "../../database/entities/user-permission";
import { EventRepository } from "../../database/repositories/event.repository";
import { PaymentRepository } from "../../database/repositories/payment.repository";
import { PermissionRepository } from "../../database/repositories/permission.repository";
import { TicketRepository } from "../../database/repositories/ticket.repository";
import { UserAccountRepository } from "../../database/repositories/user-account.repository";
import { UserPermissionRepository } from "../../database/repositories/user-permission.repository";
import { UserRepository } from "../../database/repositories/user.repository";
import { JwtService } from "../../jwt/jwt.service";
import { EventService } from "../../services/event.service";
import { PaymentService } from "../../services/payment.service";
import { PermissionService } from "../../services/permission.service";
import { TicketService } from "../../services/ticket.service";
import { UserAccountService } from "../../services/user-account.service";
import { UserPermissionService } from "../../services/user-permission.service";
import { UserService } from "../../services/user.service";

const userDb = AppDataSource.getRepository(UserDB);
const eventDb = AppDataSource.getRepository(EventDB);
const userAccountDb = AppDataSource.getRepository(UserAccountDB);
const paymentDb = AppDataSource.getRepository(PaymentDB);
const ticketDb = AppDataSource.getRepository(TicketDB);
const permissionDb = AppDataSource.getRepository(PermissionDB);
const userPermissionDb = AppDataSource.getRepository(UserPermissionDB);

const userRepository = new UserRepository(userDb);
const eventRepository = new EventRepository(eventDb);
const userAccountRepository = new UserAccountRepository(userAccountDb);
const paymentRepository = new PaymentRepository(paymentDb);
const ticketRepository = new TicketRepository(ticketDb);
const permissionRepository = new PermissionRepository(permissionDb);
const userPermissionRepository = new UserPermissionRepository(userPermissionDb);

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
  new GetAllUserAccounts(userAccountRepository),
  new DecrementUserAccountValue(userAccountRepository),
  userService
);
const ticketService = new TicketService(
  new CreateTicket(ticketRepository),
  new GetUserTickets(ticketRepository),
  eventService,
  userService
);
const permissionService = new PermissionService(
  new CreatePermission(permissionRepository),
  new FindPermission(permissionRepository)
);
const userPermissionService = new UserPermissionService(
  new CreateUserPermission(userPermissionRepository),
  new FindUserPermission(userPermissionRepository),
  userService,
  permissionService
);

const authController = new AuthController(
  new Login(userRepository, new JwtService())
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
const ticketController = new TicketControler(ticketService);
const permissionController = new PermissionController(permissionService);
const userPermissionController = new UserPermissionController(
  userPermissionService
);

export {
  userPermissionService,
  authController,
  userController,
  eventController,
  userAccountController,
  paymentController,
  ticketController,
  permissionController,
  userPermissionController,
};
