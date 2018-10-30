<template lang="pug">
  views-doc
    section#api
      helpers-section-head(value="Generic.Pages.api")
      v-card(class="mb-5")
        div(class="py-1")
          helpers-parameters(
            :headers="headers"
            :items="items"
            namespace="Guides"
            type="Internationalization"
            target="api"
          )

    section#getting-started
      helpers-section-head(value="Framework.Internationalization.gettingStarted")
      helpers-section-text(value="Framework.Internationalization.gettingStartedText")
      helpers-section-text(value="Framework.Internationalization.availableLocalesText")
      div.text-xs-justify.ml-3
        p
          span(v-for="({localeCode, localeName, localeNativeName}, index) in localeNames")
            | {{ index ? ', ' : '' }}
            strong {{ localeCode }}
            |  - {{ localeName }} {{ localeNativeName ? ` (${localeNativeName})` : '' }}
      helpers-markup(lang="js")
        | import Vuetify from 'vuetify'
        |
        | // Translation provided by Vuetify (javascript)
        | import zhHans from 'vuetify/es5/locale/zh-Hans'
        |
        | // Translation provided by Vuetify (typescript)
        | import pl from 'vuetify/src/locale/pl'
        |
        | // Your own translation file
        | import sv from './i18n/vuetify/sv'
        |
        | Vue.use(Vuetify, {
        |   lang: {
        |     locales: { zhHans, pl, sv },
        |     current: 'zhHans'
        |   }
        | })
        |
        | ...
        |
        | Vue.component('my-component', {
        |   methods: {
        |     changeLocale () {
        |       this.$vuetify.lang.current = 'sv'
        |     }
        |   }
        |})

    section#create-translation
      helpers-section-head(value="Framework.Internationalization.createTranslation")
      helpers-section-text(value="Framework.Internationalization.createTranslationText")

      helpers-markup(lang="js")
        | export default {{ locales.en }}

    section#custom-components
      helpers-section-head(value="Framework.Internationalization.customComponents")
      helpers-section-text(value="Framework.Internationalization.customComponentsText")

      helpers-markup(lang="vue")
        | &lt;template&gt;
        |   &lt;div class="my-component"&gt;
        |     {{ '{{ $vuetify.t(\'my-component.text\') \}\}' }}
        |   &lt;/div&gt;
        | &lt;/template&gt;

    section#vue-i18n
      helpers-section-head(value="Framework.Internationalization.vueI18nHeader")
      helpers-section-text(value="Framework.Internationalization.vueI18nText1")
      helpers-section-text(value="Framework.Internationalization.vueI18nText2")

      helpers-markup(lang="js")
        | import VueI18n from 'vue-i18n'

        | Vue.use(VueI18n)

        | const messages = {
        |   en: {
        |     $vuetify: {
        |       dataIterator: {
        |         rowsPerPageText: 'Items per page:',
        |         pageText: '{0}-{1} of {2}'
        |       }
        |     },
        |   },
        |   sv: {
        |     $vuetify: {
        |       dataIterator: {
        |         rowsPerPageText: 'Element per sida:',
        |         pageText: '{0}-{1} av {2}'
        |       }
        |     },
        |   }
        | }

        | // Create VueI18n instance with options
        | const i18n = new VueI18n({
        |   locale: 'sv', // set locale
        |   messages, // set locale messages
        | })

        | Vue.use(Vuetify, {
        |   lang: {
        |     t: (key, ...params) => i18n.t(key, params)
        |   }
        | })

    section#rtl
      helpers-section-head(value="Framework.Internationalization.rtlHeader")
      helpers-section-text(value="Framework.Internationalization.rtlText1")

      helpers-markup(lang="js")
        | import Vue from 'vue'
        | import Vuetify from 'vuetify'
        |
        | Vue.use(Vuetify, {
        |   rtl: true
        | })

      helpers-section-text(value="Framework.Internationalization.rtlText2")
</template>

<script>
  import * as locales from 'vuetify/es5/locale'
  import ISO6391 from 'iso-639-1'

  export default {
    data: vm => ({
      locales,
      headers: [
        { value: 'name', size: 1 },
        { value: 'default', size: 7 },
        { value: 'type', size: 4 }
      ],
      items: [
        {
          name: 'locales',
          default: '{ en: VuetifyLocale }',
          type: 'Record<string, VuetifyLocale>'
        },
        {
          name: 'current',
          default: 'en',
          type: 'string'
        },
        {
          name: 't',
          default: '(key: string, ...params: Array<string | number>): string',
          type: 'Function'
        }
      ]
    }),
    computed: {
      localeNames () {
        const array = Object.keys(locales).map(localeCode => ({
          localeCode,
          localeName: ISO6391.getName(localeCode.substr(0, 2)),
          localeNativeName: localeCode === 'en' ? '' : ISO6391.getNativeName(localeCode.substr(0, 2))
        }))
        array.sort((a, b) => (a.localeCode < b.localeCode ? -1 : (a.localeCode > b.localeCode ? 1 : 0)))
        return array
      }
    }
  }
</script>
