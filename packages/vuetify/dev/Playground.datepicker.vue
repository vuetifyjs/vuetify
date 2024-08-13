<template>
  <v-app>
    <div class="ma-4">
      <h3>Display date {{ displayDate }}</h3>
      <!-- <div class="foo">
        <v-date-picker-controls
          v-model:display-date="displayDate"
          v-model:mode="mode"
          show-prev-next-buttons
        ></v-date-picker-controls>
        <template v-if="mode === 'month'">
          <v-date-picker-month
            :display-date="displayDate"
            :model-value="[new Date('2022-06-06'), new Date('2022-06-16')]"
            :locale="locale"
            show-weekdays
            show-adjacent-months
            show-week
          />
        </template>
        <template v-else>
          <v-date-picker-years
            v-model:mode="mode"
            v-model:display-date="displayDate"
            :locale="locale"
          />
        </template>
      </div> -->

      <!-- <v-picker width="350">
        <template #header>
          <v-date-picker-header
            color="primary"
            title='Select date'
            text='Foo'
          />
        </template>
        <template #default>
          <div>
            <v-date-picker-controls
              v-model:display-date="displayDate"
              v-model:mode="mode"
              show-prev-next-buttons
            />
            <template v-if="mode === 'month'">
              <v-date-picker-month
                :display-date="displayDate"
                :model-value="[new Date('2022-06-06'), new Date('2022-06-16')]"
                :locale="locale"
                show-weekdays
                show-adjacent-months
                show-week
              />
            </template>
            <template v-else>
              <v-date-picker-years
                height="350"
                v-model:mode="mode"
                v-model:display-date="displayDate"
                :locale="locale"
              />
            </template>
          </div>
        </template>

        <template #actions>
          <v-btn
            variant="text"
            density="comfortable"
          >cancel</v-btn>

          <v-btn
            variant="text"
            density="comfortable"
          >ok</v-btn>
        </template>
      </v-picker> -->

      <!-- <v-date-picker
        v-model="date"
        :locale="locale"
      /> -->
      <v-date-input label="Date" />
      <!-- <v-btn @click="prev">prev</v-btn>
      <v-btn @click="next">next</v-btn> -->

      <!-- <v-date-range-card
        v-model="multiple"
        :locale="locale"
      /> -->
      <!-- <v-date-input label="Date" v-model="foo" /> -->

      <v-date-range-input v-model="multiple" from-label="From" to-label="To" />
    </div>
  </v-app>
</template>

<script>
  import { VDateInput } from '../src/labs/VDateInput'
  import sv from 'date-fns/locale/sv'

  export default {
    components: {
      VDateInput,
    },
    data: () => ({
      date: '2022-01-01',
      displayDate: '2022-06',
      locale: sv,
      mode: 'year',
      multiple: [],
      foo: null,
    }),
  }
</script>

<style scoped>
  .foo {
    width: 500px;
    height: 500px;
  }
</style>
