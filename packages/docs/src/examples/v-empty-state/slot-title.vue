<template>
  <v-empty-state icon="$success">
    <template v-slot:media>
      <v-icon color="surface-variant"></v-icon>
    </template>

    <template v-slot:headline>
      <div class="text-h4">
        All Done For Now!
      </div>
    </template>

    <template v-slot:title>
      <div class="text-h6">
        You're all caught up.
      </div>
    </template>

    <template v-slot:text>
      <div class="text-medium-emphasis text-caption">
        Great job on completing all your tasks! This might be a good time to relax or consider planning your next set of goals. If you think of something new, just hit the button below to add a new task.
      </div>
    </template>
  </v-empty-state>
</template>
<example-meta lang="json">
  {
    "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v3.0---Official-Vuetify-3-UI-Kit?node-id=2261-33467&t=tC3y53U3XKPv8ZyJ-4"
  }
</example-meta>
