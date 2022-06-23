<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col
          cols="12"
          sm="6"
        >
          <v-text-field
            v-model="message1"
            label="Regular"
            clearable
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          sm="6"
        >
          <v-text-field
            v-model="message2"
            label="Solo"
            variant="solo"
            clearable
            clear-icon="mdi-delete"
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          sm="6"
        >
          <v-text-field
            v-model="message3"
            label="Underlined"
            variant="underlined"
            clearable
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          sm="6"
        >
          <v-text-field
            v-model="message4"
            label="Outlined"
            variant="outlined"
            clearable
            clear-icon="mdi-cancel"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
  export default {
    data () {
      return {
        message1: 'Hey!',
        message2: 'Hey!',
        message3: 'Hey!',
        message4: 'Hey!',
      }
    },
  }
</script>
