<template>
  <v-container
    class="spacing-playground pa-6"
    fluid
  >
    <v-row>
      <v-col
        class="d-flex align-center"
        cols="12"
        sm="6"
      >
        <v-select
          v-model="paddingDirection"
          :items="directions"
          class="pr-2"
          label="Padding"
        >
          <template v-slot:prepend>
            <strong class="primary--text py-1">p</strong>
          </template>

          <template v-slot:append-outer>
            <div class="py-1">
              -
            </div>
          </template>
        </v-select>

        <v-select
          v-model="paddingSize"
          :items="paddingSizes.slice(1)"
          label="Size"
        ></v-select>
      </v-col>

      <v-col
        class="d-flex"
        cols="12"
        sm="6"
      >
        <v-select
          v-model="marginDirection"
          :items="directions"
          class="pr-2"
          label="Margin"
        >
          <template v-slot:prepend>
            <strong class="primary--text py-1">m</strong>
          </template>

          <template v-slot:append-outer>
            <div class="py-1">
              -
            </div>
          </template>
        </v-select>

        <v-select
          v-model="marginSize"
          :items="marginSizes"
          label="Size"
        ></v-select>
      </v-col>

      <v-col
        class="orange lighten-3 pa-0"
        cols="12"
      >
        <v-sheet
          :class="[computedMargin]"
          elevation="4"
          rounded
        >
          <div
            :class="[computedPadding]"
            class="light-green lighten-3"
          >
            <div
              class="white text-center py-6"
              v-text="playgroundText"
            ></div>
          </div>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data () {
      const spacers = Array.from({ length: 17 }, (val, i) => `${i}`)
      const nspacers = Array.from({ length: 16 }, (val, i) => `n${i + 1}`)
      const defaults = ['auto', ...spacers]

      return {
        directions: ['t', 'b', 'l', 'r', 's', 'e', 'x', 'y', 'a'],
        marginDirection: 'a',
        marginSize: '2',
        marginSizes: [...defaults, ...nspacers],
        paddingDirection: 'a',
        paddingSize: '6',
        paddingSizes: defaults,
        playgroundText: 'Use the controls above to try out the different spacing helpers.',
      }
    },

    computed: {
      computedPadding () {
        return `p${this.paddingDirection}-${this.paddingSize}`
      },
      computedMargin () {
        return `m${this.marginDirection}-${this.marginSize}`
      },
    },
  }
</script>
