// Styles
import './VCalendarHeader.sass'

// Components
import { VBtn } from '@/components/VBtn'

// Composables
import { useLocale } from '@/composables/locale'

// Utilities
import { genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'

export const makeVCalendarHeaderProps = propsFactory({
  nextIcon: {
    type: String,
    default: '$next',
  },
  prevIcon: {
    type: String,
    default: '$prev',
  },
  title: String,
  text: {
    type: String,
    default: '$vuetify.calendar.today',
  },
  viewMode: {
    type: String as PropType<'month' | 'week' | 'day'>,
    default: 'month',
  },
}, 'VCalendarHeader')

export const VCalendarHeader = genericComponent()({
  name: 'VCalendarHeader',

  props: makeVCalendarHeaderProps(),

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
            key="today"
            class="v-calendar-header__today"
            text={ t(props.text) }
            variant="outlined"
            onClick={ toToday }
          />
        )}

        <VBtn
          density="comfortable"
          icon={ props.prevIcon }
          variant="text"
          onClick={ prev }
        />

        <VBtn
          density="comfortable"
          icon={ props.nextIcon }
          variant="text"
          onClick={ next }
        />

        <div class="v-calendar-header__title">{ props.title }</div>
      </div>
    ))

    return {}
  },
})

export type VCalendarHeader = InstanceType<typeof VCalendarHeader>
