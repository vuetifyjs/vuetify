<template>
  <v-layout>
    <v-app-bar density="compact" title="My Website">
      <template v-slot:prepend>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
      </template>
      <v-btn
        v-for="page in pages"
        :key="page.name"
        :text="page.name"
        append-icon="mdi-chevron-down"
        @mouseenter="register($event, page.name)"
      ></v-btn>
    </v-app-bar>

    <v-menu :activator="activator" location="bottom">
      <v-list :items="subMenu"></v-list>
    </v-menu>

    <v-main>
      <!-- Main Content -->
    </v-main>
  </v-layout>
</template>

<script setup>
  import { ref } from 'vue'

  const activator = ref(null)
  const subMenu = ref([])

  const pages = [
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

  function register (event, name) {
    activator.value = event.currentTarget

    const page = pages.find(page => page.name === name)

    if (page) {
      subMenu.value = page.submenu
    }
  }
</script>

<script>
  export default {
    data: () => ({
      pages: [
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
      ],
    }),

    methods: {
      register (event, name) {
        activator.value = event.currentTarget

        const page = pages.find(page => page.name === name)

        if (page) {
          subMenu.value = page.submenu
        }
      },
    },
  }
</script>
