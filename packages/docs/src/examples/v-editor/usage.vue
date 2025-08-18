<template>
  <ExamplesUsageExample
    v-model="model"
    :code="code"
    :name="name"
    :options="options"
  >
    <div>
      <v-editor v-bind="props" v-model="field" hide-details></v-editor>
    </div>

    <template v-slot:configuration>
      <v-checkbox v-model="hideToolbar" label="Hide toolbar"></v-checkbox>

      <v-checkbox v-model="clearable" label="Clearable"></v-checkbox>
    </template>
  </ExamplesUsageExample>
</template>

<script setup>
  const name = 'v-editor'
  const model = ref('default')
  const clearable = ref(false)
  const field = ref('This is some <b>rich text</b> content with <i>formatting</i>')
  const hideToolbar = ref(false)
  const options = ['outlined', 'underlined', 'solo', 'solo-filled', 'solo-inverted']
  const props = computed(() => {
    return {
      clearable: clearable.value || undefined,
      persistentClear: clearable.value || undefined,
      'hide-toolbar': hideToolbar.value || undefined,
      variant: model.value === 'default' ? undefined : model.value,
    }
  })

  const slots = computed(() => {
    return ``
  })

  const code = computed(() => {
    return `<${name}${propsToString(props.value)}>${slots.value}</${name}>`
  })

  watch(clearable, () => {
    if (!field.value) field.value = 'Start typing your content here...'
  })
</script>

<script>
  export default {
    data: () => ({
      name: 'v-editor',
      model: 'default',
      clearable: false,
      field: 'This is some <b>rich text</b> content with <i>formatting</i>',
      hideToolbar: false,
      options: ['outlined', 'underlined', 'solo', 'solo-filled', 'solo-inverted'],
    }),
    computed: {
      props () {
        return {
          clearable: this.clearable || undefined,
          persistentClear: this.clearable || undefined,
          'hide-toolbar': this.hideToolbar || undefined,
          variant: this.model === 'default' ? undefined : this.model,
        }
      },
      slots () {
        return ``
      },
      code () {
        return `<${this.name}${this.propsToString(this.props)}>${this.slots}</${this.name}>`
      },
    },
    watch: {
      clearable (val) {
        if (!this.field) this.field = 'Start typing your content here...'
      },
    },
  }
</script>
