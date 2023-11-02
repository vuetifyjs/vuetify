// import DateFnsAdapter from '@date-io/date-fns'
// import enUS from 'date-fns/locale/en-US'
// import svSE from 'date-fns/locale/sv'
// import jaJP from 'date-fns/locale/ja'
// import DateIoAdapter from '@date-io/date-fns'
// import { enAU } from 'date-fns/locale'

// const DateIoDateFnsAdapter = new DateIoAdapter()
// const DateIoDateFnsAdapter = new DateIoAdapter({ locale: enAU })

export default {
  // adapter: DateFnsAdapter,
  formats: {
    // dayOfMonth: date => date.getDate(),
  },
  locale: {
    en: 'en-US',
    // en: 'en-AU',
    // en: enUS,
    // sv: svSE,
    // ja: jaJP,
  },
}
