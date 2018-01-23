<template lang="pug">
  v-container.text-xs-center#store-header
    v-layout
      v-flex(xs12)
        v-progress-circular(
          :indeterminate="loading"
          size="200"
          :width="loading ? 1 : 0"
          color="secondary"
        ).mb-3
          img(
            src="/static/doc-images/logo.svg"
            height="125px"
            alt="Vuetify"
          )

        h1(v-text="header").display-1.primary--text.mb-3
        p(v-text="subHeader").subheading
        div.mb-5
          slot
</template>

<script>
  export default {
    props: {
      header: {
        type: String,
        default: undefined
      },
      loading: {
        type: Boolean,
        default: false
      },
      subHeader: {
        type: String,
        default: undefined
      }
    }
  }
</script>
