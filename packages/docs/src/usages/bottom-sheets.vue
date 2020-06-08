<template>
  <v-container class="fill-height">
    <v-row
      align="center"
      justify="center"
    >
      <v-bottom-sheet v-model="sheet" v-bind="attrs">
        <template v-slot:activator="{ on, attrs: activatorAttrs }">
          <v-btn
            color="purple"
            dark
            v-bind="activatorAttrs"
            v-on="on"
          >
            Open Playground
          </v-btn>
        </template>
        <v-sheet class="text-center" height="200px">
          <v-btn
            class="my-6"
            depressed
            color="error"
            @click="sheet = !sheet"
          >close</v-btn>
          <div class="title">Active Playground Props</div>
          <div v-if="sheet">v-model</div>
          <div v-if="attrs.inset">inset</div>
          <div v-if="attrs['hide-overlay']">hide-overlay</div>
          <div v-if="attrs.persistent">persistent</div>
        </v-sheet>
      </v-bottom-sheet>
    </v-row>
  </v-container>
</template>

<script>
  import Usage from './usage'

  export default {
    mixins: [Usage],
    data: () => ({
      sheet: false,
    }),
  }
</script>
