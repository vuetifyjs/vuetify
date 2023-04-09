<template>
  <v-container>
    <v-row class="flex-child text-subtitle-2">
      <v-col
        class="d-flex"
        cols="12"
        md="4"
      >
        <v-sheet
          class="d-flex"
          color="grey-lighten-3"
          height="424"
        >
          <sheet-footer>
            #1: (3r x 2c)
          </sheet-footer>
        </v-sheet>
      </v-col>

      <v-col
        class="d-flex"
        cols="12"
        md="4"
      >
        <v-row class="ma-n3">
          <v-col cols="6">
            <v-sheet
              class="d-flex"
              color="green-lighten-3"
              height="150"
            >
              <sheet-footer>
                #2: (1r x 1c)
              </sheet-footer>
            </v-sheet>
          </v-col>

          <v-col cols="6">
            <v-sheet
              class="d-flex"
              color="yellow-lighten-3"
              height="150"
            >
              <sheet-footer>
                #3: (1r x 1c)
              </sheet-footer>
            </v-sheet>
          </v-col>

          <v-col cols="12">
            <v-sheet
              class="d-flex"
              color="red-lighten-3"
              height="250"
            >
              <sheet-footer>
                #5: (2r x 2c)
              </sheet-footer>
            </v-sheet>
          </v-col>
        </v-row>
      </v-col>

      <v-col
        cols="6"
        md="2"
      >
        <v-sheet
          class="d-flex"
          color="teal-lighten-3"
          height="300"
        >
          <sheet-footer>
            #4: (2r x 1c)
          </sheet-footer>
        </v-sheet>
      </v-col>

      <v-col
        class="d-flex"
        cols="6"
        md="2"
      >
        <v-sheet
          class="d-flex mt-auto"
          color="purple-lighten-3"
          height="300"
        >
          <sheet-footer>
            #6: (2r x 1c)
          </sheet-footer>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { h } from 'vue'

  export default {
    components: {
      // A simple helper component
      SheetFooter: {
        setup (_, { slots }) {
          return () => h('v-sheet', {
            class: 'ma-auto px-4',
            color: 'rgba(0, 0, 0, .36)',
            height: 50,
          }, slots.default())
        },
      },
    },
  }
</script>
