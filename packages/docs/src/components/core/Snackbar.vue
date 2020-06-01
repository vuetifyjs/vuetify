<template>
  <v-snackbar
    v-model="snack"
    :color="snackbar.color"
    :timeout="-1"
    vertical
  >
    <div class="d-flex">
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

    <template v-slot:action="{ attrs }">
      <v-btn
        class="mr-2"
        color="pink lighten-3"
        text
        v-bind="{ ...bind, ...attrs }"
        @click="snack = false"
      >
        {{ snackbar.action_text }}
      </v-btn>

      <v-btn
        :aria-label="$t('Vuetify.Snackbar.close')"
        color="white"
        icon
        @click="snack = false"
      >
        <v-icon small>$vuetify.close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
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
