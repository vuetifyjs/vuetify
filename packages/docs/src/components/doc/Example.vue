<template>
  <v-card
    :loading="loading"
    :min-height="loading ? 200 : undefined"
    class="mb-12 v-example"
    outlined
  >
    <v-toolbar
      :color="$vuetify.theme.dark ? 'grey darken-4' : 'grey lighten-3'"
      dense
      flat
    >
      <v-chip
        v-if="newIn"
        color="warning"
        small
      >
        <v-icon left>mdi-star</v-icon>

        <span>New in <strong>{{ newIn }}</strong></span>
      </v-chip>

      <v-spacer />

      <v-tooltip
        v-if="!$vuetify.theme.dark"
        bottom
      >
        <template v-slot:activator="{ on }">
          <v-btn
            aria-label="Invert example colors"
            icon
            @click="dark = !dark"
            v-on="on"
          >
            <v-icon>mdi-invert-colors</v-icon>
          </v-btn>
        </template>

        Invert example colors
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            aria-label="Edit in Codepen"
            icon
            @click="sendToCodepen"
            v-on="on"
          >
            <v-icon>mdi-codepen</v-icon>
          </v-btn>
        </template>

        Edit in Codepen
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            aria-label="View on Github"
            :href="`https://github.com/vuetifyjs/vuetify/tree/${branch}/packages/docs/src/examples/${file}.vue`"
            icon
            target="_blank"
            v-on="on"
          >
            <v-icon>mdi-github</v-icon>
          </v-btn>
        </template>

        View on Github
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            aria-label="View source"
            icon
            @click="expand = !expand"
            v-on="on"
          >
            <v-icon>mdi-code-tags</v-icon>
          </v-btn>
        </template>

        View source
      </v-tooltip>
    </v-toolbar>

    <v-expand-transition v-if="pen">
      <v-card
        v-show="expand"
        color="#2d2d2d"
        dark
        flat
        tile
      >
        <v-item-group
          v-model="selected"
          class="pa-2 d-flex"
          mandatory
        >
          <template v-for="(section, i) in sections">
            <v-item
              :key="`item-${i}`"
              :value="section"
            >
              <v-btn
                slot-scope="{ active, toggle }"
                :color="!active ? 'transparent' : ''"
                :input-value="active"
                active-class="grey darken-2 white--text"
                class="mr-2"
                depressed
                rounded
                @click="toggle"
              >
                {{ section }}
              </v-btn>
            </v-item>
          </template>

          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                aria-label="Copy Example Code"
                class="ml-auto"
                icon
                @click="copyMarkup"
                v-on="on"
              >
                <v-icon>mdi-content-copy</v-icon>
              </v-btn>
            </template>

            Copy Example Code
          </v-tooltip>
        </v-item-group>

        <v-divider />

        <pre
          v-if="template"
          ref="pre"
          aria-hidden="true"
          class="v-example__code"
          v-html="template"
        />

        <v-window v-model="selected">
          <template v-for="(section, i) in sections">
            <v-window-item
              :key="`window-${i}`"
              :value="section"
              eager
            >
              <div :class="($vuetify.breakpoint.smAndUp) ? 'v-example__container' : ''">
                <doc-markup
                  :filename="false"
                  :value="file"
                  class="mb-0"
                  no-copy
                >{{ pen[section] }}</doc-markup>
              </div>
            </v-window-item>
          </template>
        </v-window>
      </v-card>
    </v-expand-transition>

    <doc-codepen
      v-if="pen"
      ref="codepen"
      :pen="pen"
    />

    <v-fade-transition>
      <v-sheet
        v-if="component"
        :dark="dark"
        tile
        flat
      >
        <v-card-text>
          <div data-app="true">
            <component :is="component" />
          </div>
        </v-card-text>
      </v-sheet>
    </v-fade-transition>
  </v-card>
</template>

<script>
  // Utilities
  import kebabCase from 'lodash/kebabCase'
  import { get } from 'vuex-pathify'
  import {
    copyElementContent,
    getBranch,
  } from '@/util/helpers'
  import codepen from '@/mixins/codepen'

  export default {
    mixins: [codepen],

    props: {
      eager: Boolean,
      value: {
        type: [Object, String],
        default: undefined,
      },
    },

    data: vm => ({
      branch: 'master',
      component: undefined,
      copyTimeout: false,
      dark: false,
      expand: false,
      loading: false,
      observer: null,
      selected: 'template',
      template: false,
    }),

    computed: {
      namespace: get('documentation/namespace'),
      page: get('documentation/page'),
      internalValue () {
        if (this.value === Object(this.value)) return this.value

        return { file: this.value }
      },
      file () {
        return `${this.kebabCase(this.page)}/${this.internalValue.file}`
      },
      newIn () {
        return this.internalValue.newIn
      },
      sections () {
        return ['template', 'script', 'style'].filter(section => this.pen[section])
      },
    },

    created () {
      this.expand = Boolean(this.internalValue.show)
    },

    beforeDestroy () {
      this.unobserve()
    },

    mounted () {
      this.branch = getBranch()

      this.importComponent()
      if (this.eager) return this.getFiles()

      this.observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) this.importTemplate()
        })
      }, { threshold: 0 })

      this.observer.observe(this.$el)
    },

    methods: {
      async getFiles () {
        this.loading = true
        await this.importTemplate()
        this.loading = false
      },
      getLang (tab) {
        if (tab === 'script') return 'js'
        if (tab === 'style') return 'css'
        return 'vue'
      },
      importComponent () {
        return import(
          /* webpackChunkName: "examples" */
          /* webpackMode: "lazy-once" */
          `../../examples/${this.file}.vue`
        )
          .then(comp => (this.component = comp.default))
      },
      importTemplate () {
        return import(
          /* webpackChunkName: "examples-source" */
          /* webpackMode: "lazy-once" */
          `!raw-loader!../../examples/${this.file}.vue`
        )
          .then(comp => this.boot(comp.default))
          .then(this.unobserve)
      },
      async copyMarkup () {
        const markups = Array.from(this.$el.querySelectorAll('pre'))
        const template = []

        for (const markup of markups) {
          template.push(markup.innerHTML)
        }

        this.template = template.join('\n\n')

        // Wait for $refs.pre to hydrate
        await this.$nextTick()

        copyElementContent(this.$refs.pre)

        this.template = false
      },
      kebabCase,
      sendToCodepen () {
        this.$refs.codepen.submit()
      },
      togglePanel () {
        const panel = this.$refs.panel.items[0]._uid

        this.$refs.panel.panelClick(panel)
      },
      unobserve () {
        this.observer && this.observer.unobserve(this.$el)
      },
    },
  }
</script>

<style lang="sass">
  .v-example
    &:not(:first-child) .v-example__container
      border-left: 1px solid rgba(#FFF, .12)

    &__container
      height: 100%
      max-height: calc(100vh - 275px)
      overflow-y: auto

    &__code
      opacity: 0
      pointer-events: none
      position: absolute
      z-index: -9999

      > *
        position: absolute
</style>
