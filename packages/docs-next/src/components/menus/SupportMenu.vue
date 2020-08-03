<template>
  <app-menu>
    <template #activator="{ attrs, on }">
      <app-btn
        path="support"
        v-bind="attrs"
        v-on="on"
      >
        {{ $t('support') }}

        <app-chevron-down />
      </app-btn>
    </template>

    <div
      class="text-caption px-4 pt-3 pb-1 text--secondary"
      v-text="$t('professional-support')"
    />

    <v-list-item
      v-for="page in pages"
      :key="page"
      :to="{
        name: 'Documentation',
        params: {
          category: 'professional-support',
          page,
        }
      }"
      dense
    >
      <v-list-item-title v-text="$t(page)" />
    </v-list-item>
  </app-menu>
</template>

<script>
  export default {
    name: 'SupportMenu',

    data: () => ({
      pages: [
        'consulting',
        'enterprise',
      ],
    }),
  }
</script>
