<template>
  <v-menu v-model="menu" :close-on-content-click="false">
    <template #activator="{ props: menuProps }">
      <div v-bind="menuProps">
        <v-input
          v-model="selectedId"
          :rules="rules"
        >
          <v-field
            label="Employee"
            variant="outlined"
            :dirty="!!selectedId"
            :active="menu || !!selectedId"
            append-inner-icon="mdi-menu-down"
          >
            <template #default="{ props: fieldProps, focus, blur }">
              <div
                v-bind="fieldProps"
                tabindex="0"
                role="button"
                @focus="focus"
                @blur="blur"
              >
                <template v-if="displayName">{{ displayName }}</template>
                <span v-else class="text-medium-emphasis">Select an employee</span>
              </div>
            </template>
          </v-field>
        </v-input>
      </div>
    </template>

    <v-list>
      <v-list-item
        v-for="employee in employees"
        :key="employee.id"
        :title="employee.name"
        @click="select(employee)"
      />
    </v-list>
  </v-menu>
</template>

<script setup>
  import { computed, ref } from 'vue'

  const menu = ref(false)
  const selectedId = ref(null)

  const employees = [
    { id: 1, name: 'Alice Nguyen' },
    { id: 2, name: 'Bruno Silva' },
    { id: 3, name: 'Chen Wei' },
  ]

  const displayName = computed(() => {
    return employees.find(e => e.id === selectedId.value)?.name ?? ''
  })

  const rules = [
    value => value != null || 'Pick an employee',
  ]

  function select (employee) {
    selectedId.value = employee.id
    menu.value = false
  }
</script>
