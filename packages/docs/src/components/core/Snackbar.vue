<template>
  <v-snackbar
    v-model="snack"
    :color="snackbar.color"
    :style="{
      marginBottom: $vuetify.breakpoint.smOnly ? '40px' : null
    }"
    :timeout="snackbar.timeout"
    bottom
  >
    <v-row
      align="center"
      class="mx-0"
    >
      <v-icon
        v-if="computedIcon"
        class="mr-4"
        dark
      >
        {{ computedIcon }}
      </v-icon>

      <doc-markdown
        :code="snackbar.msg"
        class="snack-markdown"
      />

      <v-spacer />

      <v-btn
        :ripple="false"
        class="text--primary"
        color="white"
        depressed
        v-bind="bind"
        @click="onClick"
      >
        {{ snackbar.text }}
      </v-btn>

      <v-btn
        v-if="snackbar.close"
        :aria-label="$t('Vuetify.Snackbar.close')"
        :ripple="false"
        class="ml-4"
        icon
        @click="markViewed"
      >
        <v-icon>clear</v-icon>
      </v-btn>
    </v-row>
  </v-snackbar>
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
          case 'success': return 'check'
          case 'info': return 'info'
          case 'warning': return 'warning'
          case 'error': return 'error'
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
