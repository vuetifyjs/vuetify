<template>
  <v-container>
    <v-hover v-slot="{ props: hoverProps, isHovering }">
      <v-card
        v-bind="hoverProps"
        :class="[
          'mx-auto',
          isHovering ? 'opacity-100' : 'opacity-50'
        ]"
        color="secondary"
        height="128"
        width="256"
        flat
      ></v-card>
    </v-hover>
  </v-container>
</template>
