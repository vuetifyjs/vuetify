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
        >
          <v-list
            class="grey lighten-3 pa-0"
            two-line
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
        default: () => ([])
      }
    },

    computed: {
      links () {
        return this.value.map(this.genLink)
      }
    },

    methods: {
      genColor (section) {
        switch (section) {
          case 'getting-started': return 'teal'
          case 'framework': return 'brown'
          case 'components': return 'primary'
          case 'directives': return 'blue-grey'
          case 'themes': return 'tertiary'
          default: return 'grey'
        }
      },
      genIcon (section) {
        switch (section) {
          case 'getting-started': return 'mdi-speedometer'
          case 'framework': return 'mdi-buffer'
          case 'components': return 'mdi-view-dashboard'
          case 'directives': return 'mdi-function'
          case 'themes': return 'mdi-palette'
        }
      },
      genLink (link) {
        const [section, target] = link.split('/')

        return {
          ...this.genSectionInfo(section),
          link,
          section,
          target
        }
      },
      genSectionInfo (section) {
        return {
          color: this.genColor(section),
          icon: this.genIcon(section)
        }
      }
    }
  }
</script>
