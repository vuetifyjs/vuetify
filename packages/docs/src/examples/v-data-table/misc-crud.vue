<template>
  <v-sheet border rounded>
    <v-data-table
      :headers="headers"
      :hide-default-footer="books.length < 11"
      :items="books"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>
            <v-icon color="medium-emphasis" icon="mdi-book-multiple" size="x-small" start></v-icon>

            Popular books
          </v-toolbar-title>

          <v-btn
            class="me-2"
            prepend-icon="mdi-plus"
            rounded="lg"
            text="Add a Book"
            border
            @click="add"
          ></v-btn>
        </v-toolbar>
      </template>

      <template v-slot:item.title="{ value }">
        <v-chip :text="value" border="thin opacity-25" prepend-icon="mdi-book" label>
          <template v-slot:prepend>
            <v-icon color="medium-emphasis"></v-icon>
          </template>
        </v-chip>
      </template>

      <template v-slot:item.actions="{ item }">
        <div class="d-flex ga-2 justify-end">
          <v-icon color="medium-emphasis" icon="mdi-pencil" size="small" @click="edit(item.id)"></v-icon>

          <v-icon color="medium-emphasis" icon="mdi-delete" size="small" @click="remove(item.id)"></v-icon>
        </div>
      </template>

      <template v-slot:no-data>
        <v-btn
          prepend-icon="mdi-backup-restore"
          rounded="lg"
          text="Reset data"
          variant="text"
          border
          @click="reset"
        ></v-btn>
      </template>
    </v-data-table>
  </v-sheet>

  <v-dialog v-model="dialog" max-width="500">
    <v-card
      :subtitle="`${isEditing ? 'Update' : 'Create'} your favorite book`"
      :title="`${isEditing ? 'Edit' : 'Add'} a Book`"
    >
      <template v-slot:text>
        <v-row>
          <v-col cols="12">
            <v-text-field v-model="formModel.title" label="Title"></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field v-model="formModel.author" label="Author"></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-select v-model="formModel.genre" :items="['Fiction', 'Dystopian', 'Non-Fiction', 'Sci-Fi']" label="Genre"></v-select>
          </v-col>

          <v-col cols="12" md="6">
            <v-number-input v-model="formModel.year" :max="currentYear" :min="1" label="Year"></v-number-input>
          </v-col>

          <v-col cols="12" md="6">
            <v-number-input v-model="formModel.pages" :min="1" label="Pages"></v-number-input>
          </v-col>
        </v-row>
      </template>

      <v-divider></v-divider>

      <v-card-actions class="bg-surface-light">
        <v-btn text="Cancel" variant="plain" @click="dialog = false"></v-btn>

        <v-spacer></v-spacer>

        <v-btn text="Save" @click="save"></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
  import { onMounted, ref, shallowRef, toRef } from 'vue'

  const currentYear = new Date().getFullYear()

  function createNewRecord () {
    return {
      title: '',
      author: '',
      genre: '',
      year: currentYear,
      pages: 1,
    }
  }

  const books = ref([])
  const formModel = ref(createNewRecord())
  const dialog = shallowRef(false)
  const isEditing = toRef(() => !!formModel.value.id)

  const headers = [
    { title: 'Title', key: 'title', align: 'start' },
    { title: 'Author', key: 'author' },
    { title: 'Genre', key: 'genre' },
    { title: 'Year', key: 'year', align: 'end' },
    { title: 'Pages', key: 'pages', align: 'end' },
    { title: 'Actions', key: 'actions', align: 'end', sortable: false },
  ]

  onMounted(() => {
    reset()
  })

  function add () {
    formModel.value = createNewRecord()
    dialog.value = true
  }

  function edit (id) {
    const found = books.value.find(book => book.id === id)

    formModel.value = {
      id: found.id,
      title: found.title,
      author: found.author,
      genre: found.genre,
      year: found.year,
      pages: found.pages,
    }

    dialog.value = true
  }

  function remove (id) {
    const index = books.value.findIndex(book => book.id === id)
    books.value.splice(index, 1)
  }

  function save () {
    if (isEditing.value) {
      const index = books.value.findIndex(book => book.id === formModel.value.id)
      books.value[index] = formModel.value
    } else {
      formModel.value.id = books.value.length + 1
      books.value.push(formModel.value)
    }

    dialog.value = false
  }

  function reset () {
    dialog.value = false
    formModel.value = createNewRecord()
    books.value = [
      { id: 1, title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Fiction', year: 1960, pages: 281 },
      { id: 2, title: '1984', author: 'George Orwell', genre: 'Dystopian', year: 1949, pages: 328 },
      { id: 3, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Fiction', year: 1925, pages: 180 },
      { id: 4, title: 'Sapiens', author: 'Yuval Noah Harari', genre: 'Non-Fiction', year: 2011, pages: 443 },
      { id: 5, title: 'Dune', author: 'Frank Herbert', genre: 'Sci-Fi', year: 1965, pages: 412 },
    ]
  }
</script>

<script>
  const currentYear = new Date().getFullYear()

  function createNewRecord () {
    return {
      title: '',
      author: '',
      genre: '',
      year: currentYear,
      pages: 1,
    }
  }

  export default {
    data () {
      return {
        currentYear,
        books: [],
        formModel: createNewRecord(),
        dialog: false,
        headers: [
          { title: 'Title', key: 'title', align: 'start' },
          { title: 'Author', key: 'author' },
          { title: 'Genre', key: 'genre' },
          { title: 'Year', key: 'year', align: 'end' },
          { title: 'Pages', key: 'pages', align: 'end' },
          { title: 'Actions', key: 'actions', align: 'end', sortable: false },
        ],
      }
    },
    computed: {
      isEditing () {
        return !!this.formModel.id
      },
    },
    mounted () {
      this.reset()
    },
    methods: {
      add () {
        this.formModel = createNewRecord()
        this.dialog = true
      },
      edit (id) {
        const found = this.books.find(book => book.id === id)
        this.formModel = { ...found }
        this.dialog = true
      },
      remove (id) {
        const index = this.books.findIndex(book => book.id === id)
        this.books.splice(index, 1)
      },
      save () {
        if (this.isEditing) {
          const index = this.books.findIndex(book => book.id === this.formModel.id)
          this.books[index] = { ...this.formModel }
        } else {
          this.formModel.id = this.books.length + 1
          this.books.push({ ...this.formModel })
        }
        this.dialog = false
      },
      reset () {
        this.dialog = false
        this.formModel = createNewRecord()
        this.books = [
          { id: 1, title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Fiction', year: 1960, pages: 281 },
          { id: 2, title: '1984', author: 'George Orwell', genre: 'Dystopian', year: 1949, pages: 328 },
          { id: 3, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Fiction', year: 1925, pages: 180 },
          { id: 4, title: 'Sapiens', author: 'Yuval Noah Harari', genre: 'Non-Fiction', year: 2011, pages: 443 },
          { id: 5, title: 'Dune', author: 'Frank Herbert', genre: 'Sci-Fi', year: 1965, pages: 412 },
        ]
      },
    },
  }
</script>
