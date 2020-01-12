<template>
  <v-container class="fill-height">
    <v-row
      align="center"
      justify="center"
    >
      <v-icon
        v-bind="{
          ...attrs,
          [attrs.size]: true,
        }"
      >
        {{ attrs.icon || 'mdi-plus' }}
      </v-icon>
    </v-row>
  </v-container>
</template>

<script>
  import Usage from './usage'

  export default {
    mixins: [Usage],
  }
</script>
