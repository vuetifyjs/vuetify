<template>
  <base-ad>
    <app-markdown
      v-if="ad"
      class="v-markdown--inline d-inline"
      tag="span"
      :content="description"
    />
  </base-ad>
</template>

<script>
  // Mixins
  import { defineComponent } from 'vue'
  import { createAdProps, useAd } from '@/composables/ad'

  import BaseAd from './Base.vue'

  export default defineComponent({
    name: 'InlineAd',

    components: { BaseAd },

    props: {
      ...createAdProps(),
    },

    setup (props) {
      const { ad, description } = useAd(props)

      return {
        ad,
        description,
      }
    },
  })
</script>

<style lang="sass">
  .v-markdown--inline
    a
      font-weight: 500
      text-decoration: none
    p
      display: inline
      margin: 0
</style>
