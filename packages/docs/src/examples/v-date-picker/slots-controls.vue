<template>
  <v-container class="d-flex align-start ga-12 justify-center flex-wrap">
    <v-date-picker
      :max="new Date()"
      class="weekdays-primary"
      elevation="24"
      weekday-format="short"
      hide-header
    >
      <template v-slot:controls="{ disabled, nextMonth, prevMonth, monthYearText }">
        <v-btn :disabled="disabled.includes('prev-month')" color="primary" icon="$prev" @click="prevMonth "></v-btn>
        <v-spacer></v-spacer>
        <div class="text-center">
          <div class="text-caption my-n1 text-primary">{{ monthYearText.split(' ')[1] }}</div>
          <div class="text-body-1">{{ monthYearText.split(' ')[0] }}</div>
        </div>
        <v-spacer></v-spacer>
        <v-btn :disabled="disabled.includes('next-month')" color="primary" icon="$next" @click="nextMonth"></v-btn>
      </template>
    </v-date-picker>
    <v-date-picker :max="new Date()" elevation="24" min="2000-09-15" hide-header>
      <template v-slot:controls="{ monthText, yearText, openMonths, openYears }">
        <v-sheet class="w-100 d-flex align-center rounded-lg pa-1 ga-1" color="rgba(var(--v-theme-on-surface), .2)">
          <v-btn :text="monthText" append-icon="$dropdown" class="bg-surface px-2" @click="openMonths"></v-btn>
          <v-btn :text="yearText" append-icon="$dropdown" class="bg-surface px-2" @click="openYears"></v-btn>
          <v-spacer></v-spacer>
          <v-btn class="bg-surface px-2" prepend-icon="$plus" text="Add event"></v-btn>
        </v-sheet>
      </template>
    </v-date-picker>
  </v-container>
</template>
