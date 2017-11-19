<template>
  <v-card color="grey lighten-4" flat>
    <v-card-text>
      <v-container fluid>
        <v-layout wrap>
          <v-flex xs12>
            <v-select
              v-model="select"
              label="Select a favorite activity or create a new one"
              combobox
              :items="items"
            ></v-select>
          </v-flex>
          <v-flex xs12>
            <v-select
              v-model="select"
              label="I use chips"
              chips
              combobox
              :items="items"
            ></v-select>
          </v-flex>
          <v-flex xs12>
            <v-select
              v-model="select"
              label="I use a scoped slot"
              chips
              combobox
              :items="items"
            >
              <template slot="selection" slot-scope="data">
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
              combobox
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
        select: null,
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
