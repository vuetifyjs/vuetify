<template>
  <v-row v-if="activeTemplate" justify="center">
    <v-col cols="12">
      <v-hover>
        <template v-slot="{ hover }">
          <v-card
            :elevation="hover ? 12 : 2"
            color="#385F73"
            dark
            href="https://store-beta.vuetifyjs.com/product/shopify-e-commerce-theme?ref=vuetifyjs.com"
            target="_blank"
            rel="noopener noreferrer"
            @click="$ga.event($route.path, 'click', 'theme-ad')"
          >
            <v-img
              :alt="`Link to ${activeTemplate.title}`"
              :max-height="$vuetify.breakpoint.mdAndUp ? 135 : undefined"
              src="https://cdn.shopify.com/s/files/1/2695/0984/products/opt_mdp_vuetify_thumbnail.jpg?v=1568572237"
            >
              <v-overlay
                :opacity="hover ? .97 : .9"
                absolute
              >
                <v-responsive class="pa-6" max-width="900">
                  <div class="display-1 mb-2">Premium Theme</div>
                  <doc-markdown :code="activeTemplate.description" />
                </v-responsive>
              </v-overlay>
            </v-img>
          </v-card>
        </template>
      </v-hover>
    </v-col>
  </v-row>
</template>

<script>
  export default {
    name: 'DocThemeAd',

    props: {
      value: {
        type: String,
        default: undefined,
      },
    },

    computed: {
      activeTemplate () {
        return this.$t('Themes.Premium.templates')[this.value]
      },
    },
  }
</script>
