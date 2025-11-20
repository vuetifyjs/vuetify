<template>
  <v-responsive class="py-10">
    <HomeCommonGradient opacity-class="opacity-10" />

    <v-container>
      <HomeCommonTitle
        description="A unified platform providing powerful all Ecosystem Tools in one place. Build faster, collaborate better, and create stunning Vuetify applications."
        subtitle="Everything in One Place"
        title="Vuetify One"
      />

      <v-row class="text-left my-10">
        <v-col
          v-for="(item, i) in toolings"
          :key="i"
          cols="12"
          lg="6"
          sm="6"
        >
          <HomeCommonCard
            :description="item.description"
            :image="item.image"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-responsive>
</template>

<script setup lang="ts">
  const theme = useTheme()
  const isDark = computed(() => theme.current.value.dark)

  const toolings = computed(() => [
    {
      name: 'Vuetify Play',
      image: `https://cdn.vuetifyjs.com/docs/images/logos/vplay-logo-${isDark.value ? 'dark' : 'light'}.png`,
      description:
        'Interactive playground to experiment with Vuetify components. Create, save, and share your projects with the community.',
    },
    {
      name: 'Vuetify Bin',
      image: `https://cdn.vuetifyjs.com/docs/images/logos/vbin-logo-${isDark.value ? 'dark' : 'light'}.png`,
      description:
        'Save and share code snippets instantly. Features complete syntax highlighting and code formatting for a seamless experience.',
    },
    {
      name: 'Vuetify Link',
      image: `https://cdn.vuetifyjs.com/docs/images/one/logos/vlink-logo-${isDark.value ? 'dark' : 'light'}.png`,
      description:
        'Generate shareable links to documentation, components, and resources. Simplify collaboration and streamline your workflow.',
    },
    {
      name: 'Vuetify Studio',
      image: `https://cdn.vuetifyjs.com/docs/images/logos/vstudio-logo-${isDark.value ? 'dark' : 'light'}.png`,
      description:
        'Visual design tool for building Vuetify applications. Drag and drop components to create beautiful interfaces in minutes.',
    },
    {
      name: 'Vuetify Issues',
      image: `https://cdn.vuetifyjs.com/docs/images/logos/vissues-logo-${isDark.value ? 'dark' : 'light'}.png`,
      description:
        'Integrated issue tracking for Vuetify projects. Report bugs, request features, and stay updated with development progress.',
    },
    {
      name: 'Vuetify MCP',
      image: `https://cdn.vuetifyjs.com/docs/images/logos/vloader-logo-${isDark.value ? 'dark' : 'light'}.png`,
      description:
        'Modular component provider for seamless integration. Access pre-built components and utilities to accelerate development.',
    },
  ])
</script>
