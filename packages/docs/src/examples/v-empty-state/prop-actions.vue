<template>
  <v-empty-state
    action-text="Retry Request"
    image="https://cdn.vuetifyjs.com/docs/images/components/v-empty-state/connection.svg"
    text="There might be a problem with your connection or our servers. Please check your internet connection or try again later. We appreciate your patience."
    title="Something Went Wrong"
    @click:action="onClickAction"
  ></v-empty-state>
</template>

<script setup>
  function onClickAction () {
    alert('You clicked the action button')
  }
</script>

<script>
  export default {
    methods: {
      onClickAction () {
        alert('You clicked the action button')
      },
    },
  }
</script>
<example-meta lang="json">
  {
    "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v3.0---Official-Vuetify-3-UI-Kit?node-id=2261-15913&t=tC3y53U3XKPv8ZyJ-4"
  }
</example-meta>