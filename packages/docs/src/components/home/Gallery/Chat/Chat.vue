<template>
  <v-container class="bg-surface-light overflow-hidden" height="100%" fluid>
    <v-row class="fill-height">
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
      avatar: 'https://cdn.vuetifyjs.com/docs/images/team/john.png',
      name: 'John Leider',
      date: '2025-08-05',
      message: `I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
    },
    {
      id: 2,
      avatar: 'https://cdn.vuetifyjs.com/docs/images/team/heather.jpg',
      name: 'Heather Leider',
      date: '2025-08-05',
      message: `&mdash; Wish I could come, but I'm out of town this weekend.`,
    },
    {
      id: 3,
      avatar: 'https://cdn.vuetifyjs.com/docs/images/team/kael.jpg',
      name: 'Kael Watts-Deuchar',
      date: '2025-08-05',
      message: 'Do you have Paris recommendations? Have you ever been?',
    },
    {
      id: 12,
      avatar: 'https://cdn.vuetifyjs.com/docs/images/team/ishin.jpg',
      name: 'Ishan Subedi',
      date: '2025-08-05',
      message: 'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
    },
    {
      id: 4,
      avatar: 'https://cdn.vuetifyjs.com/docs/images/team/andrew.jpg',
      name: 'Andrew Henry',
      date: '2025-08-05',
      message: 'Have any ideas about what we should get Heidi for her birthday?',
    },
    {
      id: 5,
      avatar: 'https://cdn.vuetifyjs.com/docs/images/team/blaine.jpg',
      name: 'Blaine Landowski',
      date: '2025-08-05',
      message: 'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
    },
    {
      id: 8,
      avatar: 'https://cdn.vuetifyjs.com/docs/images/team/jacek.png',
      name: 'Jacek Czarniecki',
      date: '2025-08-05',
      message: 'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
    },
    {
      id: 9,
      avatar: 'https://cdn.vuetifyjs.com/docs/images/team/shubham.jpg',
      name: 'Shubham Patlani',
      date: '2025-08-05',
      message: 'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
    },
    {
      id: 11,
      avatar: 'https://cdn.vuetifyjs.com/docs/images/team/henry.jpg',
      name: 'Henry Aviles',
      date: '2025-08-05',
      message: 'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
    },
    {
      id: 13,
      avatar: 'https://cdn.vuetifyjs.com/docs/images/team/andrei.jpg',
      name: 'Andrei Elkin',
      date: '2025-08-05',
      message: 'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
    },
    {
      id: 14,
      avatar: 'https://cdn.vuetifyjs.com/docs/images/team/jc.jpg',
      name: 'JC Puno',
      date: '2025-08-05',
      message: 'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
    },
    {
      id: 15,
      avatar: 'https://cdn.vuetifyjs.com/docs/images/team/abe.png',
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
