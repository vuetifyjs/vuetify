<template>
  <ExamplesUsageExample
    v-model="model"
    :code="code"
    :name="name"
    :options="options"
  >
    <div>
      <v-text-field
        v-model="text"
        label="Queue a message"
        hide-details
        @keydown.enter="onClick"
      >
        <template v-slot:append-inner>
          <v-btn
            :disabled="!text"
            append-icon="i-mdi:arrow-right"
            text="Queue"
            flat
            slim
            @click="onClick"
          ></v-btn>
        </template>
      </v-text-field>

      <v-snackbar-queue v-model="queue" :color="color" :timeout="timeout"></v-snackbar-queue>
    </div>

    <template v-slot:configuration>
      <v-select
        v-model="color"
        :items="['primary', 'secondary', 'success', 'info', 'warning', 'error']"
        label="Color"
        clearable
      ></v-select>

      <v-number-input v-model="timeout" min="-1"></v-number-input>
    </template>
  </ExamplesUsageExample>
</template>

<script setup>
  const name = 'v-snackbar-queue'
  const model = ref('default')
  const options = []
  const color = shallowRef()
  const timeout = shallowRef(5000)
  const queue = ref([])
  const text = shallowRef('')

  function onClick () {
    queue.value.push({
      text: text.value,
      timeout: timeout.value,
      color: color.value,
    })
  }

  const props = computed(() => {
    return {
      color: color.value,
      timeout: timeout.value !== 5000 ? timeout.value : undefined,
    }
  })

  const slots = computed(() => {
    return ''
  })

  const code = computed(() => {
    return `<v-snackbar-queue${propsToString(props.value)}>${slots.value}</v-snackbar-queue>`
  })
</script>
