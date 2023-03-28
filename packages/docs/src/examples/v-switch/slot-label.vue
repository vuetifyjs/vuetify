<template>
  <v-switch v-model="switchMe">
    <template v-slot:label>
      Turn on the progress:
      <v-progress-circular
        :indeterminate="switchMe"
        size="24"
        class="ms-2"
      ></v-progress-circular>
    </template>
  </v-switch>
</template>

<script>
  export default {
    data () {
      return {
        switchMe: false,
      }
    },
  }
</script>
