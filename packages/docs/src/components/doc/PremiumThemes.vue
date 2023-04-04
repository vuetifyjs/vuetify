<template>
  <v-row>
    <template v-if="products.length === 0">
      <v-col>
        <alert type="error">Problem fetching themes</alert>
      </v-col>
    </template>

    <template v-else>
      <v-col
        v-for="product in products"
        :key="product.title"
        cols="12"
        md="6"
      >
        <a
          :href="`https://store.vuetifyjs.com/products/${product.handle}?utm_source=vuetifyjs.com&utm_medium=themes`"
          class="text-high-emphasis text-decoration-none"
          rel="noopener"
          target="_blank"
        >
          <app-figure
            :alt="product.alt"
            :name="product.title"
            :src="product.src"
            height="185"
            max-height="185"
            min-height="185"
          >
            <figcaption class="d-flex text-subtitle-2 align-center text-capitalize mt-3">
              <span v-text="product.title" />

              <v-chip
                v-if="product.isOnSale"
                class="text-uppercase px-1 ms-2"
                color="red-lighten-2"
                label
                size="x-small"
              >
                On Sale
              </v-chip>

              <v-chip
                v-if="product.isFree"
                class="text-uppercase px-1 ms-2"
                color="primary"
                label
                size="x-small"
              >
                Free
              </v-chip>

              <span
                v-else
                class="ms-auto"
                v-text="`$${product.price}`"
              />
            </figcaption>
          </app-figure>
        </a>
      </v-col>
    </template>
  </v-row>
</template>

<script setup>
  import { useShopifyStore } from '@/store/shopify'
  import { computed, onMounted } from 'vue'

  const store = useShopifyStore()

  // const products = computed(() => [])
  const products = computed(() => {
    const all = []

    for (const product of store.products) {
      if (product.productType !== 'Themes') continue
      const variant = product.variants[0]
      const price = variant.price

      all.push({
        alt: product.images[0].alt,
        src: product.images[0].src,
        handle: product.handle,
        isFree: Number(variant.price) === 0,
        isOnSale: Number(variant.price) < Number(variant.compareAtPrice ?? 0),
        title: product.title,
        price,
        variant,
      })
    }

    return all.sort((a, b) => {
      const aPrice = parseFloat(a.variants?.[0].price ?? a.variant?.price)
      const bPrice = parseFloat(b.variants?.[0].price ?? b.variant?.price)
      return aPrice < bPrice ? -1 : aPrice > bPrice ? 1 : 0
    })
  })

  onMounted(async () => {
    await store.fetch()
  })
</script>
