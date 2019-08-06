import addons, { makeDecorator } from '@storybook/addons';
import beautify from 'js-beautify'
import { EVENT_ID } from './register';

const withTemplate = makeDecorator({
  name: 'withTemplate',
  wrapper: (storyFn, context) => {
    const story = storyFn(context);

    const template = story.options &&
      story.options.STORYBOOK_WRAPS &&
      story.options.STORYBOOK_WRAPS.options &&
      story.options.STORYBOOK_WRAPS.options.template || null;

    const channel = addons.getChannel()
    channel.emit(EVENT_ID, { markup: beautify.html(template, { indent_size: 2 }) })

    return story
  }
});

export default withTemplate
