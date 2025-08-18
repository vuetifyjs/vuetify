<template>
  <v-card class="mx-auto" max-width="600">
    <v-card-title>Create Article</v-card-title>
    <v-card-text>
      <v-form ref="form" v-model="isValid">
        <v-text-field
          v-model="title"
          :rules="titleRules"
          label="Title"
        ></v-text-field>

        <v-editor
          v-model="content"
          :rules="contentRules"
          height="200"
        ></v-editor>

        <v-text-field
          v-model="author"
          :rules="authorRules"
          label="Author"
        ></v-text-field>

        <v-btn
          :disabled="!isValid"
          color="primary"
          @click="submitForm"
        >
          Submit Article
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script setup>
  const form = ref()
  const isValid = ref(false)
  const title = ref('')
  const content = ref('')
  const author = ref('')

  const titleRules = [
    v => !!v || 'Title is required',
    v => v.length >= 3 || 'Title must be at least 3 characters',
  ]

  const contentRules = [
    v => !!v || 'Content is required',
    v => v.length >= 50 || 'Content must be at least 50 characters',
  ]

  const authorRules = [
    v => !!v || 'Author is required',
  ]

  const submitForm = () => {
    if (form.value.validate()) {
      alert('Form submitted successfully!')
    }
  }
</script>

<script>
  export default {
    data () {
      return {
        form: null,
        isValid: false,
        title: '',
        content: '',
        author: '',
        titleRules: [
          v => !!v || 'Title is required',
          v => v.length >= 3 || 'Title must be at least 3 characters',
        ],
        contentRules: [
          v => !!v || 'Content is required',
          v => v.length >= 50 || 'Content must be at least 50 characters',
        ],
        authorRules: [
          v => !!v || 'Author is required',
        ],
      }
    },
    methods: {
      submitForm () {
        if (this.$refs.form.validate()) {
          alert('Form submitted successfully!')
        }
      },
    },
  }
</script>
