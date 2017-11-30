<template lang="pug">
  page
    template(slot-scope="{ namespace }")
      section#classes
        section-head(:value="`${namespace}.classesHeader`")
        section-text(:value="`${namespace}.classesText`")

      section#colors
        v-container(fluid).pa-0
          v-layout(row wrap)
            v-flex(xs6 sm6 md4 lg3 v-for="color in colors" v-bind:key="color")
              v-card(v-bind:color="color" height="100px" tile)
                v-card-text
                  h3 {{ color }}
              v-card(
                v-for="n in [4,3,2,1]"
                v-bind:color="color + ' lighten-' + n"
                class="black--text"
                v-bind:key="n"
                tile
              )
                v-card-text {{ color }} lighten-{{ n }}
              v-card(
                v-for="n in 4"
                v-bind:color="color + ' darken-' + n"
                v-bind:key="n"
                class="white--text"
                tile
              )
                v-card-text {{ color }} darken-{{ n }}
              v-card(
                v-for="n in 4"
                v-bind:color="color + ' accent-' + n"
                v-if="['grey', 'blue-grey', 'brown'].indexOf(color) === -1"
                class="black--text"
                v-bind:key="n"
                tile
              )
                v-card-text {{ color }} accent-{{ n }}

      section#color-pack
        section-head(:value="`${namespace}.colorPackHeader`")
        section-text(:value="`${namespace}.colorPackText`")

        h3.py-3 {{ $t('Style.Colors.colorPackSubHeader1') }}
        section-text(:value="`${namespace}.colorPackSubText1`")

        h3.py-3 {{ $t('Style.Colors.colorPackSubHeader2') }}
        section-text(:value="`${namespace}.colorPackSubText2`")

</template>

<script>
  export default {
    data: () => ({
      colors: [
        'red', 'pink', 'purple', 'deep-purple',
        'indigo', 'blue', 'light-blue', 'cyan',
        'teal', 'green', 'light-green', 'lime',
        'yellow', 'amber', 'orange', 'deep-orange',
        'brown', 'blue-grey', 'grey'
      ],
      types: ['darken', 'lighten', 'accent']
    })
  }
</script>

<style lang="stylus">
  #colors-page #colors
    .flex
      margin: 1rem 0

    .card
      color: #fff
      font-weight: 500
      letter-spacing: .5px
      padding: 1rem
      border-radius: 0

      .card__text
        h3
          color: #fff
          align-self: flex-start
          font-size: 1.5rem
          margin: 0

    .card__text
      padding: 0
</style>
