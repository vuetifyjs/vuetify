<template>
  <v-form>
    <v-container fluid>
      <v-layout row wrap>

        <v-flex xs12 sm6>
          <v-text-field
            v-model="password"
            :append-icon="show1 ? 'visibility' : 'visibility_off'"
            :rules="[rules.required, rules.min]"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            label="Normal with hint text"
            hint="At least 8 characters"
            counter
            @click:append="show1 = !show1"
          ></v-text-field>
        </v-flex>

        <v-flex xs12 sm6>
          <v-text-field
            :append-icon="show2 ? 'visibility' : 'visibility_off'"
            :rules="[rules.required, rules.min]"
            :type="show2 ? 'text' : 'password'"
            name="input-10-2"
            label="Visible"
            hint="At least 8 characters"
            value="wqfasds"
            class="input-group--focused"
            @click:append="show2 = !show2"
          ></v-text-field>
        </v-flex>

        <v-flex xs12 sm6>
          <v-text-field
            :append-icon="show3 ? 'visibility' : 'visibility_off'"
            :rules="[rules.required, rules.min]"
            :type="show3 ? 'text' : 'password'"
            name="input-10-2"
            label="Not visible"
            hint="At least 8 characters"
            value="wqfasds"
            class="input-group--focused"
            @click:append="show3 = !show3"
          ></v-text-field>
        </v-flex>

        <v-flex xs12 sm6>
          <v-text-field
            :append-icon="show4 ? 'visibility' : 'visibility_off'"
            :rules="[rules.required, rules.emailMatch]"
            :type="show4 ? 'text' : 'password'"
            name="input-10-2"
            label="Error"
            hint="At least 8 characters"
            value="Pa"
            error
            @click:append="show4 = !show4"
          ></v-text-field>
        </v-flex>

      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
  export default {
    data () {
      return {
        show1: false,
        show2: true,
        show3: false,
        show4: false,
        password: 'Password',
        rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
          emailMatch: () => ('The email and password you entered don\'t match')
        }
      }
    }
  }
</script>
