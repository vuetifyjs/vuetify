<template>
  <v-responsive class="py-16">
    <v-container>
      <HomeBgGradient />

      <div class="mb-16">
        <v-img
          :src="`https://cdn.vuetifyjs.com/docs/images/logos/vone-logo-${theme.current.value.dark ? 'dark' : 'light'}.png`"
          class="mx-auto mb-5"
          width="200"
        />

        <v-responsive class="mx-auto my-5" max-width="700">
          <h6 class="text-h6 font-weight-regular text-medium-emphasis">
            All Vuetify ecosystem tools in one place.
          </h6>
        </v-responsive>
      </div>
      <v-row class="text-left">
        <v-col
          v-for="(item, i) in features"
          :key="i"
          cols="12"
          lg="4"
          sm="6"
        >
          <v-img
            :src="item.image"
            class="mb-3"
            width="120"
          />

          <p class="text-medium-emphasis mb-3">{{ item.subtitle }}</p>

          <v-btn class="text-none px-0" color="primary" variant="text">
            Learn More
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-responsive>
</template>

<script setup>
  const theme = useTheme()

  const features = computed(() => [
    {
      title: 'Vuetify Play',
      image: `https://cdn.vuetifyjs.com/docs/images/logos/vplay-logo-${theme.current.value.dark ? 'dark' : 'light'}.png`,
      subtitle:
        `Playground for Vuetify components and see how they work. You can also create and share your own projects.
        Save your projects and share them with others.`,
    },
    {
      title: 'Vuetify Bin',
      image: `https://cdn.vuetifyjs.com/docs/images/logos/vbin-logo-${theme.current.value.dark ? 'dark' : 'light'}.png`,
      subtitle:
        'Share your code snippets with others. You can also save your snippets and share them with others. Complete code formatting and syntax highlighting.',
    },
    {
      title: 'Vuetify Link',
      image: `https://cdn.vuetifyjs.com/docs/images/one/logos/vlink-logo-${theme.current.value.dark ? 'dark' : 'light'}.png`,
      subtitle:
        'QuiArcu egestas dolor vel iaculis in ipsum mauris. Tincidunt mattis aliquet hac quis. Id hac maecenas ac donec pharetra eget.',
    },
    {
      title: 'Vuetify Studio',
      image: `https://cdn.vuetifyjs.com/docs/images/logos/vstudio-logo-${theme.current.value.dark ? 'dark' : 'light'}.png`,
      subtitle:
        'Commodo nec sagittis tortor mauris sed. Turpis tortor quis scelerisque diam id accumsan nullam tempus. Pulvinar etiam lacus volutpat eu.',
    },
    {
      title: 'Vuetify Issues',
      image: `https://cdn.vuetifyjs.com/docs/images/logos/vissues-logo-${theme.current.value.dark ? 'dark' : 'light'}.png`,
      subtitle:
        'Pellentesque sit elit congue ante nec amet. Dolor aenean curabitur viverra suspendisse iaculis eget. Nec mollis placerat ultricies euismod ut condimentum.',
    },
    {
      title: 'Vuetify MCP',
      image: `https://cdn.vuetifyjs.com/docs/images/logos/vloader-logo-${theme.current.value.dark ? 'dark' : 'light'}.png`,
      subtitle:
        'Pellentesque enim a commodo malesuada turpis eleifend risus. Facilisis donec placerat sapien consequat tempor fermentum nibh.',
    },
  ])
</script>
