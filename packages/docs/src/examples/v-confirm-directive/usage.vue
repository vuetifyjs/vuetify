<template>
  <ExamplesUsageExample
    v-model="model"
    :code="code"
    :name="name"
    :options="options"
  >
    <div class="text-center">
      <v-btn
        v-if="!showInput"
        text="Save Change"
        v-confirm="{ text: 'Are you sure?', onSubmit }"
      ></v-btn>
      <v-btn
        v-else
        text="Change name"
        v-confirm="{ text: 'Enter name', input, onSubmit }"
      ></v-btn>
    </div>

    <template v-slot:configuration>
      <v-text-field v-model="text" label="Text"></v-text-field>
      <v-checkbox v-model="showInput" label="Show Input"></v-checkbox>
    </template>
  </ExamplesUsageExample>
</template>

<script setup>
  const name = 'v-confirm'
  const model = ref('default')
  const text = ref('Are you sure?')
  const showInput = ref(false)
  const input = ref('John')

  const code = computed(() => {
    return !showInput.value ? `<v-btn v-confirm="{ text:'Are you sure?', onSubmit: () => alert('Submit clicked')}">Save Change</v-btn>`
      : `<v-btn v-confirm="{ text:'Enter name', input: 'John', onSubmit: (value) => alert(value)}">Change name</v-btn>`
  })

  const onSubmit = value => {
    alert(value || 'Submit clicked')
  }
</script>
