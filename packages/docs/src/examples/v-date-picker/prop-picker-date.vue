<template>
  <v-row>
    <v-col
      class="my-2 px-1"
      cols="12"
      sm="6"
    >
      <v-date-picker
        ref="picker"
        v-model="date"
        v-model:picker-date="pickerDate"
        full-width
      ></v-date-picker>
    </v-col>
    <v-col
      class="my-2 px-1"
      cols="12"
      sm="6"
    >
      <div class="text-h6">
        Month news ({{ pickerDate || 'change month...' }})
      </div>
      <div class="subheading">
        Change month to see other news
      </div>
      <ul class="ma-4">
        <li
          v-for="note in notes"
          :key="note"
        >
          {{ note }}
        </li>
      </ul>
    </v-col>
  </v-row>
</template>

<script setup>
  import { ref, watch } from 'vue'

  const allNotes = [
    'President met with prime minister',
    'New power plant opened',
    'Rocket launch announced',
    'Global warming discussion cancelled',
    'Company changed its location',
  ]

  const date = ref((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10))
  const pickerDate = ref(null)
  const notes = ref([])

  watch(pickerDate, val => {
    notes.value = [
      allNotes[Math.floor(Math.random() * 5)],
      allNotes[Math.floor(Math.random() * 5)],
      allNotes[Math.floor(Math.random() * 5)],
    ].filter((value, index, self) => self.indexOf(value) === index)
  })
</script>

<script>
  export default {
    data: () => ({
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      pickerDate: null,
      notes: [],
      allNotes: [
        'President met with prime minister',
        'New power plant opened',
        'Rocket launch announced',
        'Global warming discussion cancelled',
        'Company changed its location',
      ],
    }),
    watch: {
      pickerDate (val) {
        this.notes = [
          this.allNotes[Math.floor(Math.random() * 5)],
          this.allNotes[Math.floor(Math.random() * 5)],
          this.allNotes[Math.floor(Math.random() * 5)],
        ].filter((value, index, self) => self.indexOf(value) === index)
      },
    },
  }
</script>
