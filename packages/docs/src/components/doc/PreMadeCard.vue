<template>
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
          class="text-center"
        >
          <h2
            class="title mb-6"
            v-text="layout.name"
          />
          <v-btn
            :aria-label="`Link to layout for ${layout.name}`"
            :href="`/${$route.params.lang}/examples/layouts/${kebabCase(layout.name)}`"
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
          <v-btn
            :aria-label="`Link to Codepen for ${layout.name}`"
            :title="`Link to Codepen for ${layout.name}`"
            class="mx-2"
            color="indigo"
            depressed
            fab
            small
            @click="sendToCodepen"
          >
            <v-icon>mdi-codepen</v-icon>
            <doc-codepen
              v-if="pen"
              ref="codepen"
              :pen="pen"
            />
          </v-btn>
        </v-overlay>
      </v-fade-transition>
    </v-img>
  </v-card>
</template>

<script>
  // Utilities
  import kebabCase from 'lodash/kebabCase'
  import { getBranch } from '@/util/helpers'
  import codepen from '@/mixins/codepen'

  export default {
    mixins: [codepen],

    props: {
      layout: {
        type: Object,
        default: () => ({}),
      },
    },

    data: () => ({
      branch: 'master',
    }),

    mounted () {
      this.branch = getBranch()
      this.importTemplate()
    },

    methods: {
      kebabCase,
      genSrc (name) {
        return `https://cdn.vuetifyjs.com/images/layouts/${name.toLowerCase().replace(' ', '-')}.png`
      },
      importTemplate () {
        return import(
          /* webpackChunkName: "premadelayout-source" */
          /* webpackMode: "lazy-once" */
          `!raw-loader!../../layouts/layouts/demos/${this.layout.filename}.vue`
        )
          .then(comp => this.boot(comp.default))
      },
      sendToCodepen () {
        this.$refs.codepen.submit()
      },
    },
  }
</script>
