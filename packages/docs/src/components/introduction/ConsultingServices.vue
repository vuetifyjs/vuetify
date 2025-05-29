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
      <v-row density="comfortable" justify="space-around">
        <template v-for="({ src, text, href, name}, i) in cards" :key="i">
          <v-col cols="12" md="6">
            <v-responsive class="h-100" content-class="d-flex flex-column">
              <h3 class="d-flex align-center text-h6 font-weight-medium mb-4">
                <v-avatar :image="src" class="me-3" />
                <div>
                  {{ name }}
                </div>
              </h3>

              <div class="text-caption mb-auto">{{ text }}</div>

              <v-btn
                :href="href"
                :text="name === 'Frontend Code Audit' ? 'Request Audit' : 'Learn more'"
                :variant="i === 1 ? 'flat' : 'outlined'"
                class="text-none mt-8"
                color="primary"
                rel="noopener"
                target="_blank"
              />

              <v-divider class="my-8" />
            </v-responsive>
          </v-col>
        </template>
      </v-row>

      <div class="text-medium-emphasis text-caption">
        *View more detailed information on
        <AppLink href="https://www.epicmax.co/">
          Epicmax.co
        </AppLink>
      </div>
    </v-container>
  </v-sheet>
</template>

<script setup>
  const cards = [
    {
      name: 'Development and Support',
      href: 'https://www.epicmax.co/what-we-do?ref=vuetify',
      src: 'https://cdn.vuetifyjs.com/docs/images/discord/tiers/planetary.png',
      text: 'Epicmax provides dedicated development and ongoing support for Vuetify-based projects, ensuring your product is built and maintained with best practices for maximum performance and stability.',
    },
    {
      name: 'Frontend Code Audit',
      href: 'https://www.epicmax.co/code-audit?ref=vuetify',
      src: 'https://cdn.vuetifyjs.com/docs/images/avatars/galaxy.png',
      text: 'Identify and resolve potential issues in your frontend code with a thorough audit from Epicmax\'s seasoned experts. Their in-depth analysis ensures that your codebase is optimized, clean, and ready for scale. Use code "VUETIFY" to get 20% off.',
    },
    {
      name: 'Flexible Consulting',
      href: 'https://www.epicmax.co/?ref=vuetify',
      src: 'https://cdn.vuetifyjs.com/docs/images/avatars/multiverse.png',
      text: 'Whether you need short-term assistance or a long-term strategy, Epicmax provides flexible consulting services that adapt to your specific project needs and timeline.',
    },
    {
      name: 'Team Augmentation',
      href: 'https://www.epicmax.co/?ref=vuetify',
      src: 'https://cdn.vuetifyjs.com/docs/images/discord/tiers/gold.png',
      text: 'Epicmax can boost your team with skilled developers who integrate seamlessly into your workflow. Whether for short-term projects or ongoing support, they help you scale and meet your goals efficiently.',
    },
  ]
</script>
