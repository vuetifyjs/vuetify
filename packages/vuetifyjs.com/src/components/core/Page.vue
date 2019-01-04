<template>
  <v-container
    v-if="structure !== false"
    id="page"
  >
    <template v-if="structure">
      <doc-heading v-if="structure.title">
        {{ structure.title }}
      </doc-heading>
      <div
        v-if="structure.titleText"
        class="mb-5"
      >
        <doc-text
          v-if="structure.titleText"
          class="mb-4"
        >
          {{ structure.titleText }}
        </doc-text>
      </div>

      <component
        v-for="(child, i) in structure.children"
        :key="`${composite}-${i}`"
        :is="getComponent(child.type)"
        :value="child"
      />

      <doc-contribution />
    </template>
  </v-container>
  <not-found v-else />
</template>

<script>
  // Utilities
  import {
    mapState
  } from 'vuex'
  import { getComponent } from '@/util/helpers'

  export default {
    components: {
      NotFound: () => import('@/pages/general/404')
    },

    computed: {
      ...mapState('documentation', ['structure']),
      ...mapState('route', ['params']),
      composite () {
        return `${this.params.namespace}-${this.params.page}`
      }
    },

    mounted () {
      // Wait for page animation
      setTimeout(this.init, 300)
    },

    methods: {
      getComponent,
      init () {
        const sameInternal = this.$el.querySelectorAll('a.markdown--same-internal')

        Array.prototype.forEach.call(sameInternal, el => {
          el.addEventListener('click', this.onSameInternalClick)
        })

        const internal = this.$el.querySelectorAll('a.markdown--internal')

        Array.prototype.forEach.call(internal, el => {
          el.addEventListener('click', this.onInternalClick)
        })
      },
      onSameInternalClick (e) {
        e.preventDefault()

        this.$router.push(e.target)
      },
      onInternalClick (e) {
        e.preventDefault()

        this.$router.push(`/${this.lang}${e.target.getAttribute('href')}`)
      }
    }
  }
</script>

<style>
#page {
  max-width: 1185px;
}
</style>
