const mapping: Record<string, string> = {
  businesses: 'business',
  cashiers: 'cashier',
  'inventory-managers': 'inventory_manager',
  'store-managers': 'store_manager',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
