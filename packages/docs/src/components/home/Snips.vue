<template>
  <v-container class="text-center text-md-left py-16">
    <v-row align="center">
      <v-col cols="12" md="7" order="1" order-md="0">
        <p class="font-weight-medium d-none d-md-block text-primary">
          Premium Examples
        </p>

        <h4 class="text-h4 font-weight-bold my-4">
          Beautiful UI snippets, built with Vuetify
        </h4>

        <h6 class="text-h6 font-weight-regular text-medium-emphasis mb-5">
          Vuetify Snips is a collection of over 500 beautifully crafted UI snippets, built with Vuetify,
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
            text="Browse Code Snippets"
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

      <v-col cols="12" md="5" order="0" order-md="1">
        <v-img
          :src="src"
          height="100"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
  const theme = useTheme()

  const src = computed(() => `https://cdn.vuetifyjs.com/docs/images/one/logos/vsnips-logo-${theme.current.value.dark ? 'dark' : 'light'}.png`)
</script>
