<template>
  <v-app>
    <v-main>
      <OperateCalendar>
      </OperateCalendar>
    </v-main>
  </v-app>
</template>

<script>
  import Playground from './Playground'
  import Month from "./Month";
  import OperateCalendar from './OperateCalendar'
  import CreateEvent from './CreateEvent'

  export default {
    components: {
      Playground,
      Month,
      OperateCalendar,
      CreateEvent
    },
  }
</script>
