<template>
  <router-view />
</template>

<script lang="ts">
  // Utilities
  import { defineComponent, onBeforeMount } from 'vue'
  import { useHead } from '@vueuse/head'
  import { useI18n } from 'vue-i18n'
  import { useRouter } from 'vue-router'

  export default defineComponent({
    name: 'App',

    setup () {
      onBeforeMount(() => {
        const router = useRouter()
        const { locale } = useI18n()

        // https://github.com/vueuse/head
        useHead({
          title: 'Vuetify',
          meta: [
            { name: 'description', content: 'Vite Docs Test', layout: 'home' },
          ],
        })

        // set current route lang if root
        const currentRoute = router.currentRoute.value
        if (currentRoute.path === '/') {
          router.replace(`/${locale.value}`)
        }
      })
    },
  })
</script>

<style lang="sass">
  a:not(:hover)
    text-decoration: none

  code
    padding: 0.1em 0.2em
    border-radius: 4px
    background: rgba(var(--v-border-color), var(--v-idle-opacity))

  ul
    list-style-type: none

  p
    margin-bottom: 1rem

    a, a:visited
      color: rgb(var(--v-theme-primary))

  h1
    + p
      font-size: 1.25rem
      font-weight: 300

  .v-theme--light,
  .v-theme--dark
    .v-bar--underline
      border-width: 0 0 thin 0
      border-style: solid

      &.v-theme--light
        border-bottom-color: #0000001F !important

      &.v-theme--dark
        border-bottom-color: #FFFFFF1F !important
</style>
