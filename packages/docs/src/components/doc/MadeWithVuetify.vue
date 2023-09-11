<template>
  <v-sheet
    class="mx-auto pa-3 pb-12"
    color="transparent"
    max-width="900"
  >
    <v-row>
      <v-col
        v-for="project in items"
        :key="project.id"
        cols="12"
        sm="4"
      >
        <a
          :href="project.url"
          target="_blank"
          rel="noopener noreferrer"
          class="d-block text-decoration-none"
          style="min-height: 205px;"
        >
          <app-figure
            class="border"
            :name="project.title"
            :src="project.image"
            :title="project.title"
            height="180"
            min-height="180"
          />
        </a>
      </v-col>
    </v-row>

    <br>
    <br>

    <v-btn
      :aria-label="t('see-more-projects')"
      color="primary"
      href="https://madewithvuetify.com/"
      rel="noopener noreferrer"
      size="large"
      target="_blank"
      variant="outlined"
      @click="onClick"
    >
      <span
        class="text-capitalize font-weight-regular"
        v-text="t('see-more-projects')"
      />
    </v-btn>
  </v-sheet>
</template>

<script setup>
  // Composables
  import { useMadeWithVuetifyStore } from '@/store/made-with-vuetify'
  import { useGtag } from 'vue-gtag-next'
  import { useI18n } from 'vue-i18n'

  // Utilities
  import { computed } from 'vue'

  const { event } = useGtag()
  const { t } = useI18n()
  const store = useMadeWithVuetifyStore()

  const items = computed(() => {
    return shuffle(store.items).slice(0, 9)
  })

  function onClick (project) {
    event('click', {
      event_category: 'vuetify-project',
      event_label: project.title,
      value: project.id,
    })
  }

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
