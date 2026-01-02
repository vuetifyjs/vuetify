<template>
  <v-container>
    <v-row justify="space-around">
      <v-col cols="auto">
        <div class="text-center">
          <v-btn text="Button A" variant="text" border></v-btn>
          <div class="text-body-small">border</div>
        </div>
      </v-col>

      <v-col cols="auto">
        <div class="text-center">
          <v-btn border="dashed thin" text="Button A" variant="text"></v-btn>
          <div class="text-body-small">border-dashed</div>
        </div>
      </v-col>

      <v-col cols="auto">
        <div class="text-center">
          <v-btn border="dotted thin" text="Button A" variant="text"></v-btn>
          <div class="text-body-small">border-dotted</div>
        </div>
      </v-col>

      <v-col cols="auto">
        <div class="text-center">
          <v-btn border="double lg" text="Button A" variant="text"></v-btn>
          <div class="text-body-small">border-double</div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
