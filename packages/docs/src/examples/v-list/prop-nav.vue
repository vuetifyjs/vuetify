<template>
  <v-card
    class="mx-auto"
    width="256"
  >
    <v-layout>
      <v-navigation-drawer absolute permanent>
        <v-list>
          <v-list-item
            prepend-avatar="https://cdn.vuetifyjs.com/images/john.png"
            subtitle="john@google.com"
            title="John Leider"
          >
            <template v-slot:append>
              <v-btn
                icon="i-mdi:menu-down"
                size="small"
                variant="text"
              ></v-btn>
            </template>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list
          :lines="false"
          density="compact"
          nav
        >
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :value="item"
            color="primary"
          >
            <template v-slot:prepend>
              <v-icon :icon="item.icon"></v-icon>
            </template>

            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main style="height: 354px;"></v-main>
    </v-layout>
  </v-card>
</template>

<script setup>
  const items = [
    { text: 'My Files', icon: 'i-mdi:folder' },
    { text: 'Shared with me', icon: 'i-mdi:account-multiple' },
    { text: 'Starred', icon: 'i-mdi:star' },
    { text: 'Recent', icon: 'i-mdi:history' },
    { text: 'Offline', icon: 'i-mdi:check-circle' },
    { text: 'Uploads', icon: 'i-mdi:upload' },
    { text: 'Backups', icon: 'i-mdi:cloud-upload' },
  ]
</script>

<script>
  export default {
    data: () => ({
      items: [
        { text: 'My Files', icon: 'i-mdi:folder' },
        { text: 'Shared with me', icon: 'i-mdi:account-multiple' },
        { text: 'Starred', icon: 'i-mdi:star' },
        { text: 'Recent', icon: 'i-mdi:history' },
        { text: 'Offline', icon: 'i-mdi:check-circle' },
        { text: 'Uploads', icon: 'i-mdi:upload' },
        { text: 'Backups', icon: 'i-mdi:cloud-upload' },
      ],
    }),
  }
</script>
