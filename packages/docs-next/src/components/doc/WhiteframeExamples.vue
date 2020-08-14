<template>
  <v-row>
    <v-col
      v-for="([name, whiteframe], i) in whiteframes"
      :key="i"
      cols="12"
      sm="6"
      md="4"
    >
      <figure>
        <router-link
          :to="{
            name: 'Whiteframes',
            params: { whiteframe }
          }"
          rel="nofollow noopener"
          target="_blank"
        >
          <app-sheet class="mb-1">
            <v-img
              :alt="`${name} layout`"
              :aspect-ratio="16/9"
              :src="`https://cdn.vuetifyjs.com/docs/images/layouts/${whiteframe}.svg`"
              class="rounded"
              width="100%"
            />
          </app-sheet>
        </router-link>

        <figcaption
          class="overline text-center"
          v-text="name"
        />
      </figure>
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
      ].map(whiteframe => ([whiteframe, kebabCase(whiteframe)])),
    }),
  }
</script>
