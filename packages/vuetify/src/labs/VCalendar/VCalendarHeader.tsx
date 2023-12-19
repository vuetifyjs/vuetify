// Styles
import './VCalendarHeader.sass'

// Components
import { VBtn } from '@/components/VBtn'

// Composables
import { useLocale } from '@/composables/locale'

// Utilities
import { genericComponent, useRender } from '@/util'

export const VCalendarHeader = genericComponent()({
  name: 'VCalendarHeader',

  props: {
    nextIcon: {
      type: [String],
      default: '$next',
    },
    prevIcon: {
      type: [String],
      default: '$prev',
    },
    title: String,
    text: {
      type: String,
      default: '$vuetify.calendar.today',
    },
    viewMode: {
      type: String,
      default: 'month',
    },
  },

  emits: {
    'click:next': () => true,
    'click:prev': () => true,
    'click:toToday': () => true,
  },

  setup (props, { emit }) {
    const { t } = useLocale()

    function prev () {
      emit('click:prev')
    }

    function next () {
      emit('click:next')
    }

    function toToday () {
      emit('click:toToday')
    }

    useRender(() => (
      <div class="v-calendar-header">
        { props.text && (
          <VBtn
            class="v-calendar-header__today"
            key="today"
            text={ t(props.text) }
            variant="outlined"
            onClick={ toToday }
          />
        )}

        <VBtn
          icon={ props.prevIcon }
          onClick={ prev }
          density="comfortable"
          variant="text"
        />

        <VBtn
          icon={ props.nextIcon }
          onClick={ next }
          density="comfortable"
          variant="text"
        />

        <div class="v-calendar-header__title">{ props.title }</div>
      </div>
    ))

    return {}
  },
})

export type VCalendarHeader = InstanceType<typeof VCalendarHeader>
