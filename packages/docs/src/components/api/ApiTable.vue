<template>
  <v-simple-table
    v-bind="$attrs"
    v-on="$listeners"
  >
    <thead>
      <tr>
        <th v-for="header in headers" :key="header">
          <div class="text-capitalize">{{ header }}</div>
        </th>
      </tr>
    </thead>
    <tbody>
      <template v-for="item in items">
        <tr :key="item.name" :class="['regular-row', hasExtraRow(item) && 'has-extra-row']">
          <td v-for="(header, i) in headers" :key="i">
            <template v-if="header === 'name'">
              <div class="font-weight-bold text-mono">{{ item[header] }}</div>
            </template>
            <template v-else-if="header === 'type' || header === 'signature'">
              <div class="text-mono" v-html="getType(item[header])" />
            </template>
            <template v-else-if="header === 'default'">
              <div class="text-mono" v-html="getDefaultValue(item)" />
            </template>
            <template v-else-if="header === 'description'">
              <app-md v-if="item[header][locale]">{{ item[header][locale] }}</app-md>
            </template>
            <template v-else>
              {{ item[header] }}
            </template>
          </td>
        </tr>
        <template v-if="hasExtraRow(item)">
          <tr :key="`${item.name}_extra`" class="extra-row">
            <td />
            <td :colspan="headers.length - 1">
              <markup :language="getLanguage(item)" :code="getCode(item)" />
            </td>
          </tr>
        </template>
      </template>
    </tbody>
  </v-simple-table>
</template>

<script>
  import { get } from 'vuex-pathify'
  import Prism from 'prismjs'
  import 'prismjs/themes/prism.css'
  import 'prismjs/components/prism-scss'
  import 'prismjs/components/prism-typescript'

  const getApi = name => {
    return import(
      /* webpackChunkName: "api-data-[request]" */
      `@/api/data/${name}.js`
    )
  }

  const HEADERS = {
    options: ['name', 'type', 'default', 'description'],
    slots: ['name', 'description'],
    props: ['name', 'type', 'default', 'description'],
    events: ['name', 'description'],
    sass: ['name', 'default', 'description'],
    functions: ['name', 'signature', 'description'],
  }

  export default {
    name: 'ApiTable',
    props: {
      name: String,
      field: String,
    },
    data: () => ({
      api: null,
    }),
    computed: {
      headers () {
        return HEADERS[this.field]
      },
      items () {
        return this.api ? this.api[this.field] : []
      },
      ...get('route', [
        'params@locale',
      ]),
    },
    async created () {
      this.api = (await getApi(this.name)).default
    },
    methods: {
      getType (value) {
        const type = Array.isArray(value) ? value.join(', ') : value
        return Prism.highlight(type, Prism.languages.typescript)
      },
      getDefaultValue (item) {
        const { default: defaultValue } = item
        const asd = defaultValue == null || typeof defaultValue === 'string' ? String(defaultValue) : JSON.stringify(defaultValue, null, 2)
        return Prism.highlight(asd, this.field === 'sass' ? Prism.languages.scss : Prism.languages.typescript)
      },
      getLanguage (item) {
        if (item.snippet) return 'html'
        else return 'typescript'
      },
      getCode (item) {
        if (item.snippet || item.value) return this.genHtml(item.snippet || item.value)
        return this.genTypescript(item.example || item.props)
      },
      genTypescript (obj) {
        const str = JSON.stringify(obj, null, 2)
        return str.replace(/: "(.*)"/g, ': $1').replace(/"(.*)":/g, '$1:')
      },
      genHtml (obj) {
        if (typeof obj === 'string') return obj.trim()
        else return this.genTypescript(obj)
      },
      hasExtraRow (item) {
        return item.example || item.snippet || item.props || item.value
      },
    },
  }
</script>

<style scoped>
  .regular-row td {
    padding: 8px 16px !important;
  }

  .regular-row.has-extra-row td {
    border-bottom: none !important;
  }

  .extra-row:hover {
    background: initial !important;
  }

  .extra-row td {
    padding: 8px 0 !important;
  }

  .v-markdown ::v-deep p {
    margin-bottom: 0;
  }
</style>
