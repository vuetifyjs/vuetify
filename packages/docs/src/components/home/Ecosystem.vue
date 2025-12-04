<template>
  <v-responsive class="py-15">
    <v-container>
      <HomeCommonTitle
        class="mb-10"
        description="Vuetify is a complete Vue ecosystem that provides you with all of the tools necessary to create beautiful content rich web applications."
        subtitle="A complete Vue ecosystem"
        title="More than just Components"
      >

        <template #top>
          <v-img :src="`https://cdn.vuetifyjs.com/docs/images/one/logos/vuetify.png`" class="mb-4" height="64" />
        </template>
      </HomeCommonTitle>

      <HomeCommonMarquee :items="features" class="my-5">
        <template #default="{ item }">
          <a :href="item.href" :title="`Visit ${item.href}`" target="_blank">
            <v-img
              :alt="item.image"
              :src="`https://cdn.vuetifyjs.com/docs/images/one/logos/${item.image}-logo-${theme.current.value.dark ? 'dark' : 'light'}.png`"
              height="40"
              width="150"
              contain
            />
          </a>
        </template>
      </HomeCommonMarquee>
    </v-container>
  </v-responsive>
</template>

<script setup lang="ts">
  const theme = useTheme()
  const features = computed(() => [
    {
      href: 'https://play.vuetifyjs.com',
      image: 'vplay',
    },
    {
      href: 'https://bin.vuetifyjs.com',
      image: 'vbin',
    },
    {
      href: 'https://link.vuetifyjs.com',
      image: 'vlink',
    },
    {
      href: 'https://studio.vuetifyjs.com',
      image: 'vstudio',
    },
    {
      href: 'https://snips.vuetifyjs.com',
      image: 'vsnips',
    },
    {
      href: 'https://store.vuetifyjs.com',
      image: 'vstore',
    },
    {
      href: 'https://issues.vuetifyjs.com',
      image: 'vissues',
    },
    {
      href: 'https://github.com/vuetifyjs/mcp/',
      image: 'vmcp',
    },
    {
      href: 'https://store.vuetifyjs.com/products/vuetify-ui-kit-figma',
      image: 'vuikit',
    },
    {
      href: 'https://github.com/vuetifyjs/vuetify-loader',
      image: 'vloader',
    },
  ])
</script>
