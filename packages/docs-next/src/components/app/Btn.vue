<template>
  <v-btn
    class="v-btn--app text--secondary text-capitalize font-weight-regular px-2"
    text
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot v-if="$slots.default" />

    <i18n
      v-else-if="path"
      :path="path"
    />
  </v-btn>
</template>

<script>
  // Utilities
  import { get } from 'vuex-pathify'

  export default {
    name: 'AppBtn',

    props: { path: String },

    computed: { locale: get('route/params@locale') },
  }
</script>
