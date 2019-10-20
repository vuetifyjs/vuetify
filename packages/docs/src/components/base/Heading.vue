<template>
  <base-title>
    <template v-slot="{ attrs }">
      <base-goto v-bind="$attrs"><slot /></base-goto>
    </template>
  </base-title>
</template>

<script>
  export default {
    name: 'BaseHeading',
  }
</script>
