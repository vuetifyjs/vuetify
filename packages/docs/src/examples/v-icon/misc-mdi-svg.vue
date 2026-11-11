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

<example-meta lang="json">
{
  "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v4---Official-Vuetify-4---UI-Kit---Snips?node-id=14472-194564"
}
</example-meta>
