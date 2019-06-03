<template>
  <div class="ml-3">
    <p>
      <span
        v-for="({localeCode, localeName, localeNativeName}, index) in localeNames"
        :key="localeCode"
      >
        {{ index ? ', ' : '' }} <strong>{{ localeCode }}</strong>
        - {{ localeName }} {{ localeNativeName ? ` (${localeNativeName})` : '' }}
      </span>
    </p>
  </div>
</template>

<script>
  import * as locales from 'vuetify/es5/locale'
  import ISO6391 from 'iso-639-1/build/index'

  export default {
    name: 'Locales',

    computed: {
      localeNames () {
        const array = Object.keys(locales).map(localeCode => ({
          localeCode,
          localeName: ISO6391.getName(localeCode.substr(0, 2)),
          localeNativeName: localeCode === 'en' ? '' : ISO6391.getNativeName(localeCode.substr(0, 2)),
        }))
        array.sort((a, b) => (a.localeCode < b.localeCode ? -1 : (a.localeCode > b.localeCode ? 1 : 0)))
        return array
      },
    },
  }
</script>
