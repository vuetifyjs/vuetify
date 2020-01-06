<template>
  <div>
    Testing
  </div>
</template>

<script>
  import { VuetifyInject } from 'vuetify'

  export default {
    setup () {
      const vuetify = VuetifyInject()

      console.log(vuetify)

      return {}
    },
  }
</script>
