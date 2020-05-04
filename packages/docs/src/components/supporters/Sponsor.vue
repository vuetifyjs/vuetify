<template>
  <v-card
    :aria-label="`Supporter ${value.metadata.name}`"
    :href="value.metadata.href"
    :ripple="false"
    class="pa-1"
    color="transparent"
    flat
    rel="noopener"
    target="_blank"
    tile
  >
    <v-img
      :alt="value.metadata.name"
      :src="src"
      :width="width"
      class="flex-shrink-1"
      contain
      @click="$ga.event('sponsors', 'click', value.metadata.name)"
    />
  </v-card>
</template>

<script>
  export default {
    name: 'SupportersSponsor',

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
        const { lightlogo = '', darklogo = '' } = this.value.metadata
        const cdn = !(lightlogo || '').match('http')
          ? 'https://cdn.vuetifyjs.com/images/'
          : ''

        if (this.$vuetify.theme.dark && darklogo) {
          return `${cdn}${darklogo}`
        }

        return `${cdn}${lightlogo}`
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
