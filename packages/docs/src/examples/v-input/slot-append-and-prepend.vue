<template>
  <v-text-field>
    <template v-slot:append>
      <v-icon color="red" icon="i-mdi:plus">
      </v-icon>
    </template>
    <template v-slot:prepend>
      <v-icon color="green" icon="i-mdi:minus">
      </v-icon>
    </template>
  </v-text-field>
</template>
