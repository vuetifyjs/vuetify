<template>
  <v-sheet
    class="mx-auto pb-12 text-center"
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
            eager
            height="180"
            min-height="180"
          />
        </a>
      </v-col>
    </v-row>

    <br>

    <div class="mb-8">
      <div class="d-flex align-center justify-center my-1 px-4">
        <small class="font-weight-bold text-no-wrap">Powered By</small>

        <sponsor-card
          min-height="64"
          slug="made-with-vuejs"
          width="180"
        />
      </div>
    </div>

    <br>

    <v-btn
      :aria-label="t('see-more-projects')"
      color="primary"
      href="https://madewithvuejs.com/vuetify"
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
  // Components
  import SponsorCard from '@/components/sponsor/Card.vue'
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
