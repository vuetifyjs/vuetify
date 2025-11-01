<template>
  <v-responsive :class="theme.current.value.dark ? '' : 'bg-primary'">
    <HomeBgGradient color="primary" />

    <v-container class="pa-6 text-left">
      <v-row justify="center">
        <v-col
          class="pa-6 pa-md-12 text-center"
          cols="12"
        >
          <v-icon class="mb-5" size="60">
            mdi-discord
          </v-icon>

          <h4 class="text-h4 font-weight-bold mb-5">
            Join our community of 40k+ developers
          </h4>

          <p class="text-h6 font-weight-regular mb-6 w-100 w-md-50 mx-auto">
            Join us to get help with your Vuetify projects, share your work, and connect with other developers on Discord.
          </p>

          <v-btn
            append-icon="mdi-open-in-new"
            class="mr-4 text-none"
            rounded="lg"
            size="large"
            text="Join Discord"
            variant="outlined"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-responsive>
</template>

<script setup lang="ts">
  const theme = useTheme()
</script>
