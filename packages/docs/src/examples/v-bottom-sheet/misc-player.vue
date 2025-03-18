<template>
  <v-bottom-sheet inset>
    <template v-slot:activator="{ props: activatorProps }">
      <div class="text-center pa-8">
        <v-btn
          v-bind="activatorProps"
          color="red"
          size="x-large"
          text="Click Me"
        ></v-btn>
      </div>
    </template>

    <v-sheet>
      <v-progress-linear model-value="50"></v-progress-linear>

      <v-list>
        <v-list-item subtitle="Fitz & The Trantrums" title="The Walker">
          <template v-slot:append>
            <div class="d-flex ga-1">
              <v-btn icon="mdi-rewind" variant="text"></v-btn>

              <v-btn icon="mdi-pause" variant="text"></v-btn>

              <v-btn icon="mdi-fast-forward" variant="text"></v-btn>
            </div>
          </template>
        </v-list-item>
      </v-list>
    </v-sheet>
  </v-bottom-sheet>
</template>
