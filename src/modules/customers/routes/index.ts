import type { RouteRecordRaw } from 'vue-router'

export const CUSTOMER_ROUTES: RouteRecordRaw[] = [
  {
    path: '/clientes',
    name: 'home.customers',
    component: () => import('@/modules/customers/views/CustomersView.vue')
  },
  {
    path: '/clientes/:customerId',
    name: 'home.customer',
    props: true,
    component: () => import('@/modules/customers/views/CustomerView.vue')
  }
]
