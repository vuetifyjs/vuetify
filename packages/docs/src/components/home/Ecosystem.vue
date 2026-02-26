<template>
  <v-responsive class="py-15">
    <HomeCommonGradient opacity-class="opacity-10" />

    <v-container>
      <HomeCommonTitle
        :description="t('home.ecosystem.description')"
        :subtitle="t('home.ecosystem.subtitle')"
        :title="t('home.ecosystem.title')"
        class="mb-10"
      >

        <template #top>
          <v-img :src="`https://cdn.vuetifyjs.com/docs/images/one/logos/vuetify.png`" class="mb-4" height="64" />
        </template>
      </HomeCommonTitle>

      <HomeCommonMarquee :items="features" class="my-4">
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
  const { t } = useI18n()
  const theme = useTheme()
  const features = computed(() => [
    {
      href: 'https://issues.vuetifyjs.com',
      image: 'vissues',
    },
    {
      href: 'https://github.com/vuetifyjs/vuetify-loader',
      image: 'vloader',
    },
    {
      href: 'https://store.vuetifyjs.com',
      image: 'vstore',
    },
    {
      href: 'https://studio.vuetifyjs.com',
      image: 'vstudio',
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
      href: 'https://store.vuetifyjs.com/products/vuetify-ui-kit-figma',
      image: 'vuikit',
    },
    {
      href: 'https://play.vuetifyjs.com',
      image: 'vplay',
    },
    {
      href: 'https://snips.vuetifyjs.com',
      image: 'vsnips',
    },
    {
      href: 'https://github.com/vuetifyjs/mcp/',
      image: 'vmcp',
    },
    {
      href: 'https://github.com/vuetifyjs/cli/',
      image: 'vcli',
    },
  ])
</script>
