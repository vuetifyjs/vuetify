<template>
  <v-treeview
    v-model="model"
    :items="items"
    item-value="id"
    select-strategy="classic"
    activatable
    selectable
  >
    <template v-slot:toggle="{ props: toggleProps, isOpen, isSelected, isActive, isIndeterminate }">
      <v-btn
        v-bind="toggleProps"
        :active="isOpen"
        :color="isIndeterminate ? 'warning' : isSelected ? 'success' : isActive ? 'primary' : 'medium-emphasis'"
        :variant="isOpen ? 'outlined' : 'tonal'"
      ></v-btn>
    </template>
  </v-treeview>
</template>

<script setup>
  import { shallowRef } from 'vue'

  const model = shallowRef()

  const items = [
    {
      id: '1',
      title: 'Dashboard',
      children: [
        {
          id: '1-1',
          title: 'Analytics',
        },
        {
          id: '1-2',
          title: 'Reports',
        },
      ],
    },
    {
      id: '2',
      title: 'User Management',
      children: [
        {
          id: '2-1',
          title: 'Users',
        },
        {
          id: '2-2',
          title: 'Roles',
        },
        {
          id: '2-3',
          title: 'Permissions',
        },
      ],
    },
    {
      id: '3',
      title: 'Settings',
      children: [
        {
          id: '3-1',
          title: 'General',
        },
        {
          id: '3-2',
          title: 'Security',
        },
        {
          id: '3-3',
          title: 'Notifications',
        },
      ],
    },
    {
      id: '4',
      title: 'Help',
      children: [
        {
          id: '4-1',
          title: 'Documentation',
        },
        {
          id: '4-2',
          title: 'Support',
        },
      ],
    },
  ]
</script>

<script>
  export default {
    data () {
      return {
        model: [],
        items: [
          {
            id: '1',
            title: 'Dashboard',
            children: [
              {
                id: '1-1',
                title: 'Analytics',
              },
              {
                id: '1-2',
                title: 'Reports',
              },
            ],
          },
          {
            id: '2',
            title: 'User Management',
            children: [
              {
                id: '2-1',
                title: 'Users',
              },
              {
                id: '2-2',
                title: 'Roles',
              },
              {
                id: '2-3',
                title: 'Permissions',
              },
            ],
          },
          {
            id: '3',
            title: 'Settings',
            children: [
              {
                id: '3-1',
                title: 'General',
              },
              {
                id: '3-2',
                title: 'Security',
              },
              {
                id: '3-3',
                title: 'Notifications',
              },
            ],
          },
          {
            id: '4',
            title: 'Help',
            children: [
              {
                id: '4-1',
                title: 'Documentation',
              },
              {
                id: '4-2',
                title: 'Support',
              },
            ],
          },
        ],
      }
    },
  }
</script>
