<template>
  <v-theme-provider dark>
    <v-snackbar
      v-model="snack"
      :color="snackbar.color"
      :timeout="snackbar.timeout"
      :vertical="$vuetify.breakpoint.xsOnly"
      top
    >
      <v-row
        align="center"
        class="mx-0"
      >
        <v-icon
          v-if="computedIcon"
          class="mr-4"
        >
          {{ computedIcon }}
        </v-icon>

        <base-markdown
          :code="snackbar.msg"
          class="snack-markdown"
        />

        <v-btn
          :ripple="false"
          class="black--text ml-auto ml-sm-4"
          color="white"
          depressed
          v-bind="bind"
          @click="onClick"
        >
          {{ snackbar.text }}

          <v-icon right>mdi-open-in-new</v-icon>
        </v-btn>

        <v-btn
          v-if="snackbar.close"
          :aria-label="$t('Vuetify.Snackbar.close')"
          :ripple="false"
          class="ml-4"
          color="grey darken-1"
          icon
          small
          @click="markViewed"
        >
          <v-icon>$vuetify.cancel</v-icon>
        </v-btn>
      </v-row>
    </v-snackbar>
  </v-theme-provider>
</template>

<script>
  import {
    mapMutations,
    mapState,
  } from 'vuex'

  export default {
    computed: {
      ...mapState('snackbar', ['snackbar', 'value']),
      bind () {
        if (this.snackbar.to) return { to: this.snackbar.to }
        if (this.snackbar.href) {
          return {
            href: this.snackbar.href,
            target: '_blank',
            rel: 'noopener',
          }
        }

        return {}
      },
      computedColor () {
        if (this.snackbar.color !== 'store') {
          return !this.computedIcon ? 'primary lighten-3' : null
        }

        return 'green'
      },
      computedIcon () {
        switch (this.snackbar.color) {
          case 'store': return 'mdi-cart'
          case 'success': return 'mdi-check'
          case 'info': return 'mdi-information'
          case 'warning': return 'mdi-alert'
          case 'error': return 'mdi-alert-circle'
          default: return false
        }
      },
      snack: {
        get () {
          return this.value
        },
        set (val) {
          this.setValue(val)
        },
      },
    },

    watch: {
      $route () {
        this.snack = false
      },
      snackbar () {
        if (localStorage.getItem(this.snackbar.id)) return

        this.snack = true
      },
    },

    async created () {
      // if (this.$ssrContext) return

      const notify = require('@/data/api/notify.json')

      // const notify = await fetch('https://cdn.vuetifyjs.com/notify.json', {
      //   headers: {
      //     'Access-Control-Allow-Origin': '*'
      //   }
      // }).then(res => res.json())

      if (notify.href) this.setSnackbar(notify)
    },

    methods: {
      ...mapMutations('snackbar', ['setSnackbar', 'setValue']),
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
      },
    },
  }
</script>

<style>
  .snack-markdown p {
    margin-bottom: 0 !important;
  }
</style>
