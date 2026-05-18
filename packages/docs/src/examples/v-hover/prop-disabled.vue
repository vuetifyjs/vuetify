<template>
  <v-container>
    <v-hover
      v-slot="{ isHovering, props: hoverProps }"
      :disabled="pending"
    >
      <v-card v-bind="hoverProps" class="pa-4">
        Quarterly report
        <span v-if="pending"> (Generating…)</span>
        <v-overlay
          :model-value="isHovering"
          class="d-flex pa-2 justify-end align-center"
          contained
        >
          <v-btn
            :color="success ? 'success' : ''"
            :loading="pending && !success"
            :text="success ? 'Done!' : 'Generate'"
            style="min-width: 120px"
            @click="generate"
          ></v-btn>
        </v-overlay>
      </v-card>
    </v-hover>
  </v-container>
</template>

<script setup>
  import { ref } from 'vue'

  const pending = ref(false)
  const success = ref(false)

  function generate () {
    if (pending.value) return

    pending.value = true

    setTimeout(() => {
      success.value = true

      setTimeout(() => {
        pending.value = false

        setTimeout(() => {
          success.value = false
        }, 300) // small delay to keep final state for fade-out
      }, 1200) // time to show "success" state
    }, 2000) // simulated delay for the action processing
  }
</script>

<script>
  export default {
    data: () => ({
      pending: false,
      success: false,
    }),
    methods: {
      generate () {
        if (this.pending) return

        this.pending = true

        setTimeout(() => {
          this.success = true

          setTimeout(() => {
            this.pending = false

            setTimeout(() => {
              this.success = false
            }, 300)
          }, 1200)
        }, 2000)
      },
    },
  }
</script>
