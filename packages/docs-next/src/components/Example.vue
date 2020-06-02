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
      v-if="file"
      appear
    >
      <v-sheet class="pa-2">
        <vue-file
          class="mb-0"
          :file="file"
          @loaded="setContents"
        />
      </v-sheet>
    </v-fade-transition>
  </v-card>
</template>

<script>
  // Utilities
  import { getBranch } from '@/util/helpers'

  export default {
    name: 'Example',

    data: () => ({
      branch: 'master',
      dark: false,
      expand: false,
      file: undefined,
      selected: 'template',
      component: undefined,
      pen: undefined,
    }),

    computed: {
      sections () {
        return ['template', 'script', 'style'].filter(section => this.pen[section])
      },
    },

    mounted () {
      this.branch = getBranch()
      this.file = this.$attrs.file
    },

    methods: {
      sendToCodepen () {
        this.$refs.codepen.submit()
      },
      setContents (contents) {
        this.pen = contents.pen
        this.component = contents.component
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
