<template>
  <div>
    <doc-heading>Generic.Pages.upNext</doc-heading>
    <v-container
      fluid
      grid-list-xl
      pa-0
    >
      <v-layout wrap>
        <v-flex
          v-for="(link, i) in links"
          :key="i"
          xs12
          md4
        >
          <v-card color="grey lighten-3" outlined>
            <v-list
              class="pa-0"
              two-line
              nav
            >
              <core-item
                :to="link.link"
                :avatar="link.icon"
                :avatar-color="link.color"
                :text="link.target"
                :subtext="link.section"
                no-markdown
                @click.native="$ga.event('up-next', 'click', link.target, $route.path)"
              >
                <v-list-item-action>
                  <v-icon>mdi-arrow-right</v-icon>
                </v-list-item-action>
              </core-item>
            </v-list>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  export default {
    props: {
      value: {
        type: Array,
        default: () => ([]),
      },
    },

    computed: {
      links () {
        return this.value.map(this.genLink)
      },
    },

    methods: {
      genColor (section) {
        switch (section) {
          case 'getting-started': return 'teal'
          case 'customization': return 'tertiary'
          case 'components': return 'primary'
          case 'directives': return 'blue-grey'
          case 'styles': return 'deep-purple accent-4'
          case 'themes': return 'warning'
          default: return 'grey'
        }
      },
      genIcon (section) {
        switch (section) {
          case 'getting-started': return 'mdi-speedometer'
          case 'customization': return 'mdi-cogs'
          case 'components': return 'mdi-view-dashboard'
          case 'directives': return 'mdi-function'
          case 'styles': return 'mdi-palette'
          case 'themes': return 'mdi-vuetify'
        }
      },
      genLink (link) {
        const [section, target] = link.split('/')

        return {
          ...this.genSectionInfo(section),
          link,
          section,
          target,
        }
      },
      genSectionInfo (section) {
        return {
          color: this.genColor(section),
          icon: this.genIcon(section),
        }
      },
    },
  }
</script>
