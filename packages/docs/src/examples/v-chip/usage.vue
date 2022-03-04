<template>
  <usage-example
    v-model="model"
    :options="options"
    name="v-chip"
  >
    <div class="text-center">
      <v-defaults-provider
        :defaults="{
          VChip: {
            label: model === 'label',
            variant: model === 'outlined' ? 'outlined' : undefined
          }
        }"
      >
        <v-chip>
          Chip Component
        </v-chip>
      </v-defaults-provider>
    </div>
  </usage-example>
</template>

<script>
  export default {
    name: 'ChipUsageExample',

    data: () => ({
      model: 'default',
      options: ['label', 'outlined'],
    }),
  }
</script>
