<template>
  <v-tooltip left>
    <v-btn
      slot="activator"
      :href="link"
      icon
      target="_blank"
      rel="noopener"
      class="mt-2"
      aria-label="Material Design Specification"
    >
      <v-badge
        right
        overlap
        color="transparent"
      >
        <span
          v-if="version"
          slot="badge"
          class="caption black--text font-weight-black pl-2"
        >
          {{ version }}
        </span>
        <v-icon>mdi-material-design</v-icon>
      </v-badge>
    </v-btn>
    <span>Material Design Specification</span>
  </v-tooltip>
</template>

<script>
  export default {
    props: {
      link: {
        type: String,
        default: 'https://material.io/design/'
      },
      version: {
        type: String,
        default: ''
      }
    }
  }
</script>
