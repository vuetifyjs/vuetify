<template>
  <app-sheet class="mb-6">
    <vue-file :file="`${name}/usage`" />
  </app-sheet>
</template>

<script>
  export default {
    name: 'Usage',

    props: {
      name: String,
    },
  }
</script>
