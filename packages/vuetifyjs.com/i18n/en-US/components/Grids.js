export default {
  header: 'Grid system',
  headerText: `Vuetify has a 12 point grid system. Built using <kbd>flex-box</kbd>, the grid is used to layout an application\'s content.  It contains 5 types of media breakpoints that are used for targeting specific screen sizes or orientations. The props for grid components are actually classes that are derived from their defined properties. This allows you to easily specify these helper classes as props, while still providing the classes to be used anywhere.`,
  props: {},
  breakpointHeader: 'Breakpoint object',
  breakpointText1: 'Vuetify converts the available breakpoints into an accessible object from within your application. This will allow you to assign/apply specific properties and attributes based upon viewport size. The object can be accessed from:',
  breakpointText2: `This object contains the same semantic properties that you are already used to using from the grid system. Let's try a real world example. You have a <code>v-dialog</code> component that you want to convert to a <strong>full-screen</strong> dialog on mobile devices. Normally you would need to bind watchers for the viewport size, and/or check whenever the page loads.`,
  breakpointText3: `That's a lot of boilerplate to write. Even if you opt to use the built in <a href="/directives/resizing">v-resize</a> directive, you are still going to have to define a resize method. With the <strong>breakpoint</strong> object you can completely skip this logic and get back to building your application.`
}