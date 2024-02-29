<template>
  <v-card class="pa-8 d-flex justify-center flex-wrap" theme="dark">
    <v-container class="text-center">
      <v-row justify="center" dense>
        <v-col cols="12">
          <v-img
            class="mx-auto mt-12 mb-16"
            max-height="140"
            max-width="240"
            src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-dark-text.svg"
          ></v-img>
        </v-col>

        <v-col cols="12">
          <v-autocomplete
            :items="items"
            append-inner-icon="mdi-microphone"
            class="mx-auto"
            density="comfortable"
            menu-icon=""
            placeholder="Search Google or type a URL"
            prepend-inner-icon="mdi-magnify"
            style="max-width: 350px;"
            theme="light"
            variant="solo"
            auto-select-first
            item-props
            rounded
          ></v-autocomplete>
        </v-col>

        <v-col
          v-for="(shortcut, i) in shortcuts"
          :key="i"
          cols="auto"
        >
          <v-card
            :href="shortcut.href"
            class="pa-4"
            rel="noopener noreferer"
            target="_blank"
            width="112"
            flat
          >
            <v-avatar :icon="shortcut.icon" class="mb-2" color="white" variant="tonal"></v-avatar>

            <div class="text-caption text-truncate" v-text="shortcut.title"></div>
          </v-card>
        </v-col>

        <v-col cols="auto">
          <v-dialog v-model="dialog" max-width="500">
            <template v-slot:activator="{ props }">
              <v-card v-bind="props" class="pa-4" width="112" flat>

                <v-avatar class="mb-2" color="white" icon="mdi-plus" variant="tonal"></v-avatar>

                <div class="text-caption text-truncate">Add shortcut</div>
              </v-card>
            </template>

            <v-card rounded="lg" title="Add shortcut">
              <template v-slot:text>
                <v-label class="text-caption">Name</v-label>

                <v-text-field density="compact" variant="solo-filled" flat></v-text-field>

                <v-label class="text-caption">URL</v-label>

                <v-text-field density="compact" variant="solo-filled" flat></v-text-field>
              </template>

              <div class="py-4 px-5 text-end">
                <v-btn
                  class="text-none me-2"
                  color="blue"
                  text="Cancel"
                  variant="text"
                  border
                  @click="dialog = false"
                ></v-btn>

                <v-btn
                  class="text-none"
                  color="blue"
                  text="Done"
                  variant="flat"
                  @click="dialog = false"
                ></v-btn>
              </div>
            </v-card>
          </v-dialog>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script setup>
  import { ref } from 'vue'

  const items = [
    {
      prependIcon: 'mdi-clock-outline',
      title: 'recipe with chicken',
    },
    {
      prependIcon: 'mdi-clock-outline',
      title: 'best hiking trails near me',
    },
    {
      prependIcon: 'mdi-clock-outline',
      title: 'how to learn a new language',
    },
    {
      prependIcon: 'mdi-clock-outline',
      title: 'DIY home organization ideas',
    },
    {
      prependIcon: 'mdi-clock-outline',
      title: 'latest fashion trends',
    },
  ]
  const shortcuts = [
    {
      icon: 'mdi-github',
      title: 'Master ',
      href: 'https://github.com/vuetifyjs/vuetify',
    },
    {
      icon: 'mdi-github',
      title: 'Dev',
      href: 'https://github.com/vuetifyjs/vuetify/tree/dev',
    },
    {
      icon: 'mdi-github',
      title: 'Stable',
      href: 'https://github.com/vuetifyjs/vuetify/tree/v2-stable',
    },
    {
      icon: 'mdi-github',
      title: 'My Pull Requests',
      href: 'https://github.com/vuetifyjs/vuetify/pulls/johnleider',
    },
  ]

  const dialog = ref(false)
</script>

<script>
  export default {
    data: () => ({
      dialog: false,
      items: [
        {
          prependIcon: 'mdi-clock-outline',
          title: 'recipe with chicken',
        },
        {
          prependIcon: 'mdi-clock-outline',
          title: 'best hiking trails near me',
        },
        {
          prependIcon: 'mdi-clock-outline',
          title: 'how to learn a new language',
        },
        {
          prependIcon: 'mdi-clock-outline',
          title: 'DIY home organization ideas',
        },
        {
          prependIcon: 'mdi-clock-outline',
          title: 'latest fashion trends',
        },
      ],
      shortcuts: [
        {
          icon: 'mdi-github',
          title: 'Master ',
          href: 'https://github.com/vuetifyjs/vuetify',
        },
        {
          icon: 'mdi-github',
          title: 'Dev',
          href: 'https://github.com/vuetifyjs/vuetify/tree/dev',
        },
        {
          icon: 'mdi-github',
          title: 'Stable',
          href: 'https://github.com/vuetifyjs/vuetify/tree/v2-stable',
        },
        {
          icon: 'mdi-github',
          title: 'My Pull Requests',
          href: 'https://github.com/vuetifyjs/vuetify/pulls/johnleider',
        },
      ],
    }),
  }
</script>
