import { CashierInterface } from 'interfaces/cashier';
import { InventoryManagerInterface } from 'interfaces/inventory-manager';
import { StoreManagerInterface } from 'interfaces/store-manager';

import { GetQueryInterface } from '../get-query.interface';

export interface UserInterface {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roq_user_id: string;
  tenant_id: string;

  cashier: CashierInterface[];
  inventory_manager: InventoryManagerInterface[];
  store_manager: StoreManagerInterface[];
}

export interface UserGetQueryInterface extends GetQueryInterface {
  roq_user_id?: string;
  tenant_id?: string;
}
