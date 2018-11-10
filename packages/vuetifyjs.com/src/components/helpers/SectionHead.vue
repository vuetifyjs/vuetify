<template>
  <h2 class="section-head headline primary--text mb-3">
    <translation-translatable :i18n="value">
      <v-layout align-center>
        <helpers-markdown :source="translation" />

        <a
          :href="`#${id}`"
          class="ml-2 mb-1"
          style="text-decoration: none;"
        >
          <v-icon
            color="grey lighten-1"
            @click.prevent.stop="goTo"
          >
            mdi-pound
          </v-icon>
        </a>
      </v-layout>
    </translation-translatable>
  </h2>
</template>

<script>
  import kebabCase from 'lodash/kebabCase'
  import { goTo } from '@/util/helpers'

  export default {
    props: {
      value: {
        type: String,
        default: ''
      }
    },

    computed: {
      id () {
        return kebabCase(this.translation)
      },
      translation () {
        return this.$t(this.value)
      }
    },

    methods: {
      goTo () {
        goTo.call(this, `#${this.id}`)
      }
    }
  }
</script>

<style lang="stylus">
  .section-head p
    margin: 0
</style>
