<template lang="pug">
  div.elevation-2.mb-3
    v-layout(wrap)
      input(
        :style="{ position: 'absolute', left: '-1000px', top: '-1000px' }"
        :value="copy"
        ref="copy"
      )
      v-flex(
        xs12
        sm4
        md3
        v-for="(template, i) in templates"
        :key="i"
      )
        div(style="display: none" v-html="template.desc")
        v-list(two-line).pa-0
          v-list-tile(
            href="javascript:;"
            @click="selectedIndex = i"
            :value="selectedIndex === i"
          )
            v-list-tile-action
              v-icon(
                :text-color="selectedIndex === i ? 'primary' : ''"
              ) {{ template.icon }}
            v-list-tile-content
              v-list-tile-title(v-text="template.title")
              v-list-tile-sub-title vue init vuetifyjs/{{ template.init }}
    v-expansion-panel.elevation-0
      v-expansion-panel-content(value)
        v-card(
          color="blue darken-3"
          tile
          flat
          dark
          style="min-height: 75px"
        ).hide-overflow
          v-fade-transition(mode="out-in")
            v-layout(
              row
              justify-space-between
              :key="selectedIndex"
            )
              v-flex(xs10).layout.align-center
                v-card-text(v-html="selectedTemplate.desc")
                v-snackbar(
                  absolute
                  v-model="copied"
                  top
                  left
                ) Init copied!
                  v-btn(flat @click="copied = !copied" color="light-blue") close
              v-flex(xs2).layout.column.align-end.pa-3
                v-tooltip(left debounce="300" dark)
                  v-btn(
                    icon
                    dark
                    color="secondary"
                    :href="`https://github.com/vuetifyjs/${selectedTemplate.init}`"
                    target="_blank"
                    rel="noopener"
                    slot="activator"
                  )
                    v-icon fa-github
                  span Github
                v-tooltip(left debounce="300" dark)
                  v-btn(
                    icon
                    color="secondary"
                    dark
                    @click="copyMarkup"
                    slot="activator"
                  )
                    v-icon content_copy
                  span Copy markup
</template>

<script>
  export default {
    data: () => ({
      copied: false,
      copyTimeout: null,
      templates: [
        {
            icon: 'landscape',
            title: 'Simple HTML',
            init: 'simple',
            desc: 'This template is intended for users who want to try out Vue.js and Vuetify.js in the most simplistic way. It contains a basic index.html with no additional functionality. This is useful for developers who want to easily preview the features of the framework.'
        },
        {
          icon: 'web',
          title: 'Webpack Simple',
          init: 'webpack-simple',
          desc: 'This template is intended for users who are already familiar with Vue/Webpack. It contains a very simple webpack setup and is targetted at developers creating prototype or basic applications.'
        },
        {
          icon: 'layers',
          title: 'Webpack',
          init: 'webpack',
          desc: 'This template is intended for users who are looking for out of the box linting and unit testing.'
        },
        {
          icon: 'cloud_circle',
          title: 'Webpack SSR',
          init: 'webpack-ssr',
          desc: 'This template is for advanced users looking to utilize the new Vue SSR (server-side rendering). Based off of the structure in the Vue.js 2 <a class="white--text" href="https://github.com/vuejs/vue-hackernews-2.0" target="_blank" rel="noopener">Hackernews</a> repository. The Vuetify.js SSR template provides next generation functionality for advanced Vue applications.'
        },
        {
          icon: 'flash_on',
          title: 'NUXT',
          init: 'nuxt',
          desc: 'Utilizing the power of NUXT, supercharge your development experience with a bootstraped version ready to go with Vuetify out of the box.'
        },
        {
          icon: 'featured_video',
          title: 'PWA',
          init: 'pwa',
          desc: 'A pre-configured PWA (Progressive Web Application) template is at your disposal. Bootstraped with service workers, application manifest, and a 90+/100 Lighthouse score.'
        },
        {
          icon: 'power',
          title: 'Electron',
          init: 'electron',
          desc: "Vuetify's official Electron template for creating desktop applications."
        },
        {
          icon: 'call_split',
          title: 'A La Carte',
          init: 'a-la-carte',
          desc: 'In this template you can see an example of how to select only the components you want to use. This is useful for reducing package size with unused components.'
        }
      ],
      selectedIndex: 0
    }),

    computed: {
      copy () {
        return `vue init vuetifyjs/${this.selectedTemplate.init}`
      },
      selectedText () {
        return this.selectedTemplate.desc
      },
      selectedTemplate () {
        return this.templates[this.selectedIndex]
      }
    },

    watch: {
      copied (val) {
        !val && clearTimeout(this.copyTimeout)
      }
    },

    methods: {
      copyMarkup () {
        clearTimeout(this.copyTimeout)
        this.$refs.copy.select()
        document.execCommand('copy')
        this.copied = true
        this.copyTimeout = setTimeout(() => { this.copied = false }, 2000)
      }
    }
  }
</script>
