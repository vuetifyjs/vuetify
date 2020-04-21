<template>
  <a
    class="d-block v-markdown--link"
    href="https://jooble.org/jobs-web-developer"
    target="_blank"
    @click="$ga.event('jooble', 'click')"
  >
    Looking for Web Developer jobs? Try Jooble<i class="v-icon mdi mdi-open-in-new" />
  </a>
</template>

<script>
  export default { name: 'AdJooble' }
</script>
