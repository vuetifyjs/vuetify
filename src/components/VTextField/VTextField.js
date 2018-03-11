// Styles
import '../../stylus/components/_inputable.styl'
import '../../stylus/components/_text-fields.styl'

// Component Level Mixins
import TextFieldComputed from './mixins/text-field-computed'
import TextFieldData from './mixins/text-field-data'
import TextFieldEvents from './mixins/text-field-events'
import TextFieldGenerators from './mixins/text-field-generators'
import TextFieldLifeCycle from './mixins/text-field-life-cycle'
import TextFieldMethods from './mixins/text-field-methods'
import TextFieldProps from './mixins/text-field-props'
import TextFieldWatch from './mixins/text-field-watch'

// Mixins
import Inputable from '../../mixins/inputable'
import Maskable from '../../mixins/maskable'
import Soloable from '../../mixins/soloable'

export default {
  name: 'v-text-field',

  mixins: [
    Inputable,
    Maskable,
    Soloable,
    TextFieldComputed,
    TextFieldData,
    TextFieldEvents,
    TextFieldGenerators,
    TextFieldLifeCycle,
    TextFieldMethods,
    TextFieldProps,
    TextFieldWatch
  ],

  inheritAttrs: false
}
