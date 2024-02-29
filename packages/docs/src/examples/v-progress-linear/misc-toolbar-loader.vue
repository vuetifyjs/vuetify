<template>
  <v-card
    class="mx-auto mt-6"
    width="344"
  >
    <v-toolbar>
      <v-btn icon>
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>

      <v-toolbar-title>My Recipes</v-toolbar-title>

      <v-progress-linear
        :active="loading"
        :indeterminate="loading"
        color="deep-purple-accent-4"
        absolute
        bottom
      ></v-progress-linear>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-toolbar>

    <v-container style="height: 282px;">
      <v-row
        align="center"
        class="fill-height"
        justify="center"
      >
        <v-scale-transition>
          <div
            v-if="!loading"
            class="text-center"
          >
            <v-btn
              color="primary"
              @click="loading = true"
            >
              Start loading
            </v-btn>
          </div>
        </v-scale-transition>
      </v-row>
    </v-container>
  </v-card>
</template>

<script setup>
  import { ref, watch } from 'vue'

  const loading = ref(false)

  watch(loading, val => {
    if (!val) return
    setTimeout(() => (loading.value = false), 3000)
  })
</script>

<script>
  export default {
    data: () => ({
      loading: false,
    }),

    watch: {
      loading (val) {
        if (!val) return

        setTimeout(() => (this.loading = false), 3000)
      },
    },
  }
</script>
