<template>
  <app-sheet>
    <table
      class="api-table"
    >
      <thead>
        <tr>
          <th
            v-for="header in headers"
            :key="header"
            :class="header"
          >
            <div
              class="text-capitalize"
              v-text="header"
            />
          </th>
        </tr>
      </thead>

      <tbody>
        <template v-for="item in items" :key="item.name">
          <tr
            :class="['regular-row', hasExtraRow(item) && 'has-extra-row']"
          >
            <td
              v-for="(header, i) in headers"
              :key="i"
            >
              <template v-if="header === 'name'">
                <span
                  :id="`${field}-${item[header].replace('$', '')}`"
                  class="name-item text-mono ml-n2"
                >
                  <span class="primary--text">#</span>
                  <app-link
                    :href="`#${field}-${item[header].replace('$', '')}`"
                    class="font-weight-bold"
                  >
                    {{ item[header] }}
                  </app-link>
                </span>
              </template>

              <template v-else-if="header === 'type' || header === 'signature'">
                <div
                  class="text-mono text-pre"
                  v-html="getType(item[header])"
                />
              </template>

              <template v-else-if="header === 'default'">
                <div
                  class="text-mono text-pre"
                  v-html="getDefaultValue(item)"
                />
              </template>

              <template v-else-if="header === 'description'">
                <app-markdown v-if="item[header][locale]" :content="item[header][locale]" />
              </template>

              <template v-else>
                {{ item[header] }}
              </template>
            </td>
          </tr>

          <template v-if="hasExtraRow(item)">
            <tr
              :key="`${item.name}_extra`"
              class="extra-row "
            >
              <td />

              <td :colspan="headers.length - 1">
                <app-markup
                  :code="getCode(item)"
                  :language="getLanguage(item)"
                  class="mr-2 ml-4"
                />
              </td>
            </tr>
          </template>
        </template>
      </tbody>
    </table>
  </app-sheet>
</template>

<script lang="ts">
  // Imports
  import Prism from 'prismjs'
  import 'prismjs/themes/prism.css'
  import 'prismjs/components/prism-scss'
  import 'prismjs/components/prism-typescript'

  // Utilities
  import { computed, defineComponent } from 'vue'
  import { useLocaleStore } from '../../store-v3/locale'
  // import { searchItems } from 'vuetify/lib/util/helpers'

  const HEADERS: Record<string, string[]> = {
    options: ['name', 'type', 'default', 'description'],
    slots: ['name', 'description'],
    props: ['name', 'type', 'default', 'description'],
    events: ['name', 'description'],
    sass: ['name', 'default', 'description'],
    functions: ['name', 'signature', 'description'],
    modifiers: ['name', 'type', 'description'],
    argument: ['type', 'description'],
  }

  type Item = {
    default: any
    snippet: string
    value: any
    example: string
    props: unknown
  }

  export default defineComponent({
    name: 'ApiTable',

    props: {
      name: String,
      field: {
        type: String,
        required: true,
      },
      filter: String,
      apiData: Array,
    },

    setup (props) {
      const store = useLocaleStore()

      function getType (value: string | string[]) {
        const type = Array.isArray(value) ? value.join(' | ') : value

        return Prism.highlight(String(type), Prism.languages.typescript)
      }

      function getDefaultValue (item: Item) {
        const { default: defaultValue } = item
        const str = defaultValue == null || typeof defaultValue === 'string'
          ? String(defaultValue)
          : JSON.stringify(defaultValue, null, 2)

        if (str.startsWith('gh:')) return `<a target="_blank" href="https://github.com/vuetifyjs/vuetify/search?q=${str.slice(3)}">${str.slice(3)}</a>`

        return Prism.highlight(str, props.field === 'sass' ? Prism.languages.scss : Prism.languages.typescript)
      }

      function getLanguage (item: Item) {
        if (item.snippet) return 'html'
        else return 'typescript'
      }

      function getCode (item: Item) {
        if (item.snippet || item.value) return genHtml(item.snippet || item.value)

        return genTypescript(item.example || item.props)
      }

      function genTypescript (obj: unknown) {
        if (typeof obj === 'string') return obj

        const str = JSON.stringify(obj, null, 2)
        return str.replace(/: "(.*)"/g, ': $1').replace(/"(.*)":/g, '$1:')
      }

      function genHtml (obj: unknown) {
        if (typeof obj === 'string') return obj.trim()
        else return genTypescript(obj)
      }

      function hasExtraRow (item: Item) {
        return item.example || item.snippet || item.props || item.value
      }

      return {
        locale: computed(() => store.locale),
        headers: computed(() => HEADERS[props.field]),
        items: computed(() => props.apiData),
        getType,
        getDefaultValue,
        getLanguage,
        getCode,
        genTypescript,
        genHtml,
        hasExtraRow,
      }
    },
  })
</script>

<style lang="sass" scoped>
  .api-table
    th
      &.name
        width: 20%
      &.type
        width: 15%
      &.signature
        width: 25%

    .regular-row td
      padding: 8px 16px !important

    .regular-row.has-extra-row td
      border-bottom: none !important

    .extra-row:hover
      background: initial !important

    .extra-row td
      padding: 8px 0 !important

    .v-markdown :deep(p)
      margin-bottom: 0

  .name-item
    white-space: nowrap

    &:not(:hover):not(:focus)
      span
        opacity: 0
</style>
