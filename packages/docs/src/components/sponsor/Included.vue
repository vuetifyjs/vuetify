<template>
  <v-container id="included" class="pa-4 mx-auto mb-12" max-width="1100" fluid>
    <h2 class="text-headline-large text-md-display-medium font-weight-bold mb-2 text-center">
      What's included
    </h2>

    <p class="text-body-large text-medium-emphasis mb-8 text-center">
      Every sponsorship includes direct access to the team behind Vuetify
    </p>

    <v-row>
      <v-col
        v-for="benefit in benefits"
        :key="benefit.title"
        cols="12"
        md="4"
        sm="6"
      >
        <v-card
          class="pa-6 h-100"
          elevation="0"
          rounded="xl"
          border
        >
          <v-avatar
            class="mb-4"
            color="primary"
            rounded="lg"
            size="48"
            variant="tonal"
          >
            <v-icon
              :icon="benefit.icon"
              color="primary"
              size="24"
            />
          </v-avatar>

          <div class="text-title-medium font-weight-bold mb-2">
            {{ benefit.title }}
          </div>

          <p class="text-body-medium text-medium-emphasis mb-0">
            {{ benefit.description }}
          </p>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
  const benefits = [
    {
      icon: 'mdi-discord',
      title: 'Private Discord channel',
      description: 'A direct line to John and the core team. Not community support, the people who actually build Vuetify.',
    },
    {
      icon: 'mdi-lightning-bolt',
      title: 'Priority bug fixes',
      description: 'Your reports move to the top of the queue. No waiting in the public backlog.',
    },
    {
      icon: 'mdi-compass-outline',
      title: 'Roadmap input',
      description: 'Tell us what your team needs next. Sponsors shape what gets built.',
    },
    {
      icon: 'mdi-phone-in-talk',
      title: 'Monthly office hours',
      description: 'A recurring call with the team to unblock whatever is in the way.',
    },
    {
      icon: 'mdi-rocket-launch-outline',
      title: 'Early access',
      description: 'Preview new releases and breaking changes before they ship so your team can plan migrations.',
    },
    {
      icon: 'mdi-code-tags-check',
      title: 'Consulting hours',
      description: 'Paid hours for code review or architecture help when you need it.',
    },
  ]
</script>
