<template lang="pug">
  .view(id="elevation-view")
    v-layout(column-xs row-sm)
      v-flex(xs12 sm8 md12)
        section-def
          dt(slot="title") Elevation
          dd(slot="desc") The elevation helpers allow you to control relative depth, or distance, between two surfaces along the z-axis.
      ad
    section
      h6 Variants
      p.mb-5 There's a total of 25 elevation levels. You can set an element's elevation by using the class <code>elevation-N</code>, where N is a integer between 0-24 corresponding to the desired elevation.

      h6 Playground
      v-container(fluid)
        v-layout(row)
          v-flex(xs4)
            v-select(
              label="Select elevation"
              v-bind:items="elevations"
              v-model="selected"
              item-text="text"
              item-value="class"
              return-object
            )
          v-flex(xs6 offset-xs1)
            v-card(v-bind:class="example.classes")
              v-card-text
                p.text-xs-center.ma-0 {{ example.elevation }}
</template>

<script>
  export default {
    name: 'elevation-view',

    data () {
      return {
        example: {
          classes: [],
          elevation: ''
        },
        elevations: Array.from(Array(25).keys()).map(i => ({ text: `elevation-${i}`, class: `class="elevation-${i}"` }) ),
        selected: { text: `elevation-1`, class: `class="elevation-1"` }
      }
    },

    watch: {
      selected () {
        this.example = {
          classes: [this.selected.text],
          elevation: this.selected.class
        }
      }
    },

    mounted () {
      this.selected = this.elevations[1]
    }
  }
</script>

<style lang="stylus">
  #display-view
    .toolbar
      height: 64px
</style>
