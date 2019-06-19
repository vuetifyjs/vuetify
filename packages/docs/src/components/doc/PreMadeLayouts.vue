<template>
  <v-container
    fluid
    grid-list-xl
    pa-0
  >
    <v-layout wrap>
      <v-flex
        v-for="layout in layouts"
        :key="layout.name"
        xs12
        sm4
      >
        <v-hover>
          <v-card slot-scope="{ hover }">
            <v-img
              :src="genSrc(layout.name)"
              :aspect-ratio="16/9"
              width="100%"
            />
            <v-sheet
              :color="hover ? 'rgba(0, 0, 0, 0.52)' : 'transparent'"
              class="transition-swing"
              dark
              style="position: absolute; top: 0; left: 0; right: 0; bottom: 0;"
              height="100%"
              width="100%"
            >
              <v-layout
                v-if="hover"
                layout
                align-center
                justify-center
                fill-height
                ma-0
              >
                <a
                  :href="`https://github.com/vuetifyjs/vuetify/tree/master/packages/docs/src${layout.href}.vue`"
                  class="text-decoration-none mx-2"
                  target="_blank"
                  rel="noopener"
                  title="Source code"
                >
                  <v-icon>mdi-code-tags</v-icon>
                </a>
                <a
                  :href="layout.href"
                  class="text-decoration-none mx-2"
                  target="_blank"
                  rel="noopener"
                  title="Demo"
                >
                  <v-icon>mdi-open-in-new</v-icon>
                </a>
              </v-layout>
            </v-sheet>
          </v-card>
        </v-hover>
        <div
          class="text-xs-center caption"
          v-text="layout.name"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      layouts: [
        { name: 'Baseline', href: '/examples/layouts/baseline' },
        { name: 'Baseline Flipped', href: '/examples/layouts/baseline-flipped' },
        { name: 'Centered', href: '/examples/layouts/centered' },
        { name: 'Complex', href: '/examples/layouts/complex' },
        { name: 'Dark', href: '/examples/layouts/dark' },
        { name: 'Google Contacts', href: '/examples/layouts/google-contacts' },
        { name: 'Google Keep', href: '/examples/layouts/google-keep' },
        { name: 'Google Youtube', href: '/examples/layouts/google-youtube' },
        { name: 'Sandbox', href: '/examples/layouts/sandbox' },
      ],
    }),
    methods: {
      genSrc (name) {
        return `https://cdn.vuetifyjs.com/images/layouts/${name.toLowerCase().replace(' ', '-')}.png`
      },
    },
  }
</script>
