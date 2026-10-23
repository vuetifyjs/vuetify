<template>
  <div>
    <v-switch
      v-model="rtl"
      color="primary"
      label="Right-to-left"
    ></v-switch>

    <v-locale-provider :rtl="rtl">
      <v-sheet
        class="d-flex align-center justify-center bg-grey-lighten-2"
        height="240"
        style="touch-action: pan-y"
        v-touch="{
          left: () => rtl ? prev() : next(),
          right: () => rtl ? next() : prev(),
        }"
      >
        <div class="text-center">
          <div class="text-caption">Swipe toward the end to advance ({{ rtl ? 'right' : 'left' }})</div>
          <div class="text-h4">{{ page }} / {{ total }}</div>
        </div>
      </v-sheet>
    </v-locale-provider>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const rtl = ref(false)
  const total = 5
  const page = ref(1)

  // physical left/right don't flip with locale, so map them to the logical start/end here
  function next () {
    page.value = Math.min(total, page.value + 1)
  }
  function prev () {
    page.value = Math.max(1, page.value - 1)
  }
</script>
