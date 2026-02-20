<template>
  <v-responsive class="text-center">
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
            class="text-center mx-auto"
            max-width="350"
            border
            flat
          >
            <v-img
              :alt="$t(feature.title)"
              :aspect-ratio="2.6"
              :src="feature.src"
              width="100%"
              cover
            />
            <v-card-text>
              <h3
                class="text-subheading-1 font-weight-bold mb-2"
                v-text="$t(feature.title)"
              />
              <p
                class="mb-2"
                v-text="$t(feature.text)"
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
      text: 'home.features.community-message',
      title: 'home.features.community',
      src: 'https://cdn.vuetifyjs.com/docs/images/featured/feature-1.png',
      href: 'https://community.vuetifyjs.com',
    },
    {
      text: 'home.features.components-message',
      title: 'home.features.components',
      src: 'https://cdn.vuetifyjs.com/docs/images/featured/feature-2.png',
      to: rpath('/components/all/'),
    },
    {
      text: 'home.features.scaffolding-message',
      title: 'home.features.scaffolding',
      src: 'https://cdn.vuetifyjs.com/docs/images/featured/feature-3.png',
      href: 'https://tryvuetify.com',
    },
  ]
</script>
