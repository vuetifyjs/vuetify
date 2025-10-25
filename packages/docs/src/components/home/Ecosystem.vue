<template>
  <v-responsive class="py-15">
    <v-container>
      <HomeBgGradient />

      <div class="mb-10">
        <p class="text-primary font-weight-bold mb-3">
          A complete Vue ecosystem
        </p>

        <h4 class="text-h4 font-weight-bold mb-5">
          More than just Components
        </h4>

        <v-responsive class="mx-auto mb-15" max-width="700">
          <h6 class="text-h6 font-weight-regular text-medium-emphasis">
            Vuetify is a complete Vue ecosystem that provides you with all of the tools necessary to create beautiful content rich web applications.
          </h6>
        </v-responsive>
      </div>

      <HomeMarquee :items="features" class="my-5">
        <template #default="{ item }">
          <v-img
            :src="item.image"
            class="px-6"
            width="200"
          />
        </template>
      </HomeMarquee>
    </v-container>
  </v-responsive>
</template>

<script setup lang="ts">
  const theme = useTheme()
  const features = computed(() => [
    {
      description: 'Vuetify MCP is a tool for managing your Vuetify projects. You can manage your projects and see the status of the project.',
      image: `https://cdn.vuetifyjs.com/docs/images/logos/vone-logo-${theme.current.value.dark ? 'dark' : 'light'}.png`,
    },
    {
      description: 'Vuetify MCP is a tool for managing your Vuetify projects. You can manage your projects and see the status of the project.',
      image: `https://cdn.vuetifyjs.com/docs/images/logos/v0-logo-${theme.current.value.dark ? 'dark' : 'light'}.png`,
    },
    {
      image: `https://cdn.vuetifyjs.com/docs/images/one/logos/vplay-logo-${theme.current.value.dark ? 'dark' : 'light'}.png`,
      description: 'You can use Vuetify Playground to experiment with Vuetify components and see how they work.',
    },
    {
      description: 'Bin is a tool for sharing code snippets. You can save your snippets with a unique URL.',
      image: `https://cdn.vuetifyjs.com/docs/images/one/logos/vbin-logo-${theme.current.value.dark ? 'dark' : 'light'}.png`,
    },
    {
      description: 'Vuetify Link can be used to shorten long URLs. You can save them for later use.',
      image: `https://cdn.vuetifyjs.com/docs/images/one/logos/vlink-logo-${theme.current.value.dark ? 'dark' : 'light'}.png`,
    },
    {
      description: 'Vuetify Studio is a tool for creating Vuetify components. You can create your own components and share them with others.',
      image: `https://cdn.vuetifyjs.com/docs/images/one/logos/vstudio-logo-${theme.current.value.dark ? 'dark' : 'light'}.png`,
    },
    {
      description: 'Vuetify Issues is a tool for reporting issues with Vuetify. You can report issues and see the status of the issue.',
      image: `https://cdn.vuetifyjs.com/docs/images/one/logos/vissues-logo-${theme.current.value.dark ? 'dark' : 'light'}.png`,
    },
    {
      description: 'Vuetify MCP is a tool for managing your Vuetify projects. You can manage your projects and see the status of the project.',
      image: `https://cdn.vuetifyjs.com/docs/images/logos/vmcp-logo-${theme.current.value.dark ? 'dark' : 'light'}.png`,
    },
    {
      description: 'Vuetify MCP is a tool for managing your Vuetify projects. You can manage your projects and see the status of the project.',
      image: `https://cdn.vuetifyjs.com/docs/images/logos/vsnips-logo-${theme.current.value.dark ? 'dark' : 'light'}.png`,
    },
    {
      description: 'Vuetify MCP is a tool for managing your Vuetify projects. You can manage your projects and see the status of the project.',
      image: `https://cdn.vuetifyjs.com/docs/images/logos/vloader-logo-${theme.current.value.dark ? 'dark' : 'light'}.png`,
    },
  ])
</script>
