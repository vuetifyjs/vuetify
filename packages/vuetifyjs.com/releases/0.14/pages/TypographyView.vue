<template lang="pug">
  doc-view(id="typography-view")
    v-layout(row wrap)
      v-flex(xs12 sm8 md12)
        section-def
          dt(slot="title") {{ doc.title }}
          dd(slot="desc") {{ doc.desc }}
      ad
    section
      section-header Examples
      div(class="component-example")
        div(class="component-example__container")
          dl(class="headings")
            dt(class="primary") h1
            dd
              div(class="display-4 grey--text text--darken-1") Light 112sp
              strong display-4
              span font-weight 300
            dt(class="primary") h2
            dd
              div(class="display-3 grey--text text--darken-1") Regular 56sp
              strong display-3
              span font-weight 400
            dt(class="primary") h3
            dd
              div(class="display-2 grey--text text--darken-1") Regular 45sp
              strong display-2
              span font-weight 400
            dt(class="primary") h4
            dd
              div(class="display-1 grey--text text--darken-1") Regular 34sp
              strong display-1
              span font-weight 400
            dt(class="primary") h5
            dd
              div(class="headline grey--text text--darken-1") Regular 24sp
              strong headline
              span font-weight 400
            dt(class="primary") h6
            dd
              div(class="title grey--text text--darken-1") Medium 20sp
              strong title
              span font-weight 500
            dt(class="primary") s
            dd
              div(class="subheading grey--text text--darken-1") Regular 16sp
              strong subheading
              span font-weight 400
            dt(class="primary") b2
            dd
              div(class="body-2 grey--text text--darken-1") Medium 14sp
              strong body-2
              span font-weight 500
            dt(class="primary") b1
            dd
              div(class="body-1 grey--text text--darken-1") Regular 14sp
              strong body-1
              span font-weight 400
            dt(class="primary") c
            dd
              div(class="caption grey--text text--darken-1") Regular 12sp
              strong caption
              span font-weight 400
</template>

<script>
  export default {
    name: 'typography-view',

    data () {
      return {
        doc: {
          title: 'Typography',
          desc: 'The typography of an application is just as important as its functionality. Vuetify.js uses the Material Design spec Roboto Font. Each heading size also has a corresponding helper class to style other elements the same.'
        },
        lorem: 'Lorem ipsum dolor sit amet, brute iriure accusata ne mea. Eos suavitate referrentur ad, te duo agam libris qualisque, utroque quaestio accommodare no qui. Et percipit laboramus usu, no invidunt verterem nominati mel. Dolorem ancillae an mei, ut putant invenire splendide mel, ea nec propriae adipisci. Ignota salutandi accusamus in sed, et per malis fuisset, qui id ludus appareat.'
      }
    }
  }
</script>

<style lang="stylus">
  #typography-view
    .component-example__container
      > div, dl
        width: 100%
        &:after
          content:""
          display: table
          clear: both

      .headings
        dt, dd
          float: left
          
        dt
          width: 32px
          height: 32px
          border-radius: 50%
          text-align: center
          line-height: 32px
          color: #fff
          clear: both
        
        dd
          margin: 0 0 3rem 2rem
          
          > div
            margin-bottom: 16px
            
          strong
            margin-right: 16px
</style>