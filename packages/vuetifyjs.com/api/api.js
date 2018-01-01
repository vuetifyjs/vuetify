module.exports = {
  "v-app": {
    "props": [
      {
        "name": "id",
        "type": "String",
        "default": "app",
        "source": null
      },
      {
        "name": "dark",
        "type": "Boolean",
        "default": "False",
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
        "name": "value",
        "type": "Any",
        "default": "undefined",
        "source": "toggleable"
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
        "name": "transition",
        "type": "String",
        "default": "undefined",
        "source": "transitionable"
      },
      {
        "name": "dismissible",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "icon",
        "type": "String",
        "default": "undefined",
        "source": null
      },
      {
        "name": "outline",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "type",
        "type": "String",
        "default": "undefined",
        "source": null
      }
    ],
    "mixins": [
      "colorable",
      "toggleable",
      "transitionable"
    ],
    "slots": [
      "default"
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
        "default": "False",
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
        "name": "color",
        "type": "String",
        "default": "primary",
        "source": "colorable"
      },
      {
        "name": "value",
        "type": "Any",
        "default": true,
        "source": "toggleable"
      },
      {
        "name": "bottom",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "left",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "overlap",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "transition",
        "type": "String",
        "default": "fab-transition",
        "source": null
      }
    ],
    "mixins": [
      "colorable",
      "toggleable"
    ],
    "slots": [
      "default",
      "badge"
    ]
  },
  "v-bottom-nav": {
    "props": [
      {
        "name": "absolute",
        "type": "Boolean",
        "default": "False",
        "source": "applicationable"
      },
      {
        "name": "app",
        "type": "Boolean",
        "default": "False",
        "source": "applicationable"
      },
      {
        "name": "fixed",
        "type": "Boolean",
        "default": "False",
        "source": "applicationable"
      },
      {
        "name": "color",
        "type": "String",
        "default": "undefined",
        "source": "colorable"
      },
      {
        "name": "active",
        "type": [
          "Number",
          "String"
        ],
        "default": "undefined",
        "source": null
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
        "default": "False",
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
      "registerable-provide",
      "colorable"
    ],
    "slots": [
      "default"
    ]
  },
  "v-bottom-sheet": {
    "props": [
      {
        "name": "disabled",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "fullWidth",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "inset",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "lazy",
        "type": "Boolean",
        "default": "False",
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
        "default": "False",
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
      "default",
      "activator"
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
        "name": "large",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "justifyCenter",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "justifyEnd",
        "type": "Boolean",
        "default": "False",
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
        "name": "activeClass",
        "type": "String",
        "default": "breadcrumbs__item--disabled",
        "source": "routable"
      },
      {
        "name": "append",
        "type": "Boolean",
        "default": "False",
        "source": "routable"
      },
      {
        "name": "disabled",
        "type": "Boolean",
        "default": "False",
        "source": "routable"
      },
      {
        "name": "exact",
        "type": "Boolean",
        "default": "False",
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
        "name": "to",
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
        "default": "False",
        "source": "routable"
      },
      {
        "name": "replace",
        "type": "Boolean",
        "default": "False",
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
        "name": "color",
        "type": "String",
        "default": "undefined",
        "source": "colorable"
      },
      {
        "name": "activeClass",
        "type": "String",
        "default": "btn--active",
        "source": "routable"
      },
      {
        "name": "append",
        "type": "Boolean",
        "default": "False",
        "source": "routable"
      },
      {
        "name": "disabled",
        "type": "Boolean",
        "default": "False",
        "source": "routable"
      },
      {
        "name": "exact",
        "type": "Boolean",
        "default": "False",
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
        "name": "to",
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
        "default": "False",
        "source": "routable"
      },
      {
        "name": "replace",
        "type": "Boolean",
        "default": "False",
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
        "name": "absolute",
        "type": "Boolean",
        "default": "False",
        "source": "positionable"
      },
      {
        "name": "bottom",
        "type": "Boolean",
        "default": "False",
        "source": "positionable"
      },
      {
        "name": "fixed",
        "type": "Boolean",
        "default": "False",
        "source": "positionable"
      },
      {
        "name": "left",
        "type": "Boolean",
        "default": "False",
        "source": "positionable"
      },
      {
        "name": "right",
        "type": "Boolean",
        "default": "False",
        "source": "positionable"
      },
      {
        "name": "top",
        "type": "Boolean",
        "default": "False",
        "source": "positionable"
      },
      {
        "name": "dark",
        "type": "Boolean",
        "default": "False",
        "source": "themeable"
      },
      {
        "name": "light",
        "type": "Boolean",
        "default": "False",
        "source": "themeable"
      },
      {
        "name": "inputValue",
        "type": "Any",
        "default": "undefined",
        "source": "toggleable"
      },
      {
        "name": "block",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "depressed",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "fab",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "flat",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "icon",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "large",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "loading",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "outline",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "round",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "small",
        "type": "Boolean",
        "default": "False",
        "source": null
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
      "routable",
      "positionable",
      "themeable",
      "toggleable",
      "registerable-inject"
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
        "default": "False",
        "source": "themeable"
      },
      {
        "name": "light",
        "type": "Boolean",
        "default": "False",
        "source": "themeable"
      },
      {
        "name": "inputValue",
        "type": "Any",
        "default": "undefined",
        "source": null
      },
      {
        "name": "mandatory",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "multiple",
        "type": "Boolean",
        "default": "False",
        "source": null
      }
    ],
    "mixins": [
      "button-group",
      "registerable-provide",
      "themeable"
    ]
  },
  "v-card": {
    "props": [
      {
        "name": "color",
        "type": "String",
        "default": "undefined",
        "source": "colorable"
      },
      {
        "name": "activeClass",
        "type": "String",
        "default": "undefined",
        "source": "routable"
      },
      {
        "name": "append",
        "type": "Boolean",
        "default": "False",
        "source": "routable"
      },
      {
        "name": "disabled",
        "type": "Boolean",
        "default": "False",
        "source": "routable"
      },
      {
        "name": "exact",
        "type": "Boolean",
        "default": "False",
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
        "name": "to",
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
        "default": "False",
        "source": "routable"
      },
      {
        "name": "replace",
        "type": "Boolean",
        "default": "False",
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
        "default": "div",
        "source": "routable"
      },
      {
        "name": "target",
        "type": "String",
        "default": "undefined",
        "source": "routable"
      },
      {
        "name": "dark",
        "type": "Boolean",
        "default": "False",
        "source": "themeable"
      },
      {
        "name": "light",
        "type": "Boolean",
        "default": "False",
        "source": "themeable"
      },
      {
        "name": "flat",
        "type": "Boolean",
        "default": "False",
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
        "default": "False",
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
        "default": "False",
        "source": null
      },
      {
        "name": "tile",
        "type": "Boolean",
        "default": "False",
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
        "default": "False",
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
        "default": "False",
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
        "name": "lazy",
        "type": "Boolean",
        "default": "False",
        "source": "bootable"
      },
      {
        "name": "dark",
        "type": "Boolean",
        "default": "False",
        "source": "themeable"
      },
      {
        "name": "light",
        "type": "Boolean",
        "default": "False",
        "source": "themeable"
      },
      {
        "name": "cycle",
        "type": "Boolean",
        "default": "True",
        "source": null
      },
      {
        "name": "delimiterIcon",
        "type": "String",
        "default": "fiber_manual_record",
        "source": null
      },
      {
        "name": "hideControls",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "hideDelimiters",
        "type": "Boolean",
        "default": "False",
        "source": null
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
        "name": "prependIcon",
        "type": [
          "Boolean",
          "String"
        ],
        "default": "chevron_left",
        "source": null
      },
      {
        "name": "appendIcon",
        "type": [
          "Boolean",
          "String"
        ],
        "default": "chevron_right",
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
      "themeable",
      "registerable-provide"
    ],
    "slots": [
      "default"
    ]
  },
  "v-carousel-item": {
    "props": [
      {
        "name": "transition",
        "type": "String",
        "default": "tab-transition",
        "source": null
      },
      {
        "name": "reverseTransition",
        "type": "String",
        "default": "tab-reverse-transition",
        "source": null
      }
    ],
    "mixins": [
      "registerable-inject"
    ],
    "slots": [
      "default"
    ]
  },
  "v-checkbox": {
    "props": [
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
        "name": "loading",
        "type": [
          "Boolean",
          "String"
        ],
        "default": false,
        "source": "loadable"
      },
      {
        "name": "dark",
        "type": "Boolean",
        "default": "False",
        "source": "themeable"
      },
      {
        "name": "light",
        "type": "Boolean",
        "default": "False",
        "source": "themeable"
      },
      {
        "name": "error",
        "type": "Boolean",
        "default": "False",
        "source": "validatable"
      },
      {
        "name": "errorMessages",
        "type": [
          "String",
          "Array"
        ],
        "source": "validatable"
      },
      {
        "name": "rules",
        "type": "Array",
        "source": "validatable"
      },
      {
        "name": "validateOnBlur",
        "type": "Boolean",
        "default": "False",
        "source": "validatable"
      },
      {
        "name": "appendIcon",
        "type": "String",
        "default": "undefined",
        "source": "input"
      },
      {
        "name": "appendIconCb",
        "type": "Any",
        "default": "undefined",
        "source": "input"
      },
      {
        "name": "disabled",
        "type": "Boolean",
        "default": "False",
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
        "default": "False",
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
        "default": "False",
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
        "type": "Any",
        "default": "undefined",
        "source": "input"
      },
      {
        "name": "readonly",
        "type": "Boolean",
        "default": "False",
        "source": "input"
      },
      {
        "name": "required",
        "type": "Boolean",
        "default": "False",
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
        "source": "input"
      },
      {
        "name": "value",
        "type": "Any",
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
        "name": "id",
        "type": "String",
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
        "name": "falseValue",
        "type": "Any",
        "default": "undefined",
        "source": "selectable"
      },
      {
        "name": "trueValue",
        "type": "Any",
        "default": "undefined",
        "source": "selectable"
      },
      {
        "name": "indeterminate",
        "type": "Boolean",
        "default": "False",
        "source": null
      }
    ],
    "mixins": [
      "rippleable",
      "selectable",
      "input",
      "loadable",
      "themeable",
      "validatable",
      "colorable"
    ],
    "slots": [
      "label"
    ]
  },
  "v-chip": {
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
        "default": "False",
        "source": "themeable"
      },
      {
        "name": "light",
        "type": "Boolean",
        "default": "False",
        "source": "themeable"
      },
      {
        "name": "value",
        "type": "Boolean",
        "default": "True",
        "source": "toggleable"
      },
      {
        "name": "close",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "disabled",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "label",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "outline",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "selected",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "small",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "textColor",
        "type": "String",
        "default": "undefined",
        "source": null
      }
    ],
    "mixins": [
      "colorable",
      "themeable",
      "toggleable"
    ],
    "slots": [
      "default"
    ]
  },
  "v-data-iterator": {
    "props": [
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
        "name": "dark",
        "type": "Boolean",
        "default": "False",
        "source": "themeable"
      },
      {
        "name": "light",
        "type": "Boolean",
        "default": "False",
        "source": "themeable"
      },
      {
        "name": "expand",
        "type": "Boolean",
        "default": "False",
        "source": "data-iterable"
      },
      {
        "name": "hideActions",
        "type": "Boolean",
        "default": "False",
        "source": "data-iterable"
      },
      {
        "name": "disableInitialSort",
        "type": "Boolean",
        "default": "False",
        "source": "data-iterable"
      },
      {
        "name": "mustSort",
        "type": "Boolean",
        "default": "False",
        "source": "data-iterable"
      },
      {
        "name": "noResultsText",
        "type": "String",
        "default": "No matching records found",
        "source": "data-iterable"
      },
      {
        "name": "rowsPerPageItems",
        "type": "Array",
        "source": "data-iterable"
      },
      {
        "name": "rowsPerPageText",
        "type": "String",
        "default": "Items per page:",
        "source": "data-iterable"
      },
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
        "name": "search",
        "type": "Any",
        "default": "undefined",
        "source": "data-iterable"
      },
      {
        "name": "filter",
        "type": "Any",
        "source": "data-iterable"
      },
      {
        "name": "customFilter",
        "type": "Any",
        "source": "data-iterable"
      },
      {
        "name": "customSort",
        "type": "Any",
        "source": "data-iterable"
      },
      {
        "name": "value",
        "type": "Array",
        "source": "data-iterable"
      },
      {
        "name": "items",
        "type": "Array",
        "source": "data-iterable"
      },
      {
        "name": "totalItems",
        "type": "Number",
        "default": "undefined",
        "source": "data-iterable"
      },
      {
        "name": "itemKey",
        "type": "String",
        "default": "id",
        "source": "data-iterable"
      },
      {
        "name": "pagination",
        "type": "Object",
        "source": "data-iterable"
      },
      {
        "name": "contentTag",
        "type": "String",
        "default": "div",
        "source": null
      },
      {
        "name": "contentProps",
        "type": "Object",
        "default": "undefined",
        "source": null
      },
      {
        "name": "contentClass",
        "type": "String",
        "default": "undefined",
        "source": null
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
      }
    ],
    "scopedSlots": [
      {
        "name": "items",
        "props": [
          "item",
          "index",
          "selected",
          "expanded"
        ],
        "source": "data-iterable"
      },
      {
        "name": "pageText",
        "props": [
          "pageStart",
          "pageStop",
          "itemsLength"
        ],
        "source": "data-iterable"
      }
    ]
  },
  "v-data-table": {
    "props": [
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
        "name": "dark",
        "type": "Boolean",
        "default": "False",
        "source": "themeable"
      },
      {
        "name": "light",
        "type": "Boolean",
        "default": "False",
        "source": "themeable"
      },
      {
        "name": "expand",
        "type": "Boolean",
        "default": "False",
        "source": "data-iterable"
      },
      {
        "name": "hideActions",
        "type": "Boolean",
        "default": "False",
        "source": "data-iterable"
      },
      {
        "name": "disableInitialSort",
        "type": "Boolean",
        "default": "False",
        "source": "data-iterable"
      },
      {
        "name": "mustSort",
        "type": "Boolean",
        "default": "False",
        "source": "data-iterable"
      },
      {
        "name": "noResultsText",
        "type": "String",
        "default": "No matching records found",
        "source": "data-iterable"
      },
      {
        "name": "rowsPerPageItems",
        "type": "Array",
        "source": "data-iterable"
      },
      {
        "name": "rowsPerPageText",
        "type": "String",
        "default": "Rows per page:",
        "source": "data-iterable"
      },
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
        "name": "search",
        "type": "Any",
        "default": "undefined",
        "source": "data-iterable"
      },
      {
        "name": "filter",
        "type": "Any",
        "source": "data-iterable"
      },
      {
        "name": "customFilter",
        "type": "Any",
        "source": "data-iterable"
      },
      {
        "name": "customSort",
        "type": "Any",
        "source": "data-iterable"
      },
      {
        "name": "value",
        "type": "Array",
        "source": "data-iterable"
      },
      {
        "name": "items",
        "type": "Array",
        "source": "data-iterable"
      },
      {
        "name": "totalItems",
        "type": "Number",
        "default": "undefined",
        "source": "data-iterable"
      },
      {
        "name": "itemKey",
        "type": "String",
        "default": "id",
        "source": "data-iterable"
      },
      {
        "name": "pagination",
        "type": "Object",
        "source": "data-iterable"
      },
      {
        "name": "headers",
        "type": "Array",
        "source": null
      },
      {
        "name": "headerText",
        "type": "String",
        "default": "text",
        "source": null
      },
      {
        "name": "hideHeaders",
        "type": "Boolean",
        "default": "False",
        "source": null
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
      }
    ],
    "scopedSlots": [
      {
        "name": "headerCell",
        "props": [
          "header"
        ]
      },
      {
        "name": "headers",
        "props": [
          "headers",
          "indeterminate",
          "all"
        ]
      },
      {
        "name": "items",
        "props": [
          "item",
          "index",
          "selected",
          "expanded"
        ],
        "source": "data-iterable"
      },
      {
        "name": "pageText",
        "props": [
          "pageStart",
          "pageStop",
          "itemsLength"
        ],
        "source": "data-iterable"
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
        "default": "False",
        "source": null
      },
      {
        "name": "lazy",
        "type": "Boolean",
        "default": "False",
        "source": null
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
    "mixins": []
  },
  "v-table-overflow": {
    "props": [],
    "mixins": []
  },
  "v-date-picker": {
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
        "default": "False",
        "source": "themeable"
      },
      {
        "name": "light",
        "type": "Boolean",
        "default": "False",
        "source": "themeable"
      },
      {
        "name": "actions",
        "type": "Boolean",
        "default": "False",
        "source": "picker"
      },
      {
        "name": "autosave",
        "type": "Boolean",
        "default": "False",
        "source": "picker"
      },
      {
        "name": "headerColor",
        "type": "String",
        "default": "undefined",
        "source": "picker"
      },
      {
        "name": "landscape",
        "type": "Boolean",
        "default": "False",
        "source": "picker"
      },
      {
        "name": "noTitle",
        "type": "Boolean",
        "default": "False",
        "source": "picker"
      },
      {
        "name": "scrollable",
        "type": "Boolean",
        "default": "False",
        "source": "picker"
      },
      {
        "name": "value",
        "type": "String",
        "default": "undefined",
        "source": "picker"
      },
      {
        "name": "allowedDates",
        "type": [
          "Array",
          "Object",
          "Any"
        ],
        "source": null
      },
      {
        "name": "appendIcon",
        "type": "String",
        "default": "chevron_right",
        "source": null
      },
      {
        "name": "dayFormat",
        "type": "Any",
        "default": "undefined",
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
        "name": "headerDateFormat",
        "type": "Any",
        "default": "undefined",
        "source": null
      },
      {
        "name": "locale",
        "type": "String",
        "default": "en-us",
        "source": null
      },
      {
        "name": "monthFormat",
        "type": "Any",
        "default": "undefined",
        "source": null
      },
      {
        "name": "prependIcon",
        "type": "String",
        "default": "chevron_left",
        "source": null
      },
      {
        "name": "titleDateFormat",
        "type": "Any",
        "default": "undefined",
        "source": null
      },
      {
        "name": "type",
        "type": "String",
        "default": "date",
        "source": null
      },
      {
        "name": "yearFormat",
        "type": "Any",
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
    "mixins": [
      "picker",
      "colorable",
      "themeable"
    ]
  },
  "v-dialog": {
    "props": [
      {
        "name": "lazy",
        "type": "Boolean",
        "default": "False",
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
        "name": "hideOverlay",
        "type": "Boolean",
        "default": "False",
        "source": "overlayable"
      },
      {
        "name": "value",
        "type": "Any",
        "default": "undefined",
        "source": "toggleable"
      },
      {
        "name": "disabled",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "persistent",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "fullscreen",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "fullWidth",
        "type": "Boolean",
        "default": "False",
        "source": null
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
        "name": "width",
        "type": [
          "String",
          "Number"
        ],
        "default": "auto",
        "source": null
      },
      {
        "name": "scrollable",
        "type": "Boolean",
        "default": "False",
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
      }
    ],
    "mixins": [
      "dependent",
      "detachable",
      "bootable",
      "overlayable",
      "stackable",
      "toggleable"
    ],
    "slots": [
      "default",
      "activator"
    ]
  },
  "v-divider": {
    "props": [
      {
        "name": "dark",
        "type": "Boolean",
        "default": "False",
        "source": "themeable"
      },
      {
        "name": "light",
        "type": "Boolean",
        "default": "False",
        "source": "themeable"
      },
      {
        "name": "inset",
        "type": "Boolean",
        "default": "False",
        "source": null
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
        "default": "False",
        "source": "themeable"
      },
      {
        "name": "light",
        "type": "Boolean",
        "default": "False",
        "source": "themeable"
      },
      {
        "name": "expand",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "focusable",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "inset",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "popout",
        "type": "Boolean",
        "default": "False",
        "source": null
      }
    ],
    "mixins": [
      "themeable"
    ],
    "slots": [
      "default"
    ]
  },
  "v-expansion-panel-content": {
    "props": [
      {
        "name": "lazy",
        "type": "Boolean",
        "default": "False",
        "source": "bootable"
      },
      {
        "name": "value",
        "type": "Any",
        "default": "undefined",
        "source": "toggleable"
      },
      {
        "name": "hideActions",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "ripple",
        "type": "Boolean",
        "default": "False",
        "source": null
      }
    ],
    "mixins": [
      "bootable",
      "toggleable"
    ],
    "slots": [
      "default",
      "header"
    ]
  },
  "v-footer": {
    "props": [
      {
        "name": "absolute",
        "type": "Boolean",
        "default": "False",
        "source": "applicationable"
      },
      {
        "name": "app",
        "type": "Boolean",
        "default": "False",
        "source": "applicationable"
      },
      {
        "name": "fixed",
        "type": "Boolean",
        "default": "False",
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
        "default": "False",
        "source": "themeable"
      },
      {
        "name": "light",
        "type": "Boolean",
        "default": "False",
        "source": "themeable"
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
        "default": "False",
        "source": null
      }
    ],
    "mixins": [
      "applicationable",
      "colorable",
      "themeable"
    ],
    "slots": [
      "default"
    ]
  },
  "v-form": {
    "props": [
      {
        "name": "value",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "lazyValidation",
        "type": "Boolean",
        "default": "False",
        "source": null
      }
    ],
    "mixins": [],
    "slots": [
      "default"
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
        "name": "color",
        "type": "String",
        "default": "undefined",
        "source": "colorable"
      },
      {
        "name": "dark",
        "type": "Boolean",
        "default": "False",
        "source": "themeable"
      },
      {
        "name": "light",
        "type": "Boolean",
        "default": "False",
        "source": "themeable"
      },
      {
        "name": "disabled",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "large",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "left",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "medium",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "right",
        "type": "Boolean",
        "default": "False",
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
        "default": "False",
        "source": null
      },
      {
        "name": "xLarge",
        "type": "Boolean",
        "default": "False",
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
        "name": "color",
        "type": "String",
        "default": "undefined",
        "source": "colorable"
      },
      {
        "name": "activeClass",
        "type": "String",
        "default": "undefined",
        "source": "routable"
      },
      {
        "name": "append",
        "type": "Boolean",
        "default": "False",
        "source": "routable"
      },
      {
        "name": "disabled",
        "type": "Boolean",
        "default": "False",
        "source": "routable"
      },
      {
        "name": "exact",
        "type": "Boolean",
        "default": "False",
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
        "name": "to",
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
        "default": "False",
        "source": "routable"
      },
      {
        "name": "replace",
        "type": "Boolean",
        "default": "False",
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
        "default": "div",
        "source": "routable"
      },
      {
        "name": "target",
        "type": "String",
        "default": "undefined",
        "source": "routable"
      },
      {
        "name": "dark",
        "type": "Boolean",
        "default": "False",
        "source": "themeable"
      },
      {
        "name": "light",
        "type": "Boolean",
        "default": "False",
        "source": "themeable"
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
        "name": "src",
        "type": "String",
        "default": "undefined",
        "source": null
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
        "default": "False",
        "source": "themeable"
      },
      {
        "name": "light",
        "type": "Boolean",
        "default": "False",
        "source": "themeable"
      },
      {
        "name": "dense",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "expand",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "subheader",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "threeLine",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "twoLine",
        "type": "Boolean",
        "default": "False",
        "source": null
      }
    ],
    "mixins": [
      "registerable-provide",
      "themeable"
    ],
    "slots": [
      "default"
    ]
  },
  "v-list-group": {
    "props": [
      {
        "name": "lazy",
        "type": "Boolean",
        "default": "False",
        "source": "bootable"
      },
      {
        "name": "value",
        "type": "Any",
        "default": "undefined",
        "source": "toggleable"
      },
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
        "default": "False",
        "source": null
      },
      {
        "name": "group",
        "type": "String",
        "default": "undefined",
        "source": null
      },
      {
        "name": "noAction",
        "type": "Boolean",
        "default": "False",
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
        "default": "False",
        "source": null
      }
    ],
    "mixins": [
      "bootable",
      "registerable-inject",
      "toggleable"
    ]
  },
  "v-list-tile": {
    "props": [
      {
        "name": "color",
        "type": "String",
        "default": "undefined",
        "source": "colorable"
      },
      {
        "name": "activeClass",
        "type": "String",
        "default": "primary--text",
        "source": "routable"
      },
      {
        "name": "append",
        "type": "Boolean",
        "default": "False",
        "source": "routable"
      },
      {
        "name": "disabled",
        "type": "Boolean",
        "default": "False",
        "source": "routable"
      },
      {
        "name": "exact",
        "type": "Boolean",
        "default": "False",
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
        "name": "to",
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
        "default": "False",
        "source": "routable"
      },
      {
        "name": "replace",
        "type": "Boolean",
        "default": "False",
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
      },
      {
        "name": "value",
        "type": "Any",
        "default": "undefined",
        "source": "toggleable"
      },
      {
        "name": "avatar",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "inactive",
        "type": "Boolean",
        "default": "False",
        "source": null
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
        "name": "openDelay",
        "type": [
          "Number",
          "String"
        ],
        "default": 0,
        "source": "delayable"
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
        "name": "lazy",
        "type": "Boolean",
        "default": "False",
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
        "default": "False",
        "source": "positionable"
      },
      {
        "name": "bottom",
        "type": "Boolean",
        "default": "False",
        "source": "positionable"
      },
      {
        "name": "fixed",
        "type": "Boolean",
        "default": "False",
        "source": "positionable"
      },
      {
        "name": "left",
        "type": "Boolean",
        "default": "False",
        "source": "positionable"
      },
      {
        "name": "right",
        "type": "Boolean",
        "default": "False",
        "source": "positionable"
      },
      {
        "name": "top",
        "type": "Boolean",
        "default": "False",
        "source": "positionable"
      },
      {
        "name": "dark",
        "type": "Boolean",
        "default": "False",
        "source": "themeable"
      },
      {
        "name": "light",
        "type": "Boolean",
        "default": "False",
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
        "default": "False",
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
        "name": "nudgeTop",
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
        "name": "offsetOverflow",
        "type": "Boolean",
        "default": "False",
        "source": "menuable"
      },
      {
        "name": "positionX",
        "type": "Number",
        "default": "undefined",
        "source": "menuable"
      },
      {
        "name": "positionY",
        "type": "Number",
        "default": "undefined",
        "source": "menuable"
      },
      {
        "name": "zIndex",
        "type": [
          "Number",
          "String"
        ],
        "default": "undefined",
        "source": "menuable"
      },
      {
        "name": "value",
        "type": "Any",
        "default": "undefined",
        "source": "toggleable"
      },
      {
        "name": "auto",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "closeOnClick",
        "type": "Boolean",
        "default": "True",
        "source": null
      },
      {
        "name": "closeOnContentClick",
        "type": "Boolean",
        "default": "True",
        "source": null
      },
      {
        "name": "disabled",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "fullWidth",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "maxHeight",
        "type": "Any",
        "default": "auto",
        "source": null
      },
      {
        "name": "offsetX",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "offsetY",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "openOnClick",
        "type": "Boolean",
        "default": "True",
        "source": null
      },
      {
        "name": "openOnHover",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "origin",
        "type": "String",
        "default": "top left",
        "source": null
      },
      {
        "name": "transition",
        "type": [
          "Boolean",
          "String"
        ],
        "default": "menu-transition",
        "source": null
      }
    ],
    "mixins": [
      "dependent",
      "delayable",
      "detachable",
      "bootable",
      "menuable",
      "positionable",
      "stackable",
      "themeable",
      "toggleable"
    ],
    "slots": [
      "default",
      "activator"
    ]
  },
  "v-navigation-drawer": {
    "props": [
      {
        "name": "absolute",
        "type": "Boolean",
        "default": "False",
        "source": "applicationable"
      },
      {
        "name": "app",
        "type": "Boolean",
        "default": "False",
        "source": "applicationable"
      },
      {
        "name": "fixed",
        "type": "Boolean",
        "default": "False",
        "source": "applicationable"
      },
      {
        "name": "hideOverlay",
        "type": "Boolean",
        "default": "False",
        "source": "overlayable"
      },
      {
        "name": "dark",
        "type": "Boolean",
        "default": "False",
        "source": "themeable"
      },
      {
        "name": "light",
        "type": "Boolean",
        "default": "False",
        "source": "themeable"
      },
      {
        "name": "clipped",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "disableRouteWatcher",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "disableResizeWatcher",
        "type": "Boolean",
        "default": "False",
        "source": null
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
        "name": "floating",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "miniVariant",
        "type": "Boolean",
        "default": "False",
        "source": null
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
        "name": "mobileBreakPoint",
        "type": [
          "Number",
          "String"
        ],
        "default": 1264,
        "source": null
      },
      {
        "name": "permanent",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "right",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "stateless",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "temporary",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "touchless",
        "type": "Boolean",
        "default": "False",
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
      "overlayable",
      "ssr-bootable",
      "themeable"
    ],
    "slots": [
      "default"
    ]
  },
  "v-pagination": {
    "props": [
      {
        "name": "color",
        "type": "String",
        "default": "undefined",
        "source": "colorable"
      },
      {
        "name": "circle",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "disabled",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "length",
        "type": "Number",
        "default": 0,
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
        "type": "Number",
        "default": 0,
        "source": null
      }
    ],
    "mixins": [
      "colorable"
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
  "v-progress-circular": {
    "props": [
      {
        "name": "color",
        "type": "String",
        "default": "undefined",
        "source": "colorable"
      },
      {
        "name": "button",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "fill",
        "type": "String",
        "source": null
      },
      {
        "name": "indeterminate",
        "type": "Boolean",
        "default": "False",
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
        "name": "width",
        "type": "Number",
        "default": 4,
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
    "slots": [
      "default"
    ]
  },
  "v-progress-linear": {
    "props": [
      {
        "name": "color",
        "type": "String",
        "default": "primary",
        "source": "colorable"
      },
      {
        "name": "active",
        "type": "Boolean",
        "default": "True",
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
        "default": "False",
        "source": null
      },
      {
        "name": "query",
        "type": "Boolean",
        "default": "False",
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
        "name": "loading",
        "type": [
          "Boolean",
          "String"
        ],
        "default": false,
        "source": "loadable"
      },
      {
        "name": "dark",
        "type": "Boolean",
        "default": "False",
        "source": "themeable"
      },
      {
        "name": "light",
        "type": "Boolean",
        "default": "False",
        "source": "themeable"
      },
      {
        "name": "error",
        "type": "Boolean",
        "default": "False",
        "source": "validatable"
      },
      {
        "name": "errorMessages",
        "type": [
          "String",
          "Array"
        ],
        "source": "validatable"
      },
      {
        "name": "rules",
        "type": "Array",
        "source": "validatable"
      },
      {
        "name": "validateOnBlur",
        "type": "Boolean",
        "default": "False",
        "source": "validatable"
      },
      {
        "name": "appendIcon",
        "type": "String",
        "default": "undefined",
        "source": "input"
      },
      {
        "name": "appendIconCb",
        "type": "Any",
        "default": "undefined",
        "source": "input"
      },
      {
        "name": "disabled",
        "type": "Boolean",
        "default": "False",
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
        "default": "False",
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
        "default": "False",
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
        "type": "Any",
        "default": "undefined",
        "source": "input"
      },
      {
        "name": "readonly",
        "type": "Boolean",
        "default": "False",
        "source": "input"
      },
      {
        "name": "required",
        "type": "Boolean",
        "default": "False",
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
        "source": "input"
      },
      {
        "name": "value",
        "type": "Any",
        "default": "undefined",
        "source": "input"
      },
      {
        "name": "column",
        "type": "Boolean",
        "default": "True",
        "source": null
      },
      {
        "name": "inputValue",
        "type": "Any",
        "default": "undefined",
        "source": null
      },
      {
        "name": "mandatory",
        "type": "Boolean",
        "default": "True",
        "source": null
      },
      {
        "name": "name",
        "type": "String",
        "default": "undefined",
        "source": null
      },
      {
        "name": "row",
        "type": "Boolean",
        "default": "False",
        "source": null
      }
    ],
    "mixins": [
      "input",
      "loadable",
      "themeable",
      "validatable",
      "registerable-provide"
    ],
    "slots": [
      "label"
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
        "default": "False",
        "source": "themeable"
      },
      {
        "name": "light",
        "type": "Boolean",
        "default": "False",
        "source": "themeable"
      },
      {
        "name": "disabled",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "value",
        "type": "Any",
        "default": "undefined",
        "source": null
      },
      {
        "name": "label",
        "type": "String",
        "default": "undefined",
        "source": null
      }
    ],
    "mixins": [
      "colorable",
      "rippleable",
      "registerable-inject",
      "tab-focusable",
      "themeable"
    ]
  },
  "v-select": {
    "props": [
      {
        "name": "filter",
        "type": "Any",
        "source": null
      },
      {
        "name": "color",
        "type": "String",
        "default": "undefined",
        "source": "colorable"
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
        "name": "dark",
        "type": "Boolean",
        "default": "False",
        "source": "themeable"
      },
      {
        "name": "light",
        "type": "Boolean",
        "default": "False",
        "source": "themeable"
      },
      {
        "name": "error",
        "type": "Boolean",
        "default": "False",
        "source": "validatable"
      },
      {
        "name": "errorMessages",
        "type": [
          "String",
          "Array"
        ],
        "source": "validatable"
      },
      {
        "name": "rules",
        "type": "Array",
        "source": "validatable"
      },
      {
        "name": "validateOnBlur",
        "type": "Boolean",
        "default": "False",
        "source": "validatable"
      },
      {
        "name": "appendIcon",
        "type": "String",
        "default": "arrow_drop_down",
        "source": "input"
      },
      {
        "name": "appendIconCb",
        "type": "Any",
        "default": "undefined",
        "source": "input"
      },
      {
        "name": "disabled",
        "type": "Boolean",
        "default": "False",
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
        "default": "False",
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
        "default": "False",
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
        "type": "Any",
        "default": "undefined",
        "source": "input"
      },
      {
        "name": "readonly",
        "type": "Boolean",
        "default": "False",
        "source": "input"
      },
      {
        "name": "required",
        "type": "Boolean",
        "default": "False",
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
        "source": "input"
      },
      {
        "name": "value",
        "type": "Any",
        "default": "undefined",
        "source": "input"
      },
      {
        "name": "dontFillMaskBlanks",
        "type": "Boolean",
        "default": "False",
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
        "default": "False",
        "source": "maskable"
      },
      {
        "name": "attach",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "auto",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "autocomplete",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "browserAutocomplete",
        "type": "String",
        "default": "on",
        "source": null
      },
      {
        "name": "cacheItems",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "chips",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "clearable",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "combobox",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "contentClass",
        "type": "String",
        "default": "undefined",
        "source": null
      },
      {
        "name": "debounceSearch",
        "type": [
          "Number",
          "String"
        ],
        "default": 200,
        "source": null
      },
      {
        "name": "deletableChips",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "dense",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "editable",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "hideSelected",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "items",
        "type": "Array",
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
        "name": "multiple",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "multiLine",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "openOnClear",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "overflow",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "returnObject",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "searchInput",
        "type": "Any",
        "default": "undefined",
        "source": null
      },
      {
        "name": "segmented",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "singleLine",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "tags",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "valueComparator",
        "type": "Any",
        "source": null
      },
      {
        "name": "flat",
        "type": "Boolean",
        "default": "False",
        "source": "soloable"
      },
      {
        "name": "soloInverted",
        "type": "Boolean",
        "default": "False",
        "source": "soloable"
      },
      {
        "name": "solo",
        "type": "Boolean",
        "default": "False",
        "source": "soloable"
      }
    ],
    "mixins": [
      "colorable",
      "dependent",
      "filterable",
      "input",
      "loadable",
      "themeable",
      "validatable",
      "maskable",
      "soloable"
    ],
    "slots": [
      "label",
      "progress",
      "noData"
    ],
    "scopedSlots": [
      "selection",
      "item"
    ]
  },
  "v-slider": {
    "props": [
      {
        "name": "color",
        "type": "String",
        "default": "undefined",
        "source": "colorable"
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
        "name": "dark",
        "type": "Boolean",
        "default": "False",
        "source": "themeable"
      },
      {
        "name": "light",
        "type": "Boolean",
        "default": "False",
        "source": "themeable"
      },
      {
        "name": "error",
        "type": "Boolean",
        "default": "False",
        "source": "validatable"
      },
      {
        "name": "errorMessages",
        "type": [
          "String",
          "Array"
        ],
        "source": "validatable"
      },
      {
        "name": "rules",
        "type": "Array",
        "source": "validatable"
      },
      {
        "name": "validateOnBlur",
        "type": "Boolean",
        "default": "False",
        "source": "validatable"
      },
      {
        "name": "appendIcon",
        "type": "String",
        "default": "undefined",
        "source": "input"
      },
      {
        "name": "appendIconCb",
        "type": "Any",
        "default": "undefined",
        "source": "input"
      },
      {
        "name": "disabled",
        "type": "Boolean",
        "default": "False",
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
        "default": "False",
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
        "default": "False",
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
        "type": "Any",
        "default": "undefined",
        "source": "input"
      },
      {
        "name": "readonly",
        "type": "Boolean",
        "default": "False",
        "source": "input"
      },
      {
        "name": "required",
        "type": "Boolean",
        "default": "False",
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
        "name": "min",
        "type": [
          "Number",
          "String"
        ],
        "default": 0,
        "source": null
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
        "default": "False",
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
        "default": "False",
        "source": null
      },
      {
        "name": "trackColor",
        "type": "String",
        "default": "undefined",
        "source": null
      }
    ],
    "mixins": [
      "colorable",
      "input",
      "loadable",
      "themeable",
      "validatable"
    ]
  },
  "v-snackbar": {
    "props": [
      {
        "name": "color",
        "type": "String",
        "default": "undefined",
        "source": "colorable"
      },
      {
        "name": "value",
        "type": "Any",
        "default": "undefined",
        "source": "toggleable"
      },
      {
        "name": "absolute",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "bottom",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "left",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "multiLine",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "right",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "top",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "timeout",
        "type": "Number",
        "default": 6000,
        "source": null
      },
      {
        "name": "vertical",
        "type": "Boolean",
        "default": "False",
        "source": null
      }
    ],
    "mixins": [
      "colorable",
      "toggleable"
    ],
    "slots": [
      "default"
    ]
  },
  "v-speed-dial": {
    "props": [
      {
        "name": "absolute",
        "type": "Boolean",
        "default": "False",
        "source": "positionable"
      },
      {
        "name": "bottom",
        "type": "Boolean",
        "default": "False",
        "source": "positionable"
      },
      {
        "name": "fixed",
        "type": "Boolean",
        "default": "False",
        "source": "positionable"
      },
      {
        "name": "left",
        "type": "Boolean",
        "default": "False",
        "source": "positionable"
      },
      {
        "name": "right",
        "type": "Boolean",
        "default": "False",
        "source": "positionable"
      },
      {
        "name": "top",
        "type": "Boolean",
        "default": "False",
        "source": "positionable"
      },
      {
        "name": "value",
        "type": "Any",
        "default": "undefined",
        "source": "toggleable"
      },
      {
        "name": "direction",
        "type": "String",
        "default": "top",
        "source": null
      },
      {
        "name": "hover",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "transition",
        "type": "String",
        "default": "scale-transition",
        "source": null
      }
    ],
    "mixins": [
      "positionable",
      "toggleable"
    ]
  },
  "v-stepper": {
    "props": [
      {
        "name": "dark",
        "type": "Boolean",
        "default": "False",
        "source": "themeable"
      },
      {
        "name": "light",
        "type": "Boolean",
        "default": "False",
        "source": "themeable"
      },
      {
        "name": "nonLinear",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "altLabels",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "vertical",
        "type": "Boolean",
        "default": "False",
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
      "themeable"
    ],
    "slots": [
      "default"
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
        "default": "False",
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
        "name": "errorIcon",
        "type": "String",
        "default": "warning",
        "source": null
      },
      {
        "name": "editable",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "rules",
        "type": "Array",
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
        "default": "False",
        "source": "themeable"
      },
      {
        "name": "light",
        "type": "Boolean",
        "default": "False",
        "source": "themeable"
      },
      {
        "name": "inset",
        "type": "Boolean",
        "default": "False",
        "source": null
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
        "name": "ripple",
        "type": [
          "Boolean",
          "Object"
        ],
        "default": true,
        "source": "rippleable"
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
        "name": "dark",
        "type": "Boolean",
        "default": "False",
        "source": "themeable"
      },
      {
        "name": "light",
        "type": "Boolean",
        "default": "False",
        "source": "themeable"
      },
      {
        "name": "error",
        "type": "Boolean",
        "default": "False",
        "source": "validatable"
      },
      {
        "name": "errorMessages",
        "type": [
          "String",
          "Array"
        ],
        "source": "validatable"
      },
      {
        "name": "rules",
        "type": "Array",
        "source": "validatable"
      },
      {
        "name": "validateOnBlur",
        "type": "Boolean",
        "default": "False",
        "source": "validatable"
      },
      {
        "name": "appendIcon",
        "type": "String",
        "default": "undefined",
        "source": "input"
      },
      {
        "name": "appendIconCb",
        "type": "Any",
        "default": "undefined",
        "source": "input"
      },
      {
        "name": "disabled",
        "type": "Boolean",
        "default": "False",
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
        "default": "False",
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
        "default": "False",
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
        "type": "Any",
        "default": "undefined",
        "source": "input"
      },
      {
        "name": "readonly",
        "type": "Boolean",
        "default": "False",
        "source": "input"
      },
      {
        "name": "required",
        "type": "Boolean",
        "default": "False",
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
        "source": "input"
      },
      {
        "name": "value",
        "type": "Any",
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
        "name": "id",
        "type": "String",
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
        "name": "falseValue",
        "type": "Any",
        "default": "undefined",
        "source": "selectable"
      },
      {
        "name": "trueValue",
        "type": "Any",
        "default": "undefined",
        "source": "selectable"
      }
    ],
    "mixins": [
      "rippleable",
      "selectable",
      "input",
      "loadable",
      "themeable",
      "validatable",
      "colorable"
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
        "default": "False",
        "source": "applicationable"
      },
      {
        "name": "app",
        "type": "Boolean",
        "default": "False",
        "source": "applicationable"
      },
      {
        "name": "fixed",
        "type": "Boolean",
        "default": "False",
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
        "default": "False",
        "source": "themeable"
      },
      {
        "name": "light",
        "type": "Boolean",
        "default": "False",
        "source": "themeable"
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
        "name": "lightsOut",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "status",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "window",
        "type": "Boolean",
        "default": "False",
        "source": null
      }
    ],
    "mixins": [
      "applicationable",
      "colorable",
      "themeable"
    ]
  },
  "v-tabs": {
    "props": [
      {
        "name": "color",
        "type": "String",
        "default": "undefined",
        "source": "colorable"
      },
      {
        "name": "alignWithTitle",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "appendIcon",
        "type": "String",
        "default": "chevron_right",
        "source": null
      },
      {
        "name": "centered",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "fixedTabs",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "grow",
        "type": "Boolean",
        "default": "False",
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
        "default": "False",
        "source": null
      },
      {
        "name": "iconsAndText",
        "type": "Boolean",
        "default": "False",
        "source": null
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
        "name": "prependIcon",
        "type": "String",
        "default": "chevron_left",
        "source": null
      },
      {
        "name": "right",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "showArrows",
        "type": "Boolean",
        "default": "False",
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
      },
      {
        "name": "dark",
        "type": "Boolean",
        "default": "False",
        "source": "themeable"
      },
      {
        "name": "light",
        "type": "Boolean",
        "default": "False",
        "source": "themeable"
      }
    ],
    "mixins": [
      "registerable-provide",
      "colorable",
      "ssr-bootable",
      "themeable"
    ]
  },
  "v-tab": {
    "props": [
      {
        "name": "activeClass",
        "type": "String",
        "default": "tabs__item--active",
        "source": "routable"
      },
      {
        "name": "append",
        "type": "Boolean",
        "default": "False",
        "source": "routable"
      },
      {
        "name": "disabled",
        "type": "Boolean",
        "default": "False",
        "source": "routable"
      },
      {
        "name": "exact",
        "type": "Boolean",
        "default": "False",
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
        "name": "to",
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
        "default": "False",
        "source": "routable"
      },
      {
        "name": "replace",
        "type": "Boolean",
        "default": "False",
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
      "registerable-inject",
      "routable"
    ]
  },
  "v-tabs-items": {
    "props": [
      {
        "name": "cycle",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "touchless",
        "type": "Boolean",
        "default": "False",
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
      "registerable-provide"
    ]
  },
  "v-tab-item": {
    "props": [
      {
        "name": "lazy",
        "type": "Boolean",
        "default": "False",
        "source": "bootable"
      },
      {
        "name": "id",
        "type": "String",
        "default": "undefined",
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
      },
      {
        "name": "reverseTransition",
        "type": [
          "Boolean",
          "String"
        ],
        "default": "tab-reverse-transition",
        "source": null
      }
    ],
    "mixins": [
      "bootable",
      "registerable-inject"
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
        "name": "color",
        "type": "String",
        "default": "primary",
        "source": "colorable"
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
        "name": "dark",
        "type": "Boolean",
        "default": "False",
        "source": "themeable"
      },
      {
        "name": "light",
        "type": "Boolean",
        "default": "False",
        "source": "themeable"
      },
      {
        "name": "error",
        "type": "Boolean",
        "default": "False",
        "source": "validatable"
      },
      {
        "name": "errorMessages",
        "type": [
          "String",
          "Array"
        ],
        "source": "validatable"
      },
      {
        "name": "rules",
        "type": "Array",
        "source": "validatable"
      },
      {
        "name": "validateOnBlur",
        "type": "Boolean",
        "default": "False",
        "source": "validatable"
      },
      {
        "name": "appendIcon",
        "type": "String",
        "default": "undefined",
        "source": "input"
      },
      {
        "name": "appendIconCb",
        "type": "Any",
        "default": "undefined",
        "source": "input"
      },
      {
        "name": "disabled",
        "type": "Boolean",
        "default": "False",
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
        "default": "False",
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
        "default": "False",
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
        "type": "Any",
        "default": "undefined",
        "source": "input"
      },
      {
        "name": "readonly",
        "type": "Boolean",
        "default": "False",
        "source": "input"
      },
      {
        "name": "required",
        "type": "Boolean",
        "default": "False",
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
        "source": "input"
      },
      {
        "name": "value",
        "type": "Any",
        "default": "undefined",
        "source": "input"
      },
      {
        "name": "dontFillMaskBlanks",
        "type": "Boolean",
        "default": "False",
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
        "default": "False",
        "source": "maskable"
      },
      {
        "name": "flat",
        "type": "Boolean",
        "default": "False",
        "source": "soloable"
      },
      {
        "name": "soloInverted",
        "type": "Boolean",
        "default": "False",
        "source": "soloable"
      },
      {
        "name": "solo",
        "type": "Boolean",
        "default": "False",
        "source": "soloable"
      },
      {
        "name": "autofocus",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "autoGrow",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "box",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "clearable",
        "type": "Boolean",
        "default": "False",
        "source": null
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
        "default": "False",
        "source": null
      },
      {
        "name": "multiLine",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "prefix",
        "type": "String",
        "default": "undefined",
        "source": null
      },
      {
        "name": "rows",
        "type": "Any",
        "default": 5,
        "source": null
      },
      {
        "name": "singleLine",
        "type": "Boolean",
        "default": "False",
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
        "default": "False",
        "source": null
      },
      {
        "name": "type",
        "type": "String",
        "default": "text",
        "source": null
      }
    ],
    "mixins": [
      "colorable",
      "input",
      "loadable",
      "themeable",
      "validatable",
      "maskable",
      "soloable"
    ]
  },
  "v-time-picker": {
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
        "default": "False",
        "source": "themeable"
      },
      {
        "name": "light",
        "type": "Boolean",
        "default": "False",
        "source": "themeable"
      },
      {
        "name": "actions",
        "type": "Boolean",
        "default": "False",
        "source": "picker"
      },
      {
        "name": "autosave",
        "type": "Boolean",
        "default": "False",
        "source": "picker"
      },
      {
        "name": "headerColor",
        "type": "String",
        "default": "undefined",
        "source": "picker"
      },
      {
        "name": "landscape",
        "type": "Boolean",
        "default": "False",
        "source": "picker"
      },
      {
        "name": "noTitle",
        "type": "Boolean",
        "default": "False",
        "source": "picker"
      },
      {
        "name": "scrollable",
        "type": "Boolean",
        "default": "False",
        "source": "picker"
      },
      {
        "name": "value",
        "type": "Any",
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
        "name": "allowedHours",
        "type": [
          "Array",
          "Object",
          "Any"
        ],
        "source": null
      },
      {
        "name": "allowedMinutes",
        "type": [
          "Array",
          "Object",
          "Any"
        ],
        "source": null
      }
    ],
    "mixins": [
      "picker",
      "colorable",
      "themeable"
    ]
  },
  "v-toolbar": {
    "props": [
      {
        "name": "absolute",
        "type": "Boolean",
        "default": "False",
        "source": "applicationable"
      },
      {
        "name": "app",
        "type": "Boolean",
        "default": "False",
        "source": "applicationable"
      },
      {
        "name": "fixed",
        "type": "Boolean",
        "default": "False",
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
        "default": "False",
        "source": "themeable"
      },
      {
        "name": "light",
        "type": "Boolean",
        "default": "False",
        "source": "themeable"
      },
      {
        "name": "card",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "clippedLeft",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "clippedRight",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "dense",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "extended",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
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
        "name": "flat",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "floating",
        "type": "Boolean",
        "default": "False",
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
        "name": "invertedScroll",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "manualScroll",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "prominent",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "scrollOffScreen",
        "type": "Boolean",
        "default": "False",
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
        "default": "False",
        "source": null
      }
    ],
    "mixins": [
      "applicationable",
      "colorable",
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
        "name": "color",
        "type": "String",
        "default": "undefined",
        "source": "colorable"
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
        "name": "closeDelay",
        "type": [
          "Number",
          "String"
        ],
        "default": 200,
        "source": "delayable"
      },
      {
        "name": "lazy",
        "type": "Boolean",
        "default": "False",
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
        "default": "False",
        "source": "positionable"
      },
      {
        "name": "bottom",
        "type": "Boolean",
        "default": "False",
        "source": "positionable"
      },
      {
        "name": "fixed",
        "type": "Boolean",
        "default": "True",
        "source": "positionable"
      },
      {
        "name": "left",
        "type": "Boolean",
        "default": "False",
        "source": "positionable"
      },
      {
        "name": "right",
        "type": "Boolean",
        "default": "False",
        "source": "positionable"
      },
      {
        "name": "top",
        "type": "Boolean",
        "default": "False",
        "source": "positionable"
      },
      {
        "name": "dark",
        "type": "Boolean",
        "default": "False",
        "source": "themeable"
      },
      {
        "name": "light",
        "type": "Boolean",
        "default": "False",
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
        "default": "False",
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
        "name": "nudgeTop",
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
        "name": "offsetOverflow",
        "type": "Boolean",
        "default": "False",
        "source": "menuable"
      },
      {
        "name": "positionX",
        "type": "Number",
        "default": "undefined",
        "source": "menuable"
      },
      {
        "name": "positionY",
        "type": "Number",
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
        "name": "value",
        "type": "Any",
        "default": "undefined",
        "source": "toggleable"
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
        "name": "disabled",
        "type": "Boolean",
        "default": "False",
        "source": null
      },
      {
        "name": "tag",
        "type": "String",
        "default": "span",
        "source": null
      },
      {
        "name": "transition",
        "type": "String",
        "default": "undefined",
        "source": null
      }
    ],
    "mixins": [
      "colorable",
      "delayable",
      "dependent",
      "detachable",
      "bootable",
      "menuable",
      "positionable",
      "stackable",
      "themeable",
      "toggleable"
    ],
    "slots": [
      "default",
      "activator"
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
        "default": "True",
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
        "default": "True",
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
  }
}
