<template>
  <v-list>
    <v-list-item v-click-outside="() => clickOutside1 = false" @click="clickOutside1 = true">
      <v-list-item-title>Click outside - handler only</v-list-item-title>
      <v-list-item-action>
        <v-icon :color="clickOutside1 ? 'green' : 'red'">mdi-record</v-icon>
      </v-list-item-action>
    </v-list-item>

    <v-list-item v-click-outside="{ handler: () => clickOutside2 = false, closeConditional }" @click="clickOutside2 = true">
      <v-list-item-title>Click outside - with closeConditional</v-list-item-title>
      <v-list-item-action>
        <v-icon :color="clickOutside2 ? 'green' : 'red'">mdi-record</v-icon>
      </v-list-item-action>
    </v-list-item>
  </v-list>
</template>

<script>
  export default {
    data: () => ({
      clickOutside1: true,
      clickOutside2: true,
    }),
    methods: {
      closeConditional (e) {
        return this.clickOutside2
      },
    },
  }
</script>
