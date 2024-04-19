<template>
  <v-sheet
    border="s e b"
    class="overflow-hidden"
    max-width="900"
    rounded
  >
    <v-divider
      class="border-opacity-100"
      color="#6458f2"
      thickness="4"
    />

    <v-container class="pt-9 px-5" fluid>
      <v-row justify="space-around" dense>
        <template v-for="(tier, i) in tiers" :key="i">
          <v-col cols="12" md="4">
            <v-responsive :min-height="mdAndUp ? 96 : undefined" class="mb-4">
              <h3 class="d-flex align-center text-h6 font-weight-medium mb-4">
                <v-avatar :image="tier.src" class="me-3" />

                <div>
                  {{ tier.name }}

                  <div class="text-h5 font-weight-bold">
                    {{ tier.price }}<span v-if="tier.suffix" class="font-weight-medium text-medium-emphasis text-body-2">{{ tier.suffix }}</span>
                  </div>
                </div>
              </h3>

              <v-btn
                :href="tier.href"
                :text="tierText(tier)"
                :variant="i === 1 ? 'flat' : 'outlined'"
                class="mb-6 text-none"
                color="primary"
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

                  <div>
                    {{ benefit.text }}
                  </div>
                </div>
              </li>
            </ul>
          </v-col>
        </template>
      </v-row>
    </v-container>

    <div class="px-4 pb-3 text-medium-emphasis text-caption">
      *View more detailed information on our <AppLink
        href="https://discord.com/servers/vuetify-340160225338195969"
      >
        Discord Welcome Page
      </AppLink>
    </div>
  </v-sheet>
</template>

<script setup>
  const { mdAndUp } = useDisplay()

  const tiers = [
    {
      name: 'Grass Tier',
      price: 'Free',
      href: 'https://community.vuetifyjs.com/',
      src: 'https://cdn.vuetifyjs.com/docs/images/discord/tiers/grass.png',
      text: 'Ask questions in our public Discord help channels.',
      benefits: [
        {
          name: '#vuetify-3-help',
          text: 'Ask questions and get help for Vuetify 3 from the community in this public channel.',
          emoji: '3️⃣',
        },
        {
          name: '#vuetify-2-help',
          text: 'Ask questions and get help for Vuetify 2 from the community in this public channel.',
          emoji: '2️⃣',
        },
      ],
    },
    {
      name: 'Wood Tier',
      price: '$2.99',
      suffix: '/mo',
      trial: true,
      href: 'https://discord.com/invite/jZq4rzazEr',
      src: 'https://cdn.vuetifyjs.com/docs/images/discord/tiers/wood.png',
      text: 'Get access to sponsor only chat and help channels.',
      benefits: [
        {
          name: '#subscribers',
          text: 'Say hello and talk to other developers in this private subscriber only channel.',
          emoji: '💪',
        },
        {
          name: '#subscriber-help',
          text: 'Get priority help in our Subscriber only help channel.',
          emoji: '🚑',
        },
      ],
    },
    {
      name: 'Gold Tier',
      price: '$19.99',
      suffix: '/mo',
      href: 'https://discord.com/invite/jZq4rzazEr',
      src: 'https://cdn.vuetifyjs.com/docs/images/discord/tiers/gold.png',
      text: 'Get access to our daily Vuetify development updates.',
      benefits: [
        {
          text: 'Every channel in Wood Tier plus:',
          emoji: '🪵',
        },
        {
          name: '🔥dev-stream',
          text: 'Inside peek of current Vuetify development.',
          emoji: '🎉',
        },
      ],
    },
    {
      name: 'Planetary Tier',
      price: '$99.99',
      suffix: '/mo',
      href: 'https://discord.com/invite/jZq4rzazEr',
      src: 'https://cdn.vuetifyjs.com/docs/images/discord/tiers/planetary.png',
      text: 'Get help directly from the Core team with a private help channel.',
      benefits: [
        {
          text: 'Every channel in Gold Tier plus:',
          emoji: '🥇',
        },
        {
          name: 'Private Help Channel',
          text: 'Get a private help channel where you can ask questions to the Core Team.',
          emoji: '🔨',
        },
        {
          name: 'Priority GitHub Issues',
          text: 'Get priority on your GitHub reported issues.',
          emoji: '🚨',
        },
      ],
    },
    {
      name: 'Galaxy Tier',
      contact: true,
      price: '$199.99',
      suffix: '/mo',
      href: 'mailto:support@vuetifyjs.com?subject=Galaxy%20Tier%20Support%20Request',
      src: 'https://cdn.vuetifyjs.com/docs/images/discord/tiers/galaxy.png',
      text: 'Get support for up to 3 developers with a private help channel.',
      benefits: [
        {
          text: 'Every channel in Planetary Tier plus:',
          emoji: '💫',
        },
        {
          name: 'Extra Developers',
          text: 'Get a private help channel where up to 3 developers can ask questions directly to the Core Team.',
          emoji: '🛠️',
        },
        {
          name: 'Direct Support Discounts',
          text: '50% discount on all Direct Support services.',
          emoji: '🏷️',
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
