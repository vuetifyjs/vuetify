<template>
  <v-img position="top" src="https://cdn.vuetifyjs.com/docs/images/one/snips/hero.svg">
    <HomeCommonGradient color="primary" opacity-class="opacity-10" />

    <v-container class="text-center text-md-left py-16">
      <v-row class="align-center">
        <v-col cols="12" md="6">
          <v-img
            :src="src"
            class="mb-4 d-inline-block"
            width="64"
          />

          <p class="font-weight-medium d-none d-md-block text-primary">
            {{ t('home.snips.subtitle') }}
          </p>

          <h4 class="text-headline-large font-weight-bold my-4">
            {{ t('home.snips.title-line1') }}<br>{{ t('home.snips.title-line2') }}
          </h4>

          <h6 class="text-title-large font-weight-regular text-medium-emphasis mt-0 mb-5">
            {{ t('home.snips.description') }}
          </h6>

          <div>
            <v-btn
              :text="t('home.snips.browse')"
              append-icon="mdi-open-in-new"
              class="mr-4 text-none"
              color="primary"
              href="https://snips.vuetifyjs.com/"
              rounded="lg"
              size="large"
              target="_blank"
              variant="flat"
            />

            <v-btn
              :text="t('faq')"
              class="mr-4 text-none"
              color="primary"
              href="https://snips.vuetifyjs.com/#faqs"
              rounded="lg"
              size="large"
              target="_blank"
              variant="text"
            />
          </div>

        </v-col>

        <v-col class="mb-n16 d-none d-md-block" cols="12" md="6">
          <div class="fade-gradient">
            <v-responsive max-height="500">
              <SnipsExample />
            </v-responsive>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-img>
</template>

<script setup lang="ts">
  import SnipsExample from './SnipsExample.vue'

  const { t } = useI18n()
  const src = computed(() => `https://cdn.vuetifyjs.com/docs/images/one/logos/vsnips.png`)
</script>

<style scoped>
.fade-gradient {
  position: relative;
  height: 100%;
  pointer-events: none;
}

.fade-gradient::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 50%;
  background: linear-gradient(to bottom, transparent, rgb(var(--v-theme-background)));
}
</style>
