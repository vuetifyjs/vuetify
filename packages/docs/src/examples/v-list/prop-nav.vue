<template>
  <v-card
    class="mx-auto"
    width="256"
  >
    <v-layout>
      <v-navigation-drawer permanent absolute>
        <v-list>
          <v-list-item
            prepend-avatar="https://cdn.vuetifyjs.com/images/john.png"
            title="John Leider"
            subtitle="john@google.com"
          >
            <template v-slot:append>
              <v-btn
                size="small"
                variant="text"
                icon="mdi-menu-down"
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
            active-color="primary"
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

<script>
  export default {
    data: () => ({
      selectedItem: 0,
      items: [
        { text: 'My Files', icon: 'mdi-folder' },
        { text: 'Shared with me', icon: 'mdi-account-multiple' },
        { text: 'Starred', icon: 'mdi-star' },
        { text: 'Recent', icon: 'mdi-history' },
        { text: 'Offline', icon: 'mdi-check-circle' },
        { text: 'Uploads', icon: 'mdi-upload' },
        { text: 'Backups', icon: 'mdi-cloud-upload' },
      ],
    }),
  }
</script>
