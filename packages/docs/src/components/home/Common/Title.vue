<template>
  <div>
    <slot name="top" />

    <slot name="subtitle">
      <p v-if="props.subtitle" class="text-primary font-weight-bold mb-3">
        {{ props.subtitle }}
      </p>
    </slot>

    <h4 class="text-h4 font-weight-bold mb-5 mt-0">
      {{ props.title }}
    </h4>

    <v-responsive class="mx-auto" max-width="700">
      <h6 class="text-h6 font-weight-regular text-medium-emphasis my-0">
        {{ props.description }}
      </h6>
    </v-responsive>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      default: undefined,
    },
    description: {
      type: String,
      required: true,
    },
  })
</script>
