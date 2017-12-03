module.exports = {
  "v-app": {
    "props": [
      {
        "name": "id",
        "type": "String",
        "default": "app"
      },
      {
        "name": "dark",
        "type": "Boolean",
        "default": "False"
      }
    ],
    "slots": [
      "default"
    ]
  },
  "v-alert": {
    "props": [
      {
        "name": "color",
        "type": "String",
        "default": "undefined"
      },
      {
        "name": "value",
        "type": "Any",
        "default": "undefined"
      },
      {
        "name": "mode",
        "type": "String",
        "default": "undefined"
      },
      {
        "name": "origin",
        "type": "String",
        "default": "undefined"
      },
      {
        "name": "transition",
        "type": "String",
        "default": "undefined"
      },
      {
        "name": "dismissible",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "icon",
        "type": "String",
        "default": "undefined"
      },
      {
        "name": "outline",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "type",
        "type": "String",
        "default": "undefined"
      }
    ],
    "slots": [
      "default"
    ],
    "events": [
      "input"
    ]
  },
  "v-avatar": {
    "props": [
      {
        "name": "color",
        "type": "String",
        "default": "undefined"
      },
      {
        "name": "size",
        "type": [
          "Number",
          "String"
        ],
        "default": 48
      },
      {
        "name": "tile",
        "type": "Boolean",
        "default": "False"
      }
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
        "default": "primary"
      },
      {
        "name": "value",
        "type": "Any",
        "default": true
      },
      {
        "name": "bottom",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "left",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "overlap",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "transition",
        "type": "String",
        "default": "fab-transition"
      }
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
        "default": "False"
      },
      {
        "name": "app",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "fixed",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "color",
        "type": "String",
        "default": "undefined"
      },
      {
        "name": "active",
        "type": [
          "Number",
          "String"
        ],
        "default": "undefined"
      },
      {
        "name": "height",
        "type": [
          "Number",
          "String"
        ],
        "default": 48
      },
      {
        "name": "shift",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "value",
        "type": "Any",
        "default": "undefined"
      }
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
        "default": "False"
      },
      {
        "name": "fullWidth",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "inset",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "lazy",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "maxWidth",
        "type": [
          "String",
          "Number"
        ],
        "default": "auto"
      },
      {
        "name": "persistent",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "value",
        "type": "Any",
        "default": "undefined"
      }
    ],
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
        "default": "/"
      },
      {
        "name": "large",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "justifyCenter",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "justifyEnd",
        "type": "Boolean",
        "default": "False"
      }
    ],
    "slots": [
      "default"
    ]
  },
  "v-breadcrumbs-item": {
    "props": [
      {
        "name": "activeClass",
        "type": "String",
        "default": "breadcrumbs__item--disabled"
      },
      {
        "name": "append",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "disabled",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "exact",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "exactActiveClass",
        "type": "String",
        "default": "undefined"
      },
      {
        "name": "href",
        "type": [
          "String",
          "Object"
        ],
        "default": "undefined"
      },
      {
        "name": "to",
        "type": [
          "String",
          "Object"
        ],
        "default": "undefined"
      },
      {
        "name": "nuxt",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "replace",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "ripple",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "tag",
        "type": "String",
        "default": "undefined"
      },
      {
        "name": "target",
        "type": "String",
        "default": "undefined"
      }
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
        "default": "undefined"
      },
      {
        "name": "activeClass",
        "type": "String",
        "default": "btn--active"
      },
      {
        "name": "append",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "disabled",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "exact",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "exactActiveClass",
        "type": "String",
        "default": "undefined"
      },
      {
        "name": "href",
        "type": [
          "String",
          "Object"
        ],
        "default": "undefined"
      },
      {
        "name": "to",
        "type": [
          "String",
          "Object"
        ],
        "default": "undefined"
      },
      {
        "name": "nuxt",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "replace",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "ripple",
        "type": [
          "Boolean",
          "Object"
        ],
        "default": true
      },
      {
        "name": "tag",
        "type": "String",
        "default": "button"
      },
      {
        "name": "target",
        "type": "String",
        "default": "undefined"
      },
      {
        "name": "absolute",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "bottom",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "fixed",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "left",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "right",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "top",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "dark",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "light",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "inputValue",
        "type": "Any",
        "default": "undefined"
      },
      {
        "name": "block",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "depressed",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "fab",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "flat",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "icon",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "large",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "loading",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "outline",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "round",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "small",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "type",
        "type": "String",
        "default": "button"
      },
      {
        "name": "value",
        "type": "Any",
        "default": "undefined"
      }
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
        "default": "False"
      },
      {
        "name": "light",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "inputValue",
        "type": "Any",
        "default": "undefined"
      },
      {
        "name": "mandatory",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "multiple",
        "type": "Boolean",
        "default": "False"
      }
    ]
  },
  "v-card": {
    "props": [
      {
        "name": "color",
        "type": "String",
        "default": "undefined"
      },
      {
        "name": "activeClass",
        "type": "String",
        "default": "undefined"
      },
      {
        "name": "append",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "disabled",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "exact",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "exactActiveClass",
        "type": "String",
        "default": "undefined"
      },
      {
        "name": "href",
        "type": [
          "String",
          "Object"
        ],
        "default": "undefined"
      },
      {
        "name": "to",
        "type": [
          "String",
          "Object"
        ],
        "default": "undefined"
      },
      {
        "name": "nuxt",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "replace",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "ripple",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "tag",
        "type": "String",
        "default": "div"
      },
      {
        "name": "target",
        "type": "String",
        "default": "undefined"
      },
      {
        "name": "dark",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "light",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "flat",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "height",
        "type": "String",
        "default": "auto"
      },
      {
        "name": "hover",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "img",
        "type": "String",
        "default": "undefined"
      },
      {
        "name": "raised",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "tile",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "width",
        "type": [
          "String",
          "Number"
        ],
        "default": "undefined"
      }
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
        "default": "False"
      },
      {
        "name": "height",
        "type": [
          "Number",
          "String"
        ],
        "default": "auto"
      },
      {
        "name": "src",
        "type": "String",
        "default": "undefined"
      }
    ]
  },
  "v-card-title": {
    "props": [
      {
        "name": "primaryTitle",
        "type": "Boolean",
        "default": "False"
      }
    ]
  },
  "v-card-actions": {
    "props": []
  },
  "v-card-text": {
    "props": []
  },
  "v-carousel": {
    "props": [
      {
        "name": "lazy",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "dark",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "light",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "cycle",
        "type": "Boolean",
        "default": "True"
      },
      {
        "name": "delimiterIcon",
        "type": "String",
        "default": "fiber_manual_record"
      },
      {
        "name": "hideControls",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "hideDelimiters",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "interval",
        "type": [
          "Number",
          "String"
        ],
        "default": 6000
      },
      {
        "name": "prependIcon",
        "type": [
          "Boolean",
          "String"
        ],
        "default": "chevron_left"
      },
      {
        "name": "appendIcon",
        "type": [
          "Boolean",
          "String"
        ],
        "default": "chevron_right"
      },
      {
        "name": "value",
        "type": "Number",
        "default": "undefined"
      }
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
        "default": "tab-transition"
      },
      {
        "name": "reverseTransition",
        "type": "String",
        "default": "tab-reverse-transition"
      }
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
        "default": true
      },
      {
        "name": "loading",
        "type": [
          "Boolean",
          "String"
        ],
        "default": false
      },
      {
        "name": "dark",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "light",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "error",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "errorMessages",
        "type": [
          "String",
          "Array"
        ]
      },
      {
        "name": "rules",
        "type": "Array"
      },
      {
        "name": "validateOnBlur",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "appendIcon",
        "type": "String",
        "default": "undefined"
      },
      {
        "name": "appendIconCb",
        "type": "Any",
        "default": "undefined"
      },
      {
        "name": "disabled",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "hint",
        "type": "String",
        "default": "undefined"
      },
      {
        "name": "hideDetails",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "label",
        "type": "String",
        "default": "undefined"
      },
      {
        "name": "persistentHint",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "placeholder",
        "type": "String",
        "default": "undefined"
      },
      {
        "name": "prependIcon",
        "type": "String",
        "default": "undefined"
      },
      {
        "name": "prependIconCb",
        "type": "Any",
        "default": "undefined"
      },
      {
        "name": "readonly",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "required",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "tabindex",
        "type": "Any",
        "default": 0
      },
      {
        "name": "toggleKeys",
        "type": "Array"
      },
      {
        "name": "value",
        "type": "Any",
        "default": "undefined"
      },
      {
        "name": "color",
        "type": "String",
        "default": "undefined"
      },
      {
        "name": "id",
        "type": "String",
        "default": "undefined"
      },
      {
        "name": "inputValue",
        "type": "Any",
        "default": "undefined"
      },
      {
        "name": "falseValue",
        "type": "Any",
        "default": "undefined"
      },
      {
        "name": "trueValue",
        "type": "Any",
        "default": "undefined"
      },
      {
        "name": "indeterminate",
        "type": "Boolean",
        "default": "False"
      }
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
        "default": "undefined"
      },
      {
        "name": "dark",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "light",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "value",
        "type": "Boolean",
        "default": "True"
      },
      {
        "name": "close",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "disabled",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "label",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "outline",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "selected",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "small",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "textColor",
        "type": "String",
        "default": "undefined"
      }
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
        "default": "No data available"
      },
      {
        "name": "loading",
        "type": [
          "Boolean",
          "String"
        ],
        "default": false
      },
      {
        "name": "dark",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "light",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "expand",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "hideActions",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "disableInitialSort",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "mustSort",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "noResultsText",
        "type": "String",
        "default": "No matching records found"
      },
      {
        "name": "rowsPerPageItems",
        "type": "Array"
      },
      {
        "name": "rowsPerPageText",
        "type": "String",
        "default": "Items per page:"
      },
      {
        "name": "selectAll",
        "type": [
          "Boolean",
          "String"
        ],
        "default": "undefined"
      },
      {
        "name": "search",
        "type": "Any",
        "default": "undefined"
      },
      {
        "name": "filter",
        "type": "Any"
      },
      {
        "name": "customFilter",
        "type": "Any"
      },
      {
        "name": "customSort",
        "type": "Any"
      },
      {
        "name": "value",
        "type": "Array"
      },
      {
        "name": "items",
        "type": "Array"
      },
      {
        "name": "totalItems",
        "type": "Number",
        "default": "undefined"
      },
      {
        "name": "itemKey",
        "type": "String",
        "default": "id"
      },
      {
        "name": "pagination",
        "type": "Object"
      },
      {
        "name": "contentTag",
        "type": "String",
        "default": "div"
      },
      {
        "name": "contentProps",
        "type": "Object",
        "default": "undefined"
      },
      {
        "name": "contentClass",
        "type": "String",
        "default": "undefined"
      }
    ]
  },
  "v-data-table": {
    "props": [
      {
        "name": "noDataText",
        "type": "String",
        "default": "No data available"
      },
      {
        "name": "loading",
        "type": [
          "Boolean",
          "String"
        ],
        "default": false
      },
      {
        "name": "dark",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "light",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "expand",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "hideActions",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "disableInitialSort",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "mustSort",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "noResultsText",
        "type": "String",
        "default": "No matching records found"
      },
      {
        "name": "rowsPerPageItems",
        "type": "Array"
      },
      {
        "name": "rowsPerPageText",
        "type": "String",
        "default": "Rows per page:"
      },
      {
        "name": "selectAll",
        "type": [
          "Boolean",
          "String"
        ],
        "default": "undefined"
      },
      {
        "name": "search",
        "type": "Any",
        "default": "undefined"
      },
      {
        "name": "filter",
        "type": "Any"
      },
      {
        "name": "customFilter",
        "type": "Any"
      },
      {
        "name": "customSort",
        "type": "Any"
      },
      {
        "name": "value",
        "type": "Array"
      },
      {
        "name": "items",
        "type": "Array"
      },
      {
        "name": "totalItems",
        "type": "Number",
        "default": "undefined"
      },
      {
        "name": "itemKey",
        "type": "String",
        "default": "id"
      },
      {
        "name": "pagination",
        "type": "Object"
      },
      {
        "name": "headers",
        "type": "Array"
      },
      {
        "name": "headerText",
        "type": "String",
        "default": "text"
      },
      {
        "name": "hideHeaders",
        "type": "Boolean",
        "default": "False"
      }
    ],
    "scopedSlots": [
      "headerCell",
      "headers",
      "items",
      "pageText"
    ]
  },
  "v-edit-dialog": {
    "props": [
      {
        "name": "cancelText",
        "type": "Any",
        "default": "Cancel"
      },
      {
        "name": "large",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "lazy",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "saveText",
        "type": "Any",
        "default": "Save"
      },
      {
        "name": "transition",
        "type": "String",
        "default": "slide-x-reverse-transition"
      }
    ]
  },
  "v-table-overflow": {
    "props": []
  },
  "v-date-picker": {
    "props": [
      {
        "name": "color",
        "type": "String",
        "default": "undefined"
      },
      {
        "name": "dark",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "light",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "actions",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "autosave",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "headerColor",
        "type": "String",
        "default": "undefined"
      },
      {
        "name": "landscape",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "noTitle",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "scrollable",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "value",
        "type": "String",
        "default": "undefined"
      },
      {
        "name": "allowedDates",
        "type": [
          "Array",
          "Object",
          "Any"
        ]
      },
      {
        "name": "dayFormat",
        "type": "Any",
        "default": "undefined"
      },
      {
        "name": "firstDayOfWeek",
        "type": [
          "String",
          "Number"
        ],
        "default": 0
      },
      {
        "name": "headerDateFormat",
        "type": "Any",
        "default": "undefined"
      },
      {
        "name": "locale",
        "type": "String",
        "default": "en-us"
      },
      {
        "name": "monthFormat",
        "type": "Any",
        "default": "undefined"
      },
      {
        "name": "titleDateFormat",
        "type": "Any",
        "default": "undefined"
      },
      {
        "name": "type",
        "type": "String",
        "default": "date"
      },
      {
        "name": "yearFormat",
        "type": "Any",
        "default": "undefined"
      },
      {
        "name": "yearIcon",
        "type": "String",
        "default": "undefined"
      }
    ]
  },
  "v-dialog": {
    "props": [
      {
        "name": "lazy",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "contentClass",
        "type": "Any",
        "default": "undefined"
      },
      {
        "name": "hideOverlay",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "value",
        "type": "Any",
        "default": "undefined"
      },
      {
        "name": "disabled",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "persistent",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "fullscreen",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "fullWidth",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "maxWidth",
        "type": [
          "String",
          "Number"
        ],
        "default": "none"
      },
      {
        "name": "origin",
        "type": "String",
        "default": "center center"
      },
      {
        "name": "width",
        "type": [
          "String",
          "Number"
        ],
        "default": "auto"
      },
      {
        "name": "scrollable",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "transition",
        "type": [
          "String",
          "Boolean"
        ],
        "default": "dialog-transition"
      }
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
        "default": "False"
      },
      {
        "name": "light",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "inset",
        "type": "Boolean",
        "default": "False"
      }
    ]
  },
  "v-expansion-panel": {
    "props": [
      {
        "name": "dark",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "light",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "expand",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "focusable",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "inset",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "popout",
        "type": "Boolean",
        "default": "False"
      }
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
        "default": "False"
      },
      {
        "name": "value",
        "type": "Any",
        "default": "undefined"
      },
      {
        "name": "hideActions",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "ripple",
        "type": "Boolean",
        "default": "False"
      }
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
        "default": "False"
      },
      {
        "name": "app",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "fixed",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "color",
        "type": "String",
        "default": "undefined"
      },
      {
        "name": "dark",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "light",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "height",
        "type": [
          "Number",
          "String"
        ],
        "default": 32
      },
      {
        "name": "inset",
        "type": "Boolean",
        "default": "False"
      }
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
        "default": "False"
      },
      {
        "name": "lazyValidation",
        "type": "Boolean",
        "default": "False"
      }
    ],
    "slots": [
      "default"
    ]
  },
  "v-content": {
    "props": [
      {
        "name": "tag",
        "type": "String",
        "default": "main"
      }
    ]
  },
  "v-container": {
    "props": [
      {
        "name": "id",
        "type": "String",
        "default": "undefined"
      },
      {
        "name": "tag",
        "type": "String",
        "default": "div"
      }
    ]
  },
  "v-flex": {
    "props": [
      {
        "name": "id",
        "type": "String",
        "default": "undefined"
      },
      {
        "name": "tag",
        "type": "String",
        "default": "div"
      }
    ]
  },
  "v-layout": {
    "props": [
      {
        "name": "id",
        "type": "String",
        "default": "undefined"
      },
      {
        "name": "tag",
        "type": "String",
        "default": "div"
      }
    ]
  },
  "v-spacer": {
    "props": []
  },
  "v-icon": {
    "props": [
      {
        "name": "color",
        "type": "String",
        "default": "undefined"
      },
      {
        "name": "dark",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "light",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "disabled",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "large",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "left",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "medium",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "right",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "size",
        "type": [
          "Number",
          "String"
        ],
        "default": "24px"
      },
      {
        "name": "small",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "xLarge",
        "type": "Boolean",
        "default": "False"
      }
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
        "default": "undefined"
      },
      {
        "name": "activeClass",
        "type": "String",
        "default": "undefined"
      },
      {
        "name": "append",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "disabled",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "exact",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "exactActiveClass",
        "type": "String",
        "default": "undefined"
      },
      {
        "name": "href",
        "type": [
          "String",
          "Object"
        ],
        "default": "undefined"
      },
      {
        "name": "to",
        "type": [
          "String",
          "Object"
        ],
        "default": "undefined"
      },
      {
        "name": "nuxt",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "replace",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "ripple",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "tag",
        "type": "String",
        "default": "div"
      },
      {
        "name": "target",
        "type": "String",
        "default": "undefined"
      },
      {
        "name": "dark",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "light",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "gradient",
        "type": "String",
        "default": "undefined"
      },
      {
        "name": "height",
        "type": [
          "Number",
          "String"
        ],
        "default": "400px"
      },
      {
        "name": "src",
        "type": "String",
        "default": "undefined"
      }
    ]
  },
  "v-list": {
    "props": [
      {
        "name": "dark",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "light",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "dense",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "expand",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "subheader",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "threeLine",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "twoLine",
        "type": "Boolean",
        "default": "False"
      }
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
        "default": "False"
      },
      {
        "name": "value",
        "type": "Any",
        "default": "undefined"
      },
      {
        "name": "activeClass",
        "type": "String",
        "default": "primary--text"
      },
      {
        "name": "appendIcon",
        "type": "String",
        "default": "keyboard_arrow_down"
      },
      {
        "name": "disabled",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "group",
        "type": "String",
        "default": "undefined"
      },
      {
        "name": "noAction",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "prependIcon",
        "type": "String",
        "default": "undefined"
      },
      {
        "name": "subGroup",
        "type": "Boolean",
        "default": "False"
      }
    ]
  },
  "v-list-tile": {
    "props": [
      {
        "name": "color",
        "type": "String",
        "default": "undefined"
      },
      {
        "name": "activeClass",
        "type": "String",
        "default": "primary--text"
      },
      {
        "name": "append",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "disabled",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "exact",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "exactActiveClass",
        "type": "String",
        "default": "undefined"
      },
      {
        "name": "href",
        "type": [
          "String",
          "Object"
        ],
        "default": "undefined"
      },
      {
        "name": "to",
        "type": [
          "String",
          "Object"
        ],
        "default": "undefined"
      },
      {
        "name": "nuxt",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "replace",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "ripple",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "tag",
        "type": "String",
        "default": "undefined"
      },
      {
        "name": "target",
        "type": "String",
        "default": "undefined"
      },
      {
        "name": "value",
        "type": "Any",
        "default": "undefined"
      },
      {
        "name": "avatar",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "inactive",
        "type": "Boolean",
        "default": "False"
      }
    ],
    "slots": [
      "default"
    ]
  },
  "v-list-tile-action": {
    "props": [],
    "slots": [
      "default"
    ]
  },
  "v-list-tile-action-text": {
    "props": []
  },
  "v-list-tile-avatar": {
    "props": [
      {
        "name": "color",
        "type": "String",
        "default": "undefined"
      },
      {
        "name": "size",
        "type": [
          "Number",
          "String"
        ],
        "default": 40
      }
    ],
    "slots": [
      "default"
    ]
  },
  "v-list-tile-content": {
    "props": []
  },
  "v-list-tile-sub-title": {
    "props": [],
    "slots": [
      "default"
    ]
  },
  "v-list-tile-title": {
    "props": [],
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
        "default": 0
      },
      {
        "name": "closeDelay",
        "type": [
          "Number",
          "String"
        ],
        "default": 200
      },
      {
        "name": "lazy",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "contentClass",
        "type": "Any",
        "default": "undefined"
      },
      {
        "name": "absolute",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "bottom",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "fixed",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "left",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "right",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "top",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "activator",
        "type": "Any",
        "default": "undefined"
      },
      {
        "name": "allowOverflow",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "maxWidth",
        "type": [
          "Number",
          "String"
        ],
        "default": "auto"
      },
      {
        "name": "minWidth",
        "type": [
          "Number",
          "String"
        ],
        "default": "undefined"
      },
      {
        "name": "nudgeBottom",
        "type": "Number",
        "default": 0
      },
      {
        "name": "nudgeLeft",
        "type": "Number",
        "default": 0
      },
      {
        "name": "nudgeRight",
        "type": "Number",
        "default": 0
      },
      {
        "name": "nudgeTop",
        "type": "Number",
        "default": 0
      },
      {
        "name": "nudgeWidth",
        "type": "Number",
        "default": 0
      },
      {
        "name": "offsetOverflow",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "positionX",
        "type": "Number",
        "default": "undefined"
      },
      {
        "name": "positionY",
        "type": "Number",
        "default": "undefined"
      },
      {
        "name": "zIndex",
        "type": [
          "Number",
          "String"
        ],
        "default": "undefined"
      },
      {
        "name": "value",
        "type": "Any",
        "default": "undefined"
      },
      {
        "name": "auto",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "closeOnClick",
        "type": "Boolean",
        "default": "True"
      },
      {
        "name": "closeOnContentClick",
        "type": "Boolean",
        "default": "True"
      },
      {
        "name": "disabled",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "fullWidth",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "maxHeight",
        "type": "Any",
        "default": "auto"
      },
      {
        "name": "offsetX",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "offsetY",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "openOnClick",
        "type": "Boolean",
        "default": "True"
      },
      {
        "name": "openOnHover",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "origin",
        "type": "String",
        "default": "top left"
      },
      {
        "name": "transition",
        "type": [
          "Boolean",
          "String"
        ],
        "default": "menu-transition"
      }
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
        "default": "False"
      },
      {
        "name": "app",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "fixed",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "hideOverlay",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "dark",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "light",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "clipped",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "disableRouteWatcher",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "disableResizeWatcher",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "height",
        "type": [
          "Number",
          "String"
        ],
        "default": "100%"
      },
      {
        "name": "floating",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "miniVariant",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "miniVariantWidth",
        "type": [
          "Number",
          "String"
        ],
        "default": 80
      },
      {
        "name": "mobileBreakPoint",
        "type": [
          "Number",
          "String"
        ],
        "default": 1264
      },
      {
        "name": "permanent",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "right",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "stateless",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "temporary",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "touchless",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "width",
        "type": [
          "Number",
          "String"
        ],
        "default": 300
      },
      {
        "name": "value",
        "type": "Any",
        "default": "undefined"
      }
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
        "default": "undefined"
      },
      {
        "name": "circle",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "disabled",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "length",
        "type": "Number",
        "default": 0
      },
      {
        "name": "totalVisible",
        "type": [
          "Number",
          "String"
        ],
        "default": "undefined"
      },
      {
        "name": "nextIcon",
        "type": "String",
        "default": "chevron_right"
      },
      {
        "name": "prevIcon",
        "type": "String",
        "default": "chevron_left"
      },
      {
        "name": "value",
        "type": "Number",
        "default": 0
      }
    ]
  },
  "v-parallax": {
    "props": [
      {
        "name": "alt",
        "type": "String",
        "default": "undefined"
      },
      {
        "name": "height",
        "type": [
          "String",
          "Number"
        ],
        "default": 500
      },
      {
        "name": "src",
        "type": "String",
        "default": "undefined"
      }
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
        "default": "undefined"
      },
      {
        "name": "button",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "fill",
        "type": "String"
      },
      {
        "name": "indeterminate",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "rotate",
        "type": "Number",
        "default": 0
      },
      {
        "name": "size",
        "type": [
          "Number",
          "String"
        ],
        "default": 32
      },
      {
        "name": "width",
        "type": "Number",
        "default": 4
      },
      {
        "name": "value",
        "type": "Number",
        "default": 0
      }
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
        "default": "primary"
      },
      {
        "name": "active",
        "type": "Boolean",
        "default": "True"
      },
      {
        "name": "backgroundColor",
        "type": "String",
        "default": "undefined"
      },
      {
        "name": "backgroundOpacity",
        "type": [
          "Number",
          "String"
        ],
        "default": "undefined"
      },
      {
        "name": "bufferValue",
        "type": [
          "Number",
          "String"
        ],
        "default": 100
      },
      {
        "name": "height",
        "type": [
          "Number",
          "String"
        ],
        "default": 7
      },
      {
        "name": "indeterminate",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "query",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "value",
        "type": [
          "Number",
          "String"
        ],
        "default": 0
      }
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
        "default": false
      },
      {
        "name": "dark",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "light",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "error",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "errorMessages",
        "type": [
          "String",
          "Array"
        ]
      },
      {
        "name": "rules",
        "type": "Array"
      },
      {
        "name": "validateOnBlur",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "appendIcon",
        "type": "String",
        "default": "undefined"
      },
      {
        "name": "appendIconCb",
        "type": "Any",
        "default": "undefined"
      },
      {
        "name": "disabled",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "hint",
        "type": "String",
        "default": "undefined"
      },
      {
        "name": "hideDetails",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "label",
        "type": "String",
        "default": "undefined"
      },
      {
        "name": "persistentHint",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "placeholder",
        "type": "String",
        "default": "undefined"
      },
      {
        "name": "prependIcon",
        "type": "String",
        "default": "undefined"
      },
      {
        "name": "prependIconCb",
        "type": "Any",
        "default": "undefined"
      },
      {
        "name": "readonly",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "required",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "tabindex",
        "type": "Any",
        "default": 0
      },
      {
        "name": "toggleKeys",
        "type": "Array"
      },
      {
        "name": "value",
        "type": "Any",
        "default": "undefined"
      },
      {
        "name": "column",
        "type": "Boolean",
        "default": "True"
      },
      {
        "name": "inputValue",
        "type": "Any",
        "default": "undefined"
      },
      {
        "name": "mandatory",
        "type": "Boolean",
        "default": "True"
      },
      {
        "name": "name",
        "type": "String",
        "default": "undefined"
      },
      {
        "name": "row",
        "type": "Boolean",
        "default": "False"
      }
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
        "default": "undefined"
      },
      {
        "name": "ripple",
        "type": [
          "Boolean",
          "Object"
        ],
        "default": true
      },
      {
        "name": "dark",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "light",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "disabled",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "value",
        "type": "Any",
        "default": "undefined"
      },
      {
        "name": "label",
        "type": "String",
        "default": "undefined"
      }
    ]
  },
  "v-select": {
    "props": [
      {
        "name": "filter",
        "type": "Any"
      },
      {
        "name": "color",
        "type": "String",
        "default": "undefined"
      },
      {
        "name": "noDataText",
        "type": "String",
        "default": "No data available"
      },
      {
        "name": "loading",
        "type": [
          "Boolean",
          "String"
        ],
        "default": false
      },
      {
        "name": "dark",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "light",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "error",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "errorMessages",
        "type": [
          "String",
          "Array"
        ]
      },
      {
        "name": "rules",
        "type": "Array"
      },
      {
        "name": "validateOnBlur",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "appendIcon",
        "type": "String",
        "default": "arrow_drop_down"
      },
      {
        "name": "appendIconCb",
        "type": "Any",
        "default": "undefined"
      },
      {
        "name": "disabled",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "hint",
        "type": "String",
        "default": "undefined"
      },
      {
        "name": "hideDetails",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "label",
        "type": "String",
        "default": "undefined"
      },
      {
        "name": "persistentHint",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "placeholder",
        "type": "String",
        "default": "undefined"
      },
      {
        "name": "prependIcon",
        "type": "String",
        "default": "undefined"
      },
      {
        "name": "prependIconCb",
        "type": "Any",
        "default": "undefined"
      },
      {
        "name": "readonly",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "required",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "tabindex",
        "type": "Any",
        "default": 0
      },
      {
        "name": "toggleKeys",
        "type": "Array"
      },
      {
        "name": "value",
        "type": "Any",
        "default": "undefined"
      },
      {
        "name": "dontFillMaskBlanks",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "mask",
        "type": [
          "Object",
          "String"
        ],
        "default": "undefined"
      },
      {
        "name": "returnMaskedValue",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "auto",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "autocomplete",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "browserAutocomplete",
        "type": "String",
        "default": "on"
      },
      {
        "name": "cacheItems",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "chips",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "clearable",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "combobox",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "contentClass",
        "type": "String",
        "default": "undefined"
      },
      {
        "name": "debounceSearch",
        "type": [
          "Number",
          "String"
        ],
        "default": 200
      },
      {
        "name": "deletableChips",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "dense",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "editable",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "hideSelected",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "items",
        "type": "Array"
      },
      {
        "name": "itemAvatar",
        "type": "String",
        "default": "avatar"
      },
      {
        "name": "itemDisabled",
        "type": "String",
        "default": "disabled"
      },
      {
        "name": "itemText",
        "type": "String",
        "default": "text"
      },
      {
        "name": "itemValue",
        "type": "String",
        "default": "value"
      },
      {
        "name": "maxHeight",
        "type": [
          "Number",
          "String"
        ],
        "default": 300
      },
      {
        "name": "minWidth",
        "type": [
          "Boolean",
          "Number",
          "String"
        ],
        "default": false
      },
      {
        "name": "multiple",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "multiLine",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "openOnClear",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "overflow",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "returnObject",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "searchInput",
        "type": "Any",
        "default": "undefined"
      },
      {
        "name": "segmented",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "singleLine",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "solo",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "tags",
        "type": "Boolean",
        "default": "False"
      }
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
        "default": "undefined"
      },
      {
        "name": "loading",
        "type": [
          "Boolean",
          "String"
        ],
        "default": false
      },
      {
        "name": "dark",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "light",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "error",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "errorMessages",
        "type": [
          "String",
          "Array"
        ]
      },
      {
        "name": "rules",
        "type": "Array"
      },
      {
        "name": "validateOnBlur",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "appendIcon",
        "type": "String",
        "default": "undefined"
      },
      {
        "name": "appendIconCb",
        "type": "Any",
        "default": "undefined"
      },
      {
        "name": "disabled",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "hint",
        "type": "String",
        "default": "undefined"
      },
      {
        "name": "hideDetails",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "label",
        "type": "String",
        "default": "undefined"
      },
      {
        "name": "persistentHint",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "placeholder",
        "type": "String",
        "default": "undefined"
      },
      {
        "name": "prependIcon",
        "type": "String",
        "default": "undefined"
      },
      {
        "name": "prependIconCb",
        "type": "Any",
        "default": "undefined"
      },
      {
        "name": "readonly",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "required",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "tabindex",
        "type": "Any",
        "default": 0
      },
      {
        "name": "toggleKeys",
        "type": "Array"
      },
      {
        "name": "value",
        "type": [
          "Number",
          "String"
        ],
        "default": "undefined"
      },
      {
        "name": "min",
        "type": [
          "Number",
          "String"
        ],
        "default": 0
      },
      {
        "name": "max",
        "type": [
          "Number",
          "String"
        ],
        "default": 100
      },
      {
        "name": "step",
        "type": [
          "Number",
          "String"
        ],
        "default": 1
      },
      {
        "name": "ticks",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "thumbColor",
        "type": "String",
        "default": "undefined"
      },
      {
        "name": "thumbLabel",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "trackColor",
        "type": "String",
        "default": "undefined"
      }
    ]
  },
  "v-snackbar": {
    "props": [
      {
        "name": "color",
        "type": "String",
        "default": "undefined"
      },
      {
        "name": "value",
        "type": "Any",
        "default": "undefined"
      },
      {
        "name": "absolute",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "bottom",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "left",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "multiLine",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "right",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "top",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "timeout",
        "type": "Number",
        "default": 6000
      },
      {
        "name": "vertical",
        "type": "Boolean",
        "default": "False"
      }
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
        "default": "False"
      },
      {
        "name": "bottom",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "fixed",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "left",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "right",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "top",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "value",
        "type": "Any",
        "default": "undefined"
      },
      {
        "name": "direction",
        "type": "String",
        "default": "top"
      },
      {
        "name": "hover",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "transition",
        "type": "String",
        "default": "scale-transition"
      }
    ]
  },
  "v-stepper": {
    "props": [
      {
        "name": "dark",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "light",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "nonLinear",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "altLabels",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "vertical",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "value",
        "type": [
          "Number",
          "String"
        ],
        "default": "undefined"
      }
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
        "default": "undefined"
      }
    ],
    "slots": [
      "default"
    ]
  },
  "v-stepper-step": {
    "props": [
      {
        "name": "complete",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "completeIcon",
        "type": "String",
        "default": "check"
      },
      {
        "name": "editIcon",
        "type": "String",
        "default": "edit"
      },
      {
        "name": "errorIcon",
        "type": "String",
        "default": "warning"
      },
      {
        "name": "editable",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "rules",
        "type": "Array"
      },
      {
        "name": "step",
        "type": [
          "Number",
          "String"
        ],
        "default": "undefined"
      }
    ],
    "slots": [
      "default"
    ]
  },
  "v-stepper-header": {
    "props": [],
    "slots": [
      "default"
    ]
  },
  "v-stepper-items": {
    "props": [],
    "slots": [
      "default"
    ]
  },
  "v-subheader": {
    "props": [
      {
        "name": "dark",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "light",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "inset",
        "type": "Boolean",
        "default": "False"
      }
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
        "default": true
      },
      {
        "name": "loading",
        "type": [
          "Boolean",
          "String"
        ],
        "default": false
      },
      {
        "name": "dark",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "light",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "error",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "errorMessages",
        "type": [
          "String",
          "Array"
        ]
      },
      {
        "name": "rules",
        "type": "Array"
      },
      {
        "name": "validateOnBlur",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "appendIcon",
        "type": "String",
        "default": "undefined"
      },
      {
        "name": "appendIconCb",
        "type": "Any",
        "default": "undefined"
      },
      {
        "name": "disabled",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "hint",
        "type": "String",
        "default": "undefined"
      },
      {
        "name": "hideDetails",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "label",
        "type": "String",
        "default": "undefined"
      },
      {
        "name": "persistentHint",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "placeholder",
        "type": "String",
        "default": "undefined"
      },
      {
        "name": "prependIcon",
        "type": "String",
        "default": "undefined"
      },
      {
        "name": "prependIconCb",
        "type": "Any",
        "default": "undefined"
      },
      {
        "name": "readonly",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "required",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "tabindex",
        "type": "Any",
        "default": 0
      },
      {
        "name": "toggleKeys",
        "type": "Array"
      },
      {
        "name": "value",
        "type": "Any",
        "default": "undefined"
      },
      {
        "name": "color",
        "type": "String",
        "default": "undefined"
      },
      {
        "name": "id",
        "type": "String",
        "default": "undefined"
      },
      {
        "name": "inputValue",
        "type": "Any",
        "default": "undefined"
      },
      {
        "name": "falseValue",
        "type": "Any",
        "default": "undefined"
      },
      {
        "name": "trueValue",
        "type": "Any",
        "default": "undefined"
      }
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
        "default": "False"
      },
      {
        "name": "app",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "fixed",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "color",
        "type": "String",
        "default": "undefined"
      },
      {
        "name": "dark",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "light",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "height",
        "type": [
          "Number",
          "String"
        ],
        "default": "undefined"
      },
      {
        "name": "lightsOut",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "status",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "window",
        "type": "Boolean",
        "default": "False"
      }
    ]
  },
  "v-tabs": {
    "props": [
      {
        "name": "centered",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "fixed",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "grow",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "icons",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "mobileBreakPoint",
        "type": [
          "Number",
          "String"
        ],
        "default": 1280
      },
      {
        "name": "value",
        "type": "String",
        "default": "undefined"
      },
      {
        "name": "scrollable",
        "type": "Boolean",
        "default": "True"
      }
    ]
  },
  "v-tabs-bar": {
    "props": [
      {
        "name": "color",
        "type": "String",
        "default": "undefined"
      },
      {
        "name": "dark",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "light",
        "type": "Boolean",
        "default": "False"
      }
    ]
  },
  "v-tabs-content": {
    "props": [
      {
        "name": "lazy",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "id",
        "type": "String",
        "default": "undefined"
      },
      {
        "name": "transition",
        "type": [
          "Boolean",
          "String"
        ],
        "default": "tab-transition"
      },
      {
        "name": "reverseTransition",
        "type": [
          "Boolean",
          "String"
        ],
        "default": "tab-reverse-transition"
      }
    ]
  },
  "v-tabs-item": {
    "props": [
      {
        "name": "activeClass",
        "type": "String",
        "default": "tabs__item--active"
      },
      {
        "name": "append",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "disabled",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "exact",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "exactActiveClass",
        "type": "String",
        "default": "undefined"
      },
      {
        "name": "href",
        "type": [
          "String",
          "Object"
        ],
        "default": "undefined"
      },
      {
        "name": "to",
        "type": [
          "String",
          "Object"
        ],
        "default": "undefined"
      },
      {
        "name": "nuxt",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "replace",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "ripple",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "tag",
        "type": "String",
        "default": "undefined"
      },
      {
        "name": "target",
        "type": "String",
        "default": "undefined"
      }
    ]
  },
  "v-tabs-items": {
    "props": [
      {
        "name": "cycle",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "touchless",
        "type": "Boolean",
        "default": "False"
      }
    ]
  },
  "v-tabs-slider": {
    "props": [
      {
        "name": "color",
        "type": "String",
        "default": "undefined"
      }
    ]
  },
  "v-text-field": {
    "props": [
      {
        "name": "color",
        "type": "String",
        "default": "primary"
      },
      {
        "name": "loading",
        "type": [
          "Boolean",
          "String"
        ],
        "default": false
      },
      {
        "name": "dark",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "light",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "error",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "errorMessages",
        "type": [
          "String",
          "Array"
        ]
      },
      {
        "name": "rules",
        "type": "Array"
      },
      {
        "name": "validateOnBlur",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "appendIcon",
        "type": "String",
        "default": "undefined"
      },
      {
        "name": "appendIconCb",
        "type": "Any",
        "default": "undefined"
      },
      {
        "name": "disabled",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "hint",
        "type": "String",
        "default": "undefined"
      },
      {
        "name": "hideDetails",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "label",
        "type": "String",
        "default": "undefined"
      },
      {
        "name": "persistentHint",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "placeholder",
        "type": "String",
        "default": "undefined"
      },
      {
        "name": "prependIcon",
        "type": "String",
        "default": "undefined"
      },
      {
        "name": "prependIconCb",
        "type": "Any",
        "default": "undefined"
      },
      {
        "name": "readonly",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "required",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "tabindex",
        "type": "Any",
        "default": 0
      },
      {
        "name": "toggleKeys",
        "type": "Array"
      },
      {
        "name": "value",
        "type": "Any",
        "default": "undefined"
      },
      {
        "name": "dontFillMaskBlanks",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "mask",
        "type": [
          "Object",
          "String"
        ],
        "default": "undefined"
      },
      {
        "name": "returnMaskedValue",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "autofocus",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "autoGrow",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "box",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "clearable",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "counter",
        "type": [
          "Boolean",
          "Number",
          "String"
        ],
        "default": "undefined"
      },
      {
        "name": "fullWidth",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "multiLine",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "prefix",
        "type": "String",
        "default": "undefined"
      },
      {
        "name": "rows",
        "type": "Any",
        "default": 5
      },
      {
        "name": "singleLine",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "solo",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "suffix",
        "type": "String",
        "default": "undefined"
      },
      {
        "name": "textarea",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "type",
        "type": "String",
        "default": "text"
      }
    ]
  },
  "v-time-picker": {
    "props": [
      {
        "name": "color",
        "type": "String",
        "default": "undefined"
      },
      {
        "name": "dark",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "light",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "actions",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "autosave",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "headerColor",
        "type": "String",
        "default": "undefined"
      },
      {
        "name": "landscape",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "noTitle",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "scrollable",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "value",
        "type": "Any",
        "default": "undefined"
      },
      {
        "name": "format",
        "type": "String",
        "default": "ampm"
      },
      {
        "name": "allowedHours",
        "type": [
          "Array",
          "Object",
          "Any"
        ]
      },
      {
        "name": "allowedMinutes",
        "type": [
          "Array",
          "Object",
          "Any"
        ]
      }
    ]
  },
  "v-toolbar": {
    "props": [
      {
        "name": "absolute",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "app",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "fixed",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "color",
        "type": "String",
        "default": "undefined"
      },
      {
        "name": "dark",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "light",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "card",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "clippedLeft",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "clippedRight",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "dense",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "extended",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "extensionHeight",
        "type": [
          "Number",
          "String"
        ],
        "default": "undefined"
      },
      {
        "name": "flat",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "floating",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "height",
        "type": [
          "Number",
          "String"
        ],
        "default": "undefined"
      },
      {
        "name": "invertedScroll",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "manualScroll",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "prominent",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "scrollOffScreen",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "scrollTarget",
        "type": "String",
        "default": "undefined"
      },
      {
        "name": "scrollThreshold",
        "type": "Number",
        "default": 300
      },
      {
        "name": "tabs",
        "type": "Boolean",
        "default": "False"
      }
    ],
    "slots": [
      "default",
      "extension"
    ]
  },
  "v-toolbar-items": {
    "props": []
  },
  "v-toolbar-title": {
    "props": []
  },
  "v-toolbar-side-icon": {
    "props": []
  },
  "v-tooltip": {
    "props": [
      {
        "name": "color",
        "type": "String",
        "default": "undefined"
      },
      {
        "name": "openDelay",
        "type": [
          "Number",
          "String"
        ],
        "default": 200
      },
      {
        "name": "closeDelay",
        "type": [
          "Number",
          "String"
        ],
        "default": 200
      },
      {
        "name": "lazy",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "contentClass",
        "type": "Any",
        "default": "undefined"
      },
      {
        "name": "absolute",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "bottom",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "fixed",
        "type": "Boolean",
        "default": "True"
      },
      {
        "name": "left",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "right",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "top",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "activator",
        "type": "Any",
        "default": "undefined"
      },
      {
        "name": "allowOverflow",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "maxWidth",
        "type": [
          "Number",
          "String"
        ],
        "default": "auto"
      },
      {
        "name": "minWidth",
        "type": [
          "Number",
          "String"
        ],
        "default": "undefined"
      },
      {
        "name": "nudgeBottom",
        "type": "Number",
        "default": 0
      },
      {
        "name": "nudgeLeft",
        "type": "Number",
        "default": 0
      },
      {
        "name": "nudgeRight",
        "type": "Number",
        "default": 0
      },
      {
        "name": "nudgeTop",
        "type": "Number",
        "default": 0
      },
      {
        "name": "nudgeWidth",
        "type": "Number",
        "default": 0
      },
      {
        "name": "offsetOverflow",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "positionX",
        "type": "Number",
        "default": "undefined"
      },
      {
        "name": "positionY",
        "type": "Number",
        "default": "undefined"
      },
      {
        "name": "zIndex",
        "type": "Any",
        "default": "undefined"
      },
      {
        "name": "value",
        "type": "Any",
        "default": "undefined"
      },
      {
        "name": "debounce",
        "type": [
          "Number",
          "String"
        ],
        "default": 0
      },
      {
        "name": "disabled",
        "type": "Boolean",
        "default": "False"
      },
      {
        "name": "tag",
        "type": "String",
        "default": "span"
      },
      {
        "name": "transition",
        "type": "String",
        "default": "undefined"
      }
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
        "default": "top center 0"
      }
    ]
  },
  "v-carousel-transition": {
    "props": [
      {
        "name": "origin",
        "type": "String",
        "default": "top center 0"
      }
    ]
  },
  "v-carousel-reverse-transition": {
    "props": [
      {
        "name": "origin",
        "type": "String",
        "default": "top center 0"
      }
    ]
  },
  "v-dialog-transition": {
    "props": [
      {
        "name": "origin",
        "type": "String",
        "default": "top center 0"
      }
    ]
  },
  "v-dialog-bottom-transition": {
    "props": [
      {
        "name": "origin",
        "type": "String",
        "default": "top center 0"
      }
    ]
  },
  "v-fab-transition": {
    "props": [
      {
        "name": "origin",
        "type": "String",
        "default": "center center"
      }
    ]
  },
  "v-fade-transition": {
    "props": [
      {
        "name": "origin",
        "type": "String",
        "default": "top center 0"
      }
    ]
  },
  "v-menu-transition": {
    "props": [
      {
        "name": "origin",
        "type": "String",
        "default": "top center 0"
      }
    ]
  },
  "v-scale-transition": {
    "props": [
      {
        "name": "origin",
        "type": "String",
        "default": "top center 0"
      }
    ]
  },
  "v-slide-x-transition": {
    "props": [
      {
        "name": "origin",
        "type": "String",
        "default": "top center 0"
      }
    ]
  },
  "v-slide-x-reverse-transition": {
    "props": [
      {
        "name": "origin",
        "type": "String",
        "default": "top center 0"
      }
    ]
  },
  "v-slide-y-transition": {
    "props": [
      {
        "name": "origin",
        "type": "String",
        "default": "top center 0"
      }
    ]
  },
  "v-slide-y-reverse-transition": {
    "props": [
      {
        "name": "origin",
        "type": "String",
        "default": "top center 0"
      }
    ]
  },
  "v-tab-reverse-transition": {
    "props": [
      {
        "name": "origin",
        "type": "String",
        "default": "top center 0"
      }
    ]
  },
  "v-tab-transition": {
    "props": [
      {
        "name": "origin",
        "type": "String",
        "default": "top center 0"
      }
    ]
  },
  "v-expand-transition": {
    "props": [
      {
        "name": "css",
        "type": "Boolean",
        "default": "True"
      },
      {
        "name": "mode",
        "type": "String",
        "default": "in-out"
      }
    ]
  },
  "v-row-expand-transition": {
    "props": [
      {
        "name": "css",
        "type": "Boolean",
        "default": "True"
      },
      {
        "name": "mode",
        "type": "String",
        "default": "in-out"
      }
    ]
  }
}
