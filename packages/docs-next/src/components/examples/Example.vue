<template>
  <v-sheet
    class="mb-9 v-example"
    outlined
    rounded
  >
    <v-lazy min-height="52">
      <div class="text-end pa-2">
        <app-tooltip-btn
          v-for="(tooltip, i) in tooltips"
          :key="i"
          :disabled="hasError"
          :href="tooltip.href ? tooltip.href : undefined"
          :icon="tooltip.icon"
          :path="tooltip.path"
          :target="tooltip.href ? '_blank' : undefined"
          @click="tooltip.onClick"
        />
      </div>
    </v-lazy>

    <v-divider />

    <v-lazy v-if="pen">
      <div>
        <v-expand-transition>
          <div v-show="expand">
            <v-item-group
              v-model="selected"
              class="pa-2"
              mandatory
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

            <v-window
              v-model="selected"
              class="grey lighten-5"
            >
              <template v-for="(section, i) in sections">
                <v-window-item
                  :key="`window-${i}`"
                  :value="section"
                >
                  <markup :code="pen[section]" />
                </v-window-item>
              </template>
            </v-window>

            <v-divider />
          </div>
        </v-expand-transition>

        <codepen
          ref="codepen"
          :pen="pen"
        />
      </div>
    </v-lazy>

    <v-fade-transition appear>
      <v-sheet
        v-if="file"
        :dark="dark"
        :light="!dark"
        class="pa-4"
        color="transparent"
        @mouseenter.once="importTemplate"
      >
        <vue-file
          :file="file"
          class="mb-0"
          @error="hasError = true"
        />
      </v-sheet>
    </v-fade-transition>
  </v-sheet>
</template>

<script>
  // Mixins
  import Codepen from '@/mixins/codepen'

  // Utilities
  import { get } from 'vuex-pathify'

  export default {
    name: 'Example',

    mixins: [Codepen],

    props: { file: String },

    data: () => ({
      dark: false,
      expand: false,
      hasError: false,
      pen: undefined,
      selected: 'template',
    }),

    computed: {
      branch: get('app/branch'),
      sections () {
        return ['template', 'script', 'style'].filter(section => this.pen[section])
      },
      tooltips () {
        return [
          {
            icon: '$mdiInvertColors',
            path: 'invert-example-colors',
            onClick: () => (this.dark = !this.dark),
          },
          {
            icon: '$mdiCodepen',
            path: 'edit-in-codepen',
            onClick: this.sendToCodepen,
          },
          {
            icon: '$mdiGithub',
            path: 'view-in-github',
            href: `https://github.com/vuetifyjs/vuetify/tree/${this.branch}/packages/docs/src/examples/${this.file}.vue`,
            onClick: () => {},
          },
          {
            icon: '$mdiCodeTags',
            path: 'view-source',
            onClick: () => (this.expand = !this.expand),
          },
        ]
      },
    },
  }
</script>

<style lang="sass">
  .v-example
    code[class*="language-"],
    pre[class*="language-"]
      text-shadow: none

    pre.language-markup::after
      content: 'vue'
</style>
