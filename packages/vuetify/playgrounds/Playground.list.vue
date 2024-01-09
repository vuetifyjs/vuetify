<template>
  <div>
    <!-- <v-autocomplete
      :items="people"
      filled
      chips
      closable-chips
      color="blue-grey-lighten-2"
      label="Select"
      item-title="name"
      item-value="name"
      multiple
    >
      <template v-slot:chip="{ props, item }">
        <v-chip
          v-bind="props"
          :prepend-avatar="item.raw.avatar"
          :text="item.raw.name"
        ></v-chip>
      </template>
      <template v-slot:item="{ props, item }">
        <v-list-item
          v-bind="props"
          :prepend-avatar="item.raw.avatar"
          :title="item.raw.name"
          :subtitle="item.raw.group"
        ></v-list-item>
      </template>
    </v-autocomplete>
  </div>
  <div>
    <v-autocomplete
      :items="people"
      filled
      chips
      closable-chips
      color="blue-grey-lighten-2"
      label="Select"
      item-title="name"
      item-value="name"
      multiple
    >
      <template v-slot:chip="{ props, item }">
        <v-chip
          v-bind="props"
          :prepend-avatar="item.raw.avatar"
          :text="item.raw.name"
        ></v-chip>
      </template>
    </v-autocomplete>
  </div>
  <div>
    <v-select
      :items="people"
      filled
      chips
      closable-chips
      color="blue-grey-lighten-2"
      label="Select"
      item-title="name"
      item-value="name"
      multiple
    >
      <template v-slot:chip="{ props, item }">
        <v-chip
          v-bind="props"
          :prepend-avatar="item.raw.avatar"
          :text="item.raw.name"
        ></v-chip>
      </template>
      <template v-slot:item="{ props, item }">
        <v-list-item
          v-bind="props"
          :prepend-avatar="item.raw.avatar"
          :title="item.raw.name"
          :subtitle="item.raw.group"
        ></v-list-item>
      </template>
    </v-select>
  </div>
  <div>
    <v-select
      :items="people"
      filled
      chips
      closable-chips
      color="blue-grey-lighten-2"
      label="Select"
      item-title="name"
      item-value="name"
      multiple
    >
      <template v-slot:chip="{ props, item }">
        <v-chip
          v-bind="props"
          :prepend-avatar="item.raw.avatar"
          :text="item.raw.name"
        ></v-chip>
      </template>
    </v-select>
  </div>

  <div>
    <v-combobox
      :items="people"
      filled
      chips
      closable-chips
      color="blue-grey-lighten-2"
      label="Select"
      item-title="name"
      item-value="name"
      multiple
    >
      <template v-slot:chip="{ props, item }">
        <v-chip
          v-bind="props"
          :prepend-avatar="item.raw.avatar"
          :text="item.raw.name"
        ></v-chip>
      </template>
      <template v-slot:item="{ props, item }">
        <v-list-item
          v-bind="props"
          :prepend-avatar="item.raw.avatar"
          :title="item.raw.name"
          :subtitle="item.raw.group"
        ></v-list-item>
      </template>
    </v-combobox>
  </div>
  <div>
    <v-combobox
      :items="people"
      filled
      chips
      closable-chips
      color="blue-grey-lighten-2"
      label="Select"
      item-title="name"
      item-value="name"
      multiple
    >
      <template v-slot:chip="{ props, item }">
        <v-chip
          v-bind="props"
          :prepend-avatar="item.raw.avatar"
          :text="item.raw.name"
        ></v-chip>
      </template>
    </v-combobox> -->
    <div>
      <v-select
        :items="people"
        filled
        chips
        closable-chips
        color="blue-grey-lighten-2"
        label="Select"
        multiple
      ></v-select>

      <v-list :items="people" />
    </div>
  </div>
</template>

<script>
  const srcs = {
    1: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
    2: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
    3: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
    4: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
    5: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
  }

  export default {
    data: () => ({
      people: [
        // { type: 'subheader', name: 'Group 1' },
        // { name: 'Sandra Adams', group: 'Group 1', avatar: srcs[1] },
        // { name: 'Ali Connors', group: 'Group 1', avatar: srcs[2] },
        // { name: 'Trevor Hansen', group: 'Group 1', avatar: srcs[3] },
        // { name: 'Tucker Smith', group: 'Group 1', avatar: srcs[2] },
        // { type: 'divider' },
        // { type: 'subheader', name: 'Group 2' },
        // { name: 'Britta Holt', group: 'Group 2', avatar: srcs[4] },
        // { name: 'Jane Smith ', group: 'Group 2', avatar: srcs[5] },
        // { name: 'John Smith', group: 'Group 2', avatar: srcs[1] },
        {
          title: 'Group 1',
          children: [
            { title: 'Jane Smith ', group: 'Group 1', avatar: srcs[5] },
            { type: 'divider' },
            { title: 'Britta Holt', group: 'Group 1', avatar: srcs[4] },
          ],
          divider: true,
        },
        { type: 'divider' },
        {
          title: 'Group 2',
          children: [
            { title: 'Trevor Hansen', group: 'Group 2', avatar: srcs[3] },
            { title: 'Ali Connors', group: 'Group 2', avatar: srcs[2] },
          ],
        },
      ],
    }),
  }
</script>
