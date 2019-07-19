<template>
  <v-content>
    <v-layout column>
      <v-layout row justify-space-around>
        <v-icon
          class="mt-6 ml-6 mr-2"
          :color="$vuetify.theme.primary"
        >mdi-format-color-fill</v-icon>
        <v-text-field
          v-model="$vuetify.theme.primary"
          class="mt-6 mr-6 ml-2"
          :color="$vuetify.theme.primary"
          label="Primary"
        />
      </v-layout>
      <v-layout row justify-space-around>
        <v-icon
          class="mt-6 ml-6 mr-2"
          :color="$vuetify.theme.secondary"
        >mdi-format-color-fill</v-icon>
        <v-text-field
          v-model="$vuetify.theme.secondary"
          class="mt-6 mr-6 ml-2"
          :color="$vuetify.theme.secondary"
          label="Secondary"
        />
      </v-layout>
      <v-layout row justify-space-around>
        <v-icon
          class="mt-6 ml-6 mr-2"
          :color="$vuetify.theme.accent"
        >mdi-format-color-fill</v-icon>
        <v-text-field
          v-model="$vuetify.theme.accent"
          class="mt-6 mr-6 ml-2"
          :color="$vuetify.theme.accent"
          label="Accent"
        />
      </v-layout>
      <v-layout row justify-space-around>
        <v-icon
          class="mt-6 ml-6 mr-2"
          :color="$vuetify.theme.error"
        >mdi-format-color-fill</v-icon>
        <v-text-field
          v-model="$vuetify.theme.error"
          class="mt-6 mr-6 ml-2"
          :color="$vuetify.theme.error"
          label="Error"
        />
      </v-layout>
      <v-layout row justify-space-around>
        <v-icon
          class="mt-6 ml-6 mr-2"
          :color="$vuetify.theme.info"
        >mdi-format-color-fill</v-icon>
        <v-text-field
          v-model="$vuetify.theme.info"
          class="mt-6 mr-6 ml-2"
          :color="$vuetify.theme.info"
          label="Info"
        />
      </v-layout>
      <v-layout row justify-space-around>
        <v-icon
          class="mt-6 ml-6 mr-2"
          :color="$vuetify.theme.success"
        >mdi-format-color-fill</v-icon>
        <v-text-field
          v-model="$vuetify.theme.success"
          class="mt-6 mr-6 ml-2"
          :color="$vuetify.theme.success"
          label="Success"
        />
      </v-layout>
      <v-layout row justify-space-around>
        <v-icon
          class="mt-6 ml-6 mr-2"
          :color="$vuetify.theme.warning"
        >mdi-format-color-fill</v-icon>
        <v-text-field
          v-model="$vuetify.theme.warning"
          class="mt-6 mr-6 ml-2"
          :color="$vuetify.theme.warning"
          label="Warning"
        />
      </v-layout>
    </v-layout>
  </v-content>
</template>

<script>
  export default {
    name: 'Theme',
  }
</script>
