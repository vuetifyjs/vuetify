<template>
  <v-responsive class="py-16">
    <HomeBgGradient />

    <v-container>
      <div class="mb-10">
        <h4 class="text-h4 font-weight-bold mb-5">
          Vuetify Tooling
        </h4>

        <v-responsive class="mx-auto my-5" max-width="700">
          <h6 class="text-h6 font-weight-regular text-medium-emphasis">
            Vuetify provides a suite of tools for managing your Vuetify projects.
          </h6>
        </v-responsive>
      </div>

      <v-row align="center" class="text-left">
        <v-col
          class="d-none d-md-block"
          cols="12"
          md="6"
        >
          <v-img
            :height="$vuetify.display.smAndDown ? 250 : 500"
            :max-width="$vuetify.display.smAndDown ? '100%' : 500"
            rounded="xl"
            src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-light-atom.svg"
            width="100%"
          />
        </v-col>

        <v-col
          cols="12"
          md="6"
        >
          <div
            v-for="tooling in toolings"
            :key="tooling.name"
            class="pb-4"
          >
            <div class="font-weight-bold mb-1">{{ tooling.name }}</div>

            <p class="text-medium-emphasis mb-0">
              {{ tooling.description }}
            </p>

            <v-btn
              class="mb-4 text-none px-0"
              color="primary"
              height="30"
              variant="text"
            >
              Learn More
            </v-btn>

            <v-divider v-if="tooling !== toolings[toolings.length - 1]" />
          </div>
        </v-col>
      </v-row>
    </v-container>

  </v-responsive>
</template>

<script setup>
  const toolings = computed(() => [
    {
      name: 'Figma UI Kit',
      description: `Fully optimized for Figma and based on Material Design - Vuetify UI Kit`,
    },
    {
      name: '@vuetify/create',
      description: `Scaffold your next Vuetify application with just a few commands. Perfect for getting started with Vuetify.`,
    },
    {
      name: '@vuetify/eslint-plugin',
      description: `Version upgrade automation eslint plugin, to keep your code clean and consistent!`,
    },
    {
      name: '@vuetify/eslint-config',
      description: `An opinionated eslint config for Vuetify, crafted to keep your code clean and consistent!`,
    },
  ])
</script>
