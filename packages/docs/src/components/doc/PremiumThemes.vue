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
              {{ $i18n.t(`premium-themes.${template.free ? 'free' : 'premium'}`) }}
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
            v-text="$i18n.t(template.description)"
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
                      :aria-label="$i18n.t('premium-themes.view-demo')"
                      v-on="{ ...tooltip, ...menu }"
                    >
                      <v-icon color="primary">
                        $mdiEye
                      </v-icon>
                    </v-btn>
                  </template>
                  <span v-text="$i18n.t('premium-themes.view-demo')" />
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
                    <v-icon>$mdiOpenInNew</v-icon>
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
            >
              {{ $i18n.t(`premium-themes.${template.free ? 'download-now' : 'buy-now'}`) }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'PremiumThemes',

    data () {
      return {
        templates: {
          'zero-pro': {
            title: 'Zero Theme Pro',
            description: 'premium-themes.zero-pro',
            src: 'https://cdn.vuetifyjs.com/store/themes/zero/main.png',
            free: false,
            url: 'https://store.vuetifyjs.com/product/zero-theme-pro',
            demoUrl: ['https://zero-theme-pro.johnleider.com'],
          },
          'dashboard-pro': {
            title: 'Material Dashboard Pro',
            description: 'premium-themes.dashboard-pro',
            src: 'https://cdn.vuetifyjs.com/images/starter/vuetify-admin-dashboard-pro.jpg',
            free: false,
            url: 'https://www.creative-tim.com/product/vuetify-material-dashboard-pro',
            demoUrl: [
              'https://demos.creative-tim.com/vuetify-material-dashboard-pro/',
            ],
            query: '&partner=116160',
          },
          'material-kit': {
            title: 'Material Kit',
            description: 'premium-themes.material-kit',
            src: 'https://cdn.vuetifyjs.com/images/starter/vuetify-material-kit.png',
            free: false,
            url: 'https://store.vuetifyjs.com/product/material-kit-theme',
            demoUrl: [
              'https://material-kit.vuetifyjs.com',
            ],
          },
          'alpha-theme': {
            title: 'Alpha Theme',
            description: 'premium-themes.alpha-theme',
            src: 'https://cdn.vuetifyjs.com/images/starter/vuetify-alpha-theme.png',
            free: false,
            url: 'https://store.vuetifyjs.com/product/alpha-theme',
            demoUrl: [
              [
                'Construction',
                'https://alpha-construction.vuetifyjs.com',
              ],
              [
                'Creative',
                'https://alpha-creative.vuetifyjs.com',
              ],
              [
                'SaaS',
                'https://alpha-saas.vuetifyjs.com',
              ],
              [
                'Ecommerce',
                'https://alpha-ecommerce.vuetifyjs.com',
              ],
            ],
          },
          'zero-free': {
            title: 'Zero Theme Free',
            description: 'premium-themes.zero-free',
            src: 'https://cdn.vuetifyjs.com/store/themes/zero/free.png',
            free: true,
            url: 'https://store.vuetifyjs.com/product/zero-theme-free',
            demoUrl: [
              ['https://zero-theme-free.johnleider.com'],
            ],
          },
          dashboard: {
            title: 'Material Dashboard Free',
            description: 'premium-themes.dashboard',
            src: 'https://cdn.vuetifyjs.com/images/starter/vuetify-admin-dashboard.jpg',
            free: true,
            url: 'https://www.creative-tim.com/product/vuetify-material-dashboard',
            demoUrl: [
              'https://demos.creative-tim.com/vuetify-material-dashboard/#/dashboard',
            ],
            query: '&partner=116160',
          },
          freelance: {
            title: 'Freelancer',
            description: 'premium-themes.freelance',
            src: 'https://cdn.vuetifyjs.com/images/starter/freelancer.png',
            free: true,
            url: 'https://store.vuetifyjs.com/product/freelancer-theme-free/',
            demoUrl: [
              'https://freelancer-free.johnleider.com/',
            ],
          },
          parallax: {
            title: 'Parallax',
            description: 'premium-themes.parallax',
            src: 'https://cdn.vuetifyjs.com/images/starter/parallax-2020-large.png',
            free: true,
            url: 'https://store.vuetifyjs.com/product/parallax-theme-free/',
            demoUrl: [
              'https://parallax-theme-free.johnleider.com/',
            ],
          },
          blog: {
            title: 'Blog',
            description: 'premium-themes.blog',
            src: 'https://cdn.vuetifyjs.com/images/starter/blog.png',
            free: true,
            url: 'https://store.vuetifyjs.com/product/blog-theme-free/',
            demoUrl: [
              'https://blog-free.johnleider.com',
            ],
          },
        },
      }
    },
  }
</script>

<style>
  #premium-themes .v-card {
    border-radius: 6px;
  }
</style>
