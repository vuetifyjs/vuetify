<template>
  <v-row>
    <v-col cols="12" md="6">
      <v-locale-provider :messages="{ en, ko }" locale="ko">
        <v-time-input v-model="time" format="ampm" label="한국어"></v-time-input>
      </v-locale-provider>
    </v-col>

    <v-col cols="12" md="6">
      <v-locale-provider :messages="{ en, ar }" locale="ar" rtl>
        <v-time-input v-model="time" format="ampm" label="العربية"></v-time-input>
      </v-locale-provider>
    </v-col>
  </v-row>
</template>

<script setup>
  import { shallowRef } from 'vue'
  import { ar, en, ko } from 'vuetify/locale'

  const time = shallowRef('14:30')
</script>
