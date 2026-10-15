<template>
  <div class="d-flex justify-center" @mouseout="tooltipVisible = false">
    <v-tooltip v-model="tooltipVisible" :open-on-hover="false" target="cursor" open-on-click>
      <template v-slot:activator="{ props: activatorProps }">
        <v-card
          v-bind="activatorProps"
          height="300"
          image="https://picsum.photos/600/300"
          width="600"
        ></v-card>
      </template>
      <span>I will appear at cursor</span>
    </v-tooltip>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const tooltipVisible = ref(false)
</script>

<script>
  export default {
    data: () => ({
      tooltipVisible: false,
    }),
  }
</script>

<example-meta lang="json">
{
  "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v4---Official-Vuetify-4---UI-Kit---Snips?node-id=13993-69553"
}
</example-meta>
