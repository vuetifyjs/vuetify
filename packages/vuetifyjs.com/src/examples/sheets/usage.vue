<template>
  <v-container grid-list-xl>
    <v-layout
      flex-child
      wrap
    >
      <v-flex
        xs12
        md4
        d-flex
      >
        <v-sheet
          class="d-flex"
          color="grey lighten-3"
          height="424"
        >
          <sheet-footer>
            #1: (3r x 2c)
          </sheet-footer>
        </v-sheet>
      </v-flex>

      <v-flex
        xs12
        md4
        d-flex
      >
        <v-layout wrap>
          <v-flex xs6>
            <v-sheet
              class="d-flex"
              color="green lighten-3"
              height="150"
            >
              <sheet-footer>
                #2: (1r x 1c)
              </sheet-footer>
            </v-sheet>
          </v-flex>
          <v-flex xs6>
            <v-sheet
              class="d-flex"
              color="yellow lighten-3"
              height="150"
            >
              <sheet-footer>
                #3: (1r x 1c)
              </sheet-footer>
            </v-sheet>
          </v-flex>
          <v-flex xs12>

            <v-sheet
              class="d-flex"
              color="red lighten-3"
              height="250"
            >
              <sheet-footer>
                #5: (2r x 2c)
              </sheet-footer>
            </v-sheet>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex
        xs6
        md2
      >
        <v-sheet
          class="d-flex"
          color="teal lighten-3"
          height="300"
        >
          <sheet-footer>
            #4: (2r x 1c)
          </sheet-footer>
        </v-sheet>
      </v-flex>
      <v-flex
        xs6
        md2
        d-flex
      >
        <v-sheet
          class="d-flex mt-auto"
          color="purple lighten-3"
          height="300"
        >
          <sheet-footer>
            #6: (2r x 1c)
          </sheet-footer>
        </v-sheet>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    components: {
      SheetFooter: {
        functional: true,

        render (h, { children }) {
          return h('v-sheet', {
            staticClass: 'mt-auto align-center justify-center d-flex',
            props: {
              color: 'rgba(0, 0, 0, .36)',
              dark: true,
              height: 50
            }
          }, children)
        }
      }
    }
  }
</script>
