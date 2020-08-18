<template>
  <v-row>
    <v-col
      v-for="([name, whiteframe], i) in whiteframes"
      :key="i"
      cols="12"
      md="6"
      lg="4"
    >
      <router-link
        :to="{
          name: 'Whiteframes',
          params: { whiteframe }
        }"
        class="text--primary text-decoration-none"
        rel="nofollow noopener"
        target="_blank"
      >
        <app-img
          :aspect-ratio="16/9"
          :alt="`${name} layout`"
          :name="name"
          :src="`https://cdn.vuetifyjs.com/docs/images/layouts/${whiteframe}.svg`"
        />
      </router-link>
    </v-col>
  </v-row>
</template>

<script>
  // Utilities
  import kebabCase from 'lodash/kebabCase'

  export default {
    name: 'WhiteframeExamples',

    data: () => ({
      whiteframes: [
        'Base',
        'Extended toolbar',
        'System bar',
        'Inbox',
        'Constrained',
      ].map(whiteframe => ([whiteframe, kebabCase(whiteframe)])),
    }),
  }
</script>
