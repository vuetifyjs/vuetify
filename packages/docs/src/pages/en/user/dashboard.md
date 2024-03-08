---
layout: user
meta:
  nav: Dashboard
  title: User Dashboard
  description: User Dashboard
  keywords: user dashboard
---

<script setup>
// Components
import UserOneSubCard from '@/components/user/OneSubCard.vue'

// Stores
import { useAuthStore } from '@vuetify/one'

const auth = useAuthStore()

const props = {
  headline: 'My Dashboard',
  title: auth.user ? 'Coming soon!' : 'Login to Subscribe to Vuetify One',
  icon: '$vuetify',
  height: 'calc(100vh - var(--v-layout-top))',
  text: auth.user
    ? 'This page will soon be home to the Vuetify One Dashboard.'
    : 'In order to proceed, please login using GitHub or Discord.',
}
</script>

<v-empty-state v-bind="props"><UserOneSubCard /><VoAuthListItem v-if="!auth.user" /></v-empty-state>
