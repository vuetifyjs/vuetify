<template>
  <v-toolbar>
    <v-toolbar-items>
      <v-btn
        v-for="i in 5"
        :key="i"
        flat
        ripple
      >
        Link {{ i }}
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>
