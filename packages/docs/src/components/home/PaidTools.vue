<template>
  <v-responsive class="py-16">
    <v-container>
      <HomeBgGradient />

      <div class="mb-10">
        <h4 class="text-h4 font-weight-bold mb-5">
          Some of our premium services
        </h4>

        <v-responsive class="mx-auto my-5" max-width="700">
          <h6 class="text-h6 font-weight-regular text-medium-emphasis">
            The following are some of our premium services that we offer.
          </h6>
        </v-responsive>
      </div>

      <v-row class="text-left">
        <v-col
          v-for="(item, i) in tools"
          :key="i"
          cols="12"
          lg="4"
          sm="6"
        >
          <v-card
            class="d-flex flex-column"
            height="100%"
            rounded="lg"
            variant="flat"
            border
          >
            <HomeBgGradient :color="item.color" />

            <v-card-text>
              <v-list-item
                :subtitle="item.subtitle"
                :title="item.title"
                class="px-0"
              >
                <template #title>
                  <p class="text-h6 mb-2">{{ item.title }}</p>
                </template>
              </v-list-item>
            </v-card-text>

            <v-card-actions>
              <v-btn class="text-none" color="primary" variant="text">
                Learn More
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-responsive>
</template>

<script setup>
  const tools = computed(() => [
    {
      title: 'Vuetify Snips',
      color: 'primary',
      subtitle: 'Ready to copy-paste UI blocks to build spectacular applications in no time.',
    },
    {
      title: 'Figma UI Kit',
      color: 'red',
      subtitle: 'A complete UI kit for Figma that includes all of the Vuetify components and templates.',
    },
    {
      title: 'Vuetify Store',
      color: 'primary',
      subtitle: 'Get access to our premium services and tools.',
    },
  ])
</script>
