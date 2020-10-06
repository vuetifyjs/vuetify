<template>
  <v-row>
    <v-col
      v-for="([name, wireframe], i) in wireframes"
      :key="i"
      cols="12"
      md="6"
      lg="4"
    >
      <router-link
        :to="{
          name: 'Wireframes',
          params: { wireframe }
        }"
        class="text--primary text-decoration-none"
        rel="nofollow noopener"
        target="_blank"
      >
        <app-figure
          :alt="`${name} layout`"
          :aspect-ratio="16/9"
          :name="name"
          :src="`https://cdn.vuetifyjs.com/docs/images/wireframes/${wireframe}.svg`"
          outlined
        />
      </router-link>
    </v-col>
  </v-row>
</template>

<script>
  // Utilities
  import kebabCase from 'lodash/kebabCase'

  export default {
    name: 'WireframeExamples',

    data: () => ({
      wireframes: [
        'Base',
        'Extended toolbar',
        'System bar',
        'Inbox',
        'Constrained',
        'Side navigation',
        'Three column',
        'Discord',
      ].map(wireframe => ([wireframe, kebabCase(wireframe)])),
    }),
  }
</script>
