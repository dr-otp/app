import type { RouteRecordRaw } from 'vue-router'

export const CUSTOMER_ROUTES: RouteRecordRaw[] = [
  {
    path: '/clientes',
    name: 'home.customers',
    component: () => import('@/modules/customers/views/CustomersView.vue')
  }
]
