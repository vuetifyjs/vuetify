<template>
  <v-toolbar>
    <v-toolbar-items>
      <v-toolbar-item v-for="i in 5" :key="i" ripple>Link {{ i }}</v-toolbar-item>
    </v-toolbar-items>
  </v-toolbar>
</template>