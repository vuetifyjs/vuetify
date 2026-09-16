<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-combobox
          v-model="select"
          :items="items"
          label="Select a favorite activity or create a new one"
          multiple
        ></v-combobox>
      </v-col>
      <v-col cols="12">
        <v-combobox
          v-model="select"
          :items="items"
          label="I use chips"
          chips
          multiple
        ></v-combobox>
      </v-col>
      <v-col cols="12">
        <v-combobox
          v-model="select"
          :items="items"
          label="I use a scoped slot"
          multiple
        >
          <template v-slot:selection="{ item, internalItem }">
            <v-chip
              :text="item.title"
              :value="internalItem.value"
              size="small"
            >
              <template v-slot:prepend>
                <v-avatar class="bg-accent text-uppercase" start>
                  {{ item.slice(0, 1) }}
                </v-avatar>
              </template>
              {{ item }}
            </v-chip>
          </template>
        </v-combobox>
      </v-col>
      <v-col cols="12">
        <v-combobox
          v-model="select"
          label="I'm readonly"
          chips
          multiple
          readonly
        ></v-combobox>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import { ref } from 'vue'

  const select = ref(['Vuetify', 'Programming'])

  const items = [
    'Programming',
    'Design',
    'Vue',
    'Vuetify',
  ]
</script>

<script>
  export default {
    data () {
      return {
        select: ['Vuetify', 'Programming'],
        items: [
          'Programming',
          'Design',
          'Vue',
          'Vuetify',
        ],
      }
    },
  }
</script>
