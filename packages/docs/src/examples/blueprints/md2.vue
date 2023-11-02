<template>
  <div>
    <v-defaults-provider :defaults="md2.defaults">
      <div class="d-flex align-center">
        <v-btn class="me-6 text-white" :color="color">Button</v-btn>

        <v-tabs :color="color">
          <v-tab>Tab One</v-tab>
          <v-tab>Tab Two</v-tab>
          <v-tab>Tab Three</v-tab>
        </v-tabs>
      </div>

      <br>

      <v-banner
        :color="color"
        text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!"
      >
        <template v-slot:prepend>
          <!-- rounded added due to bug -->
          <v-avatar
            icon="$vuetify"
            class="text-white"
            rounded="circle"
          ></v-avatar>
        </template>
      </v-banner>

      <br>

      <v-text-field
        :color="color"
        label="Text field"
        model-value="Material Design 2"
      ></v-text-field>
    </v-defaults-provider>
  </div>
</template>

<script setup>
  import { md2 } from 'vuetify/blueprints'

  const color = md2.theme.themes.light.colors.primary
</script>
