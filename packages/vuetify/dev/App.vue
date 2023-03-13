<template>
  <v-app>
    <Playground />
  </v-app>
</template>

<script>
  import Playground from './Playground.vue'
  import { provideDefaults } from '@/composables/defaults'

  export default {
    name: 'App',
    components: {
      Playground,
    },
    setup () {
      provideDefaults({
        Playground: {
          foo: 'global',
        },
        global: {
          class: 'v-global-class',
          style: {
            opacity: 0.8,
          },
        },
        VBtn: {
          class: 'v-btn-alt',
          style: {
            opacity: 0.5,
          },
        },
        VCombobox: {
          class: 'v-combobox-alt',
          style: {
            opacity: 0.5,
          },
        },
      })
    },
  }
</script>
