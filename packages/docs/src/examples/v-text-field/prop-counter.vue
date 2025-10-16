<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col
          cols="12"
          sm="6"
        >
          <v-text-field
            v-model="title"
            :rules="rules"
            counter="25"
            hint="This field uses counter prop"
            label="Regular"
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          sm="6"
        >
          <v-text-field
            v-model="description"
            :rules="rules"
            hint="This field uses maxlength attribute"
            label="Limit exceeded"
            maxlength="25"
            counter
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          sm="6"
        >
          <v-text-field
            v-model="title"
            :counter-value="v => v.trim().split(' ').length"
            :rules="wordsRules"
            counter="5"
            hint="This field counts words instead of characters"
            label="Custom counter from prop"
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          sm="6"
        >
          <v-text-field
            v-model="title"
            :rules="wordsRules"
            counter="5"
            hint="This field counts words instead of characters"
            label="Custom counter from slot"
          >
            <template v-slot:counter="{ props }">
              <v-counter v-bind="props" :value="title.trim().split(' ').length"></v-counter>
            </template>
          </v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script setup>
  import { ref } from 'vue'

  const rules = [v => v.length <= 25 || 'Max 25 characters']
  const wordsRules = [v => v.trim().split(' ').length <= 5 || 'Max 5 words']

  const title = ref('Preliminary report')
  const description = ref('California is a state in the western United States')
</script>

<script>
  export default {
    data () {
      return {
        title: 'Preliminary report',
        description: 'California is a state in the western United States',
        rules: [v => v.length <= 25 || 'Max 25 characters'],
        wordsRules: [v => v.trim().split(' ').length <= 5 || 'Max 5 words'],
      }
    },
  }
</script>
