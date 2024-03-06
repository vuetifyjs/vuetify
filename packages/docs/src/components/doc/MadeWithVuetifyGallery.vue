<template>
  <v-sheet
    class="mx-auto text-center"
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
        <v-skeleton-loader height="180" />

        <v-skeleton-loader type="text" />
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
            v-for="project in _items"
            :key="project.raw.id"
            cols="12"
            sm="4"
          >
            <a
              :href="project.raw.url"
              class="d-block text-decoration-none"
              rel="noopener noreferrer"
              style="min-height: 205px;"
              target="_blank"
            >
              <AppFigure
                :name="project.raw.title"
                :src="project.raw.image"
                :title="project.raw.title"
                class="border"
                height="180"
                min-height="180"
                eager
              />
            </a>
          </v-col>
        </v-row>
      </template>

      <template
        v-if="pagination"
        #footer="{ pageCount }"
      >

        <v-pagination
          v-model="page"
          :length="pageCount"
        />
      </template>
    </v-data-iterator>
  </v-sheet>
</template>

<script setup lang="ts">
  const props = defineProps({
    itemsPerPage: {
      type: [Number],
      default: 9,
    },
    pagination: Boolean,
  })

  const page = ref(1)
  const store = useMadeWithVuetifyStore()

  const items = computed(() => {
    if (props.pagination) {
      return store.items.slice((page.value - 1) * props.itemsPerPage, page.value * props.itemsPerPage)
    }
    return shuffle(store.items)
  })

  function shuffle (array: any[]) {
    let currentIndex = array.length
    let temporaryValue
    let randomIndex
    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex -= 1
      // And swap it with the current element.
      temporaryValue = array[currentIndex]
      array[currentIndex] = array[randomIndex]
      array[randomIndex] = temporaryValue
    }
    return array
  }
</script>
