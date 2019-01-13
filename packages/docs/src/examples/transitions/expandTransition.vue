<template>
  <div class="text-xs-center">
    <v-btn
      dark
      color="primary"
      @click="expand = !expand"
    >
      Expand Transition
    </v-btn>

    <v-expand-transition>
      <div v-if="expand">
        <v-btn flat>
          <v-icon>star_border</v-icon>
        </v-btn>
        <v-btn flat>
          <v-icon>settings</v-icon>
        </v-btn>
        <v-btn flat>
          <v-icon>power</v-icon>
        </v-btn>
      </div>
    </v-expand-transition>
  </div>
</template>
<script>
  export default {
    data: () => ({
      expand: false
    })
  }
</script>
