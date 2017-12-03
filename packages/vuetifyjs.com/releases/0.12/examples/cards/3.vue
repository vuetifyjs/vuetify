<template>
  <v-card>
    <v-card-row class="blue-grey darken-1">
      <v-card-title>
        <span class="white--text">Visit Space</span>
        <v-spacer></v-spacer>
        <v-menu id="space" bottom left origin="top right" transition="v-scale-transition">
          <v-btn icon="icon" slot="activator" class="white--text">
            <v-icon>more_vert</v-icon>
          </v-btn>
          <v-list>
            <v-list-item>
              <v-list-tile>
                <v-list-tile-title>Remove Card</v-list-tile-title>
              </v-list-tile>
            </v-list-item>
            <v-list-item>
              <v-list-tile>
                <v-list-tile-title>Send Feedback</v-list-tile-title>
              </v-list-tile>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-card-title>
    </v-card-row>
    <v-card-row img="/static/doc-images/cards/space.jpg" height="300px"></v-card-row>
    <v-card-text class="blue-grey darken-3 white--text">
      <div v-text="card_text"></div>
    </v-card-text>
    <v-card-row actions class="blue-grey darken-1 mt-0">
      <v-btn flat class="white--text">Get Started</v-btn>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon class="white--text">explore</v-icon>
      </v-btn>
    </v-card-row>
  </v-card>
</template>

<script>
  export default {
    data () {
      return {
        card_text: 'Lorem ipsum dolor sit amet, brute iriure accusata ne mea. Eos suavitate referrentur ad, te duo agam libris qualisque, utroque quaestio accommodare no qui. Et percipit laboramus usu, no invidunt verterem nominati mel. Dolorem ancillae an mei, ut putant invenire splendide mel, ea nec propriae adipisci. Ignota salutandi accusamus in sed, et per malis fuisset, qui id ludus appareat.'
      }
    }
  }
</script>
