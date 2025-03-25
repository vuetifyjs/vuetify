<template>
  <v-container class="pa-md-12 text-center">
    <v-sheet
      class="d-inline-flex ga-1 pa-4 align-center justify-center mx-auto"
      color="surface-light"
      rounded="pill"
    >
      <v-card
        :rounded="!mic ? 'lg' : 'xl'"
        class="overflow-visible d-flex align-center"
        color="surface-variant"
        height="48"
        variant="tonal"
        width="88"
      >
        <v-icon-btn
          v-model:active="micOptions"
          :active-variant="!mic ? 'flat' : 'text'"
          :base-variant="!mic ? 'flat' : 'text'"
          :color="!mic ? 'error' : ''"
          :rounded="!mic ? 'lg' : 'circle'"
          active-icon="mdi-chevron-down"
          icon="mdi-chevron-up"
          size="48"
          v-ripple
        ></v-icon-btn>

        <v-icon-btn
          v-model:active="mic"
          :rounded="!mic ? 'lg' : 'circle'"
          active-color=""
          active-icon="mdi-microphone"
          active-variant="tonal"
          base-variant="flat"
          class="ms-n2"
          color="#f9dedc"
          icon="mdi-microphone-off"
          size="48"
          v-ripple
          v-tooltip:top="{
            text: mic ? 'Turn off microphone' : 'Turn on microphone',
            openDelay: 300,
          }"
        ></v-icon-btn>
      </v-card>

      <v-card
        :rounded="!video ? 'lg' : 'xl'"
        class="overflow-visible d-flex align-center"
        color="surface-variant"
        height="48"
        variant="tonal"
        width="88"
      >
        <v-icon-btn
          v-model:active="videoOptions"
          :active-variant="!video ? 'flat' : 'text'"
          :base-variant="!video ? 'flat' : 'text'"
          :color="!video ? 'error' : ''"
          :rounded="!video ? 'lg' : 'circle'"
          active-icon="mdi-chevron-down"
          icon="mdi-chevron-up"
          size="48"
          v-ripple
        ></v-icon-btn>

        <v-icon-btn
          v-model:active="video"
          :rounded="!video ? 'lg' : 'circle'"
          active-color=""
          active-icon="mdi-video-outline"
          active-variant="tonal"
          base-variant="flat"
          class="ms-n2"
          color="#f9dedc"
          icon="mdi-video-off"
          size="48"
          v-ripple
          v-tooltip:top="{
            text: video ? 'Turn off camera' : 'Turn on camera',
            openDelay: 300,
          }"
        ></v-icon-btn>
      </v-card>

      <v-icon-btn
        v-model:active="caption"
        :class="!caption ? 'mx-1' : undefined"
        :rounded="!caption ? 'circle' : 'lg'"
        :width="caption ? 56 : 48"
        active-color="#9bbbef"
        active-icon="mdi-closed-caption"
        active-variant="flat"
        height="48"
        icon="mdi-closed-caption-outline"
        v-ripple
        v-tooltip:top="{
          text: 'Turn on captions',
          openDelay: 300,
        }"
      ></v-icon-btn>

      <v-icon-btn
        v-model:active="emoji"
        :class="!emoji ? 'mx-1' : undefined"
        :rounded="!emoji ? 'circle' : 'lg'"
        :width="emoji ? 56 : 48"
        active-color="#9bbbef"
        active-icon="mdi-emoticon"
        active-variant="flat"
        base-variant="tonal"
        height="48"
        icon="mdi-emoticon-outline"
        v-ripple
        v-tooltip:top="{
          text: 'Send a reaction',
          openDelay: 300,
        }"
      ></v-icon-btn>

      <v-icon-btn
        base-variant="tonal"
        class="mx-1"
        color="#d1d1d1"
        icon="mdi-arrow-up-bold-box-outline"
        size="48"
        v-ripple
        v-tooltip:top="{
          text: 'Share screen',
          openDelay: 300,
        }"
        @click="onClick"
      ></v-icon-btn>

      <v-icon-btn
        v-model:active="raised"
        :class="!raised ? 'mx-1' : undefined"
        :rounded="!raised ? 'circle' : 'lg'"
        :width="raised ? 56 : 48"
        active-color="#9bbbef"
        active-icon="mdi-hand-back-right"
        height="48"
        icon="mdi-hand-back-right-outline"
        v-ripple
        v-tooltip:top="{
          text: 'Raise hand',
          openDelay: 300,
        }"
      ></v-icon-btn>

      <v-icon-btn
        color="#d1d1d1"
        height="48"
        icon="mdi-dots-vertical"
        rounded="xl"
        v-ripple
        v-tooltip:top="{
          text: 'More options',
          openDelay: 300,
        }"
      ></v-icon-btn>

      <v-icon-btn
        color="error"
        height="48"
        icon="mdi-phone-outline"
        rounded="xl"
        width="72"
        v-ripple
        v-tooltip:top="{
          text: 'Leave call',
          openDelay: 300,
        }"
      ></v-icon-btn>
    </v-sheet>
  </v-container>
</template>

<script setup>
  import { shallowRef } from 'vue'

  const caption = shallowRef(false)
  const emoji = shallowRef(false)
  const raised = shallowRef(false)
  const mic = shallowRef(true)
  const micOptions = shallowRef(false)
  const video = shallowRef(true)
  const videoOptions = shallowRef(false)

  function onClick () {
    alert('Sharing your screen')
  }
</script>

<script>
  import { shallowRef } from 'vue'

  export default {
    data () {
      return {
        caption: shallowRef(false),
        emoji: shallowRef(false),
        raised: shallowRef(false),
        mic: shallowRef(true),
        micOptions: shallowRef(false),
        video: shallowRef(true),
        videoOptions: shallowRef(false),
      }
    },
    methods: {
      onClick () {
        alert('Sharing your screen')
      },
    },
  }
</script>
