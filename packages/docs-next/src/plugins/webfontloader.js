/**
 * plugins/webfontloader.js
 *
 * webfontloader documentation: https://github.com/typekit/webfontloader
 */

 // Imports
import WebFontLoader from 'webfontloader'

export function loadFonts () {
  WebFontLoader.load({
    google: {
      families: ['Roboto:100,300,400,500,700,900&display=swap'],
    },
    custom: {
      families: [
        'Material Design Icons',
        'Font Awesome 5',
      ],
      urls: [
        'https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css',
        'https://use.fontawesome.com/releases/v5.0.8/css/all.css',
      ],
    },
  })
}
