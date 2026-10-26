<template>
  <ExamplesUsageExample
    v-model="model"
    :code="code"
    :name="name"
    :options="options"
    :script="script"
  >
    <div>
      <v-checkbox-group v-model="selected" v-bind="props" hide-details>
        <v-checkbox label="Email" value="email"></v-checkbox>
        <v-checkbox label="SMS" value="sms"></v-checkbox>
        <v-checkbox label="Push notifications" value="push"></v-checkbox>
      </v-checkbox-group>

      <p class="mt-4">Selected: {{ selected }}</p>
    </div>

    <template v-slot:configuration>
      <v-checkbox v-model="disabled" label="Disabled"></v-checkbox>
      <v-checkbox v-model="readonly" label="Readonly"></v-checkbox>
    </template>
  </ExamplesUsageExample>
</template>

<script setup>
  const name = 'v-checkbox-group'
  const model = shallowRef('default')
  const options = ['inline']
  const selected = shallowRef(['email'])
  const disabled = shallowRef(false)
  const readonly = shallowRef(false)

  const props = computed(() => ({
    disabled: disabled.value || undefined,
    inline: model.value === 'inline' || undefined,
    label: 'Notifications',
    readonly: readonly.value || undefined,
  }))

  const script = `<script setup>
  import { shallowRef } from 'vue'

  const selected = shallowRef(['email'])
<` + '/script>'

  const code = computed(() => `<${name} v-model="selected"${propsToString(props.value)}>
  <v-checkbox label="Email" value="email"></v-checkbox>
  <v-checkbox label="SMS" value="sms"></v-checkbox>
  <v-checkbox label="Push notifications" value="push"></v-checkbox>
</${name}>`)
</script>
