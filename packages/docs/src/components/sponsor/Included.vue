<template>
  <v-container id="included" class="pa-4 mx-auto mb-12" max-width="1100" fluid>
    <div class="d-flex justify-space-between align-center mb-8 flex-wrap ga-4">
      <h2 class="text-h3 text-md-h2 font-weight-black text-high-emphasis">
        What's included
      </h2>

      <span class="text-overline text-mono text-medium-emphasis">
        ALL IN · NO TIERS
      </span>
    </div>

    <v-row dense>
      <v-col cols="12" md="4">
        <v-card
          class="pa-6 d-flex flex-column h-100"
          elevation="0"
          min-height="320"
          rounded="xl"
          border
        >
          <div class="text-overline text-mono text-primary mb-6">
            01 · CHANNEL
          </div>

          <div class="text-h5 font-weight-bold text-high-emphasis mb-2">
            A private Discord with the maintainers.
          </div>

          <v-spacer />

          <div class="d-flex align-center ga-3 mt-6">
            <div class="d-flex">
              <v-avatar
                v-for="(member, i) in coreAvatars"
                :key="member.github"
                :image="member.avatar"
                :style="{ marginLeft: i === 0 ? '0' : '-10px', border: '2px solid rgb(var(--v-theme-surface))' }"
                size="32"
              />
            </div>

            <span class="text-caption text-mono text-medium-emphasis">
              Core team online
            </span>
          </div>
        </v-card>
      </v-col>

      <v-col cols="12" md="8">
        <v-row dense>
          <v-col cols="12" sm="6">
            <v-card
              class="pa-6 h-100"
              elevation="0"
              min-height="150"
              rounded="xl"
              border
            >
              <div class="text-overline text-mono text-primary mb-4">
                02 · PRIORITY
              </div>

              <div class="text-h5 font-weight-bold text-high-emphasis">
                Your bugs jump the queue.
              </div>
            </v-card>
          </v-col>

          <v-col cols="12" sm="6">
            <v-card
              class="pa-6 h-100"
              elevation="0"
              min-height="150"
              rounded="xl"
              border
            >
              <div class="text-overline text-mono text-primary mb-4">
                03 · ROADMAP
              </div>

              <div class="text-h5 font-weight-bold text-high-emphasis">
                You shape what gets built next.
              </div>
            </v-card>
          </v-col>

          <v-col class="d-none d-sm-flex" cols="12" sm="6">
            <v-card
              class="pa-6 h-100 d-flex align-center justify-center w-100"
              elevation="0"
              min-height="150"
              rounded="xl"
              border
            >
              <v-img
                height="64"
                src="https://cdn.vuetifyjs.com/docs/images/logos/v.svg"
                width="64"
              />
            </v-card>
          </v-col>

          <v-col cols="6" sm="3">
            <v-card
              class="pa-6 h-100"
              elevation="0"
              min-height="150"
              rounded="xl"
              border
            >
              <div class="text-overline text-mono text-medium-emphasis mb-4">
                04
              </div>

              <div class="text-h6 font-weight-bold">
                Office hours
              </div>
            </v-card>
          </v-col>

          <v-col cols="6" sm="3">
            <v-card
              class="pa-6 h-100"
              elevation="0"
              min-height="150"
              rounded="xl"
              border
            >
              <div class="text-overline text-mono text-medium-emphasis mb-4">
                05
              </div>

              <div class="text-h6 font-weight-bold">
                Early access
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12" md="4">
        <v-card
          class="pa-6 d-flex flex-column h-100"
          elevation="0"
          min-height="180"
          rounded="xl"
          border
        >
          <div class="text-overline text-mono text-medium-emphasis mb-6">
            DIRECT CONTACT
          </div>

          <div class="text-h5 font-weight-bold text-primary mb-2">
            Talk to humans, not tickets.
          </div>

          <v-spacer />

          <div class="text-overline text-mono text-medium-emphasis mt-6">
            ACROSS THE PRIVATE CHANNEL
          </div>
        </v-card>
      </v-col>

      <v-col cols="12" md="8">
        <v-card
          class="pa-6 d-flex flex-column h-100"
          elevation="0"
          min-height="180"
          rounded="xl"
          border
        >
          <div class="text-overline text-mono text-primary mb-6">
            06 · CONSULTING
          </div>

          <v-spacer />

          <div class="text-h5 font-weight-bold text-high-emphasis">
            Paid pairing when you need it.
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
  import { useTeamMembersStore } from '@/stores/team-members'

  const teamStore = useTeamMembersStore()

  const featuredKeys = ['johnleider', 'KaelWD', 'MajesticPotatoe', 'J-Sek']

  const coreAvatars = computed(() =>
    featuredKeys
      .map(key => teamStore.members.find(m => m.github === key))
      .filter((m): m is NonNullable<typeof m> => Boolean(m?.avatar))
  )
</script>
