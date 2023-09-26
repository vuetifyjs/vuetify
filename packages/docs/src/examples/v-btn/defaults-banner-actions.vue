<template>
  <v-banner
    lines="one"
  >
    <template v-slot:text>
      Banner with one line of text.
    </template>

    <template v-slot:actions>
      <v-btn>
        Action
      </v-btn>

      <v-btn>
        Action
      </v-btn>
    </template>
  </v-banner>
</template>
