<template>
  <v-expansion-panels v-bind="attrs">
    <v-expansion-panel
      v-for="(item,i) in 5"
      :key="i"
    >
      <v-expansion-panel-header>Item</v-expansion-panel-header>
      <v-expansion-panel-content>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
  import Usage from './usage'

  export default {
    mixins: [Usage],
  }
</script>
