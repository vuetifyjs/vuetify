<template lang="pug">
  views-doc#typography-page
    template(slot-scope="{ namespace }")
      section WIP
      section#font-size
        v-card(
          color="teal"
          dark
          flat
        ).pa-5.mb-3
          v-layout(
            v-for="(text, i) in texts"
            :key="`${i}-text`"
            align-center
            justify-start
          ).mb-3
            div(style="min-width: 85px;").mr-3
              code .{{ text[0] }}
            v-flex(:class="`${text[0]}`") {{ text[1] }}

      section#font-weights
        v-card(
          flat
        ).pa-5
          div(
            v-for="(weight, i) in weights"
            :key="`${i}-weight`"
          ).mb-3
            div(:class="`${weight[1]} my-2 display-2`") {{ weight[0] }}
            kbd .{{ weight[1] }}
          div(
            v-for="(weight, i) in italics"
            :key="`${i}-italic`"
          ).mb-3
            div(:class="`${weight[1]} my-2 display-2 font-italic`") {{ weight[0] }}
            kbd .{{ weight[1] }}.font-italic

      section#typeface.hidden-sm-and-down
        v-card(
          flat
        ).pa-5
          v-layout(
            align-center
            justify-space-between
            wrap
            v-for="(type, i) in typefaces"
            :key="i"
          ).my-3
            v-flex(:class="type[1]" v-html="type[0]")
            v-flex.hidden-md-and-down.text-xs-right.text-uppercase.grey--text {{ type[2] }}
</template>

<script>
  export default {
    data: () => ({
      texts: [
        ['display-4', 'Light 112sp', '300'],
        ['display-3', 'Regular 56sp', '400'],
        ['display-2', 'Regular 45sp', '400'],
        ['display-1', 'Regular 34sp', '400'],
        ['headline', 'Regular 24sp', '400'],
        ['title', 'Medium 20sp', '500'],
        ['subheading', 'Regular 16sp', '400'],
        ['body-2', 'Medium 14sp', '500'],
        ['body-1', 'Regular 14sp', '400'],
        ['caption', 'Regular 12sp', '400']
      ],
      weights: [
        ['Roboto Thin', 'font-weight-thin', '100'],
        ['Roboto Light', 'font-weight-light', '300'],
        ['Roboto Regular', 'font-weight-regular', '400'],
        ['Roboto Medium', 'font-weight-medium', '500'],
        ['Roboto Bold', 'font-weight-bold', '700'],
        ['Roboto Black', 'font-weight-black', '900']
      ],
      italics: [
        ['Roboto Thin Italic', 'font-weight-thin', '100'],
        ['Roboto Light Italic', 'font-weight-light', '300'],
        ['Roboto Regular Italic', 'font-weight-regular', '400'],
        ['Roboto Medium Italic', 'font-weight-medium', '500'],
        ['Roboto Bold Italic', 'font-weight-bold', '700'],
        ['Roboto Black Italic', 'font-weight-black', '900']
      ],
      typefaces: [
        ['Quantum Mechanics', 'display-3', 'Regular'],
        ['6.626069x10<sup class="display-2 font-weight-light mt-4">-34</sup>', 'd-flex align-start display-4 font-weight-thin', 'Thin'],
        ['One hundred percent cotton bond', 'display-1 font-italic font-weight-bold', 'Bold italic'],
        ['Quasiparticles', 'display-4 font-weight-bold', 'Bold'],
        ['It became the non-relativistic limit of quantum field theory', 'title', 'Condensed'],
        ['PAPERCRAFT', 'display-4 font-weight-light font-italic', 'Light italic'],
        ['Probabilistic wave - particle wavefunction orbital path', 'title font-italic font-weight-medium', 'Medium italic'],
        ['ENTANGLED', 'display-4 font-weight-black', 'Black'],
        ['Cardstock 80lb ultra-bright orange', 'display-1 font-weight-medium', 'Medium'],
        ['STATIONERY', 'display-4 font-weight-thin', 'Thin'],
        ['POSITION, MOMENTUM & SPIN', 'display-2 font-weight-light', 'Condensed Light']
      ]
    })
  }
</script>

<style lang="stylus">
  #typography-page
    #typeface
      div
        word-break: break-all
</style>
