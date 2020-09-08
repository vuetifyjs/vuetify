<template>
  <v-system-bar v-if="hasPromotion" app height="84" dark>
    <a
      class="bts-banner"
      href="https://vueschool.io/sales/back-to-school?friend=vuetify&utm_source=vuetify&utm_medium=banner&utm_campaign=autumn"
      rel="noopener"
      target="_blank"
    />

    <v-btn
      absolute
      icon
      right
      @click="onClick"
    >
      <v-icon>$close</v-icon>
    </v-btn>
  </v-system-bar>
</template>

<script>
  // Utilities
  import { differenceInHours } from 'date-fns'
  import { sync } from 'vuex-pathify'

  export default {
    name: 'HomeSystemBar',

    computed: {
      last: sync('user/last@promotion'),
      hasPromotion () {
        if (!this.last) return true

        return differenceInHours(Date.now(), Number(this.last)) > 1
      },
    },

    methods: {
      onClick () {
        this.last = Date.now()
      },
    },
  }
</script>

<style type="text/css">
    .bts-banner {
      display: block;
      height: inherit;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      background-color: #1E204D;
      background-color: #0D1337;
      text-indent: 100%;
      white-space: nowrap;
      overflow: hidden;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image:
        url(https://cdn.vuetifyjs.com/docs/images/promotions/back-to-school/bts-mobile.png),
        linear-gradient(90deg, rgba(30,32,77,1) 50%, rgba(13,19,55,1) 100%);
    }

    @media (min-width: 768px) {
      .bts-banner {
        background-image:
          url(https://cdn.vuetifyjs.com/docs/images/promotions/back-to-school/bts-tablet.png),
          linear-gradient(90deg, rgba(30,32,77,1) 50%, rgba(13,19,55,1) 100%);
      }
    }

    @media (min-width: 992px) {
      .bts-banner {
        background-image:
          url(https://cdn.vuetifyjs.com/docs/images/promotions/back-to-school/bts-desktop.png),
          linear-gradient(90deg, rgba(30,32,77,1) 50%, rgba(13,19,55,1) 100%);
      }
    }
  </style>
