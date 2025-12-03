<template>
  <v-responsive class="py-15">
    <v-container>
      <HomeCommonGradient opacity-class="opacity-10" />

      <HomeCommonTitle
        class="mb-10"
        description="Vuetify is a complete Vue ecosystem that provides you with all of the tools necessary to create beautiful content rich web applications."
        subtitle="A complete Vue ecosystem"
        title="More than just Components"
      />

      <HomeCommonMarquee :items="features" class="my-5">
        <template #default="{ item }">
          <v-img
            :src="`https://cdn.vuetifyjs.com/docs/images/one/logos/${item.image}-logo-${theme.current.value.dark ? 'dark' : 'light'}.png`"
            class="px-6"
            width="200"
          />
        </template>
      </HomeCommonMarquee>
    </v-container>
  </v-responsive>
</template>

<script setup lang="ts">
  const theme = useTheme()
  const features = computed(() => [
    {
      description: '',
      image: 'vplay',
    },
    {
      description: '',
      image: 'vbin',
    },
    {
      description: '',
      image: 'vlink',
    },
    {
      description: '',
      image: 'vstudio',
    },
    {
      description: '',
      image: 'vsnips',
    },
    {
      description: '',
      image: 'vstore',
    },
    {
      description: '',
      image: 'vissues',
    },
    {
      description: '',
      image: 'vmcp',
    },
    {
      description: '',
      image: 'vuikit',
    },
    {
      description: '',
      image: 'vloader',
    },
  ])
</script>
