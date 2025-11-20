<template>
  <v-responsive class="py-16">
    <HomeCommonGradient opacity-class="opacity-10" />

    <v-container class="pt-0">
      <HomeCommonTitle
        class="mb-10"
        description="Browse our collection of premium templates, themes and UI kits. All themes are built with Vuetify and are available for everyone."
        title="Vuetify Store"
      >
        <template #subtitle>
          <v-icon class="mb-5" color="primary" size="60">
            mdi-store-outline
          </v-icon>
        </template>
      </HomeCommonTitle>

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

      <v-slide-group
        v-else
        class="mb-10"
        content-class="mx-3"
        show-arrows
      >
        <template #next>
          <v-btn
            class="mb-15"
            icon="mdi-chevron-right"
          />
        </template>
        <template #prev>
          <v-btn
            class="mb-15"
            icon="mdi-chevron-left"
          />
        </template>

        <v-slide-group-item
          v-for="product in items"
          :key="product.id"
        >
          <a
            :href="`https://store.vuetifyjs.com/products/${product.handle}`"
            class="d-block text-decoration-none mx-5"
            rel="noopener noreferrer"
            style="width: 300px"
            target="_blank"
          >
            <DocThemeCard
              :product="{
                title: product.title,
                src: product.image,
              }"
              class="text-center"
            />
          </a>
        </v-slide-group-item>
      </v-slide-group>

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

  const products = useProductsStore()

  const items = shallowRef<ShopifyProduct[]>([])

  onMounted(async () => {
    await products.index()

    items.value = products.randomize(products.themes)
  })
</script>
