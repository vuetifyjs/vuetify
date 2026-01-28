---
layout: user
meta:
  nav: Dashboard
  title: User Dashboard
  description: User Dashboard
  keywords: user dashboard
---
<script setup>
  import DashboardActivityTable from '@/components/dashboard/DashboardActivityTable.vue';
  import { useAuthStore } from '@vuetify/one';
  const auth = useAuthStore()
</script>

<DashboardActivityTable v-if="auth.user" />
<VoAuthCard class="mt-10" v-else />

