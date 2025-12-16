<template>
  <v-defaults-provider :defaults="{ VBtn: { variant: 'outlined', color: '#eee' } }">
    <v-sheet class="overflow-hidden" max-width="700" rounded="xl">
      <v-carousel
        v-model="currentIndex"
        direction="vertical"
        height="400"
        progress="red"
        vertical-arrows="left"
        vertical-delimiters="right"
        hide-delimiter-background
      >
        <v-carousel-item
          v-for="(item, i) in items"
          :key="i"
          :src="item.src"
          cover
        ></v-carousel-item>

        <v-overlay
          :scrim="false"
          content-class="w-100 h-100 d-flex flex-column align-center justify-space-between pointer-pass-through py-3"
          contained
          model-value
          no-click-animation
          persistent
        >
          <v-scroll-x-transition mode="out-in" appear>
            <v-sheet
              :key="currentIndex"
              rounded="xl"
            >
              <v-list-item
                :prepend-avatar="`https://randomuser.me/api/portraits/${currentItem.avatarId}.jpg`"
                :subtitle="currentItem.subtitle"
                :title="currentItem.authorName"
                class="pa-1 pr-6"
              ></v-list-item>
            </v-sheet>
          </v-scroll-x-transition>
          <v-chip
            :text="`${ currentIndex + 1 } / ${items.length }`"
            color="#eee"
            size="small"
            variant="flat"
          ></v-chip>
        </v-overlay>
      </v-carousel>
    </v-sheet>
  </v-defaults-provider>
</template>

<script setup>
  import { shallowRef, toRef } from 'vue'

  const currentIndex = shallowRef(0)
  const currentItem = toRef(() => items[currentIndex.value])
  const items = [
    {
      authorName: 'Bettany Nichols',
      avatarId: 'women/31',
      subtitle: '31k followers',
      src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
    },
    {
      authorName: 'Greg Kovalsky',
      avatarId: 'men/61',
      subtitle: '412 followers',
      src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
    },
    {
      authorName: 'Emma Kathleen',
      avatarId: 'women/34',
      subtitle: '521 followers',
      src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
    },
    {
      authorName: 'Anthony McKenzie',
      avatarId: 'men/78',
      subtitle: '6k followers',
      src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
    },
  ]
</script>

<script>
  export default {
    data () {
      return {
        currentIndex: 0,
        items: [
          {
            authorName: 'Bettany Nichols',
            avatarId: 'women/31',
            subtitle: '31k followers',
            src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
          },
          {
            authorName: 'Greg Kovalsky',
            avatarId: 'men/61',
            subtitle: '412 followers',
            src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
          },
          {
            authorName: 'Emma Kathleen',
            avatarId: 'women/34',
            subtitle: '521 followers',
            src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
          },
          {
            authorName: 'Anthony McKenzie',
            avatarId: 'men/78',
            subtitle: '6k followers',
            src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
          },
        ],
      }
    },
    computed: {
      currentItem () {
        return this.items[this.currentIndex]
      },
    },
  }
</script>
<example-meta lang="json">
  {
    "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v3.0---Official-Vuetify-3-UI-Kit?node-id=2224-45589&t=tC3y53U3XKPv8ZyJ-4"
  }
</example-meta>