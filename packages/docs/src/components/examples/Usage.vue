<template>
  <app-sheet class="mb-12">
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
