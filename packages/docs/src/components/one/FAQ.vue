<template>
  <v-container class="pa-md-12 pa-4 mx-auto" max-width="700" fluid>
    <h2 class="text-headline-large text-md-display-medium font-weight-bold mb-2 text-center">
      Questions?
    </h2>

    <p class="text-body-large text-medium-emphasis mb-8 text-center">
      Everything you need to know about Vuetify One
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
      Have other questions? Email us at
      <AppLink href="mailto:hello@vuetifyjs.com">hello@vuetifyjs.com</AppLink>
    </p>
  </v-container>
</template>

<script setup lang="ts">
  const faq = [
    {
      question: 'What happens to Vuetify if I don\'t subscribe?',
      answer: 'Nothing changes. Vuetify remains free and open source forever. Your subscription funds continued development and new features, but the core framework will always be available to everyone.',
    },
    {
      question: 'Can I upgrade from Solo to Team later?',
      answer: 'Yes. You can upgrade at any time from your account settings. You\'ll be credited for any remaining time on your current plan.',
    },
    {
      question: 'What\'s the difference between subscribing and sponsoring?',
      answer: 'Subscriptions give you access to premium features across Vuetify properties. Sponsoring through GitHub or Open Collective is a way to support development without needing those features. Both help fund the project.',
    },
    {
      question: 'How do team seats work?',
      answer: 'Team plans include up to 25 seats. You can invite members from your account dashboard. Each member gets their own login and access to all team features.',
    },
    {
      question: 'Is there a free trial?',
      answer: 'We don\'t offer a trial, but you can cancel anytime within the first 30 days for a full refund. No questions asked.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We use Stripe for payments, which supports all major credit cards, Apple Pay, and Google Pay. Annual billing is available for additional savings.',
    },
  ]
</script>
