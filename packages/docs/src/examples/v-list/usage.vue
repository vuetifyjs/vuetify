<template>
  <ExamplesUsageExample
    v-model="model"
    :code="code"
    :name="name"
    :options="options"
  >
    <div>
      <v-list v-bind="props">
        <v-list-item
          v-for="n in 3"
          :key="n"
          :prepend-avatar="avatar ? 'https://randomuser.me/api/portraits/women/8.jpg' : undefined"
          :title="'Item ' + n"
          subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit"
        ></v-list-item>
      </v-list>
    </div>

    <template v-slot:configuration>
      <v-checkbox v-model="avatar" label="Show avatars"></v-checkbox>
    </template>
  </ExamplesUsageExample>
</template>

<script setup>
  const name = 'v-list'
  const model = ref('default')
  const options = ['two-lines', 'three-lines']
  const avatar = ref(false)

  const lines = computed(() => {
    return {
      default: 'one',
      'two-lines': 'two',
      'three-lines': 'three',
    }[model.value]
  })

  const props = computed(() => {
    return {
      lines: lines.value,
    }
  })
  const itemProps = computed(() => {
    return {
      'v-for': 'n in 3',
      ':key': 'n',
      ':title': `'Item ' + n`,
      subtitle: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
      ':prepend-avatar': avatar.value ? 'https://randomuser.me/api/portraits/women/8.jpg' : undefined,
    }
  })

  const code = computed(() => {
    return `<${name}${propsToString(props.value)}>
  <v-list-item${propsToString(itemProps.value, 2)}></v-list-item>
</${name}>`
  })
</script>
