<template lang="pug">
  text-page(:data="$data")
    v-alert(color="error" icon="warning" value).mb-4
      span(v-html="$t('quickStart.alert1')")
</template>

<script>
  export default {
    data: () => ({
      header: "quickStart.header",
      headerText: "quickStart.headerText"
    })
  }
</script>
