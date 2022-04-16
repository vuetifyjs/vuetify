<template>
  <div class="d-flex justify-space-around">
    <v-btn>
      Start
      <v-tooltip
        activator="parent"
        anchor="start"
      >Tooltip</v-tooltip>
    </v-btn>

    <v-btn>
      End
      <v-tooltip
        activator="parent"
        anchor="end"
      >Tooltip</v-tooltip>
    </v-btn>

    <v-btn>
      Top
      <v-tooltip
        activator="parent"
        anchor="top"
      >Tooltip</v-tooltip>
    </v-btn>

    <v-btn>
      Bottom
      <v-tooltip
        activator="parent"
        anchor="bottom"
      >Tooltip</v-tooltip>
    </v-btn>
  </div>
</template>
