<template lang="pug">
  page
    page-heading
      template(slot="title") {{ $t(data.header) }}
      p(v-html="$t(data.headerText)")
    div(:id="data.id || _uid")
      slot
</template>

<script>
  export default {
    name: 'text-page',

    props: {
      data: Object,
      default: () => {}
    }
  }
</script>
