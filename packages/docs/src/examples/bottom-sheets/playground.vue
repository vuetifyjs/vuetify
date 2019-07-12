<template>
  <div class="text-xs-center">
    <v-layout row wrap justify-space-around>
      <v-switch v-model="sheet" label="Model"></v-switch>
      <v-switch v-model="inset" label="Inset"></v-switch>
      <v-switch v-model="hideOverlay" label="Hide overlay"></v-switch>
    </v-layout>
    <v-bottom-sheet v-model="sheet" :inset="inset" :hide-overlay="hideOverlay">
      <template v-slot:activator="{ on }">
        <v-btn
          color="purple"
          dark
          v-on="on"
        >
          Open Playground
        </v-btn>
      </template>
      <v-sheet class="text-xs-center" height="200px">
        <v-btn
          class="my-4"
          depressed
          color="error"
          @click="sheet = !sheet"
        >close</v-btn>
        <div class="title">Active Playground Props</div>
        <div v-if="sheet">v-model</div>
        <div v-if="inset">inset</div>
        <div v-if="hideOverlay">hide-overlay</div>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script>
  export default {
    data: () => ({
      sheet: false,
      inset: false,
      hideOverlay: false,
      tiles: [
        { img: 'keep.png', title: 'Keep' },
        { img: 'inbox.png', title: 'Inbox' },
        { img: 'hangouts.png', title: 'Hangouts' },
        { img: 'messenger.png', title: 'Messenger' },
        { img: 'google.png', title: 'Google+' },
      ],
    }),
  }
</script>
