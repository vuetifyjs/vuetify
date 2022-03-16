<template>
  <usage-example
    v-model="model"
    name="v-tooltip"
  >
    <v-defaults-provider
      :defaults="{
        VTooltip: {}
      }"
    >
      <div class="text-center d-flex align-center justify-space-around">
        <v-tooltip bottom>
          <template v-slot:activator="{ props }">
            <v-btn
              color="primary"
              dark
              v-bind="props"
            >
              Button
            </v-btn>
          </template>
          <span>Tooltip</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ props }">
            <v-icon
              color="primary"
              dark
              v-bind="props"
            >
              mdi-home
            </v-icon>
          </template>
          <span>Tooltip</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ props }">
            <span
              v-bind="props"
            >This text has a tooltip</span>
          </template>
          <span>Tooltip</span>
        </v-tooltip>
      </div>
    </v-defaults-provider>
  </usage-example>
</template>
<script>
  export default {
    name: 'TooltipUsageExample',

    data: () => ({
      model: 'default',
      options: ['label', 'outlined'],
    }),
  }
</script>
