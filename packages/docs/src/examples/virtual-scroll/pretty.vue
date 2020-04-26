<template>
  <div class="example-container">
    <v-virtual-scroll :items="items" :item-height="50">
      <template v-slot="item">
        <v-row justify="start" align="center">
          <v-avatar :color="item.color" size="40" class="mx-4">
            <span class="white--text title">{{ item.initials }}</span>
          </v-avatar>
          <span class="subtitle-1">{{ item.fullName }}</span>
        </v-row>
      </template>
    </v-virtual-scroll>
  </div>
</template>

<script>
  export default {
    data () {
      const fillArrayWithNumbers = n => Array.apply(null, Array(n)).map((x, i) => i)
      const names = ['Oliver', 'Jake', 'Noah', 'James', 'Jack', 'Connor', 'Liam', 'John', 'Harry', 'Callum', 'Mason', 'Robert', 'Jacob', 'Jacob', 'Jacob', 'Michael', 'Charlie', 'Kyle', 'William', 'William', 'Thomas', 'Joe', 'Ethan', 'David', 'George', 'Reece', 'Michael', 'Richard', 'Oscar', 'Rhys', 'Alexander', 'Joseph', 'James', 'Charlie', 'James', 'Charles', 'William', 'Damian', 'Daniel', 'Thomas', 'Amelia', 'Margaret', 'Emma', 'Mary', 'Olivia', 'Samantha', 'Olivia', 'Patricia', 'Isla', 'Bethany']
      const surnames = ['Smith', 'Anderson', 'Clark', 'Wright', 'Mitchell', 'Johnson', 'Thomas', 'Rodriguez', 'Lopez', 'Perez', 'Williams', 'Jackson', 'Lewis', 'Hill', 'Roberts', 'Jones', 'White', 'Lee', 'Scott', 'Turner', 'Brown', 'Harris', 'Walker', 'Green', 'Phillips', 'Davis', 'Martin', 'Hall', 'Adams', 'Campbell', 'Miller', 'Thompson', 'Allen', 'Baker', 'Parker', 'Wilson', 'Garcia', 'Young', 'Gonzalez', 'Evans', 'Moore', 'Martinez', 'Hernandez', 'Nelson', 'Edwards', 'Taylor', 'Robinson', 'King', 'Carter', 'Collins']
      const length = names.length
      const colors = ['#2196F3', '#90CAF9', '#64B5F6', '#42A5F5', '#1E88E5', '#1976D2', '#1565C0', '#0D47A1', '#82B1FF', '#448AFF', '#2979FF', '#2962FF']
      const colorsLength = colors.length
      return {
        items: fillArrayWithNumbers(10000).map(_ => {
          const getRandomIndex = max => Math.floor(Math.random() * Math.floor(max))
          const name = names[getRandomIndex(length)]
          const surname = surnames[getRandomIndex(length)]
          const color = colors[getRandomIndex(colorsLength)]
          return {
            fullName: `${name} ${surname}`,
            initials: `${name[0]}${surname[0]}`,
            color,
          }
        }),
      }
    },
  }
</script>

<style>
.example-container {
  height: 365px;
}
</style>
