<template>
  <div class="text-center">
    <v-command-palette
      :items="items"
      :model-value="true"
      contained
    >
      <template v-slot:item="{ item, props: itemProps }">
        <v-list-item v-bind="itemProps" :subtitle="null" :title="null">
          <v-list-item-title class="d-flex align-center">
            <v-avatar :image="item.raw.avatar" class="mr-2" size="small"></v-avatar>
            <span>{{ item.title }}</span>
          </v-list-item-title>
          <template v-slot:append>
            <span class="text-caption text-disabled">{{ item.raw.email }}</span>
          </template>
        </v-list-item>
      </template>
    </v-command-palette>
  </div>
</template>

<script setup>
  const items = [
    {
      id: '1',
      title: 'John Doe',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      email: 'john.doe@example.com',
    },
    {
      id: '2',
      title: 'Jane Smith',
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
      email: 'jane.smith@example.com',
    },
    {
      id: '3',
      title: 'Sam Wilson',
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
      email: 'sam.wilson@example.com',
    },
  ]
</script>
