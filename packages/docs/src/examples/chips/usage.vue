<template>
  <div
    id="chip-usage-example"
    class="text-xs-center"
  >
    <v-chip>Default</v-chip>
    <v-chip close>Close</v-chip>
    <v-chip outlined>Outlined</v-chip>
    <v-chip v-model="value" filter>Filter</v-chip>
    <v-chip pill>
      <v-avatar
        left
        color="red"
      >
        P
      </v-avatar>
      Pill
    </v-chip>
    <v-chip>
      <v-icon left color="red">mdi-account</v-icon>
      Icon
    </v-chip>
  </div>
</template>

<script>
  export default {
    data: () => ({
      value: true,
    }),
  }
</script>

<style>
  #chip-usage-example .v-chip {
    margin: 8px;
  }
</style>
