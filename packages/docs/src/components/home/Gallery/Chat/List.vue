<template>
  <v-card
    class="d-flex flex-column"
    elevation="0"
    height="100%"
    rounded="xl"
    weight="100%"
    border
  >
    <v-card-title>
      <div>Chat</div>

      <v-text-field
        v-model="searchTerm"
        autocomplete="off"
        bg-color="surface-light"
        class="mt-5"
        placeholder="Search"
        prepend-inner-icon="mdi-magnify"
        rounded="xl"
        variant="solo"
        flat
        hide-details
      />
    </v-card-title>

    <v-card-text
      v-if="filteredChats.length"
      class="d-flex flex-column overflow-hidden px-0"
    >
      <v-list lines="three" item-props>
        <v-list-item
          v-for="chat in filteredChats"
          :key="chat.id"
          :active="selectedChat?.id === chat.id"
          :prepend-avatar="chat.avatar"
          :subtitle="chat.message"
          :title="chat.name"
          @click="emit('selectChat', chat)"
        >
          <template #subtitle="{ subtitle }">
            <div>
              {{ subtitle }} <span class="text-grey">{{ chat.date }}</span>
            </div>
          </template>
        </v-list-item>
      </v-list>
    </v-card-text>

    <v-card-text v-else class="py-5 text-center"> No chats found </v-card-text>
  </v-card>
</template>

<script setup>
  import { computed, ref } from 'vue'

  const props = defineProps({
    chats: {
      type: Array,
      required: true,
    },
    selectedChat: {
      type: [Object, null],
      required: true,
    },
  })

  const emit = defineEmits(['selectChat'])

  const searchTerm = ref('')

  const filteredChats = computed(() => props.chats.filter(chat => chat.name.toLowerCase().includes(searchTerm.value.toLowerCase())))
</script>
