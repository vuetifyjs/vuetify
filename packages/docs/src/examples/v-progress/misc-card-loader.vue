<template>
  <v-card
    border="sm opacity-50"
    class="mx-auto pa-1"
    height="300"
    rounded="xl"
    variant="outlined"
    width="300"
  >
    <v-fade-transition mode="out-in">
      <v-img
        v-if="done"
        key="image"
        height="300"
        src="https://cdn.vuetifyjs.com/images/carousel/sky.jpg"
        style="border-radius: 20px;"
        cover
      ></v-img>

      <v-progress
        v-else
        :model-value="progress"
        details-position="bottom"
        label="Loading application"
        absolute
        hide-label
      >
        <template v-slot:default="{ percent }">
          <v-progress-circular
            :model-value="percent"
            color="lime-darken-2"
            rotate="180"
            size="140"
          ></v-progress-circular>
        </template>

        <template v-slot:value="{ formattedValue, percent }">
          <v-scroll-y-transition mode="out-in">
            <div v-if="percent > 75" key="finalizing" class="text-body-medium">
              Finalizing...
            </div>
            <div v-else key="loading" class="text-body-medium text-medium-emphasis">
              {{ formattedValue }} loaded
            </div>
          </v-scroll-y-transition>
        </template>
      </v-progress>
    </v-fade-transition>
  </v-card>
</template>

<script setup lang="ts">
  import { onUnmounted, shallowRef } from 'vue'

  const progress = shallowRef(0)
  const done = shallowRef(false)
  let timer: ReturnType<typeof setInterval>

  function startLoading () {
    done.value = false
    progress.value = 0
    timer = setInterval(() => {
      progress.value += 1.5
      if (progress.value >= 100) {
        clearInterval(timer)
        done.value = true
        setTimeout(startLoading, 4000)
      }
    }, 100)
  }

  startLoading()

  onUnmounted(() => clearInterval(timer))
</script>
