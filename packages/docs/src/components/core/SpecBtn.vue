<template>
  <v-tooltip
    left
    bottom
  >
    <template #activator="{ on }">
      <v-btn
        :href="link"
        icon
        target="_blank"
        rel="noopener"
        aria-label="Material Design Specification"
        v-on="on"
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
    </template>
    <span>Material Design Specification</span>
  </v-tooltip>
</template>

<script>
  export default {
    props: {
      link: {
        type: String,
        default: 'https://material.io/design/',
      },
      version: {
        type: String,
        default: '',
      },
    },
  }
</script>
