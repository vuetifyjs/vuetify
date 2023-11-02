<template>
  <v-container>
    <v-row justify="space-around">
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
        :content="messages"
        :model-value="!!messages"
        color="green"
      >
        <v-icon size="large">
          $vuetify
        </v-icon>
      </v-badge>
    </v-row>
  </v-container>
</template>

<script setup>
  import { ref } from 'vue'

  const messages = ref(0)
</script>

<script>
  export default {
    data () {
      return {
        messages: 0,
      }
    },
  }
</script>
