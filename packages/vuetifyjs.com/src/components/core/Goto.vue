<template>
  <a
    :href="goto"
    class="mr-2 d-inline-flex"
  >
    <v-hover>
      <v-icon
        slot-scope="{ hover }"
        :color="hover ? 'primary' : ''"
        :href="href"
        @click="$vuetify.goTo(goto)"
      >
        mdi-pound
      </v-icon>
    </v-hover>
  </a>
</template>

<script>
  export default {
    props: {
      href: {
        type: String,
        required: true
      }
    },

    computed: {
      goto () {
        return `#${this.href}`
      }
    }
  }
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
