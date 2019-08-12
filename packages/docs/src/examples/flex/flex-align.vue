<template>
  <div>
    <v-card
      v-for="a in align"
      :key="a"
      :class="`d-flex align-${a} mb-6`"
      color="grey lighten-2"
      flat
      height="100"
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
      align: [
        'start',
        'end',
        'center',
        'baseline',
        'stretch',
      ],
    }),
  }
</script>
