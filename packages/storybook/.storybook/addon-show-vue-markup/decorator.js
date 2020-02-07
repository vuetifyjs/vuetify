import addons, { makeDecorator } from '@storybook/addons';
import beautify from 'js-beautify'

const withTemplate = makeDecorator({
  name: 'withTemplate',
  wrapper: (getStory, context) => {
    const story = getStory(context);

    const template = story && story.options &&
      story.options.STORYBOOK_WRAPS &&
      story.options.STORYBOOK_WRAPS.options &&
      story.options.STORYBOOK_WRAPS.options.template || null;

    const channel = addons.getChannel()
    channel.emit('vuetify/markup', { markup: beautify.html(template, { indent_size: 2 }) })

    return story
  }
});

export default withTemplate
