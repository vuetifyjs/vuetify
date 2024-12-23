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
        <v-list-item v-if="item.raw.header && search">
          <span class="mr-3">Create</span>
          <v-chip
            :color="`${colors[nonce - 1]}-lighten-3`"
            size="small"
            variant="flat"
            label
          >
            {{ search }}
          </v-chip>
        </v-list-item>
        <v-list-subheader v-else-if="item.raw.header" :title="item.title"></v-list-subheader>
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
          </template>
        </v-list-item>
      </template>
    </v-combobox>
  </v-container>
</template>

<script setup>
  import { onMounted, ref, watch } from 'vue'

  const colors = ['green', 'purple', 'indigo', 'cyan', 'teal', 'orange']
  const editingItem = ref(null)
  const items = ref([
    { header: true, title: 'Select an option or create one' },
    { title: 'Foo', color: 'blue' },
    { title: 'Bar', color: 'red' },
  ])
  const nonce = ref(1)
  const model = ref([])
  const search = ref(null)

  onMounted(() => {
    model.value.push(items.value[1])
  })

  watch(model, (val, prev) => {
    if (val.length === prev.length) return

    model.value = val.map(v => {
      if (typeof v === 'string') {
        v = {
          title: v,
          color: colors[nonce.value - 1],
        }

        items.value.push(v)

        nonce.value++
      }

      return v
    })
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

    const availableOptions = items.value.filter(x => !model.value.includes(x))
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
      model: [],
      search: null,
    }),

    watch: {
      model (val, prev) {
        if (val.length === prev.length) return

        this.model = val.map(v => {
          if (typeof v === 'string') {
            v = {
              title: v,
              color: this.colors[this.nonce - 1],
            }

            this.items.push(v)

            this.nonce++
          }

          return v
        })
      },
    },

    mounted () {
      this.model = [this.items[1]]
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

        const availableOptions = this.items.filter(x => !this.model.includes(x))
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
    },
  }
</script>
