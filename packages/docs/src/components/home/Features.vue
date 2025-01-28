<template>
  <v-responsive class="text-xs-center">
    <v-container>
      <v-row justify="center">
        <v-col
          v-for="(feature, i) in features"
          :key="i"
          class="d-flex flex-shrink-1"
          cols="auto"
        >
          <v-card
            :href="feature.href"
            :rel="feature.href && 'noopener noreferrer'"
            :target="feature.href && '_blank'"
            :to="feature.to"
            class="text-xs-center mx-auto"
            max-width="350"
            border
            flat
          >
            <v-img
              :alt="feature.title"
              :aspect-ratio="2.6"
              :src="feature.src"
              width="100%"
              cover
            />
            <v-card-text>
              <h3
                class="text-subheading-1 font-weight-bold mb-2"
                v-text="feature.title"
              />
              <p
                class="mb-2"
                v-text="feature.text"
              />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-responsive>
</template>

<script setup>
  const features = [
    {
      text: 'When you run into a roadblock, you need assistance right away. Vuetify offers support in our massive community on Discord.',
      title: 'Vibrant Community',
      src: 'https://cdn.vuetifyjs.com/docs/images/featured/feature-1.png',
      href: 'https://community.vuetifyjs.com',
    },
    {
      text: 'Be prepared for an armada of specialized components at your disposal. With over 80 in total, there is a solution to any situation.',
      title: 'Semantic Vue Components',
      src: 'https://cdn.vuetifyjs.com/docs/images/featured/feature-2.png',
      to: rpath('/components/all/'),
    },
    {
      text: 'Vuetify supports the future of Vite tooling through its create plugin. This allows you to scaffold a new project in seconds.',
      title: 'Ready-Made Project Scaffolding',
      src: 'https://cdn.vuetifyjs.com/docs/images/featured/feature-3.png',
      href: 'https://tryvuetify.com',
    },
  ]
</script>
