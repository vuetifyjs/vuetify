<template>
  <v-card
    max-width="400"
    class="mx-auto"
  >
    <v-textarea
      v-model="value"
      full-width
      auto-grow
      rows="2"
    ></v-textarea>
    <v-layout
      px-2
      pb-2
      justify-space-between
      wrap
    >
      <v-btn-toggle
        v-model="formatting"
        multiple
      >
        <v-btn color="white">
          <v-icon>mdi-format-italic</v-icon>
        </v-btn>
        <v-btn color="white">
          <v-icon>mdi-format-bold</v-icon>
        </v-btn>
        <v-btn color="white">
          <v-icon>mdi-format-underline</v-icon>
        </v-btn>
        <v-btn color="white">
          <v-layout column>
            <v-icon>mdi-format-color-text</v-icon>
            <v-sheet
              tile
              style="margin-top: -4px;"
              height="4"
              width="26"
              color="purple"
            ></v-sheet>
          </v-layout>
        </v-btn>
      </v-btn-toggle>
      <v-btn-toggle v-model="alignment">
        <v-btn color="white">
          <v-icon>mdi-format-align-center</v-icon>
        </v-btn>
        <v-btn color="white">
          <v-icon>mdi-format-align-left</v-icon>
        </v-btn>
        <v-btn color="white">
          <v-icon>mdi-format-align-right</v-icon>
        </v-btn>
      </v-btn-toggle>
    </v-layout>
    <v-sheet
      color="grey lighten-3"
      tile
      class="pa-4 text-center"
    >
      <v-layout mb-2>
        <v-flex
          v-for="n in numbers"
          :key="n"
          caption
          grey--text
          text--darken-1
          v-text="n"
        ></v-flex>
      </v-layout>
      <v-layout>
        <v-flex
          v-for="l in letters"
          :key="l"
          title
          grey--text
          font-weight-regular
          text--darken-2
          v-text="l"
        ></v-flex>
      </v-layout>
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
