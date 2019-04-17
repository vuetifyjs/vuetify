<template>
  <v-container class="fill-height">
    <v-row
      align="center"
      justify="center"
    >
      <v-date-picker
        v-model="date"
        v-bind="{
          ...attrs,
          events,
        }"
      />
    </v-row>
  </v-container>
</template>

<script>
  export default {
    props: {
      attrs: {
        type: Object,
        default: () => ({}),
      },
    },
    data: () => ({
      date: '2019-12-01',
    }),
    computed: {
      events () {
        return this.attrs.events ? (date) => {
          const [,, day] = date.split('-')
          if ([12, 17, 28].includes(parseInt(day, 10))) return true
          if ([1, 19, 22].includes(parseInt(day, 10))) return ['red', '#00f']
          return false
        } : () => false
      }
    }
  }
</script>
