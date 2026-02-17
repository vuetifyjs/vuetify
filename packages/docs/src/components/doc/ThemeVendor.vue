<template>
  <v-row v-if="vendor">
    <v-col
      v-for="product in vendor.products"
      :key="product.title"
      cols="12"
      sm="6"
    >
      <DocThemeCard :product="product" />
    </v-col>

    <v-col class="text-center mb-8" cols="12">
      <AppBtn
        :href="vendor.moreUrl"
        append-icon="mdi-open-in-new"
        color="primary"
        rel="noopener noreferrer"
        size="large"
        target="_blank"
        variant="outlined"
      >
        {{ t('see-more-themes-from', { vendor: vendor.name }) }}
      </AppBtn>
    </v-col>
  </v-row>
</template>

<script setup>
  const { t } = useI18n()
  const store = useShopifyStore()

  const props = defineProps({
    name: {
      type: String,
      required: true,
    },
  })

  const vendor = computed(() => store.byVendor[props.name])
</script>
