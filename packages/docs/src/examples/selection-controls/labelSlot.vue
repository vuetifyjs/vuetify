<template>
  <v-container fluid>
    <v-checkbox v-model="checkbox">
      <template v-slot:label>
        <div>
          I agree that
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <a
                target="_blank"
                href="http://vuetifyjs.com"
                @click.stop
                v-on="on"
              >
                Vuetify
              </a>
            </template>
            Opens in new window
          </v-tooltip>
          is awesome
        </div>
      </template>
    </v-checkbox>

    <v-radio-group v-model="radios">
      <template v-slot:label>
        <div>Your favourite <strong>search engine</strong></div>
      </template>
      <v-radio value="Google">
        <template v-slot:label>
          <div>Of course it's <strong class="success--text">Google</strong></div>
        </template>
      </v-radio>
      <v-radio value="Duckduckgo">
        <template v-slot:label>
          <div>Definitely <strong class="primary--text">Duckduckgo</strong></div>
        </template>
      </v-radio>
    </v-radio-group>

    <v-switch v-model="switchMe">
      <template v-slot:label>
        Turn on the progress: <v-progress-circular :indeterminate="switchMe" :value="0" size="24" class="ml-2"></v-progress-circular>
      </template>
    </v-switch>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        checkbox: false,
        radios: 'Duckduckgo',
        switchMe: false
      }
    }
  }
</script>
