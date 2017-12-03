<template lang="pug">
  .view(id="elevation-view")
    v-layout(row)
      v-flex(xs12 sm8 md12)
        section-def
          dt(slot="title") Elevation
          dd(slot="desc") The elevation helpers allow you to control relative depth, or distance, between two surfaces along the z-axis.
      ad
    section
      h6.title Variants
      p.mb-5 There's a total of 25 elevation levels. You can set an element's elevation by using the class <code>elevation-N</code>, where N is a integer between 0-24 corresponding to the desired elevation.

      h6.title Playground
      v-container(fluid)
        v-layout(row)
          v-flex(xs4)
            v-slider(prepend-icon="fa-arrows-h" v-model="selected" min="0" max="24" thumb-label)
          v-flex(xs6 offset-xs1)
            v-card(v-bind:class="{ [`elevation-${selected}`]: true }")
              v-card-text
                p.text-xs-center.ma-0 Elevation {{ selected }}
</template>

<script>
  export default {
    name: 'elevation-view',

    data () {
      return {
        selected: 0
      }
    }
  }
</script>

<style lang="stylus">
  #display-view
    .toolbar
      height: 64px
</style>
