<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer
        absolute
        expand-on-hover
        rail
      >
        <v-list>
          <v-list-item
            prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
            title="Sandra Adams"
            subtitle="sandra_a88@gmailcom"
          ></v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact">
          <v-list-item prepend-icon="mdi-folder" title="My Files"></v-list-item>
          <v-list-item prepend-icon="mdi-account-multiple" title="Shared with me"></v-list-item>
          <v-list-item prepend-icon="mdi-star" title="Starred"></v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main style="height: 250px"></v-main>
    </v-layout>
  </v-card>
</template>

<script>
  export default {
    //
  }
</script>
