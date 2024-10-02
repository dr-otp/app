import { UserRoles } from '@/modules/auth/interfaces'
import { hasRole } from '@/modules/shared/helpers'
import { PrimeIcons as icons } from '@primevue/core/api'
import type { MenuItem } from 'primevue/menuitem'

// src/menuOptions.js

export const getMenuOptions = (userRoles: UserRoles) => {
  const menuItems = [
    { icon: icons.HOME, route: { name: 'home' } },
    {
      roles: [UserRoles.Admin, UserRoles.Moderator],
      icon: icons.TICKET,
      label: 'Vales',
      route: { name: 'home.voucher' }
    },
    {
      roles: [UserRoles.Admin],
      label: 'Usuarios',
      icon: icons.USERS,
      route: { name: 'home.users' }
    },
    {
      roles: [UserRoles.Admin, UserRoles.Moderator],
      label: 'Clientes',
      icon: icons.USERS,
      route: { name: 'home.customers' }
    }
  ]
  const filterMenuItems = (items: MenuItem[], userRoles: UserRoles) => {
    return items
      .filter((item) => hasRole(item.roles, userRoles))
      .map((item) => {
        const newItem = { ...item }
        if (item.items) {
          newItem.items = filterMenuItems(item.items, userRoles)
        }
        return newItem
      })
  }

  return filterMenuItems(menuItems, userRoles)
}
