<template>
  <div>
    <doc-heading>Generic.Pages.upNext</doc-heading>
    <v-container
      fluid
      grid-list-xl
      pa-0
    >
      <v-layout>
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
              :text="link.section"
              :subtext="link.target"
            >
              <v-list-tile-action>
                <v-icon>mdi-arrow-right</v-icon>
              </v-list-tile-action>
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
          case 'components': return 'primary'
          default: return 'grey'
        }
      },
      genIcon (section) {
        switch (section) {
          case 'components': return 'mdi-view-dashboard'
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
