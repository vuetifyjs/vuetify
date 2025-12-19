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
        v-model="dialog"
        v-model:search="search"
        v-bind="props"
        :items="items"
        max-width="500"
        @click:item="onItemClick"
      >
        <template v-slot:activator="{ props: activatorProps }">
          <v-btn v-bind="activatorProps">
            Open Command Palette
          </v-btn>
        </template>
      </v-command-palette>

      <v-snackbar v-model="snackbar" :timeout="2000">
        Selected: {{ selectedItem }}
      </v-snackbar>
    </div>

    <template v-slot:configuration>
      <v-text-field
        v-model="placeholder"
        hint="Custom placeholder text for search input"
        label="Placeholder"
        persistent-hint
      ></v-text-field>

      <v-text-field
        v-model="hotkey"
        hint="Try 'ctrl+shift+p' or 'meta+j'"
        label="Global Hotkey"
        persistent-hint
      ></v-text-field>
    </template>
  </ExamplesUsageExample>
</template>

<script setup>
  const name = 'v-command-palette'
  const model = ref('default')
  const dialog = ref(false)
  const search = ref('')
  const snackbar = ref(false)
  const selectedItem = ref('')
  const placeholder = ref('Search commands...')
  const hotkey = ref('ctrl+shift+k')
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
    {
      type: 'divider',
    },
    {
      type: 'subheader',
      title: 'Settings',
    },
    {
      title: 'Help',
      subtitle: 'View documentation',
      prependIcon: 'mdi-help-circle-outline',
      value: 'help',
    },
  ]

  const props = computed(() => {
    return {
      placeholder: placeholder.value,
      hotkey: hotkey.value || undefined,
    }
  })

  const code = computed(() => {
    return `<v-command-palette
  v-model="dialog"
  v-model:search="search"${propsToString(props.value)}
  :items="items"
  max-width="500"
  @click:item="onItemClick"
>
  <template v-slot:activator="{ props: activatorProps }">
    <v-btn v-bind="activatorProps">
      Open Command Palette
    </v-btn>
  </template>
</v-command-palette>`
  })

  function onItemClick (item, event) {
    selectedItem.value = item.title
    snackbar.value = true
  }

  const script = computed(() => {
    return `<script setup>
  import { shallowRef } from 'vue'

  const search = shallowRef('')
  const items = ${JSON.stringify(items, null, 2)}

  function onItemClick (item, event) {
    console.log('selected item:', item)
  }
<` + '/script>'
  })
</script>
