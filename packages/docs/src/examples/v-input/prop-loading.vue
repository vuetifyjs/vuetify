<template>
  <v-input messages="Fetching data…">
    <v-field
      label="Profile"
      variant="outlined"
      color="success"
      loading="success"
      disabled
      dirty
    >
      <template #default="{ props: fieldProps }">
        <input
          v-bind="fieldProps"
          value="Loading…"
          readonly
        >
      </template>
    </v-field>
  </v-input>
</template>
