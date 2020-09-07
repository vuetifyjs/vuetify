<template>
  <v-btn
    class="v-btn--app text--secondary text-capitalize font-weight-regular px-2"
    v-bind="{
      text: true,
      ...$attrs,
    }"
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
  export default {
    name: 'AppBtn',

    props: { path: String },
  }
</script>
