<template>
  <v-card flat class="py-12">
    <v-card-text>
      <v-layout column align-center>
        <p>Rounded</p>
        <v-btn-toggle v-model="toggle_exclusive" rounded>
          <v-btn>
            <v-icon>format_align_left</v-icon>
          </v-btn>
          <v-btn>
            <v-icon>format_align_center</v-icon>
          </v-btn>
          <v-btn>
            <v-icon>format_align_right</v-icon>
          </v-btn>
          <v-btn>
            <v-icon>format_align_justify</v-icon>
          </v-btn>
        </v-btn-toggle>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    data () {
      return {
        toggle_exclusive: undefined,
      }
    },
  }

</script>
