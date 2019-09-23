<template>
  <v-card flat class="py-12">
    <v-card-text>
      <v-container fluid class="pa-0">
        <v-row>
          <v-col cols="12" sm="6" class="py-2">
            <p>Exclusive</p>
            <v-btn-toggle v-model="toggle_exclusive">
              <v-btn text>
                <v-icon>mdi-format-align-left</v-icon>
              </v-btn>
              <v-btn text>
                <v-icon>mdi-format-align-center</v-icon>
              </v-btn>
              <v-btn text>
                <v-icon>mdi-format-align-right</v-icon>
              </v-btn>
              <v-btn text>
                <v-icon>mdi-format-align-justify</v-icon>
              </v-btn>
            </v-btn-toggle>
          </v-col>
          <v-col cols="12" sm="6" class="py-2">
            <p>Multiple</p>
            <v-btn-toggle v-model="toggle_multiple" multiple>
              <v-btn text>
                <v-icon>mdi-format-bold</v-icon>
              </v-btn>
              <v-btn text>
                <v-icon>mdi-format-italic</v-icon>
              </v-btn>
              <v-btn text>
                <v-icon>mdi-format-underline</v-icon>
              </v-btn>
              <v-btn text>
                <v-icon>mdi-format-color-fill</v-icon>
              </v-btn>
            </v-btn-toggle>
          </v-col>
          <v-col cols="12" sm="6" class="py-2">
            <p>No Options Selected</p>
            <v-btn-toggle v-model="toggle_none">
              <v-btn text>
                <v-icon>mdi-format-align-left</v-icon>
              </v-btn>
              <v-btn text>
                <v-icon>mdi-format-align-center</v-icon>
              </v-btn>
              <v-btn text>
                <v-icon>mdi-format-align-right</v-icon>
              </v-btn>
              <v-btn text>
                <v-icon>mdi-format-align-justify</v-icon>
              </v-btn>
            </v-btn-toggle>
          </v-col>
          <v-col cols="12" sm="6" class="py-2">
            <p>Mandatory</p>
            <v-btn-toggle v-model="toggle_one" mandatory>
              <v-btn text>
                <v-icon>mdi-format-align-left</v-icon>
              </v-btn>
              <v-btn text>
                <v-icon>mdi-format-align-center</v-icon>
              </v-btn>
              <v-btn text>
                <v-icon>mdi-format-align-right</v-icon>
              </v-btn>
              <v-btn text>
                <v-icon>mdi-format-align-justify</v-icon>
              </v-btn>
            </v-btn-toggle>
          </v-col>
          <v-col cols="12" sm="6" class="py-2">
            <p>Text Options</p>
            <v-btn-toggle v-model="text">
              <v-btn text value="left">
                Left
              </v-btn>
              <v-btn text value="center">
                Center
              </v-btn>
              <v-btn text value="right">
                Right
              </v-btn>
              <v-btn text value="justify">
                Justify
              </v-btn>
            </v-btn-toggle>
          </v-col>
          <v-col cols="12" sm="6" class="py-2">
            <p>Text &amp; Icon Options</p>
            <v-btn-toggle v-model="icon">
              <v-btn text value="left">
                <span class="hidden-sm-and-down">Left</span>
                <v-icon>mdi-format-align-left</v-icon>
              </v-btn>
              <v-btn text value="center">
                <span class="hidden-sm-and-down">Center</span>
                <v-icon>mdi-format-align-center</v-icon>
              </v-btn>
              <v-btn text value="right">
                <span class="hidden-sm-and-down">Right</span>
                <v-icon>mdi-format-align-right</v-icon>
              </v-btn>
              <v-btn text value="justify">
                <span class="hidden-sm-and-down">Justify</span>
                <v-icon>mdi-format-align-justify</v-icon>
              </v-btn>
            </v-btn-toggle>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    data () {
      return {
        text: 'center',
        icon: 'justify',
        toggle_none: null,
        toggle_one: 0,
        toggle_exclusive: 2,
        toggle_multiple: [0, 1, 2],
      }
    },
  }

</script>
