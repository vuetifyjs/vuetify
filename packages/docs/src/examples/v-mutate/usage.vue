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
