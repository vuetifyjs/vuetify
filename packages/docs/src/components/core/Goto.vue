<template>
  <a
    :href="href"
    class="mr-2 d-inline-flex core-goto text--primary"
    @click.prevent="onClick"
  >
    <v-hover v-model="hover">
      <v-layout align-center>
        <doc-markdown v-bind="$attrs"><slot /></doc-markdown>

        <v-fade-transition hide-on-leave>
          <v-icon
            v-if="hover"
            color="primary"
            class="ml-2"
          >
            mdi-pound
          </v-icon>
        </v-fade-transition>
      </v-layout>
    </v-hover>
  </a>
</template>

<script>
  // Utilities
  import kebabCase from 'lodash/kebabCase'
  import {
    mapGetters,
    mapState,
  } from 'vuex'

  export default {
    name: 'CoreGoto',

    inject: {
      id: {
        default: '',
      },
    },

    data: () => ({
      hover: false,
    }),

    computed: {
      ...mapGetters('documentation', [
        'namespace',
        'page',
      ]),
      ...mapState('route', ['params']),
      href () {
        return `#${kebabCase(this.id)}`
      },
    },

    methods: {
      onClick (e) {
        e.stopPropagation()

        this.$router.push(this.href)
      },
    },
  }
</script>

<style lang="sass">
.core-goto
  position: relative
  text-decoration: none

  .v-icon
    position: absolute
    left: 100%
    top: 50%
    transform: translateY(-50%)
    vertical-align: middle

  p
    margin-bottom: 0 !important
</style>
