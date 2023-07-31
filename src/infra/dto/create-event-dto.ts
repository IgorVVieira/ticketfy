export class CreateEventDto {
  readonly user_id: string;
  readonly name: string;
  readonly datetime: string;
  readonly location: string;
  readonly participants_limit: number;
  readonly unitary_price: number;
  readonly avaliable_tickets: number;
  readonly description?: string;
}
