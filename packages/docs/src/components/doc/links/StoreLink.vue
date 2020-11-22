<template>
  <app-tooltip-btn
    href="https://store.vuetifyjs.com/?utm_source=vuetifyjs.com&utm_medium=toolbar"
    icon="$mdiCartOutline"
    path="store"
    rel="noopener"
    target="_blank"
  >
    <template #icon>
      <v-badge
        :value="true"
        color="#ED561B"
        dot
        left
        overlap
      >
        <v-icon
          class="mx-1"
          v-text="'$mdiShoppingOutline'"
        />
      </v-badge>
    </template>
  </app-tooltip-btn>
</template>

<script>
  export default { name: 'StoreLink' }
</script>
