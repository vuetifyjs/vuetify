<template>
  <v-card>
    <v-container fluid>
      <v-row
        align="center"
      >
        <v-col cols="12">
          <v-autocomplete
            v-model="values"
            :items="items"
            outlined
            dense
            chips
            small-chips
            label="Outlined"
            multiple
          ></v-autocomplete>
        </v-col>
        <v-col cols="12">
          <v-autocomplete
            v-model="values"
            :items="items"
            dense
            chips
            small-chips
            label="Solo"
            multiple
            solo
          ></v-autocomplete>
        </v-col>
        <v-col cols="12">
          <v-autocomplete
            v-model="value"
            :items="items"
            dense
            filled
            label="Filled"
          ></v-autocomplete>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      items: ['foo', 'bar', 'fizz', 'buzz'],
      values: ['foo', 'bar'],
      value: null,
    }),
  }
</script>
