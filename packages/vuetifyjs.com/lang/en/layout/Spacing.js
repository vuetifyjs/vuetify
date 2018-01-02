export default {
  header: 'Spacing',
  headerText: 'Update your layout without creating new classes. Spacing helpers are useful for modifying the padding and margin of an element.',
  toc: [
    {
      text: 'Introduction',
      href: 'introduction'
    },
    {
      text: 'How it works',
      href: 'how-it-works'
    },
    {
      text: 'Examples',
      href: 'examples'
    },
    {
      text: 'Horizontal centering',
      href: 'horizontal-centering'
    }
  ],
  howText: 'Apply **margin** or **padding** to an element ranging from _0 to 5_. Each size increment was designed to align with common Material Design spacing. These classes can be applied using the following format `{property}{direction}-{size}`.',
  propertyText: 'The _property_ applies the type of spacing:',
  properties: [
    '`m` - applies `margin`',
    '`p` - applies `padding`'
  ],
  directionText: 'The _direction_ designates the side the property applies to:',
  directions: [
    '`t` - applies the property for `margin-top` or `padding-top`',
    '`b` - applies the property for `margin-bottom` or `padding-bottom`',
    '`l` - applies the property for `margin-left` or `padding-left`',
    '`r` - applies the property for `margin-right` or `padding-right`',
    '`x` - applies the property for both `*-left` and `*-right`',
    '`y` - applies the property for both `*-top` and `*-bottom`'
  ],
  sizeText: 'The _size_ controls the increment of the property:',
  sizes: [
    '`0` - removes the property for `margin` or `padding` by setting it to `0`',
    '`1` - sets the `margin` or `padding` property to `$spacer * .25`',
    '`2` - sets the `margin` or `padding` property to `$spacer * .5`',
    '`3` - sets the `margin` or `padding` property to `$spacer`',
    '`4` - sets the `margin` or `padding` property to `$spacer * 1.5`',
    '`5` - sets the `margin` or `padding` property to `$spacer * 3`',
  ],
  horizontalHeader: 'Horizontal centering',
  horizontalText: 'For block elements with a designated width, you can apply `.mx-auto` to horizontally center the content.'
}
