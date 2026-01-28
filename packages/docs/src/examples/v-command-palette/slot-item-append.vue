<template>
  <div>
    <div class="text-center mb-4">
      <v-btn text="Open" @click="model = !model"></v-btn>
      <v-command-palette
        v-model="model"
        :items="items"
        :search-props="{ autocomplete: 'off' }"
        hotkey="ctrl+/"
        max-width="500"
        placeholder="Remind me..."
      >
        <template v-slot:input.append-inner>
          <v-kbd class="opacity-70 align-self-center py-1">Esc</v-kbd>
        </template>
        <template v-slot:item.append="{ item }">
          <span class="text-caption opacity-70">{{ item.hint }}</span>
        </template>
        <template v-slot:append>
          <div class="d-flex pa-3 ga-1 text-caption align-center border-t opacity-70">
            <v-kbd><v-icon
              :icon="['M16.018 3.815L15.232 8h-4.966l.716-3.815l-1.964-.37L8.232 8H4v2h3.857l-.751 4H3v2h3.731l-.714 3.805l1.965.369L8.766 16h4.966l-.714 3.805l1.965.369l.783-4.174H20v-2h-3.859l.751-4H21V8h-3.733l.716-3.815zM14.106 14H9.141l.751-4h4.966z']"
              size="14"
            ></v-icon></v-kbd>
            <div class="mr-3">tags</div>
            <v-kbd><v-icon icon="$arrowup" size="14"></v-icon></v-kbd>
            <v-kbd><v-icon icon="$arrowdown" size="14"></v-icon></v-kbd>
            <div class="mr-3">navigate</div>
            <v-kbd><v-icon icon="$enter" size="14"></v-icon></v-kbd>
            <div class="mr-3">open</div>
            <v-kbd>esc</v-kbd>
            <div class="mr-3">close</div>
          </div>
        </template>
      </v-command-palette>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { useDate } from 'vuetify'

  const model = ref(false)
  const adapter = useDate()

  function futureTime (minutes: number) {
    const d = new Date()
    d.setMinutes(d.getMinutes() + minutes)
    return new Intl.DateTimeFormat(adapter.locale, { hour: 'numeric', minute: 'numeric' }).format(d)
  }

  function futureDay (days: number, hour = 9) {
    const d = new Date()
    d.setDate(d.getDate() + days)
    d.setHours(hour)
    d.setMinutes(0)
    d.setMilliseconds(0)
    return new Intl.DateTimeFormat(adapter.locale, { weekday: 'long', hour: 'numeric', minute: 'numeric' }).format(d)
  }

  const items = ref([
    { title: 'In 15 minutes', hint: futureTime(15), value: '+15m' },
    { title: 'In 30 minutes', hint: futureTime(30), value: '+30m' },
    { title: 'In 1 hour', hint: futureTime(60), value: '+60m' },
    { title: 'Tomorrow', hint: futureDay(1), value: '+1d' },
    { title: 'Next week', hint: futureDay(7), value: '+7d' },
  ])
</script>
