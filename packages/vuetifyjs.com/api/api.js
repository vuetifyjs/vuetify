/*
 * THIS FILE HAS BEEN AUTOMATICALLY GENERATED USING THE VUETIFY-HELPER-JSON TOOL.
 *
 * CHANGES MADE TO THIS FILE WILL BE LOST!
 */

module.exports = {
  "v-app": {
    "props": [
      {
        "name": "dark",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "id",
        "type": "String",
        "default": "app",
        "source": null
      }
    ],
    "mixins": [],
    "slots": [
      "default"
    ]
  },
  "v-alert": {
    "props": [
      {
        "name": "color",
        "type": "String",
        "default": "undefined",
        "source": "colorable"
      },
      {
        "name": "dismissible",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "icon",
        "type": "String",
        "default": "undefined",
        "source": null
      },
      {
        "name": "mode",
        "type": "String",
        "default": "undefined",
        "source": "transitionable"
      },
      {
        "name": "origin",
        "type": "String",
        "default": "undefined",
        "source": "transitionable"
      },
      {
        "name": "outline",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "transition",
        "type": "String",
        "default": "undefined",
        "source": "transitionable"
      },
      {
        "name": "type",
        "type": "String",
        "default": "undefined",
        "source": null
      },
      {
        "name": "value",
        "type": "Any",
        "default": "undefined",
        "source": "toggleable"
      }
    ],
    "mixins": [
      "colorable",
      "toggleable",
      "transitionable"
    ],
    "slots": [
      "default"
    ],
    "events": [
      {
        "name": "input",
        "value": "boolean"
      }
    ]
  },
  "v-avatar": {
    "props": [
      {
        "name": "color",
        "type": "String",
        "default": "undefined",
        "source": "colorable"
      },
      {
        "name": "size",
        "type": [
          "Number",
          "String"
        ],
        "default": 48,
        "source": null
      },
      {
        "name": "tile",
        "type": "Boolean",
        "default": "false",
        "source": null
      }
    ],
    "mixins": [
      "colorable"
    ],
    "slots": [
      "default"
    ]
  },
  "v-badge": {
    "props": [
      {
        "name": "bottom",
        "type": "Boolean",
        "default": "false",
        "source": "positionable"
      },
      {
        "name": "color",
        "type": "String",
        "default": "primary",
        "source": "colorable"
      },
      {
        "name": "left",
        "type": "Boolean",
        "default": "false",
        "source": "positionable"
      },
      {
        "name": "mode",
        "type": "String",
        "default": "undefined",
        "source": "transitionable"
      },
      {
        "name": "origin",
        "type": "String",
        "default": "undefined",
        "source": "transitionable"
      },
      {
        "name": "overlap",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "transition",
        "type": "String",
        "default": "fab-transition",
        "source": "transitionable"
      },
      {
        "name": "value",
        "type": "Any",
        "default": true,
        "source": "toggleable"
      }
    ],
    "mixins": [
      "colorable",
      "positionable",
      "toggleable",
      "transitionable"
    ],
    "slots": [
      "badge",
      "default"
    ]
  },
  "v-bottom-nav": {
    "props": [
      {
        "name": "absolute",
        "type": "Boolean",
        "default": "false",
        "source": "positionable"
      },
      {
        "name": "active",
        "type": [
          "Number",
          "String"
        ],
        "default": "undefined",
        "source": null,
        "sync": true
      },
      {
        "name": "app",
        "type": "Boolean",
        "default": "false",
        "source": "applicationable"
      },
      {
        "name": "color",
        "type": "String",
        "default": "undefined",
        "source": "colorable"
      },
      {
        "name": "fixed",
        "type": "Boolean",
        "default": "false",
        "source": "positionable"
      },
      {
        "name": "height",
        "type": [
          "Number",
          "String"
        ],
        "default": 56,
        "source": null
      },
      {
        "name": "shift",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "value",
        "type": "Any",
        "default": "undefined",
        "source": null
      }
    ],
    "mixins": [
      "applicationable",
      "button-group",
      "colorable",
      "positionable",
      "registrable-provide"
    ],
    "slots": [
      "default"
    ],
    "events": [
      {
        "name": "input",
        "value": "boolean"
      },
      {
        "name": "update:active",
        "value": "string | number"
      }
    ]
  },
  "v-bottom-sheet": {
    "props": [
      {
        "name": "disabled",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "fullWidth",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "hideOverlay",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "inset",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "lazy",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "maxWidth",
        "type": [
          "String",
          "Number"
        ],
        "default": "auto",
        "source": null
      },
      {
        "name": "persistent",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "value",
        "type": "Any",
        "default": "undefined",
        "source": null
      }
    ],
    "mixins": [],
    "slots": [
      "activator",
      "default"
    ]
  },
  "v-breadcrumbs": {
    "props": [
      {
        "name": "divider",
        "type": "String",
        "default": "/",
        "source": null
      },
      {
        "name": "justifyCenter",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "justifyEnd",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "large",
        "type": "Boolean",
        "default": "false",
        "source": null
      }
    ],
    "mixins": [],
    "slots": [
      "default"
    ]
  },
  "v-breadcrumbs-item": {
    "props": [
      {
        "name": "to",
        "type": [
          "String",
          "Object"
        ],
        "default": "undefined",
        "source": "routable"
      },
      {
        "name": "activeClass",
        "type": "String",
        "default": "breadcrumbs__item--disabled",
        "source": "routable"
      },
      {
        "name": "append",
        "type": "Boolean",
        "default": "false",
        "source": "routable"
      },
      {
        "name": "disabled",
        "type": "Boolean",
        "default": "false",
        "source": "routable"
      },
      {
        "name": "exact",
        "type": "Boolean",
        "default": "false",
        "source": "routable"
      },
      {
        "name": "exactActiveClass",
        "type": "String",
        "default": "undefined",
        "source": "routable"
      },
      {
        "name": "href",
        "type": [
          "String",
          "Object"
        ],
        "default": "undefined",
        "source": "routable"
      },
      {
        "name": "nuxt",
        "type": "Boolean",
        "default": "false",
        "source": "routable"
      },
      {
        "name": "replace",
        "type": "Boolean",
        "default": "false",
        "source": "routable"
      },
      {
        "name": "ripple",
        "type": [
          "Boolean",
          "Object"
        ],
        "default": "undefined",
        "source": "routable"
      },
      {
        "name": "tag",
        "type": "String",
        "default": "undefined",
        "source": "routable"
      },
      {
        "name": "target",
        "type": "String",
        "default": "undefined",
        "source": "routable"
      }
    ],
    "mixins": [
      "routable"
    ],
    "slots": [
      "default"
    ]
  },
  "v-btn": {
    "props": [
      {
        "name": "right",
        "type": "Boolean",
        "default": "false",
        "source": "positionable"
      },
      {
        "name": "color",
        "type": "String",
        "default": "undefined",
        "source": "colorable"
      },
      {
        "name": "append",
        "type": "Boolean",
        "default": "false",
        "source": "routable"
      },
      {
        "name": "block",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "activeClass",
        "type": "String",
        "default": "btn--active",
        "source": "routable"
      },
      {
        "name": "bottom",
        "type": "Boolean",
        "default": "false",
        "source": "positionable"
      },
      {
        "name": "absolute",
        "type": "Boolean",
        "default": "false",
        "source": "positionable"
      },
      {
        "name": "light",
        "type": "Boolean",
        "default": "false",
        "source": "themeable"
      },
      {
        "name": "to",
        "type": [
          "String",
          "Object"
        ],
        "default": "undefined",
        "source": "routable"
      },
      {
        "name": "replace",
        "type": "Boolean",
        "default": "false",
        "source": "routable"
      },
      {
        "name": "ripple",
        "type": [
          "Boolean",
          "Object"
        ],
        "default": true,
        "source": "routable"
      },
      {
        "name": "tag",
        "type": "String",
        "default": "button",
        "source": "routable"
      },
      {
        "name": "target",
        "type": "String",
        "default": "undefined",
        "source": "routable"
      },
      {
        "name": "href",
        "type": [
          "String",
          "Object"
        ],
        "default": "undefined",
        "source": "routable"
      },
      {
        "name": "exactActiveClass",
        "type": "String",
        "default": "undefined",
        "source": "routable"
      },
      {
        "name": "fixed",
        "type": "Boolean",
        "default": "false",
        "source": "positionable"
      },
      {
        "name": "left",
        "type": "Boolean",
        "default": "false",
        "source": "positionable"
      },
      {
        "name": "exact",
        "type": "Boolean",
        "default": "false",
        "source": "routable"
      },
      {
        "name": "small",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "dark",
        "type": "Boolean",
        "default": "false",
        "source": "themeable"
      },
      {
        "name": "nuxt",
        "type": "Boolean",
        "default": "false",
        "source": "routable"
      },
      {
        "name": "inputValue",
        "type": "Any",
        "default": "undefined",
        "source": "toggleable"
      },
      {
        "name": "disabled",
        "type": "Boolean",
        "default": "false",
        "source": "routable"
      },
      {
        "name": "depressed",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "fab",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "flat",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "icon",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "large",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "loading",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "outline",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "round",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "top",
        "type": "Boolean",
        "default": "false",
        "source": "positionable"
      },
      {
        "name": "type",
        "type": "String",
        "default": "button",
        "source": null
      },
      {
        "name": "value",
        "type": "Any",
        "default": "undefined",
        "source": null
      }
    ],
    "mixins": [
      "colorable",
      "positionable",
      "registrable-inject",
      "routable",
      "themeable",
      "toggleable"
    ],
    "slots": [
      "default"
    ]
  },
  "v-btn-toggle": {
    "props": [
      {
        "name": "dark",
        "type": "Boolean",
        "default": "false",
        "source": "themeable"
      },
      {
        "name": "inputValue",
        "type": "Any",
        "default": "undefined",
        "source": null
      },
      {
        "name": "light",
        "type": "Boolean",
        "default": "false",
        "source": "themeable"
      },
      {
        "name": "mandatory",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "multiple",
        "type": "Boolean",
        "default": "false",
        "source": null
      }
    ],
    "mixins": [
      "button-group",
      "registrable-provide",
      "themeable"
    ],
    "slots": [
      "default"
    ],
    "events": [
      {
        "name": "change",
        "value": "any[] | any"
      }
    ]
  },
  "v-card": {
    "props": [
      {
        "name": "tag",
        "type": "String",
        "default": "div",
        "source": "routable"
      },
      {
        "name": "color",
        "type": "String",
        "default": "undefined",
        "source": "colorable"
      },
      {
        "name": "append",
        "type": "Boolean",
        "default": "false",
        "source": "routable"
      },
      {
        "name": "activeClass",
        "type": "String",
        "default": "undefined",
        "source": "routable"
      },
      {
        "name": "dark",
        "type": "Boolean",
        "default": "false",
        "source": "themeable"
      },
      {
        "name": "exact",
        "type": "Boolean",
        "default": "false",
        "source": "routable"
      },
      {
        "name": "disabled",
        "type": "Boolean",
        "default": "false",
        "source": "routable"
      },
      {
        "name": "light",
        "type": "Boolean",
        "default": "false",
        "source": "themeable"
      },
      {
        "name": "to",
        "type": [
          "String",
          "Object"
        ],
        "default": "undefined",
        "source": "routable"
      },
      {
        "name": "replace",
        "type": "Boolean",
        "default": "false",
        "source": "routable"
      },
      {
        "name": "ripple",
        "type": [
          "Boolean",
          "Object"
        ],
        "default": "undefined",
        "source": "routable"
      },
      {
        "name": "href",
        "type": [
          "String",
          "Object"
        ],
        "default": "undefined",
        "source": "routable"
      },
      {
        "name": "target",
        "type": "String",
        "default": "undefined",
        "source": "routable"
      },
      {
        "name": "exactActiveClass",
        "type": "String",
        "default": "undefined",
        "source": "routable"
      },
      {
        "name": "nuxt",
        "type": "Boolean",
        "default": "false",
        "source": "routable"
      },
      {
        "name": "flat",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "height",
        "type": "String",
        "default": "auto",
        "source": null
      },
      {
        "name": "hover",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "img",
        "type": "String",
        "default": "undefined",
        "source": null
      },
      {
        "name": "raised",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "tile",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "width",
        "type": [
          "String",
          "Number"
        ],
        "default": "undefined",
        "source": null
      }
    ],
    "mixins": [
      "colorable",
      "routable",
      "themeable"
    ],
    "slots": [
      "default"
    ]
  },
  "v-card-media": {
    "props": [
      {
        "name": "contain",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "height",
        "type": [
          "Number",
          "String"
        ],
        "default": "auto",
        "source": null
      },
      {
        "name": "src",
        "type": "String",
        "default": "undefined",
        "source": null
      }
    ],
    "mixins": []
  },
  "v-card-title": {
    "props": [
      {
        "name": "primaryTitle",
        "type": "Boolean",
        "default": "false",
        "source": null
      }
    ],
    "mixins": []
  },
  "v-card-actions": {
    "props": [],
    "mixins": []
  },
  "v-card-text": {
    "props": [],
    "mixins": []
  },
  "v-carousel": {
    "props": [
      {
        "name": "hideControls",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "lazy",
        "type": "Boolean",
        "default": "false",
        "source": "bootable"
      },
      {
        "name": "interval",
        "type": [
          "Number",
          "String"
        ],
        "default": 6000,
        "source": null
      },
      {
        "name": "cycle",
        "type": "Boolean",
        "default": "true",
        "source": null
      },
      {
        "name": "delimiterIcon",
        "type": "String",
        "default": "fiber_manual_record",
        "source": null
      },
      {
        "name": "dark",
        "type": "Boolean",
        "default": "false",
        "source": "themeable"
      },
      {
        "name": "hideDelimiters",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "light",
        "type": "Boolean",
        "default": "false",
        "source": "themeable"
      },
      {
        "name": "nextIcon",
        "type": [
          "Boolean",
          "String"
        ],
        "default": "chevron_right",
        "source": null
      },
      {
        "name": "prevIcon",
        "type": [
          "Boolean",
          "String"
        ],
        "default": "chevron_left",
        "source": null
      },
      {
        "name": "value",
        "type": "Number",
        "default": "undefined",
        "source": null
      }
    ],
    "mixins": [
      "bootable",
      "registrable-provide",
      "themeable"
    ],
    "slots": [
      "default"
    ],
    "events": [
      {
        "name": "input",
        "value": "number"
      }
    ]
  },
  "v-carousel-item": {
    "props": [
      {
        "name": "reverseTransition",
        "type": "String",
        "default": "tab-reverse-transition",
        "source": null
      },
      {
        "name": "transition",
        "type": "String",
        "default": "tab-transition",
        "source": null
      }
    ],
    "mixins": [
      "registrable-inject"
    ],
    "slots": [
      "default"
    ]
  },
  "v-checkbox": {
    "props": [
      {
        "name": "persistentHint",
        "type": "Boolean",
        "default": "false",
        "source": "input"
      },
      {
        "name": "indeterminate",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "dark",
        "type": "Boolean",
        "default": "false",
        "source": "themeable"
      },
      {
        "name": "falseValue",
        "type": "Any",
        "default": "undefined",
        "source": "selectable"
      },
      {
        "name": "error",
        "type": "Boolean",
        "default": "false",
        "source": "validatable"
      },
      {
        "name": "errorMessages",
        "type": [
          "String",
          "Array"
        ],
        "default": [],
        "source": "validatable"
      },
      {
        "name": "id",
        "type": "String",
        "default": "undefined",
        "source": "selectable"
      },
      {
        "name": "color",
        "type": "String",
        "default": "undefined",
        "source": "colorable"
      },
      {
        "name": "appendIcon",
        "type": "String",
        "default": "undefined",
        "source": "input"
      },
      {
        "name": "appendIconCb",
        "type": "Function",
        "default": "null",
        "source": "input"
      },
      {
        "name": "disabled",
        "type": "Boolean",
        "default": "false",
        "source": "input"
      },
      {
        "name": "hint",
        "type": "String",
        "default": "undefined",
        "source": "input"
      },
      {
        "name": "hideDetails",
        "type": "Boolean",
        "default": "false",
        "source": "input"
      },
      {
        "name": "toggleKeys",
        "type": "Array",
        "default": [
          13,
          32
        ],
        "source": "input"
      },
      {
        "name": "label",
        "type": "String",
        "default": "undefined",
        "source": "input"
      },
      {
        "name": "inputValue",
        "type": "Any",
        "default": "undefined",
        "source": "selectable"
      },
      {
        "name": "value",
        "type": "Any",
        "default": "undefined",
        "source": "input"
      },
      {
        "name": "prependIcon",
        "type": "String",
        "default": "undefined",
        "source": "input"
      },
      {
        "name": "light",
        "type": "Boolean",
        "default": "false",
        "source": "themeable"
      },
      {
        "name": "placeholder",
        "type": "String",
        "default": "undefined",
        "source": "input"
      },
      {
        "name": "loading",
        "type": [
          "Boolean",
          "String"
        ],
        "default": false,
        "source": "loadable"
      },
      {
        "name": "prependIconCb",
        "type": "Function",
        "default": "null",
        "source": "input"
      },
      {
        "name": "readonly",
        "type": "Boolean",
        "default": "false",
        "source": "input"
      },
      {
        "name": "required",
        "type": "Boolean",
        "default": "false",
        "source": "input"
      },
      {
        "name": "ripple",
        "type": [
          "Boolean",
          "Object"
        ],
        "default": true,
        "source": "rippleable"
      },
      {
        "name": "rules",
        "type": "Array",
        "default": [],
        "source": "validatable"
      },
      {
        "name": "tabindex",
        "type": "Any",
        "default": 0,
        "source": "input"
      },
      {
        "name": "trueValue",
        "type": "Any",
        "default": "undefined",
        "source": "selectable"
      },
      {
        "name": "validateOnBlur",
        "type": "Boolean",
        "default": "false",
        "source": "validatable"
      }
    ],
    "mixins": [
      "colorable",
      "input",
      "loadable",
      "rippleable",
      "selectable",
      "themeable",
      "validatable"
    ],
    "slots": [
      "label"
    ],
    "events": [
      {
        "name": "blur",
        "value": "any"
      }
    ]
  },
  "v-chip": {
    "props": [
      {
        "name": "disabled",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "color",
        "type": "String",
        "default": "undefined",
        "source": "colorable"
      },
      {
        "name": "close",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "dark",
        "type": "Boolean",
        "default": "false",
        "source": "themeable"
      },
      {
        "name": "label",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "light",
        "type": "Boolean",
        "default": "false",
        "source": "themeable"
      },
      {
        "name": "outline",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "selected",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "small",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "textColor",
        "type": "String",
        "default": "undefined",
        "source": null
      },
      {
        "name": "value",
        "type": "Boolean",
        "default": "true",
        "source": "toggleable"
      }
    ],
    "mixins": [
      "colorable",
      "themeable",
      "toggleable"
    ],
    "slots": [
      "default"
    ],
    "events": [
      {
        "name": "input",
        "value": "boolean"
      }
    ]
  },
  "v-data-iterator": {
    "props": [
      {
        "name": "selectAll",
        "type": [
          "Boolean",
          "String"
        ],
        "default": "undefined",
        "source": "data-iterable"
      },
      {
        "name": "contentClass",
        "type": "String",
        "default": "undefined",
        "source": null
      },
      {
        "name": "search",
        "type": "Any",
        "default": "undefined",
        "source": "data-iterable"
      },
      {
        "name": "dark",
        "type": "Boolean",
        "default": "false",
        "source": "themeable"
      },
      {
        "name": "contentProps",
        "type": "Object",
        "default": "undefined",
        "source": null
      },
      {
        "name": "contentTag",
        "type": "String",
        "default": "div",
        "source": null
      },
      {
        "name": "customSort",
        "type": "Function",
        "default": "(items: object[], index: number, isDescending: boolean): object[]",
        "source": "data-iterable"
      },
      {
        "name": "customFilter",
        "type": "Function",
        "default": "(items: object[], search: string, filter: Filter): object[]",
        "source": "data-iterable"
      },
      {
        "name": "disableInitialSort",
        "type": "Boolean",
        "default": "false",
        "source": "data-iterable"
      },
      {
        "name": "noDataText",
        "type": "String",
        "default": "No data available",
        "source": "filterable"
      },
      {
        "name": "expand",
        "type": "Boolean",
        "default": "false",
        "source": "data-iterable"
      },
      {
        "name": "hideActions",
        "type": "Boolean",
        "default": "false",
        "source": "data-iterable"
      },
      {
        "name": "itemKey",
        "type": "String",
        "default": "id",
        "source": "data-iterable"
      },
      {
        "name": "loading",
        "type": [
          "Boolean",
          "String"
        ],
        "default": false,
        "source": "loadable"
      },
      {
        "name": "light",
        "type": "Boolean",
        "default": "false",
        "source": "themeable"
      },
      {
        "name": "filter",
        "type": "Function",
        "default": "(val: object, search: string): boolean",
        "source": "data-iterable"
      },
      {
        "name": "mustSort",
        "type": "Boolean",
        "default": "false",
        "source": "data-iterable"
      },
      {
        "name": "nextIcon",
        "type": "String",
        "default": "chevron_right",
        "source": "data-iterable"
      },
      {
        "name": "items",
        "type": "Array",
        "default": [],
        "source": "data-iterable"
      },
      {
        "name": "noResultsText",
        "type": "String",
        "default": "No matching records found",
        "source": "data-iterable"
      },
      {
        "name": "pagination",
        "type": "Object",
        "source": "data-iterable",
        "sync": true
      },
      {
        "name": "prevIcon",
        "type": "String",
        "default": "chevron_left",
        "source": "data-iterable"
      },
      {
        "name": "rowsPerPageItems",
        "type": "Array",
        "default": [
          5,
          10,
          25,
          {
            "text": "All",
            "value": -1
          }
        ],
        "source": "data-iterable"
      },
      {
        "name": "rowsPerPageText",
        "type": "String",
        "default": "Items per page:",
        "source": "data-iterable"
      },
      {
        "name": "totalItems",
        "type": "Number",
        "default": "undefined",
        "source": "data-iterable"
      },
      {
        "name": "value",
        "type": "Array",
        "default": [],
        "source": "data-iterable"
      }
    ],
    "mixins": [
      "data-iterable",
      "filterable",
      "loadable",
      "themeable"
    ],
    "slots": [
      {
        "name": "footer",
        "source": "data-iterable"
      },
      {
        "name": "noData",
        "source": "data-iterable"
      },
      {
        "name": "noResults",
        "source": "data-iterable"
      }
    ],
    "scopedSlots": [
      {
        "name": "items",
        "props": {
          "item": "object",
          "index": "number",
          "selected": "boolean",
          "expanded": "boolean"
        },
        "source": "data-iterable"
      },
      {
        "name": "pageText",
        "props": {
          "pageStart": "number",
          "pageStop": "number",
          "itemsLength": "number"
        },
        "source": "data-iterable"
      }
    ],
    "events": [
      {
        "name": "update:pagination",
        "value": "object"
      },
      {
        "name": "input",
        "value": "object[]"
      }
    ]
  },
  "v-data-table": {
    "props": [
      {
        "name": "selectAll",
        "type": [
          "Boolean",
          "String"
        ],
        "default": "undefined",
        "source": "data-iterable"
      },
      {
        "name": "hideHeaders",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "dark",
        "type": "Boolean",
        "default": "false",
        "source": "themeable"
      },
      {
        "name": "headerText",
        "type": "String",
        "default": "text",
        "source": null
      },
      {
        "name": "expand",
        "type": "Boolean",
        "default": "false",
        "source": "data-iterable"
      },
      {
        "name": "hideActions",
        "type": "Boolean",
        "default": "false",
        "source": "data-iterable"
      },
      {
        "name": "disableInitialSort",
        "type": "Boolean",
        "default": "false",
        "source": "data-iterable"
      },
      {
        "name": "headers",
        "type": "Array",
        "default": [],
        "source": null,
        "example": {
          "text": "string",
          "value": "string",
          "align": "'left' | 'center' | 'right'",
          "sortable": "boolean",
          "class": "string[] | string",
          "width": "string"
        }
      },
      {
        "name": "customSort",
        "type": "Function",
        "default": "(items: object[], index: number, isDescending: boolean): object[]",
        "source": "data-iterable"
      },
      {
        "name": "customFilter",
        "type": "Function",
        "default": "(items: object[], search: string, filter: Filter): object[]",
        "source": "data-iterable"
      },
      {
        "name": "filter",
        "type": "Function",
        "default": "(val: object, search: string): boolean",
        "source": "data-iterable"
      },
      {
        "name": "items",
        "type": "Array",
        "default": [],
        "source": "data-iterable"
      },
      {
        "name": "noDataText",
        "type": "String",
        "default": "No data available",
        "source": "filterable"
      },
      {
        "name": "loading",
        "type": [
          "Boolean",
          "String"
        ],
        "default": false,
        "source": "loadable"
      },
      {
        "name": "light",
        "type": "Boolean",
        "default": "false",
        "source": "themeable"
      },
      {
        "name": "mustSort",
        "type": "Boolean",
        "default": "false",
        "source": "data-iterable"
      },
      {
        "name": "nextIcon",
        "type": "String",
        "default": "chevron_right",
        "source": "data-iterable"
      },
      {
        "name": "itemKey",
        "type": "String",
        "default": "id",
        "source": "data-iterable"
      },
      {
        "name": "noResultsText",
        "type": "String",
        "default": "No matching records found",
        "source": "data-iterable"
      },
      {
        "name": "pagination",
        "type": "Object",
        "source": "data-iterable",
        "sync": true
      },
      {
        "name": "prevIcon",
        "type": "String",
        "default": "chevron_left",
        "source": "data-iterable"
      },
      {
        "name": "rowsPerPageItems",
        "type": "Array",
        "default": [
          5,
          10,
          25,
          {
            "text": "All",
            "value": -1
          }
        ],
        "source": "data-iterable"
      },
      {
        "name": "rowsPerPageText",
        "type": "String",
        "default": "Rows per page:",
        "source": "data-iterable"
      },
      {
        "name": "search",
        "type": "Any",
        "default": "undefined",
        "source": "data-iterable"
      },
      {
        "name": "sortIcon",
        "type": "String",
        "default": "arrow_upward",
        "source": null
      },
      {
        "name": "totalItems",
        "type": "Number",
        "default": "undefined",
        "source": "data-iterable"
      },
      {
        "name": "value",
        "type": "Array",
        "default": [],
        "source": "data-iterable"
      }
    ],
    "mixins": [
      "data-iterable",
      "filterable",
      "loadable",
      "themeable"
    ],
    "slots": [
      {
        "name": "footer",
        "source": "data-iterable"
      },
      {
        "name": "noData",
        "source": "data-iterable"
      },
      {
        "name": "noResults",
        "source": "data-iterable"
      }
    ],
    "scopedSlots": [
      {
        "name": "headerCell",
        "props": {
          "header": "object"
        }
      },
      {
        "name": "headers",
        "props": {
          "headers": "object[]",
          "indeterminate": "boolean",
          "all": "boolean"
        }
      },
      {
        "name": "items",
        "props": {
          "item": "object",
          "index": "number",
          "selected": "boolean",
          "expanded": "boolean"
        },
        "source": "data-iterable"
      },
      {
        "name": "pageText",
        "props": {
          "pageStart": "number",
          "pageStop": "number",
          "itemsLength": "number"
        },
        "source": "data-iterable"
      }
    ],
    "events": [
      {
        "name": "update:pagination",
        "value": "object"
      },
      {
        "name": "input",
        "value": "object[]"
      }
    ]
  },
  "v-edit-dialog": {
    "props": [
      {
        "name": "cancelText",
        "type": "Any",
        "default": "Cancel",
        "source": null
      },
      {
        "name": "large",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "lazy",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "persistent",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "returnValue",
        "type": "Any",
        "default": "undefined",
        "source": "returnable"
      },
      {
        "name": "saveText",
        "type": "Any",
        "default": "Save",
        "source": null
      },
      {
        "name": "transition",
        "type": "String",
        "default": "slide-x-reverse-transition",
        "source": null
      }
    ],
    "mixins": [
      "returnable"
    ],
    "slots": [
      "default",
      "input"
    ]
  },
  "v-table-overflow": {
    "props": [],
    "mixins": []
  },
  "v-date-picker": {
    "props": [
      {
        "name": "max",
        "type": "String",
        "default": "undefined",
        "source": null
      },
      {
        "name": "color",
        "type": "String",
        "default": "undefined",
        "source": "colorable"
      },
      {
        "name": "allowedDates",
        "type": "Function",
        "default": "null",
        "source": null
      },
      {
        "name": "min",
        "type": "String",
        "default": "undefined",
        "source": null
      },
      {
        "name": "fullWidth",
        "type": "Boolean",
        "default": "false",
        "source": "picker"
      },
      {
        "name": "dark",
        "type": "Boolean",
        "default": "false",
        "source": "themeable"
      },
      {
        "name": "firstDayOfWeek",
        "type": [
          "String",
          "Number"
        ],
        "default": 0,
        "source": null
      },
      {
        "name": "eventColor",
        "type": [
          "String",
          "Function",
          "Object"
        ],
        "default": "warning",
        "source": null
      },
      {
        "name": "events",
        "type": [
          "Array",
          "Object",
          "Function"
        ],
        "default": null,
        "source": null
      },
      {
        "name": "dayFormat",
        "type": "Function",
        "default": "null",
        "source": null
      },
      {
        "name": "prevIcon",
        "type": "String",
        "default": "chevron_left",
        "source": null
      },
      {
        "name": "light",
        "type": "Boolean",
        "default": "false",
        "source": "themeable"
      },
      {
        "name": "headerColor",
        "type": "String",
        "default": "undefined",
        "source": "picker"
      },
      {
        "name": "headerDateFormat",
        "type": "Function",
        "default": "null",
        "source": null
      },
      {
        "name": "landscape",
        "type": "Boolean",
        "default": "false",
        "source": "picker"
      },
      {
        "name": "readonly",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "locale",
        "type": "String",
        "default": "en-us",
        "source": null
      },
      {
        "name": "scrollable",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "monthFormat",
        "type": "Function",
        "default": "null",
        "source": null
      },
      {
        "name": "showCurrent",
        "type": [
          "Boolean",
          "String"
        ],
        "default": true,
        "source": null
      },
      {
        "name": "pickerDate",
        "type": "String",
        "default": "undefined",
        "source": null
      },
      {
        "name": "nextIcon",
        "type": "String",
        "default": "chevron_right",
        "source": null
      },
      {
        "name": "noTitle",
        "type": "Boolean",
        "default": "false",
        "source": "picker"
      },
      {
        "name": "reactive",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "titleDateFormat",
        "type": "Function",
        "default": "null",
        "source": null
      },
      {
        "name": "type",
        "type": "String",
        "default": "date",
        "source": null
      },
      {
        "name": "value",
        "type": "String",
        "default": "undefined",
        "source": null
      },
      {
        "name": "width",
        "type": [
          "Number",
          "String"
        ],
        "default": 290,
        "source": "picker"
      },
      {
        "name": "yearFormat",
        "type": "Function",
        "default": "null",
        "source": null
      },
      {
        "name": "yearIcon",
        "type": "String",
        "default": "undefined",
        "source": null
      }
    ],
    "mixins": [
      "colorable",
      "picker",
      "themeable"
    ],
    "events": [
      {
        "name": "input",
        "value": "string"
      }
    ]
  },
  "v-date-picker-title": {
    "props": [
      {
        "name": "date",
        "type": "String",
        "default": "undefined",
        "source": null
      },
      {
        "name": "selectingYear",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "value",
        "type": "String",
        "default": "undefined",
        "source": null
      },
      {
        "name": "year",
        "type": [
          "Number",
          "String"
        ],
        "default": "undefined",
        "source": null
      },
      {
        "name": "yearIcon",
        "type": "String",
        "default": "undefined",
        "source": null
      }
    ],
    "mixins": []
  },
  "v-date-picker-header": {
    "props": [
      {
        "name": "color",
        "type": "String",
        "default": "undefined",
        "source": "colorable"
      },
      {
        "name": "disabled",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "format",
        "type": "Function",
        "default": "null",
        "source": null
      },
      {
        "name": "locale",
        "type": "String",
        "default": "en-us",
        "source": null
      },
      {
        "name": "max",
        "type": "String",
        "default": "undefined",
        "source": null
      },
      {
        "name": "min",
        "type": "String",
        "default": "undefined",
        "source": null
      },
      {
        "name": "nextIcon",
        "type": "String",
        "default": "chevron_right",
        "source": null
      },
      {
        "name": "prevIcon",
        "type": "String",
        "default": "chevron_left",
        "source": null
      },
      {
        "name": "value",
        "type": [
          "Number",
          "String"
        ],
        "default": "undefined",
        "source": null
      }
    ],
    "mixins": [
      "colorable"
    ]
  },
  "v-date-picker-date-table": {
    "props": [
      {
        "name": "max",
        "type": "String",
        "default": "undefined",
        "source": null
      },
      {
        "name": "color",
        "type": "String",
        "default": "undefined",
        "source": "colorable"
      },
      {
        "name": "allowedDates",
        "type": "Function",
        "default": "null",
        "source": null
      },
      {
        "name": "tableDate",
        "type": "String",
        "default": "undefined",
        "source": null
      },
      {
        "name": "disabled",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "current",
        "type": "String",
        "default": "undefined",
        "source": null
      },
      {
        "name": "eventColor",
        "type": [
          "String",
          "Function",
          "Object"
        ],
        "default": "warning",
        "source": null
      },
      {
        "name": "events",
        "type": [
          "Array",
          "Object",
          "Function"
        ],
        "default": null,
        "source": null
      },
      {
        "name": "firstDayOfWeek",
        "type": [
          "String",
          "Number"
        ],
        "default": 0,
        "source": null
      },
      {
        "name": "format",
        "type": "Function",
        "default": "null",
        "source": null
      },
      {
        "name": "locale",
        "type": "String",
        "default": "en-us",
        "source": null
      },
      {
        "name": "min",
        "type": "String",
        "default": "undefined",
        "source": null
      },
      {
        "name": "scrollable",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "value",
        "type": "String",
        "default": "undefined",
        "source": null
      },
      {
        "name": "weekdayFormat",
        "type": "Function",
        "default": "null",
        "source": null
      }
    ],
    "mixins": [
      "colorable"
    ]
  },
  "v-date-picker-month-table": {
    "props": [
      {
        "name": "locale",
        "type": "String",
        "default": "en-us",
        "source": null
      },
      {
        "name": "color",
        "type": "String",
        "default": "undefined",
        "source": "colorable"
      },
      {
        "name": "allowedDates",
        "type": "Function",
        "default": "null",
        "source": null
      },
      {
        "name": "current",
        "type": "String",
        "default": "undefined",
        "source": null
      },
      {
        "name": "disabled",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "format",
        "type": "Function",
        "default": "null",
        "source": null
      },
      {
        "name": "max",
        "type": "String",
        "default": "undefined",
        "source": null
      },
      {
        "name": "min",
        "type": "String",
        "default": "undefined",
        "source": null
      },
      {
        "name": "scrollable",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "tableDate",
        "type": "String",
        "default": "undefined",
        "source": null
      },
      {
        "name": "value",
        "type": "String",
        "default": "undefined",
        "source": null
      }
    ],
    "mixins": [
      "colorable"
    ]
  },
  "v-date-picker-years": {
    "props": [
      {
        "name": "color",
        "type": "String",
        "default": "undefined",
        "source": "colorable"
      },
      {
        "name": "format",
        "type": "Function",
        "default": "null",
        "source": null
      },
      {
        "name": "locale",
        "type": "String",
        "default": "en-us",
        "source": null
      },
      {
        "name": "max",
        "type": [
          "Number",
          "String"
        ],
        "default": "undefined",
        "source": null
      },
      {
        "name": "min",
        "type": [
          "Number",
          "String"
        ],
        "default": "undefined",
        "source": null
      },
      {
        "name": "value",
        "type": [
          "Number",
          "String"
        ],
        "default": "undefined",
        "source": null
      }
    ],
    "mixins": [
      "colorable"
    ]
  },
  "v-dialog": {
    "props": [
      {
        "name": "persistent",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "lazy",
        "type": "Boolean",
        "default": "false",
        "source": "bootable"
      },
      {
        "name": "contentClass",
        "type": "Any",
        "default": "undefined",
        "source": "detachable"
      },
      {
        "name": "hideOverlay",
        "type": "Boolean",
        "default": "false",
        "source": "overlayable"
      },
      {
        "name": "fullWidth",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "fullscreen",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "disabled",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "attach",
        "type": [
          "Boolean",
          "String",
          "Object"
        ],
        "default": false,
        "source": "detachable"
      },
      {
        "name": "maxWidth",
        "type": [
          "String",
          "Number"
        ],
        "default": "none",
        "source": null
      },
      {
        "name": "origin",
        "type": "String",
        "default": "center center",
        "source": null
      },
      {
        "name": "returnValue",
        "type": "Any",
        "default": "undefined",
        "source": "returnable"
      },
      {
        "name": "scrollable",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "transition",
        "type": [
          "String",
          "Boolean"
        ],
        "default": "dialog-transition",
        "source": null
      },
      {
        "name": "value",
        "type": "Any",
        "default": "undefined",
        "source": "toggleable"
      },
      {
        "name": "width",
        "type": [
          "String",
          "Number"
        ],
        "default": "auto",
        "source": null
      }
    ],
    "mixins": [
      "bootable",
      "dependent",
      "detachable",
      "overlayable",
      "returnable",
      "stackable",
      "toggleable"
    ],
    "slots": [
      "activator",
      "default"
    ]
  },
  "v-divider": {
    "props": [
      {
        "name": "dark",
        "type": "Boolean",
        "default": "false",
        "source": "themeable"
      },
      {
        "name": "inset",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "light",
        "type": "Boolean",
        "default": "false",
        "source": "themeable"
      }
    ],
    "mixins": [
      "themeable"
    ]
  },
  "v-expansion-panel": {
    "props": [
      {
        "name": "dark",
        "type": "Boolean",
        "default": "false",
        "source": "themeable"
      },
      {
        "name": "expand",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "focusable",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "inset",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "light",
        "type": "Boolean",
        "default": "false",
        "source": "themeable"
      },
      {
        "name": "popout",
        "type": "Boolean",
        "default": "false",
        "source": null
      }
    ],
    "mixins": [
      "registrable-provide",
      "themeable"
    ],
    "slots": [
      "default"
    ]
  },
  "v-expansion-panel-content": {
    "props": [
      {
        "name": "expandIcon",
        "type": "String",
        "default": "keyboard_arrow_down",
        "source": null
      },
      {
        "name": "hideActions",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "lazy",
        "type": "Boolean",
        "default": "false",
        "source": "bootable"
      },
      {
        "name": "ripple",
        "type": [
          "Boolean",
          "Object"
        ],
        "default": false,
        "source": "rippleable"
      },
      {
        "name": "value",
        "type": "Any",
        "default": "undefined",
        "source": "toggleable"
      }
    ],
    "mixins": [
      "bootable",
      "registrable-inject",
      "rippleable",
      "toggleable"
    ],
    "slots": [
      "actions",
      "default",
      "header"
    ]
  },
  "v-footer": {
    "props": [
      {
        "name": "absolute",
        "type": "Boolean",
        "default": "false",
        "source": "positionable"
      },
      {
        "name": "app",
        "type": "Boolean",
        "default": "false",
        "source": "applicationable"
      },
      {
        "name": "color",
        "type": "String",
        "default": "undefined",
        "source": "colorable"
      },
      {
        "name": "dark",
        "type": "Boolean",
        "default": "false",
        "source": "themeable"
      },
      {
        "name": "fixed",
        "type": "Boolean",
        "default": "false",
        "source": "positionable"
      },
      {
        "name": "height",
        "type": [
          "Number",
          "String"
        ],
        "default": 32,
        "source": null
      },
      {
        "name": "inset",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "light",
        "type": "Boolean",
        "default": "false",
        "source": "themeable"
      }
    ],
    "mixins": [
      "applicationable",
      "colorable",
      "positionable",
      "themeable"
    ],
    "slots": [
      "default"
    ]
  },
  "v-form": {
    "props": [
      {
        "name": "lazyValidation",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "value",
        "type": "Boolean",
        "default": "false",
        "source": null
      }
    ],
    "mixins": [],
    "slots": [
      "default"
    ],
    "functions": [
      {
        "name": "reset",
        "signature": "(): void"
      },
      {
        "name": "validate",
        "signature": "(): boolean"
      }
    ],
    "events": [
      {
        "name": "input",
        "value": "boolean"
      }
    ]
  },
  "v-content": {
    "props": [
      {
        "name": "tag",
        "type": "String",
        "default": "main",
        "source": null
      }
    ],
    "mixins": [
      "ssr-bootable"
    ]
  },
  "v-container": {
    "props": [
      {
        "name": "id",
        "type": "String",
        "default": "undefined",
        "source": null
      },
      {
        "name": "tag",
        "type": "String",
        "default": "div",
        "source": null
      },
      {
        "name": "grid-list-{xs through xl}",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "fluid",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "alignBaseline",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "alignCenter",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "alignContentCenter",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "alignContentEnd",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "alignContentSpaceAround",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "alignContentSpaceBetween",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "alignContentStart",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "alignEnd",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "alignStart",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "d-{type}",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "fillHeight",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "justifyCenter",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "justifyEnd",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "justifySpaceAround",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "justifySpaceBetween",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "justifyStart",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "reverse",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "wrap",
        "type": "Boolean",
        "default": "false",
        "source": null
      }
    ],
    "mixins": []
  },
  "v-flex": {
    "props": [
      {
        "name": "id",
        "type": "String",
        "default": "undefined",
        "source": null
      },
      {
        "name": "tag",
        "type": "String",
        "default": "div",
        "source": null
      },
      {
        "name": "offset-(size)(0-12)",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "order-(size)(0-12)",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "(size)(1-12)",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "alignBaseline",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "alignCenter",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "alignContentCenter",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "alignContentEnd",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "alignContentSpaceAround",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "alignContentSpaceBetween",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "alignContentStart",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "alignEnd",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "alignStart",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "d-{type}",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "fillHeight",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "justifyCenter",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "justifyEnd",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "justifySpaceAround",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "justifySpaceBetween",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "justifyStart",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "reverse",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "wrap",
        "type": "Boolean",
        "default": "false",
        "source": null
      }
    ],
    "mixins": []
  },
  "v-layout": {
    "props": [
      {
        "name": "id",
        "type": "String",
        "default": "undefined",
        "source": null
      },
      {
        "name": "tag",
        "type": "String",
        "default": "div",
        "source": null
      },
      {
        "name": "row",
        "type": "Boolean",
        "default": "true",
        "source": null
      },
      {
        "name": "column",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "alignBaseline",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "alignCenter",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "alignContentCenter",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "alignContentEnd",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "alignContentSpaceAround",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "alignContentSpaceBetween",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "alignContentStart",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "alignEnd",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "alignStart",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "d-{type}",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "fillHeight",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "justifyCenter",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "justifyEnd",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "justifySpaceAround",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "justifySpaceBetween",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "justifyStart",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "reverse",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "wrap",
        "type": "Boolean",
        "default": "false",
        "source": null
      }
    ],
    "mixins": []
  },
  "v-spacer": {
    "props": [],
    "mixins": []
  },
  "v-icon": {
    "props": [
      {
        "name": "left",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "color",
        "type": "String",
        "default": "undefined",
        "source": "colorable"
      },
      {
        "name": "dark",
        "type": "Boolean",
        "default": "false",
        "source": "themeable"
      },
      {
        "name": "disabled",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "large",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "light",
        "type": "Boolean",
        "default": "false",
        "source": "themeable"
      },
      {
        "name": "medium",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "right",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "size",
        "type": [
          "Number",
          "String"
        ],
        "default": "undefined",
        "source": null
      },
      {
        "name": "small",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "xLarge",
        "type": "Boolean",
        "default": "false",
        "source": null
      }
    ],
    "mixins": [
      "colorable",
      "themeable"
    ],
    "slots": [
      "default"
    ]
  },
  "v-jumbotron": {
    "props": [
      {
        "name": "replace",
        "type": "Boolean",
        "default": "false",
        "source": "routable"
      },
      {
        "name": "color",
        "type": "String",
        "default": "undefined",
        "source": "colorable"
      },
      {
        "name": "append",
        "type": "Boolean",
        "default": "false",
        "source": "routable"
      },
      {
        "name": "activeClass",
        "type": "String",
        "default": "undefined",
        "source": "routable"
      },
      {
        "name": "tag",
        "type": "String",
        "default": "div",
        "source": "routable"
      },
      {
        "name": "exact",
        "type": "Boolean",
        "default": "false",
        "source": "routable"
      },
      {
        "name": "dark",
        "type": "Boolean",
        "default": "false",
        "source": "themeable"
      },
      {
        "name": "disabled",
        "type": "Boolean",
        "default": "false",
        "source": "routable"
      },
      {
        "name": "exactActiveClass",
        "type": "String",
        "default": "undefined",
        "source": "routable"
      },
      {
        "name": "gradient",
        "type": "String",
        "default": "undefined",
        "source": null
      },
      {
        "name": "height",
        "type": [
          "Number",
          "String"
        ],
        "default": "400px",
        "source": null
      },
      {
        "name": "href",
        "type": [
          "String",
          "Object"
        ],
        "default": "undefined",
        "source": "routable"
      },
      {
        "name": "light",
        "type": "Boolean",
        "default": "false",
        "source": "themeable"
      },
      {
        "name": "nuxt",
        "type": "Boolean",
        "default": "false",
        "source": "routable"
      },
      {
        "name": "ripple",
        "type": [
          "Boolean",
          "Object"
        ],
        "default": "undefined",
        "source": "routable"
      },
      {
        "name": "src",
        "type": "String",
        "default": "undefined",
        "source": null
      },
      {
        "name": "target",
        "type": "String",
        "default": "undefined",
        "source": "routable"
      },
      {
        "name": "to",
        "type": [
          "String",
          "Object"
        ],
        "default": "undefined",
        "source": "routable"
      }
    ],
    "mixins": [
      "colorable",
      "routable",
      "themeable"
    ]
  },
  "v-list": {
    "props": [
      {
        "name": "dark",
        "type": "Boolean",
        "default": "false",
        "source": "themeable"
      },
      {
        "name": "dense",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "expand",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "light",
        "type": "Boolean",
        "default": "false",
        "source": "themeable"
      },
      {
        "name": "subheader",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "threeLine",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "twoLine",
        "type": "Boolean",
        "default": "false",
        "source": null
      }
    ],
    "mixins": [
      "registrable-provide",
      "themeable"
    ],
    "slots": [
      "default"
    ]
  },
  "v-list-group": {
    "props": [
      {
        "name": "activeClass",
        "type": "String",
        "default": "primary--text",
        "source": null
      },
      {
        "name": "appendIcon",
        "type": "String",
        "default": "keyboard_arrow_down",
        "source": null
      },
      {
        "name": "disabled",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "group",
        "type": "String",
        "default": "undefined",
        "source": null
      },
      {
        "name": "lazy",
        "type": "Boolean",
        "default": "false",
        "source": "bootable"
      },
      {
        "name": "noAction",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "prependIcon",
        "type": "String",
        "default": "undefined",
        "source": null
      },
      {
        "name": "subGroup",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "value",
        "type": "Any",
        "default": "undefined",
        "source": "toggleable"
      }
    ],
    "mixins": [
      "bootable",
      "registrable-inject",
      "toggleable"
    ]
  },
  "v-list-tile": {
    "props": [
      {
        "name": "nuxt",
        "type": "Boolean",
        "default": "false",
        "source": "routable"
      },
      {
        "name": "color",
        "type": "String",
        "default": "undefined",
        "source": "colorable"
      },
      {
        "name": "append",
        "type": "Boolean",
        "default": "false",
        "source": "routable"
      },
      {
        "name": "avatar",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "activeClass",
        "type": "String",
        "default": "primary--text",
        "source": "routable"
      },
      {
        "name": "ripple",
        "type": [
          "Boolean",
          "Object"
        ],
        "default": "undefined",
        "source": "routable"
      },
      {
        "name": "exactActiveClass",
        "type": "String",
        "default": "undefined",
        "source": "routable"
      },
      {
        "name": "disabled",
        "type": "Boolean",
        "default": "false",
        "source": "routable"
      },
      {
        "name": "exact",
        "type": "Boolean",
        "default": "false",
        "source": "routable"
      },
      {
        "name": "href",
        "type": [
          "String",
          "Object"
        ],
        "default": "undefined",
        "source": "routable"
      },
      {
        "name": "inactive",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "replace",
        "type": "Boolean",
        "default": "false",
        "source": "routable"
      },
      {
        "name": "tag",
        "type": "String",
        "default": "undefined",
        "source": "routable"
      },
      {
        "name": "target",
        "type": "String",
        "default": "undefined",
        "source": "routable"
      },
      {
        "name": "to",
        "type": [
          "String",
          "Object"
        ],
        "default": "undefined",
        "source": "routable"
      },
      {
        "name": "value",
        "type": "Any",
        "default": "undefined",
        "source": "toggleable"
      }
    ],
    "mixins": [
      "colorable",
      "routable",
      "toggleable"
    ],
    "slots": [
      "default"
    ]
  },
  "v-list-tile-action": {
    "props": [],
    "mixins": [],
    "slots": [
      "default"
    ]
  },
  "v-list-tile-action-text": {
    "props": [],
    "mixins": []
  },
  "v-list-tile-avatar": {
    "props": [
      {
        "name": "color",
        "type": "String",
        "default": "undefined",
        "source": null
      },
      {
        "name": "size",
        "type": [
          "Number",
          "String"
        ],
        "default": 40,
        "source": null
      },
      {
        "name": "tile",
        "type": "Boolean",
        "default": "false",
        "source": null
      }
    ],
    "mixins": [],
    "slots": [
      "default"
    ]
  },
  "v-list-tile-content": {
    "props": [],
    "mixins": []
  },
  "v-list-tile-sub-title": {
    "props": [],
    "mixins": [],
    "slots": [
      "default"
    ]
  },
  "v-list-tile-title": {
    "props": [],
    "mixins": [],
    "slots": [
      "default"
    ]
  },
  "v-menu": {
    "props": [
      {
        "name": "nudgeTop",
        "type": [
          "Number",
          "String"
        ],
        "default": 0,
        "source": "menuable"
      },
      {
        "name": "openDelay",
        "type": [
          "Number",
          "String"
        ],
        "default": 0,
        "source": "delayable"
      },
      {
        "name": "lazy",
        "type": "Boolean",
        "default": "false",
        "source": "bootable"
      },
      {
        "name": "attach",
        "type": [
          "Boolean",
          "String",
          "Object"
        ],
        "default": false,
        "source": "detachable"
      },
      {
        "name": "contentClass",
        "type": "Any",
        "default": "undefined",
        "source": "detachable"
      },
      {
        "name": "absolute",
        "type": "Boolean",
        "default": "false",
        "source": "positionable"
      },
      {
        "name": "bottom",
        "type": "Boolean",
        "default": "false",
        "source": "positionable"
      },
      {
        "name": "fixed",
        "type": "Boolean",
        "default": "false",
        "source": "positionable"
      },
      {
        "name": "left",
        "type": "Boolean",
        "default": "false",
        "source": "positionable"
      },
      {
        "name": "offsetY",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "offsetX",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "dark",
        "type": "Boolean",
        "default": "false",
        "source": "themeable"
      },
      {
        "name": "light",
        "type": "Boolean",
        "default": "false",
        "source": "themeable"
      },
      {
        "name": "activator",
        "type": "Any",
        "default": "undefined",
        "source": "menuable"
      },
      {
        "name": "allowOverflow",
        "type": "Boolean",
        "default": "false",
        "source": "menuable"
      },
      {
        "name": "maxWidth",
        "type": [
          "Number",
          "String"
        ],
        "default": "auto",
        "source": "menuable"
      },
      {
        "name": "minWidth",
        "type": [
          "Number",
          "String"
        ],
        "default": "undefined",
        "source": "menuable"
      },
      {
        "name": "nudgeBottom",
        "type": "Number",
        "default": 0,
        "source": "menuable"
      },
      {
        "name": "nudgeLeft",
        "type": [
          "Number",
          "String"
        ],
        "default": 0,
        "source": "menuable"
      },
      {
        "name": "nudgeRight",
        "type": [
          "Number",
          "String"
        ],
        "default": 0,
        "source": "menuable"
      },
      {
        "name": "closeDelay",
        "type": [
          "Number",
          "String"
        ],
        "default": 200,
        "source": "delayable"
      },
      {
        "name": "nudgeWidth",
        "type": [
          "Number",
          "String"
        ],
        "default": 0,
        "source": "menuable"
      },
      {
        "name": "offsetOverflow",
        "type": "Boolean",
        "default": "false",
        "source": "menuable"
      },
      {
        "name": "maxHeight",
        "type": "Any",
        "default": "auto",
        "source": null
      },
      {
        "name": "fullWidth",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "disabled",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "closeOnContentClick",
        "type": "Boolean",
        "default": "true",
        "source": null
      },
      {
        "name": "closeOnClick",
        "type": "Boolean",
        "default": "true",
        "source": null
      },
      {
        "name": "auto",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "top",
        "type": "Boolean",
        "default": "false",
        "source": "positionable"
      },
      {
        "name": "transition",
        "type": [
          "Boolean",
          "String"
        ],
        "default": "menu-transition",
        "source": null
      },
      {
        "name": "origin",
        "type": "String",
        "default": "top left",
        "source": null
      },
      {
        "name": "positionY",
        "type": "Number",
        "default": "undefined",
        "source": "menuable"
      },
      {
        "name": "positionX",
        "type": "Number",
        "default": "undefined",
        "source": "menuable"
      },
      {
        "name": "returnValue",
        "type": "Any",
        "default": "undefined",
        "source": "returnable"
      },
      {
        "name": "right",
        "type": "Boolean",
        "default": "false",
        "source": "positionable"
      },
      {
        "name": "openOnClick",
        "type": "Boolean",
        "default": "true",
        "source": null
      },
      {
        "name": "openOnHover",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "value",
        "type": "Any",
        "default": "undefined",
        "source": "toggleable"
      },
      {
        "name": "zIndex",
        "type": [
          "Number",
          "String"
        ],
        "default": "undefined",
        "source": "menuable"
      }
    ],
    "mixins": [
      "bootable",
      "delayable",
      "dependent",
      "detachable",
      "menuable",
      "positionable",
      "returnable",
      "stackable",
      "themeable",
      "toggleable"
    ],
    "slots": [
      "activator",
      "default"
    ]
  },
  "v-navigation-drawer": {
    "props": [
      {
        "name": "floating",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "absolute",
        "type": "Boolean",
        "default": "false",
        "source": "positionable"
      },
      {
        "name": "miniVariant",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "app",
        "type": "Boolean",
        "default": "false",
        "source": "applicationable"
      },
      {
        "name": "miniVariantWidth",
        "type": [
          "Number",
          "String"
        ],
        "default": 80,
        "source": null
      },
      {
        "name": "dark",
        "type": "Boolean",
        "default": "false",
        "source": "themeable"
      },
      {
        "name": "clipped",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "permanent",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "disableRouteWatcher",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "disableResizeWatcher",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "right",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "fixed",
        "type": "Boolean",
        "default": "false",
        "source": "positionable"
      },
      {
        "name": "height",
        "type": [
          "Number",
          "String"
        ],
        "default": "100%",
        "source": null
      },
      {
        "name": "hideOverlay",
        "type": "Boolean",
        "default": "false",
        "source": "overlayable"
      },
      {
        "name": "light",
        "type": "Boolean",
        "default": "false",
        "source": "themeable"
      },
      {
        "name": "mobileBreakPoint",
        "type": [
          "Number",
          "String"
        ],
        "default": 1264,
        "source": null
      },
      {
        "name": "stateless",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "temporary",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "touchless",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "value",
        "type": "Any",
        "default": "undefined",
        "source": null
      },
      {
        "name": "width",
        "type": [
          "Number",
          "String"
        ],
        "default": 300,
        "source": null
      }
    ],
    "mixins": [
      "applicationable",
      "overlayable",
      "positionable",
      "ssr-bootable",
      "themeable"
    ],
    "slots": [
      "default"
    ],
    "events": [
      {
        "name": "input",
        "value": "boolean"
      },
      {
        "name": "update:miniVariant",
        "value": "boolean"
      }
    ]
  },
  "v-pagination": {
    "props": [
      {
        "name": "circle",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "color",
        "type": "String",
        "default": "undefined",
        "source": "colorable"
      },
      {
        "name": "disabled",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "length",
        "type": "Number",
        "default": 0,
        "source": null
      },
      {
        "name": "nextIcon",
        "type": "String",
        "default": "chevron_right",
        "source": null
      },
      {
        "name": "prevIcon",
        "type": "String",
        "default": "chevron_left",
        "source": null
      },
      {
        "name": "totalVisible",
        "type": [
          "Number",
          "String"
        ],
        "default": "undefined",
        "source": null
      },
      {
        "name": "value",
        "type": "Number",
        "default": 0,
        "source": null
      }
    ],
    "mixins": [
      "colorable"
    ],
    "events": [
      {
        "name": "input",
        "value": "number"
      },
      {
        "name": "next",
        "value": "void"
      },
      {
        "name": "right",
        "value": "void"
      }
    ]
  },
  "v-parallax": {
    "props": [
      {
        "name": "alt",
        "type": "String",
        "default": "undefined",
        "source": null
      },
      {
        "name": "height",
        "type": [
          "String",
          "Number"
        ],
        "default": 500,
        "source": null
      },
      {
        "name": "src",
        "type": "String",
        "default": "undefined",
        "source": null
      }
    ],
    "mixins": [
      "translatable"
    ],
    "slots": [
      "default"
    ]
  },
  "v-picker": {
    "props": [
      {
        "name": "color",
        "type": "String",
        "default": "undefined",
        "source": "colorable"
      },
      {
        "name": "dark",
        "type": "Boolean",
        "default": "false",
        "source": "themeable"
      },
      {
        "name": "fullWidth",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "landscape",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "light",
        "type": "Boolean",
        "default": "false",
        "source": "themeable"
      },
      {
        "name": "transition",
        "type": "String",
        "default": "fade-transition",
        "source": null
      },
      {
        "name": "width",
        "type": [
          "Number",
          "String"
        ],
        "default": 290,
        "source": null
      }
    ],
    "mixins": [
      "colorable",
      "themeable"
    ]
  },
  "v-progress-circular": {
    "props": [
      {
        "name": "button",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "color",
        "type": "String",
        "default": "undefined",
        "source": "colorable"
      },
      {
        "name": "indeterminate",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "rotate",
        "type": "Number",
        "default": 0,
        "source": null
      },
      {
        "name": "size",
        "type": [
          "Number",
          "String"
        ],
        "default": 32,
        "source": null
      },
      {
        "name": "value",
        "type": "Number",
        "default": 0,
        "source": null
      },
      {
        "name": "width",
        "type": "Number",
        "default": 4,
        "source": null
      }
    ],
    "mixins": [
      "colorable"
    ],
    "slots": [
      "default"
    ]
  },
  "v-progress-linear": {
    "props": [
      {
        "name": "active",
        "type": "Boolean",
        "default": "true",
        "source": null
      },
      {
        "name": "backgroundColor",
        "type": "String",
        "default": "undefined",
        "source": null
      },
      {
        "name": "backgroundOpacity",
        "type": [
          "Number",
          "String"
        ],
        "default": "undefined",
        "source": null
      },
      {
        "name": "bufferValue",
        "type": [
          "Number",
          "String"
        ],
        "default": 100,
        "source": null
      },
      {
        "name": "color",
        "type": "String",
        "default": "primary",
        "source": "colorable"
      },
      {
        "name": "height",
        "type": [
          "Number",
          "String"
        ],
        "default": 7,
        "source": null
      },
      {
        "name": "indeterminate",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "query",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "value",
        "type": [
          "Number",
          "String"
        ],
        "default": 0,
        "source": null
      }
    ],
    "mixins": [
      "colorable"
    ]
  },
  "v-radio-group": {
    "props": [
      {
        "name": "persistentHint",
        "type": "Boolean",
        "default": "false",
        "source": "input"
      },
      {
        "name": "loading",
        "type": [
          "Boolean",
          "String"
        ],
        "default": false,
        "source": "loadable"
      },
      {
        "name": "light",
        "type": "Boolean",
        "default": "false",
        "source": "themeable"
      },
      {
        "name": "error",
        "type": "Boolean",
        "default": "false",
        "source": "validatable"
      },
      {
        "name": "errorMessages",
        "type": [
          "String",
          "Array"
        ],
        "default": [],
        "source": "validatable"
      },
      {
        "name": "inputValue",
        "type": "Any",
        "default": "undefined",
        "source": null
      },
      {
        "name": "column",
        "type": "Boolean",
        "default": "true",
        "source": null
      },
      {
        "name": "appendIcon",
        "type": "String",
        "default": "undefined",
        "source": "input"
      },
      {
        "name": "appendIconCb",
        "type": "Function",
        "default": "null",
        "source": "input"
      },
      {
        "name": "disabled",
        "type": "Boolean",
        "default": "false",
        "source": "input"
      },
      {
        "name": "hint",
        "type": "String",
        "default": "undefined",
        "source": "input"
      },
      {
        "name": "hideDetails",
        "type": "Boolean",
        "default": "false",
        "source": "input"
      },
      {
        "name": "label",
        "type": "String",
        "default": "undefined",
        "source": "input"
      },
      {
        "name": "dark",
        "type": "Boolean",
        "default": "false",
        "source": "themeable"
      },
      {
        "name": "toggleKeys",
        "type": "Array",
        "default": [
          13,
          32
        ],
        "source": "input"
      },
      {
        "name": "placeholder",
        "type": "String",
        "default": "undefined",
        "source": "input"
      },
      {
        "name": "name",
        "type": "String",
        "default": "undefined",
        "source": null
      },
      {
        "name": "mandatory",
        "type": "Boolean",
        "default": "true",
        "source": null
      },
      {
        "name": "prependIcon",
        "type": "String",
        "default": "undefined",
        "source": "input"
      },
      {
        "name": "prependIconCb",
        "type": "Function",
        "default": "null",
        "source": "input"
      },
      {
        "name": "readonly",
        "type": "Boolean",
        "default": "false",
        "source": "input"
      },
      {
        "name": "required",
        "type": "Boolean",
        "default": "false",
        "source": "input"
      },
      {
        "name": "row",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "rules",
        "type": "Array",
        "default": [],
        "source": "validatable"
      },
      {
        "name": "tabindex",
        "type": "Any",
        "default": 0,
        "source": "input"
      },
      {
        "name": "validateOnBlur",
        "type": "Boolean",
        "default": "false",
        "source": "validatable"
      },
      {
        "name": "value",
        "type": "Any",
        "default": "undefined",
        "source": "input"
      }
    ],
    "mixins": [
      "input",
      "loadable",
      "registrable-provide",
      "themeable",
      "validatable"
    ],
    "slots": [
      "label"
    ],
    "events": [
      {
        "name": "change",
        "value": "any"
      },
      {
        "name": "blur",
        "value": "any"
      },
      {
        "name": "update:error",
        "value": "boolean"
      }
    ]
  },
  "v-radio": {
    "props": [
      {
        "name": "color",
        "type": "String",
        "default": "undefined",
        "source": "colorable"
      },
      {
        "name": "dark",
        "type": "Boolean",
        "default": "false",
        "source": "themeable"
      },
      {
        "name": "disabled",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "label",
        "type": "String",
        "default": "undefined",
        "source": null
      },
      {
        "name": "light",
        "type": "Boolean",
        "default": "false",
        "source": "themeable"
      },
      {
        "name": "ripple",
        "type": [
          "Boolean",
          "Object"
        ],
        "default": true,
        "source": "rippleable"
      },
      {
        "name": "value",
        "type": "Any",
        "default": "undefined",
        "source": null
      }
    ],
    "mixins": [
      "colorable",
      "registrable-inject",
      "rippleable",
      "tab-focusable",
      "themeable"
    ],
    "events": [
      {
        "name": "change",
        "value": "any"
      }
    ]
  },
  "v-select": {
    "props": [
      {
        "name": "autocomplete",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "filter",
        "type": "Function",
        "default": "(item: object, queryText: string, itemText: string): boolean",
        "source": null
      },
      {
        "name": "editable",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "dense",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "dark",
        "type": "Boolean",
        "default": "false",
        "source": "themeable"
      },
      {
        "name": "deletableChips",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "error",
        "type": "Boolean",
        "default": "false",
        "source": "validatable"
      },
      {
        "name": "errorMessages",
        "type": [
          "String",
          "Array"
        ],
        "default": [],
        "source": "validatable"
      },
      {
        "name": "contentClass",
        "type": "String",
        "default": "undefined",
        "source": null
      },
      {
        "name": "combobox",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "appendIcon",
        "type": "String",
        "default": "arrow_drop_down",
        "source": "input"
      },
      {
        "name": "appendIconCb",
        "type": "Function",
        "default": "null",
        "source": "input"
      },
      {
        "name": "disabled",
        "type": "Boolean",
        "default": "false",
        "source": "input"
      },
      {
        "name": "clearable",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "chips",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "cacheItems",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "browserAutocomplete",
        "type": "String",
        "default": "on",
        "source": null
      },
      {
        "name": "color",
        "type": "String",
        "default": "undefined",
        "source": "colorable"
      },
      {
        "name": "auto",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "attach",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "dontFillMaskBlanks",
        "type": "Boolean",
        "default": "false",
        "source": "maskable"
      },
      {
        "name": "items",
        "type": "Array",
        "default": [],
        "source": null
      },
      {
        "name": "required",
        "type": "Boolean",
        "default": "false",
        "source": "input"
      },
      {
        "name": "flat",
        "type": "Boolean",
        "default": "false",
        "source": "soloable"
      },
      {
        "name": "overflow",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "readonly",
        "type": "Boolean",
        "default": "false",
        "source": "input"
      },
      {
        "name": "mask",
        "type": [
          "Object",
          "String"
        ],
        "default": "undefined",
        "source": "maskable"
      },
      {
        "name": "openOnClear",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "prependIconCb",
        "type": "Function",
        "default": "null",
        "source": "input"
      },
      {
        "name": "prependIcon",
        "type": "String",
        "default": "undefined",
        "source": "input"
      },
      {
        "name": "placeholder",
        "type": "String",
        "default": "undefined",
        "source": "input"
      },
      {
        "name": "persistentHint",
        "type": "Boolean",
        "default": "false",
        "source": "input"
      },
      {
        "name": "label",
        "type": "String",
        "default": "undefined",
        "source": "input"
      },
      {
        "name": "hideDetails",
        "type": "Boolean",
        "default": "false",
        "source": "input"
      },
      {
        "name": "hint",
        "type": "String",
        "default": "undefined",
        "source": "input"
      },
      {
        "name": "multiLine",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "multiple",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "light",
        "type": "Boolean",
        "default": "false",
        "source": "themeable"
      },
      {
        "name": "loading",
        "type": [
          "Boolean",
          "String"
        ],
        "default": false,
        "source": "loadable"
      },
      {
        "name": "noDataText",
        "type": "String",
        "default": "No data available",
        "source": "filterable"
      },
      {
        "name": "hideSelected",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "minWidth",
        "type": [
          "Boolean",
          "Number",
          "String"
        ],
        "default": false,
        "source": null
      },
      {
        "name": "itemAvatar",
        "type": "String",
        "default": "avatar",
        "source": null
      },
      {
        "name": "itemDisabled",
        "type": "String",
        "default": "disabled",
        "source": null
      },
      {
        "name": "itemText",
        "type": "String",
        "default": "text",
        "source": null
      },
      {
        "name": "itemValue",
        "type": "String",
        "default": "value",
        "source": null
      },
      {
        "name": "maxHeight",
        "type": [
          "Number",
          "String"
        ],
        "default": 300,
        "source": null
      },
      {
        "name": "segmented",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "solo",
        "type": "Boolean",
        "default": "false",
        "source": "soloable"
      },
      {
        "name": "singleLine",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "returnMaskedValue",
        "type": "Boolean",
        "default": "false",
        "source": "maskable"
      },
      {
        "name": "rules",
        "type": "Array",
        "default": [],
        "source": "validatable"
      },
      {
        "name": "returnObject",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "searchInput",
        "type": "Any",
        "default": "undefined",
        "source": null
      },
      {
        "name": "soloInverted",
        "type": "Boolean",
        "default": "false",
        "source": "soloable"
      },
      {
        "name": "tabindex",
        "type": "Any",
        "default": 0,
        "source": "input"
      },
      {
        "name": "tags",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "toggleKeys",
        "type": "Array",
        "default": [
          13,
          32
        ],
        "source": "input"
      },
      {
        "name": "validateOnBlur",
        "type": "Boolean",
        "default": "false",
        "source": "validatable"
      },
      {
        "name": "value",
        "type": "Any",
        "default": "undefined",
        "source": "input"
      },
      {
        "name": "valueComparator",
        "type": "Function",
        "default": "(a: any, b: any): boolean",
        "source": null
      }
    ],
    "mixins": [
      "colorable",
      "dependent",
      "filterable",
      "input",
      "loadable",
      "maskable",
      "soloable",
      "themeable",
      "validatable"
    ],
    "slots": [
      "no-data",
      "label",
      "progress"
    ],
    "scopedSlots": [
      {
        "name": "selection",
        "props": {
          "parent": "VueComponent",
          "item": "object",
          "index": "number",
          "selected": "boolean",
          "disabled": "boolean"
        }
      },
      {
        "name": "item",
        "props": {
          "parent": "VueComponent",
          "item": "object",
          "tile": "object"
        }
      }
    ],
    "events": [
      {
        "name": "input",
        "value": "any"
      },
      {
        "name": "change",
        "value": "any"
      },
      {
        "name": "update:searchInput",
        "value": "string"
      },
      {
        "name": "update:error",
        "value": "boolean"
      }
    ]
  },
  "v-slider": {
    "props": [
      {
        "name": "placeholder",
        "type": "String",
        "default": "undefined",
        "source": "input"
      },
      {
        "name": "color",
        "type": "String",
        "default": "undefined",
        "source": "colorable"
      },
      {
        "name": "appendIconCb",
        "type": "Function",
        "default": "null",
        "source": "input"
      },
      {
        "name": "appendIcon",
        "type": "String",
        "default": "undefined",
        "source": "input"
      },
      {
        "name": "prependIconCb",
        "type": "Function",
        "default": "null",
        "source": "input"
      },
      {
        "name": "error",
        "type": "Boolean",
        "default": "false",
        "source": "validatable"
      },
      {
        "name": "disabled",
        "type": "Boolean",
        "default": "false",
        "source": "input"
      },
      {
        "name": "dark",
        "type": "Boolean",
        "default": "false",
        "source": "themeable"
      },
      {
        "name": "required",
        "type": "Boolean",
        "default": "false",
        "source": "input"
      },
      {
        "name": "light",
        "type": "Boolean",
        "default": "false",
        "source": "themeable"
      },
      {
        "name": "errorMessages",
        "type": [
          "String",
          "Array"
        ],
        "default": [],
        "source": "validatable"
      },
      {
        "name": "hint",
        "type": "String",
        "default": "undefined",
        "source": "input"
      },
      {
        "name": "hideDetails",
        "type": "Boolean",
        "default": "false",
        "source": "input"
      },
      {
        "name": "label",
        "type": "String",
        "default": "undefined",
        "source": "input"
      },
      {
        "name": "value",
        "type": [
          "Number",
          "String"
        ],
        "default": "undefined",
        "source": "input"
      },
      {
        "name": "persistentHint",
        "type": "Boolean",
        "default": "false",
        "source": "input"
      },
      {
        "name": "max",
        "type": [
          "Number",
          "String"
        ],
        "default": 100,
        "source": null
      },
      {
        "name": "min",
        "type": [
          "Number",
          "String"
        ],
        "default": 0,
        "source": null
      },
      {
        "name": "loading",
        "type": [
          "Boolean",
          "String"
        ],
        "default": false,
        "source": "loadable"
      },
      {
        "name": "prependIcon",
        "type": "String",
        "default": "undefined",
        "source": "input"
      },
      {
        "name": "trackColor",
        "type": "String",
        "default": "undefined",
        "source": null
      },
      {
        "name": "toggleKeys",
        "type": "Array",
        "default": [
          13,
          32
        ],
        "source": "input"
      },
      {
        "name": "readonly",
        "type": "Boolean",
        "default": "false",
        "source": "input"
      },
      {
        "name": "rules",
        "type": "Array",
        "default": [],
        "source": "validatable"
      },
      {
        "name": "tabindex",
        "type": "Any",
        "default": 0,
        "source": "input"
      },
      {
        "name": "step",
        "type": [
          "Number",
          "String"
        ],
        "default": 1,
        "source": null
      },
      {
        "name": "ticks",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "thumbColor",
        "type": "String",
        "default": "undefined",
        "source": null
      },
      {
        "name": "thumbLabel",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "validateOnBlur",
        "type": "Boolean",
        "default": "false",
        "source": "validatable"
      }
    ],
    "mixins": [
      "colorable",
      "input",
      "loadable",
      "themeable",
      "validatable"
    ],
    "events": [
      {
        "name": "input",
        "value": "number"
      },
      {
        "name": "update:error",
        "value": "boolean"
      }
    ]
  },
  "v-snackbar": {
    "props": [
      {
        "name": "left",
        "type": "Boolean",
        "default": "false",
        "source": "positionable"
      },
      {
        "name": "color",
        "type": "String",
        "default": "undefined",
        "source": "colorable"
      },
      {
        "name": "absolute",
        "type": "Boolean",
        "default": "false",
        "source": "positionable"
      },
      {
        "name": "autoHeight",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "bottom",
        "type": "Boolean",
        "default": "false",
        "source": "positionable"
      },
      {
        "name": "multiLine",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "right",
        "type": "Boolean",
        "default": "false",
        "source": "positionable"
      },
      {
        "name": "timeout",
        "type": "Number",
        "default": 6000,
        "source": null
      },
      {
        "name": "top",
        "type": "Boolean",
        "default": "false",
        "source": "positionable"
      },
      {
        "name": "value",
        "type": "Any",
        "default": "undefined",
        "source": "toggleable"
      },
      {
        "name": "vertical",
        "type": "Boolean",
        "default": "false",
        "source": null
      }
    ],
    "mixins": [
      "colorable",
      "positionable",
      "toggleable"
    ],
    "slots": [
      "default"
    ]
  },
  "v-speed-dial": {
    "props": [
      {
        "name": "value",
        "type": "Any",
        "default": "undefined",
        "source": "toggleable"
      },
      {
        "name": "absolute",
        "type": "Boolean",
        "default": "false",
        "source": "positionable"
      },
      {
        "name": "bottom",
        "type": "Boolean",
        "default": "false",
        "source": "positionable"
      },
      {
        "name": "direction",
        "type": "String",
        "default": "top",
        "source": null
      },
      {
        "name": "fixed",
        "type": "Boolean",
        "default": "false",
        "source": "positionable"
      },
      {
        "name": "left",
        "type": "Boolean",
        "default": "false",
        "source": "positionable"
      },
      {
        "name": "mode",
        "type": "String",
        "default": "undefined",
        "source": "transitionable"
      },
      {
        "name": "openOnHover",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "origin",
        "type": "String",
        "default": "undefined",
        "source": "transitionable"
      },
      {
        "name": "right",
        "type": "Boolean",
        "default": "false",
        "source": "positionable"
      },
      {
        "name": "top",
        "type": "Boolean",
        "default": "false",
        "source": "positionable"
      },
      {
        "name": "transition",
        "type": "String",
        "default": "scale-transition",
        "source": "transitionable"
      }
    ],
    "mixins": [
      "positionable",
      "toggleable",
      "transitionable"
    ],
    "slots": [
      "activator",
      "default"
    ]
  },
  "v-stepper": {
    "props": [
      {
        "name": "altLabels",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "dark",
        "type": "Boolean",
        "default": "false",
        "source": "themeable"
      },
      {
        "name": "light",
        "type": "Boolean",
        "default": "false",
        "source": "themeable"
      },
      {
        "name": "nonLinear",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "value",
        "type": [
          "Number",
          "String"
        ],
        "default": "undefined",
        "source": null
      },
      {
        "name": "vertical",
        "type": "Boolean",
        "default": "false",
        "source": null
      }
    ],
    "mixins": [
      "themeable"
    ],
    "slots": [
      "default"
    ],
    "events": [
      {
        "name": "input",
        "value": "number"
      }
    ]
  },
  "v-stepper-content": {
    "props": [
      {
        "name": "step",
        "type": [
          "Number",
          "String"
        ],
        "default": "undefined",
        "source": null
      }
    ],
    "mixins": [],
    "slots": [
      "default"
    ]
  },
  "v-stepper-step": {
    "props": [
      {
        "name": "complete",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "completeIcon",
        "type": "String",
        "default": "check",
        "source": null
      },
      {
        "name": "editIcon",
        "type": "String",
        "default": "edit",
        "source": null
      },
      {
        "name": "editable",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "errorIcon",
        "type": "String",
        "default": "warning",
        "source": null
      },
      {
        "name": "rules",
        "type": "Array",
        "default": [],
        "source": null
      },
      {
        "name": "step",
        "type": [
          "Number",
          "String"
        ],
        "default": "undefined",
        "source": null
      }
    ],
    "mixins": [],
    "slots": [
      "default"
    ]
  },
  "v-stepper-header": {
    "props": [],
    "mixins": [],
    "slots": [
      "default"
    ]
  },
  "v-stepper-items": {
    "props": [],
    "mixins": [],
    "slots": [
      "default"
    ]
  },
  "v-subheader": {
    "props": [
      {
        "name": "dark",
        "type": "Boolean",
        "default": "false",
        "source": "themeable"
      },
      {
        "name": "inset",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "light",
        "type": "Boolean",
        "default": "false",
        "source": "themeable"
      }
    ],
    "mixins": [
      "themeable"
    ],
    "slots": [
      "default"
    ]
  },
  "v-switch": {
    "props": [
      {
        "name": "persistentHint",
        "type": "Boolean",
        "default": "false",
        "source": "input"
      },
      {
        "name": "ripple",
        "type": [
          "Boolean",
          "Object"
        ],
        "default": true,
        "source": "rippleable"
      },
      {
        "name": "dark",
        "type": "Boolean",
        "default": "false",
        "source": "themeable"
      },
      {
        "name": "light",
        "type": "Boolean",
        "default": "false",
        "source": "themeable"
      },
      {
        "name": "error",
        "type": "Boolean",
        "default": "false",
        "source": "validatable"
      },
      {
        "name": "errorMessages",
        "type": [
          "String",
          "Array"
        ],
        "default": [],
        "source": "validatable"
      },
      {
        "name": "falseValue",
        "type": "Any",
        "default": "undefined",
        "source": "selectable"
      },
      {
        "name": "inputValue",
        "type": "Any",
        "default": "undefined",
        "source": "selectable"
      },
      {
        "name": "appendIcon",
        "type": "String",
        "default": "undefined",
        "source": "input"
      },
      {
        "name": "appendIconCb",
        "type": "Function",
        "default": "null",
        "source": "input"
      },
      {
        "name": "disabled",
        "type": "Boolean",
        "default": "false",
        "source": "input"
      },
      {
        "name": "hint",
        "type": "String",
        "default": "undefined",
        "source": "input"
      },
      {
        "name": "hideDetails",
        "type": "Boolean",
        "default": "false",
        "source": "input"
      },
      {
        "name": "label",
        "type": "String",
        "default": "undefined",
        "source": "input"
      },
      {
        "name": "loading",
        "type": [
          "Boolean",
          "String"
        ],
        "default": false,
        "source": "loadable"
      },
      {
        "name": "placeholder",
        "type": "String",
        "default": "undefined",
        "source": "input"
      },
      {
        "name": "prependIcon",
        "type": "String",
        "default": "undefined",
        "source": "input"
      },
      {
        "name": "prependIconCb",
        "type": "Function",
        "default": "null",
        "source": "input"
      },
      {
        "name": "readonly",
        "type": "Boolean",
        "default": "false",
        "source": "input"
      },
      {
        "name": "required",
        "type": "Boolean",
        "default": "false",
        "source": "input"
      },
      {
        "name": "id",
        "type": "String",
        "default": "undefined",
        "source": "selectable"
      },
      {
        "name": "color",
        "type": "String",
        "default": "undefined",
        "source": "colorable"
      },
      {
        "name": "rules",
        "type": "Array",
        "default": [],
        "source": "validatable"
      },
      {
        "name": "tabindex",
        "type": "Any",
        "default": 0,
        "source": "input"
      },
      {
        "name": "toggleKeys",
        "type": "Array",
        "default": [
          13,
          32
        ],
        "source": "input"
      },
      {
        "name": "trueValue",
        "type": "Any",
        "default": "undefined",
        "source": "selectable"
      },
      {
        "name": "validateOnBlur",
        "type": "Boolean",
        "default": "false",
        "source": "validatable"
      },
      {
        "name": "value",
        "type": "Any",
        "default": "undefined",
        "source": "input"
      }
    ],
    "mixins": [
      "colorable",
      "input",
      "loadable",
      "rippleable",
      "selectable",
      "themeable",
      "validatable"
    ],
    "slots": [
      "label"
    ]
  },
  "v-system-bar": {
    "props": [
      {
        "name": "absolute",
        "type": "Boolean",
        "default": "false",
        "source": "positionable"
      },
      {
        "name": "app",
        "type": "Boolean",
        "default": "false",
        "source": "applicationable"
      },
      {
        "name": "color",
        "type": "String",
        "default": "undefined",
        "source": "colorable"
      },
      {
        "name": "dark",
        "type": "Boolean",
        "default": "false",
        "source": "themeable"
      },
      {
        "name": "fixed",
        "type": "Boolean",
        "default": "false",
        "source": "positionable"
      },
      {
        "name": "height",
        "type": [
          "Number",
          "String"
        ],
        "default": "undefined",
        "source": null
      },
      {
        "name": "light",
        "type": "Boolean",
        "default": "false",
        "source": "themeable"
      },
      {
        "name": "lightsOut",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "status",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "window",
        "type": "Boolean",
        "default": "false",
        "source": null
      }
    ],
    "mixins": [
      "applicationable",
      "colorable",
      "positionable",
      "themeable"
    ]
  },
  "v-tabs": {
    "props": [
      {
        "name": "mobileBreakPoint",
        "type": [
          "Number",
          "String"
        ],
        "default": 1264,
        "source": null
      },
      {
        "name": "color",
        "type": "String",
        "default": "undefined",
        "source": "colorable"
      },
      {
        "name": "centered",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "alignWithTitle",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "prevIcon",
        "type": "String",
        "default": "chevron_left",
        "source": null
      },
      {
        "name": "grow",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "dark",
        "type": "Boolean",
        "default": "false",
        "source": "themeable"
      },
      {
        "name": "fixedTabs",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "height",
        "type": [
          "Number",
          "String"
        ],
        "default": "undefined",
        "source": null
      },
      {
        "name": "hideSlider",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "iconsAndText",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "light",
        "type": "Boolean",
        "default": "false",
        "source": "themeable"
      },
      {
        "name": "nextIcon",
        "type": "String",
        "default": "chevron_right",
        "source": null
      },
      {
        "name": "right",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "showArrows",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "sliderColor",
        "type": "String",
        "default": "accent",
        "source": null
      },
      {
        "name": "value",
        "type": [
          "Number",
          "String"
        ],
        "default": "undefined",
        "source": null
      }
    ],
    "mixins": [
      "colorable",
      "registrable-provide",
      "ssr-bootable",
      "themeable"
    ],
    "slots": [
      "default"
    ],
    "events": [
      {
        "name": "input",
        "value": "string"
      }
    ]
  },
  "v-tab": {
    "props": [
      {
        "name": "to",
        "type": [
          "String",
          "Object"
        ],
        "default": "undefined",
        "source": "routable"
      },
      {
        "name": "activeClass",
        "type": "String",
        "default": "tabs__item--active",
        "source": "routable"
      },
      {
        "name": "append",
        "type": "Boolean",
        "default": "false",
        "source": "routable"
      },
      {
        "name": "disabled",
        "type": "Boolean",
        "default": "false",
        "source": "routable"
      },
      {
        "name": "exact",
        "type": "Boolean",
        "default": "false",
        "source": "routable"
      },
      {
        "name": "exactActiveClass",
        "type": "String",
        "default": "undefined",
        "source": "routable"
      },
      {
        "name": "href",
        "type": [
          "String",
          "Object"
        ],
        "default": "undefined",
        "source": "routable"
      },
      {
        "name": "nuxt",
        "type": "Boolean",
        "default": "false",
        "source": "routable"
      },
      {
        "name": "replace",
        "type": "Boolean",
        "default": "false",
        "source": "routable"
      },
      {
        "name": "ripple",
        "type": [
          "Boolean",
          "Object"
        ],
        "default": true,
        "source": "routable"
      },
      {
        "name": "tag",
        "type": "String",
        "default": "undefined",
        "source": "routable"
      },
      {
        "name": "target",
        "type": "String",
        "default": "undefined",
        "source": "routable"
      }
    ],
    "mixins": [
      "registrable-inject",
      "routable"
    ],
    "slots": [
      "default"
    ]
  },
  "v-tabs-items": {
    "props": [
      {
        "name": "cycle",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "touchless",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "value",
        "type": [
          "Number",
          "String"
        ],
        "default": "undefined",
        "source": null
      }
    ],
    "mixins": [
      "registrable-provide"
    ],
    "slots": [
      "default"
    ],
    "events": [
      {
        "name": "input",
        "value": "string"
      }
    ]
  },
  "v-tab-item": {
    "props": [
      {
        "name": "id",
        "type": "String",
        "default": "undefined",
        "source": null
      },
      {
        "name": "lazy",
        "type": "Boolean",
        "default": "false",
        "source": "bootable"
      },
      {
        "name": "reverseTransition",
        "type": [
          "Boolean",
          "String"
        ],
        "default": "tab-reverse-transition",
        "source": null
      },
      {
        "name": "transition",
        "type": [
          "Boolean",
          "String"
        ],
        "default": "tab-transition",
        "source": null
      }
    ],
    "mixins": [
      "bootable",
      "registrable-inject"
    ],
    "slots": [
      "default"
    ]
  },
  "v-tabs-slider": {
    "props": [
      {
        "name": "color",
        "type": "String",
        "default": "undefined",
        "source": "colorable"
      }
    ],
    "mixins": [
      "colorable"
    ]
  },
  "v-text-field": {
    "props": [
      {
        "name": "value",
        "type": "Any",
        "default": "undefined",
        "source": "input"
      },
      {
        "name": "color",
        "type": "String",
        "default": "primary",
        "source": "colorable"
      },
      {
        "name": "clearable",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "box",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "autoGrow",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "autofocus",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "appendIconCb",
        "type": "Function",
        "default": "null",
        "source": "input"
      },
      {
        "name": "appendIcon",
        "type": "String",
        "default": "undefined",
        "source": "input"
      },
      {
        "name": "flat",
        "type": "Boolean",
        "default": "false",
        "source": "soloable"
      },
      {
        "name": "type",
        "type": "String",
        "default": "text",
        "source": null
      },
      {
        "name": "disabled",
        "type": "Boolean",
        "default": "false",
        "source": "input"
      },
      {
        "name": "hint",
        "type": "String",
        "default": "undefined",
        "source": "input"
      },
      {
        "name": "hideDetails",
        "type": "Boolean",
        "default": "false",
        "source": "input"
      },
      {
        "name": "label",
        "type": "String",
        "default": "undefined",
        "source": "input"
      },
      {
        "name": "persistentHint",
        "type": "Boolean",
        "default": "false",
        "source": "input"
      },
      {
        "name": "placeholder",
        "type": "String",
        "default": "undefined",
        "source": "input"
      },
      {
        "name": "prependIcon",
        "type": "String",
        "default": "undefined",
        "source": "input"
      },
      {
        "name": "prependIconCb",
        "type": "Function",
        "default": "null",
        "source": "input"
      },
      {
        "name": "readonly",
        "type": "Boolean",
        "default": "false",
        "source": "input"
      },
      {
        "name": "required",
        "type": "Boolean",
        "default": "false",
        "source": "input"
      },
      {
        "name": "tabindex",
        "type": "Any",
        "default": 0,
        "source": "input"
      },
      {
        "name": "toggleKeys",
        "type": "Array",
        "default": [
          13,
          32
        ],
        "source": "input"
      },
      {
        "name": "loading",
        "type": [
          "Boolean",
          "String"
        ],
        "default": false,
        "source": "loadable"
      },
      {
        "name": "dontFillMaskBlanks",
        "type": "Boolean",
        "default": "false",
        "source": "maskable"
      },
      {
        "name": "mask",
        "type": [
          "Object",
          "String"
        ],
        "default": "undefined",
        "source": "maskable"
      },
      {
        "name": "returnMaskedValue",
        "type": "Boolean",
        "default": "false",
        "source": "maskable"
      },
      {
        "name": "rules",
        "type": "Array",
        "default": [],
        "source": "validatable"
      },
      {
        "name": "soloInverted",
        "type": "Boolean",
        "default": "false",
        "source": "soloable"
      },
      {
        "name": "solo",
        "type": "Boolean",
        "default": "false",
        "source": "soloable"
      },
      {
        "name": "errorMessages",
        "type": [
          "String",
          "Array"
        ],
        "default": [],
        "source": "validatable"
      },
      {
        "name": "error",
        "type": "Boolean",
        "default": "false",
        "source": "validatable"
      },
      {
        "name": "light",
        "type": "Boolean",
        "default": "false",
        "source": "themeable"
      },
      {
        "name": "dark",
        "type": "Boolean",
        "default": "false",
        "source": "themeable"
      },
      {
        "name": "counter",
        "type": [
          "Boolean",
          "Number",
          "String"
        ],
        "default": "undefined",
        "source": null
      },
      {
        "name": "fullWidth",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "multiLine",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "noResize",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "prefix",
        "type": "String",
        "default": "undefined",
        "source": null
      },
      {
        "name": "rowHeight",
        "type": [
          "Number",
          "String"
        ],
        "default": 24,
        "source": null
      },
      {
        "name": "rows",
        "type": [
          "Number",
          "String"
        ],
        "default": 5,
        "source": null
      },
      {
        "name": "singleLine",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "suffix",
        "type": "String",
        "default": "undefined",
        "source": null
      },
      {
        "name": "textarea",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "validateOnBlur",
        "type": "Boolean",
        "default": "false",
        "source": "validatable"
      }
    ],
    "mixins": [
      "colorable",
      "input",
      "loadable",
      "maskable",
      "soloable",
      "themeable",
      "validatable"
    ],
    "events": [
      {
        "name": "input",
        "value": "string"
      },
      {
        "name": "change",
        "value": "string"
      },
      {
        "name": "update:error",
        "value": "boolean"
      }
    ]
  },
  "v-time-picker": {
    "props": [
      {
        "name": "width",
        "type": [
          "Number",
          "String"
        ],
        "default": 290,
        "source": "picker"
      },
      {
        "name": "color",
        "type": "String",
        "default": "undefined",
        "source": "colorable"
      },
      {
        "name": "allowedMinutes",
        "type": "Function",
        "default": "null",
        "source": null
      },
      {
        "name": "allowedHours",
        "type": "Function",
        "default": "null",
        "source": null
      },
      {
        "name": "light",
        "type": "Boolean",
        "default": "false",
        "source": "themeable"
      },
      {
        "name": "headerColor",
        "type": "String",
        "default": "undefined",
        "source": "picker"
      },
      {
        "name": "format",
        "type": "String",
        "default": "ampm",
        "source": null
      },
      {
        "name": "dark",
        "type": "Boolean",
        "default": "false",
        "source": "themeable"
      },
      {
        "name": "fullWidth",
        "type": "Boolean",
        "default": "false",
        "source": "picker"
      },
      {
        "name": "landscape",
        "type": "Boolean",
        "default": "false",
        "source": "picker"
      },
      {
        "name": "max",
        "type": "String",
        "default": "undefined",
        "source": null
      },
      {
        "name": "min",
        "type": "String",
        "default": "undefined",
        "source": null
      },
      {
        "name": "noTitle",
        "type": "Boolean",
        "default": "false",
        "source": "picker"
      },
      {
        "name": "scrollable",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "value",
        "type": "Any",
        "default": "undefined",
        "source": null
      }
    ],
    "mixins": [
      "colorable",
      "picker",
      "themeable"
    ],
    "events": [
      {
        "name": "input",
        "value": "string"
      }
    ]
  },
  "v-time-picker-clock": {
    "props": [
      {
        "name": "max",
        "type": "Number",
        "default": "undefined",
        "source": null
      },
      {
        "name": "color",
        "type": "String",
        "default": "undefined",
        "source": "colorable"
      },
      {
        "name": "allowedValues",
        "type": "Function",
        "default": "null",
        "source": null
      },
      {
        "name": "dark",
        "type": "Boolean",
        "default": "false",
        "source": "themeable"
      },
      {
        "name": "double",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "format",
        "type": "Function",
        "default": "(val: string): string",
        "source": null
      },
      {
        "name": "light",
        "type": "Boolean",
        "default": "false",
        "source": "themeable"
      },
      {
        "name": "min",
        "type": "Number",
        "default": "undefined",
        "source": null
      },
      {
        "name": "rotate",
        "type": "Number",
        "default": 0,
        "source": null
      },
      {
        "name": "scrollable",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "size",
        "type": [
          "Number",
          "String"
        ],
        "default": 270,
        "source": null
      },
      {
        "name": "step",
        "type": "Number",
        "default": 1,
        "source": null
      },
      {
        "name": "value",
        "type": "Number",
        "default": "undefined",
        "source": null
      }
    ],
    "mixins": [
      "colorable",
      "themeable"
    ]
  },
  "v-time-picker-title": {
    "props": [
      {
        "name": "ampm",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "hour",
        "type": "Number",
        "default": "undefined",
        "source": null
      },
      {
        "name": "minute",
        "type": "Number",
        "default": "undefined",
        "source": null
      },
      {
        "name": "period",
        "type": "String",
        "default": "undefined",
        "source": null
      },
      {
        "name": "selectingHour",
        "type": "Boolean",
        "default": "false",
        "source": null
      }
    ],
    "mixins": []
  },
  "v-toolbar": {
    "props": [
      {
        "name": "extensionHeight",
        "type": [
          "Number",
          "String"
        ],
        "default": "undefined",
        "source": null
      },
      {
        "name": "absolute",
        "type": "Boolean",
        "default": "false",
        "source": "positionable"
      },
      {
        "name": "flat",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "app",
        "type": "Boolean",
        "default": "false",
        "source": "applicationable"
      },
      {
        "name": "floating",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "dark",
        "type": "Boolean",
        "default": "false",
        "source": "themeable"
      },
      {
        "name": "card",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "clippedLeft",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "clippedRight",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "color",
        "type": "String",
        "default": "undefined",
        "source": "colorable"
      },
      {
        "name": "manualScroll",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "extended",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "dense",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "fixed",
        "type": "Boolean",
        "default": "false",
        "source": "positionable"
      },
      {
        "name": "height",
        "type": [
          "Number",
          "String"
        ],
        "default": "undefined",
        "source": null
      },
      {
        "name": "invertedScroll",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "light",
        "type": "Boolean",
        "default": "false",
        "source": "themeable"
      },
      {
        "name": "prominent",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "scrollOffScreen",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "scrollTarget",
        "type": "String",
        "default": "undefined",
        "source": null
      },
      {
        "name": "scrollThreshold",
        "type": "Number",
        "default": 300,
        "source": null
      },
      {
        "name": "tabs",
        "type": "Boolean",
        "default": "false",
        "source": null
      }
    ],
    "mixins": [
      "applicationable",
      "colorable",
      "positionable",
      "ssr-bootable",
      "themeable"
    ],
    "slots": [
      "default",
      "extension"
    ]
  },
  "v-toolbar-items": {
    "props": [],
    "mixins": []
  },
  "v-toolbar-title": {
    "props": [],
    "mixins": []
  },
  "v-toolbar-side-icon": {
    "props": [],
    "mixins": []
  },
  "v-tooltip": {
    "props": [
      {
        "name": "maxWidth",
        "type": [
          "Number",
          "String"
        ],
        "default": "auto",
        "source": "menuable"
      },
      {
        "name": "color",
        "type": "String",
        "default": "undefined",
        "source": "colorable"
      },
      {
        "name": "closeDelay",
        "type": [
          "Number",
          "String"
        ],
        "default": 200,
        "source": "delayable"
      },
      {
        "name": "allowOverflow",
        "type": "Boolean",
        "default": "false",
        "source": "menuable"
      },
      {
        "name": "attach",
        "type": [
          "Boolean",
          "String",
          "Object"
        ],
        "default": false,
        "source": "detachable"
      },
      {
        "name": "activator",
        "type": "Any",
        "default": "undefined",
        "source": "menuable"
      },
      {
        "name": "absolute",
        "type": "Boolean",
        "default": "false",
        "source": "positionable"
      },
      {
        "name": "bottom",
        "type": "Boolean",
        "default": "false",
        "source": "positionable"
      },
      {
        "name": "nudgeRight",
        "type": [
          "Number",
          "String"
        ],
        "default": 0,
        "source": "menuable"
      },
      {
        "name": "fixed",
        "type": "Boolean",
        "default": "true",
        "source": "positionable"
      },
      {
        "name": "disabled",
        "type": "Boolean",
        "default": "false",
        "source": null
      },
      {
        "name": "debounce",
        "type": [
          "Number",
          "String"
        ],
        "default": 0,
        "source": null
      },
      {
        "name": "dark",
        "type": "Boolean",
        "default": "false",
        "source": "themeable"
      },
      {
        "name": "contentClass",
        "type": "Any",
        "default": "undefined",
        "source": "detachable"
      },
      {
        "name": "offsetOverflow",
        "type": "Boolean",
        "default": "false",
        "source": "menuable"
      },
      {
        "name": "light",
        "type": "Boolean",
        "default": "false",
        "source": "themeable"
      },
      {
        "name": "lazy",
        "type": "Boolean",
        "default": "false",
        "source": "bootable"
      },
      {
        "name": "left",
        "type": "Boolean",
        "default": "false",
        "source": "positionable"
      },
      {
        "name": "positionY",
        "type": "Number",
        "default": "undefined",
        "source": "menuable"
      },
      {
        "name": "nudgeBottom",
        "type": "Number",
        "default": 0,
        "source": "menuable"
      },
      {
        "name": "minWidth",
        "type": [
          "Number",
          "String"
        ],
        "default": "undefined",
        "source": "menuable"
      },
      {
        "name": "zIndex",
        "type": "Any",
        "default": "undefined",
        "source": "menuable"
      },
      {
        "name": "nudgeTop",
        "type": [
          "Number",
          "String"
        ],
        "default": 0,
        "source": "menuable"
      },
      {
        "name": "nudgeLeft",
        "type": [
          "Number",
          "String"
        ],
        "default": 0,
        "source": "menuable"
      },
      {
        "name": "nudgeWidth",
        "type": [
          "Number",
          "String"
        ],
        "default": 0,
        "source": "menuable"
      },
      {
        "name": "openDelay",
        "type": [
          "Number",
          "String"
        ],
        "default": 200,
        "source": "delayable"
      },
      {
        "name": "positionX",
        "type": "Number",
        "default": "undefined",
        "source": "menuable"
      },
      {
        "name": "right",
        "type": "Boolean",
        "default": "false",
        "source": "positionable"
      },
      {
        "name": "tag",
        "type": "String",
        "default": "span",
        "source": null
      },
      {
        "name": "top",
        "type": "Boolean",
        "default": "false",
        "source": "positionable"
      },
      {
        "name": "transition",
        "type": "String",
        "default": "undefined",
        "source": null
      },
      {
        "name": "value",
        "type": "Any",
        "default": "undefined",
        "source": "toggleable"
      }
    ],
    "mixins": [
      "bootable",
      "colorable",
      "delayable",
      "dependent",
      "detachable",
      "menuable",
      "positionable",
      "stackable",
      "themeable",
      "toggleable"
    ],
    "slots": [
      "activator",
      "default"
    ]
  },
  "v-bottom-sheet-transition": {
    "props": [
      {
        "name": "origin",
        "type": "String",
        "default": "top center 0",
        "source": null
      }
    ],
    "mixins": []
  },
  "v-carousel-transition": {
    "props": [
      {
        "name": "origin",
        "type": "String",
        "default": "top center 0",
        "source": null
      }
    ],
    "mixins": []
  },
  "v-carousel-reverse-transition": {
    "props": [
      {
        "name": "origin",
        "type": "String",
        "default": "top center 0",
        "source": null
      }
    ],
    "mixins": []
  },
  "v-dialog-transition": {
    "props": [
      {
        "name": "origin",
        "type": "String",
        "default": "top center 0",
        "source": null
      }
    ],
    "mixins": []
  },
  "v-dialog-bottom-transition": {
    "props": [
      {
        "name": "origin",
        "type": "String",
        "default": "top center 0",
        "source": null
      }
    ],
    "mixins": []
  },
  "v-fab-transition": {
    "props": [
      {
        "name": "origin",
        "type": "String",
        "default": "center center",
        "source": null
      }
    ],
    "mixins": []
  },
  "v-fade-transition": {
    "props": [
      {
        "name": "origin",
        "type": "String",
        "default": "top center 0",
        "source": null
      }
    ],
    "mixins": []
  },
  "v-menu-transition": {
    "props": [
      {
        "name": "origin",
        "type": "String",
        "default": "top center 0",
        "source": null
      }
    ],
    "mixins": []
  },
  "v-scale-transition": {
    "props": [
      {
        "name": "origin",
        "type": "String",
        "default": "top center 0",
        "source": null
      }
    ],
    "mixins": []
  },
  "v-slide-x-transition": {
    "props": [
      {
        "name": "origin",
        "type": "String",
        "default": "top center 0",
        "source": null
      }
    ],
    "mixins": []
  },
  "v-slide-x-reverse-transition": {
    "props": [
      {
        "name": "origin",
        "type": "String",
        "default": "top center 0",
        "source": null
      }
    ],
    "mixins": []
  },
  "v-slide-y-transition": {
    "props": [
      {
        "name": "origin",
        "type": "String",
        "default": "top center 0",
        "source": null
      }
    ],
    "mixins": []
  },
  "v-slide-y-reverse-transition": {
    "props": [
      {
        "name": "origin",
        "type": "String",
        "default": "top center 0",
        "source": null
      }
    ],
    "mixins": []
  },
  "v-tab-reverse-transition": {
    "props": [
      {
        "name": "origin",
        "type": "String",
        "default": "top center 0",
        "source": null
      }
    ],
    "mixins": []
  },
  "v-tab-transition": {
    "props": [
      {
        "name": "origin",
        "type": "String",
        "default": "top center 0",
        "source": null
      }
    ],
    "mixins": []
  },
  "v-expand-transition": {
    "props": [
      {
        "name": "css",
        "type": "Boolean",
        "default": "true",
        "source": null
      },
      {
        "name": "mode",
        "type": "String",
        "default": "in-out",
        "source": null
      }
    ],
    "mixins": []
  },
  "v-row-expand-transition": {
    "props": [
      {
        "name": "css",
        "type": "Boolean",
        "default": "true",
        "source": null
      },
      {
        "name": "mode",
        "type": "String",
        "default": "in-out",
        "source": null
      }
    ],
    "mixins": []
  },
  "$vuetify": {
    "functions": [
      {
        "name": "goTo",
        "signature": "(target: string | number | HTMLElement | VueComponent, options?: object) => void"
      }
    ]
  },
  "v-ripple": {
    "options": [
      {
        "name": "class",
        "default": "undefined",
        "type": "String"
      },
      {
        "name": "center",
        "default": "False",
        "type": "Boolean"
      }
    ],
    "type": "undefined"
  },
  "v-resize": {
    "options": [
      {
        "name": "modifiers.quiet",
        "default": "false",
        "type": "Boolean"
      },
      {
        "name": "value",
        "default": "undefined",
        "type": "Function"
      }
    ],
    "type": "undefined"
  },
  "v-scroll": {
    "options": [
      {
        "name": "arg:target",
        "default": "window",
        "type": "String"
      },
      {
        "name": "value",
        "default": "() => {}",
        "type": "Function"
      }
    ],
    "type": "undefined"
  },
  "v-touch": {
    "options": [
      {
        "name": "{ move, start, end }",
        "default": "undefined",
        "type": "Function"
      },
      {
        "name": "{ up, down, left, right }",
        "default": "undefined",
        "type": "Function"
      }
    ],
    "type": "undefined"
  }
}
