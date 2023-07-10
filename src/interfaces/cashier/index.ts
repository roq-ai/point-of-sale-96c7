import { UserInterface } from 'interfaces/user';
import { BusinessInterface } from 'interfaces/business';
import { GetQueryInterface } from 'interfaces';

export interface CashierInterface {
  id?: string;
  user_id?: string;
  business_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  business?: BusinessInterface;
  _count?: {};
}

export interface CashierGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  business_id?: string;
}
