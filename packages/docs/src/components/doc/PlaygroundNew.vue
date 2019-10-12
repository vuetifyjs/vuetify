<template>
  <div>
    <doc-heading>Generic.Pages.playground</doc-heading>
    <doc-example-new
      :id="`usage-${-1}`"
      :value="value"
    />
  </div>
</template>

<script>
  export default {
    props: {
      value: {
        type: [Object, String],
        default: undefined,
      },
    },
  }
</script>
