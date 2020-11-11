<template>
  <v-card
    max-width="400"
    class="mx-auto"
  >
    <v-textarea
      v-model="value"
      auto-grow
      full-width
      rows="2"
    ></v-textarea>

    <v-row
      class="px-2 pb-2 ma-0"
      justify="space-between"
    >
      <v-btn-toggle
        v-model="formatting"
        multiple
      >
        <v-btn>
          <v-icon>mdi-format-italic</v-icon>
        </v-btn>

        <v-btn>
          <v-icon>mdi-format-bold</v-icon>
        </v-btn>

        <v-btn>
          <v-icon>mdi-format-underline</v-icon>
        </v-btn>

        <v-btn>
          <v-row
            align="center"
            class="flex-column"
            justify="center"
          >
            <v-icon class="cols 12">
              mdi-format-color-text
            </v-icon>

            <v-sheet
              tile
              style="margin-top: -4px;"
              height="4"
              width="26"
              color="purple"
            ></v-sheet>
          </v-row>
        </v-btn>
      </v-btn-toggle>

      <v-btn-toggle v-model="alignment">
        <v-btn>
          <v-icon>mdi-format-align-center</v-icon>
        </v-btn>

        <v-btn>
          <v-icon>mdi-format-align-left</v-icon>
        </v-btn>

        <v-btn>
          <v-icon>mdi-format-align-right</v-icon>
        </v-btn>
      </v-btn-toggle>
    </v-row>

    <v-sheet
      class="pa-4 text-center"
      tile
    >
      <v-row
        class="mb-2"
        dense
      >
        <v-col
          v-for="n in numbers"
          :key="n"
          class="caption grey--text text--darken-1"
          v-text="n"
        ></v-col>
      </v-row>

      <v-row dense>
        <v-col
          v-for="l in letters"
          :key="l"
          class="title grey--text font-weight-regular text--darken-2"
          v-text="l"
        ></v-col>
      </v-row>
    </v-sheet>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      alignment: 1,
      formatting: [],
      numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
      letters: 'qwertyuiop'.split(''),
      value: 'Toggle button requirements.\r\rHave at least three toggle buttons in a group\rLabel buttons with text, an icon, or',
    }),
  }
</script>
