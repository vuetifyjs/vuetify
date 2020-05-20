/**
 * plugins/webfontloader.js
 *
 * webfontloader documentation: https://github.com/typekit/webfontloader
 */

 // Imports
import WebFontLoader from 'webfontloader'

WebFontLoader.load({
  google: {
    families: ['Roboto:100,300,400,500,700,900&display=swap'],
  },
})
