<template lang="pug">
  page
    page-heading
      template(slot="title") {{ $t(data.header) }}
      p(v-html="$t(data.headerText)")
    section(:id="id")
      slot
</template>

<script>
  export default {
    name: 'text-page',

    data: () => ({
      id: ''
    }),

    props: {
      data: Object,
      default: () => {}
    }
  }
</script>
