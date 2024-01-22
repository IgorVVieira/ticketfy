import { Container } from 'inversify';
import { TYPES } from '../types';

import { IEventPhotoServiceInterface } from '../../services/interfaces/event-photo.service.interface';
import { EventPhotoService } from '../../services/event-photo.service';
import { IEventServiceInterface } from '../../services/interfaces/event.service.interface';
import { EventService } from '../../services/event.service';
import { IPaymentServiceInterface } from '../../services/interfaces/payment.service.interface';
import { PaymentService } from '../../services/payment.service';
import { ITicketServiceInterface } from '../../services/interfaces/ticket.service.interface';
import { TicketService } from '../../services/ticket.service';
import { IUserAccountServiceInterface } from '../../services/interfaces/user-account.service.interface';
import { UserAccountService } from '../../services/user-account.service';
import { IUserPermissionServiceInterface } from '../../services/interfaces/user-permission.service.interface';
import { UserPermissionService } from '../../services/user-permission.service';
import { IUserServiceInterface } from '../../services/interfaces/user.service.interface';
import { UserService } from '../../services/user.service';
import { CreateUser } from '../../../application/usecases/user/create-user';
import { FindUser } from '../../../application/usecases/user/find-user';
import { UpdateUserPicture } from '../../../application/usecases/user/update-user-picture';
import { CreateUserPermission } from '../../../application/usecases/permission/create-user-permission';
import { FindUserPermission } from '../../../application/usecases/permission/find-user-permission';
import { PermissionService } from '../../services/permission.service';
import { CreateUserAccount } from '../../../application/usecases/user/create-user-account';
import { FindUserAccount } from '../../../application/usecases/user/find-user-account';
import { GetAllUserAccounts } from '../../../application/usecases/user/get-all-user-accounts';
import { DecrementUserAccountValue } from '../../../application/usecases/user/decrement-user-account-value';
import { CreateTicket } from '../../../application/usecases/ticket/create-ticket';
import { GetUserTickets } from '../../../application/usecases/ticket/get-user-tickets';
import { CreatePayment } from '../../../application/usecases/payment/create-payment';
import { CreateEvent } from '../../../application/usecases/event/create-event';
import { FindEvent } from '../../../application/usecases/event/find-event';
import { DecrementAvaliableTickets } from '../../../application/usecases/event/decrement-avaliable-tickets';
import { FindAllEvents } from '../../../application/usecases/event/find-all-events';
import { CreateEventPhoto } from '../../../application/usecases/event/create-event-photo';
import { UserRepository } from '../../database/repositories/user.repository';
import { AppDataSource } from '../../database/data-source';
import { UserDB } from '../../database/entities/user';
import { EventDB } from '../../database/entities/event';
import { UserAccountDB } from '../../database/entities/user-account';
import { PaymentDB } from '../../database/entities/payment';
import { TicketDB } from '../../database/entities/ticket';
import { PermissionDB } from '../../database/entities/permission';
import { UserPermissionDB } from '../../database/entities/user-permission';
import { EventPhotoDB } from '../../database/entities/event-photo';
import { EventRepository } from '../../database/repositories/event.repository';
import { UserAccountRepository } from '../../database/repositories/user-account.repository';
import { PaymentRepository } from '../../database/repositories/payment.repository';
import { TicketRepository } from '../../database/repositories/ticket.repository';
import { PermissionRepository } from '../../database/repositories/permission.repository';
import { UserPermissionRepository } from '../../database/repositories/user-permission.repository';
import { EventPhotoRepository } from '../../database/repositories/event-photo.repository';
import { CreatePermission } from '../../../application/usecases/permission/create-permission';
import { FindPermission } from '../../../application/usecases/permission/find-permission';

const myContainer = new Container();

const userDb = AppDataSource.getRepository(UserDB);
const eventDb = AppDataSource.getRepository(EventDB);
const userAccountDb = AppDataSource.getRepository(UserAccountDB);
const paymentDb = AppDataSource.getRepository(PaymentDB);
const ticketDb = AppDataSource.getRepository(TicketDB);
const permissionDb = AppDataSource.getRepository(PermissionDB);
const userPermissionDb = AppDataSource.getRepository(UserPermissionDB);
const eventPhotoDB = AppDataSource.getRepository(EventPhotoDB);

// Repositories
myContainer.bind<UserRepository>(TYPES.UserRepository).toDynamicValue(() => {
  return new UserRepository(userDb);
});
myContainer.bind(TYPES.EventRepository).toDynamicValue(() => {
  return new EventRepository(eventDb);
});
myContainer.bind(TYPES.UserAccountRepository).toDynamicValue(() => {
  return new UserAccountRepository(userAccountDb);
});
myContainer.bind(TYPES.PaymentRepository).toDynamicValue(() => {
  return new PaymentRepository(paymentDb);
});
myContainer.bind(TYPES.TicketRepository).toDynamicValue(() => {
  return new TicketRepository(ticketDb);
});
myContainer.bind(TYPES.PermissionRepository).toDynamicValue(() => {
  return new PermissionRepository(permissionDb);
});
myContainer.bind(TYPES.UserPermissionRepository).toDynamicValue(() => {
  return new UserPermissionRepository(userPermissionDb);
});
myContainer.bind(TYPES.EventPhotoRepository).toDynamicValue(() => {
  return new EventPhotoRepository(eventPhotoDB);
});

// Use cases
myContainer.bind<CreateUser>(TYPES.CreateUser).toDynamicValue(context => {
  return new CreateUser(context.container.get<UserRepository>(TYPES.UserRepository));
});
myContainer.bind<FindUser>(TYPES.FindUser).toDynamicValue(context => {
  return new FindUser(context.container.get<UserRepository>(TYPES.UserRepository));
});
myContainer.bind<UpdateUserPicture>(TYPES.UpdateUserPicture).toDynamicValue(context => {
  return new UpdateUserPicture(context.container.get<UserRepository>(TYPES.UserRepository));
});
myContainer.bind<CreateUserPermission>(TYPES.CreateUserPermission).toDynamicValue(context => {
  return new CreateUserPermission(
    context.container.get<UserPermissionRepository>(TYPES.UserPermissionRepository)
  );
});
myContainer.bind<FindUserPermission>(TYPES.FindUserPermission).toDynamicValue(context => {
  return new FindUserPermission(
    context.container.get<UserPermissionRepository>(TYPES.UserPermissionRepository)
  );
});
myContainer.bind<CreateUserAccount>(TYPES.CreateUserAccount).toDynamicValue(context => {
  return new CreateUserAccount(
    context.container.get<UserAccountRepository>(TYPES.UserAccountRepository)
  );
});
myContainer.bind<FindUserAccount>(TYPES.FindUserAccount).toDynamicValue(context => {
  return new FindUserAccount(
    context.container.get<UserAccountRepository>(TYPES.UserAccountRepository)
  );
});
myContainer.bind<GetAllUserAccounts>(TYPES.GetAllUserAccounts).toDynamicValue(context => {
  return new GetAllUserAccounts(
    context.container.get<UserAccountRepository>(TYPES.UserAccountRepository)
  );
});
myContainer.bind<DecrementUserAccountValue>(TYPES.DecrementUserAccountValue).toDynamicValue(context => {
  return new DecrementUserAccountValue(
    context.container.get<UserAccountRepository>(TYPES.UserAccountRepository)
  );
});
myContainer.bind<CreateTicket>(TYPES.CreateTicket).toDynamicValue(context => {
  return new CreateTicket(context.container.get<TicketRepository>(TYPES.TicketRepository));
});
myContainer.bind<GetUserTickets>(TYPES.GetUserTickets).toDynamicValue(context => {
  return new GetUserTickets(context.container.get<TicketRepository>(TYPES.TicketRepository));
});
myContainer.bind<CreatePayment>(TYPES.CreatePayment).toDynamicValue(context => {
  return new CreatePayment(context.container.get<PaymentRepository>(TYPES.PaymentRepository));
});
myContainer.bind<CreateEvent>(TYPES.CreateEvent).toDynamicValue(context => {
  return new CreateEvent(context.container.get<EventRepository>(TYPES.EventRepository));
});
myContainer.bind<FindEvent>(TYPES.FindEvent).toDynamicValue(context => {
  return new FindEvent(context.container.get<EventRepository>(TYPES.EventRepository));
});
myContainer.bind<DecrementAvaliableTickets>(TYPES.DecrementAvaliableTickets).toDynamicValue(context => {
  return new DecrementAvaliableTickets(context.container.get<EventRepository>(TYPES.EventRepository));
});
myContainer.bind<FindAllEvents>(TYPES.FindAllEvents).toDynamicValue(context => {
  return new FindAllEvents(context.container.get<EventRepository>(TYPES.EventRepository));
});
myContainer.bind<CreateEventPhoto>(TYPES.CreateEventPhoto).toDynamicValue(context => {
  return new CreateEventPhoto(context.container.get<EventPhotoRepository>(TYPES.EventPhotoRepository));
});
myContainer.bind<CreatePermission>(TYPES.CreatePermission).toDynamicValue(context => {
  return new CreatePermission(context.container.get<PermissionRepository>(TYPES.PermissionRepository));
});
myContainer.bind<FindPermission>(TYPES.FindPermission).toDynamicValue(context => {
  return new FindPermission(context.container.get<PermissionRepository>(TYPES.PermissionRepository));
});

// Services
myContainer.bind<IEventPhotoServiceInterface>(TYPES.EventPhotoService).toDynamicValue(context => {
  return new EventPhotoService(
    context.container.get<CreateEventPhoto>(TYPES.CreateEventPhoto),
    context.container.get<EventService>(TYPES.EventService)
  );
});
myContainer.bind<IEventServiceInterface>(TYPES.EventService).toDynamicValue(context => {
  return new EventService(
    context.container.get<CreateEvent>(TYPES.CreateEvent),
    context.container.get<FindEvent>(TYPES.FindEvent),
    context.container.get<DecrementAvaliableTickets>(TYPES.DecrementAvaliableTickets),
    context.container.get<FindAllEvents>(TYPES.FindAllEvents),
    context.container.get<UserService>(TYPES.UserService)
  );
});
myContainer.bind<IPaymentServiceInterface>(TYPES.PaymentService).toDynamicValue(context => {
  return new PaymentService(
    context.container.get<CreatePayment>(TYPES.CreatePayment),
    context.container.get<UserService>(TYPES.UserService),
    context.container.get<UserAccountService>(TYPES.UserAccountService),
    context.container.get<EventService>(TYPES.EventService),
    context.container.get<TicketService>(TYPES.TicketService)
  );
});
myContainer.bind<ITicketServiceInterface>(TYPES.TicketService).toDynamicValue(context => {
  return new TicketService(
    context.container.get<CreateTicket>(TYPES.CreateTicket),
    context.container.get<GetUserTickets>(TYPES.GetUserTickets),
    context.container.get<EventService>(TYPES.EventService),
    context.container.get<UserService>(TYPES.UserService)
  );
});
myContainer.bind<IUserAccountServiceInterface>(TYPES.UserAccountService).toDynamicValue(context => {
  return new UserAccountService(
    context.container.get<CreateUserAccount>(TYPES.CreateUserAccount),
    context.container.get<FindUserAccount>(TYPES.FindUserAccount),
    context.container.get<GetAllUserAccounts>(TYPES.GetAllUserAccounts),
    context.container.get<DecrementUserAccountValue>(TYPES.DecrementUserAccountValue),
    context.container.get<UserService>(TYPES.UserService)
  );
});
myContainer.bind<IUserPermissionServiceInterface>(TYPES.UserPermissionService).toDynamicValue(context => {
  return new UserPermissionService(
    context.container.get<CreateUserPermission>(TYPES.CreateUserPermission),
    context.container.get<FindUserPermission>(TYPES.FindUserPermission),
    context.container.get<UserService>(TYPES.UserService),
    context.container.get<PermissionService>(TYPES.PermissionService)
  );
});
myContainer.bind<IUserServiceInterface>(TYPES.UserService).toDynamicValue(context => {
  return new UserService(
    context.container.get<CreateUser>(TYPES.CreateUser),
    context.container.get<FindUser>(TYPES.FindUser),
    context.container.get<UpdateUserPicture>(TYPES.UpdateUserPicture)
  );
});
myContainer.bind<PermissionService>(TYPES.PermissionService).toDynamicValue(context => {
  return new PermissionService(
    context.container.get<CreatePermission>(TYPES.CreatePermission),
    context.container.get<FindPermission>(TYPES.FindPermission)
  );
});

export { myContainer };
