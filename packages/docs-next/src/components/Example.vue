<template>
  <v-card
    class="mb-9 v-example"
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
        <v-icon left>
          mdi-star
        </v-icon>
        <span>New in <strong>{{ newIn }}</strong></span>
      </v-chip>

      <v-spacer />

      <app-tooltip-btn
        icon="$mdiInvertColors"
        tooltip="Invert example colors"
        @click="dark = !dark"
      />
      <app-tooltip-btn
        icon="$mdiCodepen"
        tooltip="Edit in Codepen"
        @click="sendToCodepen"
      />
      <app-tooltip-btn
        icon="$mdiGithub"
        tooltip="View on Github"
        :href="`https://github.com/vuetifyjs/vuetify/tree/${branch}/packages/docs/src/examples/${file}.vue`"
      />
      <app-tooltip-btn
        icon="$mdiCodeTags"
        tooltip="View Source"
        @click="expand = !expand"
      />
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

          <v-spacer />

          <app-tooltip-btn
            icon="$mdiContentCopy"
            tooltip="Copy Example Code"
            @click="copyMarkup"
          />
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
                <markup :code="pen[section]" />
              </div>
            </v-window-item>
          </template>
        </v-window>
      </v-card>
    </v-expand-transition>

    <codepen
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
            <component
              :is="component"
              class="mb-0"
            />
          </div>
        </v-card-text>
      </v-sheet>
    </v-fade-transition>
  </v-card>
</template>

<script>
  import codepen from '@/mixins/codepen'
  import {
    copyElementContent,
    getBranch,
  } from '@/util/helpers'

  export default {
    name: 'Example',

    mixins: [codepen],

    data: () => ({
      branch: 'master',
      dark: false,
      expand: false,
      file: undefined,
      newIn: 'v3.0.0', // handle via store?
      observer: null,
      selected: 'template',
      template: false,
      component: undefined,
    }),

    computed: {
      sections () {
        return ['template', 'script', 'style'].filter(section => this.pen[section])
      },
    },

    beforeDestroy () {
      this.unobserve()
    },

    mounted () {
      this.branch = getBranch()
      this.file = this.$attrs.file
      this.importComponent()

      this.observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) this.importTemplate()
        })
      }, { threshold: 0 })
      this.observer.observe(this.$el)
    },

    methods: {
      async copyMarkup () {
        const markups = Array.from(this.$el.querySelectorAll('pre'))
        const template = []

        for (const markup of markups) {
          template.push(markup.innerHTML)
        }

        this.template = template.join('\n\n')
        // Wait for $refs.pre to hydrate
        await this.$nextTick()
        console.log(this.$refs.pre)

        copyElementContent(this.$refs.pre)

        this.template = false
      },
      importComponent () {
        return import(
          /* webpackChunkName: "examples" */
          /* webpackMode: "lazy-once" */
          `../examples/${this.file}.vue`
        )
          .then(comp => (this.component = comp.default))
      },
      importTemplate () {
        return import(
          /* webpackChunkName: "examples-source" */
          /* webpackMode: "lazy-once" */
          `!raw-loader!../examples/${this.file}.vue`
        )
          .then(comp => this.boot(comp.default))
          .then(this.unobserve)
      },
      sendToCodepen () {
        this.$refs.codepen.submit()
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

    code[class*="language-"],
    pre[class*="language-"]
      text-shadow: none
</style>
