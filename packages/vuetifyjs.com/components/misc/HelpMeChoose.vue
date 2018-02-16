<template>
  <v-stepper
    v-model="stepper"
    class="elevation-0"
  >
    <v-stepper-header>
      <template v-for="(step, i) in steps">
        <v-stepper-step
          :editable="i + 1 < stepper"

          :key="i"
          :step="i + 1"
        >
          {{ step.step }}
        </v-stepper-step>
        <v-divider
          :key="`divider-${i}`"
          v-if="i !== steps.length - 1"
        />
      </template>
    </v-stepper-header>
    <v-stepper-items>
      <v-stepper-content
        v-for="(step, i) in steps"
        :key="i"
        :step="i + 1"
      >
        <v-card flat>
          <v-card-title class="justify-center subheading">
            {{ step.question }}
          </v-card-title>
          <v-card-text class="text-xs-center">
            <v-btn
              large
              v-for="(option, j) in step.options"
              :key="j"
              @click="next(step, option)"
            >
              <v-icon
                left
                v-if="option.icon"
                v-text="option.icon"
              />
              {{ option.action }}
            </v-btn>
          </v-card-text>
        </v-card>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
  export default {
    props: {
      value: {
        type: String,
        default: ''
      }
    },

    data: vm => ({
      complete: false,
      suggestion: {
        experience: null,
        application: null,
        tests: null,
        seo: null
      },
      stepper: null,
      steps: [
        {
          step: vm.$t('Components.HelpMeChoose.experience'),
          question: vm.$t('Components.HelpMeChoose.question1'),
          target: 'experience',
          options: [
            {
              action: vm.$t('Components.HelpMeChoose.beginner'),
              icon: 'mdi-account',
              value: 'b'
            },
            {
              action: vm.$t('Components.HelpMeChoose.intermediate'),
              icon: 'mdi-account-plus',
              value: 'i'
            },
            {
              action: vm.$t('Components.HelpMeChoose.advanced'),
              icon: 'mdi-account-star',
              value: 'a'
            }
          ]
        },
        {
          step: vm.$t('Components.HelpMeChoose.application'),
          question: vm.$t('Components.HelpMeChoose.question2'),
          target: 'application',
          options: [
            {
              action: vm.$t('Components.HelpMeChoose.web'),
              icon: 'mdi-web',
              value: 'w'
            },
            {
              action: vm.$t('Components.HelpMeChoose.desktop'),
              icon: 'mdi-monitor',
              value: 'd'
            },
            {
              action: vm.$t('Components.HelpMeChoose.mobile'),
              icon: 'mdi-cellphone-android',
              value: 'm'
            }
          ]
        },
        {
          step: vm.$t('Components.HelpMeChoose.tests'),
          question: vm.$t('Components.HelpMeChoose.question3'),
          target: 'tests',
          options: [
            {
              action: vm.$t('Components.HelpMeChoose.yes'),
              value: 'y'
            },
            {
              action: vm.$t('Components.HelpMeChoose.no'),
              value: 'n'
            }
          ]
        },
        {
          step: vm.$t('Components.HelpMeChoose.seo'),
          question: vm.$t('Components.HelpMeChoose.question4'),
          target: 'seo',
          options: [
            {
              action: vm.$t('Components.HelpMeChoose.yes'),
              value: 'y'
            },
            {
              action: vm.$t('Components.HelpMeChoose.no'),
              value: 'n'
            }
          ]
        },
        {
          step: vm.$t('Components.HelpMeChoose.suggestion'),
          question: vm.$t('Components.HelpMeChoose.question5'),
          options: [
            {
              action: vm.$t('Components.HelpMeChoose.reset'),
              value: 'r'
            }
          ]
        }
      ]
    }),

    computed: {
      pattern () {
        return Object.values(this.suggestion).join('')
      }
    },

    watch: {
      pattern (val) {
        this.$emit('input', val)
      }
    },

    methods: {
      next (step, option) {
        if (this.stepper + 1 > this.steps.length) return this.reset()

        if (option.value) {
          this.suggestion[step.target] = option.value
        }

        this.stepper++
      },
      reset () {
        this.stepper = 1
        this.complete = 0

        Object.keys(this.suggestion).forEach(key => {
          this.suggestion[key] = null
        })
      }
    }
  }
</script>
