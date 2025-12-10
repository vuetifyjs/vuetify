<template>
  <div class="d-grid grid-cols-auto-fill-250 ga-4 bg-surface-variant pa-4">
    <v-sheet
      v-for="(card, index) in cards"
      :key="index"
      class="pa-4"
    >
      <div class="text-subtitle-1 mb-2">{{ card.title }}</div>
      <div class="text-body-2">{{ card.content }}</div>
    </v-sheet>
  </div>
</template>

<script setup>
  const cards = [
    {
      title: 'Short Item',
      content: 'Brief content here.',
    },
    {
      title: 'Medium Length Item Title',
      content: 'This item has a moderate amount of content to demonstrate how auto-fill handles different content lengths while maintaining consistent 250px minimum column widths.',
    },
    {
      title: 'Very Long Item Title That Spans Multiple Lines',
      content: 'This item contains a significant amount of content to show how auto-fill maintains the minimum 250px width while allowing items to grow taller to accommodate varying content lengths. The grid automatically creates as many columns as fit in the container width, and items expand vertically as needed.',
    },
    {
      title: 'Another Item',
      content: 'Different content length to show variety.',
    },
    {
      title: 'Responsive Item',
      content: 'Watch how the number of columns changes when you resize the browser window. Auto-fill creates as many 250px columns as can fit in the available space.',
    },
    {
      title: 'Final Item',
      content: 'Shows how auto-fill handles multiple items with varying heights.',
    },
  ]
</script>
