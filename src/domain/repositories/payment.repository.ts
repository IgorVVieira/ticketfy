import { Payment } from '../entities/payment';
import { IGenericCreateRepository } from './generic-create.repository';

export interface IPaymentRepository extends IGenericCreateRepository<Payment> { }
