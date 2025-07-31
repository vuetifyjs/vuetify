<template>
  <v-container>
    <v-row justify="space-between">
      <v-col v-for="cursor in cursors" :key="cursor" cols="3">
        <v-btn
          :class="`cursor-${cursor}`"
          :text="cursor"
          block
        ></v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  const cursors = [
    'auto',
    'default',
    'grab',
    'grabbing',
    'help',
    'move',
    'none',
    'not-allowed',
    'pointer',
    'progress',
    'text',
    'wait',
  ]
</script>

<script>
  export default {
    data: () => ({
      cursors: [
        'auto',
        'default',
        'grab',
        'grabbing',
        'help',
        'move',
        'none',
        'not-allowed',
        'pointer',
        'progress',
        'text',
        'wait',
      ],
    }),
  }
</script>
