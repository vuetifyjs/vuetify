<template>
  <div
    class="font-weight-light grey--text mb-3"
    :class="[
      $vuetify.breakpoint.smAndDown ? 'subtitle-1' : 'title',
      dark ? 'text--lighten-4' : 'text--darken-3'
    ]"
    :style="measurableStyles"
  >
    <doc-markdown><slot /></doc-markdown>
  </div>
</template>

<script>
  // Mixins
  import Measurable from 'vuetify/lib/mixins/measurable'
  import Themeable from 'vuetify/lib/mixins/themeable'

  export default {
    name: 'BaseText',

    mixins: [
      Measurable,
      Themeable,
    ],
  }
</script>
