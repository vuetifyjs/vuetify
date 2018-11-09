<template>
  <a
    :href="id"
    class="mr-2 d-inline-flex core-goto text--primary"
    @click.prevent="onClick"
  >
    <v-hover>
      <v-layout
        slot-scope="{ hover }"
        align-center
      >
        <slot />
        <v-slide-x-reverse-transition mode="out-in">
          <v-icon
            v-if="hover"
            color="primary"
            class="ml-2"
            size="16"
          >
            mdi-pound
          </v-icon>
        </v-slide-x-reverse-transition>
      </v-layout>
    </v-hover>
  </a>
</template>

<script>
  export default {
    props: {
      id: {
        type: String,
        required: true
      }
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
