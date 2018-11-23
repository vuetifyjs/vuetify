<template>
  <a
    :href="`#${id}`"
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
            size="16"
          >
            mdi-pound
          </v-icon>
        </v-fade-transition>
      </v-layout>
    </v-hover>
  </a>
</template>

<script>
  export default {
    data: () => ({
      hover: false,
      id: ''
    }),

    mounted () {
      const goto = this.$el.querySelector('[id]')

      if (!goto) return

      this.id = goto.id
    },

    methods: {
      onClick (e) {
        e.stopPropagation()
        const href = `#${this.id}`

        this.$vuetify.goTo(href, { offset: -80 })
        this.$router.push(href)
      }
    }
  }
</script>

<style lang="stylus">
.core-goto {
  text-decoration: none;

  p {
    margin-bottom: 0 !important;
  }
}
</style>
