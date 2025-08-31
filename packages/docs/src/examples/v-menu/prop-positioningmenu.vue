<template>
  <v-container>
    <div v-for="n in 10" :key="n" style="padding: 10px">
      <v-icon icon="mdi-plus" @click="show($event)" />
      Some Text Here
    </div>

    <v-menu
      v-model="showMenu"
      :target="[x, y]"
      scrim="transparent"
      scroll-strategy="close"
    >
      <v-list>
        <v-list-item v-for="k in 4" :key="k" :value="k">
          <v-list-item-title>Option {{ k }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-container>
</template>

<script setup>
  import { ref } from 'vue'

  const showMenu = ref(false)
  const x = ref(0)
  const y = ref(0)

  function show(evt) {
    x.value = evt.clientX
    y.value = evt.clientY
    showMenu.value = true
}
</script>