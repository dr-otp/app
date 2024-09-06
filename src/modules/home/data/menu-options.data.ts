import { UserRoles } from '@/modules/auth/interfaces'
import { PrimeIcons as icons } from '@primevue/core/api'
import type { MenuItem } from 'primevue/menuitem'

export const getMenuOptions = (userRoles: UserRoles[]): MenuItem[] => [
  { icon: icons.HOME, route: { name: 'home' } },
  { icon: icons.LOCK, label: 'OTP', route: { name: 'home.generate_otp' } },
  {
    visible: false,
    label: 'Projects',
    icon: icons.SEARCH,
    items: [
      { label: 'Core', icon: icons.BOLT },
      { separator: true },
      {
        label: 'Templates',
        icon: icons.PALETTE,
        items: [{ label: 'Apollo', icon: icons.PALETTE, badge: 2 }]
      }
    ]
  },
  {
    visible: userRoles.includes(UserRoles.Admin),
    label: 'Usuarios',
    icon: icons.USERS,
    route: { name: 'home.users' }
  }
]
