<template>
  <v-container>
    <v-row class="flex-child">
      <v-col
        class="d-flex"
        cols="12"
        md="4"
      >
        <v-sheet
          class="d-flex"
          color="grey lighten-3"
          height="424"
        >
          <v-sheet-footer>
            #1: (3r x 2c)
          </v-sheet-footer>
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
              color="green lighten-3"
              height="150"
            >
              <v-sheet-footer>
                #2: (1r x 1c)
              </v-sheet-footer>
            </v-sheet>
          </v-col>

          <v-col cols="6">
            <v-sheet
              class="d-flex"
              color="yellow lighten-3"
              height="150"
            >
              <v-sheet-footer>
                #3: (1r x 1c)
              </v-sheet-footer>
            </v-sheet>
          </v-col>

          <v-col cols="12">
            <v-sheet
              class="d-flex"
              color="red lighten-3"
              height="250"
            >
              <v-sheet-footer>
                #5: (2r x 2c)
              </v-sheet-footer>
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
          color="teal lighten-3"
          height="300"
        >
          <v-sheet-footer>
            #4: (2r x 1c)
          </v-sheet-footer>
        </v-sheet>
      </v-col>

      <v-col
        class="d-flex"
        cols="6"
        md="2"
      >
        <v-sheet
          class="d-flex mt-auto"
          color="purple lighten-3"
          height="300"
        >
          <v-sheet-footer>
            #6: (2r x 1c)
          </v-sheet-footer>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    components: {
      // A simple helper component
      VSheetFooter: {
        functional: true,

        render (h, { children }) {
          return h('v-sheet', {
            staticClass: 'mt-auto align-center justify-center d-flex px-2',
            props: {
              color: 'rgba(0, 0, 0, .36)',
              dark: true,
              height: 50,
            },
          }, children)
        },
      },
    },
  }
</script>
