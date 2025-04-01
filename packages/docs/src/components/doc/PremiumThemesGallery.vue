<template>
  <v-sheet
    class="mx-auto text-center pa-3 mb-4"
    color="transparent"
    max-width="900"
  >
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
        <v-row style="min-height: 750px;">
          <v-col
            v-for="product in _items"
            :key="product.raw.id"
            cols="12"
            sm="4"
          >
            <a
              :href="`https://store.vuetifyjs.com/products/${product.raw.handle}`"
              class="d-block text-decoration-none"
              rel="noopener noreferrer"
              style="min-height: 205px;"
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
  </v-sheet>

  <v-btn
    append-icon="mdi-open-in-new"
    aria-label="See More Templates"
    color="primary"
    href="https://store.vuetifyjs.com"
    rel="noopener noreferrer"
    size="large"
    target="_blank"
    variant="outlined"
  >
    <span class="text-capitalize font-weight-regular">
      See More Templates
    </span>
  </v-btn>
</template>

<script setup>
  defineProps({
    itemsPerPage: {
      type: [Number, String],
      default: 9,
    },
  })

  const page = shallowRef(1)

  const products = useProductsStore()

  const items = shallowRef([])

  onMounted(async () => {
    await products.index()

    items.value = products.randomize(products.themes)
  })
</script>
