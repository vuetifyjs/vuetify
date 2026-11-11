<template>
  <div class="d-flex flex-wrap align-center ga-2 mb-4">
    <v-btn-toggle v-model="overscan" density="compact" variant="outlined" divided mandatory>
      <v-btn :value="null" text="Default"></v-btn>
      <v-btn :value="2" text="2"></v-btn>
      <v-btn :value="5" text="5"></v-btn>
    </v-btn-toggle>

    <v-spacer></v-spacer>

    <v-number-input
      v-model="distance"
      :min="100"
      :step="100"
      density="compact"
      label="Notes"
      max-width="160"
      variant="outlined"
      hide-details
    ></v-number-input>
    <v-btn aria-label="Scroll up" icon="mdi-arrow-up" size="small" variant="tonal" @click="jump(-distance)"></v-btn>
    <v-btn aria-label="Scroll down" icon="mdi-arrow-down" size="small" variant="tonal" @click="jump(distance)"></v-btn>
  </div>

  <v-virtual-scroll
    ref="list"
    :items="notes"
    :overscan="overscan"
    height="400"
    item-key="id"
  >
    <template v-slot:default="{ item }">
      <div class="pa-4">
        <div class="text-subtitle-2">Note #{{ item.id }}</div>
        <div class="text-body-2 text-medium-emphasis">{{ item.text }}</div>
      </div>
      <v-divider></v-divider>
    </template>
  </v-virtual-scroll>
</template>

<script setup>
  import { shallowRef, useTemplateRef } from 'vue'
  import { useGoTo } from 'vuetify'

  const goTo = useGoTo()
  const overscan = shallowRef(null)
  const distance = shallowRef(100)
  const list = useTemplateRef('list')

  function jump (count) {
    const container = list.value?.$el
    if (!container) return
    const itemHeight = container.querySelector('.v-virtual-scroll__item')?.offsetHeight ?? 200
    goTo(container.scrollTop + count * itemHeight, { container, duration: 1000 })
  }

  const notes = Array.from({ length: 2000 }, (_, index) => ({
    id: index + 1,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '.repeat((index * 5) % 12 + 4),
  }))
</script>
