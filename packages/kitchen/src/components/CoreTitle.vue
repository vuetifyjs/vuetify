<template>
  <v-flex :id="id" align-self-center>
    <h4 class="title grey--text mb-4 mt-5">
      <slot>Title</slot>
      <a
        :href="`#${id}`"
        class="primary--text mb-3"
        style="text-decoration: none"
        @click.stop.prevent="$router.push(`#${id}`)"
      >
        #
      </a>
    </h4>
  </v-flex>
</template>

<script>
  export default {
    name: 'CoreTitle',

    computed: {
      id () {
        return this.$slots.default[0].text.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/\s+/g, '-').replace('+', '-').replace(/\s:/g, '-').toLowerCase()
      }
    }
  }
</script>
