<template>
  <v-layout min-height="100">
    <v-snackbar
      color="amber-lighten-3"
      text="There are new reports..."
      timeout="-1"
      title="New notifications"
      contained
      model-value
    >
      <template v-slot:prepend>
        <v-avatar class="bell-shake" color="amber" icon="mdi-bell-ring-outline" variant="elevated"></v-avatar>
      </template>
    </v-snackbar>
  </v-layout>
</template>

<style scoped>
  .bell-shake :deep(.v-icon) {
    animation: bell-shake 1.8s ease 2s infinite;
  }

  @keyframes bell-shake {
    0%, 100% { transform: rotate(0deg) }
    5% { transform: rotate(14deg) }
    10% { transform: rotate(-14deg) }
    15% { transform: rotate(10deg) }
    20% { transform: rotate(-8deg) }
    25% { transform: rotate(4deg) }
    30% { transform: rotate(0deg) }
  }
</style>
