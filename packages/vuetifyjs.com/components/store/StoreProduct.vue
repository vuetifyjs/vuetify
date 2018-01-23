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
      div(v-html="value.title").body-2.mb-2
      div(v-html="description").caption.grey--text
    v-card-text.text-xs-center
      div.green--text.headline.mb-4 {{ priceRange }}
      v-btn(block color="primary" depressed large).my-0 Details
</template>

<script>
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
      priceRange () {
        const prices = this.value.variants
          .map(v => v.price)
          .sort((a, b) => +a > +b)

        if (prices[0] === prices[prices.length - 1]) {
          return `$${prices[0]}`
        } else {
          return `$${prices[0]} - $${prices[prices.length - 1]}`
        }
      },
      shortId () {
        // atob() but for node
        const arr = Buffer.from(this.value.id, 'base64').toString('binary').split('/')
        return arr[arr.length - 1]
      }
    }
  }
</script>
