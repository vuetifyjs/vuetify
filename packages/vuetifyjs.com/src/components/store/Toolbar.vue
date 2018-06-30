<template>
  <v-toolbar
    color="grey lighten-2"
    flat
    dense
  >
    <v-btn
      v-for="link in links"
      :key="link.text"
      :to="link.to"
      class="subheading font-weight-light text-capitalize"
      color="grey darken-1"
      exact
      flat
      @click="$vuetify.goTo(link.href, { offset: -50 })"
    >
      <span v-text="link.text" />
    </v-btn>

    <v-spacer />

    <v-btn
      :to="{ name: 'store/Cart' }"
      class="subheading font-weight-light text-capitalize"
      color="grey darken-1"
      flat
    >
      <span v-text="$t('Vuetify.AppToolbar.cart')" />

      <v-badge
        :value="checkout.lineItems.length"
        color="red"
      >
        <template slot="badge">
          {{ checkout.lineItems.length }}
        </template>
        <v-icon right>mdi-cart-outline</v-icon>
      </v-badge>
    </v-btn>
  </v-toolbar>
</template>

<script>
  // Helpers
  import {
    mapState
  } from 'vuex'

  export default {
    data: () => ({
      home: [
        {
          to: { name: 'store/Front' },
          text: 'Store Front'
        }
      ],
      front: [
        {
          href: '#theme',
          text: 'Theme'
        },
        {
          href: '#shirts',
          text: 'Shirts'
        },
        {
          href: '#hats',
          text: 'Hats'
        },
        {
          href: '#stickers',
          text: 'Stickers'
        }
      ]
    }),

    computed: {
      ...mapState('store', ['checkout']),
      ...mapState('route', ['from', 'name']),
      links () {
        return this.name === 'store/Front'
          ? this.front
          : this.home
      }
    }
  }
</script>
