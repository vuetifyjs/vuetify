<template>
  <div class="text-xs-center">
    <v-bottom-sheet inset>
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
          flat
          color="red"
          @click="sheet = !sheet"
        >close</v-btn>
        <div>This is a bottom sheet using the inset prop</div>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script>
  export default {
    data: () => ({
      sheet: false
    })
  }
</script>
