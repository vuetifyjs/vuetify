// Styles
import './VDatePickerControls.sass'

// Components
import { VBtn } from '@/components/VBtn'
import { VSpacer } from '@/components/VGrid'

// Composables
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { genericComponent, propsFactory, useRender } from '@/util'

export const makeVDatePickerControlsProps = propsFactory({
  nextIcon: {
    type: [String],
    default: '$next',
  },
  prevIcon: {
    type: [String],
    default: '$prev',
  },
  expandIcon: {
    type: [String],
    default: '$expand',
  },
  collapseIcon: {
    type: [String],
    default: '$collapse',
  },
  modelValue: Boolean,
  text: String,

}, 'VDatePickerControls')

export const VDatePickerControls = genericComponent()({
  name: 'VDatePickerControls',

  props: makeVDatePickerControlsProps(),

  emits: {
    'click:prev': () => true,
    'click:next': () => true,
    'update:modelValue': (val: boolean) => true
  },

  setup (props, { emit }) {
    const model = useProxiedModel(props, 'modelValue')

    function onClickPrev () {
      emit('click:prev')
    }
    function onClickNext () {
      emit('click:next')
    }
    function onClickViewMode (val: boolean) {
      model.value = !model.value
    }

    useRender(() => {
      return (
        <div class="v-date-picker-controls">
          <VBtn
            appendIcon={ model.value ? props.collapseIcon : props.expandIcon }
            text={ props.text }
            variant="text"
            onClick={ onClickViewMode }
          />

          <VSpacer />

          <div>
            <VBtn
              variant="text"
              size="small"
              icon={ props.prevIcon }
              onClick={ onClickPrev }
            />

            <VBtn
              variant="text"
              size="small"
              icon={ props.nextIcon }
              onClick={ onClickNext }
            />
          </div>
        </div>
      )
    })

    return {}
  },
})

export type VDatePickerControls = InstanceType<typeof VDatePickerControls>
