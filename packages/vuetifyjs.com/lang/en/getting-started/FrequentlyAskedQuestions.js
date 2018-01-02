export default {
  header: 'Frequently asked questions',
  headerText: 'Stuck on a particular problem? Check some of these common gotchas before creating a ticket. If you still cannot find what you are looking for, submit an <a href="https://issues.vuetifyjs.com" target="_blank" rel="noopener">issue</a> on github or ask the community in <a href="https://chat.vuetifyjs.com" target="_blank" rel="noopener">discord</a>.',
  question: 'Question:',
  answer: 'Answer',
  noResultsFound: 'No results found',
  resetSearch: 'Reset search',
  gotchas: [
    {
      q: 'My code doesn\'t work - what should I do?',
      a: 'First, ensure that you\'re using the latest version of Vue.js and Vuetify. Try to reproduce it in codepen using the following [template](https://template.vuetifyjs.com/). If you are unable to reproduce the issue outside of your environment, this usually means the issue resides locally. If you are still unable to resolve your issue, please provide your codepen and issue in **#need-help** in the [community](https://chat.vuetifyjs.com).'
    },
    {
      q: 'Is there a codepen template with router?',
      a: 'Yes, [right here](https://codepen.io/zikeji/pen/ypeQNm).'
    },
    {
      q: 'My application does not look correct',
      a: 'Vuetify requires the use of the `v-app` component. It should wrap your entire application and is the center point for much of the framework functionality. If for whatever reason you cannot use this element, you can mimic it from attributes and classes. Set the `data-app` attribute to true on the highest element available (not including body), and the **application application--{light|dark}** classes.'
    },
    {
      q: 'The Dark or Light theme are not working.',
      a: 'Vuetify requires a mounting point in order to perform tasks such as theme styling. Ensure that you have a `v-app` wrapping your application. In the event that this is not possible, for whatever reason, you can mimic its behavior by applying **data-app** and **class="application application--light (or dark)** to the highest element that you can within your application.'
    },
    {
      q: 'Menu/Dialog/Navigation drawer are not opening properly.',
      a: 'Ensure that your components are wrapped with a `v-app` element. If you are using an element to activate the component that is not placed into the <kbd>activator</kbd> slot, ensure that you stop propagation of the click event. These components utilize the `v-outside-click` directive and will immediately close.'
    },
    {
      q: 'The scrollbar is showing even though my content is not overflowing vertically.',
      a: 'Vuetify by default turns on the html scrollbar. This is a design choice and has been debated numerous times. There are pros and cons to having and not having it and as of now, the vote is in favor of leaving it as is. If you wish to disable this functionality, simply add `html { overflow-y: auto }` to your style file.'
    },
    {
      q: 'How to center vertically?',
      a: 'Apply the **fill-height** prop to `v-container`. This helper class normally only adds **height: 100%**, but for the container, it also looks for a child `v-layout` and applies the needed classes to vertically center the content.'
    },
    {
      q: 'My _/_ link is active when I\'m on _/home_ page',
      a: 'Add the **exact** to the link that points to absolute /. For more information on this, you can visit the official Vue router [documentation](https://router.vuejs.org/en/api/router-link.html).'
    },
    {
      q: 'My page on mobile is not responsive',
      a: 'Add the `<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui">` to the `<head>` section in your index.html.'
    },
    {
      q: 'How do I use Font Awesome Icons or Material Design Icons (mdi)?',
      a: 'You must add the fonts to your index.html or otherwise import them into your project<br>**MDI**: [Material Design Icons](https://materialdesignicons.com/getting-started)<br>**FA**: [Font Awesome](http://fontawesome.io/get-started/)'
    },
    {
      q: 'My dialog closes immediately after clicking the button',
      a: 'When not using the **activator** slot for `v-menu` and `v-dialog` for example, you must manually stop the _propagation_ of the click event. To do this, simply add the _.stop_ modifier to the click event, `@click.stop="myMethod"`.'
    },
    {
      q: 'Relative images are not working in `v-card` components',
      a: 'Vue loader converts relative paths into require functions automatically for you. Unfortunately, this is not the case when it comes to custom components. You can circumvent this issue by using `require`.<br><br>`<v-card :src="require(\'path/to/img/img.jpg\')"`'
    }
  ],
  questionHeader: 'Have something that you think belongs here?',
  questionButton: 'Let us know'
}
