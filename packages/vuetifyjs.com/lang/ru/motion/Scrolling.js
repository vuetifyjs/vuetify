export default {
  header: 'Scrolling',
  headerText: 'You can programatically trigger scrolling in your application by using the `goTo` method found on the `$vuetify` object. This method supports several different types of target selectors, and options including smooth scrolling using built-in easing functions.',
  firstHeader: 'First',
  secondHeader: 'Second',
  thirdHeader: 'Third',
  loremIpsum: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
  examples: [{
    usage: {
      desc: 'The `goTo` method takes two parameters `target` and `options`. `target` can be either a pixel offset from the top of the page, a valid css selector, or an element reference. `options` is an object that includes `duration`, `easing` and `offset`.'
    }
  }],
  components: ['$vuetify'],
  functions: {
    goTo: 'Scroll to target location, using provided options'
  }
}
