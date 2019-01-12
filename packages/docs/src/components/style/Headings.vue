<template>
  <v-card
    class="pa-5 mb-3"
    color="teal"
    dark
    flat
  >
    <v-layout
      v-for="(text, i) in texts"
      :key="`${i}-text`"
      mb-3
      align-center
      justify-start
    >
      <div
        class="mr-3"
        style="min-width: 85px;"
      >
        <code>.{{ text[0] }}</code>
      </div>
      <v-flex :class="`${text[0]}`">
        {{ text[1] }}
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      texts: [
        ['display-4', 'Light 112sp', '300'],
        ['display-3', 'Regular 56sp', '400'],
        ['display-2', 'Regular 45sp', '400'],
        ['display-1', 'Regular 34sp', '400'],
        ['headline', 'Regular 24sp', '400'],
        ['title', 'Medium 20sp', '500'],
        ['subheading', 'Regular 16sp', '400'],
        ['body-2', 'Medium 14sp', '500'],
        ['body-1', 'Regular 14sp', '400'],
        ['caption', 'Regular 12sp', '400']
      ]
    })

  }
</script>
