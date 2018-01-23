<template lang="pug">
  v-container.text-xs-center#store-header
    v-layout
      v-flex(xs12)
        img(
          src="/static/doc-images/logo.svg"
          height="125px"
          alt="Vuetify"
        ).mb-3

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
      subHeader: {
        type: String,
        default: undefined
      }
    }
  }
</script>
