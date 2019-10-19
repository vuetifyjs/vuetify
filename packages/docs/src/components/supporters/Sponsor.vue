<template>
  <v-card
    :aria-label="`Supporter ${value.name}`"
    :href="value.href"
    :width="width"
    flat
    tile
    color="transparent"
    class="mx-2"
    target="_blank"
    rel="noopener"
  >
    <v-img
      :alt="value.name"
      :class="value.dark ? 'black' : ''"
      :height="height"
      :src="`https://cdn.vuetifyjs.com/images/${value.logo}`"
      class="flex-shrink-1"
      contain
      @click="$ga.event('patrons', 'click', value.name)"
    />
  </v-card>
</template>

<script>
  export default {
    props: {
      large: {
        type: Boolean,
        default: false,
      },
      small: {
        type: Boolean,
        default: false,
      },
      value: {
        type: Object,
        required: true,
      },
      xLarge: {
        type: Boolean,
        default: false,
      },
    },

    computed: {
      height () {
        if (this.xLarge) return 100
        if (this.large) return 80
        if (this.small) return 30
        return 40
      },
      width () {
        if (this.xLarge) return 170
        if (this.large) return 155
        if (this.small) return 115
        return 140
      },
    },
  }
</script>
