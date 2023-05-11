<template>
  <div class="text-center">
    <v-btn @click="sheet = !sheet">
      Open v-model
    </v-btn>

    <v-bottom-sheet v-model="sheet">
      <v-card
        class="text-center"
        height="200"
      >
        <v-card-text>
          <v-btn
            variant="text"
            @click="sheet = !sheet"
          >
            close
          </v-btn>

          <br>
          <br>

          <div>
            This is a bottom sheet using the controlled by v-model instead of activator
          </div>
        </v-card-text>
      </v-card>
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
