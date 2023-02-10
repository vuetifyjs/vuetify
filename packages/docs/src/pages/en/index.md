---
layout: home
meta:
  title: Vuetify — A Vue Component Framework
  description: Vuetify is a no design skills required UI Component Framework for Vue. It provides you with all of the tools necessary to create beautiful content rich web applications.
  keywords: vue, vue components, vue ui components, material design components, vuetify, component framework, component library
---
<script setup>
  import HomeLogo from '@/components/home/Logo.vue'
  import HomeActionBtns from '@/components/home/ActionBtns.vue'
  import HomeSponsors from '@/components/home/Sponsors.vue'
  import SponsorCard from '@/components/sponsor/Card.vue'
</script>

<home-logo size="300" />

# Vue Component Framework

Vuetify is a no design skills required UI Library with beautifully handcrafted Vue Components.
{style="max-width: 568px" .mx-auto}

<home-action-btns />

<br>
<br>

## Special Sponsor

Thank you to our special sponsor:

<sponsor-card slug="teamwork" min-height="60" />

<br>
<br>
<v-divider class="mx-auto" width="55%" />
<br>

## Project Sponsors

The continued development and maintenance of Vuetify is made possible by these generous sponsors:{style="max-width: 568px" .mx-auto}

<home-sponsors />
