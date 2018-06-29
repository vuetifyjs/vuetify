<template>
  <v-toolbar>
    <v-toolbar-items>
      <v-btn flat v-for="i in 5" :key="i" ripple>Link {{ i }}</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>