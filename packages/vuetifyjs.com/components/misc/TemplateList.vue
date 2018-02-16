<template lang="pug">
  div(style="position: relative;").elevation-2.mb-3.hide-overflow
    input(
      :style="{ position: 'absolute', left: '-1000px', top: '-1000px' }"
      :value="copy"
      ref="copy"
    )
    v-snackbar(
      absolute
      v-model="copied"
      top
      left
    ) {{ $t('Components.TemplateList.init') }}
      v-btn(flat @click="copied = !copied" color="light-blue")
        |{{ $t('Components.TemplateList.close') }}
    help-me-choose(v-model="suggestion")
    v-divider
    v-expansion-panel(expand).elevation-0
      v-expansion-panel-content(
        lazy
        v-for="(template, i) in templates"
        :key="i"
      )
        v-layout(slot="header")
          v-icon(
            :color="isActive(template) ? 'primary' : ''"
            v-text="template.icon"
          ).mr-3
          div(
            v-html="template.title"
            :class="[isActive(template) ? 'primary--text' : '']"
          ).mr-3
        v-card(
          color="blue darken-3"
          tile
          flat
          dark
          style="min-height: 75px"
        )
          v-fade-transition(mode="out-in")
            v-layout(
              row
              justify-space-between
            )
              v-flex(xs10).layout.align-center
                v-card-text(v-html="template.desc")
              v-flex(xs2).layout.column.align-end.pa-3
                v-tooltip(
                  dark
                  left
                  v-if="template.link"
                )
                  v-btn(
                    icon
                    dark
                    color="secondary"
                    :href="template.link"
                    target="_blank"
                    rel="noopener"
                    slot="activator"
                  )
                    v-icon fa-codepen
                  span Codepen
                template(v-else)
                  v-tooltip(left dark)
                    v-btn(
                      icon
                      dark
                      color="secondary"
                      :href="`https://github.com/vuetifyjs/${template.init}`"
                      target="_blank"
                      rel="noopener"
                      slot="activator"
                    ).elevation-20
                      v-icon fa-github
                    span Github
                  v-tooltip(left dark)
                    v-btn(
                      icon
                      color="secondary"
                      dark
                      @click="copyMarkup(template)"
                      slot="activator"
                    )
                      v-icon content_copy
                    span Copy markup
</template>

<script>
  // Components
  import HelpMeChoose from './HelpMeChoose'

  export default {
    components: {
      HelpMeChoose
    },

    data: vm => ({
      copied: false,
      copy: null,
      copyTimeout: null,
      options: [
        {
          label: 'For Beginners',
          value: null
        }
      ],
      suggestion: null,
      templates: [
        {
          icon: 'mdi-codepen',
          title: vm.$t('Components.TemplateList.quickstart.title'),
          link: 'https://codepen.io/johnjleider/pen/jYZwVZ',
          cats: ['bwnn'],
          desc: vm.$t('Components.TemplateList.quickstart.desc')
        },
        {
          icon: 'landscape',
          title: vm.$t('Components.TemplateList.simple.title'),
          init: 'simple',
          cats: ['bwnn'],
          desc: vm.$t('Components.TemplateList.simple.desc')
        },
        {
          icon: 'web',
          title: vm.$t('Components.TemplateList.webpackSimple.title'),
          init: 'webpack-simple',
          cats: ['iwnn'],
          desc: vm.$t('Components.TemplateList.webpackSimple.desc')
        },
        {
          icon: 'layers',
          title: vm.$t('Components.TemplateList.webpack.title'),
          init: 'webpack',
          cats: ['bwnn', 'bwyn', 'iwnn', 'iwyn'],
          desc: vm.$t('Components.TemplateList.webpack.desc')
        },
        {
          icon: 'cloud_circle',
          title: vm.$t('Components.TemplateList.webpackSSR.title'),
          init: 'webpack-ssr',
          cats: ['awny'],
          desc: vm.$t('Components.TemplateList.webpackSSR.desc')
        },
        {
          icon: 'flash_on',
          title: vm.$t('Components.TemplateList.nuxt.title'),
          init: 'nuxt',
          cats: [
            'awny',
            'iwny'
          ],
          desc: vm.$t('Components.TemplateList.nuxt.desc')
        },
        {
          icon: 'featured_video',
          title: vm.$t('Components.TemplateList.pwa.title'),
          init: 'pwa',
          cats: ['iwyn', 'idyn', 'imyn', 'awyn', 'adyn', 'amyn'],
          desc: vm.$t('Components.TemplateList.pwa.desc')
        },
        {
          icon: 'power',
          title: vm.$t('Components.TemplateList.electron.title'),
          init: 'electron',
          cats: [
            'bdnn',
            'bdyn',
            'idnn',
            'idyn',
            'adnn',
            'adyn'
          ],
          desc: vm.$t('Components.TemplateList.electron.desc')
        },
        {
          icon: 'call_split',
          title: vm.$t('Components.TemplateList.aLaCarte.title'),
          init: 'a-la-carte',
          cats: [
            'idnn',
            'idyn',
            'adnn',
            'adyn'
          ],
          desc: vm.$t('Components.TemplateList.aLaCarte.desc')
        },
        {
          icon: 'phone_iphone',
          title: vm.$t('Components.TemplateList.cordova.title'),
          init: 'cordova',
          cats: [
            'bmnn',
            'bmyn',
            'bmny',
            'imnn',
            'imyn',
            'imny',
            'amnn',
            'amyn',
            'amny'
          ],
          desc: vm.$t('Components.TemplateList.cordova.desc')
        }
      ]
    }),

    watch: {
      copied (val) {
        !val && clearTimeout(this.copyTimeout)
      }
    },

    methods: {
      copyMarkup (template) {
        this.copy = `vue init vuetifyjs/${template.init}`
        clearTimeout(this.copyTimeout)
        this.copied = true
        this.copyTimeout = setTimeout(() => { this.copied = false }, 4000)

        setTimeout(() => {
          this.$refs.copy.select()
          document.execCommand('copy')
        }, 0)
      },
      isActive (template) {
        return template.cats.indexOf(this.suggestion) > -1
      }
    }
  }
</script>
