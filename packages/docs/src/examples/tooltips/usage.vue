<template>
  <div class="text-xs-center d-flex align-center">
    <v-tooltip bottom>
      <template #activator="data">
        <v-btn v-on="data.on" color="primary" dark>Button</v-btn>
      </template>
      <span>Tooltip</span>
    </v-tooltip>

    <v-tooltip bottom>
      <template #activator="data">
        <v-icon v-on="data.on" color="primary" dark>home</v-icon>
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
