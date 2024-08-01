<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="message"
            :append-icon="message ? 'i-mdi:send' : 'i-mdi:microphone'"
            :append-inner-icon="marker ? 'i-mdi:map-marker' : 'i-mdi:map-marker-off'"
            :prepend-icon="icon"
            clear-icon="i-mdi:close-circle"
            label="Message"
            type="text"
            variant="filled"
            clearable
            @click:append="sendMessage"
            @click:append-inner="toggleMarker"
            @click:clear="clearMessage"
            @click:prepend="changeIcon"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script setup>
  import { computed, ref } from 'vue'

  const icons = [
    'i-mdi:emoticon',
    'i-mdi:emoticon-cool',
    'i-mdi:emoticon-dead',
    'i-mdi:emoticon-excited',
    'i-mdi:emoticon-happy',
    'i-mdi:emoticon-neutral',
    'i-mdi:emoticon-sad',
    'i-mdi:emoticon-tongue',
  ]

  const message = ref('Hey!')
  const marker = ref(true)
  const iconIndex = ref(0)

  const icon = computed(() => {
    return icons[iconIndex.value]
  })
  function toggleMarker () {
    marker.value = !marker.value
  }

  function sendMessage () {
    resetIcon()
    clearMessage()
  }
  function clearMessage () {
    message.value = ''
  }
  function resetIcon () {
    iconIndex.value = 0
  }
  function changeIcon () {
    iconIndex.value === icons.length - 1
      ? iconIndex.value = 0
      : iconIndex.value++
  }
</script>

<script>
  export default {
    data: () => ({
      message: 'Hey!',
      marker: true,
      iconIndex: 0,
      icons: [
        'i-mdi:emoticon',
        'i-mdi:emoticon-cool',
        'i-mdi:emoticon-dead',
        'i-mdi:emoticon-excited',
        'i-mdi:emoticon-happy',
        'i-mdi:emoticon-neutral',
        'i-mdi:emoticon-sad',
        'i-mdi:emoticon-tongue',
      ],
    }),

    computed: {
      icon () {
        return this.icons[this.iconIndex]
      },
    },

    methods: {
      toggleMarker () {
        this.marker = !this.marker
      },
      sendMessage () {
        this.resetIcon()
        this.clearMessage()
      },
      clearMessage () {
        this.message = ''
      },
      resetIcon () {
        this.iconIndex = 0
      },
      changeIcon () {
        this.iconIndex === this.icons.length - 1
          ? this.iconIndex = 0
          : this.iconIndex++
      },
    },
  }
</script>
