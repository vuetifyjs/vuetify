<template functional>
  <core-goto class="core-goto--heading">
    <doc-markdown v-bind="$attrs"><slot /></doc-markdown>
  </core-goto>
</template>

<script>
  export default {
    inherritAttrs: false
  }
</script>

<style lang="stylus">
.core-goto--heading {
  h1 {
    font-size: 32px;
    font-weight: 400;
  }

  h2 {
    font-size: 24px;
    font-weight: 400;
  }

  h3 {
    font-size: 16px;
    font-weight: 500;
  }
}
</style>
