<template>
  <section id="themes-view">
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
          <v-card height="100%">
            <v-img
              :src="template.screenshot"
              height="350px"
            />

            <v-card-title class="align-center">
              <h2 class="headline mb-0">{{ template.title }}
                <v-chip
                  v-if="template.tag"
                  label
                  small
                  class="text-uppercase"
                  color="indigo"
                  text-color="white"
                >
                  {{ template.tag }}
                </v-chip>

                <v-chip
                  v-else
                  label
                  small
                  class="text-uppercase"
                  color="blue-grey"
                  text-color="white"
                >
                  {{ $t('Layout.PreMadeThemes.free') }}
                </v-chip>
              </h2>
              <v-spacer />
            </v-card-title>

            <v-divider />

            <v-card-text style="min-height: 95px;">{{ template.description }}</v-card-text>
            <v-card-actions>
              <v-btn
                v-if="template.demoUrl"
                :href="template.demoUrl"
                flat="flat"
                color="success"
                target="_blank"
                rel="noopener"
              >
                {{ $t('Layout.PreMadeThemes.demo') }}
              </v-btn>

              <v-spacer />

              <v-btn
                v-if="template.price"
                href="https://store.vuetifyjs.com/product/813199294506"
                target="_blank"
                rel="noopener"
                color="primary"
                flat
              >
                {{ $t('Layout.PreMadeThemes.buy') }}
                <v-icon right>mdi-arrow-right</v-icon>
              </v-btn>

              <v-btn
                v-else
                :href="`https://github.com/${template.sourceUrl}/tree/master/template`"
                flat
                color="success"
                target="_blank"
                rel="noopener"
              >
                {{ $t('Layout.PreMadeThemes.sourceCode') }}
                <v-icon
                  right
                  success
                >
                  mdi-arrow-right
                </v-icon>
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
    computed: {
      templates () {
        return this.$t('Layout.PreMadeThemes.templates', 'en')
      }
    }
  }
</script>
