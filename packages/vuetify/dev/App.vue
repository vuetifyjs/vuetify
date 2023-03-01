<template>
    <!-- You can set the show All to true, to see all the available playgrounds, otherwise you can show each playground alone as shown on the next comment -->
  <v-app>
    <template v-if="showAll">
      <Playground1 />
      <Playground2 />
      <Playground3 />
      <Playground4 />
      <Playground5 />
      <Playground6 />
      <Playground7 />
      <Playground8 />
      <Playground9 />
      <Playground10 />
  </template>
  <template v-else>
    <!-- To view each Playground alone, just update the playground number -->
    <playground1 />
  </template>

  </v-app>
</template>

<script>

  import Playground1 from './Playground.stepper_props.vue'
  import Playground2 from './Playground.stepper_slots.vue'
  import Playground3 from './Playground.stepper_all.vue'
  import Playground4 from './Playground.stepper_mix.vue'
  import Playground5 from './Playground.stepper_docs_1.vue'
  import Playground6 from './Playground.stepper_docs_2.vue'
  import Playground7 from './Playground.stepper_docs_3.vue'
  import Playground8 from './Playground.stepper_docs_4.vue'
  import Playground9 from './Playground.stepper_docs_5.vue'
  import Playground10 from './Playground.stepper_docs_6.vue'
import Playground from '../../docs/src/examples/v-treeview/playground.vue'

  export default {
    name: 'App',
    data: () => ({
      showAll:false,
    }),
    components: {
      Playground1,
      Playground2,
      Playground3,
      Playground4,
      Playground5,
      Playground6,
      Playground7,
      Playground8,
      Playground9,
      Playground10
    },
  }
</script>
