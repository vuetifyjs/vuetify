<template>
  <v-empty-state icon="$success">
    <template v-slot:media>
      <v-icon color="surface-variant"></v-icon>
    </template>

    <template v-slot:headline>
      <div class="text-headline-large">
        All Done For Now!
      </div>
    </template>

    <template v-slot:title>
      <div class="text-title-large">
        You're all caught up.
      </div>
    </template>

    <template v-slot:text>
      <div class="text-medium-emphasis text-body-small">
        Great job on completing all your tasks! This might be a good time to relax or consider planning your next set of goals. If you think of something new, just hit the button below to add a new task.
      </div>
    </template>
  </v-empty-state>
</template>
<example-meta lang="json">
  {
    "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v4---Official-Vuetify-4---UI-Kit---Snips?node-id=14459-85813"
  }
</example-meta>
