<template>
  <v-container max-width="800">
    <v-row class="justify-space-around">
      <v-col cols="12" sm="auto">
        <v-tabs
          :items="example1"
          direction="vertical"
          slider-color="purple"
          spaced="end"
        ></v-tabs>
      </v-col>

      <v-col cols="12" sm="auto">
        <v-tabs
          direction="vertical"
          slider-color="primary"
          spaced="start"
        >
          <v-tab
            v-for="(tab, i) in example2"
            :key="tab"
            :prepend-icon="`mdi-numeric-${i + 1}-box`"
            :text="tab"
            spaced="start"
            width="200"
          ></v-tab>
        </v-tabs>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  const example1 = [
    { text: 'My Files', appendIcon: 'mdi-folder', width: 250 },
    { text: 'Shared with me', appendIcon: 'mdi-account-multiple', width: 250 },
    { text: 'Starred', appendIcon: 'mdi-star', width: 250 },
    { text: 'Recent', appendIcon: 'mdi-update', width: 250 },
    { text: 'Backups', appendIcon: 'mdi-cloud-upload', width: 250 },
  ]

  const example2 = [
    'Profile',
    'Settings',
    'Security',
    'Compliance',
    'Statistics',
  ]
</script>

<script>
  export default {
    data () {
      return {
        example1: [
          { text: 'My Files', appendIcon: 'mdi-folder', width: 250 },
          { text: 'Shared with me', appendIcon: 'mdi-account-multiple', width: 250 },
          { text: 'Starred', appendIcon: 'mdi-star', width: 250 },
          { text: 'Recent', appendIcon: 'mdi-update', width: 250 },
          { text: 'Backups', appendIcon: 'mdi-cloud-upload', width: 250 },
        ],
        example2: [
          'Profile',
          'Settings',
          'Security',
          'Compliance',
          'Statistics',
        ],
      }
    },
  }
</script>
