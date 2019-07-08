<template>
  <v-file-input label="File input">
    <template #selection="{ files }">
      <v-chip v-for="file in files" :key="file.name">
        {{ file.size }} B large file named {{ file.name }}
      </v-chip>
    </template>
  </v-file-input>
</template>
