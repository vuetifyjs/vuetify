<template>
  <component :is="Math.random() > 0.5 || viewport !== 'md' ? 'ad-code-fund' : 'ad-carbon'" />
</template>

<script>
  export default {
    props: {
      viewport: {
        type: String,
        default: undefined
      }
    }
  }
</script>
