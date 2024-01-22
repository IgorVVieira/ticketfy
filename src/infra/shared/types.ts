export const TYPES = {
  // Repositories
  EventRepository: Symbol.for('EventRepository'),
  EventPhotoRepository: Symbol.for('EventPhotoRepository'),
  PaymentRepository: Symbol.for('PaymentRepository'),
  PermissionRepository: Symbol.for('PermissionRepository'),
  TicketRepository: Symbol.for('TicketRepository'),
  UserAccountRepository: Symbol.for('UserAccountRepository'),
  UserPermissionRepository: Symbol.for('UserPermissionRepository'),
  UserRepository: Symbol.for('UserRepository'),

  // Use cases
  CreateUser: Symbol.for('CreateUser'),
  FindUser: Symbol.for('FindUser'),
  UpdateUserPicture: Symbol.for('UpdateUserPicture'),
  CreateUserPermission: Symbol.for('CreateUserPermission'),
  FindUserPermission: Symbol.for('FindUserPermission'),
  CreateUserAccount: Symbol.for('CreateUserAccount'),
  FindUserAccount: Symbol.for('FindUserAccount'),
  GetAllUserAccounts: Symbol.for('GetAllUserAccounts'),
  DecrementUserAccountValue: Symbol.for('DecrementUserAccountValue'),
  CreateTicket: Symbol.for('CreateTicket'),
  GetUserTickets: Symbol.for('GetUserTickets'),
  CreatePayment: Symbol.for('CreatePayment'),
  CreateEvent: Symbol.for('CreateEvent'),
  FindEvent: Symbol.for('FindEvent'),
  DecrementAvaliableTickets: Symbol.for('DecrementAvaliableTickets'),
  FindAllEvents: Symbol.for('FindAllEvents'),
  CreateEventPhoto: Symbol.for('CreateEventPhoto'),
  FindEventPhoto: Symbol.for('FindEventPhoto'),
  CreatePermission: Symbol.for('CreatePermission'),
  FindPermission: Symbol.for('FindPermission'),
  FindAllPermissions: Symbol.for('FindAllPermissions'),

  //Services
  EventPhotoService: Symbol.for('EventPhotoService'),
  EventService: Symbol.for('EventService'),
  PaymentService: Symbol.for('PaymentService'),
  PermissionService: Symbol.for('PermissionService'),
  TicketService: Symbol.for('TicketService'),
  UserAccountService: Symbol.for('UserAccountService'),
  UserPermissionService: Symbol.for('UserPermissionService'),
  UserService: Symbol.for('UserService')
};
