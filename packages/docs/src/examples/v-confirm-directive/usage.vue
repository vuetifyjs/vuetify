<template>
  <ExamplesUsageExample v-model=" model " :code=" code " :name=" name " :options=" options ">
    <div class="text-center">
      <v-btn
        v-if=" !showInput "
        text="Save Change"
        v-confirm=" { text: 'Are you sure?', onSubmit: () => showAlert( 'Submit clicked' ) } "
      ></v-btn>
      <div v-else>Username: <v-btn
        :text=" input "
        class="text-none"
        variant="text"
        v-confirm=" { text: 'Enter name', input, onSubmit: ( value ) => input = value } "
      ></v-btn>
      </div>

    </div>

    <template v-slot:configuration>
      <v-checkbox v-model=" showInput " label="Show Input"></v-checkbox>
    </template>
  </ExamplesUsageExample>
</template>

<script setup>
  const name = 'v-confirm'
  const model = ref('default')
  const showInput = ref(false)
  const input = ref('johnleider')

  const code = computed(() => {
    return !showInput.value ? `<v-btn v-confirm="{ text:'Are you sure?', onSubmit: () => alert('Submit clicked')}">Save Change</v-btn>`
      : `<v-btn v-confirm="{ text:'Enter name', input: 'John', onSubmit: (value) => alert(value)}">Change name</v-btn>`
  })

  function showAlert (value) {
    alert(value)
  }
</script>
