<template>
  <v-container
    id="premium-themes"
    class="pa-0"
    fluid
    tag="section"
  >
    <v-row>
      <v-col
        v-for="template in templates"
        :key="template.title"
        cols="12"
        md="4"
      >
        <v-card
          class="d-flex flex-column"
          height="100%"
          outlined
        >
          <v-img
            :src="template.src"
            height="175"
          >
            <v-chip
              :color="template.free ? 'blue-grey' : 'success'"
              class="text-uppercase ma-3"
              label
              small
              text-color="white"
            >
              {{ $t(`Themes.Premium.${template.free ? 'free' : 'premium'}`) }}
            </v-chip>
          </v-img>

          <v-card-title class="align-center py-2">
            <h2
              class="title font-weight-regular mb-0"
              v-text="template.title"
            />
          </v-card-title>

          <v-divider />

          <v-responsive
            class="pa-4 body-2"
            min-height="95"
            v-text="template.description"
          />

          <v-card-actions
            :class="$vuetify.theme.dark ? 'darken-4' : 'lighten-4'"
            class="grey"
          >
            <v-menu
              v-if="template.demoUrl.length"
              :disabled="template.demoUrl.length === 1"
              transition="scale-transition"
              origin="bottom left"
              top
              right
            >
              <template #activator="{ on: menu }">
                <v-tooltip bottom>
                  <template #activator="{ on: tooltip }">
                    <v-btn
                      :href="template.demoUrl.length === 1 ? `${template.demoUrl[0]}?ref=vuetifyjs.com${template.query || ''}` : undefined"
                      icon
                      target="_blank"
                      rel="noopener"
                      aria-label="View Demo"
                      v-on="{ ...tooltip, ...menu }"
                    >
                      <v-icon color="primary">mdi-eye</v-icon>
                    </v-btn>
                  </template>
                  <span v-text="$t('Themes.Premium.viewDemo')" />
                </v-tooltip>
              </template>
              <v-list v-if="template.demoUrl.length > 1">
                <v-list-item
                  v-for="([title, demo], i) in template.demoUrl"
                  :key="i"
                  :href="`${demo}?ref=vuetifyjs.com${template.query || ''}`"
                  target="_blank"
                  rel="noopener"
                >
                  <v-list-item-content>
                    <v-list-item-title v-text="title" />
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-icon>mdi-open-in-new</v-icon>
                  </v-list-item-action>
                </v-list-item>
              </v-list>
            </v-menu>

            <v-spacer />

            <v-btn
              :href="`${template.url}?ref=vuetifyjs.com${template.query || ''}`"
              :outlined="template.free"
              color="indigo"
              dark
              depressed
              min-width="100"
              target="_blank"
              @click="$ga.event('premium-themes-page', 'click', template.title)"
            >
              {{ $t(`Themes.Premium.${template.free ? 'downloadNow' : 'buyNow'}`) }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    computed: {
      ...mapState('documentation', ['templates']),
    },
  }
</script>

<style>
  #premium-themes .v-card {
    border-radius: 6px;
  }
</style>
