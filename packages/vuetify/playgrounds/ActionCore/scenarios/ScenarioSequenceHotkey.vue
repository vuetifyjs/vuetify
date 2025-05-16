<template>
  <scenario-card title="Sequence Hotkey (Konami Code)">
    <p>Try the Konami Code: ArrowUp, ArrowUp, ArrowDown, ArrowDown, ArrowLeft, ArrowRight, ArrowLeft, ArrowRight, B, A</p>
    <p class="text-caption mt-1"> (Note: May require clicking into the app/window first for key events to be captured if not already focused.) An alert will appear on success.</p>
  </scenario-card>
</template>

<script setup lang="ts">
// No specific script logic needed here as the action is globally registered
// in Playground.actionCore.vue and the UI is informational.
import ScenarioCard from '../ScenarioCard.vue'
</script>
