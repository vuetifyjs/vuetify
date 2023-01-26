<template>
  <v-app>
    <v-main>
      <Playground>
      </Playground>
    </v-main>
  </v-app>
</template>

<script>
  import Playground from './Playground'
  import Month from "./Month";
  import OperateCalendar from './OperateCalendar'

  export default {
    components: {
      Playground,
      Month,
      OperateCalendar
    },
  }
</script>
