<template>
  <v-card
    class="mx-auto"
    max-width="400"
    tile
  >
    <v-list-item>
      <v-list-item-header>
        <v-list-item-title>Single-line item</v-list-item-title>
      </v-list-item-header>
    </v-list-item>

    <v-list-item lines="two">
      <v-list-item-header>
        <v-list-item-title>Two-line item</v-list-item-title>
        <v-list-item-subtitle>Secondary text</v-list-item-subtitle>
      </v-list-item-header>
    </v-list-item>

    <v-list-item lines="three">
      <v-list-item-header>
        <v-list-item-title>Three-line item</v-list-item-title>
        <v-list-item-subtitle>
          Secondary line text Lorem ipsum dolor sit amet,
        </v-list-item-subtitle>
        <v-list-item-subtitle>
          consectetur adipiscing elit.
        </v-list-item-subtitle>
      </v-list-item-header>
    </v-list-item>
  </v-card>
</template>
