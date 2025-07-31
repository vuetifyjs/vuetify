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
                :src="getPreviewImage(project.raw.image)"
                :title="project.raw.title"
                height="230"
                max-height="230"
                min-height="230"
                cover
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

<script setup>
  defineProps({
    itemsPerPage: {
      type: [Number, String],
      default: 9,
    },
    pagination: Boolean,
  })

  const page = shallowRef(1)
  const store = useMadeWithVuetifyStore()

  const items = computed(() => {
    return shuffle(store.items.slice())
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

  function getPreviewImage (url) {
    return url.replace(/(.*)\/([^/]+)\.([^.]+)$/g, '$1/conversions/$2-overview.$3')
  }
</script>
