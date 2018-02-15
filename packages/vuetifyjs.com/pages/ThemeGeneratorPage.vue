<template lang="pug">
  fullscreen-view#theme-generator
    v-btn(
      fab
      top
      right
      fixed
      @click="drawer = !drawer"
      small
      color="indigo"
    ).mt-1.white--text
      v-icon menu
    div.text-xs-center.mb-5
      v-btn(icon :disabled="current === 1" @click="current = current - 1")
        v-icon chevron_left
      span.body-2 {{ current }} / {{ total }}
      v-btn(icon :disabled="current === total" @click="current = current + 1")
        v-icon chevron_right
    component(:is="components[current - 1]" :dark="dark")
    //- div.text-xs-center
    //-   v-btn(flat icon @click="dark = !dark")
    //-     v-icon(:dark="dark") invert_colors
    v-navigation-drawer(
      right
      app
      v-model="drawer"
    )
      v-card(tile flat)
        v-card-text
          v-btn(
            color="blue darken-2 white--text"
            @click.stop="dialog = true"
          ) EXPORT THEME
        v-list
          v-list-tile(
            active-class="grey lighten-4"
            :value="key === active"
            v-for="(value, key, i) in theme"
            :key="i"
            @click="active = key"
          )
            v-list-tile-content
              v-list-tile-title(v-text="key")
            v-list-tile-action
              div(
                :class="['color', key, 'white--text', 'text-xs-center']"
              ).pa-1 {{ value.toUpperCase() }}
      v-card(
        tile
        flat
        height="calc(100% - 332px)"
      ).scroll-y.card--swatches
        swatch-picker(
          class="swatch-picker"
          v-model="color"
          @input="change"
          :palette="palette"
        )
        v-dialog(v-model="dialog" width="300px" content-class="generator-dialog")
          v-card
            v-card-text
              kbd {{ themeExport }}
            v-card-actions
              v-btn(block color="grey white--text" flat @click.native="useNames = !useNames") Use {{ useNames && 'hex codes' || 'names' }}
              v-btn(block color="blue darken-2 white--text" flat @click.native="dialog = false") Close

</template>

<script>
  import colors from 'vuetify/es5/util/colors'
  import Components from '@/components/generator'
  import { Swatches } from 'vue-color'

  export default {
    components: {
      SwatchPicker: Swatches
    },

    data () {
      return {
        active: 'primary',
        backupTheme: {},
        color: '',
        components: Components,
        current: 1,
        dark: false,
        dialog: false,
        drawer: false,
        useNames: false,
        theme: {
          primary: colors.red.base,
          secondary: colors.red.lighten2,
          accent: colors.purple.base,
          error: colors.red.base,
          warning: colors.yellow.base,
          info: colors.blue.base,
          success: colors.green.base
        },
        to: null,
        total: Components.length
      }
    },

    computed: {
      palette () {
        const palette = []

        Object.values(colors).forEach(color => {
          palette.push(Object.values(color))
        })

        return palette
      },
      themeExport () {
        if (this.useNames) {
          const names = Object.keys(this.theme).reduce((e, k) => {
            e[k] = this.findName(this.theme[k])
            return e
          }, {})
          let str = `import colors from 'vuetify/es5/util/colors'\n\n${JSON.stringify(names, null, 2)}`
          str = str.replace(/"(.*)":\s"(.*)"/g, '$1: colors.$2')

          return str
        } else {
          let str = JSON.stringify(this.theme, null, 2)
          str = str.replace(/"(.*)":\s"(.*)"/g, '$1: "$2"')
          return str
        }
      }
    },

    watch: {
      active: {
        handler () {
          this.color = { hex: this.theme[this.active] }
        },
        immediate: true
      },
      theme: {
        handler () {
          this.$vuetify.theme = this.theme
        },
        deep: true
      }
    },

    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.to = from.fullPath
        if (typeof window !== 'undefined') {
          vm.backupTheme = Object.assign({}, vm.$vuetify.theme)
          vm.$vuetify.theme = vm.theme
        }
        setTimeout(() => (vm.drawer = true), 400)
      })
    },

    beforeRouteLeave (to, from, next) {
      this.$vuetify.theme = this.backupTheme
      this.drawer = false
      next()
    },

    methods: {
      change (value) {
        this.theme[this.active] = value.hex
      },
      findName (value) {
        for (const [color, shades] of Object.entries(colors)) {
          for (const [name, hex] of Object.entries(shades)) {
            if (hex === value.toLowerCase()) return `${color}.${name}`
          }
        }
        return value
      }
    }
  }
</script>

<style lang="stylus">
  #theme-generator
    .navigation-drawer
      overflow: hidden

    .card--swatches
      direction: rtl

    .swatch-picker.vc-swatches
      height: 100%
      width: 100%
      box-shadow: none
      overflow-y: auto

      .vc-swatches-box
        display: flex
        flex-wrap: wrap
        margin: 0 auto
        padding: 16px
        direction: ltr

    .component-card
      margin: 1rem;

    .highlight
      background: #ddd

  .generator-dialog
    kbd
      width: 100%
      padding: 1rem

</style>
