<template>
  <v-snackbar
    :color="snackbar.color"
    :timeout="snackbar.timeout"
    v-model="snack"
    bottom
    right
  >
    <v-layout
      align-center
    >
      <v-icon
        v-if="computedIcon"
        dark
        class="mr-3"
      >
        {{ computedIcon }}
      </v-icon>
      <markdown
        :source="snackbar.msg"
        class="snack-markdown"
      />
      <v-spacer />
      <v-btn
        :color="!computedIcon ? 'primary lighten-3' : null"
        :ripple="false"
        v-bind="bind"
        dark
        flat
        @click="onClick"
      >
        {{ snackbar.text }}
      </v-btn>
      <v-btn
        v-if="snackbar.close"
        :ripple="false"
        icon
        class="ml-3"
        @click="markViewed"
      >
        <v-icon>clear</v-icon>
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
        if (localStorage.getItem(this.snackbar.id)) return

        this.snack = true
      }
    },

    methods: {
      markViewed () {
        if (this.snackbar.id) {
          localStorage.setItem(this.snackbar.id, true)
        }
        this.snack = false
      },
      onClick () {
        this.$ga.event('snackbar', 'click', this.snackbar.id)

        this.markViewed()

        this.snackbar.handler &&
          this.snackbar.handler()
      }
    }
  }
</script>

<style>
  .snack-markdown p {
    margin-bottom: 0 !important;
  }
</style>
