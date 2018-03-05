<template lang="pug">
  v-card(
    hover
    :to="{ name: 'store/Product', params: { id: shortId }}"
  )
    v-card-media(
      contain
      :src="value.images[0].src"
      height="150"
    ).my-3
    v-divider
    v-card-text(style="height: 88px;")
      div.body-2.mb-2
        div(v-html="value.title").d-inline-block.mr-2
        v-chip(
          color="red lighten-3"
          small
          v-if="isOnSale"
        ).white--text
          span(v-text="$t('Vuetify.Store.onSale')")
          v-icon(right) mdi-fire
      div(v-html="description").caption.grey--text
    v-card-text.text-xs-center
      div.green--text.headline.mb-4 {{ priceRange }}
      v-btn(block color="primary" depressed large).my-0 Details
</template>

<script>
  // Utilities
  import { isOnSale } from '@/util/helpers'

  export default {
    props: {
      value: {
        type: Object,
        required: true
      }
    },

    computed: {
      description () {
        const { description } = this.value

        if (description.length < 75) return description

        return description.slice(0, 72) + '...'
      },
      isOnSale () {
        return isOnSale(this.value.variants)
      },
      priceRange () {
        const prices = this.value.variants
          .map(v => v.price)
          .sort((a, b) => +a > +b)

        return `$${prices[0]}`
      },
      shortId () {
        // atob() but for node
        const arr = Buffer.from(this.value.id, 'base64').toString('binary').split('/')
        return arr[arr.length - 1]
      }
    }
  }
</script>
