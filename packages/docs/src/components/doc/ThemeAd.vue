<template>
  <v-row v-if="activeTemplate" justify="center">
    <v-col cols="12">
      <v-hover>
        <template v-slot="{ hover }">
          <v-card
            :elevation="hover ? 12 : 2"
            :href="`${activeTemplate.url}?ref=vuetifyjs.com${activeTemplate.query || ''}`"
            color="#385F73"
            dark
            target="_blank"
            rel="noopener noreferrer"
            @click="$ga.event($route.path, 'click', 'theme-ad')"
          >
            <v-img
              :alt="`Link to ${activeTemplate.title}`"
              :max-height="$vuetify.breakpoint.mdAndUp ? 135 : undefined"
              :src="activeTemplate.src"
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
  import { mapState } from 'vuex'

  export default {
    name: 'DocThemeAd',

    props: {
      value: {
        type: String,
        default: undefined,
      },
    },

    computed: {
      ...mapState('documentation', ['templates']),
      activeTemplate () {
        return this.templates[this.value]
      },
    },
  }
</script>
