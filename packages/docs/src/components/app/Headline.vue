<template>
  <i18n
    :class="`text-${size} font-weight-${weight} text--${color}`"
    :tag="tag"
    v-bind="$attrs"
    v-on="$listeners"
  />
</template>

<script>
  export default {
    name: 'Headline',

    props: {
      color: {
        type: String,
        default: 'primary',
      },
      size: {
        type: String,
        default: 'h6',
      },
      tag: {
        type: String,
        default: 'div',
      },
      weight: {
        type: String,
        default: 'medium',
      },
    },
  }
</script>
