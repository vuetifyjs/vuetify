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
        class="mb-4"
        item-title="label"
        item-value="value"
        label="Key combination"
      ></v-select>

      <v-select
        v-model="platformOverride"
        :items="platformOptions"
        hint="Choose how keyboard shortcuts are displayed"
        item-title="label"
        item-value="value"
        label="Platform behavior"
        persistent-hint
      ></v-select>

      <v-select
        v-model="variant"
        :items="variants"
        item-title="label"
        item-value="value"
        label="Variant"
      ></v-select>
    </template>
  </ExamplesUsageExample>
</template>

<script setup>
  const displayModes = ['icon', 'symbol', 'text']
  const name = 'v-hotkey'
  const model = ref('default')
  const options = [...displayModes]
  const keyExample = ref('cmd+k')
  const platformOverride = ref('mac')
  const variant = ref('elevated')

  const keyExamples = [
    { label: 'Basic shortcut (Cmd+K)', value: 'cmd+k' },
    { label: 'Multiple keys (Ctrl+Shift+P)', value: 'ctrl+shift+p' },
    { label: 'Meta key (Meta+S)', value: 'meta+s' },
    { label: 'Sequential (Ctrl+K-P)', value: 'ctrl+k-p' },
    { label: 'Arrow key (Alt+Up)', value: 'alt+arrowup' },
    { label: 'Function key (F1)', value: 'f1' },
    { label: 'Special key (Enter)', value: 'enter' },
    { label: 'Multiple options (Ctrl+S or Meta+S)', value: 'ctrl+s meta+s' },
  ]

  const platformOptions = [
    { label: 'Mac', value: 'mac' },
    { label: 'PC', value: 'pc' },
    { label: 'Auto', value: 'auto' },
  ]

  const variants = [
    { label: 'Elevated', value: 'elevated' },
    { label: 'Plain', value: 'plain' },
    { label: 'Combined', value: 'combined' },
    { label: 'Flat', value: 'flat' },
    { label: 'Tonal', value: 'tonal' },
    { label: 'Outlined', value: 'outlined' },
    { label: 'Text', value: 'text' },
  ]

  const props = computed(() => {
    const baseProps = {
      keys: keyExample.value,
      'display-mode': displayModes.includes(model.value) ? model.value : undefined,
      variant: variant.value,
    }

    // Convert 'auto' string to undefined for the component prop
    if (platformOverride.value !== 'auto') {
      baseProps['override-platform'] = platformOverride.value
    }

    return baseProps
  })

  const keys = computed(() => keyExample.value)

  const code = computed(() => {
    return `<${name}${propsToString(props.value)} />`
  })
</script>
