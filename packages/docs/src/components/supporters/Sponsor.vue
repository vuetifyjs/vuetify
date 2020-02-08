<template>
  <v-card
    :aria-label="`Supporter ${value.name}`"
    :href="value.href"
    :ripple="false"
    class="pa-1"
    color="transparent"
    flat
    rel="noopener"
    target="_blank"
    tile
  >
    <v-img
      :alt="value.name"
      :class="value.dark ? 'black' : ''"
      :src="src"
      :width="width"
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
      src () {
        const { logo, darkLogo } = this.value
        const cdn = !this.value.logo.match('http')
          ? 'https://cdn.vuetifyjs.com/images/'
          : ''

        if (this.$vuetify.theme.dark && darkLogo) {
          return `${cdn}${darkLogo}`
        }

        return `${cdn}${logo}`
      },
      width () {
        if (this.xLarge) return 175
        if (this.large) return 155
        if (this.small) return 115
        return 135
      },
    },
  }
</script>
