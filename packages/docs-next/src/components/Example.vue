<template>
  <v-card
    class="mb-9 v-example"
    outlined
  >
    <v-sheet class="text-end pa-2">
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
    </v-sheet>

    <template v-if="pen">
      <v-expand-transition>
        <v-sheet v-show="expand">
          <v-item-group
            v-model="selected"
            mandatory
            class="pa-2"
          >
            <template v-for="(section, i) in sections">
              <v-item
                :key="`item-${i}`"
                :value="section"
              >
                <template v-slot="{ active, toggle }">
                  <v-btn
                    :input-value="active"
                    class="mr-2"
                    text
                    @click="toggle"
                  >
                    {{ section }}
                  </v-btn>
                </template>
              </v-item>
            </template>
          </v-item-group>

          <v-divider />

          <pre
            v-if="template"
            aria-hidden="true"
            v-html="template"
          />

          <v-window v-model="selected">
            <template v-for="(section, i) in sections">
              <v-window-item
                :key="`window-${i}`"
                :value="section"
                eager
              >
                <markup :code="pen[section]" />
              </v-window-item>
            </template>
          </v-window>

          <v-divider />
        </v-sheet>
      </v-expand-transition>

      <codepen
        ref="codepen"
        :pen="pen"
      />
    </template>

    <v-fade-transition
      v-if="component"
      appear
    >
      <v-sheet class="pa-2">
        <component
          :is="component"
          class="mb-0"
        />
      </v-sheet>
    </v-fade-transition>
  </v-card>
</template>

<script>
  // Mixins
  import codepen from '@/mixins/codepen'

  // Utilities
  import { getBranch } from '@/util/helpers'

  export default {
    name: 'Example',

    mixins: [codepen],

    data: () => ({
      branch: 'master',
      dark: false,
      expand: false,
      file: undefined,
      newIn: 'v3.0.0', // handle via store?
      selected: 'template',
      template: false,
      component: undefined,
    }),

    computed: {
      sections () {
        return ['template', 'script', 'style'].filter(section => this.pen[section])
      },
    },

    mounted () {
      this.branch = getBranch()
      this.file = this.$attrs.file
      this.importComponent()
      this.importTemplate()
    },

    methods: {
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
    },
  }
</script>

<style lang="sass">
  .v-example
    code[class*="language-"],
    pre[class*="language-"]
      text-shadow: none
</style>
