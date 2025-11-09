<template>
  <v-responsive class="py-10">
    <HomeBgGradient />

    <v-container>
      <div class="mb-16 pb-2">
        <p class="text-primary font-weight-bold mb-0">
          Tools & Resources
        </p>

        <h4 class="text-h4 font-weight-bold my-3">
          Vuetify Tooling
        </h4>

        <v-responsive class="mx-auto mb-5" max-width="700">
          <h6 class="text-h6 font-weight-regular text-medium-emphasis">
            Vuetify provides a suite of tools for managing your Vuetify projects.
          </h6>
        </v-responsive>
      </div>

      <v-row
        v-for="(tooling, i) in toolings"
        :key="tooling.name"
        align="center"
        class="text-left"
        justify="space-between"
      >
        <v-col
          cols="12"
          md="8"
          order="3"
        >
          <p class="text-subtitle-2 text-primary font-weight-bold mb-2">
            {{ tooling.title }}
          </p>

          <h5 class="font-weight-bold text-h6 mb-1">{{ tooling.name }}</h5>

          <h6 class="text-subtitle-1 font-weight-regular text-medium-emphasis my-2">
            {{ tooling.description }}
          </h6>

          <v-btn
            class="text-none my-2"
            color="primary"
            rounded="lg"
            flat
          >
            Get Started
          </v-btn>
        </v-col>

        <v-col
          v-if="!smAndDown"
          class="d-flex"
          cols="12"
          md="4"
          order="2"
        >
          <v-img
            :src="tooling.image"
            max-height="150"
            max-width="80%"
            rounded="xl"
            width="100%"
          />
        </v-col>

        <v-col cols="12" order="4">
          <v-divider
            v-if="i !== toolings.length - 1"
            class="my-6"
            color="primary"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-responsive>
</template>

<script setup lang="ts">
  const theme = useTheme()
  const { smAndDown } = useDisplay()

  const isDark = computed(() => theme.current.value.dark)

  const toolings = computed(() => [
    {
      title: 'Scaffold your application',
      name: 'Vuetify Create will scaffold your next application',
      // TODO: Use proper image
      image: `https://cdn.vuetifyjs.com/docs/images/logos/vcreate-logo-${isDark.value ? 'dark' : 'light'}.png`,
      description: `Scaffold your next Vuetify application with just a few commands. Perfect for getting started with Vuetify. You can use it to create your own Vuetify components and use them in your projects.`,
    },
    {
      title: 'Figma UI Kit',
      name: 'Build beautiful Vuetify components with Figma UI Kit',
      // TODO: Use proper image
      image: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg',
      description: `Fully optimized for Figma and based on Material Design - Vuetify UI Kit. You can use it to create your own Vuetify components and use them in your projects.`,
    },
    {
      title: 'Vuetify ESLint Config',
      name: 'Vuetify ESLint Config to keep your code clean and consistent',
      description: `An opinionated eslint config for Vuetify, crafted to keep your code clean and consistent! You can use it to keep your code clean and consistent.`,
      // TODO: Use proper image
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/ESLint_logo.svg/1200px-ESLint_logo.svg.png',
    },
    {
      title: 'Write Clean code',
      name: 'Vuetify ESLint Plugin will keep your code clean and consistent',
      // TODO: Use proper image
      image: 'https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-light-atom.svg',
      description: `Version upgrade automation eslint plugin, to keep your code clean and consistent! You can use it to keep your code clean and consistent.`,
    },
  ])
</script>
