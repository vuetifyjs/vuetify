<template>
  <ExamplesUsageExample
    :code="code"
    :name="name"
    :options="[]"
    :script="script"
  >
    <div class="text-center">
      <v-btn
        color="primary"
        text="Open"
        @click="open = true"
      ></v-btn>
      <br>
      <br>
      <small><v-hotkey :keys="hotkey" inline></v-hotkey></small>

      <v-command-palette
        v-model="open"
        :hotkey="hotkey"
        :items="items"
      ></v-command-palette>

      <v-snackbar :key="snackbarId" v-model="snackbar" :timeout="2000">
        {{ snackbarText }}
      </v-snackbar>
    </div>
    <template v-slot:configuration>
      <v-text-field v-model="hotkey" label="Hotkey"></v-text-field>
    </template>
  </ExamplesUsageExample>
</template>

<script setup>
  const name = 'v-command-palette'
  const hotkey = shallowRef('alt+g')

  const open = shallowRef(false)
  const snackbar = shallowRef(false)
  const snackbarText = shallowRef('')
  const snackbarId = shallowRef(0)

  function showSnackbar (text) {
    snackbarText.value = text
    snackbar.value = true
    snackbarId.value++
  }

  const items = [
    {
      id: 'home',
      title: 'Home',
      prependIcon: 'mdi-home',
      handler: () => showSnackbar('Navigating to Home'),
    },
    {
      id: 'settings',
      title: 'Settings',
      prependIcon: 'mdi-cog',
      handler: () => showSnackbar('Opening Settings'),
    },
    {
      id: 'help',
      title: 'Help',
      prependIcon: 'mdi-help-circle',
      handler: () => showSnackbar('Showing Help'),
    },
  ]

  const script = computed(() => {
    return `
<script setup>
  import { shallowRef } from 'vue'

  const open = shallowRef(false)

  const items = [
    {
      id: 'home',
      title: 'Home',
      prependIcon: 'mdi-home',
      handler: () => console.log('Navigating to Home'),
    },
    {
      id: 'settings',
      title: 'Settings',
      prependIcon: 'mdi-cog',
      handler: () => console.log('Opening Settings'),
    },
    {
      id: 'help',
      title: 'Help',
      prependIcon: 'mdi-help-circle',
      handler: () => console.log('Showing Help'),
    },
  ]
<` + '/script>'
  })

  const code = computed(() => {
    return `<div class="text-center">
  <v-btn color="primary" text="Open" @click="open = true"></v-btn>

  <v-command-palette
    v-model="open"
    hotkey="${hotkey.value}"
    :items="items"
  ></v-command-palette>
</div>`
  })
</script>
