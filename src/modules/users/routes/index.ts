import isAdminGuard from '@/modules/auth/guards/is-admin.guard'
import type { RouteRecordRaw } from 'vue-router'

export const USERS_ROUTES: RouteRecordRaw[] = [
  {
    path: 'usuarios',
    name: 'home.users',
    beforeEnter: [isAdminGuard],
    component: () => import('../views/UsersView.vue')
  },
  {
    path: 'usuarios',
    name: 'home.user',
    beforeEnter: [isAdminGuard],
    component: () => import('../views/UserView.vue')
  }
]
