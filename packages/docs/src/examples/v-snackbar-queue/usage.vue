<template>
  <ExamplesUsageExample
    v-model="model"
    :code="code"
    :name="name"
    :options="options"
    :script="script"
  >
    <div style="height: 188px">
      <div class="d-flex ga-2">
        <v-btn color="success" @click="addMessage('success')">Success</v-btn>
        <v-btn color="info" @click="addMessage('info')">Info</v-btn>
        <v-btn color="error" @click="addMessage('error')">Error</v-btn>
        <v-btn color="surface-variant" @click="addMessage()">Default</v-btn>
        <v-btn prepend-icon="mdi-refresh" variant="outlined" @click="snackbarQueue?.clear()">Clear</v-btn>
      </div>

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

        <v-list-subheader>Logs:</v-list-subheader>
        <v-list-item>
          <pre
            v-if="logs.length"
            class="overflow-y-auto text-caption text-pre-wrap my-0"
            style="max-height: 80px"
          >{{ logs.join('\n') }}</pre>
        </v-list-item>
      </v-list>

      <v-snackbar-queue
        ref="snackbarQueue"
        v-model="queue"
        :collapsed="collapsed"
        :display-strategy="displayStrategy"
        :timeout="timeout"
        :total-visible="totalVisible"
        closable
      ></v-snackbar-queue>
    </div>

    <template v-slot:configuration>
      <v-select
        v-model="displayStrategy"
        :items="['hold', 'overflow']"
        label="Display strategy"
      ></v-select>
      <v-checkbox v-model="collapsed" label="Collapsed" hide-details></v-checkbox>
      <v-slider
        v-model="totalVisible"
        :max="10"
        :min="1"
        :step="1"
        label="Total visible"
        hide-details
        thumb-label
      ></v-slider>
      <v-slider
        v-model="timeout"
        :max="9000"
        :min="2000"
        :step="500"
        label="Timeout"
        hide-details
        thumb-label
      ></v-slider>
    </template>
  </ExamplesUsageExample>
</template>

<script setup>
  const name = 'v-snackbar-queue'
  const model = ref('default')
  const options = []
  const timeout = shallowRef(5000)
  const displayStrategy = shallowRef('hold')
  const collapsed = shallowRef(false)
  const totalVisible = shallowRef(5)
  const snackbarQueue = ref()
  const queue = ref([])
  const logs = ref([])
  let messageCount = 0

  function addMessage (color) {
    const id = ++messageCount
    queue.value.push({
      text: `Message #${id}`,
      timeout: timeout.value,
      color,
      onDismiss (reason) {
        logs.value.unshift(`Message #${id}: Closed (${reason})`)
      },
    })
  }

  const props = computed(() => {
    return {
      'v-model': 'messages',
      'display-strategy': displayStrategy.value !== 'hold' ? displayStrategy.value : undefined,
      collapsed: collapsed.value || undefined,
      'total-visible': totalVisible.value > 1 ? totalVisible.value : undefined,
      timeout: timeout.value !== 5000 ? timeout.value : undefined,
      closable: true,
    }
  })

  const slots = computed(() => {
    return ''
  })

  const code = computed(() => {
    return `<div class="d-flex ga-2">
  <v-btn color="success" @click="addMessage('success')">Success</v-btn>
  <v-btn color="info" @click="addMessage('info')">Info</v-btn>
  <v-btn color="error" @click="addMessage('error')">Error</v-btn>
  <v-btn color="surface-variant" @click="addMessage()">Default</v-btn>
  <v-btn prepend-icon="mdi-refresh" variant="outlined" @click="snackbarQueue?.clear()">Clear</v-btn>
</div>

<pre>{{ logs.join('\\n') }}</pre>

<v-snackbar-queue${propsToString(props.value)}>${slots.value}</v-snackbar-queue>`
  })

  const script = computed(() => {
    return `<script setup>
  import { ref } from 'vue'

  const messages = ref([])
  const logs = ref([])
  let messageCount = 0

  function addMessage (color) {
    const id = ++messageCount
    messages.value.push({
      text: \`Message #\${id}\`,
      color,
      onDismiss (reason) {
        logs.value.unshift(\`Message #\${id}: Closed (\${reason})\`)
      },
    })
  }
<` + '/script>'
  })
</script>
