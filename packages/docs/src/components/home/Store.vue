<template>
  <v-responsive class="pb-16">
    <HomeBgGradient />

    <v-container class="pt-10">
      <v-icon class="mb-5" color="primary" size="60">
        mdi-store-outline
      </v-icon>

      <h4 class="text-h4 font-weight-bold mb-5">
        Vuetify Store
      </h4>

      <v-responsive class="mx-auto mb-10" max-width="700">
        <h6 class="text-h6 font-weight-regular text-medium-emphasis">
          Browse our collection of premium templates, themes and UI kits.
          All themes are built with Vuetify and are available for everyone.
        </h6>
      </v-responsive>

      <v-row v-if="!items.length">
        <v-col
          v-for="n in 9"
          :key="n"
          cols="12"
          md="4"
        >
          <v-skeleton-loader class="rounded-b-0" height="180" />

          <v-skeleton-loader class="rounded-t-0" type="text" />
        </v-col>
      </v-row>

      <v-data-iterator
        v-else
        :items="items"
        :items-per-page="itemsPerPage"
        :page="page"
      >
        <template #default="{ items: _items }">
          <v-row class="my-10">
            <v-col
              v-for="product in _items"
              :key="product.raw.id"
              cols="12"
              sm="3"
            >
              <a
                :href="`https://store.vuetifyjs.com/products/${product.raw.handle}`"
                class="d-block text-decoration-none"
                rel="noopener noreferrer"
                target="_blank"
              >
                <DocThemeCard
                  :product="{
                    title: product.raw.title,
                    src: product.raw.image,
                  }"
                  class="text-center"
                />
              </a>
            </v-col>
          </v-row>
        </template>
      </v-data-iterator>

      <v-btn
        append-icon="mdi-open-in-new"
        aria-label="See More Templates"
        class="text-none"
        color="primary"
        href="https://store.vuetifyjs.com"
        rel="noopener noreferrer"
        rounded="lg"
        size="large"
        target="_blank"
        variant="flat"
      >
        Shop More
      </v-btn>
    </v-container>
  </v-responsive>
</template>

<script setup lang="ts">
  import type { ShopifyProduct } from '@vuetify/one'

  defineProps({
    itemsPerPage: {
      type: [Number, String],
      default: 4,
    },
  })

  const page = shallowRef(1)

  const products = useProductsStore()

  const items = shallowRef<ShopifyProduct[]>([])

  onMounted(async () => {
    await products.index()

    items.value = products.randomize(products.themes)
  })
</script>
