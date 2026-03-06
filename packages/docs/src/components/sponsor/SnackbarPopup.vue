<template>
  <v-snackbar
    v-model="showSnackbar"
    color="background"
    content-class="mb-10 border-sm border-primary border-opacity-25"
    rounded="xl"
    timeout="-1"
  >
    <template #default>
      <div class="pl-4">
        <div class="d-flex flex-row justify-space-between w-100 mb-6">
          <h5 class="my-0 text-headline-medium">Love Vuetify?</h5>
        </div>
        <p style="text-wrap: pretty;">
          This project is maintained in the spare time of our core team.
          If it is useful to you or your team, consider sponsoring to
          help support ongoing development and new features.
        </p>
      </div>
    </template>

    <template #actions>
      <div class="d-flex flex-column py-6 pr-4">
        <v-btn
          v-for="link in supportLinks"
          :key="link.title"
          :append-icon="link.icon"
          :href="link.link"
          class="mb-2 px-3"
          color="primary"
          height="60"
          min-width="220"
          spaced="end"
          target="_blank"
          variant="tonal"
          @click="showSnackbar = false"
        >
          <span>
            <div class="mb-1">{{ link.title }}</div>
            <small class="text-medium-emphasis">{{ link.subtitle }}</small>
          </span>
          <template #append>
            <v-icon size="24" />
          </template>
        </v-btn>
        <v-btn class="text-none border" text="Dismiss" @click="dismiss" />
      </div>
    </template>

  </v-snackbar>
</template>
<script setup lang="ts">
  import { track } from 'swetrix'

  const one = useOneStore()
  const showSnackbar = shallowRef(false)
  const dismissed = shallowRef(false)
  const route = useRoute()
  watch(() => route.path, () => {
    if (
      !dismissed.value &&
      !one.isSubscriber &&
      Math.random() > 0.5 &&
      Number(window.localStorage.getItem('userSessions')) >= 5 &&
      !window.localStorage.getItem('sponsorPopupDismissed')
    ) {
      showSnackbar.value = true
      track({
        ev: 'sponsorPopupShown',
      })
    }
  })

  function dismiss () {
    showSnackbar.value = false
    dismissed.value = true
    window.localStorage.setItem('sponsorPopupDismissed', new Date().toISOString())
    track({
      ev: 'sponsorPopupDismissed',
    })
  }

  const supportLinks =
    [{
      title: 'Github',
      subtitle: 'Become a sponsor',
      link: 'https://github.com/sponsors/johnleider',
      icon: 'mdi-github',
    }, {
      title: 'Open Collective',
      subtitle: 'Monthly donation',
      link: 'https://opencollective.com/vuetify',
      icon: 'svg:M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12c2.54 0 4.894-.79 6.834-2.135l-3.107-3.109a7.715 7.715 0 1 1 0-13.512l3.107-3.109A11.943 11.943 0 0 0 12 0zm9.865 5.166l-3.109 3.107A7.67 7.67 0 0 1 19.715 12a7.682 7.682 0 0 1-.959 3.727l3.109 3.107A11.943 11.943 0 0 0 24 12c0-2.54-.79-4.894-2.135-6.834z',
    }, {
      title: 'Discord',
      subtitle: 'Sponsor channel',
      link: 'https://discord.com/servers/vuetify-340160225338195969',
      icon: 'mdi-discord',
    }]
</script>
