<template>
  <v-responsive>
    <v-container>
      <v-row align="start">
        <v-col
          v-for="(stat, i) in stats"
          :key="i"
          cols="12"
          md="4"
        >
          <v-avatar color="primary" size="70" variant="tonal">
            <v-icon :icon="stat.icon" size="35" />
          </v-avatar>

          <div class="text-h5 font-weight-bold my-3">
            {{ stat.title }}
          </div>

          <div class="text-body-1 text-medium-emphasis">
            {{ stat.subtitle }}
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-responsive>
</template>

<script setup>
  const stats = [
    {
      icon: 'mdi-account-multiple-outline',
      title: '100K+ Teams Worldwide',
      subtitle: 'Trusted by developers globally',
    },
    {
      icon: 'mdi-calendar-blank-outline',
      title: '8 Years of Continuous Releases',
      subtitle: 'Mature and stable framework',
    },
    {
      icon: 'mdi-star-outline',
      title: '10K+ GitHub Stars',
      subtitle: '2K+ Discord Members',
    },
  ]
</script>
