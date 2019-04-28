<template>
  <div class="text-xs-center">
    <v-badge
      color="teal"
      left
    >
      <template v-slot:badge>
        <v-icon dark>
          done
        </v-icon>
      </template>
      <span>Badge w/ Left Prop</span>
    </v-badge>
  </div>
</template>
