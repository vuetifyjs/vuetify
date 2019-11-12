<template>
  <div class="text-center">
    <v-badge
      color="teal"
      left
    >
      <template v-slot:badge>
        <v-icon dark>
          mdi-check
        </v-icon>
      </template>
      <span>Badge w/ Left Prop</span>
    </v-badge>
  </div>
</template>
