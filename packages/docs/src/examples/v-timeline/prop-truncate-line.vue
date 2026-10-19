<template>
  <div class="d-flex justify-space-around">
    <v-timeline truncate-line="start">
      <v-timeline-item>
        <template v-slot:opposite>
          Opposite
        </template>
        Content
      </v-timeline-item>

      <v-timeline-item>
        <template v-slot:opposite>
          Opposite
        </template>
        Content
      </v-timeline-item>

      <v-timeline-item>
        <template v-slot:opposite>
          Opposite
        </template>
        Content
      </v-timeline-item>
    </v-timeline>

    <v-timeline truncate-line="end">
      <v-timeline-item>
        <template v-slot:opposite>
          Opposite
        </template>
        Content
      </v-timeline-item>

      <v-timeline-item>
        <template v-slot:opposite>
          Opposite
        </template>
        Content
      </v-timeline-item>

      <v-timeline-item>
        <template v-slot:opposite>
          Opposite
        </template>
        Content
      </v-timeline-item>
    </v-timeline>

    <v-timeline truncate-line="both">
      <v-timeline-item>
        <template v-slot:opposite>
          Opposite
        </template>
        Content
      </v-timeline-item>

      <v-timeline-item>
        <template v-slot:opposite>
          Opposite
        </template>
        Content
      </v-timeline-item>

      <v-timeline-item>
        <template v-slot:opposite>
          Opposite
        </template>
        Content
      </v-timeline-item>
    </v-timeline>
  </div>
</template>

<example-meta lang="json">
  {
    "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v4---Official-Vuetify-4---UI-Kit---Snips?node-id=14461-128732"
  }
</example-meta>
