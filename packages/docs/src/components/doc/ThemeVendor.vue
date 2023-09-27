<template>
  <v-row v-if="vendor">
    <v-col
      v-for="product in vendor.products"
      :key="product.title"
      cols="12"
      sm="6"
    >
      <ThemeCard :product="product" />
    </v-col>

    <v-col class="text-center mb-8" cols="12">
      <app-btn
        :href="vendor.moreUrl"
        :text="`See More Themes from ${vendor.name}`"
        append-icon="mdi-open-in-new"
        color="primary"
        size="large"
        target="_blank"
        rel="noopener noreferrer"
        variant="outlined"
      />
    </v-col>
  </v-row>
</template>

<script setup>
  // Components
  import ThemeCard from './ThemeCard.vue'

  // Utilities
  import { computed } from 'vue'

  // Stores
  import { useShopifyStore } from '@/store/shopify'

  const store = useShopifyStore()

  const props = defineProps({
    name: {
      type: String,
      required: true,
    },
  })

  const vendor = computed(() => store.byVendor[props.name])
</script>
