<template>
  <section id="premium-themes">
    <v-container
      pa-0
      fluid
      grid-list-xl
    >
      <v-layout wrap>
        <v-flex
          v-for="template in templates"
          :key="template.title"
          xs12
          md6
        >
          <v-card
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
                  label
                  small
                  class="text-uppercase"
                  text-color="white"
                >
                  {{ $t(`Themes.Premium.${template.free ? 'free' : 'premium'}`) }}
                </v-chip>
              </h2>
              <v-spacer />
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
                <v-tooltip
                  slot="activator"
                  bottom
                >
                  <v-btn
                    slot="activator"
                    :href="template.demoUrl.length === 1 ? `${template.demoUrl[0]}?ref=vuetifyjs.com` : undefined"
                    icon
                    target="_blank"
                    rel="noopener"
                    aria-label="View Demo"
                  >
                    <v-icon color="primary">mdi-eye</v-icon>
                  </v-btn>
                  <span v-text="$t('Themes.Premium.viewDemo')" />
                </v-tooltip>
                <v-list v-if="template.demoUrl.length > 1">
                  <v-list-tile
                    v-for="([title, demo], i) in template.demoUrl"
                    :key="i"
                    :href="`${demo}?ref=vuetifyjs.com`"
                    target="_blank"
                    rel="noopener"
                  >
                    <v-list-tile-content>
                      <v-list-tile-title v-text="title" />
                    </v-list-tile-content>
                    <v-list-tile-action>
                      <v-icon>mdi-open-in-new</v-icon>
                    </v-list-tile-action>
                  </v-list-tile>
                </v-list>
              </v-menu>

              <v-spacer />

              <v-btn
                :href="`${template.url}?ref=vuetifyjs.com`"
                color="primary"
                flat
                outline
                target="_blank"
                rel="noopener"
                @click="$ga.event('themes', 'click', template.title)"
              >
                {{ $t('Themes.Premium.downloadNow') }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </section>
</template>

<script>
  export default {
    data: vm => ({
      templates: [
        {
          title: vm.$t('Themes.Premium.templates.material-kit.title'),
          description: vm.$t('Themes.Premium.templates.material-kit.description'),
          src: 'https://cdn.vuetifyjs.com/images/starter/vuetify-material-kit.png',
          free: false,
          url: 'https://store.vuetifyjs.com/product/material-kit-theme',
          demoUrl: ['https://material-kit.vuetifyjs.com']
        },
        {
          title: vm.$t('Themes.Premium.templates.alpha.title'),
          description: vm.$t('Themes.Premium.templates.alpha.description'),
          src: 'https://cdn.vuetifyjs.com/images/starter/vuetify-alpha-theme.png',
          free: false,
          url: 'https://store.vuetifyjs.com/product/vuetify-alpha-theme',
          demoUrl: [
            ['Construction', 'https://alpha-construction.vuetifyjs.com'],
            ['Creative', 'https://alpha-creative.vuetifyjs.com'],
            ['SaaS', 'https://alpha-saas.vuetifyjs.com'],
            ['Ecommerce', 'https://alpha-ecommerce.vuetifyjs.com']
          ]
        },
        {
          title: vm.$t('Themes.Premium.templates.dashboard.title'),
          description: vm.$t('Themes.Premium.templates.dashboard.description'),
          src: 'https://cdn.vuetifyjs.com/images/starter/vuetify-admin-dashboard.jpg',
          free: true,
          url: 'https://www.creative-tim.com/product/vuetify-material-dashboard',
          demoUrl: ['https://demos.creative-tim.com/vuetify-material-dashboard/#/dashboard']
        },
        {
          title: vm.$t('Themes.Premium.templates.freelancer.title'),
          description: vm.$t('Themes.Premium.templates.freelancer.description'),
          src: 'https://cdn.vuetifyjs.com/images/starter/freelancer.png',
          free: true,
          url: 'https://github.com/vuetifyjs/theme-freelancer',
          demoUrl: []
        },
        {
          title: vm.$t('Themes.Premium.templates.parallax.title'),
          description: vm.$t('Themes.Premium.templates.parallax.description'),
          src: 'https://cdn.vuetifyjs.com/images/starter/vuetify-parallax-starter.png',
          free: true,
          url: 'https://github.com/vuetifyjs/parallax-starter',
          demoUrl: ['/themes/parallax-starter']
        },
        {
          title: vm.$t('Themes.Premium.templates.blog.title'),
          description: vm.$t('Themes.Premium.templates.blog.description'),
          src: 'https://cdn.vuetifyjs.com/images/starter/blog.png',
          free: true,
          url: 'https://github.com/vuetifyjs/theme-blog',
          demoUrl: ['https://free-blog.vuetifyjs.com']
        }
      ]
    })
  }
</script>

<style>
  #premium-themes .v-card {
    border-radius: 6px;
  }
</style>
