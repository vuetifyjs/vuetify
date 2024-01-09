<template>
  <v-card
    max-width="450"
    class="mx-auto"
  >
    <v-toolbar
      color="cyan"
      dark
    >
      <v-app-bar-nav-icon variant="text"></v-app-bar-nav-icon>

      <v-toolbar-title>Inbox</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn variant="text" icon="mdi-magnify"></v-btn>
    </v-toolbar>

    <v-list
      lines="three"
      :items="items"
      item-title="subject"
      :item-props="itemProps"
    >
      <template v-slot:subtitle="{ item }">
        <div>
          <span class="text-primary">{{ item.from }}</span>
          <span> &mdash; {{ item.content }}</span>
        </div>
      </template>
    </v-list>

    <v-select
      v-model="select"
      :items="sitems"
      item-title="state"
      item-value="abbr"
      label="Select"
      persistent-hint
      single-line
    ></v-select>
    <pre>{{ JSON.stringify(select, null, 2) }}</pre>

    <v-select
      v-model="select2"
      :items="sitems"
      item-title="state"
      item-value="abbr"
      label="Select"
      persistent-hint
      single-line
      return-object
    ></v-select>
    <pre>{{ JSON.stringify(select2, null, 2) }}</pre>

    <v-autocomplete
      v-model="values"
      :items="aitems"
      outlined
      dense
      chips
      small-chips
      label="Outlined"
      multiple
    ></v-autocomplete>
    <pre>{{ JSON.stringify(values, null, 2) }}</pre>

    <v-autocomplete
      v-model="ovalues"
      :items="aoitems"
      outlined
      dense
      chips
      small-chips
      label="Outlined"
      multiple
      return-object
    ></v-autocomplete>
    <pre>{{ JSON.stringify(ovalues, null, 2) }}</pre>

    <v-combobox
      v-model="combo"
      v-model:items="citems"
      label="Combobox"
      multiple
      outlined
      dense
    ></v-combobox>

    <pre>{{ JSON.stringify(combo, null, 2) }}</pre>

    <v-combobox
      v-model="combosingle"
      v-model:items="citems"
      label="Combobox"
      outlined
      dense
    ></v-combobox>

    <div class="py-10" />
    <div class="py-10" />
    <div class="py-10" />
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      combo: ['Vuetify', 'Programming'],
      combosingle: 'Programming',
      citems: [
        'Programming',
        'Design',
        'Vue',
        'Vuetify',
      ],
      aitems: ['foo', 'bar', 'fizz', 'buzz'],
      aoitems: [
        { title: 'foo', value: 'foo' },
        { title: 'bar', value: 'bar' },
        { title: 'fizz', value: 'fizz' },
        { title: 'buzz', value: 'buzz' },
      ],
      ovalues: [
        { title: 'foo', value: 'foo' },
      ],
      values: ['foo', 'bar'],
      value: null,
      select: 'FL',
      select2: { state: 'Georgia', abbr: 'GA' },
      sitems: [
        { state: 'Florida', abbr: 'FL' },
        { state: 'Georgia', abbr: 'GA' },
        { state: 'Nebraska', abbr: 'NE' },
        { state: 'California', abbr: 'CA' },
        { state: 'New York', abbr: 'NY' },
      ],
      items: [
        { type: 'subheader', subject: 'Today' },
        {
          avatarUrl: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          subject: 'Brunch this weekend?',
          from: 'Ali Connors',
          content: 'I\'ll be in your neighborhood doing errands this weekend. Do you want to hang out?',
          subtitle: `<span class="text-primary">Ali Connors</span> &mdash; `,
        },
        { type: 'divider', inset: true },
        {
          avatarUrl: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          subject: 'Summer BBQ',
          from: 'Alex Scott',
          content: 'Wish I could come, but I\'m out of town this weekend.',
          subtitle: `<span class="text-primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`,
        },
        { type: 'divider', inset: true },
        {
          avatarUrl: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          subject: 'Oui oui',
          from: 'Sandra adams',
          content: 'Do you have Paris recommendations? Have you ever been?',
          subtitle: '<span class="text-primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?',
        },
        { type: 'divider', inset: true },
        {
          avatarUrl: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
          subject: 'Birthday gift',
          from: 'Trevor Hansen',
          content: 'Have any ideas about what we should get Heidi for her birthday?',
          subtitle: '<span class="text-primary">Trevor Hansen</span> &mdash; ',
        },
        { type: 'divider', inset: true },
        {
          avatarUrl: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
          subject: 'Recipe to try',
          from: 'Britta Holt',
          content: 'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
          subtitle: '<span class="text-primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
        },
      ],
    }),
    methods: {
      itemProps (item) {
        if (item.type === 'divider') return { inset: true }

        if (item.type !== 'subheader') return { prependAvatar: item.avatarUrl }
      },
    },
  }
</script>
