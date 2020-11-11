<template>
  <v-container fluid>
    <v-switch v-model="switchMe">
      <template v-slot:label>
        Turn on the progress: <v-progress-circular
          :indeterminate="switchMe"
          :value="0"
          size="24"
          class="ml-2"
        ></v-progress-circular>
      </template>
    </v-switch>
  </v-container>
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
