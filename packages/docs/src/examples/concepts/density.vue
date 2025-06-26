<template>
  <v-container class="pa-2">
    <v-row>
      <v-col cols="12">
        <v-label class="d-block mb-4">Density Scale</v-label>

        <v-btn-toggle
          v-model="density"
          class="overflow-auto"
          color="primary"
          density="compact"
          variant="outlined"
          divided
        >
          <v-btn text="Default" value="default"></v-btn>

          <v-btn text="Comfortable" value="comfortable"></v-btn>

          <v-btn text="Compact" value="compact"></v-btn>
        </v-btn-toggle>
      </v-col>

      <v-divider class="flex-grow-1 mt-1 mx-n1"></v-divider>

      <v-col cols="12">
        <v-list-subheader>Buttons</v-list-subheader>

        <v-btn
          :density="density"
          class="me-2 mb-2"
          text="Submit"
        ></v-btn>

        <v-btn
          :density="density"
          class="me-2 mb-2"
          text="Load More"
          variant="text"
        ></v-btn>

        <v-btn
          :density="density"
          class="me-2 mb-2"
          text="Cancel"
          variant="outlined"
        ></v-btn>
      </v-col>

      <v-col cols="12">
        <v-list-subheader>Chips</v-list-subheader>

        <v-chip
          :density="density"
          class="me-2 mb-2"
          text="In Progress"
        ></v-chip>

        <v-chip
          :density="density"
          class="me-2 mb-2"
          text="High Priority"
        ></v-chip>

        <v-chip
          :density="density"
          class="me-2 mb-2"
          text="Assigned"
        ></v-chip>
      </v-col>

      <v-col cols="12">
        <v-list-subheader>Toolbars</v-list-subheader>

        <v-toolbar
          :density="density"
          class="mb-2"
          elevation="2"
          title="Daily Reports"
        ></v-toolbar>

        <v-toolbar
          :density="density"
          class="mb-2"
          title="User Dashboard"
        ></v-toolbar>

        <v-toolbar
          :density="density"
          color="transparent"
          title="Project Settings"
          border
        ></v-toolbar>
      </v-col>

      <v-col cols="12">
        <v-list-subheader>Text Fields</v-list-subheader>

        <v-text-field
          :density="density"
          label="Search Query"
          model-value="Data tables"
          prepend-inner-icon="mdi-magnify"
          variant="solo"
        ></v-text-field>

        <v-text-field
          :density="density"
          label="Email Address"
          model-value="hello@vuetifyjs.com"
          prepend-inner-icon="mdi-email-outline"
        ></v-text-field>

        <v-text-field
          :density="density"
          label="Username"
          model-value="John Leider"
          prepend-inner-icon="mdi-account-outline"
          variant="outlined"
          hide-details
        ></v-text-field>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import { shallowRef } from 'vue'

  const density = shallowRef('default')
</script>
