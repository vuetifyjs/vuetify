<template>
  <div>
    <v-card
      v-for="j in justify"
      :key="j"
      class="d-flex mb-6"
      color="grey lighten-2"
      flat
      height="100"
      tile
    >
      <v-card
        v-for="n in 3"
        :key="n"
        class="pa-2"
        :class="[n === 2 && `align-self-${j}`]"
        outlined
        tile
      >
        {{ n === 2 ? 'Aligned flex item' : 'Flex item' }}
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
        'baseline',
        'auto',
        'stretch',
      ],
    }),
  }
</script>
