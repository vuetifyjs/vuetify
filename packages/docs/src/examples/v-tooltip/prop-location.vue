<template>
  <div class="d-flex justify-space-around">
    <v-btn>
      Start
      <v-tooltip
        activator="parent"
        location="start"
      >Tooltip</v-tooltip>
    </v-btn>

    <v-btn>
      End
      <v-tooltip
        activator="parent"
        location="end"
      >Tooltip</v-tooltip>
    </v-btn>

    <v-btn>
      Top
      <v-tooltip
        activator="parent"
        location="top"
      >Tooltip</v-tooltip>
    </v-btn>

    <v-btn>
      Bottom
      <v-tooltip
        activator="parent"
        location="bottom"
      >Tooltip</v-tooltip>
    </v-btn>
  </div>
</template>
