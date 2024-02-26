<template>
  <v-empty-state
    title="No Messages Yet"
    subtitle="Check back later."
    text="You haven't received any messages yet. When you do, they'll appear here."
    @click:action="onClickAction"
  ></v-empty-state>
</template>

<script setup>
  import { ref } from 'vue'

  function onClickAction () {
    alert('You clicked the action button')
  }
</script>
