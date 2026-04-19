<template>
  <v-card
    class="d-flex flex-column"
    elevation="0"
    height="100%"
    rounded="xl"
    weight="100%"
    border
  >
    <v-card-title class="d-flex align-center">
      <v-btn
        v-if="mobile"
        size="small"
        variant="text"
        icon
        @click="emit('back')"
      >
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>

      <v-avatar class="mx-2">
        <v-img :src="chat.avatar" />
      </v-avatar>

      <div class="text-body-large font-weight-medium">
        {{ chat.name }}
      </div>

      <v-spacer />
    </v-card-title>

    <v-divider />

    <v-card-text
      ref="messagesContainer"
      class="d-flex flex-column flex-fill overflow-y-auto"
    >
      <v-spacer />

      <div
        v-for="message in [...props.messages, ...newMessages]"
        :key="message.id"
        class="d-flex my-5"
      >
        <v-spacer v-if="message.isMine" />

        <v-sheet
          :max-width="mobile ? '80%' : '50%'"
          class="d-flex align-center"
        >
          <v-avatar v-if="!message.isMine" class="mr-2" size="x-small">
            <v-img :src="chat.avatar" />
          </v-avatar>

          <v-card
            :color="message.isMine ? 'primary' : 'surface-light'"
            class="rounded-xl px-4 py-2"
            elevation="0"
            border
          >
            {{ message.message }}
          </v-card>
        </v-sheet>
      </div>
    </v-card-text>

    <v-card-actions>
      <v-text-field
        v-model="newMessage"
        bg-color="surface-light"
        placeholder="Type a message"
        rounded="xl"
        variant="solo"
        flat
        hide-details
        @keyup.enter="sendMessage"
      >
        <template #append-inner>
          <v-btn color="primary" icon="mdi-send" @click="sendMessage" />
        </template>
      </v-text-field>
    </v-card-actions>
  </v-card>
</template>

<script setup>
  import { nextTick, onMounted, ref } from 'vue'
  import { useDisplay } from 'vuetify'

  const { mobile } = useDisplay()

  const props = defineProps({
    chat: {
      type: Object,
      required: true,
    },
    messages: {
      type: Array,
      required: true,
    },
  })

  const emit = defineEmits(['back'])

  const messagesContainer = ref(null)
  const newMessage = ref('')
  const newMessages = ref([])

  onMounted(() => {
    scrollToBottomOfChat()
  })

  function scrollToBottomOfChat () {
    const messageListContainerEl = messagesContainer.value.$el

    messageListContainerEl.scrollTop = messageListContainerEl.scrollHeight
  }

  function sendMessage () {
    newMessages.value.push({
      id: Date.now(),
      message: newMessage.value,
      isMine: true,
    })

    newMessage.value = ''

    nextTick(() => {
      scrollToBottomOfChat()
    })
  }
</script>
