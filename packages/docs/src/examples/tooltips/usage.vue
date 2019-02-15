<template>
  <div class="text-xs-center d-flex align-center">
    <v-tooltip bottom>
      <template #activator="data">
        <v-btn color="primary" dark v-on="data.on">Button</v-btn>
      </template>
      <span>Tooltip</span>
    </v-tooltip>

    <v-tooltip bottom>
      <template #activator="data">
        <v-icon color="primary" dark v-on="data.on">home</v-icon>
      </template>
      <span>Tooltip</span>
    </v-tooltip>

    <v-tooltip bottom>
      <template #activator="data">
        <span v-on="data.on">This text has a tooltip</span>
      </template>
      <span>Tooltip</span>
    </v-tooltip>
  </div>
</template>
