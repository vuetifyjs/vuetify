<template lang="pug">
  page(v-bind="$attrs" :toc="toc")
    page-heading
      template(slot="title") {{ $t(data.header) }}
      p(v-html="$t(data.headerText)" v-if="data.headerText")
    div(:id="data.id || _uid")
      slot
</template>

<script>
  export default {
    inheritAttrs: false,

    name: 'text-page',

    props: {
      data: Object,
      default: () => {}
    },

    computed: {
      toc () {
        return this.$te(this.data.toc)
          ? this.$t(this.data.toc)
          : []
      }
    }
  }
</script>
