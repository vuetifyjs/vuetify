<template>
  <v-theme-provider dark>
    <v-snackbar
      v-model="snack"
      :color="snackbar.color"
      :style="styles"
      :timeout="0"
      top
    >
      <v-row
        align="center"
        class="mx-0 flex-wrap flex-md-nowrap"
      >
        <div class="d-flex align-center">
          <span
            v-if="snackbar.emoji"
            class="mr-2"
            v-text="snackbar.emoji"
          />

          <base-markdown
            :code="snackbar.text"
            class="snack-markdown"
          />
        </div>

        <v-btn
          :ripple="false"
          class="black--text mt-3 mt-sm-0 ml-auto ml-sm-4"
          color="white"
          depressed
          v-bind="bind"
          @click="snack = false"
        >
          {{ snackbar.action_text }}

          <v-icon right>mdi-open-in-new</v-icon>
        </v-btn>

        <v-btn
          :aria-label="$t('Vuetify.Snackbar.close')"
          :ripple="false"
          class="ml-8 mt-3 mt-sm-0"
          color="white"
          icon
          x-small
          @click="snack = false"
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

        return !isExternal ? { to: `/${this.$route.params.lang}${action}` } : {
          href: action,
          target: '_blank',
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
  }
</script>

<style>
  .snack-markdown p {
    margin-bottom: 0 !important;
  }
</style>
