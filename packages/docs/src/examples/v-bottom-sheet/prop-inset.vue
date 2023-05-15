<template>
  <div class="text-center">
    <v-btn
      text="Click Me"
      size="x-large"
      @click="sheet = !sheet"
    ></v-btn>

    <v-bottom-sheet v-model="sheet" inset>
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
            This is a bottom sheet that is using the inset prop
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
