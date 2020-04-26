<template>
  <v-virtual-scroll height="300px" :items="items" :item-height="25">
    <template v-slot="item">
      <div class="item">
        I'm item number {{ item.id }}
      </div>
    </template>
  </v-virtual-scroll>
</template>

<script>
  export default {
    data () {
      const fillArrayWithNumbers = n => Array.apply(null, Array(n)).map((x, i) => i)
      return {
        items: fillArrayWithNumbers(7000).map(i => ({ id: i, content: 'content-' + i })),
      }
    },
  }
</script>
