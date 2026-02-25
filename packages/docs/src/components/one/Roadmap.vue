<template>
  <v-container class="pa-4 mx-auto text-center" max-width="900" fluid>
    <h2 class="text-headline-large text-md-display-medium font-weight-bold mb-2 text-center">
      What's Coming
    </h2>

    <p class="text-body-large text-medium-emphasis mb-8 text-center">
      Your subscription funds these features. Subscribers get early access.
    </p>

    <v-row>
      <v-col v-for="item in roadmap" :key="item.title" cols="12" md="4">
        <v-card class="pa-4 h-100 pb-6" elevation="0" rounded="xl" border>
          <v-icon :icon="item.icon" class="mb-4" color="primary" size="40" />

          <div class="text-body-large font-weight-bold mb-2">
            {{ item.title }}
          </div>

          <p class="text-body-medium text-medium-emphasis mb-0">
            {{ item.description }}
          </p>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
  const roadmap = [
    {
      icon: 'mdi-application-brackets-outline',
      title: 'Embeddable Playgrounds',
      description: 'Embed playgrounds directly in your own documentation. Share interactive examples anywhere.',
    },
    {
      icon: 'mdi-account-multiple',
      title: 'Team Shared Workspaces',
      description: 'Share private bins and playgrounds with your team. Centralized collaboration and usage analytics.',
    },
    {
      icon: 'mdi-lightning-bolt',
      title: 'Real-Time Collaboration',
      description: 'Share live updates on bins and playgrounds. See changes instantly as teammates edit.',
    },
  ]
</script>
