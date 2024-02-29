<template>
  <v-card
    class="mx-auto"
    color="grey-lighten-4"
    max-width="600"
  >
    <template v-slot:prepend>
      <v-icon
        :color="checking ? 'red lighten-2' : 'indigo'"
        class="me-8"
        icon="mdi-heart-pulse"
        size="64"
        @click="takePulse"
      ></v-icon>
    </template>

    <template v-slot:title>
      <div class="text-caption text-grey text-uppercase">
        Heart rate
      </div>

      <span
        class="text-h3 font-weight-black"
        v-text="avg || '—'"
      ></span>
      <strong v-if="avg">BPM</strong>
    </template>

    <template v-slot:append>
      <v-btn
        class="align-self-start"
        icon="mdi-arrow-right-thick"
        size="34"
        variant="text"
      ></v-btn>
    </template>

    <v-sheet color="transparent">
      <v-sparkline
        :key="String(avg)"
        :gradient="['#f72047', '#ffd200', '#1feaea']"
        :line-width="3"
        :model-value="heartbeats"
        :smooth="16"
        stroke-linecap="round"
        auto-draw
      ></v-sparkline>
    </v-sheet>
  </v-card>
</template>

<script setup>
  import { computed, ref } from 'vue'

  const exhale = ms => new Promise(resolve => setTimeout(resolve, ms))
  const checking = ref(false)
  const heartbeats = ref([])
  const avg = computed(() => {
    const sum = heartbeats.value.reduce((acc, cur) => acc + cur, 0)
    const length = heartbeats.value.length
    if (!sum && !length) return 0
    return Math.ceil(sum / length)
  })
  function heartbeat () {
    return Math.ceil(Math.random() * (120 - 80) + 80)
  }
  async function takePulse (inhale = true) {
    checking.value = true
    inhale && await exhale(1000)
    heartbeats.value = Array.from({ length: 20 }, heartbeat)
    checking.value = false
  }
  takePulse(false)
</script>

<script>
  const exhale = ms =>
    new Promise(resolve => setTimeout(resolve, ms))

  export default {
    data: () => ({
      checking: false,
      heartbeats: [],
    }),

    computed: {
      avg () {
        const sum = this.heartbeats.reduce((acc, cur) => acc + cur, 0)
        const length = this.heartbeats.length

        if (!sum && !length) return 0

        return Math.ceil(sum / length)
      },
    },

    created () {
      this.takePulse(false)
    },

    methods: {
      heartbeat () {
        return Math.ceil(Math.random() * (120 - 80) + 80)
      },
      async takePulse (inhale = true) {
        this.checking = true

        inhale && await exhale(1000)

        this.heartbeats = Array.from({ length: 20 }, this.heartbeat)

        this.checking = false
      },
    },
  }
</script>
