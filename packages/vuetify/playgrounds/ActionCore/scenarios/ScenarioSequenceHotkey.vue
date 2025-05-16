<template>
  <scenario-card title="Konami Code (Sequence Hotkey)">
    <p>
      Enter the classic Konami code (↑ ↑ ↓ ↓ ← → ← → B A) anywhere in the app to trigger the
      "Konami Code!" action. An alert will show when successful.
    </p>
  </scenario-card>
</template>

<script setup lang="ts">
// This scenario only displays explanatory UI. The actual action registration lives in
// Playground.actionCore.vue to avoid duplicate registrations.
import ScenarioCard from '../ScenarioCard.vue'
</script>
