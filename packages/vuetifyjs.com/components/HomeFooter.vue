<template lang="pug">
  v-footer.white--text
    v-layout(row wrap).ma-0
      v-flex(xs12 sm4).pa-5.blue-grey.darken-2
      v-flex(xs12 sm8).blue-grey.darken-3
        v-layout
          v-flex(
            xs12 sm4
            v-for="(column, i) in columns"
            :key="i"
          )
      v-flex(xs12).blue-grey.darken-4.text-xs-center.pa-3
        span &copy; {{ new Date().getFullYear() }}
</template>

<script>
  export default {
    name: 'home-footer',

    data: () => ({
      columns: []
    })
  }
</script>
