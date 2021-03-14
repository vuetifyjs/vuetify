<template>
  <Playground />
</template>

<script>
  import Playground from './Playground'
  import { provideIntl } from 'vue-intl'
  import { intl } from './intl'

  export default {
    name: 'App',
    components: {
      Playground,
    },
    setup () {
      provideIntl(intl)
    }
  }
</script>
