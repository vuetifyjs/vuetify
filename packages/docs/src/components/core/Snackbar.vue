<template>
  <v-theme-provider dark>
    <v-snackbar
      v-model="snack"
      :color="snackbar.color"
      :style="styles"
      :timeout="0"
      :vertical="$vuetify.breakpoint.xsOnly"
      top
    >
      <v-row
        align="center"
        class="mx-0"
      >
        <v-icon
          v-if="computedIcon"
          class="mr-2"
        >
          {{ computedIcon }}
        </v-icon>

        <span
          v-if="snackbar.emoji"
          class="mr-2"
          v-text="snackbar.emoji"
        />

        <base-markdown
          :code="snackbar.text"
          class="snack-markdown"
        />

        <v-btn
          :ripple="false"
          class="black--text ml-auto ml-sm-4"
          color="white"
          depressed
          v-bind="bind"
          @click="$ga.event('snackbar', 'click', snackbar.metadata.slug)"
        >
          {{ snackbar.action_text }}

          <v-icon right>mdi-open-in-new</v-icon>
        </v-btn>

        <v-btn
          :aria-label="$t('Vuetify.Snackbar.close')"
          :ripple="false"
          class="ml-4"
          color="grey darken-1"
          icon
          small
          @click="onClick"
        >
          <v-icon>$vuetify.cancel</v-icon>
        </v-btn>
      </v-row>
    </v-snackbar>
  </v-theme-provider>
</template>

<script>
  import {
    get,
    sync,
  } from 'vuex-pathify'

  export default {
    name: 'CoreSnackbar',

    computed: {
      snack: sync('snackbar/value'),
      snackbar: get('snackbar/snackbar'),
      bind () {
        const { action } = this.snackbar
        const isExternal = action.indexOf('http') > -1

        return !isExternal ? { to: action } : {
          href: action,
          target: '_blank',
        }
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
      styles () {
        const { top, bar } = this.$vuetify.application

        return { top: `${top + bar + 16}px` }
      },
    },

    watch: {
      snackbar: {
        deep: true,
        handler () {
          this.snack = true
        },
      },
    },

    methods: {
      onClick () {
        this.$ga.event('snackbar', 'click', `dismissed ${this.snackbar.slug}`)
        this.snack = false
      },
    },
  }
</script>

<style>
  .snack-markdown p {
    margin-bottom: 0 !important;
  }
</style>
