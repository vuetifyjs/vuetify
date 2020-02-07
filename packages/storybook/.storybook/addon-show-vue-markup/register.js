import { useState, createElement } from 'react'
import { addons, types } from '@storybook/addons';
import { useChannel } from '@storybook/api';
import { AddonPanel } from '@storybook/components';
import Highlight, { defaultProps } from 'prism-react-renderer'
import './styles.css'

const ADDON_ID = 'show-vue-markup'
const PANEL_ID = `${ADDON_ID}/panel`

const MarkupPanel = () => {
  const [markup, setMarkup] = useState('');

  useChannel({
    'vuetify/markup': (payload) => {
      setMarkup(payload.markup);
    }
  })

  return createElement(Highlight, {
    ...defaultProps,
    code: markup,
    language: 'html',
    children: ({ className, style, tokens, getLineProps, getTokenProps }) => {
      return createElement('pre', {
        className,
        style
      }, tokens.map((line, i) => createElement('div', {
        ...getLineProps({ line, key: i })
      }, line.map((token, key) => createElement('span', {
        ...getTokenProps({ token, key})
      })))))
    }
  })
}

addons.register(ADDON_ID, () => {
  const render = ({ active, key }) => createElement(AddonPanel, { active, key }, createElement(MarkupPanel))

  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: 'Markup',
    render,
  })
})
