<template>
  <v-card class="grey lighten-4" flat>
    <v-card-text>
      <v-container fluid>
        <v-layout wrap>
          <v-flex xs12>
            <v-select
              v-model="select"
              label="Select a favorite activity or create a new one"
              multiple
              tags
              :items="items"
            ></v-select>
          </v-flex>
          <v-flex xs12>
            <v-select
              v-model="select"
              label="I use chips"
              chips
              tags
              :items="items"
            ></v-select>
          </v-flex>
          <v-flex xs12>
            <v-select
              v-model="select"
              label="I use a scoped slot"
              chips
              tags
              :items="items"
            >
              <template slot="selection" scope="data">
                <v-chip
                  @input="data.parent.selectItem(data.item)"
                  class="chip--select-multi"
                  :selected="data.selected"
                  :disabled="data.disabled"
                  :key="JSON.stringify(data.item)"
                >
                  <v-avatar class="accent">{{ data.item.slice(0, 1).toUpperCase() }}</v-avatar>
                  {{ data.item }}
                </v-chip>
              </template>
            </v-select>
          </v-flex>
          <v-flex xs12>
            <v-select
              v-model="select"
              label="I'm readonly"
              chips
              readonly
              tags
            ></v-select>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    data () {
      return {
        select: [],
        items: [
          'Programming',
          'Design',
          'Vue',
          'Vuetify'
        ]
      }
    }
  }
</script>
