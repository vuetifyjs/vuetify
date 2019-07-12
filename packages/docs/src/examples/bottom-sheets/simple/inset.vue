<template>
  <div class="text-xs-center">
    <v-bottom-sheet v-model="sheet" inset>
      <template v-slot:activator="{ on }">
        <v-btn
          color="orange"
          dark
          v-on="on"
        >
          Open Inset
        </v-btn>
      </template>
      <v-sheet class="text-xs-center" height="200px">
        <v-btn
          class="mt-4"
          text
          color="error"
          @click="sheet = !sheet"
        >close</v-btn>
        <div class="my-3">This is a bottom sheet using the inset prop</div>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script>
  export default {
    data: () => ({
      sheet: false,
    }),
  }
</script>
