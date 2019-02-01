<template>
  <div
    id="chip-usage-example"
    class="text-xs-center"
  >
    <v-chip>Default</v-chip>

    <v-chip
      color="red lighten-2"
      text-color="white"
    >
      <v-avatar
        left
        color="white"
        class="text--primary"
      >
        V
      </v-avatar>
      Letter
    </v-chip>

    <v-chip
      color="primary"
      pill
    >
      Pill Chip
      <v-avatar
        color="primary darken-2"
        right
      >
        $
      </v-avatar>
    </v-chip>

    <v-chip
      label
      color="deep-purple accent-4"
      text-color="white"
    >
      Label
    </v-chip>
  </div>
</template>

<style>
  #chip-usage-example .v-chip {
    margin: 8px;
  }
</style>
