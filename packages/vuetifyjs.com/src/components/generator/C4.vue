<template>
  <div
    style="width: 720px; margin: auto;"
    class="grey lighten-4"
  >
    <v-card-title class="secondary">
      <span class="headline white--text">User Profile</span>
    </v-card-title>
    <v-card-text>
      <v-form v-model="valid">
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12 sm6 md4>
              <v-text-field :rules="[required]" label="Legal first name" required/>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field label="Legal middle name" hint="example of helper text only on focus"/>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field
                :rules="[required]"
                label="Legal last name"
                hint="example of persistent helper text"
                persistent-hint
                required
              />
            </v-flex>
            <v-flex xs12>
              <v-text-field :rules="[required]" label="Email" required/>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                :rules="[required]"
                label="Password"
                type="password"
                required
              />
            </v-flex>
            <v-flex xs12 sm6>
              <v-select
                :items="['0-17', '18-29', '30-54', '54+']"
                :rules="[required]"
                label="Age"
                required
              />
            </v-flex>
            <v-flex xs12 sm6>
              <v-combobox
                :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                label="Interests"
                multiple
              />
            </v-flex>
            <v-flex xs12>
              <small>*indicates required field</small>
            </v-flex>
            <v-flex xs12>
              <v-alert :value="true" color="error">The form contains errors. Please correct them before submitting it.</v-alert>
            </v-flex>
          </v-layout>
        </v-container>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer/>
      <v-btn color="primary" flat>Close</v-btn>
      <v-btn color="primary" flat>Save</v-btn>
    </v-card-actions>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        valid: false,
        required: (v) => !!v || 'Required'
      }
    }
  }
</script>
