<template>
  <div class="text-xs-center">
    <v-bottom-sheet v-model="sheet">
      <template v-slot:activator="{ on }">
        <v-btn
          color="purple"
          dark
          v-on="on"
        >
          Open Usage
        </v-btn>
      </template>
      <v-sheet class="text-xs-center" height="200px">
        <v-btn
          class="mt-4"
          flat
          color="red"
          @click="sheet = !sheet"
        >close</v-btn>
        <div>The basic usage of v-bottom-sheet. Almost any content can be placed inside this component</div>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script>
  export default {
    data: () => ({
      sheet: false,
      tiles: [
        { img: 'keep.png', title: 'Keep' },
        { img: 'inbox.png', title: 'Inbox' },
        { img: 'hangouts.png', title: 'Hangouts' },
        { img: 'messenger.png', title: 'Messenger' },
        { img: 'google.png', title: 'Google+' }
      ]
    })
  }
</script>
