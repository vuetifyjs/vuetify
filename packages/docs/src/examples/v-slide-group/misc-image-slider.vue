<template>
  <v-sheet
    class="mx-auto py-4"
    color="grey-darken-4"
    elevation="2"
    max-width="800"
    rounded="24"
    v-resize="onResize"
  >
    <v-slide-group
      ref="slideGroup"
      :padding="['3rem', '1.5rem']"
      gap="16"
      scroll-snap="start"
      show-arrows="never"
      style="mask-image: linear-gradient(to right, #0002, #000 24px calc(100% - 24px), #0002)"
    >
      <v-slide-group-item
        v-for="n in 15"
        :key="n"
      >
        <v-card
          :image="`https://picsum.photos/id/5${n}/200/300`"
          height="200"
          rounded="12"
          width="300"
          @click="slideGroup.slide({ index: n - 1 })"
        ></v-card>
      </v-slide-group-item>
    </v-slide-group>

    <div class="d-flex ga-2 px-12 pb-6 align-center">
      <v-btn
        :disabled="!slideGroup?.hasPrev"
        icon="$prev"
        variant="outlined"
        @click="slideGroup.slide('prev')"
      ></v-btn>
      <v-btn
        :disabled="!slideGroup?.hasNext"
        icon="$next"
        variant="outlined"
        @click="slideGroup.slide('next')"
      ></v-btn>
      <v-progress-linear
        :model-value="scrollProgress"
        :transition="false"
        class="ml-3"
      ></v-progress-linear>
    </div>
  </v-sheet>
</template>

<script setup>
  import { computed, ref, shallowRef } from 'vue'

  const slideGroup = ref()
  const scrollLimit = shallowRef(9999)

  function onResize () {
    const container = slideGroup.value?.$el.querySelector('.v-slide-group__container')
    scrollLimit.value = container?.scrollWidth - container?.clientWidth
  }

  const scrollProgress = computed(() => 100 * Math.abs(slideGroup.value?.scrollOffset ?? 0) / scrollLimit.value)
</script>
