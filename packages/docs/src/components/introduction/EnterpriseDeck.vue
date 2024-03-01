<template>
  <v-sheet
    border="s e b"
    class="overflow-hidden"
    max-width="900"
    rounded
  >
    <v-divider
      class="border-opacity-100"
      color="primary"
      thickness="4"
    />

    <v-container class="pt-9 px-5" fluid>
      <v-row>
        <template v-for="(item, i) in items" :key="i">
          <v-col cols="12" md="4">
            <v-responsive :min-height="mdAndUp ? 96 : undefined" class="mb-4">
              <h3 class="text-h5 font-weight-medium">
                {{ item.name }}
              </h3>

              <div class="text-caption">
                {{ item.text }}
              </div>
            </v-responsive>

            <div class="mb-4">
              <span class="text-h5 font-weight-bold">${{ item.price }} USD</span>
              <span v-if="item.suffix" class="font-weight-medium text-medium-emphasis text-h6">{{ item.suffix }}</span>
            </div>

            <v-btn
              :href="item.href"
              :variant="i === 0 ? 'flat' : 'outlined'"
              class="mb-6 text-none"
              color="primary"
              rel="noopener"
              size="x-large"
              target="_blank"
              text="Book Now"
              block
            />

            <ul class="text-caption ps-1" style="list-style-type: none;">
              <li v-for="(benefit, k) in item.benefits" :key="k" class="mb-2 d-flex">
                <div class="me-2">{{ benefit.emoji }}</div>

                <div>{{ benefit.text }}</div>
              </li>
            </ul>
          </v-col>

          <v-divider v-if="i !== 2" :vertical="mdAndUp" />
        </template>
      </v-row>
    </v-container>

    <div class="px-4 pb-3 text-medium-emphasis text-caption">
      *Cost for initial project review. Upgrade quote provided separately.
    </div>
  </v-sheet>
</template>

<script setup>
  const { mdAndUp } = useDisplay()

  const items = [
    {
      name: 'Direct Support',
      text: 'Get direct help from the author of Vuetify in a live conference call',
      price: '180',
      suffix: '/60m',
      benefits: [
        {
          emoji: '🐛',
          text: 'Get help debugging your Vue / Vuetify application in a live conference call',
        },
        {
          emoji: '🖥️',
          text: 'We can collaborate in problem-solving in a personalized training session with you and your team',
        },
        {
          emoji: '👀',
          text: 'We can review and provide feedback on how to improve your Vuetify implementation',
        },
        {
          emoji: '🧪',
          text: 'Get help setting up unit tests that ensure your application continues to run as expected',
        },
      ],
      href: 'https://calendly.com/vuetify/vuetify-direct-support',
    },
    {
      name: 'Project Upgrade',
      text: 'Ready to upgrade to Vuetify 3? Let us help you make the transition as smooth as possible',
      price: '1,500',
      suffix: '*',
      benefits: [
        {
          emoji: '📦',
          text: 'We will conduct a thorough review of your project and provide you with a detailed report of what it would take to upgrade',
        },
        {
          emoji: '⌨️',
          text: 'Our team will engage with your developers to help them understand the changes that need to be made',
        },
        {
          emoji: '⚡',
          text: 'Along with the report, we will provide a quote for us to perform the upgrade',
        },
        {
          emoji: '🔐',
          text: "Feel secure knowing that you're working with the team that built Vuetify",
        },
      ],
      href: 'https://calendly.com/vuetify/project-upgrade-consultation',
    },
    {
      name: 'SLA',
      text: 'Get dedicated support with a customized Service Level Agreement',
      price: '1,000',
      suffix: '/mo',
      benefits: [
        {
          emoji: '📝',
          text: "We work with your company to forge a customized SLA plan, tailored for your development team's productivity and growth",
        },
        {
          emoji: '🕒',
          text: '2x1h live support calls per month with the author of Vuetify',
        },
        {
          emoji: '💬',
          text: 'Direct chat access to the Vuetify team through Discord with guaranteed response times',
        },
        {
          emoji: '🎯',
          text: 'Get priority on reported or identified Vuetify GitHub issues and bugs',
        },
        {
          emoji: '🚌',
          text: 'Great for large teams or companies with 3 or more developers',
        },
      ],
      href: 'https://calendly.com/vuetify/sla-consultation',
    },
  ]

</script>
