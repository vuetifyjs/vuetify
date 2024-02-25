<template>
  <v-layout-item
    v-scroll="onScroll"
    class="text-end pointer-events-none"
    model-value
    position="bottom"
    size="88"
  >
    <div class="ma-4">
      <v-fab-transition>
        <v-btn
          v-show="model"
          class="mt-auto pointer-events-initial"
          color="primary"
          elevation="8"
          icon="mdi-chevron-up"
          size="large"
          @click="goTo(0)"
        />
      </v-fab-transition>
    </div>
  </v-layout-item>
</template>

<script setup>
  const goTo = useGoTo({ layout: true })

  const model = shallowRef(false)

  function onScroll () {
    model.value = window.scrollY > 200
  }
</script>

<style scoped>
  .pointer-events-none {
    pointer-events: none;
  }

  .pointer-events-initial {
    pointer-events: initial;
  }
</style>
