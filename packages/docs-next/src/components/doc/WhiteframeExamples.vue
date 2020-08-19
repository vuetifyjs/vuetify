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
        <app-figure
          :alt="`${name} layout`"
          :aspect-ratio="16/9"
          :name="name"
          :src="`https://cdn.vuetifyjs.com/docs/images/whiteframes/${whiteframe}.svg`"
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
        'Side navigation',
        'Three column',
      ].map(whiteframe => ([whiteframe, kebabCase(whiteframe)])),
    }),
  }
</script>
