<template>
  <v-card class="mx-auto" max-width="400">
    <v-card-text>
      <v-text-field
        v-model="search"
        v-model:focused="focused"
        label="Filter fruits"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        clearable
        hide-details
      ></v-text-field>
    </v-card-text>
    <v-list class="pa-3 pt-0" height="320" activatable>
      <StaggerTransition group>
        <v-list-item
          v-for="(fruit, i) in filtered"
          :key="fruit"
          :data-index="i"
          :title="fruit"
          @mousedown="search = fruit"
        ></v-list-item>
      </StaggerTransition>
    </v-list>
  </v-card>
</template>

<script setup>
  import { computed, shallowRef } from 'vue'
  import { createJavascriptTransition } from 'vuetify/util/transitions'

  const StaggerTransition = createJavascriptTransition('stagger-transition', {
    onEnter (el, done) {
      el.animate(
        [
          { opacity: 0, transform: 'translateX(-16px)' },
          { opacity: 1, transform: 'none' },
        ],
        {
          duration: 250,
          delay: el.dataset.index * 40,
          fill: 'backwards',
        },
      ).onfinish = done
    },
  })

  const all = [
    'Apple',
    'Apricot',
    'Banana',
    'Blackberry',
    'Blueberry',
    'Cherry',
    'Grape',
    'Kiwi',
    'Lemon',
    'Mango',
    'Orange',
    'Papaya',
    'Peach',
    'Pear',
  ]

  const focused = shallowRef(false)
  const search = shallowRef('')
  const filtered = computed(() => {
    if (!focused.value) return []
    const query = (search.value ?? '').toLowerCase()
    return all.filter(fruit => fruit.toLowerCase().includes(query))
  })
</script>
