<template>
  <div
    class="font-weight-light mb-3"
    :class="[
      $vuetify.breakpoint.smAndDown ? 'subtitle-1' : 'title',
      dark ? 'text--lighten-4' : 'text--darken-3',
      $vuetify.theme.dark ? undefined : 'grey--text'
    ]"
    :style="measurableStyles"
  >
    <base-markdown><slot /></base-markdown>
  </div>
</template>

<script>
  // Mixins
  import Measurable from 'vuetify/es5/mixins/measurable'
  import Themeable from 'vuetify/es5/mixins/themeable'

  export default {
    name: 'BaseText',

    mixins: [
      Measurable,
      Themeable,
    ],
  }
</script>
