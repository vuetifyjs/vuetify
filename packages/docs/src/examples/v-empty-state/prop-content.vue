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

<example-meta lang="json">
{
  "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v4---Official-Vuetify-4---UI-Kit---Snips?node-id=14459-85409"
}
</example-meta>
