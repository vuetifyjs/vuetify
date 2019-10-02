<template>
  <v-container class="fill-height">
    <v-row
      align="center"
      justify="center"
    >
      <v-alert
        v-bind="{
          ...attrs,
          color: attrs.color || (!attrs.type ? 'deep-purple accent-4' : undefined),
          dark: !attrs['colored-border']
        }"
      >
        Donec elit libero, sodales nec, volutpat a, suscipit non, turpis. In auctor lobortis lacus.
      </v-alert>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    props: {
      attrs: {
        type: Object,
        default: () => ({}),
      },
    },
  }
</script>
