<template>
  <v-avatar aria-hidden="true" size="24">
    <div v-html="toSvg(value, 24)" />
  </v-avatar>
</template>

<script lang="ts" setup>
  import { toSvg } from 'jdenticon'

  defineProps({
    value: {
      type: String,
      required: true,
    },
  })
</script>
