<template>
  <v-container fluid>
    <v-combobox
      v-model="model"
      v-model:search="search"
      :custom-filter="filter"
      :items="items"
      label="Search for an option"
      variant="solo"
      hide-selected
      multiple
    >
      <template v-slot:selection="{ item, index }">
        <v-chip
          v-if="item === Object(item)"
          :color="`${item.raw.color}-lighten-3`"
          :text="item.title"
          size="small"
          variant="flat"
          closable
          label
          @click:close="removeSelection(index)"
        ></v-chip>
      </template>
      <template v-slot:item="{ props, item }">
        <template v-if="item.raw.header">
          <v-list-item
            v-if="alreadySelected"
            title="Item is already selected"
          ></v-list-item>
          <v-list-item v-else-if="search">
            <span class="mr-3">Create</span>
            <v-chip
              :color="`${colors[nonce]}-lighten-3`"
              size="small"
              variant="flat"
              label
            >
              {{ search }}
            </v-chip>
          </v-list-item>
          <v-list-subheader v-else :title="item.title"></v-list-subheader>
        </template>
        <v-list-item v-else @click="props.onClick">
          <v-text-field
            v-if="editingItem === item.raw"
            v-model="editingItem.title"
            bg-color="transparent"
            class="mr-3"
            density="compact"
            variant="plain"
            autofocus
            hide-details
            @click.stop
            @keydown.stop
            @keyup.enter="edit(item.raw)"
            @mousedown.stop
          ></v-text-field>
          <v-chip
            v-else
            :color="`${item.raw.color}-lighten-3`"
            :text="item.raw.title"
            variant="flat"
            label
          ></v-chip>
          <template v-slot:append>
            <v-btn
              :color="editingItem !== item.raw ? 'primary' : 'success'"
              :icon="editingItem !== item.raw ? 'mdi-pencil' : 'mdi-check'"
              size="small"
              variant="text"
              @click.stop.prevent="edit(item.raw)"
            ></v-btn>
            <v-btn
              v-if="editingItem !== item.raw"
              color="error"
              icon="mdi-trash-can"
              size="small"
              variant="text"
              @click.stop.prevent="removeItem(item.raw)"
            ></v-btn>
          </template>
        </v-list-item>
      </template>
    </v-combobox>
  </v-container>
</template>

<script setup>
  import { ref, toRef, watch } from 'vue'

  const colors = ['green', 'purple', 'indigo', 'cyan', 'teal', 'orange']
  const editingItem = ref(null)
  const items = ref([
    { header: true, title: 'Select an option or create one' },
    { title: 'Foo', color: 'blue' },
    { title: 'Bar', color: 'red' },
  ])
  const model = ref([
    { title: 'Foo', color: 'blue' },
  ])
  const search = ref(null)

  const alreadySelected = toRef(() => model.value.some(x => x.title === search.value))

  let nonce = 1
  watch(model, val => {
    const newValue = []
    let changed = false
    for (const v of val) {
      if (typeof v === 'string') {
        changed = true
        const existingItem = items.value.find(x => x.title === v)
        if (existingItem) {
          newValue.push(existingItem)
        } else {
          const newIitem = {
            title: v,
            color: colors[nonce],
          }
          newValue.push(newIitem)
          items.value.push(newIitem)
          nonce = (nonce + 1) % colors.length
        }
      } else {
        newValue.push(v)
      }
    }
    if (changed) {
      model.value = newValue
    }
  })

  function edit (item) {
    if (!editingItem.value) {
      editingItem.value = item
    } else {
      editingItem.value = null
    }
  }

  function filter (value, queryText, item) {
    const toLowerCaseString = val =>
      String(val != null ? val : '').toLowerCase()

    const query = toLowerCaseString(queryText)

    const isSelected = text => model.value.some(x => x.title === text)
    const availableOptions = items.value.filter(x => !isSelected(x.title))
    const hasAnyMatch = availableOptions.some(
      x => !x.header && toLowerCaseString(x.title).includes(query)
    )
    if (item.raw.header) return !hasAnyMatch

    const text = toLowerCaseString(item.raw.title)

    return text.includes(query)
  }

  function removeSelection (index) {
    model.value.splice(index, 1)
  }

  function removeItem (item) {
    const index = items.value.findIndex(x => x.title === item.title)
    items.value.splice(index, 1)
  }
</script>

<script>
  export default {
    data: () => ({
      colors: ['green', 'purple', 'indigo', 'cyan', 'teal', 'orange'],
      editingItem: null,
      items: [
        { header: true, title: 'Select an option or create one' },
        {
          title: 'Foo',
          color: 'blue',
        },
        {
          title: 'Bar',
          color: 'red',
        },
      ],
      nonce: 1,
      model: [
        { title: 'Foo', color: 'blue' },
      ],
      search: null,
    }),

    computed: {
      alreadySelected () {
        return this.model.some(x => x.title === this.search)
      },
    },

    watch: {
      model (val) {
        const newValue = []
        let changed = false
        for (const v of val) {
          if (typeof v === 'string') {
            changed = true
            const existingItem = this.items.find(x => x.title === v)
            if (existingItem) {
              newValue.push(existingItem)
            } else {
              const newIitem = {
                title: v,
                color: this.colors[this.nonce],
              }
              newValue.push(newIitem)
              this.items.push(newIitem)
              this.nonce = (this.nonce + 1) % this.colors.length
            }
          } else {
            newValue.push(v)
          }
        }
        if (changed) {
          this.model = newValue
        }
      },
    },

    methods: {
      edit (item) {
        if (!this.editingItem) {
          this.editingItem = item
        } else {
          this.editingItem = null
        }
      },
      filter (value, queryText, item) {
        const toLowerCaseString = val =>
          String(val != null ? val : '').toLowerCase()

        const query = toLowerCaseString(queryText)

        const isSelected = text => this.model.some(x => x.title === text)
        const availableOptions = this.items.filter(x => !isSelected(x.title))
        const hasAnyMatch = availableOptions.some(
          x => !x.header && toLowerCaseString(x.title).includes(query)
        )
        if (item.raw.header) return !hasAnyMatch

        const text = toLowerCaseString(item.raw.title)

        return text.includes(query)
      },
      removeSelection (index) {
        this.model.splice(index, 1)
      },
      removeItem (item) {
        const index = this.items.findIndex(x => x.title === item.title)
        this.items.splice(index, 1)
      },
    },
  }
</script>

<example-meta lang="json">
  {
    "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v3.0---Official-Vuetify-3-UI-Kit?node-id=2047-82949&t=tC3y53U3XKPv8ZyJ-4"
  }
</example-meta>