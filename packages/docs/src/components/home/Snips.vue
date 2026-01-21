<template>
  <v-img position="top" src="https://cdn.vuetifyjs.com/docs/images/one/snips/hero.svg">
    <HomeCommonGradient color="primary" opacity-class="opacity-10" />

    <v-container class="text-center text-md-left py-16">
      <v-row align="center">
        <v-col cols="12" md="6">
          <v-img
            :src="src"
            class="mb-4 d-inline-block"
            width="64"
          />

          <p class="font-weight-medium d-none d-md-block text-primary">
            Premium Examples
          </p>

          <h4 class="text-h4 font-weight-bold my-4">
            Beautiful UI snippets,<br>built with Vuetify
          </h4>

          <h6 class="text-h6 font-weight-regular text-medium-emphasis mb-5">
            Vuetify Snips is a collection of over 560 beautifully crafted UI snippets, built with Vuetify,
            aimed at making your development process easier and faster.
          </h6>

          <div>
            <v-btn
              append-icon="mdi-open-in-new"
              class="mr-4 text-none"
              color="primary"
              href="https://snips.vuetifyjs.com/"
              rounded="lg"
              size="large"
              target="_blank"
              text="Browse Vuetify Snips"
              variant="flat"
            />

            <v-btn
              class="mr-4 text-none"
              color="primary"
              href="https://snips.vuetifyjs.com/#faqs"
              rounded="lg"
              size="large"
              target="_blank"
              text="FAQs"
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
