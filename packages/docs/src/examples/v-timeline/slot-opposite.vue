<template>
  <v-timeline align="start">
    <v-timeline-item
      v-for="(year, i) in years"
      :key="i"
      :dot-color="year.color"
      size="small"
    >
      <template v-slot:opposite>
        <div
          :class="`pt-1 headline font-weight-bold text-${year.color}`"
          v-text="year.year"
        ></div>
      </template>
      <div>
        <h2 :class="`mt-n1 headline font-weight-light mb-4 text-${year.color}`">
          Lorem ipsum
        </h2>
        <div>
          Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.
        </div>
      </div>
    </v-timeline-item>
  </v-timeline>
</template>

<script>
  export default {
    data: () => ({
      years: [
        {
          color: 'cyan',
          year: '1960',
        },
        {
          color: 'green',
          year: '1970',
        },
        {
          color: 'pink',
          year: '1980',
        },
        {
          color: 'amber',
          year: '1990',
        },
        {
          color: 'orange',
          year: '2000',
        },
      ],
    }),
  }
</script>
