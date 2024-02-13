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
      :page="page"
      :items-per-page="itemsPerPage"
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
              target="_blank"
              rel="noopener noreferrer"
              class="d-block text-decoration-none"
              style="min-height: 205px;"
            >
              <AppFigure
                class="border"
                :name="project.raw.title"
                :src="project.raw.image"
                :title="project.raw.title"
                eager
                height="180"
                min-height="180"
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

<script setup>
  defineProps({
    itemsPerPage: {
      type: [Number, String],
      default: 9,
    },
    pagination: Boolean,
  })

  const page = ref(1)
  const store = useMadeWithVuetifyStore()

  const items = computed(() => {
    return shuffle(store.items)
  })

  function shuffle (array) {
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
