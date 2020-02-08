<template>
  <v-container class="fill-height">
    <v-row
      align="center"
      justify="center"
    >
      <v-btn
        class="white--text"
        v-bind="{
          ...attrs,
          color: attrs.color || 'deep-purple accent-4',
          [attrs.size]: true
        }"
        :elevation="!hasElevation ? undefined : attrs.elevation"
      >
        <v-icon v-if="attrs.fab || attrs.icon">mdi-account</v-icon>

        <span v-else>Click Me</span>
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
  import Usage from './usage'

  export default {
    mixins: [Usage],

    computed: {
      hasElevation () {
        return !(
          this.attrs.outlined ||
          this.attrs.depressed ||
          this.attrs.icon ||
          this.attrs.text
        )
      },
    },
  }
</script>
