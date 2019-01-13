<template lang="pug">
  v-container(fluid)
    v-layout(row)
      v-flex(xs4)
        v-slider(prepend-icon="fas fa-arrows-alt-h" v-model="selected" min="0" max="24" thumb-label)
      v-flex(xs6 offset-xs1)
        v-card(v-bind:class="{ [`elevation-${selected}`]: true }")
          v-card-text
            p.text-xs-center.ma-0 Elevation {{ selected }}
</template>

<script>
  export default {
    data () {
      return {
        selected: 0
      }
    }
  }
</script>
