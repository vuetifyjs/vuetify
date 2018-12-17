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
          <v-card
            slot-scope="{ hover }"
            :href="layout.href"
            rel="noopener"
            target="_blank"
          >
            <v-img
              :src="genSrc(layout.name)"
              :aspect-ratio="16/9"
              width="100%"
            />
            <v-card
              v-if="hover"
              color="rgba(0,0,0,0.70)"
              dark
              style="position: absolute; top: 0; left: 0; right: 0; bottom: 0;"
              height="100%"
              width="100%"
            >
              <v-layout
                layout
                align-center
                justify-center
                fill-height
                ma-0
              >
                <span
                  class="title mr-1"
                  v-text="layout.name"
                />
                <v-icon>mdi-open-in-new</v-icon>
              </v-layout>
            </v-card>
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
        { name: 'Baseline Flipped', href: '/examples/layouts/baselineFlipped' },
        { name: 'Centered', href: '/examples/layouts/centered' },
        { name: 'Complex', href: '/examples/layouts/complex' },
        { name: 'Dark', href: '/examples/layouts/dark' },
        { name: 'Google Contacts', href: '/examples/layouts/googleContacts' },
        { name: 'Google Keep', href: '/examples/layouts/googleKeep' },
        { name: 'Google Youtube', href: '/examples/layouts/googleYoutube' },
        { name: 'Sandbox', href: '/examples/layouts/sandbox' }
      ]
    }),
    methods: {
      genSrc (name) {
        return `https://cdn.vuetifyjs.com/images/layouts/${name.toLowerCase().replace(' ', '-')}.png`
      }
    }
  }
</script>
