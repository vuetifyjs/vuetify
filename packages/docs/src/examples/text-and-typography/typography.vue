<template>
  <div>
    <v-card v-for="[name, cls] in classes" :key="name" class="my-4">
      <div :class="[cls, 'pa-2']">{{ name }}</div>
      <div class="text-caption pa-2 bg-grey-lighten-4">
        <div class="text-grey">Class</div>
        <div class="font-weight-medium">{{ cls }}</div>
      </div>
    </v-card>
  </div>
</template>

<script>
  export default {
    data: () => ({
      classes: [
        ['Heading 1', 'text-h1'],
        ['Heading 2', 'text-h2'],
        ['Heading 3', 'text-h3'],
        ['Heading 4', 'text-h4'],
        ['Heading 5', 'text-h5'],
        ['Heading 6', 'text-h6'],
        ['Subtitle 1', 'text-subtitle-1'],
        ['Subtitle 2', 'text-subtitle-2'],
        ['Body 1', 'text-body-1'],
        ['Body 2', 'text-body-2'],
        ['Button', 'text-button'],
        ['Caption', 'text-caption'],
        ['Overline', 'text-overline'],
      ],
    }),
  }
</script>
