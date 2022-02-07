<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer
        absolute
        theme="dark"
        image="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
        width="100%"
        permanent
      >
        <v-list nav color="transparent">
          <v-list-item prepend-icon="mdi-email" title="Inbox"></v-list-item>
          <v-list-item prepend-icon="mdi-account-supervisor-circle" title="Supervisors"></v-list-item>
          <v-list-item prepend-icon="mdi-clock-start" title="Clock-in"></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main style="height: 250px"></v-main>
    </v-layout>
  </v-card>
</template>
