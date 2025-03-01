<template>
  <div class="d-flex justify-space-around">
    <v-icon :icon="`mdiSvg:${mdiAccount}`"></v-icon>
    <v-icon :icon="`mdiSvg:${mdiPencil}`"></v-icon>
    <v-icon :icon="`mdiSvg:${mdiShareVariant}`"></v-icon>
    <v-icon :icon="`mdiSvg:${mdiDelete}`"></v-icon>
  </div>
</template>

<script setup>
  import { mdiAccount, mdiDelete, mdiPencil, mdiShareVariant } from '@mdi/js'
</script>

<script>
  import {
    mdiAccount,
    mdiDelete,
    mdiPencil,
    mdiShareVariant,
  } from '@mdi/js'

  export default {
    data: () => ({
      mdiAccount,
      mdiPencil,
      mdiShareVariant,
      mdiDelete,
    }),
  }
</script>
