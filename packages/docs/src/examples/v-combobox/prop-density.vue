<template>
  <v-card>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-combobox
            v-model="value"
            :items="items"
            label="Default"
          ></v-combobox>
        </v-col>
        <v-col cols="12">
          <v-combobox
            v-model="value"
            :items="items"
            density="comfortable"
            label="Comfortable"
          ></v-combobox>
        </v-col>
        <v-col cols="12">
          <v-combobox
            v-model="value"
            :items="items"
            density="compact"
            label="Compact"
          ></v-combobox>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      items: ['foo', 'bar', 'fizz', 'buzz'],
      value: 'foo',
    }),
  }
</script>
