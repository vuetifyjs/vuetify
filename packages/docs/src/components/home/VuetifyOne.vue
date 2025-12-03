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
      image: `https://cdn.vuetifyjs.com/docs/images/one/logos/vplay-logo-${isDark.value ? 'dark' : 'light'}.png`,
      description: 'An interactive playground to experiment with Vuetify components and features in real-time.',
    },
    {
      name: 'Vuetify Bin',
      image: `https://cdn.vuetifyjs.com/docs/images/one/logos/vbin-logo-${isDark.value ? 'dark' : 'light'}.png`,
      description: 'A code sharing platform tailored for Vuetify projects, enabling easy collaboration and sharing of code snippets.',
    },
    {
      name: 'Vuetify Studio',
      image: `https://cdn.vuetifyjs.com/docs/images/one/logos/vstudio-logo-${isDark.value ? 'dark' : 'light'}.png`,
      description: 'A visual development environment for building Vuetify applications with drag-and-drop components and real-time previews.',
    },
    {
      name: 'Vuetify Link',
      image: `https://cdn.vuetifyjs.com/docs/images/one/logos/vlink-logo-${isDark.value ? 'dark' : 'light'}.png`,
      description: 'A URL shortening service designed for Vuetify developers to create and manage short links efficiently.',
    },
    {
      name: 'Vuetify Issues',
      image: `https://cdn.vuetifyjs.com/docs/images/one/logos/vissues-logo-${isDark.value ? 'dark' : 'light'}.png`,
      description: 'Easily report issues and request features for projects in the Vuetify Ecosystem.',
    },
    {
      name: 'Vuetify MCP',
      image: `https://cdn.vuetifyjs.com/docs/images/one/logos/vmcp-logo-${isDark.value ? 'dark' : 'light'}.png`,
      description: 'Model Context Protocol (MCP) server providing Vuetify component information and documentation to any MCP-compatible client or IDE.',
    },
  ])
</script>
