<template>
  <v-data-table
    :headers="headers"
    :items="employees"
    :items-per-page="5"
    :items-per-page-options="[5, -1]"
    class="elevation-1"
  >
    <!-- Show index and alias -->
    <template v-slot:item.name="{ item, index }">
      {{ index + 1 }}. {{ item.name }}
      <v-chip :text="`@${item.alias}`" size="x-small"></v-chip>
    </template>
    <!-- Calculate age -->
    <template v-slot:item.birthDate="{ value }">
      {{ adapter.getDiff(adapter.date(), value, 'years') }}
    </template>
  </v-data-table>
</template>

<script setup>
  import { useDate } from 'vuetify'

  const adapter = useDate()
  const headers = [
    { title: 'Name', key: 'name' },
    { title: 'Age', key: 'birthDate' },
    { title: 'Department', key: 'department' },
  ]

  const employees = [
    { name: 'Alice Johnson', alias: 'alice', birthDate: '1992-04-01', department: 'Engineering' },
    { name: 'Bob Carter', alias: 'carter', birthDate: '1995-12-04', department: 'Marketing' },
    { name: 'Clara Diaz', alias: 'cdiaz', birthDate: '1991-02-21', department: 'HR' },
    { name: 'David Evans', alias: 'evans', birthDate: '2000-05-13', department: 'Finance' },
    { name: 'Eva Flores', alias: 'eva12', birthDate: '2001-03-11', department: 'Design' },
    { name: 'Frank Green', alias: 'frank', birthDate: '1982-07-23', department: 'Support' },
    { name: 'Grace Harris', alias: 'grace', birthDate: '1986-11-10', department: 'Operations' },
    { name: 'Hank Irving', alias: 'irwing', birthDate: '1996-03-23', department: 'IT' },
  ]
</script>

<script>
  import { useDate } from 'vuetify'

  export default {
    setup () {
      return { adapter: useDate() }
    },
    data: () => ({
      headers: [
        { title: 'Name', key: 'name' },
        { title: 'Age', key: 'birthDate' },
        { title: 'Department', key: 'department' },
      ],
      employees: [
        { name: 'Alice Johnson', alias: 'alice', birthDate: '1992-04-01', department: 'Engineering' },
        { name: 'Bob Carter', alias: 'carter', birthDate: '1995-12-04', department: 'Marketing' },
        { name: 'Clara Diaz', alias: 'cdiaz', birthDate: '1991-02-21', department: 'HR' },
        { name: 'David Evans', alias: 'evans', birthDate: '2000-05-13', department: 'Finance' },
        { name: 'Eva Flores', alias: 'eva12', birthDate: '2001-03-11', department: 'Design' },
        { name: 'Frank Green', alias: 'frank', birthDate: '1982-07-23', department: 'Support' },
        { name: 'Grace Harris', alias: 'grace', birthDate: '1986-11-10', department: 'Operations' },
        { name: 'Hank Irving', alias: 'irwing', birthDate: '1996-03-23', department: 'IT' },
      ],
    }),
  }
</script>
