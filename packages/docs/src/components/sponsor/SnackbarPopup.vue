<template>
  <v-snackbar
    v-model="showSnackbar"
    class="mb-10"
    color="background"
    rounded="xl"
    timeout="-1"
  >
    <template #default>
      <div class="pa-4">
        <div class="d-flex flex-row justify-space-between w-100 mb-6">
          <h5 class="text-h5">Love Vuetify?</h5>
        </div>
        <p>
          This project is maintained in the spare time of our core team.
          If it’s useful to you or your team, consider sponsoring to
          help support ongoing development and new features.</p>
      </div>
    </template>

    <template #actions>
      <div class="d-flex flex-column pa-4">
        <v-btn
          v-for="link in supportLinks"
          :key="link.name"
          :href="link.link"
          :text="link.name"
          class="mb-2"
          color="primary"
          target="_blank"
          variant="tonal"
          @click="showSnackbar=false"
        />
        <v-btn @click="showSnackbar=false">Maybe Next Time</v-btn>
      </div>
    </template>

  </v-snackbar>
</template>
<script setup lang="ts">
  const one = useOneStore()
  const showSnackbar = ref(!one.isSubscriber)

  const supportLinks =
    [{
       name: 'Discord',
       link: 'https://discord.com/servers/vuetify-340160225338195969',
     }, {
       name: 'Github',
       link: 'https://github.com/sponsors/johnleider',
     },
     {
       name: 'Open Collective',
       link: 'https://opencollective.com/vuetify',
     }]
</script>
