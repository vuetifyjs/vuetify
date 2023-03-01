<template>
  <v-sheet width="300" class="mx-auto">
    <v-form validate-on="submit" @submit.prevent="submit">
      <v-text-field
        v-model="userName"
        :rules="rules"
        label="User name"
      ></v-text-field>
      <v-btn type="submit" block class="mt-2">Submit</v-btn>
    </v-form>
  </v-sheet>
</template>

<script>
  export default {
    data: vm => ({
      userName: '',
      rules: [
        value => vm.checkApi(value),
      ],
      timeout: null,
    }),
    methods: {
      async submit (event) {
        const results = await event
        alert(JSON.stringify(results, null, 2))
      },
      async checkApi (userName) {
        return new Promise(resolve => {
          clearTimeout(this.timeout)
          this.timeout = setTimeout(() => {
            if (!userName) return resolve('Please enter a user name.')
            if (userName === 'johnleider') return resolve('User name already taken. Please try another one.')

            return resolve(true)
          }, 1000)
        })
      },
    },
  }
</script>
