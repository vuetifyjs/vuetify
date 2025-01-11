<template>
  <v-container>
    <v-row justify="space-around">
      <div>
        <v-date-picker
          :model-value="dates"
          title="Week selection"
          show-adjacent-months
          show-week
          @update:model-value="selectWeek($event)"
        >
          <template v-slot:header>
            <v-date-picker-header>
              {{ headerText }}
            </v-date-picker-header>
          </template>
        </v-date-picker>
        <div class="mt-3 d-flex justify-center">
          <v-btn :disabled="!dates.length" @click="dates = []">Clear</v-btn>
        </div>
      </div>
    </v-row>
  </v-container>
</template>

<script setup>
  import { computed, ref } from 'vue'
  import { useDate } from 'vuetify'

  const adapter = useDate()

  const dates = ref([])

  const headerText = computed(() => {
    if (dates.value.length < 2) return 'Select week'

    const firstWeekDay = adapter.startOfWeek(dates.value[0])
    const firstYearDay = adapter.startOfYear(dates.value[0])

    const firstDayDiff = adapter.getDiff(firstWeekDay, firstYearDay, 'days')
    const weekOffset = firstYearDay.getDay() === 0 ? 1 : 0

    return `${firstWeekDay.getFullYear()} Week ${weekOffset + Math.ceil(firstDayDiff / 7)}`
  })

  function selectWeek (date) {
    const firstDay = adapter.startOfWeek(date)
    dates.value = Array.from({ length: 7 })
      .map((_, i) => adapter.addDays(firstDay, i))
  }
</script>

<script>
  import { useDate } from 'vuetify'

  export default {
    setup () {
      const adapter = useDate()
      return { adapter }
    },
    data: () => ({
      dates: [],
    }),
    computed: {
      headerText () {
        if (this.dates.length < 2) return 'Select week'

        const firstWeekDay = this.adapter.startOfWeek(this.dates[0])
        const firstYearDay = this.adapter.startOfYear(this.dates[0])

        const firstDayDiff = this.adapter.getDiff(
          firstWeekDay,
          firstYearDay,
          'days'
        )
        const weekOffset = firstYearDay.getDay() === 0 ? 1 : 0

        return `${firstWeekDay.getFullYear()} Week ${
          weekOffset + Math.ceil(firstDayDiff / 7)
        }`
      },
    },
    mounted () {
      this.adapter = useDate()
    },
    methods: {
      selectWeek (date) {
        const firstDay = this.adapter.startOfWeek(date)
        this.dates = Array.from({ length: 7 }).map((_, i) =>
          this.adapter.addDays(firstDay, i)
        )
      },
    },
  }
</script>
