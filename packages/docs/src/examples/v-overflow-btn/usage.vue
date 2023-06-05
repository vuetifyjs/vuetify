<template>
  <v-container id="dropdown-playground">
    <v-overflow-btn
      hint="I'm a hint"
      :items="dropdownFont"
      label="Overflow Btn"
      target="#dropdown-playground"
      v-bind="$attrs"
    ></v-overflow-btn>
  </v-container>
</template>

<script setup>
  import { ref } from 'vue'

  const dropdownFont = ref([
    { text: 'Arial', callback: () => { } },
    { text: 'Calibri', callback: () => { } },
    { text: 'Courier', callback: () => { } },
    { text: 'Verdana', callback: () => { } },
  ])
  const defaults = ref({
    dense: false,
    disabled: false,
    editable: false,
    filled: false,
    loading: false,
    overflow: false,
    'persistent-hint': false,
    readonly: false,
    reverse: false,
    segmented: false,
  })
  const options = ref({
    booleans: [
      'dense',
      'disabled',
      'filled',
      'loading',
      'persistent-hint',
      'readonly',
      'reverse',
    ],
  })
  const tabs = ref(['editable', 'overflow', 'segmented'])
</script>

<script>
  export default {
    name: 'Usage',

    inheritAttrs: false,

    data: () => ({
      dropdownFont: [
        { text: 'Arial', callback: () => {} },
        { text: 'Calibri', callback: () => {} },
        { text: 'Courier', callback: () => {} },
        { text: 'Verdana', callback: () => {} },
      ],
      defaults: {
        dense: false,
        disabled: false,
        editable: false,
        filled: false,
        loading: false,
        overflow: false,
        'persistent-hint': false,
        readonly: false,
        reverse: false,
        segmented: false,
      },
      options: {
        booleans: [
          'dense',
          'disabled',
          'filled',
          'loading',
          'persistent-hint',
          'readonly',
          'reverse',
        ],
      },
      tabs: ['editable', 'overflow', 'segmented'],
    }),
  }
</script>
