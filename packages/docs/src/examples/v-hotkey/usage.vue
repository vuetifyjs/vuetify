<template>
  <ExamplesUsageExample
    v-model="model"
    :code="code"
    :name="name"
    :options="options"
  >
    <div class="text-center">
      <v-hotkey v-bind="props">
        {{ keys }}
      </v-hotkey>
    </div>

    <template v-slot:configuration>
      <v-select
        v-model="keyExample"
        :items="keyExamples"
        label="Key combination"
        item-title="label"
        item-value="value"
      />
    </template>
  </ExamplesUsageExample>
</template>

<script setup>
  const displayModes = ['icon', 'symbol', 'text']
  const name = 'v-hotkey'
  const model = ref('default')
  const options = [...displayModes]
  const keyExample = ref('ctrl+k')

  const keyExamples = [
    { label: 'Basic shortcut (Ctrl+K)', value: 'ctrl+k' },
    { label: 'Multiple keys (Ctrl+Shift+P)', value: 'ctrl+shift+p' },
    { label: 'Meta key (Meta+S)', value: 'meta+s' },
    { label: 'Sequential (Ctrl+K-P)', value: 'ctrl+k-p' },
    { label: 'Arrow key (Alt+Up)', value: 'alt+up' },
    { label: 'Function key (F1)', value: 'f1' },
    { label: 'Special key (Enter)', value: 'enter' },
    { label: 'Multiple options (Ctrl+S or Meta+S)', value: 'ctrl+s meta+s' },
  ]

  const props = computed(() => {
    return {
      keys: keyExample.value,
      'display-mode': displayModes.includes(model.value) ? model.value : undefined,
    }
  })

  const keys = computed(() => keyExample.value)

  const code = computed(() => {
    return `<${name}${propsToString(props.value)} />`
  })
</script>
