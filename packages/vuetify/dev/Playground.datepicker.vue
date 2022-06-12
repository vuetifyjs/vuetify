<template>
  <v-app>
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

    <v-date-picker
      v-model="date"
      :locale="locale"
    />
    <!-- <v-btn @click="prev">prev</v-btn>
    <v-btn @click="next">next</v-btn> -->
  </v-app>
</template>

<script>
  import { changeMonth } from '../src/components/VDatePicker/utils'
  import enUS from 'date-fns/locale/en-US'
  import sv from 'date-fns/locale/sv'

  export default {
    data: () => ({
      date: '2022-01-01',
      displayDate: '2022-06',
      locale: enUS,
      mode: 'year',
    }),
    methods: {
      prev () {
        const [year, month] = changeMonth(this.year, this.month, -1)
        this.year = year
        this.month = month
      },
      next () {
        const [year, month] = changeMonth(this.year, this.month, 1)
        this.year = year
        this.month = month
      },
    },
  }
</script>

<style scoped>
  .foo {
    width: 500px;
    height: 500px;
  }
</style>
