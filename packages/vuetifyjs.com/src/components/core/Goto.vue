<template>
  <a
    :href="id"
    class="mr-2 d-inline-flex core-goto text--primary"
    @click.prevent="onClick"
  >
    <v-layout align-center>
      <v-hover>
        <v-icon
          slot-scope="{ hover }"
          :color="hover ? 'primary' : ''"
          class="mr-2"
        >
          mdi-pound
        </v-icon>
      </v-hover>
      <slot />
    </v-layout>
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

    data: () => ({
      hover: false
    }),

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
