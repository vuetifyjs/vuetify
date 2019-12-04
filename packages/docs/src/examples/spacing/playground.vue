<template>
  <v-container
    class="spacing-playground py-0 px-2"
    fluid
  >
    <v-row>
      <v-col
        cols="12"
        sm="6"
        class="d-flex align-center"
      >
        <v-select
          v-model="paddingDirection"
          :items="directions"
          label="Padding"
          class="pr-2"
        >
          <template v-slot:prepend>
            <strong class="primary--text">p</strong>
          </template>
          <template v-slot:append-outer>
            <div> - </div>
          </template>
        </v-select>
        <v-select
          v-model="paddingSize"
          :items="paddingSizes.slice(1)"
          label="Size"
        ></v-select>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        class="d-flex"
      >
        <v-select
          v-model="marginDirection"
          :items="directions"
          label="Margin"
          class="pr-2"
        >
          <template v-slot:prepend>
            <strong class="primary--text">m</strong>
          </template>
          <template v-slot:append-outer>
            <div> - </div>
          </template>
        </v-select>
        <v-select
          v-model="marginSize"
          :items="marginSizes"
          label="Size"
        ></v-select>
      </v-col>
      <v-col
        cols="12"
        class="orange lighten-3 pa-0"
      >
        <v-card
          :class="[computedMargin]"
          class="elevation-4"
        >
          <div
            :class="[computedPadding]"
            class="light-green lighten-3"
          >
            <div
              class="white text-center"
              v-text="playgroundText"
            ></div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      directions: ['t', 'b', 'l', 'r', 's', 'e', 'x', 'y', 'a'],
      paddingSizes: ['auto', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      marginSizes: [
        'auto',
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12',
        'n1', 'n2', 'n3', 'n4', 'n5', 'n6', 'n7', 'n8', 'n9', 'n10', 'n11', 'n12',
      ],
      paddingDirection: 'a',
      paddingSize: '2',
      marginDirection: 'a',
      marginSize: '2',
      playgroundText: 'Use the controls above to try out the different spacing helpers',
    }),
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

<style>
  .spacing-playground .v-select .v-input__prepend-outer, .spacing-playground .v-select .v-input__append-outer{
    margin-top: 0.55rem;
    margin-right: 0.2rem;
  }
</style>
