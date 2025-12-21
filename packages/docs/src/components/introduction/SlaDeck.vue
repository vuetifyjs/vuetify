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

    <v-container class="py-9 px-5" fluid>
      <v-row density="comfortable" justify="space-around">
        <template v-for="(tier, i) in tiers" :key="i">
          <v-col
            :class="i === 1 && 'bg-primary'"
            class="position-relative pa-4 rounded-lg"
            cols="12"
            md="4"
          >
            <v-responsive :min-height="mdAndUp ? 96 : undefined" class="mb-4">
              <h3 class="d-flex align-center text-h6 font-weight-medium mb-4">
                <v-avatar :image="tier.src" class="me-3" />

                <div>
                  {{ tier.name }}

                  <div class="text-h5 font-weight-bold">
                    {{ tier.price }}<span v-if="tier.suffix" class="font-weight-medium opacity-60 text-body-2">{{ tier.suffix }}</span>
                  </div>
                </div>
              </h3>

              <v-btn
                :color="i === 1 ? 'surface' : 'primary'"
                :href="tier.href"
                :text="tierText(tier)"
                :variant="i === 1 ? 'flat' : 'outlined'"
                class="mb-6 text-none"
                rel="noopener"
                target="_blank"
                block
              />

              <div class="text-caption">{{ tier.text }}</div>
            </v-responsive>

            <v-divider class="mb-4" />

            <ul class="text-caption ps-1" style="list-style-type: none;">
              <li v-for="(benefit, k) in tier.benefits" :key="k" class="mb-2 d-flex">
                <div class="me-2">{{ benefit.emoji }}</div>

                <div>
                  <strong>{{ benefit.name }}</strong>

                  <div class="opacity-60">
                    {{ benefit.text }}
                  </div>
                </div>
              </li>
            </ul>
          </v-col>
        </template>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script setup>
  const { mdAndUp } = useDisplay()

  const tiers = [
    {
      name: 'Galaxy Tier',
      price: '$250',
      suffix: '/mo',
      href: 'https://buy.stripe.com/cN2fZOfIE7xc4iA288',
      src: 'https://cdn.vuetifyjs.com/docs/images/avatars/galaxy.png',
      text: '🥉 For 2 developers',
      benefits: [
        {
          name: 'Chat support',
          text: 'Get a private Discord channel where your developers can ask questions directly to the Core Team.',
          emoji: '💬',
        },
        {
          name: 'Same day response',
          text: 'Questions are answered within 24 hours, Monday through Friday.',
          emoji: '🕒',
        },
      ],
    },
    {
      name: 'Cosmic Tier',
      price: '$500',
      suffix: '/mo',
      href: 'https://buy.stripe.com/7sIfZO0NK3gW3ewfYZ',
      src: 'https://cdn.vuetifyjs.com/docs/images/avatars/cosmic.png',
      text: '🥈 For up to 5 developers',
      benefits: [
        {
          name: 'Everything in Galaxy Tier, plus:',
          emoji: '💫',
        },
        {
          name: 'Priority bug fixes',
          text: 'Get priority on reported or identified Vuetify GitHub issues.',
          emoji: '🎯',
        },
      ],
    },
    {
      name: 'Multiverse Tier',
      price: '$1,000',
      suffix: '/mo',
      href: 'https://buy.stripe.com/8wMeVKeEA04K8yQeUW',
      src: 'https://cdn.vuetifyjs.com/docs/images/avatars/multiverse.png',
      text: '🥇 For up to 15 developers',
      benefits: [
        {
          name: 'Everything in Cosmic Tier, plus:',
          emoji: '💫',
        },
        {
          name: 'Monthly strategy session',
          text: 'A monthly strategy session to discuss your project and how to best utilize Vuetify.',
          emoji: '📅',
        },
      ],
    },
  ]

  function tierText (tier) {
    if (tier.trial) return 'Start free trial'
    if (tier.price === 'Free') return 'Join Community'
    if (tier.contact) return 'Contact Us'

    return 'Subscribe'
  }
</script>
