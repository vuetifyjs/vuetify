export const sv = {
  close: 'Hej',
  foo: '{0} sv {1}',
}

export const ja = {
  close: 'konnichiwa',
  foo: '{0} ja {1}',
}

export const en = {
  close: 'Hello',
  foo: '{0} en {1}',
}

export const messages = {
  en: {
    message: {
      hello: 'hello world',
    },
    $vuetify: en,
  },
  ja: {
    message: {
      hello: 'こんにちは、世界',
    },
    $vuetify: ja,
  },
  sv: {
    message: {
      hello: 'Hejsan Världen!',
    },
    $vuetify: sv,
  },
}

export const intlMessages = {
  en: {
    'message.hello': 'hello world',
    '$vuetify.close': 'Hello',
  },
  ja: {
    'message.hello': 'こんにちは、世界',
    '$vuetify.close': 'konnichiwa',
  },
  sv: {
    'message.hello': 'Hejsan Världen!',
    '$vuetify.close': 'Hej',
  },
}
