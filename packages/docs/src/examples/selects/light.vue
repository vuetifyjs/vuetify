<template>
  <v-card>
    <v-container
      fluid
      grid-list-xl
    >
      <v-layout
        align-center
        wrap
      >
        <v-flex xs12 sm6>
          <v-select
            v-model="value"
            :items="items"
            attach
            chips
            label="Chips"
            multiple
          ></v-select>
        </v-flex>
        <v-flex xs12 sm6>
          <v-select
            v-model="value"
            :items="items"
            box
            chips
            label="Chips"
            multiple
          ></v-select>
        </v-flex>
        <v-flex xs12 sm6>
          <v-select
            v-model="value"
            :items="items"
            chips
            label="Chips"
            multiple
            outline
          ></v-select>
        </v-flex>
        <v-flex xs12 sm6>
          <v-select
            v-model="value"
            :items="items"
            chips
            label="Chips"
            multiple
            solo
          ></v-select>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      items: ['foo', 'bar', 'fizz', 'buzz'],
      value: ['foo', 'bar', 'fizz', 'buzz']
    })
  }
</script>
