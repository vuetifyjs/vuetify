<template>
  <component
    :is="component"
    :class="classes"
  >
    <a
      v-if="href"
      :href="href"
      class="text-decoration-none text-right text-md-left"
      style="user-select: none"
      aria-hidden="true"
      @click="onClick"
    >
      #
    </a>

    <slot>
      {{ content }}
    </slot>
  </component>
</template>

<script>
  // Utilities
  import { computed, defineComponent } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  const HEADING_CLASSES = {
    1: 'text-h3 text-sm-h3 mb-4',
    2: 'text-h4 text-sm-h4 mb-4 mt-4',
    3: 'text-h5 mb-2',
    4: 'text-h6 mb-2',
    5: 'text-subtitle-1 font-weight-medium mb-2',
  }

  export default defineComponent({
    name: 'Heading',

    props: {
      content: String,
      href: String,
      level: String,
    },

    setup (props) {
      const router = useRouter()
      const route = useRoute()

      function onClick (e) {
        e.preventDefault()

        const hash = props.href

        if (route.hash === hash) return

        router.push({ hash })
        document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
        // this.$vuetify.goTo(hash)
      }

      const component = computed(() => `h${props.level}`)
      const classes = computed(() => ['v-heading', HEADING_CLASSES[props.level]])

      return { component, classes, onClick }
    },
  })
</script>

<style lang="sass">
  .v-heading
    display: inline-block
    position: relative

    > a
      bottom: 0
      display: inline-block
      left: 0
      margin: 0 -.7em
      position: absolute
      right: 0
      top: 0

      &:not(:hover):not(:focus)
        opacity: 0
</style>
