<template>
  <div class="d-flex justify-center flex-wrap ga-6">
    <div>
      <div class="text-body-small opacity-70 mb-2">Menu with submenu</div>

      <v-card
        height="200"
        image="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
        width="300"
      >
        <v-menu activator="parent" context-menu>
          <v-list
            class="pa-1 pt-0 border rounded-lg"
            density="compact"
            min-width="240"
            prepend-gap="12"
          >
            <template v-for="(action, index) in actions" :key="index">
              <v-divider v-if="action.divider" class="mt-1"></v-divider>

              <v-list-item
                v-else-if="action.title === 'Arrange'"
                :title="action.title"
                append-icon="mdi-menu-right"
                class="mt-1 px-3 rounded"
                min-height="32"
                link
                @click.stop
              >
                <template v-slot:prepend>
                  <v-icon :icon="action.icon" size="small"></v-icon>
                </template>

                <v-menu
                  :open-on-focus="false"
                  activator="parent"
                  open-on-hover
                  submenu
                >
                  <v-list
                    class="pa-1 pt-0 border rounded-lg"
                    density="compact"
                    min-width="240"
                    prepend-gap="12"
                  >
                    <v-list-item
                      v-for="item in arrange"
                      :key="item.title"
                      :title="item.title"
                      class="mt-1 px-3 rounded"
                      min-height="32"
                      link
                    >
                      <template v-slot:prepend>
                        <v-icon :icon="item.icon" size="small"></v-icon>
                      </template>

                      <template v-slot:append>
                        <v-hotkey :keys="item.keys" variant="text"></v-hotkey>
                      </template>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-list-item>

              <v-list-item
                v-else
                :base-color="action.color"
                :title="action.title"
                class="mt-1 px-3 rounded"
                min-height="32"
                link
              >
                <template v-slot:prepend>
                  <v-icon :icon="action.icon" size="small"></v-icon>
                </template>

                <template v-slot:append>
                  <v-hotkey :keys="action.keys" variant="text"></v-hotkey>
                </template>
              </v-list-item>
            </template>
          </v-list>
        </v-menu>
      </v-card>
    </div>

    <div>
      <div class="text-body-small opacity-70 mb-2">One menu for all images</div>

      <div
        class="ga-1"
        style="display: grid; grid-template: repeat(2, minmax(0, 1fr)) / repeat(2, minmax(0, 1fr)); width: 300px; height: 200px"
      >
        <div
          v-for="(image, index) in images"
          :key="image"
          :class="{ 'pa-1': menu && active === index }"
          :style="menu && active === index ? 'outline: 2px solid rgb(var(--v-theme-primary)); outline-offset: -2px' : undefined"
          class="rounded-lg"
          @contextmenu.prevent="onContextMenu($event, index)"
        >
          <v-img
            :src="`https://cdn.vuetifyjs.com/images/cards/${image}`"
            height="100%"
            rounded="lg"
            cover
          ></v-img>
        </div>
      </div>
    </div>

    <v-menu v-model="menu" :target="target">
      <v-list class="pa-1 pt-0 border rounded-lg" density="compact">
        <v-list-item
          v-for="item in items"
          :key="item"
          :title="item"
          class="mt-1 rounded"
          min-height="32"
          link
        ></v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script setup>
  import { shallowRef } from 'vue'

  const menu = shallowRef(false)
  const target = shallowRef([0, 0])
  const active = shallowRef(null)

  const actions = [
    { title: 'Copy', icon: 'mdi-content-copy', keys: 'cmd+c' },
    { title: 'Paste here', icon: 'mdi-content-paste', keys: 'cmd+v' },
    { title: 'Duplicate', icon: 'mdi-content-duplicate', keys: 'cmd+d' },
    { divider: true },
    { title: 'Arrange', icon: 'mdi-layers-outline' },
    { title: 'Hide', icon: 'mdi-eye-off', keys: 'cmd+shift+h' },
    { title: 'Lock', icon: 'mdi-lock-outline', keys: 'cmd+shift+l' },
    { divider: true },
    { title: 'Delete', icon: 'mdi-delete-outline', keys: 'Delete', color: 'error' },
  ]
  const arrange = [
    { title: 'Bring to front', icon: 'mdi-arrange-bring-to-front', keys: ']' },
    { title: 'Bring forward', icon: 'mdi-arrange-bring-forward', keys: 'cmd+]' },
    { title: 'Send backward', icon: 'mdi-arrange-send-backward', keys: 'cmd+[' },
    { title: 'Send to back', icon: 'mdi-arrange-send-to-back', keys: '[' },
  ]
  const images = ['docks.jpg', 'house.jpg', 'road.jpg', 'plane.jpg']
  const items = ['Open', 'Copy link', 'Download']

  async function onContextMenu (e, index) {
    if (menu.value) {
      menu.value = false
      if (active.value === index) return
      await new Promise(resolve => setTimeout(resolve, 100))
    }
    target.value = [e.clientX, e.clientY]
    active.value = index
    menu.value = true
  }
</script>

<script>
  export default {
    data: () => ({
      menu: false,
      target: [0, 0],
      active: null,
      actions: [
        { title: 'Copy', icon: 'mdi-content-copy', keys: 'cmd+c' },
        { title: 'Paste here', icon: 'mdi-content-paste', keys: 'cmd+v' },
        { title: 'Duplicate', icon: 'mdi-content-duplicate', keys: 'cmd+d' },
        { divider: true },
        { title: 'Arrange', icon: 'mdi-layers-outline' },
        { title: 'Hide', icon: 'mdi-eye-off', keys: 'cmd+shift+h' },
        { title: 'Lock', icon: 'mdi-lock-outline', keys: 'cmd+shift+l' },
        { divider: true },
        { title: 'Delete', icon: 'mdi-delete-outline', keys: 'Delete', color: 'error' },
      ],
      arrange: [
        { title: 'Bring to front', icon: 'mdi-arrange-bring-to-front', keys: ']' },
        { title: 'Bring forward', icon: 'mdi-arrange-bring-forward', keys: 'cmd+]' },
        { title: 'Send backward', icon: 'mdi-arrange-send-backward', keys: 'cmd+[' },
        { title: 'Send to back', icon: 'mdi-arrange-send-to-back', keys: '[' },
      ],
      images: ['docks.jpg', 'house.jpg', 'road.jpg', 'plane.jpg'],
      items: ['Open', 'Copy link', 'Download'],
    }),

    methods: {
      async onContextMenu (e, index) {
        if (this.menu) {
          this.menu = false
          if (this.active === index) return
          await new Promise(resolve => setTimeout(resolve, 100))
        }
        this.target = [e.clientX, e.clientY]
        this.active = index
        this.menu = true
      },
    },
  }
</script>
