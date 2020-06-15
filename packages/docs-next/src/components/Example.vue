<template>
  <v-card
    class="mb-9 v-example"
    outlined
  >
    <v-lazy min-height="52">
      <v-sheet class="text-end pa-2">
        <app-tooltip-btn
          :disabled="hasError"
          icon="$mdiInvertColors"
          tooltip="Invert example colors"
          @click="dark = !dark"
        />

        <app-tooltip-btn
          :disabled="hasError"
          icon="$mdiCodepen"
          tooltip="Edit in Codepen"
          @click="sendToCodepen"
        />

        <app-tooltip-btn
          :disabled="hasError"
          :href="`https://github.com/vuetifyjs/vuetify/tree/${branch}/packages/docs/src/examples/${file}.vue`"
          icon="$mdiGithub"
          tooltip="View on Github"
        />

        <app-tooltip-btn
          :disabled="hasError"
          icon="$mdiCodeTags"
          tooltip="View Source"
          @click="expand = !expand"
        />
      </v-sheet>
    </v-lazy>

    <v-lazy v-if="pen">
      <div>
        <v-expand-transition>
          <v-sheet v-show="expand">
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
      </div>
    </v-lazy>

    <v-fade-transition appear>
      <v-sheet
        v-if="file"
        :dark="dark"
        class="pa-2"
        @mouseenter.once="importTemplate"
      >
        <vue-file
          :file="file"
          class="mb-0"
          @error="hasError = true"
        />
      </v-sheet>
    </v-fade-transition>
  </v-card>
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
    },
  }
</script>

<style lang="sass">
  .v-example
    code[class*="language-"],
    pre[class*="language-"]
      text-shadow: none
</style>
