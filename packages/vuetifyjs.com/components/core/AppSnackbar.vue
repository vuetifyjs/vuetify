<template>
  <v-snackbar
    top
    center
    :color="snackbar.color"
    v-model="snack"
  >
    <v-layout
      align-center
    >
      <v-icon
        dark
        class="mr-3"
        v-if="computedIcon"
      >
        {{ computedIcon }}
      </v-icon>
      <span v-text="snackbar.msg" />
      <v-spacer />
      <v-btn
        flat
        :ripple="false"
        @click="onClick"
        dark
        :color="!computedIcon ? 'primary lighten-3' : null"
      >
        {{ snackbar.text }}
      </v-btn>
    </v-layout>
  </v-snackbar>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    data: () => ({
      snack: false
    }),

    computed: {
      ...mapState({
        snackbar: state => state.appSnackbar
      }),
      computedIcon () {
        switch (this.snackbar.color) {
          case 'success': return 'check'
          case 'info': return 'info'
          case 'warning': return 'warning'
          case 'error': return 'error'
          default: return false
        }
      }
    },

    watch: {
      snackbar () {
        this.snack = true
      }
    },

    methods: {
      onClick () {
        this.snack = false

        this.snackbar.handler &&
          this.snackbar.handler()
      }
    }
  }
</script>
