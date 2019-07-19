<template>
  <a
    :class="classes"
    :href="`#${internalId}`"
    class="mr-2 d-inline-flex core-goto text--primary"
    @click.prevent="onClick"
  >
    <v-hover v-model="hover">
      <v-layout align-center>
        <slot />
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
  import { mapMutations } from 'vuex'

  export default {
    props: {
      id: {
        type: String,
        default: ''
      }
    },

    data: () => ({
      hover: false,
      internalId: '',
      tag: null,
    }),

    computed: {
      classes () {
        return {
          [`tag-${this.tag}`]: true,
          'mb-2': ['H1', 'H2', 'H3'].includes(this.tag),
        }
      },
    },

    mounted () {
      const goto = this.$el.querySelector('.markdown')
      // this link isn't resolving

      if (!goto) return

      const element = goto.firstChild

      this.tag = element.tagName
      this.internalId = this.id || kebabCase(element.innerText)

      if (['H1', 'H2'].includes(this.tag)) {
        this.pushToc({
          id: this.internalId,
          text: element.innerText
        })
      }
    },

    methods: {
      ...mapMutations('documentation', ['pushToc']),
      onClick (e) {
        e.stopPropagation()

        this.$router.push(`#${this.internalId}`)
      },
    },
  }
</script>

<style lang="sass">
.core-goto
  position: relative
  text-decoration: none

  &.tag-H1 .v-icon
    font-size: 32px

  &.tag-H2 .v-icon
    font-size: 24px

  &.tag-H3 .v-icon
    font-size: 16px

  .v-icon
    position: absolute
    left: 100%
    top: 50%
    transform: translateY(-50%)
    vertical-align: middle

  p
    margin-bottom: 0 !important
</style>
