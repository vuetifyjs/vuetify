<template lang="pug">
  div(
    class="tabs"
    v-bind:id="id"
  )
    slot
</template>

<script>
  import Eventable from '../../mixins/eventable'

  export default {
    name: 'tabs'
  }
</script>