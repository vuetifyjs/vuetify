<template>
  <v-container class="pa-4 mx-auto" max-width="700" fluid>
    <h2 class="text-headline-large text-md-display-medium font-weight-bold mb-2 text-center">
      Questions?
    </h2>

    <p class="text-body-large text-medium-emphasis mb-8 text-center">
      What teams ask before they sponsor
    </p>

    <v-expansion-panels class="border rounded-xl overflow-hidden" variant="accordion">
      <v-expansion-panel v-for="item in faq" :key="item.question" elevation="0">
        <v-expansion-panel-title class="text-body-large font-weight-medium">
          {{ item.question }}
        </v-expansion-panel-title>

        <v-expansion-panel-text class="text-body-medium text-medium-emphasis">
          {{ item.answer }}
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>

    <p class="text-body-medium text-medium-emphasis text-center mt-6">
      Other questions? Email
      <AppLink href="mailto:sponsor@vuetifyjs.com">sponsor@vuetifyjs.com</AppLink>
    </p>
  </v-container>
</template>

<script setup lang="ts">
  const faq = [
    {
      question: 'How is this different from Vuetify One or GitHub Sponsors?',
      answer: 'Vuetify One is a subscription for individual developers and small teams. GitHub Sponsors and Open Collective are ways to fund the project. Enterprise sponsorship is a direct working relationship with the team: private Discord, priority bug fixes, roadmap input, office hours, early access, and consulting hours.',
    },
    {
      question: 'What does it cost?',
      answer: 'Every sponsorship is scoped to what your team actually needs. Pricing is custom. Email sponsor@vuetifyjs.com to talk through what makes sense for you.',
    },
    {
      question: 'How fast do you respond?',
      answer: 'We aim to respond to sponsor requests within two business days. Priority bug triage is part of every sponsorship.',
    },
    {
      question: 'Who on our team gets access to the private Discord?',
      answer: 'Your engineering leads and anyone they invite. There is no hard cap on seats, but we size the channel so conversations stay useful.',
    },
    {
      question: "What's the commitment?",
      answer: 'Sponsorships are billed monthly or annually. Cancel at the end of a billing period if the fit is not right. Most sponsors stay multi-year.',
    },
  ]
</script>
