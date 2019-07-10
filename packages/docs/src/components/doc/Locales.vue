<template>
  <div class="ml-3 mb-4">
    <ul>
      <li
        v-for="({ localeCode, localeName, localeNativeName }) in localeNames"
        :key="localeCode"
      >
        <strong>{{ localeCode }}</strong>
        - {{ localeName }} {{ localeNativeName ? ` (${localeNativeName})` : '' }}
      </li>
    </ul>
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
