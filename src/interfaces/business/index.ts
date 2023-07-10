import { CashierInterface } from 'interfaces/cashier';
import { InventoryManagerInterface } from 'interfaces/inventory-manager';
import { StoreManagerInterface } from 'interfaces/store-manager';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface BusinessInterface {
  id?: string;
  description?: string;
  image?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  cashier?: CashierInterface[];
  inventory_manager?: InventoryManagerInterface[];
  store_manager?: StoreManagerInterface[];
  user?: UserInterface;
  _count?: {
    cashier?: number;
    inventory_manager?: number;
    store_manager?: number;
  };
}

export interface BusinessGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  image?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
