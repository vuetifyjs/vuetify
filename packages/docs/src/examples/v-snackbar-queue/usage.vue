<template>
  <ExamplesUsageExample
    v-model="model"
    :code="code"
    :name="name"
    :options="options"
    :script="script"
  >
    <div style="height: 188px">
      <v-text-field
        v-model="text"
        label="Queue a message"
        hide-details
        @keydown.enter="onClick"
      >
        <template v-slot:append-inner>
          <v-btn
            :disabled="!text"
            append-icon="mdi-arrow-right"
            text="Queue"
            variant="flat"
            slim
            @click="onClick"
          ></v-btn>
        </template>
      </v-text-field>

      <v-list density="compact" variant="tonal" nav>
        <v-list-subheader>Queue:</v-list-subheader>
        <v-fade-transition
          v-for="message in queue"
          :key="message"
          appear
        >
          <v-list-item
            :color="message.color"
            :subtitle="message.timeout + 'ms'"
            :title="message.text"
          ></v-list-item>
        </v-fade-transition>
      </v-list>

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
    text.value = ''
  }

  const props = computed(() => {
    return {
      'v-model': 'messages',
      color: color.value ?? undefined,
      timeout: timeout.value !== 5000 ? timeout.value : undefined,
    }
  })

  const slots = computed(() => {
    return ''
  })

  const code = computed(() => {
    return `<v-snackbar-queue${propsToString(props.value)}>${slots.value}</v-snackbar-queue>`
  })

  const script = computed(() => {
    return `<script setup>
  const text = ref('')
  const messages = ref([])

  function onClick () {
    messages.value.push(text.value)
  }
<` + '/script>'
  })
</script>
