<template>
  <div
    v-if="sponsors.length > 0"
    class="pt-4 pb-3 px-2"
  >
    <app-caption
      class="ml-2 mb-3"
      path="premiere-sponsors"
    />

    <sponsor
      comfortable
      slug="qomplx"
    />
  </div>
</template>

<script>
  // Utilities
  import { get } from 'vuex-pathify'

  export default {
    name: 'DefaultBecomeASponsor',

    computed: { sponsors: get('sponsors/all') },
  }
</script>
