<template>
  <v-col cols="4">
    <v-card
      :image="`https://cdn.vuetifyjs.com/docs/images/components-temp/${name}.png`"
      :to="rpath(`/components/${name}`)"
      height="164"
      class="mb-3"
      elevation="0"
    />

    <h2 class="text-h6">
      <span class="text-capitalize">{{ name }}</span>
    </h2>

    <slot />
  </v-col>
</template>

<script lang="ts">
  // Utilities
  import { defineComponent } from 'vue'
  import { rpath } from '@/util/routes'

  export default defineComponent({
    name: 'ComponentsListItem',

    props: {
      name: String,
    },

    setup () {
      return { rpath }
    },
  })
</script>
