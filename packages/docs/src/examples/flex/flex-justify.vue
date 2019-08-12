<template>
  <div>
    <v-card
      v-for="j in justify"
      :key="j"
      :class="`d-flex justify-${j} mb-6`"
      color="grey lighten-2"
      flat
      tile
    >
      <v-card
        v-for="n in 3"
        :key="n"
        class="pa-2"
        outlined
        tile
      >
        Flex item
      </v-card>
    </v-card>
  </div>
</template>

<script>
  export default {
    data: () => ({
      justify: [
        'start',
        'end',
        'center',
        'space-between',
        'space-around',
      ],
    }),
  }
</script>
