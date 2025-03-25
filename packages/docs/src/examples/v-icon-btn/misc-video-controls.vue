<template>
  <v-container class="pa-md-12 text-center">
    <v-sheet
      class="d-inline-flex ga-1 pa-4 align-center justify-center mx-auto"
      color="surface-light"
      rounded="pill"
    >
      <v-sheet
        :rounded="!mic ? 'lg' : 'xl'"
        class="overflow-visible d-flex align-center"
        color="surface"
        height="48"
        width="88"
        flat
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
          hide-overlay
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
        ></v-icon-btn>
      </v-sheet>

      <v-sheet
        :rounded="!video ? 'lg' : 'xl'"
        class="overflow-visible d-flex align-center"
        color="surface"
        height="48"
        width="88"
        flat
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
          hide-overlay
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
        ></v-icon-btn>
      </v-sheet>

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
      ></v-icon-btn>

      <v-icon-btn
        v-model:active="emoji"
        :class="!emoji ? 'mx-1' : undefined"
        :rounded="!emoji ? 'circle' : 'lg'"
        :width="emoji ? 56 : 48"
        active-color="#9bbbef"
        active-icon="mdi-emoticon"
        height="48"
        icon="mdi-emoticon-outline"
      ></v-icon-btn>

      <v-icon-btn
        v-model:active="share"
        :class="!share ? 'mx-1' : undefined"
        :rounded="!share ? 'circle' : 'lg'"
        :width="share ? 56 : 48"
        active-color="#9bbbef"
        active-icon="mdi-arrow-up-bold-box"
        height="48"
        icon="mdi-arrow-up-bold-box-outline"
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
      ></v-icon-btn>

      <v-icon-btn
        height="48"
        icon="mdi-dots-vertical"
        rounded="xl"
        variant="tonal"
      >
        <v-icon></v-icon>

        <v-menu activator="parent" location="top end" offset="4">
          <v-list rounded="lg" slim>
            <v-list-item
              prepend-icon="mdi-radiobox-marked"
              title="Manage recording"
              link
            ></v-list-item>

            <v-divider class="my-2"></v-divider>

            <v-list-item
              prepend-icon="mdi-view-grid-outline"
              title="Change layout"
              link
            ></v-list-item>

            <v-list-item
              prepend-icon="mdi-fullscreen"
              title="Full screen"
              link
            ></v-list-item>

            <v-list-item
              prepend-icon="mdi-share-variant-outline"
              title="Share screen"
              link
            ></v-list-item>

            <v-divider class="my-2"></v-divider>

            <v-list-item
              prepend-icon="mdi-cog-outline"
              title="Settings"
              link
            ></v-list-item>
          </v-list>
        </v-menu>
      </v-icon-btn>

      <v-icon-btn
        v-model:active="hangup"
        active-variant="outlined"
        base-variant="flat"
        color="error"
        height="48"
        icon="mdi-phone-hangup-outline"
        rounded="xl"
        width="72"
      ></v-icon-btn>
    </v-sheet>
  </v-container>
</template>

<script setup>
  import { shallowRef } from 'vue'

  const caption = shallowRef(false)
  const emoji = shallowRef(false)
  const hangup = shallowRef(false)
  const mic = shallowRef(true)
  const micOptions = shallowRef(false)
  const raised = shallowRef(false)
  const share = shallowRef(false)
  const video = shallowRef(true)
  const videoOptions = shallowRef(false)

  function onClick () {
    console.log('Sharing your screen')
  }
</script>

<script>
  export default {
    data () {
      return {
        caption: false,
        emoji: false,
        raised: false,
        share: false,
        mic: true,
        micOptions: false,
        video: true,
        videoOptions: false,
      }
    },
    methods: {
      onClick () {
        console.log('Sharing your screen')
      },
    },
  }
</script>
