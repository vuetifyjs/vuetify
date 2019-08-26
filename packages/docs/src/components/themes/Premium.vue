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
                {{ $t(`Themes.PremiumThemes.${template.free || !template.price ? 'free' : 'premium'}`) }}
              </v-chip>
            </h2>
            <v-spacer />

            <div v-if="template.price" class="headline font-weight-bold primary--text" v-text="template.price" />
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
                      :href="template.demoUrl.length === 1 ? `${template.demoUrl[0]}?ref=vuetifyjs.com` : undefined"
                      icon
                      target="_blank"
                      rel="noopener"
                      aria-label="View Demo"
                      v-on="{ ...tooltip, ...menu }"
                    >
                      <v-icon color="primary">mdi-eye</v-icon>
                    </v-btn>
                  </template>
                  <span v-text="$t('Themes.PremiumThemes.viewDemo')" />
                </v-tooltip>
              </template>
              <v-list v-if="template.demoUrl.length > 1">
                <v-list-item
                  v-for="([title, demo], i) in template.demoUrl"
                  :key="i"
                  :href="`${demo}?ref=vuetifyjs.com`"
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
              :href="`${template.url}?ref=vuetifyjs.com`"
              :outlined="!template.price"
              dark
              min-width="100"
              target="_blank"
              rel="noopener"
              @click="$ga.event('themes', 'click', template.title)"
            >
              {{ $t(`Themes.PremiumThemes.${template.price ? 'buyNow' : 'downloadNow'}`) }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data: vm => ({
      templates: [
        {
          title: vm.$t('Themes.PremiumThemes.templates.dashboard-pro.title'),
          description: vm.$t('Themes.PremiumThemes.templates.dashboard-pro.description'),
          src: 'https://cdn.vuetifyjs.com/images/starter/vuetify-admin-dashboard-pro.jpg',
          price: '$79',
          url: 'https://www.creative-tim.com/product/vuetify-material-dashboard-pro',
          demoUrl: ['https://demos.creative-tim.com/vuetify-material-dashboard-pro/'],
        },
        {
          title: vm.$t('Themes.PremiumThemes.templates.material-kit.title'),
          description: vm.$t('Themes.PremiumThemes.templates.material-kit.description'),
          src: 'https://cdn.vuetifyjs.com/images/starter/vuetify-material-kit.png',
          price: '$55',
          url: 'https://store.vuetifyjs.com/product/material-kit-theme',
          demoUrl: ['https://material-kit.vuetifyjs.com'],
        },
        {
          title: vm.$t('Themes.PremiumThemes.templates.alpha.title'),
          description: vm.$t('Themes.PremiumThemes.templates.alpha.description'),
          src: 'https://cdn.vuetifyjs.com/images/starter/vuetify-alpha-theme.png',
          price: '$25',
          url: 'https://store.vuetifyjs.com/product/vuetify-alpha-theme',
          demoUrl: [
            ['Construction', 'https://alpha-construction.vuetifyjs.com'],
            ['Creative', 'https://alpha-creative.vuetifyjs.com'],
            ['SaaS', 'https://alpha-saas.vuetifyjs.com'],
            ['Ecommerce', 'https://alpha-ecommerce.vuetifyjs.com'],
          ],
        },
        {
          title: vm.$t('Themes.PremiumThemes.templates.dashboard.title'),
          description: vm.$t('Themes.PremiumThemes.templates.dashboard.description'),
          src: 'https://cdn.vuetifyjs.com/images/starter/vuetify-admin-dashboard.jpg',
          free: true,
          url: 'https://www.creative-tim.com/product/vuetify-material-dashboard',
          demoUrl: ['https://demos.creative-tim.com/vuetify-material-dashboard/#/dashboard'],
        },
        {
          title: vm.$t('Themes.PremiumThemes.templates.freelancer.title'),
          description: vm.$t('Themes.PremiumThemes.templates.freelancer.description'),
          src: 'https://cdn.vuetifyjs.com/images/starter/freelancer.png',
          free: true,
          url: 'https://github.com/vuetifyjs/theme-freelancer',
          demoUrl: [],
        },
        {
          title: vm.$t('Themes.PremiumThemes.templates.parallax.title'),
          description: vm.$t('Themes.PremiumThemes.templates.parallax.description'),
          src: 'https://cdn.vuetifyjs.com/images/starter/vuetify-parallax-starter.png',
          free: true,
          url: 'https://github.com/vuetifyjs/parallax-starter',
          demoUrl: ['/themes/parallax-starter'],
        },
        {
          title: vm.$t('Themes.PremiumThemes.templates.blog.title'),
          description: vm.$t('Themes.PremiumThemes.templates.blog.description'),
          src: 'https://cdn.vuetifyjs.com/images/starter/blog.png',
          free: true,
          url: 'https://github.com/vuetifyjs/theme-blog',
          demoUrl: ['https://free-blog.vuetifyjs.com'],
        },
      ],
    }),
  }
</script>

<style>
  #premium-themes .v-card {
    border-radius: 6px;
  }
</style>
