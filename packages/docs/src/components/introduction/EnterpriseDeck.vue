<template>
  <v-sheet border="t-lg primary opacity-100" elevation="2" max-width="900" rounded>
    <v-container class="py-9 px-5" fluid>
      <v-row>
        <template v-for="(item, i) in items" :key="i">

          <v-col cols="12" md="4">
            <v-responsive class="mb-4" :min-height="mdAndUp ? 96 : undefined">
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
              target="_blank"
              rel="noopener"
              class="mb-6"
              color="primary"
              block
              text="Book Now"
              size="x-large"
              :variant="i === 0 ? 'flat' : 'outlined'"
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
  </v-sheet>
</template>

<script setup>
  import { useDisplay } from 'vuetify'

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
          text: "Together, we'll tackle live debugging, solving real-time issues and bolstering system stability",
        },
        {
          emoji: '👀',
          text: "We'll join forces in conducting a comprehensive code review, ensuring efficiency, readability, and best practices",
        },
        {
          emoji: '🧪',
          text: "Together, we'll carry out unit tests, verifying the functionality of each individual part of your software",
        },
        {
          emoji: '🖥️',
          text: "Through paired programming sessions, we'll collaborate in problem-solving and producing high-quality code",
        },
      ],
      href: 'https://l.kintell.com/M9y7D7',
    },
    {
      name: 'Project Upgrade',
      text: "We'll review your project and provide you with a detailed report on how to make the best of your Vuetify upgrade",
      price: '2,000',
      benefits: [
        {
          emoji: '📦',
          text: "We'll evaluate the project structure, focusing on its scalability and maintainability",
        },
        {
          emoji: '⌨️',
          text: 'A thorough assessment of your code quality will be conducted, focusing on alignment with the best coding practices',
        },
        {
          emoji: '⚡',
          text: 'Performance will be scrutinized, with the goal of identifying bottlenecks and proposing efficiency improvements',
        },
        {
          emoji: '🔐',
          text: "We'll examine security measures in place, ensuring data integrity and user privacy are safeguarded",
        },
      ],
      href: 'https://l.kintell.com/fp7BQm',
    },
    {
      name: 'SLA',
      text: 'Get dedicated support with a customized Service Level Agreement',
      price: '1,500',
      suffix: '/mo',
      benefits: [
        {
          emoji: '💬',
          text: 'Direct chat access to the Vuetify team through Discord with guaranteed response times',
        },
        {
          emoji: '🕒',
          text: '2x1h live support calls per month with the author of Vuetify',
        },
        {
          emoji: '🎯',
          text: 'Get priority on reported or identified Vuetify GitHub issues and bugs',
        },
        {
          emoji: '📝',
          text: "We work with your company to forge a customized SLA plan, tailored for your development team's productivity and growth",
        },
      ],
      href: 'https://l.kintell.com/E7El3W',
    },
  ]

</script>
