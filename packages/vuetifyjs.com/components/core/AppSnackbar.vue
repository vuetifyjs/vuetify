<template>
  <v-snackbar
    bottom
    center
    :color="snackbar.color"
    :timeout="snackbar.timeout"
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
        dark
        flat
        @click="onClick"
        :color="!computedIcon ? 'primary lighten-3' : null"
        :ripple="false"
        v-bind="bind"
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
      ...mapState('app', {
        snackbar: state => state.appSnackbar
      }),
      bind () {
        if (this.snackbar.to) return { to: this.snackbar.to }
        if (this.snackbar.href) {
 return {
          href: this.snackbar.href,
          target: '_blank',
          rel: 'noopener'
        }
}

        return {}
      },
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
      $route () {
        this.snack = false
      },
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
