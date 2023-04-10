<template>
  <v-bottom-sheet
    v-model="sheet"
    inset
  >
    <template v-slot:activator="{ props }">
      <div class="text-center">
        <v-btn
          color="orange"
          v-bind="props"
        >
          Open Inset
        </v-btn>
      </div>

    </template>

    <v-sheet
      class="text-center"
      height="200"
    >
      <v-btn
        class="mt-6"
        variant="text"
        color="error"
        @click="sheet = !sheet"
      >
        close
      </v-btn>

      <div class="my-3">
        This is a bottom sheet using the inset prop
      </div>
    </v-sheet>
  </v-bottom-sheet>
</template>

<script>
  export default {
    data: () => ({
      sheet: false,
    }),
  }
</script>
