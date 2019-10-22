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
        md="6"
      >
        <v-card
          class="d-flex flex-column"
          height="100%"
          elevation="4"
        >
          <v-img
            :src="template.src"
            height="350px"
          />

          <v-card-title class="align-center">
            <h2 class="headline mb-0">{{ template.title }}
              <v-chip
                :color="template.free ? 'blue-grey' : 'indigo'"
                class="text-uppercase"
                label
                small
                text-color="white"
              >
                {{ $t(`Themes.Premium.${template.free || !template.price ? 'free' : 'premium'}`) }}
              </v-chip>
            </h2>
            <v-spacer />

            <div
              v-if="template.price"
              class="headline font-weight-bold primary--text"
              v-text="template.price"
            />
          </v-card-title>

          <v-divider />

          <v-card-text style="min-height: 95px;">{{ template.description }}</v-card-text>

          <v-card-actions class="grey lighten-4">
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
              :color="template.price ? 'success' : 'indigo'"
              :href="`${template.url}?ref=vuetifyjs.com${template.query || ''}`"
              :outlined="!template.price"
              dark
              min-width="100"
              target="_blank"
              rel="noopener"
              @click="$ga.event('themes', 'click', template.title)"
            >
              {{ $t(`Themes.Premium.${template.price ? 'buyNow' : 'downloadNow'}`) }}
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
