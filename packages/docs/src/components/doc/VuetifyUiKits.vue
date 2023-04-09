<template>
  <v-row>
    <v-col
      v-for="product in products"
      :key="product.title"
      cols="12"
      sm="6"
      md="6"
    >
      <a
        :href="`https://store.vuetifyjs.com/products/${product.handle}`"
        class="text-high-emphasis text-decoration-none"
        rel="noopener"
        target="_blank"
      >
        <app-figure
          :alt="product.title"
          :src="(product?.image?.src ?? product?.images[0].src)"
          height="200"
          cover
          outlined
        >
          <figcaption class="d-flex text-subtitle-2 align-center justify-space-between text-capitalize mt-3">
            <span v-text="product.title" />

            <v-chip
              label
              class="text-uppercase ms-2"
              :color="product.isFree ? 'primary' : 'success'"
              size="small"
              variant="flat"
            >
              {{ product.isFree ? 'Free' : `$${product.variant.price}` }}
            </v-chip>
          </figcaption>
        </app-figure>
      </a>
    </v-col>
  </v-row>
</template>

<script setup>
  import { computed, onBeforeMount } from 'vue'
  import { useShopifyStore } from '@/store/shopify'

  const shopify = useShopifyStore()

  onBeforeMount(shopify.fetch)

  const products = computed(() => {
    return shopify.products
      .filter(product => {
        return product.productType === 'UI Kits'
      })
      .map(product => {
        const variant = product.variants?.[0]

        return {
          ...product,
          isFree: Number(variant?.price) === 0,
          isOnSale: Number(variant?.price) < Number(variant?.compareAtPrice),
          variant,
        }
      })
  })
</script>
