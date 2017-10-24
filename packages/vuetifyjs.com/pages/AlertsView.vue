<template lang="pug">
  component-page(:data="$data")
</template>

<script>
  export default {
    data: () => ({
      header: "quick-start.header",
      headerText: "quick-start.headerText"
    })
  }
</script>