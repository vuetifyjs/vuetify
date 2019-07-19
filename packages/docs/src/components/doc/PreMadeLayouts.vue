<template>
  <v-container
    fluid
    grid-list-xl
    pa-0
  >
    <v-layout
      align-center
      fill-height
      justify-center
      wrap
    >
      <v-flex
        v-for="(layout, i) in layouts"
        :key="i"
        xs12
        sm6
        md4
      >
        <v-card>
          <v-img
            :alt="layout.name"
            :src="genSrc(layout.name)"
            :aspect-ratio="16/9"
            width="100%"
          >
            <v-fade-transition>
              <v-overlay
                absolute
                opacity="0.7"
                class="text-xs-center"
              >
                <h2
                  class="title mb-4"
                  v-text="layout.name"
                />
                <v-btn
                  :aria-label="`Link to layout for ${layout.name}`"
                  :href="layout.href"
                  :title="`Link to layout for ${layout.name}`"
                  class="mx-2"
                  color="indigo"
                  depressed
                  fab
                  small
                  target="_blank"
                >
                  <v-icon>mdi-open-in-new</v-icon>
                </v-btn>
                <v-btn
                  :aria-label="`Link to layout ${layout.name}`"
                  :href="`https://github.com/vuetifyjs/vuetify/tree/${branch}/packages/docs/src${layout.href}.vue`"
                  :title="`Link to code for ${layout.name}`"
                  class="mx-2"
                  color="indigo"
                  depressed
                  fab
                  small
                  target="_blank"
                >
                  <v-icon>mdi-code-tags</v-icon>
                </v-btn>
              </v-overlay>
            </v-fade-transition>
          </v-img>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import { getBranch } from '@/util/helpers'

  export default {
    data: () => ({
      branch: null,
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
    mounted () {
      this.branch = getBranch()
    },
    methods: {
      genSrc (name) {
        return `https://cdn.vuetifyjs.com/images/layouts/${name.toLowerCase().replace(' ', '-')}.png`
      },
    },
  }
</script>
