<template>
  <v-container class="fill-height">
    <v-row
      align="center"
      justify="center"
    >
      <v-time-picker
        v-model="time"
        v-bind="{
          ...attrs,
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
      time: '13:05',
    }),
  }
</script>
