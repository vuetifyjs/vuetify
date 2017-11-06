<template>
  <v-container fluid px-0>
    <v-layout row wrap>
      <v-flex
        xs12
        md6
        v-for="color in ['Light', 'Dark']"
        :key="color"
      >
        <v-subheader v-text="color"></v-subheader>
        <v-card flat tile :color="color === 'Dark' ? 'grey darken-3' : ''">
          <v-card-text>
            <v-checkbox
              v-bind:label="`Checkbox 1: ${ex1.toString()}`"
              v-model="ex1"
              :color="color === 'Dark' ? 'blue accent-1' : ''"
              :light="color === 'Light'"
              :dark="color === 'Dark'"
            ></v-checkbox>
            <v-radio-group v-model="ex2">
              <v-radio
                v-for="n in 3"
                :key="n"
                v-bind:label="`Radio ${n}`"
                :color="color === 'Dark' ? 'blue accent-1' : ''"
                :value="n"
                :light="color === 'Light'"
                :dark="color === 'Dark'"
              ></v-radio>
            </v-radio-group>
            <v-switch
              v-bind:label="`Switch 1: ${ex1.toString()}`"
              v-model="ex3"
              :color="color === 'Dark' ? 'blue accent-1' : ''"
              :light="color === 'Light'"
              :dark="color === 'Dark'"
            ></v-switch>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        ex1: true,
        ex2: 1,
        ex3: true,
        ex4: false,
      }
    }
  }
</script>
