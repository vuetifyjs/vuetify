<template>
  <v-fab
    v-model="model"
    color="primary"
    elevation="8"
    icon="mdi-chevron-up"
    size="large"
    app
    v-scroll="onScroll"
    @click="goTo(0)"
  />
</template>

<script setup>
  const goTo = useGoTo({ layout: true })

  const model = shallowRef(false)

  function onScroll () {
    model.value = window.scrollY > 200
  }
</script>
