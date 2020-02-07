import { addDecorator } from '@storybook/vue'
import { withA11y } from '@storybook/addon-a11y'
import { withKnobs } from '@storybook/addon-knobs'
import { withTemplate } from '~storybook/addon-show-vue-markup'
import { withVuetify } from '~storybook/addon-vuetify'

addDecorator(withTemplate)
addDecorator(withVuetify)
addDecorator(withA11y)
addDecorator(withKnobs)
