<template>
  <component
    :is="component"
    v-if="component"
    v-intersect.once="onIntersect"
    v-bind="$attrs"
    v-on="$listeners"
  />
</template>

<script>
  // Mixins
  import codepen from '@/mixins/codepen'

  export default {
    name: 'VueFile',

    mixins: [codepen],

    inheritAttrs: false,

    props: {
      file: {
        type: String,
        required: true,
      },
    },

    data: () => ({
      component: undefined,
    }),

    async mounted () {
      await this.importComponent()
      this.$emit('loaded', {
        component: this.component,
        pen: this.pen,
      })
    },

    methods: {
      importComponent () {
        return import(
          /* webpackChunkName: "examples" */
          /* webpackMode: "lazy-once" */
          `../examples/${this.file}.vue`
        )
          .then(comp => (this.component = comp.default))
      },
      importTemplate () {
        return import(
          /* webpackChunkName: "examples-source" */
          /* webpackMode: "lazy-once" */
          `!raw-loader!../examples/${this.file}.vue`
        )
          .then(comp => this.boot(comp.default))
      },
      onIntersect (_, __, isIntersecting) {
        if (!isIntersecting) return

        this.importTemplate()
      },
    },
  }
</script>
