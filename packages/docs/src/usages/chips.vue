<template>
  <v-container class="fill-height">
    <v-row
      align="center"
      justify="center"
    >
      <v-chip
        v-bind="attrs"
        :input-value="attrs.value"
      >
        <v-avatar
          v-if="attrs.avatar"
          color="secondary"
          left
        >
          <v-icon>{{ attrs.icon || 'mdi-account-circle' }}</v-icon>
        </v-avatar>
        <v-icon
          v-if="attrs.icon"
          left
        >
          {{ attrs.icon }}
        </v-icon>
        Chip Component
      </v-chip>
    </v-row>
  </v-container>
</template>

<script>
  import Usage from './usage'

  export default {
    mixins: [Usage],
  }
</script>
