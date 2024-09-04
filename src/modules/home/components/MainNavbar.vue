<script setup lang="ts">
import { ref } from 'vue'
import { PrimeIcons as icons } from '@primevue/core/api'
import OptionsMenu from './OptionsMenu.vue'

const items = ref([
  { icon: icons.HOME, route: { name: 'home' } },
  {
    label: 'Projects',
    icon: 'pi pi-search',
    items: [
      { label: 'Core', icon: 'pi pi-bolt', shortcut: '⌘+K' },
      { separator: true },
      {
        label: 'Templates',
        icon: 'pi pi-palette',
        items: [{ label: 'Apollo', icon: 'pi pi-palette', badge: 2 }]
      }
    ]
  }
])
</script>

<template>
  <Menubar :model="items">
    <template #item="{ item, props, hasSubmenu, root }">
      <router-link
        v-if="item.route"
        v-ripple
        class="flex items-center"
        v-bind="props.action"
        :to="item.route"
      >
        <span :class="[item.icon, 'p-2']" />
        <span v-if="item.label" class="ml-2">{{ item.label }}</span>
      </router-link>
      <a v-else v-ripple class="flex items-center" v-bind="props.action">
        <span :class="[item.icon, 'p-2']" />
        <span v-if="item.label" class="ml-2">{{ item.label }}</span>
        <Badge v-if="item.badge" :class="{ 'ml-auto': !root, 'ml-2': root }" :value="item.badge" />
        <i v-if="hasSubmenu" :class="['p-2', root ? icons.ANGLE_DOWN : icons.ANGLE_RIGHT]"></i>
      </a>
    </template>
    <template #end>
      <div class="flex items-center gap-2">
        <InputText placeholder="Search" type="text" class="w-32 sm:w-auto border-none" />
        <OptionsMenu />
      </div>
    </template>
  </Menubar>
</template>
