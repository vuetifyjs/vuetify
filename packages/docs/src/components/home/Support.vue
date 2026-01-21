<template>
  <v-responsive class="py-5">
    <HomeCommonGradient color="primary" opacity-class="opacity-10" />

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
              append-icon="mdi-open-in-new"
              class="mr-4 text-none"
              color="primary"
              rounded="lg"
              size="large"
              target="_blank"
              text="Get Support Now"
              variant="flat"
            />
          </div>
        </v-col>

        <v-col cols="12" md="6">
          <v-card color="transparent" rounded="lg" flat>
            <v-defaults-provider
              :defaults="{
                'VListItem': {
                  rounded: 'lg'
                }
              }"
            >
              <v-list
                :items="supportServices"
                class="py-3 bg-transparent text-left"
                lines="two"
                item-props
                rounded
              >
                <template #prepend="{ item }">
                  <v-avatar :image="item.avatar" size="small" />
                </template>

                <template #append>
                  <v-icon-btn
                    class="text-none ml-2"
                    color="primary"
                    icon="mdi-open-in-new"
                    roundeed="circle"
                    size="small"
                    variant="text"
                  />
                </template>
              </v-list>
            </v-defaults-provider>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-responsive>
</template>

<script setup lang="ts">
  const supportServices = [
    {
      avatar: 'https://cdn.vuetifyjs.com/docs/images/logos/v.svg',
      title: 'Single Developer Support',
      subtitle: 'Get professional support from the experts behind Vuetify.',
      href: rpath('introduction/enterprise-support/'),
      target: '_blank',
      rel: 'noopener noreferrer',
    },
    { type: 'divider', class: 'my-4', inset: true },
    {
      avatar: 'https://cdn.vuetifyjs.com/docs/images/affiliates/epic-max.jpg',
      title: 'Consulting Services',
      subtitle: 'Epicmax provides consulting services for your project.',
      to: rpath('/introduction/enterprise-support/#consulting-services'),
      target: '_blank',
      rel: 'noopener noreferrer',
    },
    { type: 'divider', class: 'my-4', inset: true },
    {
      // TODO: Use proper image URL
      avatar: 'https://cdn.vuetifyjs.com/docs/images/affiliates/hero-devs.png',
      title: 'Extended LTS support',
      class: 'mb-2',
      subtitle: 'HeroDevs provides extended long-term support for Vuetify 2 users.',
      href: 'https://v2.vuetifyjs.com/about/eol/#consider-herodevs-extended-lts-support',
      target: '_blank',
      rel: 'noopener noreferrer',
    },
  ]
</script>
