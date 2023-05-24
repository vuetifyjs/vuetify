<template>
  <v-card
    class="mx-auto"
    color="purple-lighten-1"
    max-width="500"
  >
    <v-toolbar flat color="purple">
      <v-btn icon="mdi-account"></v-btn>

      <v-toolbar-title class="font-weight-light">
        User Profile
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn
        icon
        @click="isEditing = !isEditing"
      >
        <v-fade-transition leave-absolute>
          <v-icon v-if="isEditing">mdi-close</v-icon>

          <v-icon v-else>mdi-pencil</v-icon>
        </v-fade-transition>
      </v-btn>
    </v-toolbar>

    <v-card-text>
      <v-text-field
        :disabled="!isEditing"
        color="white"
        label="Name"
      ></v-text-field>

      <v-autocomplete
        :disabled="!isEditing"
        :items="states"
        :custom-filter="customFilter"
        color="white"
        item-title="name"
        item-value="abbr"
        label="State"
      ></v-autocomplete>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn
        :disabled="!isEditing"
        @click="save"
      >
        Save
      </v-btn>
    </v-card-actions>

    <v-snackbar
      v-model="hasSaved"
      :timeout="2000"
      attach
      position="absolute"
      location="bottom left"
    >
      Your profile has been updated
    </v-snackbar>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      hasSaved: false,
      isEditing: null,
      model: null,
      states: [
        { name: 'Florida', abbr: 'FL', id: 1 },
        { name: 'Georgia', abbr: 'GA', id: 2 },
        { name: 'Nebraska', abbr: 'NE', id: 3 },
        { name: 'California', abbr: 'CA', id: 4 },
        { name: 'New York', abbr: 'NY', id: 5 },
      ],
    }),

    methods: {
      customFilter (itemTitle, queryText, item) {
        const textOne = item.raw.name.toLowerCase()
        const textTwo = item.raw.abbr.toLowerCase()
        const searchText = queryText.toLowerCase()

        return textOne.indexOf(searchText) > -1 ||
          textTwo.indexOf(searchText) > -1
      },
      save () {
        this.isEditing = !this.isEditing
        this.hasSaved = true
      },
    },
  }
</script>
