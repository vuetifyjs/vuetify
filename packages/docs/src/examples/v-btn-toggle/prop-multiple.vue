<template>
  <v-card
    flat
    class="py-12"
  >
    <v-card-text>
      <v-row
        align="center"
        justify="center"
      >
        <v-col cols="12">
          <p class="text-center">
            Multiple
          </p>
        </v-col>
        <v-btn-toggle
          v-model="toggle_exclusive"
          multiple
        >
          <v-btn>
            <v-icon>mdi-format-align-left</v-icon>
          </v-btn>
          <v-btn>
            <v-icon>mdi-format-align-center</v-icon>
          </v-btn>
          <v-btn>
            <v-icon>mdi-format-align-right</v-icon>
          </v-btn>
          <v-btn>
            <v-icon>mdi-format-align-justify</v-icon>
          </v-btn>
        </v-btn-toggle>

        <v-col
          cols="12"
          class="text-center"
        >
          Model: {{ toggle_exclusive }}
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    data () {
      return {
        toggle_exclusive: [],
      }
    },
  }
</script>
