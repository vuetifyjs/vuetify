<template>
  <div>
    <v-card v-for="[name, cls] in classes" :key="name" class="my-4">
      <div :class="[cls, 'pa-2']">{{ name }}</div>
      <div class="text-label-medium pa-2 border-t">
        <v-code>{{ cls }}</v-code>
      </div>
    </v-card>
  </div>
</template>

<script setup>
  const classes = [
    ['Display Large', 'text-display-large'],
    ['Display Medium', 'text-display-medium'],
    ['Display Small', 'text-display-small'],
    ['Headline Large', 'text-headline-large'],
    ['Headline Medium', 'text-headline-medium'],
    ['Headline Small', 'text-headline-small'],
    ['Title Large', 'text-title-large'],
    ['Title Medium', 'text-title-medium'],
    ['Title Small', 'text-title-small'],
    ['Body Large', 'text-body-large'],
    ['Body Medium', 'text-body-medium'],
    ['Body Small', 'text-body-small'],
    ['Label Large', 'text-label-large'],
    ['Label Medium', 'text-label-medium'],
    ['Label Small', 'text-label-small'],
  ]
</script>

<script>
  export default {
    data: () => ({
      classes: [
        ['Display Large', 'text-display-large'],
        ['Display Medium', 'text-display-medium'],
        ['Display Small', 'text-display-small'],
        ['Headline Large', 'text-headline-large'],
        ['Headline Medium', 'text-headline-medium'],
        ['Headline Small', 'text-headline-small'],
        ['Title Large', 'text-title-large'],
        ['Title Medium', 'text-title-medium'],
        ['Title Small', 'text-title-small'],
        ['Body Large', 'text-body-large'],
        ['Body Medium', 'text-body-medium'],
        ['Body Small', 'text-body-small'],
        ['Label Large', 'text-label-large'],
        ['Label Medium', 'text-label-medium'],
        ['Label Small', 'text-label-small'],
      ],
    }),
  }
</script>
