<template>
  <v-card
    border="md opacity-30"
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
        height="292"
        src="https://cdn.vuetifyjs.com/images/carousel/sky.jpg"
        style="border-radius: 18px;"
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
            width="6"
            rounded
          >
            <div class="d-flex align-baseline mr-n3">
              <div class="text-headline-large text-medium-emphasis">
                {{ percent.toFixed() }}
              </div>
              <span class="ml-1">%</span>
            </div>
          </v-progress-circular>
        </template>

        <template v-slot:value="{ percent }">
          <div class="text-body-medium">
            <v-scroll-y-transition mode="out-in">
              <div v-if="percent > 75" key="finalizing">Finalizing...</div>
              <div v-else key="loading">Loading...</div>
            </v-scroll-y-transition>
          </div>
        </template>
      </v-progress>
    </v-fade-transition>
  </v-card>
</template>

<script setup>
  import { onUnmounted, shallowRef } from 'vue'

  const progress = shallowRef(0)
  const done = shallowRef(false)
  let timer = -1

  function startLoading () {
    done.value = false
    progress.value = 0
    timer = setInterval(() => {
      progress.value += progress.value > 70 ? 4 : 7.5
      if (progress.value >= 100) {
        clearInterval(timer)
        done.value = true
        setTimeout(startLoading, 4000)
      }
    }, 600)
  }

  startLoading()

  onUnmounted(() => clearInterval(timer))
</script>
