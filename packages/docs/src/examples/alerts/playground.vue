<template>
  <v-container class="fill-height">
    <v-row
      align="center"
      justify="center"
    >
      <v-alert
        v-model="alert"
        v-bind="{
          ...attrs,
          color: attrs.color || (attrs.type ? attrs.type : 'blue lighten-2'),
          value: alert
        }"
      >
        Donec elit libero, sodales nec, volutpat a, suscipit non, turpis. In auctor lobortis lacus.
      </v-alert>
      <v-btn
        v-if="!alert"
        color="primary"
        @click="alert = true"
      >
        Reset
      </v-btn>
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
      alert: true,
    }),
  }
</script>
