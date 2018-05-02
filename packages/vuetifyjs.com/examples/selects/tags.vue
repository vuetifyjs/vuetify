<template>
  <v-container fluid>
    <v-layout wrap>
      <v-flex xs12>
        <v-select
          v-model="select"
          :items="items"
          label="Select a favorite activity or create a new one"
          multiple
          tags
        ></v-select>
      </v-flex>
      <v-flex xs12>
        <v-select
          v-model="select"
          :items="items"
          label="I use chips"
          chips
          tags
        ></v-select>
      </v-flex>
      <v-flex xs12>
        <v-select
          v-model="select"
          :items="items"
          label="I use a scoped slot"
          chips
          tags
        >
          <template slot="selection" slot-scope="data">
            <v-chip
              :selected="data.selected"
              :disabled="data.disabled"
              :key="JSON.stringify(data.item)"
              class="chip--select-multi"
              @input="data.parent.selectItem(data.item)"
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
