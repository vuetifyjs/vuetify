<template lang="pug">
  doc-view#typography-page
    template(slot-scope="{ namespace }")
      section#examples
        section-head(:value="`${namespace}.examplesHeader`")
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
              dt
              dd
                div(class="subheading grey--text text--darken-1") Regular 16sp
                strong subheading
                span font-weight 400
              dt
              dd
                div(class="body-2 grey--text text--darken-1") Medium 14sp
                strong body-2
                span font-weight 500
              dt
              dd
                div(class="body-1 grey--text text--darken-1") Regular 14sp
                strong body-1
                span font-weight 400
              dt
              dd
                div(class="caption grey--text text--darken-1") Regular 12sp
                strong caption
                span font-weight 400
</template>

<style lang="stylus">
  #typography-page
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
