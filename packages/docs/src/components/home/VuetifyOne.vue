<template>
  <v-responsive class="py-16">
    <HomeBgGradient opacity-class="opacity-10" />

    <v-container>
      <div class="mb-15 text-center">
        <v-img
          :src="`https://cdn.vuetifyjs.com/docs/images/logos/vone-logo-${theme.current.value.dark ? 'dark' : 'light'}.png`"
          class="mx-auto mb-6"
          width="200"
        />

        <h4 class="text-h4 font-weight-bold mb-5">
          All Ecosystem Tools in One Place
        </h4>

        <v-responsive class="mx-auto my-5" max-width="700">
          <h6 class="text-h6 font-weight-regular text-medium-emphasis">
            A unified platform providing powerful tools for development, collaboration, and design.
            Build faster, collaborate better, and create stunning Vuetify applications.
          </h6>
        </v-responsive>
      </div>

      <v-row class="text-left mb-15">
        <v-col
          v-for="(item, i) in features"
          :key="i"
          cols="12"
          lg="6"
          sm="6"
        >
          <v-card
            border="primary thin"
            class="pa-6 d-md-flex justify-space-between align-center h-100"
            elevation="0"
            rounded="xl"
            link
          >
            <HomeBgGradient color="primary" opacity-class="opacity-20" />

            <v-img
              :src="item.image"
              class="mr-4"
              width="120"
            />

            <p class="text-medium-emphasis text-body-2 text-left mb-0 mt-3 my-md-0" style="line-height: 1.6;">
              {{ item.subtitle }}
            </p>
          </v-card>
        </v-col>
      </v-row>

      <v-btn
        class="text-none"
        color="primary"
        rounded="lg"
        size="large"
        text="Experience Vuetify One"
        flat
        @click="app.settings = true"
      />
    </v-container>
  </v-responsive>
</template>

<script setup lang="ts">
  const app = useAppStore()
  const theme = useTheme()

  const features = computed(() => [
    {
      title: 'Vuetify Play',
      image: `https://cdn.vuetifyjs.com/docs/images/logos/vplay-logo-${theme.current.value.dark ? 'dark' : 'light'}.png`,
      subtitle:
        'Interactive playground to experiment with Vuetify components. Create, save, and share your projects with the community.',
    },
    {
      title: 'Vuetify Bin',
      image: `https://cdn.vuetifyjs.com/docs/images/logos/vbin-logo-${theme.current.value.dark ? 'dark' : 'light'}.png`,
      subtitle:
        'Save and share code snippets instantly. Features complete syntax highlighting and code formatting for a seamless experience.',
    },
    {
      title: 'Vuetify Link',
      image: `https://cdn.vuetifyjs.com/docs/images/one/logos/vlink-logo-${theme.current.value.dark ? 'dark' : 'light'}.png`,
      subtitle:
        'Generate shareable links to documentation, components, and resources. Simplify collaboration and streamline your workflow.',
    },
    {
      title: 'Vuetify Studio',
      image: `https://cdn.vuetifyjs.com/docs/images/logos/vstudio-logo-${theme.current.value.dark ? 'dark' : 'light'}.png`,
      subtitle:
        'Visual design tool for building Vuetify applications. Drag and drop components to create beautiful interfaces in minutes.',
    },
    {
      title: 'Vuetify Issues',
      image: `https://cdn.vuetifyjs.com/docs/images/logos/vissues-logo-${theme.current.value.dark ? 'dark' : 'light'}.png`,
      subtitle:
        'Integrated issue tracking for Vuetify projects. Report bugs, request features, and stay updated with development progress.',
    },
    {
      title: 'Vuetify MCP',
      image: `https://cdn.vuetifyjs.com/docs/images/logos/vloader-logo-${theme.current.value.dark ? 'dark' : 'light'}.png`,
      subtitle:
        'Modular component provider for seamless integration. Access pre-built components and utilities to accelerate development.',
    },
  ])
</script>
