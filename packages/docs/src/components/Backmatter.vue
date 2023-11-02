<template>
  <section
    id="ready-for-more"
    class="mt-16"
  >
    <ready-for-more />

    <related-pages />

    <app-divider />

    <up-next />

    <promoted />

    <contribute />
  </section>
</template>

<script setup>
  // Components
  import Contribute from '@/components/doc/Contribute.vue'
  import ReadyForMore from '@/components/doc/ReadyForMore.vue'
  import RelatedPages from '@/components/doc/RelatedPages.vue'
  import UpNext from '@/components/doc/UpNext.vue'
</script>
