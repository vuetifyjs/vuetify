<template>
  <v-row>
    <v-switch
      v-model="showMessages"
      label="Show messages"
    ></v-switch>
    <v-input
      :messages="messages"
      hint="I am hint"
      persistent-hint
    >
      Input
    </v-input>
  </v-row>
</template>

<script setup>
  import { computed, ref } from 'vue'

  const showMessages = ref(false)
  const messages = computed(() => {
    return showMessages.value ? ['Message'] : undefined
  })
</script>

<script>
  export default {
    data: () => ({
      showMessages: false,
    }),

    computed: {
      messages () {
        return this.showMessages ? ['Message'] : undefined
      },
    },
  }
</script>
