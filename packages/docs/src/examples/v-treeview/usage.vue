<template>
  <ExamplesUsageExample
    v-model="model"
    :code="code"
    :name="name"
    :options="options"
    :script="script"
  >
    <v-treeview
      v-bind="props"
      v-model:selected="selected"
      :items="items"
      item-value="id"
    >
      <template v-if="showIcons" v-slot:prepend="{ item, isOpen }">
        <v-icon :icon="item.children ? (isOpen ? 'mdi-folder-open' : 'mdi-folder') : item.prependIcon"></v-icon>
      </template>
    </v-treeview>

    <template v-slot:configuration>
      <v-select
        v-if="selectable"
        v-model="strategy"
        :items="strategies"
        label="Select strategy"
      >
        <template v-slot:append>
          <v-tooltip location="top" max-width="220" interactive>
            <template v-slot:activator="{ props: tooltip }">
              <v-icon
                v-bind="tooltip"
                color="medium-emphasis"
                icon="mdi-information-outline"
              ></v-icon>
            </template>

            <span>
              Selection strategy variants are described in detail
              <a class="text-primary font-weight-medium" href="#selection-type">below</a>.
            </span>
          </v-tooltip>
        </template>
      </v-select>

      <v-select
        v-model="density"
        :items="densities"
        class="mt-3"
        label="Density"
      ></v-select>

      <v-select
        v-model="lines"
        :items="lineOptions"
        class="mt-3"
        label="Indent lines"
      ></v-select>

      <v-checkbox
        v-model="hideActions"
        label="Hide actions"
      ></v-checkbox>

      <v-checkbox
        v-model="fluid"
        label="Fluid indent"
      ></v-checkbox>

      <v-checkbox
        v-model="showIcons"
        label="Show icons"
      ></v-checkbox>
    </template>
  </ExamplesUsageExample>
</template>

<script setup>
  const name = 'v-treeview'
  const model = ref('default')
  const options = ['selectable']

  const densities = ['default', 'comfortable', 'compact']
  const density = ref('default')

  const lineOptions = [
    { title: 'None', value: 'none' },
    { title: 'Default', value: 'default' },
    { title: 'Simple', value: 'simple' },
  ]
  const lines = ref('default')

  const hideActions = ref(false)
  const fluid = ref(false)
  const showIcons = ref(true)

  const strategies = ['leaf', 'single-leaf', 'independent', 'single-independent', 'classic', 'trunk', 'branch']
  const strategy = ref('classic')

  const selectable = computed(() => model.value === 'selectable')
  const selected = ref([])

  watch(model, () => (selected.value = []))

  const items = [
    {
      id: 1,
      title: 'src',
      prependIcon: 'mdi-folder',
      children: [
        { id: 2, title: 'index.ts', prependIcon: 'mdi-language-typescript' },
        { id: 3, title: 'main.ts', prependIcon: 'mdi-language-typescript' },
      ],
    },
    {
      id: 4,
      title: 'public',
      prependIcon: 'mdi-folder',
      children: [
        { id: 5, title: 'index.html', prependIcon: 'mdi-language-html5' },
        { id: 6, title: 'favicon.png', prependIcon: 'mdi-file-image' },
      ],
    },
    { id: 7, title: 'package.json', prependIcon: 'mdi-code-json' },
    { id: 8, title: 'README.md', prependIcon: 'mdi-language-markdown' },
  ]

  const props = computed(() => ({
    density: density.value === 'default' ? undefined : density.value,
    fluid: fluid.value || undefined,
    'hide-actions': hideActions.value || undefined,
    'indent-lines': lines.value === 'none' ? undefined : lines.value === 'default' ? true : lines.value,
    selectable: selectable.value || undefined,
    'select-strategy': selectable.value ? strategy.value : undefined,
  }))

  const slot = computed(() => showIcons.value
    ? '\n  <template v-slot:prepend="{ item, isOpen }">\n    <v-icon :icon="item.children ? (isOpen ? \'mdi-folder-open\' : \'mdi-folder\') : item.prependIcon"></v-icon>\n  </template>\n'
    : '')

  const code = computed(() => {
    const p = {
      items: 'items',
      'item-value': 'id',
      ...props.value,
    }
    return `<${name}${propsToString(p, ['items'])}>${slot.value}</${name}>`
  })

  const script = computed(() => {
    return `<script setup>
  const items = [
    {
      id: 1,
      title: 'src',
      prependIcon: 'mdi-folder',
      children: [
        { id: 2, title: 'index.ts', prependIcon: 'mdi-language-typescript' },
        { id: 3, title: 'main.ts', prependIcon: 'mdi-language-typescript' },
      ],
    },
    {
      id: 4,
      title: 'public',
      prependIcon: 'mdi-folder',
      children: [
        { id: 5, title: 'index.html', prependIcon: 'mdi-language-html5' },
        { id: 6, title: 'favicon.png', prependIcon: 'mdi-file-image' },
      ],
    },
    { id: 7, title: 'package.json', prependIcon: 'mdi-code-json' },
    { id: 8, title: 'README.md', prependIcon: 'mdi-language-markdown' },
  ]
<` + '/script>'
  })
</script>
