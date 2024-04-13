<template>
  <v-card
    class="mx-auto"
    max-width="600"
  >
    <div class="d-flex justify-space-between pa-4 pb-0">
      <v-btn-toggle
        v-model="formatting"
        variant="outlined"
        divided
        multiple
      >
        <v-btn>
          <v-icon icon="mdi-format-italic"></v-icon>
        </v-btn>

        <v-btn>
          <v-icon icon="mdi-format-bold"></v-icon>
        </v-btn>

        <v-btn>
          <v-icon icon="mdi-format-underline"></v-icon>
        </v-btn>

        <v-btn>
          <div class="d-flex align-center flex-column justify-center">
            <v-icon icon="mdi-format-color-text"></v-icon>

            <v-sheet
              color="purple"
              height="4"
              width="26"
              tile
            ></v-sheet>
          </div>
        </v-btn>
      </v-btn-toggle>

      <v-btn-toggle
        v-model="alignment"
        variant="outlined"
        divided
      >
        <v-btn>
          <v-icon icon="mdi-format-align-center"></v-icon>
        </v-btn>

        <v-btn>
          <v-icon icon="mdi-format-align-left"></v-icon>
        </v-btn>

        <v-btn>
          <v-icon icon="mdi-format-align-right"></v-icon>
        </v-btn>
      </v-btn-toggle>
    </div>

    <v-sheet class="pa-4 text-center">
      <v-textarea
        v-model="value"
        rows="2"
        variant="outlined"
        auto-grow
        full-width
        hide-details
      ></v-textarea>
    </v-sheet>
  </v-card>
</template>

<script setup>
  import { ref } from 'vue'

  const alignment = ref(1)
  const formatting = ref([])
  const value = ref('Toggle button requirements.\n\nHave at least three toggle buttons in a group\nLabel buttons with text, an icon, or')
</script>

<script>
  export default {
    data: () => ({
      alignment: 1,
      formatting: [],
      value: 'Toggle button requirements.\n\nHave at least three toggle buttons in a group\nLabel buttons with text, an icon, or',
    }),
  }
</script>
