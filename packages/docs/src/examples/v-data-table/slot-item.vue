<template>
  <v-data-table
    :headers="headers"
    :items="employees"
    class="text-caption"
    density="compact"
    item-value="name"
    hide-default-footer
    hover
  >
    <template v-slot:item="{ item }">
      <tr class="text-no-wrap">
        <td>{{ item.id }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.department }}</td>
        <td>{{ item.role }}</td>
        <td
          :class="{
            'text-end': true,
            'bg-success': item.salary > 80000,
            'bg-warning': item.salary > 70000 && item.salary <= 80000,
            'bg-error': item.salary <= 70000
          }"
          v-text="`$${item.salary.toLocaleString()}`"
        ></td>
        <td>{{ item.hireDate }}</td>
        <td class="text-end">{{ item.hoursPerWeek }}</td>
        <td>{{ item.location }}</td>
        <td>{{ item.status }}</td>
        <td class="text-end">
          <v-chip
            :text="item.score.toFixed(2)"
            append-icon="mdi-open-in-new"
            size="x-small"
            @click=""
          ></v-chip>
        </td>
      </tr>
    </template>
  </v-data-table>
</template>

<script setup>
  const headers = [
    { title: 'ID', key: 'id', align: 'start' },
    { title: 'Name', key: 'name' },
    { title: 'Dept', key: 'department' },
    { title: 'Role', key: 'role' },
    { title: 'Salary($)', key: 'salary', align: 'end' },
    { title: 'HireDate', key: 'hireDate' },
    { title: 'Hours/Wk', key: 'hoursPerWeek', align: 'end' },
    { title: 'Location', key: 'location' },
    { title: 'Status', key: 'status' },
    { title: 'Score', key: 'score', align: 'end' },
  ]
  const employees = [
    {
      id: 'E001',
      name: 'Alice Johnson',
      department: 'Engineering',
      role: 'Software Dev',
      salary: 95000,
      hireDate: '2020-03-15',
      hoursPerWeek: 40,
      location: 'New York',
      status: 'Full-Time',
      score: 4.5,
    },
    {
      id: 'E002',
      name: 'Bob Carter',
      department: 'Sales',
      role: 'Account Manager',
      salary: 72000,
      hireDate: '2019-11-01',
      hoursPerWeek: 35,
      location: 'Chicago',
      status: 'Full-Time',
      score: 4.2,
    },
    {
      id: 'E003',
      name: 'Clara Diaz',
      department: 'HR',
      role: 'Recruiter',
      salary: 65000,
      hireDate: '2021-06-10',
      hoursPerWeek: 32,
      location: 'Remote',
      status: 'Part-Time',
      score: 4.0,
    },
    {
      id: 'E004',
      name: 'David Lee',
      department: 'Engineering',
      role: 'DevOps Engineer',
      salary: 105000,
      hireDate: '2018-09-22',
      hoursPerWeek: 40,
      location: 'San Francisco',
      status: 'Full-Time',
      score: 4.7,
    },
    {
      id: 'E005',
      name: 'Ella Smith',
      department: 'Marketing',
      role: 'Social Media Mgr',
      salary: 80000,
      hireDate: '2020-01-05',
      hoursPerWeek: 38,
      location: 'Los Angeles',
      status: 'Full-Time',
      score: 4.3,
    },
  ]
</script>

<script>
  export default {
    data: () => ({
      headers: [
        { title: 'ID', key: 'id', align: 'start' },
        { title: 'Name', key: 'name' },
        { title: 'Dept', key: 'department' },
        { title: 'Role', key: 'role' },
        { title: 'Salary($)', key: 'salary', align: 'end' },
        { title: 'HireDate', key: 'hireDate' },
        { title: 'Hours/Wk', key: 'hoursPerWeek', align: 'end' },
        { title: 'Location', key: 'location' },
        { title: 'Status', key: 'status' },
        { title: 'Score', key: 'score', align: 'end' },
      ],
      employees: [
        {
          id: 'E001',
          name: 'Alice Johnson',
          department: 'Engineering',
          role: 'Software Dev',
          salary: 95000,
          hireDate: '2020-03-15',
          hoursPerWeek: 40,
          location: 'New York',
          status: 'Full-Time',
          score: 4.5,
        },
        {
          id: 'E002',
          name: 'Bob Carter',
          department: 'Sales',
          role: 'Account Manager',
          salary: 72000,
          hireDate: '2019-11-01',
          hoursPerWeek: 35,
          location: 'Chicago',
          status: 'Full-Time',
          score: 4.2,
        },
        {
          id: 'E003',
          name: 'Clara Diaz',
          department: 'HR',
          role: 'Recruiter',
          salary: 65000,
          hireDate: '2021-06-10',
          hoursPerWeek: 32,
          location: 'Remote',
          status: 'Part-Time',
          score: 4.0,
        },
        {
          id: 'E004',
          name: 'David Lee',
          department: 'Engineering',
          role: 'DevOps Engineer',
          salary: 105000,
          hireDate: '2018-09-22',
          hoursPerWeek: 40,
          location: 'San Francisco',
          status: 'Full-Time',
          score: 4.7,
        },
        {
          id: 'E005',
          name: 'Ella Smith',
          department: 'Marketing',
          role: 'Social Media Mgr',
          salary: 80000,
          hireDate: '2020-01-05',
          hoursPerWeek: 38,
          location: 'Los Angeles',
          status: 'Full-Time',
          score: 4.3,
        },
      ],
    }),
  }
</script>
