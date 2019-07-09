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
                opacity="0.3"
                class="text-xs-center"
              >
                <h2
                  class="headline mb-5"
                  v-text="layout.name"
                />
                <v-btn
                  :aria-label="`Link to layout for ${layout.name}`"
                  :href="`https://github.com/vuetifyjs/vuetify/tree/${branch}/packages/docs/src${layout.href}.vue`"
                  :title="`Link to layout for ${layout.name}`"
                  class="mx-2"
                  color="indigo"
                  depressed
                  fab
                >
                  <v-icon>mdi-open-in-new</v-icon>
                </v-btn>
                <v-btn
                  :aria-label="`Link to layout ${layout.name}`"
                  :href="layout.href"
                  :title="`Link to code for ${layout.name}`"
                  class="mx-2"
                  color="indigo"
                  depressed
                  fab
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
    methods: {
      genSrc (name) {
        return `https://cdn.vuetifyjs.com/images/layouts/${name.toLowerCase().replace(' ', '-')}.png`
      },
    },
    mounted () {
      const branch = (window) ? window.location.hostname.split('.')[0] : 'master'
      this.branch = ['master', 'dev', 'next'].includes(branch) ? branch : 'master'
    },
  }
</script>
