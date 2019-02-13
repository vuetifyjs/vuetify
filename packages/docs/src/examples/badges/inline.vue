<template>
  <div class="text-xs-center">
    <v-badge left>
      <template v-slot:badge>
        <span>2</span>
      </template>
      <span>Examples</span>
    </v-badge>

    &nbsp;&nbsp;

    <v-badge color="green">
      <v-icon v-slot:badge dark small>list</v-icon>
      <span>Lists</span>
    </v-badge>
  </div>
</template>
