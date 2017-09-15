<template lang="pug">
  div#home
    v-parallax(
      jumbotron
      height="60vh"
    ).primary
      v-layout(align-center justify-center)
        v-flex.text-xs-center
          v-btn(
            large
            secondary
            to="/getting-started/quick-start"
          ).px-3 Get Started
    section#features
      v-container
        v-card(height="200px")
          v-layout(align-center)
            v-flex(
              xs12 sm6 md4 lg3
              v-for="(feature, i) in features"
              :key="i"
            )
    section#sponsors-and-backers
      v-container
        v-card(height="200px")
    section#support
      v-container
        v-card(height="200px")
    section#callout
      v-container
        v-layout(row wrap)
          v-flex(xs12)
            img(alt="Logo")
    home-footer
</template>

<script>
  import HomeFooter from 'components/HomeFooter'

  export default {
    name: 'home-view',

    components: {
      HomeFooter
    },

    data: () => ({
      features: []
    })
  }
</script>
