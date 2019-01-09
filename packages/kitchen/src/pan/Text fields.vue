<template>
  <v-container>
    <v-layout column>
      <h3 class="title grey--text mb-4 mt-5 center">Styles</h3>
      <v-flex>
        <v-layout wrap>
          <v-flex
            xs12
            sm6
            md3>
            <v-text-field
              class="ma-2"
              label="Regular"
            />
          </v-flex>

          <v-flex
            xs12
            sm6
            md3>
            <v-text-field
              class="ma-2"
              label="Regular"
              placeholder="Placeholder"
            />
          </v-flex>

          <v-flex
            xs12
            sm6
            md3>
            <v-text-field
              class="ma-2"
              label="Solo"
              solo
            />
          </v-flex>

          <v-flex
            xs12
            sm6
            md3>
            <v-text-field
              class="ma-2"
              label="Solo"
              placeholder="Placeholder"
              solo
            />
          </v-flex>

          <v-flex
            xs12
            sm6
            md3>
            <v-text-field
              class="ma-2"
              label="Box"
              box
            />
          </v-flex>

          <v-flex
            xs12
            sm6
            md3>
            <v-text-field
              class="ma-2"
              label="Box"
              placeholder="Placeholder"
              box
            />
          </v-flex>

          <v-flex
            xs12
            sm6
            md3>
            <v-text-field
              class="ma-2"
              label="Outline"
              outline
            />
          </v-flex>

          <v-flex
            xs12
            sm6
            md3>
            <v-text-field
              class="ma-2"
              label="Outline"
              placeholder="Placeholder"
              outline
            />
          </v-flex>
        </v-layout>
      </v-flex>

      <h3 class="title grey--text mb-4 mt-5 center">Single line</h3>
      <v-flex>
        <v-layout
          row
          wrap>
          <v-flex
            xs12
            sm6>
            <v-text-field
              class="ma-2"
              label="Regular"
              single-line
            />
          </v-flex>

          <v-flex
            xs12
            sm6>
            <v-text-field
              class="ma-2"
              label="Solo"
              single-line
              solo
            />
          </v-flex>

          <v-flex
            xs12
            sm6>
            <v-text-field
              class="ma-2"
              label="Box"
              single-line
              box
            />
          </v-flex>

          <v-flex
            xs12
            sm6>
            <v-text-field
              class="ma-2"
              label="Outline"
              single-line
              outline
            />
          </v-flex>
        </v-layout>
      </v-flex>

      <h3 class="title grey--text mb-4 mt-5 center">Disabled and read-only</h3>
      <v-flex>
        <v-layout
          row
          wrap>
          <v-flex
            xs12
            sm6>
            <v-text-field
              class="ma-2"
              value="John Doe"
              label="Regular"
              disabled
            />
          </v-flex>

          <v-flex
            xs12
            sm6>
            <v-text-field
              class="ma-2"
              value="John Doe"
              label="Regular"
              readonly
            />
          </v-flex>

          <v-flex
            xs12
            sm6>
            <v-text-field
              class="ma-2"
              value="John Doe"
              label="Solo"
              solo
              disabled
            />
          </v-flex>

          <v-flex
            xs12
            sm6>
            <v-text-field
              class="ma-2"
              value="John Doe"
              label="Solo"
              solo
              readonly
            />
          </v-flex>

          <v-flex
            xs12
            sm6>
            <v-text-field
              class="ma-2"
              value="John Doe"
              label="Box"
              box
              disabled
            />
          </v-flex>

          <v-flex
            xs12
            sm6>
            <v-text-field
              class="ma-2"
              value="John Doe"
              label="Box"
              box
              readonly
            />
          </v-flex>

          <v-flex
            xs12
            sm6>
            <v-text-field
              class="ma-2"
              value="John Doe"
              label="Outline"
              outline
              disabled
            />
          </v-flex>

          <v-flex
            xs12
            sm6>
            <v-text-field
              class="ma-2"
              value="John Doe"
              label="Outline"
              outline
              readonly
            />
          </v-flex>
        </v-layout>
      </v-flex>

      <h3 class="title grey--text mb-4 mt-5 center">Icons</h3>
      <v-flex>
        <v-layout
          row
          wrap>
          <v-flex
            xs12
            sm6>
            <v-text-field
              class="ma-2"
              label="Prepend"
              prepend-icon="mdi-map-marker"
            />

            <v-text-field
              class="ma-2"
              label="Append"
              append-icon="mdi-map-marker"
            />

            <v-text-field
              class="ma-2"
              label="Append outer"
              append-outer-icon="mdi-map-marker"
            />
          </v-flex>

          <v-flex
            xs12
            sm6>
            <v-text-field
              class="ma-2"
              solo
              label="Prepend"
              prepend-icon="mdi-map-marker"
            />

            <v-text-field
              class="ma-2"
              solo
              label="Append"
              append-icon="mdi-map-marker"
            />

            <v-text-field
              class="ma-2"
              solo
              label="Append outer"
              append-outer-icon="mdi-map-marker"
            />
          </v-flex>

          <v-flex
            xs12
            sm6>
            <v-text-field
              class="ma-2"
              box
              label="Prepend"
              prepend-icon="mdi-map-marker"
            />

            <v-text-field
              class="ma-2"
              box
              label="Append"
              append-icon="mdi-map-marker"
            />

            <v-text-field
              class="ma-2"
              box
              label="Append outer"
              append-outer-icon="mdi-map-marker"
            />
          </v-flex>

          <v-flex
            xs12
            sm6>
            <v-text-field
              class="ma-2"
              outline
              label="Prepend"
              prepend-icon="mdi-map-marker"
            />

            <v-text-field
              class="ma-2"
              outline
              label="Append"
              append-icon="mdi-map-marker"
            />

            <v-text-field
              class="ma-2"
              outline
              label="Append outer"
              append-outer-icon="mdi-map-marker"
            />
          </v-flex>
        </v-layout>
      </v-flex>

      <h3 class="title grey--text mb-4 mt-5 center">Clearable</h3>
      <v-flex>
        <v-layout
          row
          wrap>
          <v-flex
            xs12
            sm6>
            <v-text-field
              v-model="message1"
              class="ma-2"
              label="Regular"
              clearable
            />
          </v-flex>

          <v-flex
            xs12
            sm6>
            <v-text-field
              v-model="message2"
              class="ma-2"
              solo
              label="Solo"
              clearable
            />
          </v-flex>

          <v-flex
            xs12
            sm6>
            <v-text-field
              v-model="message3"
              class="ma-2"
              box
              label="Box"
              clearable
            />
          </v-flex>

          <v-flex
            xs12
            sm6>
            <v-text-field
              v-model="message4"
              class="ma-2"
              label="Outline"
              outline
              clearable
            />
          </v-flex>

          <v-btn
            block
            @click="message1 = message2 = message3 = message4 = 'Hey!'">Reset</v-btn>
        </v-layout>
      </v-flex>

      <h3 class="title grey--text mb-4 mt-5 center">Custom icon slots</h3>
      <v-flex>
        <v-text-field
          v-model="message5"
          outline
          clearable
          label="Message"
          type="text"
        >
          <v-tooltip
            slot="prepend"
            bottom
          >
            <v-icon slot="activator">mdi-help-circle-outline</v-icon>
            I'm a tooltip
          </v-tooltip>

          <v-fade-transition slot="append">
            <v-progress-circular
              v-if="loading"
              size="24"
              color="info"
              indeterminate
            />
            <img
              v-else
              width="24"
              height="24"
              src="https://cdn.vuetifyjs.com/images/logos/v-alt.svg" >
          </v-fade-transition>

          <v-menu
            slot="append-outer"
            style="top: -12px"
            offset-y
          >
            <v-btn slot="activator">
              <v-icon left>mdi-menu</v-icon>
              Menu
            </v-btn>
            <v-card>
              <v-card-text class="pa-4">
                <v-btn
                  large
                  flat
                  color="primary"
                  @click="clickMe"><v-icon left>mdi-target</v-icon>Click me</v-btn>
              </v-card-text>
            </v-card>
          </v-menu>
        </v-text-field>
      </v-flex>

      <h3 class="title grey--text mb-4 mt-5 center">Colored icons using slots</h3>
      <v-flex>
        <v-text-field
          v-model="message6"
          outline
          clearable
          label="Message"
          type="text"
        >
          <v-icon
            slot="prepend"
            color="success"
            bottom>mdi-check</v-icon>

          <v-icon
            slot="append"
            color="error">mdi-alert-circle</v-icon>

          <v-icon
            slot="append-outer"
            color="teal">mdi-account</v-icon>
        </v-text-field>
      </v-flex>

      <h3 class="title grey--text mb-4 mt-5 center">Label slot</h3>
      <v-flex>
        <v-text-field>
          <template slot="label">
            What about <strong>icon</strong> here? <v-icon style="vertical-align: middle">mdi-file-find</v-icon>
          </template>
        </v-text-field>
      </v-flex>

      <h3 class="title grey--text mb-4 mt-5 center">Character counter</h3>
      <v-flex>
        <v-layout
          row
          wrap>
          <v-flex
            xs12
            sm6>
            <v-text-field
              v-model="title"
              :rules="rules"
              class="ma-2"
              counter="25"
              hint="This field uses counter prop"
              label="Regular"
            />
          </v-flex>

          <v-flex
            xs12
            sm6>
            <v-text-field
              v-model="description"
              :rules="rules"
              class="ma-2"
              counter
              maxlength="25"
              hint="This field uses maxlength attribute"
              label="Limit exceeded"
            />
          </v-flex>

          <v-flex
            xs12
            sm6>
            <v-text-field
              v-model="title"
              :rules="rules"
              class="ma-2"
              counter="25"
              box
              label="Box"
            />
          </v-flex>

          <v-flex
            xs12
            sm6>
            <v-text-field
              v-model="title"
              :rules="rules"
              class="ma-2"
              counter="25"
              label="Outline"
              outline
            />
          </v-flex>
        </v-layout>
      </v-flex>

      <h3 class="title grey--text mb-4 mt-5 center">Password input</h3>
      <v-flex>
        <v-layout
          row
          wrap>
          <v-flex
            xs12
            sm6>
            <v-text-field
              v-model="password"
              :append-icon="show1 ? 'mdi-eye-off' : 'mdi-eye'"
              :rules="[rules.required, rules.min]"
              :type="show1 ? 'text' : 'password'"
              class="ma-2"
              name="input-10-1"
              label="Normal with hint text"
              hint="At least 8 characters"
              counter
              @click:append="show1 = !show1"
            />
          </v-flex>

          <v-flex
            xs12
            sm6>
            <v-text-field
              :append-icon="show2 ? 'mdi-eye-off' : 'mdi-eye'"
              :rules="[rules.required, rules.min]"
              :type="show2 ? 'text' : 'password'"
              name="input-10-2"
              label="Visible"
              hint="At least 8 characters"
              value="wqfasds"
              class="input-group--focused ma-2"
              @click:append="show2 = !show2"
            />
          </v-flex>

          <v-flex
            xs12
            sm6>
            <v-text-field
              :append-icon="show3 ? 'mdi-eye-off' : 'mdi-eye'"
              :rules="[rules.required, rules.min]"
              :type="show3 ? 'text' : 'password'"
              name="input-10-2"
              label="Not visible"
              hint="At least 8 characters"
              value="wqfasds"
              class="input-group--focused ma-2"
              @click:append="show3 = !show3"
            />
          </v-flex>

          <v-flex
            xs12
            sm6>
            <v-text-field
              :append-icon="show4 ? 'mdi-eye-off' : 'mdi-eye'"
              :rules="[rules.required, rules.emailMatch]"
              :type="show4 ? 'text' : 'password'"
              class="ma-2"
              name="input-10-2"
              label="Error"
              hint="At least 8 characters"
              value="Pa"
              error
              @click:append="show4 = !show4"
            />
          </v-flex>
        </v-layout>
      </v-flex>

      <h3 class="title grey--text mb-4 mt-5 center">Password input</h3>
      <v-flex>
        <v-layout
          row
          wrap>
          <v-flex
            xs12
            sm6>
            <v-text-field
              v-model="title1"
              :rules="[rules2.required, rules2.counter]"
              class="ma-2"
              label="Title"
              counter
              maxlength="20"
            />
          </v-flex>

          <v-flex
            xs12
            sm6>
            <v-text-field
              v-model="email"
              :rules="[rules2.required, rules2.email]"
              class="ma-2"
              label="E-mail"
            />
          </v-flex>
        </v-layout>
      </v-flex>

      <h3 class="title grey--text mb-4 mt-5 center">Full-width</h3>
      <v-flex>
        <v-card>
          <v-toolbar
            card
            color="pink"
            dark
          >
            <v-icon>mdi-arrow-left</v-icon>
            <v-toolbar-title>Compose</v-toolbar-title>
            <v-spacer/>
            <v-icon>mdi-send</v-icon>
          </v-toolbar>
          <v-form>
            <v-autocomplete
              v-model="selected"
              :items="['Trevor Handsen', 'Alex Nelson']"
              chips
              label="To"
              full-width
              hide-details
              hide-no-data
              hide-selected
              multiple
              single-line
            />
            <v-divider/>
            <v-text-field
              label="Subject"
              value="Plans for the weekend"
              single-line
              full-width
              hide-details
            />
            <v-divider/>
            <v-textarea
              v-model="title2"
              label="Message"
              counter
              maxlength="120"
              full-width
              single-line
            />
          </v-form>
        </v-card>
      </v-flex>

      <h3 class="title grey--text mb-4 mt-5 center">Hints</h3>
      <v-flex>
        <v-layout
          row
          wrap>
          <v-flex
            xs12
            sm6>
            <v-text-field
              class="ma-2"
              label="Your product or service"
              value="Grocery delivery"
              hint="For example, flowers or used cars"
            />
          </v-flex>

          <v-flex
            xs12
            sm6>
            <v-text-field
              class="ma-2"
              label="Your landing page"
              hint="www.example.com/page"
              persistent-hint
            />
          </v-flex>

          <v-flex
            xs12
            sm6>
            <v-text-field
              class="ma-2"
              label="Your product or service"
              value="Grocery delivery"
              hint="For example, flowers or used cars"
              box
            />
          </v-flex>

          <v-flex
            xs12
            sm6>
            <v-text-field
              class="ma-2"
              label="Your landing page"
              hint="www.example.com/page"
              persistent-hint
              box
            />
          </v-flex>

          <v-flex
            xs12
            sm6>
            <v-text-field
              class="ma-2"
              label="Your product or service"
              value="Grocery delivery"
              hint="For example, flowers or used cars"
              outline
            />
          </v-flex>

          <v-flex
            xs12
            sm6>
            <v-text-field
              class="ma-2"
              label="Your landing page"
              hint="www.example.com/page"
              persistent-hint
              outline
            />
          </v-flex>
        </v-layout>
      </v-flex>

      <h3 class="title grey--text mb-4 mt-5 center">Box design</h3>
      <v-flex>
        <v-layout
          row
          wrap>
          <v-flex
            xs12
            sm6>
            <v-text-field
              v-model="first"
              class="ma-2"
              label="First Name"
              box
            />
          </v-flex>

          <v-flex
            xs12
            sm6>
            <v-text-field
              v-model="last"
              class="ma-2"
              label="Last Name"
              box
            />
          </v-flex>
        </v-layout>
      </v-flex>

      <h3 class="title grey--text mb-4 mt-5 center">Solo design</h3>
      <v-flex>
        <v-layout
          row
          wrap>
          <v-flex
            xs12
            sm6>
            <v-text-field
              v-model="first"
              class="ma-2"
              label="First Name"
              solo
            />
          </v-flex>

          <v-flex
            xs12
            sm6>
            <v-text-field
              v-model="last"
              class="ma-2"
              label="Last Name"
              solo
            />
          </v-flex>
        </v-layout>
      </v-flex>

      <h3 class="title grey--text mb-4 mt-5 center">Outline design</h3>
      <v-flex>
        <v-layout
          row
          wrap>
          <v-flex
            xs12
            sm6>
            <v-text-field
              v-model="first"
              class="ma-2"
              label="First Name"
              outline
            />
          </v-flex>

          <v-flex
            xs12
            sm6>
            <v-text-field
              v-model="last"
              class="ma-2"
              label="Last Name"
              outline
            />
          </v-flex>
        </v-layout>
      </v-flex>

      <h3 class="title grey--text mb-4 mt-5 center">Prefixes and suffixes</h3>
      <v-flex>
        <v-layout row>
          <v-flex xs4>
            <v-subheader>Prefix for dollar currency</v-subheader>
          </v-flex>
          <v-flex xs8>
            <v-text-field
              label="Amount"
              value="10.00"
              prefix="$"
            />
          </v-flex>
        </v-layout>

        <v-layout row>
          <v-flex xs4>
            <v-subheader>Suffix for weight</v-subheader>
          </v-flex>
          <v-flex xs8>
            <v-text-field
              label="Weight"
              value="28.00"
              suffix="lbs"
            />
          </v-flex>
        </v-layout>

        <v-layout row>
          <v-flex xs4>
            <v-subheader>Suffix for email domain</v-subheader>
          </v-flex>
          <v-flex xs8>
            <v-text-field
              label="Email address"
              value="example"
              suffix="@gmail.com"
            />
          </v-flex>
        </v-layout>

        <v-layout row>
          <v-flex xs4>
            <v-subheader>Suffix for time zone</v-subheader>
          </v-flex>
          <v-flex xs8>
            <v-text-field
              label="Label Text"
              value="12:30:00"
              type="time"
              suffix="PST"
            />
          </v-flex>
        </v-layout>
      </v-flex>

      <h3 class="title grey--text mb-4 mt-5 center">Mask</h3>
      <v-flex>
        <v-card>
          <v-card-text>
            <v-text-field
              v-model="mask"
              label="Mask"/>
          </v-card-text>
          <v-card-text>
            <v-text-field
              :mask="mask"
              v-model="value"
              label="Value"/>
          </v-card-text>
        </v-card>
      </v-flex>

      <h3 class="title grey--text mb-4 mt-5 center">Loading</h3>
      <v-flex>
        <v-text-field
          v-model="value1"
          color="cyan darken"
          label="Text field"
          placeholder="Start typing..."
          loading
        />
      </v-flex>

      <h3 class="title grey--text mb-4 mt-5 center">Progress</h3>
      <v-flex>
        <v-text-field
          v-model="value2"
          :label="message"
          color="cyan darken"
          password
          placeholder="Start typing..."
          loading
        >
          <v-progress-linear
            slot="progress"
            :value="progress"
            :color="color"
            height="7"
          />
        </v-text-field>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'TextFields',

  data: () => ({
    message1: 'Hey!',
    message2: 'Hey!',
    message3: 'Hey!',
    message4: 'Hey!',
    message5: 'Hey!',
    message6: 'Hey!',
    loading: false,
    title: 'Preliminary report',
    description: 'California is a state in the western United States',
    rules: [v => v.length <= 25 || 'Max 25 characters'],
    show1: false,
    show2: true,
    show3: false,
    show4: false,
    password: 'Password',
    rules1: {
      required: value => !!value || 'Required.',
      min: v => v.length >= 8 || 'Min 8 characters',
      emailMatch: () => ('The email and password you entered don\'t match')
    },
    title1: 'Preliminary report',
    email: '',
    rules2: {
      required: value => !!value || 'Required.',
      counter: value => value.length <= 20 || 'Max 20 characters',
      email: value => {
        // eslint-disable-next-line max-len
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'Invalid e-mail.'
      }
    },
    selected: ['Trevor Handsen'],
    items: ['Trevor Handsen', 'Alex Nelson'],
    title2: 'Hi,\nI just wanted to check in and see if you had any plans the upcoming weekend. We are thinking of heading up to Napa',
    first: 'John',
    last: 'Doe',
    mask: 'credit-card',
    value: '4444444444444444',
    value1: '',
    value2: ''
  }),
  computed: {
    progress () {
      return Math.min(100, this.value2.length * 10)
    },
    color () {
      return ['error', 'warning', 'success'][Math.floor(this.progress / 40)]
    },
    message () {
      return ['Too short', 'Weak', 'Strong'][Math.floor(this.progress / 40)]
    }
  },

  methods: {
    clickMe () {
      this.loading = true
      this.message5 = 'Wait for it...'
      setTimeout(() => {
        this.loading = false
        this.message5 = 'You\'ve clicked me!'
      }, 2000)
    }
  }
}
</script>

<style scoped>
.center {
  align-self: center;
}
</style>
