<template>
  <div class="d-flex justify-center">
    <v-command-palette
      :close-on-execute="false"
      :items="items"
      :model-value="true"
      class="flex-grow-1"
      hotkeys-scope="focused"
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

    <v-snackbar v-model="snackbar" :timeout="2000">
      {{ snackbarText }}
    </v-snackbar>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const snackbar = ref(false)
  const snackbarText = ref('')

  function showSnackbar (text) {
    snackbarText.value = text
    snackbar.value = true
  }

  const items = [
    {
      id: '1',
      title: 'John Doe',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      email: 'john.doe@example.com',
      handler: () => showSnackbar('Selected John Doe'),
    },
    {
      id: '2',
      title: 'Jane Smith',
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
      email: 'jane.smith@example.com',
      handler: () => showSnackbar('Selected Jane Smith'),
    },
    {
      id: '3',
      title: 'Sam Wilson',
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
      email: 'sam.wilson@example.com',
      handler: () => showSnackbar('Selected Sam Wilson'),
    },
  ]
</script>

<script>
  import { ref } from 'vue'

  export default {
    setup () {
      const snackbar = ref(false)
      const snackbarText = ref('')

      function showSnackbar (text) {
        snackbarText.value = text
        snackbar.value = true
      }

      const items = [
        {
          id: '1',
          title: 'John Doe',
          avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
          email: 'john.doe@example.com',
          handler: () => showSnackbar('Selected John Doe'),
        },
        {
          id: '2',
          title: 'Jane Smith',
          avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
          email: 'jane.smith@example.com',
          handler: () => showSnackbar('Selected Jane Smith'),
        },
        {
          id: '3',
          title: 'Sam Wilson',
          avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
          email: 'sam.wilson@example.com',
          handler: () => showSnackbar('Selected Sam Wilson'),
        },
      ]

      return {
        snackbar,
        snackbarText,
        showSnackbar,
        items,
      }
    },
  }
</script>
