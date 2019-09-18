<template>
  <v-container fluid class="text-center">
    <v-row
      justify="space-around"
    >
      <div>
        <v-btn
          class="mx-1"
          color="primary"
          @click="messages++"
        >
          Send Message
        </v-btn>
        <v-btn
          class="mx-1"
          color="error"
          @click="messages = 0"
        >
          Clear Notifications
        </v-btn>
      </div>
      <v-badge
        color="green"
        overlap
      >
        <template v-slot:badge>
          <span v-if="messages > 0">{{ messages }}</span>
        </template>
        <v-icon large>mail</v-icon>
      </v-badge>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        show: false,
        messages: 0,
      }
    },
  }
</script>
