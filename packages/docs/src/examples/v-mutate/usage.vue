<template>
  <div>
    <v-text-field
      v-model="content"
      label="Content"
    ></v-text-field>
    <v-sheet v-mutate="onMutate">
      {{ content }}
    </v-sheet>
    Total mutations: {{ mutations }}
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const mutations = ref(0)
  const content = ref('Hello, world!')
  function onMutate () {
    mutations.value++
  }
</script>

<script>
  export default {
    data: () => ({
      mutations: 0,
      content: 'Hello, world!',
    }),

    methods: {
      onMutate () {
        this.mutations++
      },
    },
  }
</script>
