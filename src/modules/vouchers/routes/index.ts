import type { RouteRecordRaw } from 'vue-router'

export const VOUCHERS_ROUTES: RouteRecordRaw[] = [
  {
    path: '/vales',
    name: 'home.voucher',
    component: () => import('@/modules/vouchers/views/VouchersView.vue')
  }
]
