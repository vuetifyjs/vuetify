<template>
  <div
    :class="[
      'text-medium-emphasis text-caption py-2 px-3 d-flex align-center',
      $attrs.class,
    ]"
  >
    <div class="d-inline-flex align-center">
      <v-icon v-if="prependIcon" :icon="prependIcon" start />

      {{ label }}
    </div>

    <v-btn
      v-bind="$attrs"
      class="text-none px-2 ms-auto"
      density="compact"
      variant="text"
    >
      {{ title }}

      <v-icon v-if="appendIcon" :icon="appendIcon" size="xs" end />

      <template #loader>
        <slot name="loader" />
      </template>
    </v-btn>
  </div>
</template>

<script setup>
  defineProps({
    label: String,
    title: String,
    prependIcon: String,
    appendIcon: String,
  })
</script>

<script>
  export default {
    inheritAttrs: false,
  }
</script>
