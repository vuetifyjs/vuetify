<template>
  <div>
    <router-view />

    <!-- Class needed for style propagation -->
    <div class="v-application">
      <wireframe-link />
    </div>
  </div>
</template>

<script>
  // Components
  import WireframeLink from './Link'

  export default {
    name: 'WireframeLayout',

    components: { WireframeLink },
  }
</script>
