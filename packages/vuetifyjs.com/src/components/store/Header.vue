<template lang="pug">
  v-container.text-xs-center#store-header
    v-layout
      v-flex(xs12)
        v-progress-circular(
          :indeterminate="loading"
          size="200"
          :width="loading ? 1 : 0"
          color="secondary"
        ).mb-3
          img(
            src="https://cdn.vuetifyjs.com/images/logos/logo.svg"
            height="125px"
            alt="Vuetify"
          )

        h1(v-text="subHeader").display-1.primary--text.mb-3
        div.mb-5
          slot
          div
          v-card(
            color="blue lighten-1"
            dark
            style="max-width: 700px;"
            width="auto"
          ).mx-auto.mt-4.d-inline-flex
            v-card-text
              v-layout(align-center)
                v-icon(size="32px").mr-3 mdi-truck-delivery
                div Free shipping for orders of <span class="subheading"><strong>$79</strong></span> or more with code <v-chip class="my-0 body-2">SHIP79</v-chip> at checkout
</template>

<script>
  export default {
    props: {
      header: {
        type: String,
        default: undefined
      },
      loading: {
        type: Boolean,
        default: false
      },
      subHeader: {
        type: String,
        default: undefined
      }
    }
  }
</script>
