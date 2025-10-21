<template>
  <v-responsive>
    <HomeBgGradient color="primary" />

    <v-container class="text-center text-md-left py-16">
      <v-row align="center">
        <v-col cols="12" md="7" order="1" order-md="0">
          <p class="font-weight-medium d-none d-md-block text-primary">
            From the creators of Vuetify
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
              class="mr-4 text-none"
              color="primary"
              rounded="lg"
              size="large"
              text="Get Started"
              variant="flat"
            />

            <v-btn
              class="mr-4 text-none"
              color="primary"
              rounded="lg"
              size="large"
              text="Learn More"
              variant="text"
            />
          </div>

        </v-col>

        <v-col cols="12" md="5" order="0" order-md="1">
          <v-img
            :rounded="$vuetify.display.smAndDown ? true : 's-lg'"
            :src="src"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-responsive>
</template>

<script setup>
  const theme = useTheme()

  const src = computed(() => `https://cdn.vuetifyjs.com/docs/images/logos/vsnips-logo-${theme.current.value.dark ? 'dark' : 'light'}.png`)
</script>
