// Utilities
import { computed, h, onMounted, ref } from 'vue'

// Types
import type { Ref } from 'vue'

let _version: Promise<string>

export function useCodepen ({ code, sections, component }: {
  code: Readonly<Ref<string | undefined>>
  sections: Readonly<Ref<{ name: string, content: string, language: string }[]>>
  component: Readonly<Ref<any>>
}) {
  const version = ref()
  onMounted(async () => {
    if (!_version) {
      _version = fetch('https://unpkg.com/@vuetify/nightly/', { method: 'HEAD' })
        .then(r => new URL(r.url).pathname.split(/[/@]/).filter(Boolean).at(-1)!)
    }

    await _version.then(v => version.value = `@vuetify/nightly@${v}`)
  })

  const cssResources = computed(() => [
    'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900',
    'https://unpkg.com/@mdi/font@6.x/css/materialdesignicons.min.css',
    'https://fonts.googleapis.com/css?family=Material+Icons',
    `https://unpkg.com/${version.value}/dist/vuetify.css`,
  ])

  const jsResources = computed(() => [
    'https://unpkg.com/vue@3/dist/vue.global.js',
    `https://unpkg.com/${version.value}/dist/vuetify.js`,
  ])

  const template = computed(() => {
    const template = (sections.value.find(section => section.name === 'template')?.content || '')
      .replace(/(<template>|<\/template>$)/g, '')
      .replace(/\n/g, '\n  ')
      .trim()

    return `<script type="text/x-template" id="app-template">
  <v-app>
    ${template}
  </v-app>
</script>

<div id="app"></div>`
  })

  const additionalScript = computed(() => {
    const additional: string = (component.value.codepenAdditional || '')

    return additional
      .replace(/\n {2}/g, '\n')
      .trim() + (additional ? '\n\n' : '')
  })

  const script = computed(() => {
    const script = sections.value.find(section => section.name === 'script')?.content || ''

    const imports = /(import*) ([^'\n]*) from ([^\n]*)/g
    const body = (/export default {([\s\S]*)}/g.exec(script)?.[1] || '')
      .replace(/\n {2}/g, '\n')
      .trim()

    let prepend = (/<script>([\s\S]*)export default {/g.exec(script)?.[1] || '')
      .replace(imports, '')
      .replace(/\n {2}/g, '\n')
      .trim()

    prepend += prepend ? '\n\n' : ''

    return additionalScript.value + prepend +
      `const { createApp } = Vue
const { createVuetify } = Vuetify

const vuetify = createVuetify()

const app = createApp({
  template: '#app-template',${body ? '\n  ' + body : ''}
}).use(vuetify).mount('#app')`
  })

  const style = computed(() => {
    const style = sections.value.find(section => section.name === 'style')?.content || ''

    return {
      content: (style || '').replace(/(<style.*?>|<\/style>)/g, '').replace(/\n {2}/g, '\n').trim(),
      language: /<style.*lang=["'](.*)["'].*>/.exec(style || ''),
    }
  })

  const resources = computed(() => {
    const resources = component.value.codepenResources || '{}'

    return Object.assign(
      { css: [], js: [] },
      JSON.parse(resources),
    )
  })

  const editors = computed(() => {
    const html = template.value && 0b100
    const css = style.value.content && 0b010
    const js = script.value && 0b001

    return (+html | +css | +js).toString(2)
  })

  const data = computed(() => JSON.stringify({
    title: 'Vuetify Example Pen',
    html: template.value,
    css: style.value.content,
    css_pre_processor: style.value.language ? style.value.language[1] : 'none',
    css_external: [...resources.value.css, ...cssResources.value].join(';'),
    js: script.value,
    js_pre_processor: 'babel',
    js_external: [...resources.value.js, ...jsResources.value].join(';'),
    editors: editors.value,
  }))

  const form = ref()
  return {
    Codepen: () => (
      h('form', {
        ref: form,
        action: 'https://codepen.io/pen/define/',
        method: 'POST',
        target: '_blank',
        style: 'display: none',
      }, [
        h('input', {
          type: 'hidden',
          name: 'data',
          value: data.value,
        }),
      ])
    ),
    openCodepen () {
      form.value.submit()
    },
  }
}
