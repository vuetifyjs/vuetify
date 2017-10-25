export default {
  light: {
    header: 'Light theme',
    desc: 'A standard single select has a multitude of configuration options.'
  },
  dark: {
    header: 'Dark theme',
    desc: 'Selects also support theming, dark and light.'
  },
  icons: {
    header: 'Icons',
    desc: 'Use a custom prepended or appended icon.'
  },
  multiple: {
    header: 'Multiple',
    desc: `A multi-select can utilize v-chip as the display for selected items.`
  },
  autocomplete: {
    header: 'Autocomplete',
    desc: `Provides type-ahead autocomplete functionality.`
  },
  scopedSlots: {
    header: 'Scoped slots',
    desc: `With the power of scoped slots, you can customize the visual output of the select. In this example we add a profile picture for both the chips and list items.`
  },
  customTextAndValue: {
    header: 'Customized item text and value',
    desc: `You can specify the specific properties within your items array correspond to the text and value fields. By default, this is <strong>text</strong> and <strong>value</strong>. In this example we also use the <code>return-object</code> prop which will return the entire object of the selected item on selection.`
  },
  tags: {
    header: 'Tags',
    desc: `With tags you can allow a user to create new values that may not be present in a provided items list. Keep in mind, tags only supports arrays of <strong>primitive</strong> items and cannot be used with props such as <code>item-text</code>, <code>item-value</code> for example.`
  },
  asynchronous: {
    header: 'Asynchronous items',
    desc: 'Sometimes you need to load data externally based upon a search query. Use the <code>search-input</code> prop with the <strong>.sync</strong> modifier when using the <code>autocomplete</code> prop. We also make use of the new <code>cache-items</code> prop. This will keep a unique list of all items that have been passed to the <code>items</code> prop and is <strong>REQUIRED</strong> when using asynchronous items and the <strong>multiple</strong> prop.'
  }
}
