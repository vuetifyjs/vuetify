<template>
  <v-responsive class="py-16">
    <HomeCommonGradient opacity-class="opacity-10" />

    <v-container>
      <HomeCommonTitle
        class="mb-16"
        description="Vuetify provides a suite of tools for managing your Vuetify projects."
        subtitle="Tools & Resources"
        title="Vuetify Tooling"
      />

      <v-row class="text-left mb-10" justify="center">
        <v-col
          v-for="(item, i) in features"
          :key="i"
          cols="12"
          lg="6"
          sm="6"
        >
          <HomeCommonCard
            :description="item.description"
            :image="item.image"
            :title="item.title"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-responsive>
</template>

<script setup lang="ts">
  const theme = useTheme()

  const isDark = computed(() => theme.current.value.dark)

  const features = computed(() => [
    {
      title: 'Vuetify Create',
      image: `https://cdn.vuetifyjs.com/docs/images/one/logos/vcreate-logo-${isDark.value ? 'dark' : 'light'}.png`,
      description: `Scaffold your next Vuetify application with just a few commands. Perfect for getting started with Vuetify.`,
    },
    {
      title: 'Vuetify UI Kit',
      image: `https://cdn.vuetifyjs.com/docs/images/one/logos/vuikit-logo-${isDark.value ? 'dark' : 'light'}.png`,
      description: `Fully optimized for Figma and based on Material Design - Vuetify UI Kit. You can use it to create your own Vuetify components and use them in your projects.`,
    },
    {
      title: 'Vuetify ESLint Config',
      description: 'An opinionated eslint config for Vuetify, crafted to keep your code clean and consistent! You can use it to keep your code clean and consistent.',
      image: `https://cdn.vuetifyjs.com/docs/images/one/logos/vloader-logo-${isDark.value ? 'dark' : 'light'}.png`,
    },
    {
      title: 'Vuetify ESLint Plugin',
      image: `https://cdn.vuetifyjs.com/docs/images/one/logos/vloader-logo-${isDark.value ? 'dark' : 'light'}.png`,
      description: `Version upgrade automation eslint plugin, to keep your code clean and consistent! You can use it to keep your code clean and consistent.`,
    },
    {
      title: 'Vuetify Loader',
      image: `https://cdn.vuetifyjs.com/docs/images/one/logos/vloader-logo-${isDark.value ? 'dark' : 'light'}.png`,
      description: `A Vite and Webpack loader that automatically imports Vuetify components and styles on demand to reduce bundle size.`,
    },
  ])
</script>
