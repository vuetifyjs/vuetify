<template>
  <v-responsive class="py-10">
    <HomeCommonGradient color="primary" opacity-class="opacity-10" />

    <v-container>
      <HomeCommonTitle
        description="A unified platform providing powerful all Ecosystem Tools in one place. Build faster, collaborate better, and create stunning Vuetify applications."
        subtitle="Everything in One Place"
        title="Vuetify One"
      >
        <template #top>
          <v-img :src="`https://cdn.vuetifyjs.com/docs/images/one/logos/vone.png`" class="mb-4" height="88" />
        </template>
      </HomeCommonTitle>

      <v-row class="text-left mt-10">
        <v-col
          v-for="(item, i) in toolings"
          :key="i"
          cols="12"
          lg="4"
          sm="6"
        >
          <HomeCommonCard
            :description="item.description"
            :href="item.href"
            :image="`https://cdn.vuetifyjs.com/docs/images/one/logos/${item.image}-logo-${isDark ? 'dark' : 'light'}.png`"
            target="_blank"
          />
        </v-col>

        <v-col class="text-center mt-6" cols="12">
          <v-btn
            :to="rpath('/one/')"
            append-icon="mdi-page-next"
            class="mr-4 text-none"
            color="primary"
            rounded="lg"
            size="large"
            text="See Subscription Benefits"
            variant="flat"
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
      image: 'vplay',
      description: 'An interactive playground to experiment with Vuetify components and features in real-time.',
      href: 'https://play.vuetifyjs.com',
    },
    {
      name: 'Vuetify Bin',
      image: 'vbin',
      description: 'A code sharing platform tailored for Vuetify projects, enabling easy collaboration and sharing of code snippets.',
      href: 'https://bin.vuetifyjs.com',
    },
    {
      name: 'Vuetify Studio',
      image: 'vstudio',
      description: 'A visual development environment for building Vuetify applications with drag-and-drop components and real-time previews.',
      href: 'https://studio.vuetifyjs.com',
    },
    {
      name: 'Vuetify Link',
      image: 'vlink',
      description: 'A URL shortening service designed for Vuetify developers to create and manage short links efficiently.',
      href: 'https://link.vuetifyjs.com',
    },
    {
      name: 'Vuetify MCP',
      image: 'vmcp',
      description: 'Model Context Protocol (MCP) server providing Vuetify component information and documentation.',
      href: 'https://github.com/vuetifyjs/mcp/',
    },
    {
      name: 'Vuetify Issues',
      image: 'vissues',
      description: 'Easily report issues and request features for projects in the Vuetify Ecosystem.',
      href: 'https://issues.vuetifyjs.com',
    },
  ])
</script>
