<style lang="stylus" scoped>
  .componentDoc
      .container
        max-width: 768px
      h1, h2, h3, h4, h5, h6
        color #1867c0
      h1
        font-size 32px
        font-weight 400
      h2
        font-size 24px
        font-weight 400

      p
        font-size 16px
        line-height 2em
        font-weight 300
        max-width 540px
    section
      margin 4em 0

    section#definition
      p
        font-size 16px
        line-height 2em
        font-weight 300
        max-width 540px
</style>


<template lang="pug">
  .componentDoc
    v-container
      section#definition
        h1 Buttons
        p The v-btn component replaces the standard html button with a material design theme and a multitude of options. Any color helper class can be used to alter the background or text color.

      section#usage
        h2 Usage
        p inline component examples rendered here without container

      section#api
        h2 Component API
        p API table component here

      section#examples
        h2 Examples
        p Variant deep-dive examples here
</template>

<script>
  export default {

  }
</script>
