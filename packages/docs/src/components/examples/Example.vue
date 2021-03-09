<template>
  <v-sheet
    class="mb-9 v-example"
    outlined
    rounded
  >
    <v-lazy @input="importTemplate">
      <codepen-embed
        v-if="pen"
        :file="file.replace('/', '-')"
        :pen="pen"
      />
    </v-lazy>
  </v-sheet>
</template>

<script>
  import CodepenEmbed from './CodepenEmbed'
  // Mixins
  import Codepen from '@/mixins/codepen'

  // Utilities
  import { get } from 'vuex-pathify'

  export default {
    name: 'Example',

    components: {
      CodepenEmbed,
    },

    mixins: [Codepen],

    props: { file: String },

    data: () => ({
      dark: false,
      expand: false,
      hasError: false,
      selected: 'template',
    }),

    computed: {
      branch: get('app/branch'),
      sections () {
        return [
          'template',
          'script',
          'style',
        ].filter(section => this.pen[section])
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
