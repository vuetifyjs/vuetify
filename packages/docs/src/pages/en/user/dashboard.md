---
layout: user
meta:
  nav: Dashboard
  title: User Dashboard
  description: User Dashboard
  keywords: user dashboard
---

<script setup>
import UserOneSubCard from '@/components/user/OneSubCard.vue'

const props = {
  headline: 'My Dashboard',
  title: 'Coming soon!',
  subtitle: 'We are working on this feature. Stay tuned!',
  icon: '$vuetify',
  height: 'calc(100vh - var(--v-layout-top))',
  text: 'This page will soon be home to the Vuetify One Dashboard.'
}
</script>

<v-empty-state v-bind="props"><UserOneSubCard /></v-empty-state>
