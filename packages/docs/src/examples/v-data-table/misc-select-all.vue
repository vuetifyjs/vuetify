<template>
  <v-data-table
    v-model="selected"
    :items="items"
    item-value="name"
    tabindex="0"
    show-select
    @keydown.ctrl.a.prevent="onKeydownA"
    @keydown.meta.a.prevent="onKeydownA"
  ></v-data-table>
</template>

<script setup>
  import { ref } from 'vue'

  const selected = ref([])

  const items = [
    { name: 'Alice Johnson', email: 'alice@example.com', age: 42 },
    { name: 'Bob Smith', email: 'bob@example.com', age: 36 },
    { name: 'Charlie Davis', email: 'charlie@example.com', age: 24 },
    { name: 'Diana Prince', email: 'diana@example.com', age: 30 },
  ]

  function onKeydownA () {
    selected.value = selected.value.length === 0 ? items.map(item => item.name) : []
  }
</script>

<script>
  export default {
    data () {
      return {
        items: [
          { name: 'Alice Johnson', email: 'alice@example.com', age: 42 },
          { name: 'Bob Smith', email: 'bob@example.com', age: 36 },
          { name: 'Charlie Davis', email: 'charlie@example.com', age: 24 },
          { name: 'Diana Prince', email: 'diana@example.com', age: 30 },
        ],
        selected: [],
      }
    },
    methods: {
      onKeydownA () {
        this.selected = this.selected.value.length === 0 ? items.map(item => item.name) : []
      },
    },
  }
</script>
