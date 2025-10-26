<template>
  <v-responsive class="py-5">
    <HomeBgGradient />

    <v-container class="text-center text-md-left py-16">
      <v-row align="end">
        <v-col class="pr-md-15" cols="12" md="6">
          <p class="font-weight-medium text-primary mb-4">
            Vuetify Support Services
          </p>

          <h4 class="text-h4 font-weight-bold mb-5">
            Need support with your Vuetify project?
          </h4>

          <h6 class="text-h6 font-weight-regular text-medium-emphasis my-5">
            We've got you covered. We offer a range of support options to help you get the most out of Vuetify.
          </h6>

          <div class="my-5">
            <v-btn
              :to="rpath('introduction/enterprise-support/')"
              class="mr-4 text-none"
              color="primary"
              rounded="lg"
              size="large"
              text="Learn More"
              variant="flat"
            />
          </div>
        </v-col>

        <v-col cols="12" md="6">
          <v-card color="transparent" rounded="lg" flat>
            <v-list
              :items="supportServices"
              :lines="false"
              class="py-3 bg-transparent text-left"
              item-props
            >
              <template #prepend="{ item }">
                <v-avatar :image="item.avatar" size="small" />
              </template>

              <template #append>
                <v-icon-btn
                  class="text-none mt-3 ml-2"
                  color="primary"
                  icon="mdi-open-in-new"
                  roundeed="circle"
                  size="small"
                  variant="text"
                />
              </template>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-responsive>
</template>

<script setup lang="ts">
  const supportServices = [
    {
      // TODO: Use proper image URL
      avatar: 'https://avatars.githubusercontent.com/u/22138497',
      title: 'Single Developer Support',
      subtitle: 'Get professional support from the experts behind Vuetify.',
    },
    { type: 'divider', class: 'my-4', inset: true },
    {
      // TODO: Use proper image URL
      avatar: 'https://avatars.githubusercontent.com/u/30595047',
      title: 'Consulting Services',
      subtitle: 'Epicmax provides consulting services for your project.',
    },
    { type: 'divider', class: 'my-4', inset: true },
    {
      // TODO: Use proper image URL
      avatar: 'https://avatars.githubusercontent.com/u/35441165',
      title: 'Extended LTS support',
      class: 'mb-2',
      subtitle: 'HeroDevs provides extended long-term support for Vuetify 2 users.',
    },
  ]
</script>
