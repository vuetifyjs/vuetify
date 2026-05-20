<template>
  <ExamplesUsageExample
    v-model="model"
    :code="code"
    :name="name"
    :options="options"
    :script="script"
  >
    <div class="text-center">
      <v-command-palette
        v-model:search="search"
        v-bind="props"
        :items="items"
        @click:item="onItemClick"
      >
        <template v-slot:activator="{ props: activatorProps }">
          <v-btn v-bind="activatorProps">Open Command Palette</v-btn>
        </template>
      </v-command-palette>
    </div>

    <template v-slot:configuration>
      <v-text-field
        v-model="placeholder"
        label="Placeholder"
        hide-details
      ></v-text-field>

      <v-text-field
        v-model="hotkey"
        hint="Try 'ctrl+shift+p' or 'meta+j'"
        label="Global Hotkey"
        persistent-hint
      ></v-text-field>

      <v-slider
        v-model="offsetTop"
        :max="40"
        :min="0"
        :step="1"
        label="Offset Top"
        hide-details
        thumb-label
      >
        <template v-slot:thumb-label>{{ offsetTop }}vh</template>
      </v-slider>
    </template>
  </ExamplesUsageExample>
</template>

<script setup>
  const name = 'v-command-palette'
  const model = ref('default')
  const search = ref('')
  const placeholder = ref('Search commands...')
  const hotkey = ref('ctrl+shift+k')
  const offsetTop = ref(15)
  const options = []

  const items = [
    {
      title: 'Find File',
      subtitle: 'Open general search',
      prependIcon: 'mdi-file-find',
      value: 'find-file',
    },
    {
      title: 'Open Project',
      subtitle: 'Open an existing project',
      prependIcon: 'mdi-folder-open',
      value: 'open-project',
    },
    { type: 'divider' },
    { type: 'subheader', title: 'Settings' },
    {
      title: 'Help',
      subtitle: 'View documentation',
      prependIcon: 'mdi-help-circle-outline',
      value: 'help',
    },
  ]

  const props = computed(() => ({
    placeholder: placeholder.value,
    hotkey: hotkey.value || undefined,
    'offset-top': offsetTop.value !== 15 ? `${offsetTop.value}vh` : undefined,
  }))

  const code = computed(() => {
    return `<v-command-palette
  v-model:search="search"
  :items="items"${propsToString(props.value)}  @click:item="onItemClick"
>
  <template v-slot:activator="{ props: activatorProps }">
    <v-btn v-bind="activatorProps">Open Command Palette</v-btn>
  </template>
</v-command-palette>`
  })

  function onItemClick (item) {
    console.log('selected item:', item)
  }

  const script = computed(() => {
    return `<script setup>
  import { shallowRef } from 'vue'

  const search = shallowRef('')
  const items = ${JSON.stringify(items, null, 2)}

  function onItemClick (item) {
    console.log('selected item:', item)
  }
<` + '/script>'
  })
</script>
