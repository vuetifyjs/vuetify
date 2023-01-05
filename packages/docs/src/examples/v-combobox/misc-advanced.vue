<template>
  <v-container fluid>
    <v-combobox
      v-model="model"
      v-model:search="search"
      :items="items"
      :hide-no-data="false"
      item-title="value"
      hide-selected
      label="Search for an option"
      multiple
      chips
      variant="solo"
    >
      <template v-slot:no-data>
        <v-list-item>
          <span class="subheading mr-1">Create</span>
          <v-chip
            :color="`${colors[nonce - 1]}-lighten-1`"
            label
            size="small"
          >
            {{ search }}
          </v-chip>
        </v-list-item>
      </template>
      <template v-slot:prepend-item>
        <v-list-item title="Select an option or create one"></v-list-item>
      </template>
      <template v-slot:chip="{ item, props }">
        <v-chip
          v-bind="props"
          :color="`${item.raw.color}-lighten-1`"
          label
          closable
        >
          <span class="pr-2">
            {{ item.raw.value }}
          </span>
        </v-chip>
      </template>
      <template v-slot:item="{ index, item, props }">
        <v-list-item v-bind="{ ...props, onClick: editingIndex === index ? undefined : props.onClick }">
          <template v-slot:title>
            <v-text-field
              v-if="editingIndex === index"
              v-model="editingValue"
              autofocus
              flat
              bg-color="transparent"
              density="compact"
              hide-details
              variant="solo"
              @keyup.enter="edit(index, item.raw.value)"
            ></v-text-field>
            <v-chip
              v-else
              :color="`${item.raw.color}-lighten-1`"
              label
              size="small"
            >
              {{ item.raw.value }}
            </v-chip>
          </template>
          <template v-slot:append>
            <v-list-item-action @click.stop>
              <v-btn
                icon
                size="small"
                variant="text"
                @click.stop.prevent="edit(index, item.raw.value)"
              >
                <v-icon>{{ editingIndex !== index ? 'mdi-pencil' : 'mdi-check' }}</v-icon>
              </v-btn>
            </v-list-item-action>
          </template>
        </v-list-item>
      </template>
    </v-combobox>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      colors: ['green', 'purple', 'indigo', 'cyan', 'teal', 'orange'],
      editingValue: null,
      editingIndex: -1,
      items: [
        {
          value: 'Foo',
          color: 'blue',
        },
        {
          value: 'Bar',
          color: 'red',
        },
      ],
      nonce: 1,
      model: [],
      search: '',
    }),

    watch: {
      model (val, prev) {
        if (val.length === prev.length) return

        this.model = val.map(v => {
          if (typeof v === 'string') {
            v = {
              value: v,
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
      this.model = [this.items[0]]
    },

    methods: {
      edit (index, value) {
        if (this.editingIndex < 0) {
          this.editing = true
          this.editingValue = value
          this.editingIndex = index
        } else {
          this.items[this.editingIndex].value = this.editingValue

          this.editing = false
          this.editingValue = null
          this.editingIndex = -1
        }
      },
    },
  }
</script>
