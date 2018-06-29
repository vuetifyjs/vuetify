<template>
  <v-footer>
    <v-container
      fluid
      fill-height
      py-0
    >
      <v-layout align-center justify-end>
        <v-flex shrink>
          &copy; {{ (new Date()).getFullYear() }} — Vuetify, LLC
        </v-flex>
      </v-layout>
    </v-container>
  </v-footer>
</template>

<style lang="stylus" scoped>
  a
    color: rgba(0,0,0,0.54)
    text-decoration: none

    &:hover i,
    &:hover
      color: #1867C0 !important
</style>
