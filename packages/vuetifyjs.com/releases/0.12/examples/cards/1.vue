<template>
  <div>
    <v-card>
      <v-card-text>
        <div>{{ card_text }}</div>
      </v-card-text>
    </v-card>

    <v-card class="blue darken-1 white--text mt-3">
      <v-card-text>
        <div>{{ card_text }}</div>
      </v-card-text>
    </v-card>
  </div>
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
