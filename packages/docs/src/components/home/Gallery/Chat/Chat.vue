<template>
  <v-container class="bg-surface-light overflow-hidden" height="100%" fluid>
    <v-row class="fill-height my-0">
      <template v-if="!mobile">
        <v-col class="fill-height" cols="4">
          <VChatList
            :chats="chats"
            :selected-chat="selectedChat"
            @select-chat="selectChat"
          />
        </v-col>

        <v-col class="fill-height" cols="8">
          <VChatDetail :chat="selectedChat" :messages="messages" />
        </v-col>
      </template>

      <template v-else>
        <v-col v-if="selectedChat" class="fill-height" cols="12">
          <VChatDetail
            :chat="selectedChat"
            :messages="messages"
            @back="selectedChat = null"
          />
        </v-col>

        <v-col v-else class="fill-height" cols="12">
          <VChatList
            :chats="chats"
            :selected-chat="selectedChat"
            @select-chat="selectChat"
          />
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>

<script setup>
  import { ref } from 'vue'
  import { useDisplay } from 'vuetify'
  import VChatList from '@/components/home/Gallery/Chat/List.vue'
  import VChatDetail from '@/components/home/Gallery/Chat/Detail.vue'

  const chats = [
    {
      id: 1,
      avatar: 'https://avatars.githubusercontent.com/u/9064066?v=4',
      name: 'John Leider',
      date: '2025-08-05',
      message: `I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
    },
    {
      id: 2,
      avatar: 'https://avatars.githubusercontent.com/u/58872083?v=4',
      name: 'Heather Leider',
      date: '2025-08-05',
      message: `&mdash; Wish I could come, but I'm out of town this weekend.`,
    },
    {
      id: 3,
      avatar: 'https://avatars.githubusercontent.com/u/16421948?v=4',
      name: 'Kael Watts-Deuchar',
      date: '2025-08-05',
      message: 'Do you have Paris recommendations? Have you ever been?',
    },
    {
      id: 12,
      avatar: 'https://avatars.githubusercontent.com/u/17315781',
      name: 'Ishan Subedi',
      date: '2025-08-05',
      message: 'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
    },
    {
      id: 4,
      avatar: 'https://avatars.githubusercontent.com/u/27827979?v=4',
      name: 'Andrew Henry',
      date: '2025-08-05',
      message: 'Have any ideas about what we should get Heidi for her birthday?',
    },
    {
      id: 5,
      avatar: 'https://avatars.githubusercontent.com/u/42892508?v=4',
      name: 'Blaine Landowski',
      date: '2025-08-05',
      message: 'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
    },
    {
      id: 8,
      avatar: 'https://avatars.githubusercontent.com/u/20162853?s=96&v=4',
      name: 'Jacek Czarniecki',
      date: '2025-08-05',
      message: 'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
    },
    {
      id: 9,
      avatar: 'https://avatars.githubusercontent.com/u/11574195',
      name: 'Shubham Patlani',
      date: '2025-08-05',
      message: 'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
    },
    {
      id: 10,
      avatar: 'https://avatars.githubusercontent.com/u/47291268',
      name: 'Isaias Briones',
      date: '2025-08-05',
      message: 'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
    },
    {
      id: 11,
      avatar: 'https://avatars.githubusercontent.com/u/108551827?s=96&v=4',
      name: 'Henry Aviles',
      date: '2025-08-05',
      message: 'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
    },
    {
      id: 13,
      avatar: 'https://avatars.githubusercontent.com/u/11289484?s=96&v=4',
      name: 'Andrei Elkin',
      date: '2025-08-05',
      message: 'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
    },
    {
      id: 14,
      avatar: 'https://avatars.githubusercontent.com/u/37642320?s=96&v=4',
      name: 'JC Puno',
      date: '2025-08-05',
      message: 'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
    },
    {
      id: 15,
      avatar: 'https://gravatar.com/avatar/7d1a8ba680ab9d49bd9cdaeff05d0e76',
      name: 'Abdelouahed Oumoussa',
      date: '2025-08-05',
      message: 'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
    },
  ]

  const { mobile } = useDisplay()

  const messages = ref([
    {
      id: 1,
      date: '2025-08-05',
      message: `I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
      isMine: true,
    },
    {
      id: 2,
      date: '2025-08-05',
      message: `Just finished that book you recommended - it was amazing! We should discuss it over coffee sometime.`,
    },
    {
      id: 3,
      date: '2025-08-05',
      message: 'Do you have Paris recommendations? Have you ever been?',
      isMine: true,
    },
    {
      id: 4,
      date: '2025-08-05',
      message: 'Have any ideas about what we should get Heidi for her birthday?',
    },
    {
      id: 5,
      date: '2025-08-05',
      isMine: true,
      message: 'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
    },
    {
      id: 6,
      date: '2025-08-05',
      message: 'Hey, are you going to the concert next weekend? I have an extra ticket!',
    },
    {
      id: 7,
      date: '2025-08-05',
      message: 'Can you send me the notes from yesterday\'s meeting? I had to leave early.',
      isMine: true,
    },
    {
      id: 8,
      date: '2025-08-05',
      message: 'Check out this new recipe I tried - it turned out incredible!',
    },
    {
      id: 9,
      date: '2025-08-05',
      message: 'Remember that cafe we visited last summer? They\'re opening a new location downtown!',
      isMine: true,
    },
    {
      id: 10,
      date: '2025-08-05',
      message: 'Happy birthday! Hope you have an amazing day filled with joy and celebration!',
    },
    {
      id: 11,
      date: '2025-08-05',
      message: 'Did you see the season finale last night? We need to talk about that ending!',
      isMine: true,
    },
    {
      id: 12,
      date: '2025-08-05',
      message: 'Thanks for helping me move yesterday. I owe you dinner!',
    },
    {
      id: 13,
      date: '2025-08-05',
      message: 'My sister just got engaged! Save the date for the wedding in September.',
      isMine: true,
    },
    {
      id: 14,
      date: '2025-08-05',
      message: 'Found this amazing hiking trail yesterday. We should check it out this weekend!',
    },
    {
      id: 15,
      date: '2025-08-05',
      message: 'Can you believe it\'s been 5 years since college? Time flies!',
      isMine: true,
    },
    {
      id: 17,
      date: '2025-08-05',
      message: 'I just saw this place and thought of you!',
    },
  ])

  const selectedChat = ref(chats[0])

  function selectChat (chat) {
    selectedChat.value = chat
    messages.value = messages.value.reverse()
  }
</script>
