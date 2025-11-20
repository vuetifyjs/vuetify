<template>
  <v-card
    border="primary md"
    class="pa-6 d-md-flex justify-space-between align-center h-100"
    elevation="0"
    rounded="xl"
    link
  >
    <HomeCommonGradient color="primary" opacity-class="opacity-30" />

    <v-img
      v-if="props.image"
      :src="props.image"
      class="mr-4"
      max-height="80"
      width="120"
    />

    <div>
      <h6 v-if="props.title" class="text-subtitle-1 font-weight-bold mb-2">
        {{ props.title }}
      </h6>

      <p
        v-if="props.description"
        class="text-medium-emphasis text-body-2 text-left mb-0 mt-3 my-md-0"
        style="line-height: 1.6;"
      >
        {{ props.description }}
      </p>
    </div>
  </v-card>
</template>

<script setup lang="ts">
  const props = defineProps({
    image: {
      type: String,
      default: undefined,
    },
    description: {
      type: String,
      default: undefined,
    },
    title: {
      type: String,
      default: undefined,
    },
  })
</script>
