import { createIntl } from '@formatjs/intl'
import { intlMessages } from './messages'

export const intl = createIntl({ locale: 'en', defaultLocale: 'en', messages: intlMessages.en })
