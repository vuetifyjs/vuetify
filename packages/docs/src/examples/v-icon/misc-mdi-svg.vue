<template>
  <div class="d-flex justify-space-around">
    <v-icon :icon="`mdiSvg:${icons.mdiAccount}`"></v-icon>
    <v-icon :icon="`mdiSvg:${icons.mdiPencil}`"></v-icon>
    <v-icon :icon="`mdiSvg:${icons.mdiShareVariant}`"></v-icon>
    <v-icon :icon="`mdiSvg:${icons.mdiDelete}`"></v-icon>
  </div>
</template>

<script>
  import {
    mdiAccount,
    mdiDelete,
    mdiPencil,
    mdiShareVariant,
  } from '@mdi/js'

  export default {
    data: () => ({
      icons: {
        mdiAccount,
        mdiPencil,
        mdiShareVariant,
        mdiDelete,
      },
    }),
  }
</script>
