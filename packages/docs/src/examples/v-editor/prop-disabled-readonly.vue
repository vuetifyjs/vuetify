<template>
  <v-card class="mx-auto" max-width="600">
    <v-card-text>
      <v-editor
        v-model="content"
        height="150"
        disabled
      ></v-editor>
    </v-card-text>

    <v-card-text>
      <v-editor
        v-model="content"
        height="150"
        label="Readonly Editor"
        placeholder="This editor is readonly"
        readonly
      ></v-editor>
    </v-card-text>
  </v-card>
</template>

<script setup>
  const content = shallowRef('This content cannot be edited in disabled or readonly mode.')
</script>

<script>
  export default {
    data: () => ({
      content: 'This content cannot be edited in disabled or readonly mode.',
    }),
  }
</script>
