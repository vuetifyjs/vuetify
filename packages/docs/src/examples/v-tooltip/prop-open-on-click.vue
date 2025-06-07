<template>
  <div class="text-center d-flex align-center justify-space-around">
    <v-tooltip :open-on-hover="false" open-on-click>
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props">Click me</v-btn>
      </template>
      <span>Open on click tooltip</span>
    </v-tooltip>
  </div>
</template>
