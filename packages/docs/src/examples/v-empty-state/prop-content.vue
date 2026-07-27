<template>
  <v-empty-state
    headline="No Messages Yet"
    text="You haven't received any messages yet. When you do, they'll appear here."
    title="Check back later."
    @click:action="onClickAction"
  ></v-empty-state>
</template>

<script setup>
  function onClickAction () {
    alert('You clicked the action button')
  }
</script>
