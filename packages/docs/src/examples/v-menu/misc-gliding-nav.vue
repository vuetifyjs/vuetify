<template>
  <v-layout>
    <v-app-bar density="compact" title="My Website">
      <v-btn
        v-for="group in groups"
        :key="group.name"
        :text="group.name"
        append-icon="mdi-chevron-down"
        @focus="activate($event, group)"
        @mouseenter="activate($event, group)"
        @mouseleave="delayedClose()"
      ></v-btn>
    </v-app-bar>

    <v-menu
      v-model="menu"
      :activator="activator"
      :content-class="{ 'menu-move-transition': menuMoving }"
      location="bottom end"
      offset="4"
      viewport-margin="0"
    >
      <v-list
        :items="menuItems"
        class="py-1"
        density="compact"
        rounded="lg"
        border
        @mouseenter="onListEnter()"
        @mouseleave="delayedClose()"
      >
        <template v-slot:append>
          <v-icon icon="mdi-arrow-top-right"></v-icon>
        </template>
      </v-list>
    </v-menu>

    <v-main>
      <!-- Main Content -->
    </v-main>
  </v-layout>
</template>

<script setup>
  import { ref } from 'vue'

  const menu = ref(false)
  const activator = ref()
  const menuItems = ref([])
  const menuMoving = ref(false)

  const groups = [
    {
      name: 'Home',
      submenu: [
        { title: 'Welcome', value: 'welcome' },
        { title: 'Updates', value: 'latest' },
      ],
    },
    {
      name: 'About Me',
      submenu: [
        { title: 'Bio', value: 'bio' },
        { title: 'Resume', value: 'resume' },
        { title: 'Skills', value: 'skills' },
      ],
    },
    {
      name: 'Blog',
      submenu: [
        { title: 'All Posts', value: 'all-posts' },
        { title: 'Tech', value: 'tech-posts' },
        { title: 'Life', value: 'life-posts' },
      ],
    },
  ]

  let closeTimeout = -1
  let movingTimeout = -1
  function activate ({ currentTarget }, group) {
    clearTimeout(closeTimeout)

    clearTimeout(movingTimeout)
    if (menu.value) {
      menuMoving.value = true
      movingTimeout = window.setTimeout(() => menuMoving.value = false, 300)
    }

    activator.value = currentTarget
    menuItems.value = group.submenu
    menu.value = true
  }

  function onListEnter () {
    clearTimeout(closeTimeout)
  }

  function delayedClose () {
    clearTimeout(closeTimeout)
    closeTimeout = window.setTimeout(() => menu.value = false, 600)
  }
</script>

<style>
  .menu-move-transition {
    transition: 0.2s ease-out;
    transition-property: left, top;
  }
</style>
