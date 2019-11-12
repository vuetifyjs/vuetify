<template>
  <div class="text-center">
    <v-badge
      color="red"
      bottom
    >
      <template v-slot:badge>
        <v-icon dark>
          mdi-close
        </v-icon>
      </template>
      <span>Badge w/ Bottom Prop</span>
    </v-badge>
  </div>
</template>
