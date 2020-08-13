/*
  * THIS FILE HAS BEEN AUTOMATICALLY GENERATED USING THE API-GENERATOR TOOL.
  *
  * CHANGES MADE TO THIS FILE WILL BE LOST!
  */
/* eslint-disable */
module.exports = {
  "en": {
    "v-app": {
      "props": [
        {
          "name": "dark",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "id",
          "type": "string",
          "default": "'app'",
          "source": "v-app",
          "description": "Missing description"
        },
        {
          "name": "light",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        }
      ],
      "mixins": [
        "themeable"
      ],
      "slots": [
        {
          "name": "default",
          "description": "Missing description"
        }
      ],
      "sass": []
    },
    "v-alert": {
      "props": [
        {
          "name": "color",
          "type": "string",
          "default": "undefined",
          "source": "colorable",
          "description": "Missing description"
        },
        {
          "name": "dismissible",
          "type": "boolean",
          "default": "false",
          "source": "v-alert",
          "description": "Adds a close icon that can hide the alert."
        },
        {
          "name": "icon",
          "type": "string",
          "default": "undefined",
          "source": "v-alert",
          "description": "Designates a specific icon."
        },
        {
          "name": "mode",
          "type": "string",
          "default": "undefined",
          "source": "transitionable",
          "description": "Missing description"
        },
        {
          "name": "origin",
          "type": "string",
          "default": "undefined",
          "source": "transitionable",
          "description": "Missing description"
        },
        {
          "name": "outline",
          "type": "boolean",
          "default": "false",
          "source": "v-alert",
          "description": "Missing description"
        },
        {
          "name": "transition",
          "type": "string",
          "default": "undefined",
          "source": "transitionable",
          "description": "Missing description"
        },
        {
          "name": "type",
          "type": "string",
          "default": "undefined",
          "source": "v-alert",
          "description": "Specify a **success**, **info**, **warning** or **error** alert. Uses the contextual color and has a pre-defined icon."
        },
        {
          "name": "value",
          "type": "any",
          "default": "undefined",
          "source": "toggleable",
          "description": "Missing description"
        }
      ],
      "mixins": [
        "colorable",
        "toggleable",
        "transitionable"
      ],
      "slots": [
        {
          "name": "append",
          "description": "Missing description"
        },
        {
          "name": "close",
          "props": {
            "toggle": "Function"
          },
          "description": "Missing description"
        },
        {
          "name": "prepend",
          "description": "Missing description"
        },
        {
          "name": "default",
          "description": "Missing description"
        }
      ],
      "events": [
        {
          "name": "input",
          "value": "boolean",
          "description": "Missing description"
        }
      ],
      "functions": [
        {
          "name": "toggle",
          "signature": "(): void",
          "description": "Missing description"
        }
      ],
      "sass": [
        {
          "name": "$alert-elevation",
          "default": "0 !default;",
          "description": "Missing description"
        },
        {
          "name": "$alert-border-opacity",
          "default": "0.26 !default;",
          "description": "Missing description"
        },
        {
          "name": "$alert-border-radius",
          "default": "$border-radius-root !default;",
          "description": "Missing description"
        },
        {
          "name": "$alert-shaped-border-radius",
          "default": "map-get($rounded, 'xl') $alert-border-radius !default;",
          "description": "Missing description"
        },
        {
          "name": "$alert-border-width",
          "default": "4px !default;",
          "description": "Missing description"
        },
        {
          "name": "$alert-dense-border-width",
          "default": "medium !default;",
          "description": "Missing description"
        },
        {
          "name": "$alert-font-size",
          "default": "16px !default;",
          "description": "Missing description"
        },
        {
          "name": "$alert-icon-size",
          "default": "24px !default;",
          "description": "Missing description"
        },
        {
          "name": "$alert-margin",
          "default": "16px !default;",
          "description": "Missing description"
        },
        {
          "name": "$alert-outline",
          "default": "thin solid currentColor !default;",
          "description": "Missing description"
        },
        {
          "name": "$alert-padding",
          "default": "16px !default;",
          "description": "Missing description"
        },
        {
          "name": "$alert-prominent-icon-font-size",
          "default": "32px !default;",
          "description": "Missing description"
        },
        {
          "name": "$alert-prominent-icon-size",
          "default": "48px !default;",
          "description": "Missing description"
        }
      ]
    },
    "v-autocomplete": {
      "props": [
        {
          "name": "allowOverflow",
          "type": "boolean",
          "default": "true",
          "source": "v-autocomplete",
          "description": "Allow the menu to overflow off the screen"
        },
        {
          "name": "appendIcon",
          "type": "string",
          "default": "'$vuetify.icons.dropdown'",
          "source": "v-input",
          "description": "Appends an icon to the component, uses the same syntax as `v-icon`"
        },
        {
          "name": "appendIconCb",
          "type": "function",
          "default": "null",
          "source": "v-input",
          "description": "Missing description"
        },
        {
          "name": "appendOuterIcon",
          "type": "string",
          "default": "undefined",
          "source": "v-text-field",
          "description": "Appends an icon to the outside the component's input, uses same syntax as `v-icon`"
        },
        {
          "name": "appendOuterIconCb",
          "type": "function",
          "default": "null",
          "source": "v-text-field",
          "description": "Missing description"
        },
        {
          "name": "attach",
          "type": "any",
          "default": false,
          "source": "v-select",
          "description": "Mixins.Detachable.props.attach"
        },
        {
          "name": "autoSelectFirst",
          "type": "boolean",
          "default": "false",
          "source": "v-autocomplete",
          "description": "When searching, will always highlight the first option"
        },
        {
          "name": "autofocus",
          "type": "boolean",
          "default": "false",
          "source": "v-text-field",
          "description": "Enables autofocus"
        },
        {
          "name": "backgroundColor",
          "type": "string",
          "default": "undefined",
          "source": "v-input",
          "description": "Changes the background-color of the input"
        },
        {
          "name": "box",
          "type": "boolean",
          "default": "false",
          "source": "v-text-field",
          "description": "Missing description"
        },
        {
          "name": "browserAutocomplete",
          "type": "string",
          "default": "'off'",
          "source": "v-text-field",
          "description": "Missing description"
        },
        {
          "name": "cacheItems",
          "type": "boolean",
          "default": "false",
          "source": "v-select",
          "description": "Keeps a local _unique_ copy of all items that have been passed through the **items** prop."
        },
        {
          "name": "chips",
          "type": "boolean",
          "default": "false",
          "source": "v-select",
          "description": "Changes display of selections to chips"
        },
        {
          "name": "clearIcon",
          "type": "string",
          "default": "'$vuetify.icons.clear'",
          "source": "v-text-field",
          "description": "Applied when using **clearable** and the input is dirty"
        },
        {
          "name": "clearIconCb",
          "type": "function",
          "default": "null",
          "source": "v-text-field",
          "description": "Missing description"
        },
        {
          "name": "clearable",
          "type": "boolean",
          "default": "false",
          "source": "v-text-field",
          "description": "Missing description"
        },
        {
          "name": "color",
          "type": "string",
          "default": "'primary'",
          "source": "colorable",
          "description": "Missing description"
        },
        {
          "name": "counter",
          "type": [
            "boolean",
            "number",
            "string"
          ],
          "default": "undefined",
          "source": "v-text-field",
          "description": "Creates counter for input length; if no number is specified, it defaults to 25. Does not apply any validation."
        },
        {
          "name": "dark",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "deletableChips",
          "type": "boolean",
          "default": "false",
          "source": "v-select",
          "description": "Adds a remove icon to selected chips"
        },
        {
          "name": "dense",
          "type": "boolean",
          "default": "false",
          "source": "v-select",
          "description": "Missing description"
        },
        {
          "name": "disabled",
          "type": "boolean",
          "default": false,
          "source": "validatable",
          "value": "boolean",
          "description": "Missing description"
        },
        {
          "name": "dontFillMaskBlanks",
          "type": "boolean",
          "default": "false",
          "source": "maskable",
          "description": "Missing description"
        },
        {
          "name": "error",
          "type": "boolean",
          "default": "false",
          "source": "validatable",
          "description": "Missing description"
        },
        {
          "name": "errorCount",
          "type": [
            "number",
            "string"
          ],
          "default": 1,
          "source": "validatable",
          "description": "Missing description"
        },
        {
          "name": "errorMessages",
          "type": [
            "string",
            "array"
          ],
          "default": [],
          "source": "validatable",
          "description": "Missing description"
        },
        {
          "name": "filter",
          "type": "function",
          "default": "(item: object, queryText: string, itemText: string): boolean",
          "source": "v-select",
          "description": "The function used for filtering items"
        },
        {
          "name": "flat",
          "type": "boolean",
          "default": "false",
          "source": "v-text-field",
          "description": "Mixins.Soloable.props.flat"
        },
        {
          "name": "fullWidth",
          "type": "boolean",
          "default": "false",
          "source": "v-text-field",
          "description": "Designates input type as full-width"
        },
        {
          "name": "height",
          "type": [
            "number",
            "string"
          ],
          "default": "undefined",
          "source": "v-input",
          "description": "Sets the height of the input"
        },
        {
          "name": "hideDetails",
          "type": "boolean",
          "default": "false",
          "source": "v-input",
          "description": "Hides hint and validation errors. When set to `auto` messages will be rendered only if there's a message (hint, error message, counter value etc) to display"
        },
        {
          "name": "hideNoData",
          "type": "boolean",
          "default": "false",
          "source": "v-autocomplete",
          "description": "Hides the menu when there are no options to show.  Useful for preventing the menu from opening before results are fetched asynchronously.  Also has the effect of opening the menu when the `items` array changes if not already open."
        },
        {
          "name": "hideSelected",
          "type": "boolean",
          "default": "false",
          "source": "v-select",
          "description": "Do not display in the select menu items that are already selected"
        },
        {
          "name": "hint",
          "type": "string",
          "default": "undefined",
          "source": "v-input",
          "description": "Hint text"
        },
        {
          "name": "itemAvatar",
          "type": [
            "string",
            "array",
            "function"
          ],
          "default": "avatar",
          "source": "v-select",
          "description": "Missing description"
        },
        {
          "name": "itemDisabled",
          "type": [
            "string",
            "array",
            "function"
          ],
          "default": "disabled",
          "source": "v-select",
          "description": "Set property of **items**'s disabled value"
        },
        {
          "name": "itemText",
          "type": [
            "string",
            "array",
            "function"
          ],
          "default": "text",
          "source": "v-select",
          "description": "Set property of **items**'s text value"
        },
        {
          "name": "itemValue",
          "type": [
            "string",
            "array",
            "function"
          ],
          "default": "value",
          "source": "v-select",
          "description": "Set property of **items**'s value - **must be primitive**. Dot notation is supported. **Note:** This is currently not supported with `v-combobox` [GitHub Issue](https://github.com/vuetifyjs/vuetify/issues/5479)"
        },
        {
          "name": "items",
          "type": "array",
          "default": [],
          "source": "v-select",
          "example": {
            "text": "string | number | object",
            "value": "string | number | object",
            "disabled": "boolean",
            "divider": "boolean",
            "header": "string"
          },
          "description": "Can be an array of objects or array of strings. When using objects, will look for a text, value and disabled keys. This can be changed using the **item-text**, **item-value** and **item-disabled** props.  Objects that have a **header** or **divider** property are considered special cases and generate a list header or divider; these items are not selectable."
        },
        {
          "name": "label",
          "type": "string",
          "source": "v-input",
          "description": "Sets input label"
        },
        {
          "name": "light",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "loading",
          "type": [
            "boolean",
            "string"
          ],
          "default": false,
          "source": "v-input",
          "description": "Mixins.Loadable.props.loading"
        },
        {
          "name": "mask",
          "type": [
            "object",
            "string"
          ],
          "default": "undefined",
          "source": "maskable",
          "description": "Missing description"
        },
        {
          "name": "menuProps",
          "type": [
            "string",
            "array",
            "object"
          ],
          "default": "{ \"closeOnClick\": false, \"closeOnContentClick\": false, \"disableKeys\": true, \"openOnClick\": false, \"maxHeight\": 304 }",
          "source": "v-select",
          "description": "Pass props through to the `v-menu` component. Accepts either a string for boolean props `menu-props=\"auto, overflowY\"`, or an object `:menu-props=\"{ auto: true, overflowY: true }\"`"
        },
        {
          "name": "messages",
          "type": [
            "string",
            "array"
          ],
          "default": [],
          "source": "validatable",
          "description": "Missing description"
        },
        {
          "name": "multiple",
          "type": "boolean",
          "default": "false",
          "source": "v-select",
          "description": "Changes select to multiple. Accepts array for value"
        },
        {
          "name": "noDataText",
          "type": "string",
          "default": "'$vuetify.noDataText'",
          "source": "filterable",
          "description": "Missing description"
        },
        {
          "name": "noFilter",
          "type": "boolean",
          "default": "false",
          "source": "v-autocomplete",
          "description": "Do not apply filtering when searching. Useful when data is being filtered server side"
        },
        {
          "name": "openOnClear",
          "type": "boolean",
          "default": "false",
          "source": "v-select",
          "description": "When using the **clearable** prop, once cleared, the select menu will either open or stay open, depending on the current state"
        },
        {
          "name": "outline",
          "type": "boolean",
          "default": "false",
          "source": "v-text-field",
          "description": "Missing description"
        },
        {
          "name": "persistentHint",
          "type": "boolean",
          "default": "false",
          "source": "v-input",
          "description": "Forces hint to always be visible"
        },
        {
          "name": "placeholder",
          "type": "string",
          "default": "undefined",
          "source": "v-text-field",
          "description": "Sets the input’s placeholder text"
        },
        {
          "name": "prefix",
          "type": "string",
          "default": "undefined",
          "source": "v-text-field",
          "description": "Displays prefix text"
        },
        {
          "name": "prependIcon",
          "type": "string",
          "default": "undefined",
          "source": "v-input",
          "description": "Prepends an icon to the component, uses the same syntax as `v-icon`"
        },
        {
          "name": "prependIconCb",
          "type": "function",
          "default": "null",
          "source": "v-input",
          "description": "Missing description"
        },
        {
          "name": "prependInnerIcon",
          "type": "string",
          "default": "undefined",
          "source": "v-text-field",
          "description": "Prepends an icon inside the component's input, uses the same syntax as `v-icon`"
        },
        {
          "name": "prependInnerIconCb",
          "type": "function",
          "default": "null",
          "source": "v-text-field",
          "description": "Missing description"
        },
        {
          "name": "readonly",
          "type": "boolean",
          "default": false,
          "source": "validatable",
          "value": "boolean",
          "description": "Missing description"
        },
        {
          "name": "returnMaskedValue",
          "type": "boolean",
          "default": "false",
          "source": "maskable",
          "description": "Missing description"
        },
        {
          "name": "returnObject",
          "type": "boolean",
          "default": "false",
          "source": "v-select",
          "description": "Changes the selection behavior to return the object directly rather than the value specified with **item-value**"
        },
        {
          "name": "reverse",
          "type": "boolean",
          "default": "false",
          "source": "v-text-field",
          "description": "Reverses the input orientation"
        },
        {
          "name": "rules",
          "type": "array",
          "default": [],
          "source": "validatable",
          "description": "Missing description"
        },
        {
          "name": "searchInput",
          "type": "any",
          "default": "undefined",
          "source": "v-select",
          "description": "Use the **.sync** modifier to catch user input from the search input"
        },
        {
          "name": "singleLine",
          "type": "boolean",
          "default": "false",
          "source": "v-text-field",
          "description": "Missing description"
        },
        {
          "name": "smallChips",
          "type": "boolean",
          "default": "false",
          "source": "v-select",
          "description": "Changes display of selections to chips with the **small** property"
        },
        {
          "name": "solo",
          "type": "boolean",
          "default": "false",
          "source": "v-text-field",
          "description": "Mixins.Soloable.props.solo"
        },
        {
          "name": "soloInverted",
          "type": "boolean",
          "default": "false",
          "source": "v-text-field",
          "description": "Mixins.Soloable.props.soloInverted"
        },
        {
          "name": "success",
          "type": "boolean",
          "default": "false",
          "source": "validatable",
          "description": "Missing description"
        },
        {
          "name": "successMessages",
          "type": [
            "string",
            "array"
          ],
          "default": [],
          "source": "validatable",
          "description": "Missing description"
        },
        {
          "name": "suffix",
          "type": "string",
          "default": "undefined",
          "source": "v-text-field",
          "description": "Displays suffix text"
        },
        {
          "name": "type",
          "type": "string",
          "default": "'text'",
          "source": "v-text-field",
          "description": "Sets input type"
        },
        {
          "name": "validateOnBlur",
          "type": "boolean",
          "default": "false",
          "source": "validatable",
          "description": "Missing description"
        },
        {
          "name": "value",
          "type": "any",
          "source": "v-input",
          "description": "The input's value"
        },
        {
          "name": "valueComparator",
          "type": "function",
          "default": "(a: any, b: any): boolean",
          "source": "v-select",
          "description": "The comparison algorithm used for values. [More info](https://github.com/vuetifyjs/vuetify/blob/master/packages/vuetify/src/util/helpers.ts)"
        }
      ],
      "mixins": [
        "comparable",
        "filterable"
      ],
      "events": [
        {
          "name": "update:error",
          "source": "validatable",
          "value": "boolean",
          "description": "Missing description"
        },
        {
          "name": "click",
          "source": "v-input",
          "value": "MouseEvent",
          "description": "Missing description"
        },
        {
          "name": "mousedown",
          "source": "v-input",
          "value": "MouseEvent",
          "description": "Missing description"
        },
        {
          "name": "mouseup",
          "source": "v-input",
          "value": "MouseEvent",
          "description": "Missing description"
        },
        {
          "name": "click:append",
          "source": "v-input",
          "value": "Event",
          "description": "Missing description"
        },
        {
          "name": "click:prepend",
          "source": "v-input",
          "value": "Event",
          "description": "Missing description"
        },
        {
          "name": "blur",
          "source": "v-text-field",
          "value": "Event",
          "description": "Emitted when the input is blurred"
        },
        {
          "name": "click:clear",
          "source": "v-text-field",
          "value": "Event",
          "description": "Emitted when clearable icon clicked"
        },
        {
          "name": "click:append-outer",
          "source": "v-text-field",
          "value": "Event",
          "description": "Emitted when appended outer icon is clicked"
        },
        {
          "name": "click:prepend-inner",
          "source": "v-text-field",
          "value": "Event",
          "description": "Emitted when prepended inner icon is clicked"
        },
        {
          "name": "focus",
          "source": "v-text-field",
          "value": "Event",
          "description": "Emitted when component is focused"
        },
        {
          "name": "change",
          "source": "v-text-field",
          "value": "any",
          "description": "Emitted when the input is changed by user interaction"
        },
        {
          "name": "input",
          "source": "v-text-field",
          "value": "any",
          "description": "Missing description"
        },
        {
          "name": "keydown",
          "source": "v-text-field",
          "value": "KeyboardEvent",
          "description": "Emitted when **any** key is pressed"
        },
        {
          "name": "update:search-input",
          "source": "v-select",
          "value": "string",
          "description": "The `search-input.sync` event"
        },
        {
          "name": "update:list-index",
          "source": "v-select",
          "value": "number",
          "description": "Emitted when menu item is selected using keyboard arrows"
        }
      ],
      "slots": [
        {
          "name": "append",
          "source": "v-input",
          "description": "Missing description"
        },
        {
          "name": "default",
          "source": "v-input",
          "description": "Missing description"
        },
        {
          "name": "prepend",
          "source": "v-input",
          "description": "Missing description"
        },
        {
          "name": "label",
          "source": "v-input",
          "description": "Missing description"
        },
        {
          "name": "message",
          "props": {
            "key": "number, // the messages index",
            "message": "string, // the message"
          },
          "source": "v-input",
          "description": "Missing description"
        },
        {
          "name": "append-outer",
          "source": "v-text-field",
          "description": "Adds an item outside the input and after input content"
        },
        {
          "name": "prepend-inner",
          "source": "v-text-field",
          "description": "Adds an item inside the input and before input content"
        },
        {
          "name": "progress",
          "source": "v-text-field",
          "description": "Missing description"
        },
        {
          "name": "append-item",
          "source": "v-select",
          "description": "Adds an item after menu content"
        },
        {
          "name": "prepend-item",
          "source": "v-select",
          "description": "Adds an item before menu content"
        },
        {
          "name": "item",
          "props": {
            "parent": "VueComponent",
            "item": "object",
            "on": "object // Only needed when providing your own v-list-item",
            "attrs": "object // Only needed when providing your own v-list-item"
          },
          "source": "v-select",
          "description": "Define a custom item appearance"
        },
        {
          "name": "no-data",
          "source": "v-select",
          "description": "Mixins.Filterable.slots.noData"
        },
        {
          "name": "selection",
          "props": {
            "parent": "VueComponent",
            "item": "object",
            "index": "number",
            "select": "function",
            "selected": "boolean",
            "disabled": "boolean"
          },
          "source": "v-select",
          "description": "Define a custom selection appearance"
        }
      ],
      "sass": [
        {
          "name": "$autocomplete-enclosed-input-margin-top",
          "default": "24px !default;",
          "description": "Missing description"
        },
        {
          "name": "$autocomplete-dense-enclosed-input-margin-top",
          "default": "20px !default;",
          "description": "Missing description"
        },
        {
          "name": "$autocomplete-focused-input",
          "default": "64px !default;",
          "description": "Missing description"
        }
      ]
    },
    "v-avatar": {
      "props": [
        {
          "name": "color",
          "type": "string",
          "default": "undefined",
          "source": "colorable",
          "description": "Missing description"
        },
        {
          "name": "size",
          "type": [
            "number",
            "string"
          ],
          "default": 48,
          "source": "v-avatar",
          "description": "Missing description"
        },
        {
          "name": "tile",
          "type": "boolean",
          "default": "false",
          "source": "v-avatar",
          "description": "Missing description"
        }
      ],
      "mixins": [
        "colorable"
      ],
      "slots": [
        {
          "name": "default",
          "description": "Missing description"
        }
      ],
      "sass": [
        {
          "name": "$avatar-border-radius",
          "default": "50% !default;",
          "description": "Missing description"
        }
      ]
    },
    "v-badge": {
      "props": [
        {
          "name": "bottom",
          "type": "boolean",
          "default": "false",
          "source": "positionable",
          "description": "Missing description"
        },
        {
          "name": "color",
          "type": "string",
          "default": "'primary'",
          "source": "colorable",
          "description": "Missing description"
        },
        {
          "name": "left",
          "type": "boolean",
          "default": "false",
          "source": "positionable",
          "description": "Missing description"
        },
        {
          "name": "mode",
          "type": "string",
          "default": "undefined",
          "source": "transitionable",
          "description": "Missing description"
        },
        {
          "name": "origin",
          "type": "string",
          "default": "undefined",
          "source": "transitionable",
          "description": "Missing description"
        },
        {
          "name": "overlap",
          "type": "boolean",
          "default": "false",
          "source": "v-badge",
          "description": "Overlaps the slotted content on top of the component."
        },
        {
          "name": "transition",
          "type": "string",
          "default": "'fab-transition'",
          "source": "transitionable",
          "description": "Missing description"
        },
        {
          "name": "value",
          "type": "any",
          "default": true,
          "source": "toggleable",
          "description": "Missing description"
        }
      ],
      "mixins": [
        "colorable",
        "toggleable",
        "positionable",
        "transitionable"
      ],
      "slots": [
        {
          "name": "badge",
          "description": "Missing description"
        },
        {
          "name": "default",
          "description": "Missing description"
        }
      ],
      "sass": [
        {
          "name": "$badge-border-radius",
          "default": "10px !default;",
          "description": "Missing description"
        },
        {
          "name": "$badge-bordered-width",
          "default": "2px !default;",
          "description": "Missing description"
        },
        {
          "name": "$badge-color",
          "default": "map-get($shades, 'white') !default;",
          "description": "Missing description"
        },
        {
          "name": "$badge-dot-border-radius",
          "default": "4.5px;",
          "description": "Missing description"
        },
        {
          "name": "$badge-dot-border-width",
          "default": "1.5px !default;",
          "description": "Missing description"
        },
        {
          "name": "$badge-dot-height",
          "default": "9px !default;",
          "description": "Missing description"
        },
        {
          "name": "$badge-dot-width",
          "default": "9px !default;",
          "description": "Missing description"
        },
        {
          "name": "$badge-font-family",
          "default": "$body-font-family !default;",
          "description": "Missing description"
        },
        {
          "name": "$badge-font-size",
          "default": "12px !default;",
          "description": "Missing description"
        },
        {
          "name": "$badge-height",
          "default": "20px !default;",
          "description": "Missing description"
        },
        {
          "name": "$badge-icon-margin",
          "default": "0 -2px !default;",
          "description": "Missing description"
        },
        {
          "name": "$badge-icon-padding",
          "default": "4px 6px !default;",
          "description": "Missing description"
        },
        {
          "name": "$badge-letter-spacing",
          "default": "0 !default;",
          "description": "Missing description"
        },
        {
          "name": "$badge-line-height",
          "default": "1 !default;",
          "description": "Missing description"
        },
        {
          "name": "$badge-min-width",
          "default": "20px !default;",
          "description": "Missing description"
        },
        {
          "name": "$badge-padding",
          "default": "4px 6px !default;",
          "description": "Missing description"
        },
        {
          "name": "$badge-right",
          "default": "auto !default;",
          "description": "Missing description"
        },
        {
          "name": "$badge-top",
          "default": "auto !default;",
          "description": "Missing description"
        },
        {
          "name": "$badge-wrapper-margin",
          "default": "0 4px !default;",
          "description": "Missing description"
        }
      ]
    },
    "v-bottom-nav": {
      "props": [
        {
          "name": "absolute",
          "type": "boolean",
          "default": "false",
          "source": "positionable",
          "description": "Missing description"
        },
        {
          "name": "active",
          "type": [
            "number",
            "string"
          ],
          "default": "undefined",
          "source": "v-bottom-nav",
          "description": "Missing description"
        },
        {
          "name": "app",
          "type": "boolean",
          "default": "false",
          "source": "applicationable",
          "description": "Missing description"
        },
        {
          "name": "color",
          "type": "string",
          "default": "undefined",
          "source": "colorable",
          "description": "Missing description"
        },
        {
          "name": "dark",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "fixed",
          "type": "boolean",
          "default": "false",
          "source": "positionable",
          "description": "Missing description"
        },
        {
          "name": "height",
          "type": [
            "number",
            "string"
          ],
          "default": 56,
          "source": "v-bottom-nav",
          "description": "Missing description"
        },
        {
          "name": "light",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "mandatory",
          "type": "boolean",
          "default": "false",
          "source": "v-bottom-nav",
          "description": "Missing description"
        },
        {
          "name": "shift",
          "type": "boolean",
          "default": "false",
          "source": "v-bottom-nav",
          "description": "Missing description"
        },
        {
          "name": "value",
          "type": "any",
          "default": "undefined",
          "source": "v-bottom-nav",
          "description": "Missing description"
        }
      ],
      "mixins": [
        "applicationable",
        "positionable",
        "colorable",
        "themeable"
      ],
      "sass": []
    },
    "v-bottom-sheet": {
      "props": [
        {
          "name": "disabled",
          "type": "boolean",
          "default": "false",
          "source": "v-bottom-sheet",
          "description": "Missing description"
        },
        {
          "name": "fullWidth",
          "type": "boolean",
          "default": "false",
          "source": "v-bottom-sheet",
          "description": "Missing description"
        },
        {
          "name": "hideOverlay",
          "type": "boolean",
          "default": "false",
          "source": "v-bottom-sheet",
          "description": "Missing description"
        },
        {
          "name": "inset",
          "type": "boolean",
          "default": "false",
          "source": "v-bottom-sheet",
          "description": "Reduces the sheet content maximum width to 70%."
        },
        {
          "name": "lazy",
          "type": "boolean",
          "default": "false",
          "source": "v-bottom-sheet",
          "description": "Missing description"
        },
        {
          "name": "maxWidth",
          "type": [
            "string",
            "number"
          ],
          "default": "auto",
          "source": "v-bottom-sheet",
          "description": "Components.Dialogs.props.maxWidth"
        },
        {
          "name": "persistent",
          "type": "boolean",
          "default": "false",
          "source": "v-bottom-sheet",
          "description": "Missing description"
        },
        {
          "name": "value",
          "type": "any",
          "default": "undefined",
          "source": "v-bottom-sheet",
          "description": "Missing description"
        }
      ],
      "mixins": [],
      "slots": [
        {
          "name": "activator",
          "props": {
            "on": "{ [eventName]: eventHandler }",
            "value": "boolean"
          },
          "description": "Missing description"
        },
        {
          "name": "default",
          "description": "Missing description"
        }
      ],
      "sass": [
        {
          "name": "$bottom-sheet-inset-width",
          "default": "70% !default;",
          "description": "Missing description"
        }
      ]
    },
    "v-breadcrumbs": {
      "props": [
        {
          "name": "dark",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "divider",
          "type": "string",
          "default": "'/'",
          "source": "v-breadcrumbs",
          "description": "Specifies the dividing character between items."
        },
        {
          "name": "items",
          "type": "array",
          "default": [],
          "source": "v-breadcrumbs",
          "example": [
            {
              "disabled": "boolean",
              "exact": "boolean",
              "href": "string",
              "link": "boolean",
              "text": "string | number",
              "to": "string | object"
            }
          ],
          "description": "An array of objects for each breadcrumb."
        },
        {
          "name": "justifyCenter",
          "type": "boolean",
          "default": "false",
          "source": "v-breadcrumbs",
          "description": "Align the breadcrumbs center."
        },
        {
          "name": "justifyEnd",
          "type": "boolean",
          "default": "false",
          "source": "v-breadcrumbs",
          "description": "Align the breadcrumbs at the end."
        },
        {
          "name": "large",
          "type": "boolean",
          "default": "false",
          "source": "v-breadcrumbs",
          "description": "Increase the font-size of the breadcrumb item text to 16px (14px default)."
        },
        {
          "name": "light",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        }
      ],
      "mixins": [
        "themeable"
      ],
      "slots": [
        {
          "name": "divider",
          "description": "Missing description"
        },
        {
          "name": "item",
          "props": {
            "item": "any[]"
          },
          "description": "Missing description"
        },
        {
          "name": "default",
          "description": "Missing description"
        }
      ],
      "sass": [
        {
          "name": "$breadcrumbs-flex",
          "default": "0 1 auto !default;",
          "description": "Missing description"
        },
        {
          "name": "$breadcrumbs-padding",
          "default": "0 14px !default;",
          "description": "Missing description"
        },
        {
          "name": "$breadcrumbs-even-child-padding",
          "default": "0 12px !default;",
          "description": "Missing description"
        },
        {
          "name": "$breadcrumbs-item-font-size",
          "default": "14px !default;",
          "description": "Missing description"
        },
        {
          "name": "$breadcrumbs-item-large-font-size",
          "default": "16px !default;",
          "description": "Missing description"
        },
        {
          "name": "$breadcrumbs-margin",
          "default": "0 !default;",
          "description": "Missing description"
        }
      ]
    },
    "v-breadcrumbs-item": {
      "props": [
        {
          "name": "activeClass",
          "type": "string",
          "default": "'v-breadcrumbs__item--disabled'",
          "source": "routable",
          "description": "Missing description"
        },
        {
          "name": "append",
          "type": "boolean",
          "default": "false",
          "source": "routable",
          "description": "Missing description"
        },
        {
          "name": "disabled",
          "type": "boolean",
          "default": "false",
          "source": "routable",
          "description": "Missing description"
        },
        {
          "name": "exact",
          "type": "boolean",
          "default": "false",
          "source": "routable",
          "description": "Missing description"
        },
        {
          "name": "exactActiveClass",
          "type": "string",
          "default": "undefined",
          "source": "routable",
          "description": "Missing description"
        },
        {
          "name": "href",
          "type": [
            "string",
            "object"
          ],
          "default": "undefined",
          "source": "routable",
          "description": "Missing description"
        },
        {
          "name": "nuxt",
          "type": "boolean",
          "default": "false",
          "source": "routable",
          "description": "Missing description"
        },
        {
          "name": "replace",
          "type": "boolean",
          "default": "false",
          "source": "routable",
          "description": "Missing description"
        },
        {
          "name": "ripple",
          "type": [
            "boolean",
            "object"
          ],
          "default": "undefined",
          "source": "routable",
          "description": "Missing description"
        },
        {
          "name": "tag",
          "type": "string",
          "default": "undefined",
          "source": "routable",
          "description": "Missing description"
        },
        {
          "name": "target",
          "type": "string",
          "default": "undefined",
          "source": "routable",
          "description": "Missing description"
        },
        {
          "name": "to",
          "type": [
            "string",
            "object"
          ],
          "default": "undefined",
          "source": "routable",
          "description": "Missing description"
        }
      ],
      "mixins": [
        "routable"
      ],
      "slots": [
        {
          "name": "default",
          "description": "Missing description"
        }
      ],
      "sass": []
    },
    "v-breadcrumbs-divider": {
      "props": [],
      "mixins": [],
      "sass": []
    },
    "v-btn": {
      "props": [
        {
          "name": "absolute",
          "type": "boolean",
          "default": "false",
          "source": "positionable",
          "description": "Missing description"
        },
        {
          "name": "activeClass",
          "type": "string",
          "default": "'v-btn--active'",
          "source": "routable",
          "description": "Missing description"
        },
        {
          "name": "append",
          "type": "boolean",
          "default": "false",
          "source": "routable",
          "description": "Missing description"
        },
        {
          "name": "block",
          "type": "boolean",
          "default": "false",
          "source": "v-btn",
          "description": "Expands the button to 100% of available space."
        },
        {
          "name": "bottom",
          "type": "boolean",
          "default": "false",
          "source": "positionable",
          "description": "Missing description"
        },
        {
          "name": "color",
          "type": "string",
          "default": "undefined",
          "source": "colorable",
          "description": "Missing description"
        },
        {
          "name": "dark",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "depressed",
          "type": "boolean",
          "default": "false",
          "source": "v-btn",
          "description": "Removes the button box shadow."
        },
        {
          "name": "disabled",
          "type": "boolean",
          "default": "false",
          "source": "routable",
          "description": "Missing description"
        },
        {
          "name": "exact",
          "type": "boolean",
          "default": "false",
          "source": "routable",
          "description": "Missing description"
        },
        {
          "name": "exactActiveClass",
          "type": "string",
          "default": "undefined",
          "source": "routable",
          "description": "Missing description"
        },
        {
          "name": "fab",
          "type": "boolean",
          "default": "false",
          "source": "v-btn",
          "description": "Designates the button as a floating-action-button - _round_."
        },
        {
          "name": "fixed",
          "type": "boolean",
          "default": "false",
          "source": "positionable",
          "description": "Missing description"
        },
        {
          "name": "flat",
          "type": "boolean",
          "default": "false",
          "source": "v-btn",
          "description": "Missing description"
        },
        {
          "name": "href",
          "type": [
            "string",
            "object"
          ],
          "default": "undefined",
          "source": "routable",
          "description": "Missing description"
        },
        {
          "name": "icon",
          "type": "boolean",
          "default": "false",
          "source": "v-btn",
          "description": "Designates the button as icon - _round and flat_"
        },
        {
          "name": "inputValue",
          "type": "any",
          "default": "undefined",
          "source": "toggleable",
          "description": "Missing description"
        },
        {
          "name": "large",
          "type": "boolean",
          "default": "false",
          "source": "v-btn",
          "description": "Missing description"
        },
        {
          "name": "left",
          "type": "boolean",
          "default": "false",
          "source": "positionable",
          "description": "Missing description"
        },
        {
          "name": "light",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "loading",
          "type": "boolean",
          "default": "false",
          "source": "v-btn",
          "description": "Adds a loading icon animation"
        },
        {
          "name": "nuxt",
          "type": "boolean",
          "default": "false",
          "source": "routable",
          "description": "Missing description"
        },
        {
          "name": "outline",
          "type": "boolean",
          "default": "false",
          "source": "v-btn",
          "description": "Missing description"
        },
        {
          "name": "replace",
          "type": "boolean",
          "default": "false",
          "source": "routable",
          "description": "Missing description"
        },
        {
          "name": "right",
          "type": "boolean",
          "default": "false",
          "source": "positionable",
          "description": "Missing description"
        },
        {
          "name": "ripple",
          "type": [
            "boolean",
            "object"
          ],
          "default": "undefined",
          "source": "routable",
          "description": "Missing description"
        },
        {
          "name": "round",
          "type": "boolean",
          "default": "false",
          "source": "v-btn",
          "description": "Missing description"
        },
        {
          "name": "small",
          "type": "boolean",
          "default": "false",
          "source": "v-btn",
          "description": "Missing description"
        },
        {
          "name": "tag",
          "type": "string",
          "default": "'button'",
          "source": "routable",
          "description": "Missing description"
        },
        {
          "name": "target",
          "type": "string",
          "default": "undefined",
          "source": "routable",
          "description": "Missing description"
        },
        {
          "name": "to",
          "type": [
            "string",
            "object"
          ],
          "default": "undefined",
          "source": "routable",
          "description": "Missing description"
        },
        {
          "name": "top",
          "type": "boolean",
          "default": "false",
          "source": "positionable",
          "description": "Missing description"
        },
        {
          "name": "type",
          "type": "string",
          "default": "'button'",
          "source": "v-btn",
          "description": "Set the button's **type** attribute"
        },
        {
          "name": "value",
          "type": "any",
          "default": "undefined",
          "source": "v-btn",
          "description": "Mixins.Groupable.props.value"
        }
      ],
      "mixins": [
        "colorable",
        "routable",
        "positionable",
        "themeable",
        "groupable",
        "toggleable"
      ],
      "slots": [
        {
          "name": "loader",
          "description": "Missing description"
        },
        {
          "name": "default",
          "description": "Missing description"
        }
      ],
      "events": [
        {
          "name": "click",
          "value": "Event",
          "description": "Missing description"
        }
      ],
      "sass": [
        {
          "name": "$btn-active-opacity",
          "default": "0.18 !default;",
          "description": "Missing description"
        },
        {
          "name": "$btn-border-radius",
          "default": "$border-radius-root !default;",
          "description": "Missing description"
        },
        {
          "name": "$btn-focus-opacity",
          "default": "0.24 !default;",
          "description": "Missing description"
        },
        {
          "name": "$btn-font-weight",
          "default": "500 !default;",
          "description": "Missing description"
        },
        {
          "name": "$btn-hover-opacity",
          "default": "0.08 !default;",
          "description": "Missing description"
        },
        {
          "name": "$btn-icon-font-size",
          "default": "18px !default;",
          "description": "Missing description"
        },
        {
          "name": "$btn-icon-padding",
          "default": "12px !default;",
          "description": "Missing description"
        },
        {
          "name": "$btn-letter-spacing",
          "default": ".0892857143em !default;",
          "description": "Missing description"
        },
        {
          "name": "$btn-outline-border-width",
          "default": "thin !default;",
          "description": "Missing description"
        },
        {
          "name": "$btn-rounded-border-radius",
          "default": "28px !default;",
          "description": "Missing description"
        },
        {
          "name": "$btn-text-transform",
          "default": "uppercase !default;",
          "description": "Missing description"
        },
        {
          "name": "$btn-transition-duration",
          "default": "0.28s !default;",
          "description": "Missing description"
        },
        {
          "name": "$btn-transition-fn",
          "default": "map-get($transition, 'fast-out-slow-in') !default;",
          "description": "Missing description"
        },
        {
          "name": "$btn-transition",
          "default": "opacity 0.2s map-get($transition, 'ease-in-out') !default;",
          "description": "Missing description"
        },
        {
          "name": "$btn-sizes",
          "default": "map-deep-merge(\n  (\n    'x-small': 20,\n    'small': 28,\n    'default': 36,\n    'large': 44,\n    'x-large': 52\n  ),\n  $btn-sizes\n);",
          "description": "Missing description"
        },
        {
          "name": "$btn-font-sizes",
          "default": "map-deep-merge(\n  (\n    'x-small': .625rem,\n    'small': .75rem,\n    'default': .875rem,\n    'large': .875rem,\n    'x-large': 1rem\n  ),\n  $btn-font-sizes\n);",
          "description": "Missing description"
        },
        {
          "name": "$fab-sizes",
          "default": "map-deep-merge(\n  (\n    'x-small': 32,\n    'small': 40,\n    'default': 56,\n    'large': 64,\n    'x-large': 72\n  ),\n  $fab-sizes\n);",
          "description": "Missing description"
        },
        {
          "name": "$fab-icon-sizes",
          "default": "map-deep-merge(\n  (\n    'x-small': 18,\n    'small': 24,\n    'default': 24,\n    'large': 28,\n    'x-large': 32\n  ),\n  $fab-icon-sizes\n);",
          "description": "Missing description"
        }
      ]
    },
    "v-btn-toggle": {
      "props": [
        {
          "name": "activeClass",
          "type": "string",
          "default": "'v-btn--active'",
          "source": "base-item-group",
          "description": "Missing description"
        },
        {
          "name": "dark",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "light",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "mandatory",
          "type": "boolean",
          "default": "false",
          "source": "base-item-group",
          "description": "Missing description"
        },
        {
          "name": "max",
          "type": [
            "number",
            "string"
          ],
          "default": "undefined",
          "source": "base-item-group",
          "description": "Missing description"
        },
        {
          "name": "multiple",
          "type": "boolean",
          "default": "false",
          "source": "base-item-group",
          "description": "Missing description"
        },
        {
          "name": "value",
          "type": "any",
          "default": "undefined",
          "source": "proxyable",
          "description": "Missing description"
        }
      ],
      "mixins": [
        "proxyable",
        "themeable"
      ],
      "events": [
        {
          "name": "change",
          "value": "any[] | any",
          "description": "Missing description"
        }
      ],
      "slots": [
        {
          "name": "default",
          "description": "Missing description"
        }
      ],
      "sass": [
        {
          "name": "$btn-toggle-border-radius",
          "default": "$border-radius-root !default;",
          "description": "Missing description"
        },
        {
          "name": "$btn-toggle-shaped-border-radius",
          "default": "24px !default;",
          "description": "Missing description"
        },
        {
          "name": "$btn-toggle-btn-height",
          "default": "48px !default;",
          "description": "Missing description"
        },
        {
          "name": "$btn-toggle-btn-padding",
          "default": "0 12px !default;",
          "description": "Missing description"
        },
        {
          "name": "$btn-toggle-btn-width",
          "default": "48px !default;",
          "description": "Missing description"
        },
        {
          "name": "$btn-toggle-btn-opacity",
          "default": "0.8 !default;",
          "description": "Missing description"
        },
        {
          "name": "$btn-toggle-round-border-radius",
          "default": "24px !default;",
          "description": "Missing description"
        },
        {
          "name": "$btn-toggle-dense-btn-padding",
          "default": "0 8px !default;",
          "description": "Missing description"
        },
        {
          "name": "$btn-toggle-group-btn-margin",
          "default": "4px !default;",
          "description": "Missing description"
        }
      ]
    },
    "v-calendar": {
      "props": [
        {
          "name": "color",
          "type": "string",
          "default": "undefined",
          "source": "colorable",
          "description": "Missing description"
        },
        {
          "name": "dark",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "dayFormat",
          "type": "function",
          "default": "null",
          "source": "calendar-base",
          "description": "Missing description"
        },
        {
          "name": "end",
          "type": "string",
          "default": "'0000-00-00'",
          "source": "calendar-base",
          "description": "Missing description"
        },
        {
          "name": "firstInterval",
          "type": [
            "number",
            "string"
          ],
          "default": 0,
          "source": "v-calendar",
          "description": "The first interval to display in the `day` view. If `intervalMinutes` is set to 60 and this is set to 9 the first time in the view is 9am."
        },
        {
          "name": "hideHeader",
          "type": "boolean",
          "default": "false",
          "source": "calendar-base",
          "description": "Missing description"
        },
        {
          "name": "intervalCount",
          "type": [
            "number",
            "string"
          ],
          "default": 24,
          "source": "v-calendar",
          "description": "The number of intervals to display in the `day` view."
        },
        {
          "name": "intervalFormat",
          "type": "function",
          "default": "null",
          "source": "v-calendar",
          "description": "Formats time of day string that appears in the interval gutter of the `day` and `week` view to specified locale"
        },
        {
          "name": "intervalHeight",
          "type": [
            "number",
            "string"
          ],
          "default": 40,
          "source": "v-calendar",
          "description": "The height of an interval in pixels in the `day` view."
        },
        {
          "name": "intervalMinutes",
          "type": [
            "number",
            "string"
          ],
          "default": 60,
          "source": "v-calendar",
          "description": "The number of minutes the intervals are in the `day` view. A common interval is 60 minutes so the intervals are an hour."
        },
        {
          "name": "intervalStyle",
          "type": "function",
          "default": "null",
          "source": "v-calendar",
          "description": "Returns CSS styling to apply to the interval."
        },
        {
          "name": "light",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "locale",
          "type": "string",
          "default": "'en-us'",
          "source": "calendar-base",
          "description": "Missing description"
        },
        {
          "name": "maxDays",
          "type": "number",
          "default": 7,
          "source": "v-calendar",
          "description": "The maximum number of days to display in the custom calendar if an `end` day is not set."
        },
        {
          "name": "minWeeks",
          "type": "any",
          "default": 1,
          "source": "v-calendar",
          "description": "The minimum number of weeks to display in the `month` or `week` view."
        },
        {
          "name": "monthFormat",
          "type": "function",
          "default": "null",
          "source": "v-calendar",
          "description": "Formats month string that appears in a day to specified locale"
        },
        {
          "name": "now",
          "type": "string",
          "default": "undefined",
          "source": "times",
          "description": "Missing description"
        },
        {
          "name": "shortIntervals",
          "type": "boolean",
          "default": "true",
          "source": "v-calendar",
          "description": "If true, the intervals in the `day` view will be 9 AM as opposed to 09:00 AM"
        },
        {
          "name": "shortMonths",
          "type": "boolean",
          "default": "true",
          "source": "v-calendar",
          "description": "Whether the short versions of a month should be used (Jan vs January)."
        },
        {
          "name": "shortWeekdays",
          "type": "boolean",
          "default": "true",
          "source": "calendar-base",
          "description": "Missing description"
        },
        {
          "name": "showIntervalLabel",
          "type": "function",
          "default": "null",
          "source": "v-calendar",
          "description": "Checks if a given day and time should be displayed in the interval gutter of the `day` view."
        },
        {
          "name": "showMonthOnFirst",
          "type": "boolean",
          "default": "true",
          "source": "v-calendar",
          "description": "Whether the name of the month should be displayed on the first day of the month."
        },
        {
          "name": "start",
          "type": "string",
          "default": "'2020-08-13'",
          "source": "calendar-base",
          "description": "Missing description"
        },
        {
          "name": "type",
          "type": "string",
          "default": "'month'",
          "source": "v-calendar",
          "description": "A string which is one of `month`, `week`, `day`, `4day`, `custom-weekly`, `custom-daily`, and `category`. The custom types look at the `start` and `end` dates passed to the component as opposed to the `value`."
        },
        {
          "name": "value",
          "type": "string",
          "default": "undefined",
          "source": "v-calendar",
          "description": "A date in the format of `YYYY-MM-DD` which determines what span of time for the calendar."
        },
        {
          "name": "weekdayFormat",
          "type": "function",
          "default": "null",
          "source": "calendar-base",
          "description": "Missing description"
        },
        {
          "name": "weekdays",
          "type": "array",
          "default": [
            0,
            1,
            2,
            3,
            4,
            5,
            6
          ],
          "source": "calendar-base",
          "description": "Missing description"
        }
      ],
      "mixins": [
        "colorable",
        "themeable",
        "times",
        "mouse"
      ],
      "slots": [
        {
          "name": "category",
          "props": {
            "date": "string",
            "time": "string",
            "year": "number",
            "month": "number",
            "day": "number",
            "hour": "number",
            "minute": "number",
            "weekday": "number",
            "hasDay": "boolean",
            "hasTime": "boolean",
            "past": "boolean",
            "present": "boolean",
            "future": "boolean",
            "week": [
              {
                "date": "string",
                "time": "string",
                "year": "number",
                "month": "number",
                "day": "number",
                "hour": "number",
                "minute": "number",
                "weekday": "number",
                "hasDay": "boolean",
                "hasTime": "boolean",
                "past": "boolean",
                "present": "boolean",
                "future": "boolean"
              }
            ],
            "category": "string | null"
          },
          "description": "Missing description"
        },
        {
          "name": "event",
          "props": {
            "event": "any",
            "eventParsed": {
              "input": "any",
              "start": {
                "date": "string",
                "time": "string",
                "year": "number",
                "month": "number",
                "day": "number",
                "hour": "number",
                "minute": "number",
                "weekday": "number",
                "hasDay": "boolean",
                "hasTime": "boolean",
                "past": "boolean",
                "present": "boolean",
                "future": "boolean"
              },
              "startIdentifier": "number",
              "startTimestampIdentifier": "number",
              "end": {
                "date": "string",
                "time": "string",
                "year": "number",
                "month": "number",
                "day": "number",
                "hour": "number",
                "minute": "number",
                "weekday": "number",
                "hasDay": "boolean",
                "hasTime": "boolean",
                "past": "boolean",
                "present": "boolean",
                "future": "boolean"
              },
              "endIdentifier": "number",
              "endTimestampIdentifier": "number",
              "allDay": "boolean",
              "index": "number",
              "category": "string"
            },
            "day": {
              "outside": "boolean",
              "index": "number",
              "week": [
                {
                  "date": "string",
                  "time": "string",
                  "year": "number",
                  "month": "number",
                  "day": "number",
                  "hour": "number",
                  "minute": "number",
                  "weekday": "number",
                  "hasDay": "boolean",
                  "hasTime": "boolean",
                  "past": "boolean",
                  "present": "boolean",
                  "future": "boolean"
                }
              ],
              "date": "string",
              "time": "string",
              "year": "number",
              "month": "number",
              "day": "number",
              "hour": "number",
              "minute": "number",
              "weekday": "number",
              "hasDay": "boolean",
              "hasTime": "boolean",
              "past": "boolean",
              "present": "boolean",
              "future": "boolean"
            },
            "outside": "boolean",
            "start": "boolean",
            "end": "boolean",
            "timed": "boolean",
            "singleline": "boolean",
            "overlapsNoon": "boolean",
            "formatTime": "(time: VTimestamp, ampm: boolean): string",
            "timeSummary": "(): string",
            "eventSummary": "(): string"
          },
          "description": "Missing description"
        },
        {
          "name": "day",
          "props": {
            "outside": "boolean",
            "index": "number",
            "week": [
              {
                "date": "string",
                "time": "string",
                "year": "number",
                "month": "number",
                "day": "number",
                "hour": "number",
                "minute": "number",
                "weekday": "number",
                "hasDay": "boolean",
                "hasTime": "boolean",
                "past": "boolean",
                "present": "boolean",
                "future": "boolean"
              }
            ],
            "date": "string",
            "time": "string",
            "year": "number",
            "month": "number",
            "day": "number",
            "hour": "number",
            "minute": "number",
            "weekday": "number",
            "hasDay": "boolean",
            "hasTime": "boolean",
            "past": "boolean",
            "present": "boolean",
            "future": "boolean"
          },
          "description": "Missing description"
        },
        {
          "name": "day-body",
          "props": {
            "date": "string",
            "time": "string",
            "year": "number",
            "month": "number",
            "day": "number",
            "hour": "number",
            "minute": "number",
            "weekday": "number",
            "hasDay": "boolean",
            "hasTime": "boolean",
            "past": "boolean",
            "present": "boolean",
            "future": "boolean",
            "timeToY": "(time: string | number | {hour: number, minute: number}, clamp: boolean = false): number | false",
            "timeDelta": "(time: string | number | {hour: number, minute: number}): number | false",
            "minutesToPixels": "(minutes: number): number",
            "week": [
              {
                "date": "string",
                "time": "string",
                "year": "number",
                "month": "number",
                "day": "number",
                "hour": "number",
                "minute": "number",
                "weekday": "number",
                "hasDay": "boolean",
                "hasTime": "boolean",
                "past": "boolean",
                "present": "boolean",
                "future": "boolean"
              }
            ]
          },
          "description": "Missing description"
        },
        {
          "name": "day-header",
          "props": {
            "date": "string",
            "time": "string",
            "year": "number",
            "month": "number",
            "day": "number",
            "hour": "number",
            "minute": "number",
            "weekday": "number",
            "hasDay": "boolean",
            "hasTime": "boolean",
            "past": "boolean",
            "present": "boolean",
            "future": "boolean",
            "timeToY": "(time: string | number | {hour: number, minute: number}, clamp: boolean = false): number | false",
            "timeDelta": "(time: string | number | {hour: number, minute: number}): number | false",
            "minutesToPixels": "(minutes: number): number",
            "week": [
              {
                "date": "string",
                "time": "string",
                "year": "number",
                "month": "number",
                "day": "number",
                "hour": "number",
                "minute": "number",
                "weekday": "number",
                "hasDay": "boolean",
                "hasTime": "boolean",
                "past": "boolean",
                "present": "boolean",
                "future": "boolean"
              }
            ]
          },
          "description": "Missing description"
        },
        {
          "name": "day-label",
          "props": {
            "date": "string",
            "time": "string",
            "year": "number",
            "month": "number",
            "day": "number",
            "hour": "number",
            "minute": "number",
            "weekday": "number",
            "hasDay": "boolean",
            "hasTime": "boolean",
            "past": "boolean",
            "present": "boolean",
            "future": "boolean"
          },
          "description": "Missing description"
        },
        {
          "name": "day-label-header",
          "props": {
            "date": "string",
            "time": "string",
            "year": "number",
            "month": "number",
            "day": "number",
            "hour": "number",
            "minute": "number",
            "weekday": "number",
            "hasDay": "boolean",
            "hasTime": "boolean",
            "past": "boolean",
            "present": "boolean",
            "future": "boolean"
          },
          "description": "Missing description"
        },
        {
          "name": "day-month",
          "props": {
            "date": "string",
            "time": "string",
            "year": "number",
            "month": "number",
            "day": "number",
            "hour": "number",
            "minute": "number",
            "weekday": "number",
            "hasDay": "boolean",
            "hasTime": "boolean",
            "past": "boolean",
            "present": "boolean",
            "future": "boolean"
          },
          "description": "Missing description"
        },
        {
          "name": "interval",
          "props": {
            "date": "string",
            "time": "string",
            "year": "number",
            "month": "number",
            "day": "number",
            "hour": "number",
            "minute": "number",
            "weekday": "number",
            "hasDay": "boolean",
            "hasTime": "boolean",
            "past": "boolean",
            "present": "boolean",
            "future": "boolean",
            "timeToY": "(time: string | number | {hour: number, minute: number}, clamp: boolean = false): number | false",
            "timeDelta": "(time: string | number | {hour: number, minute: number}): number | false",
            "minutesToPixels": "(minutes: number): number",
            "week": [
              {
                "date": "string",
                "time": "string",
                "year": "number",
                "month": "number",
                "day": "number",
                "hour": "number",
                "minute": "number",
                "weekday": "number",
                "hasDay": "boolean",
                "hasTime": "boolean",
                "past": "boolean",
                "present": "boolean",
                "future": "boolean"
              }
            ]
          },
          "description": "Missing description"
        }
      ],
      "functions": [
        {
          "name": "title",
          "signature": "string",
          "description": "Missing description"
        },
        {
          "name": "checkChange",
          "signature": "(): void",
          "description": "Missing description"
        },
        {
          "name": "updateTimes",
          "signature": "(): void",
          "description": "Missing description"
        },
        {
          "name": "next",
          "signature": "(amount: number = 1): void",
          "description": "Missing description"
        },
        {
          "name": "prev",
          "signature": "(amount: number = 1): void",
          "description": "Missing description"
        },
        {
          "name": "move",
          "signature": "(amount: number = 1): void",
          "description": "Missing description"
        },
        {
          "name": "timeToY",
          "signature": "(time: number | string | { hour: number, minute: number }, clamp: boolean = true): number | false",
          "description": "Missing description"
        },
        {
          "name": "timeDelta",
          "signature": "(time: number | string | { hour: number, minute: number }): number | false",
          "description": "Missing description"
        },
        {
          "name": "minutesToPixels",
          "signature": "(minutes: number): number",
          "description": "Missing description"
        },
        {
          "name": "scrollToTime",
          "signature": "(time: number | string | { hour: number, minute: number }): boolean",
          "description": "Missing description"
        },
        {
          "name": "getVisibleEvents",
          "signature": "(): CalendarEventParsed[]",
          "description": "Missing description"
        },
        {
          "name": "parseEvent",
          "signature": "(input: CalendarEvent, index: number = 0): CalendarEventParsed",
          "description": "Missing description"
        },
        {
          "name": "parseTimestamp",
          "signature": "(input: VTimestampInput, required?: false): CalendarTimestamp | null",
          "description": "Missing description"
        },
        {
          "name": "timestampToDate",
          "signature": "(timestamp: CalendarTimestamp): Date",
          "description": "Missing description"
        }
      ],
      "events": [
        {
          "name": "input",
          "value": {
            "date": "string",
            "time": "string",
            "year": "number",
            "month": "number",
            "day": "number",
            "hour": "number",
            "minute": "number",
            "weekday": "number",
            "hasDay": "boolean",
            "hasTime": "boolean",
            "past": "boolean",
            "present": "boolean",
            "future": "boolean"
          },
          "description": "Missing description"
        },
        {
          "name": "moved",
          "value": {
            "date": "string",
            "time": "string",
            "year": "number",
            "month": "number",
            "day": "number",
            "hour": "number",
            "minute": "number",
            "weekday": "number",
            "hasDay": "boolean",
            "hasTime": "boolean",
            "past": "boolean",
            "present": "boolean",
            "future": "boolean"
          },
          "description": "Missing description"
        },
        {
          "name": "change",
          "value": {
            "start": {
              "date": "string",
              "time": "string",
              "year": "number",
              "month": "number",
              "day": "number",
              "hour": "number",
              "minute": "number",
              "weekday": "number",
              "hasDay": "boolean",
              "hasTime": "boolean",
              "past": "boolean",
              "present": "boolean",
              "future": "boolean"
            },
            "end": {
              "date": "string",
              "time": "string",
              "year": "number",
              "month": "number",
              "day": "number",
              "hour": "number",
              "minute": "number",
              "weekday": "number",
              "hasDay": "boolean",
              "hasTime": "boolean",
              "past": "boolean",
              "present": "boolean",
              "future": "boolean"
            }
          },
          "description": "Missing description"
        },
        {
          "name": "click:date",
          "value": {
            "date": "string",
            "time": "string",
            "year": "number",
            "month": "number",
            "day": "number",
            "hour": "number",
            "minute": "number",
            "weekday": "number",
            "hasDay": "boolean",
            "hasTime": "boolean",
            "past": "boolean",
            "present": "boolean",
            "future": "boolean",
            "timeToY": "(time: string | number | {hour: number, minute: number}, clamp: boolean = false): number | false",
            "timeDelta": "(time: string | number | {hour: number, minute: number}): number | false",
            "minutesToPixels": "(minutes: number): number",
            "week": [
              {
                "date": "string",
                "time": "string",
                "year": "number",
                "month": "number",
                "day": "number",
                "hour": "number",
                "minute": "number",
                "weekday": "number",
                "hasDay": "boolean",
                "hasTime": "boolean",
                "past": "boolean",
                "present": "boolean",
                "future": "boolean"
              }
            ]
          },
          "description": "Missing description"
        },
        {
          "name": "contextmenu:date",
          "value": {
            "date": "string",
            "time": "string",
            "year": "number",
            "month": "number",
            "day": "number",
            "hour": "number",
            "minute": "number",
            "weekday": "number",
            "hasDay": "boolean",
            "hasTime": "boolean",
            "past": "boolean",
            "present": "boolean",
            "future": "boolean",
            "timeToY": "(time: string | number | {hour: number, minute: number}, clamp: boolean = false): number | false",
            "timeDelta": "(time: string | number | {hour: number, minute: number}): number | false",
            "minutesToPixels": "(minutes: number): number",
            "week": [
              {
                "date": "string",
                "time": "string",
                "year": "number",
                "month": "number",
                "day": "number",
                "hour": "number",
                "minute": "number",
                "weekday": "number",
                "hasDay": "boolean",
                "hasTime": "boolean",
                "past": "boolean",
                "present": "boolean",
                "future": "boolean"
              }
            ]
          },
          "description": "Missing description"
        },
        {
          "name": "click:more",
          "value": {
            "date": "string",
            "time": "string",
            "year": "number",
            "month": "number",
            "day": "number",
            "hour": "number",
            "minute": "number",
            "weekday": "number",
            "hasDay": "boolean",
            "hasTime": "boolean",
            "past": "boolean",
            "present": "boolean",
            "future": "boolean"
          },
          "description": "Missing description"
        },
        {
          "name": "click:day",
          "value": {
            "date": "string",
            "time": "string",
            "year": "number",
            "month": "number",
            "day": "number",
            "hour": "number",
            "minute": "number",
            "weekday": "number",
            "hasDay": "boolean",
            "hasTime": "boolean",
            "past": "boolean",
            "present": "boolean",
            "future": "boolean",
            "timeToY": "(time: string | number | {hour: number, minute: number}, clamp: boolean = false): number | false",
            "timeDelta": "(time: string | number | {hour: number, minute: number}): number | false",
            "minutesToPixels": "(minutes: number): number",
            "week": [
              {
                "date": "string",
                "time": "string",
                "year": "number",
                "month": "number",
                "day": "number",
                "hour": "number",
                "minute": "number",
                "weekday": "number",
                "hasDay": "boolean",
                "hasTime": "boolean",
                "past": "boolean",
                "present": "boolean",
                "future": "boolean"
              }
            ]
          },
          "description": "Missing description"
        },
        {
          "name": "contextmenu:day",
          "value": {
            "date": "string",
            "time": "string",
            "year": "number",
            "month": "number",
            "day": "number",
            "hour": "number",
            "minute": "number",
            "weekday": "number",
            "hasDay": "boolean",
            "hasTime": "boolean",
            "past": "boolean",
            "present": "boolean",
            "future": "boolean",
            "timeToY": "(time: string | number | {hour: number, minute: number}, clamp: boolean = false): number | false",
            "timeDelta": "(time: string | number | {hour: number, minute: number}): number | false",
            "minutesToPixels": "(minutes: number): number",
            "week": [
              {
                "date": "string",
                "time": "string",
                "year": "number",
                "month": "number",
                "day": "number",
                "hour": "number",
                "minute": "number",
                "weekday": "number",
                "hasDay": "boolean",
                "hasTime": "boolean",
                "past": "boolean",
                "present": "boolean",
                "future": "boolean"
              }
            ]
          },
          "description": "Missing description"
        },
        {
          "name": "mousedown:day",
          "value": {
            "date": "string",
            "time": "string",
            "year": "number",
            "month": "number",
            "day": "number",
            "hour": "number",
            "minute": "number",
            "weekday": "number",
            "hasDay": "boolean",
            "hasTime": "boolean",
            "past": "boolean",
            "present": "boolean",
            "future": "boolean",
            "timeToY": "(time: string | number | {hour: number, minute: number}, clamp: boolean = false): number | false",
            "timeDelta": "(time: string | number | {hour: number, minute: number}): number | false",
            "minutesToPixels": "(minutes: number): number",
            "week": [
              {
                "date": "string",
                "time": "string",
                "year": "number",
                "month": "number",
                "day": "number",
                "hour": "number",
                "minute": "number",
                "weekday": "number",
                "hasDay": "boolean",
                "hasTime": "boolean",
                "past": "boolean",
                "present": "boolean",
                "future": "boolean"
              }
            ]
          },
          "description": "Missing description"
        },
        {
          "name": "mousemove:day",
          "value": {
            "date": "string",
            "time": "string",
            "year": "number",
            "month": "number",
            "day": "number",
            "hour": "number",
            "minute": "number",
            "weekday": "number",
            "hasDay": "boolean",
            "hasTime": "boolean",
            "past": "boolean",
            "present": "boolean",
            "future": "boolean",
            "timeToY": "(time: string | number | {hour: number, minute: number}, clamp: boolean = false): number | false",
            "timeDelta": "(time: string | number | {hour: number, minute: number}): number | false",
            "minutesToPixels": "(minutes: number): number",
            "week": [
              {
                "date": "string",
                "time": "string",
                "year": "number",
                "month": "number",
                "day": "number",
                "hour": "number",
                "minute": "number",
                "weekday": "number",
                "hasDay": "boolean",
                "hasTime": "boolean",
                "past": "boolean",
                "present": "boolean",
                "future": "boolean"
              }
            ]
          },
          "description": "Missing description"
        },
        {
          "name": "mouseup:day",
          "value": {
            "date": "string",
            "time": "string",
            "year": "number",
            "month": "number",
            "day": "number",
            "hour": "number",
            "minute": "number",
            "weekday": "number",
            "hasDay": "boolean",
            "hasTime": "boolean",
            "past": "boolean",
            "present": "boolean",
            "future": "boolean",
            "timeToY": "(time: string | number | {hour: number, minute: number}, clamp: boolean = false): number | false",
            "timeDelta": "(time: string | number | {hour: number, minute: number}): number | false",
            "minutesToPixels": "(minutes: number): number",
            "week": [
              {
                "date": "string",
                "time": "string",
                "year": "number",
                "month": "number",
                "day": "number",
                "hour": "number",
                "minute": "number",
                "weekday": "number",
                "hasDay": "boolean",
                "hasTime": "boolean",
                "past": "boolean",
                "present": "boolean",
                "future": "boolean"
              }
            ]
          },
          "description": "Missing description"
        },
        {
          "name": "mouseenter:day",
          "value": {
            "date": "string",
            "time": "string",
            "year": "number",
            "month": "number",
            "day": "number",
            "hour": "number",
            "minute": "number",
            "weekday": "number",
            "hasDay": "boolean",
            "hasTime": "boolean",
            "past": "boolean",
            "present": "boolean",
            "future": "boolean",
            "timeToY": "(time: string | number | {hour: number, minute: number}, clamp: boolean = false): number | false",
            "timeDelta": "(time: string | number | {hour: number, minute: number}): number | false",
            "minutesToPixels": "(minutes: number): number",
            "week": [
              {
                "date": "string",
                "time": "string",
                "year": "number",
                "month": "number",
                "day": "number",
                "hour": "number",
                "minute": "number",
                "weekday": "number",
                "hasDay": "boolean",
                "hasTime": "boolean",
                "past": "boolean",
                "present": "boolean",
                "future": "boolean"
              }
            ]
          },
          "description": "Missing description"
        },
        {
          "name": "mouseleave:day",
          "value": {
            "date": "string",
            "time": "string",
            "year": "number",
            "month": "number",
            "day": "number",
            "hour": "number",
            "minute": "number",
            "weekday": "number",
            "hasDay": "boolean",
            "hasTime": "boolean",
            "past": "boolean",
            "present": "boolean",
            "future": "boolean",
            "timeToY": "(time: string | number | {hour: number, minute: number}, clamp: boolean = false): number | false",
            "timeDelta": "(time: string | number | {hour: number, minute: number}): number | false",
            "minutesToPixels": "(minutes: number): number",
            "week": [
              {
                "date": "string",
                "time": "string",
                "year": "number",
                "month": "number",
                "day": "number",
                "hour": "number",
                "minute": "number",
                "weekday": "number",
                "hasDay": "boolean",
                "hasTime": "boolean",
                "past": "boolean",
                "present": "boolean",
                "future": "boolean"
              }
            ]
          },
          "description": "Missing description"
        },
        {
          "name": "touchstart:day",
          "value": {
            "date": "string",
            "time": "string",
            "year": "number",
            "month": "number",
            "day": "number",
            "hour": "number",
            "minute": "number",
            "weekday": "number",
            "hasDay": "boolean",
            "hasTime": "boolean",
            "past": "boolean",
            "present": "boolean",
            "future": "boolean",
            "timeToY": "(time: string | number | {hour: number, minute: number}, clamp: boolean = false): number | false",
            "timeDelta": "(time: string | number | {hour: number, minute: number}): number | false",
            "minutesToPixels": "(minutes: number): number",
            "week": [
              {
                "date": "string",
                "time": "string",
                "year": "number",
                "month": "number",
                "day": "number",
                "hour": "number",
                "minute": "number",
                "weekday": "number",
                "hasDay": "boolean",
                "hasTime": "boolean",
                "past": "boolean",
                "present": "boolean",
                "future": "boolean"
              }
            ]
          },
          "description": "Missing description"
        },
        {
          "name": "touchmove:day",
          "value": {
            "date": "string",
            "time": "string",
            "year": "number",
            "month": "number",
            "day": "number",
            "hour": "number",
            "minute": "number",
            "weekday": "number",
            "hasDay": "boolean",
            "hasTime": "boolean",
            "past": "boolean",
            "present": "boolean",
            "future": "boolean",
            "timeToY": "(time: string | number | {hour: number, minute: number}, clamp: boolean = false): number | false",
            "timeDelta": "(time: string | number | {hour: number, minute: number}): number | false",
            "minutesToPixels": "(minutes: number): number",
            "week": [
              {
                "date": "string",
                "time": "string",
                "year": "number",
                "month": "number",
                "day": "number",
                "hour": "number",
                "minute": "number",
                "weekday": "number",
                "hasDay": "boolean",
                "hasTime": "boolean",
                "past": "boolean",
                "present": "boolean",
                "future": "boolean"
              }
            ]
          },
          "description": "Missing description"
        },
        {
          "name": "touchend:day",
          "value": {
            "date": "string",
            "time": "string",
            "year": "number",
            "month": "number",
            "day": "number",
            "hour": "number",
            "minute": "number",
            "weekday": "number",
            "hasDay": "boolean",
            "hasTime": "boolean",
            "past": "boolean",
            "present": "boolean",
            "future": "boolean",
            "timeToY": "(time: string | number | {hour: number, minute: number}, clamp: boolean = false): number | false",
            "timeDelta": "(time: string | number | {hour: number, minute: number}): number | false",
            "minutesToPixels": "(minutes: number): number",
            "week": [
              {
                "date": "string",
                "time": "string",
                "year": "number",
                "month": "number",
                "day": "number",
                "hour": "number",
                "minute": "number",
                "weekday": "number",
                "hasDay": "boolean",
                "hasTime": "boolean",
                "past": "boolean",
                "present": "boolean",
                "future": "boolean"
              }
            ]
          },
          "description": "Missing description"
        },
        {
          "name": "click:day-category",
          "value": {
            "date": "string",
            "time": "string",
            "year": "number",
            "month": "number",
            "day": "number",
            "hour": "number",
            "minute": "number",
            "weekday": "number",
            "hasDay": "boolean",
            "hasTime": "boolean",
            "past": "boolean",
            "present": "boolean",
            "future": "boolean",
            "week": [
              {
                "date": "string",
                "time": "string",
                "year": "number",
                "month": "number",
                "day": "number",
                "hour": "number",
                "minute": "number",
                "weekday": "number",
                "hasDay": "boolean",
                "hasTime": "boolean",
                "past": "boolean",
                "present": "boolean",
                "future": "boolean"
              }
            ],
            "category": "string | null"
          },
          "description": "Missing description"
        },
        {
          "name": "contextmenu:day-category",
          "value": {
            "date": "string",
            "time": "string",
            "year": "number",
            "month": "number",
            "day": "number",
            "hour": "number",
            "minute": "number",
            "weekday": "number",
            "hasDay": "boolean",
            "hasTime": "boolean",
            "past": "boolean",
            "present": "boolean",
            "future": "boolean",
            "week": [
              {
                "date": "string",
                "time": "string",
                "year": "number",
                "month": "number",
                "day": "number",
                "hour": "number",
                "minute": "number",
                "weekday": "number",
                "hasDay": "boolean",
                "hasTime": "boolean",
                "past": "boolean",
                "present": "boolean",
                "future": "boolean"
              }
            ],
            "category": "string | null"
          },
          "description": "Missing description"
        },
        {
          "name": "mousedown:day-category",
          "value": {
            "date": "string",
            "time": "string",
            "year": "number",
            "month": "number",
            "day": "number",
            "hour": "number",
            "minute": "number",
            "weekday": "number",
            "hasDay": "boolean",
            "hasTime": "boolean",
            "past": "boolean",
            "present": "boolean",
            "future": "boolean",
            "week": [
              {
                "date": "string",
                "time": "string",
                "year": "number",
                "month": "number",
                "day": "number",
                "hour": "number",
                "minute": "number",
                "weekday": "number",
                "hasDay": "boolean",
                "hasTime": "boolean",
                "past": "boolean",
                "present": "boolean",
                "future": "boolean"
              }
            ],
            "category": "string | null"
          },
          "description": "Missing description"
        },
        {
          "name": "mousemove:day-category",
          "value": {
            "date": "string",
            "time": "string",
            "year": "number",
            "month": "number",
            "day": "number",
            "hour": "number",
            "minute": "number",
            "weekday": "number",
            "hasDay": "boolean",
            "hasTime": "boolean",
            "past": "boolean",
            "present": "boolean",
            "future": "boolean",
            "week": [
              {
                "date": "string",
                "time": "string",
                "year": "number",
                "month": "number",
                "day": "number",
                "hour": "number",
                "minute": "number",
                "weekday": "number",
                "hasDay": "boolean",
                "hasTime": "boolean",
                "past": "boolean",
                "present": "boolean",
                "future": "boolean"
              }
            ],
            "category": "string | null"
          },
          "description": "Missing description"
        },
        {
          "name": "mouseup:day-category",
          "value": {
            "date": "string",
            "time": "string",
            "year": "number",
            "month": "number",
            "day": "number",
            "hour": "number",
            "minute": "number",
            "weekday": "number",
            "hasDay": "boolean",
            "hasTime": "boolean",
            "past": "boolean",
            "present": "boolean",
            "future": "boolean",
            "week": [
              {
                "date": "string",
                "time": "string",
                "year": "number",
                "month": "number",
                "day": "number",
                "hour": "number",
                "minute": "number",
                "weekday": "number",
                "hasDay": "boolean",
                "hasTime": "boolean",
                "past": "boolean",
                "present": "boolean",
                "future": "boolean"
              }
            ],
            "category": "string | null"
          },
          "description": "Missing description"
        },
        {
          "name": "mouseenter:day-category",
          "value": {
            "date": "string",
            "time": "string",
            "year": "number",
            "month": "number",
            "day": "number",
            "hour": "number",
            "minute": "number",
            "weekday": "number",
            "hasDay": "boolean",
            "hasTime": "boolean",
            "past": "boolean",
            "present": "boolean",
            "future": "boolean",
            "week": [
              {
                "date": "string",
                "time": "string",
                "year": "number",
                "month": "number",
                "day": "number",
                "hour": "number",
                "minute": "number",
                "weekday": "number",
                "hasDay": "boolean",
                "hasTime": "boolean",
                "past": "boolean",
                "present": "boolean",
                "future": "boolean"
              }
            ],
            "category": "string | null"
          },
          "description": "Missing description"
        },
        {
          "name": "mouseleave:day-category",
          "value": {
            "date": "string",
            "time": "string",
            "year": "number",
            "month": "number",
            "day": "number",
            "hour": "number",
            "minute": "number",
            "weekday": "number",
            "hasDay": "boolean",
            "hasTime": "boolean",
            "past": "boolean",
            "present": "boolean",
            "future": "boolean",
            "week": [
              {
                "date": "string",
                "time": "string",
                "year": "number",
                "month": "number",
                "day": "number",
                "hour": "number",
                "minute": "number",
                "weekday": "number",
                "hasDay": "boolean",
                "hasTime": "boolean",
                "past": "boolean",
                "present": "boolean",
                "future": "boolean"
              }
            ],
            "category": "string | null"
          },
          "description": "Missing description"
        },
        {
          "name": "touchstart:day-category",
          "value": {
            "date": "string",
            "time": "string",
            "year": "number",
            "month": "number",
            "day": "number",
            "hour": "number",
            "minute": "number",
            "weekday": "number",
            "hasDay": "boolean",
            "hasTime": "boolean",
            "past": "boolean",
            "present": "boolean",
            "future": "boolean",
            "week": [
              {
                "date": "string",
                "time": "string",
                "year": "number",
                "month": "number",
                "day": "number",
                "hour": "number",
                "minute": "number",
                "weekday": "number",
                "hasDay": "boolean",
                "hasTime": "boolean",
                "past": "boolean",
                "present": "boolean",
                "future": "boolean"
              }
            ],
            "category": "string | null"
          },
          "description": "Missing description"
        },
        {
          "name": "touchmove:day-category",
          "value": {
            "date": "string",
            "time": "string",
            "year": "number",
            "month": "number",
            "day": "number",
            "hour": "number",
            "minute": "number",
            "weekday": "number",
            "hasDay": "boolean",
            "hasTime": "boolean",
            "past": "boolean",
            "present": "boolean",
            "future": "boolean",
            "week": [
              {
                "date": "string",
                "time": "string",
                "year": "number",
                "month": "number",
                "day": "number",
                "hour": "number",
                "minute": "number",
                "weekday": "number",
                "hasDay": "boolean",
                "hasTime": "boolean",
                "past": "boolean",
                "present": "boolean",
                "future": "boolean"
              }
            ],
            "category": "string | null"
          },
          "description": "Missing description"
        },
        {
          "name": "touchend:day-category",
          "value": {
            "date": "string",
            "time": "string",
            "year": "number",
            "month": "number",
            "day": "number",
            "hour": "number",
            "minute": "number",
            "weekday": "number",
            "hasDay": "boolean",
            "hasTime": "boolean",
            "past": "boolean",
            "present": "boolean",
            "future": "boolean",
            "week": [
              {
                "date": "string",
                "time": "string",
                "year": "number",
                "month": "number",
                "day": "number",
                "hour": "number",
                "minute": "number",
                "weekday": "number",
                "hasDay": "boolean",
                "hasTime": "boolean",
                "past": "boolean",
                "present": "boolean",
                "future": "boolean"
              }
            ],
            "category": "string | null"
          },
          "description": "Missing description"
        },
        {
          "name": "click:time",
          "value": {
            "date": "string",
            "time": "string",
            "year": "number",
            "month": "number",
            "day": "number",
            "hour": "number",
            "minute": "number",
            "weekday": "number",
            "hasDay": "boolean",
            "hasTime": "boolean",
            "past": "boolean",
            "present": "boolean",
            "future": "boolean",
            "timeToY": "(time: string | number | {hour: number, minute: number}, clamp: boolean = false): number | false",
            "timeDelta": "(time: string | number | {hour: number, minute: number}): number | false",
            "minutesToPixels": "(minutes: number): number",
            "week": [
              {
                "date": "string",
                "time": "string",
                "year": "number",
                "month": "number",
                "day": "number",
                "hour": "number",
                "minute": "number",
                "weekday": "number",
                "hasDay": "boolean",
                "hasTime": "boolean",
                "past": "boolean",
                "present": "boolean",
                "future": "boolean"
              }
            ]
          },
          "description": "Missing description"
        },
        {
          "name": "contextmenu:time",
          "value": {
            "date": "string",
            "time": "string",
            "year": "number",
            "month": "number",
            "day": "number",
            "hour": "number",
            "minute": "number",
            "weekday": "number",
            "hasDay": "boolean",
            "hasTime": "boolean",
            "past": "boolean",
            "present": "boolean",
            "future": "boolean",
            "timeToY": "(time: string | number | {hour: number, minute: number}, clamp: boolean = false): number | false",
            "timeDelta": "(time: string | number | {hour: number, minute: number}): number | false",
            "minutesToPixels": "(minutes: number): number",
            "week": [
              {
                "date": "string",
                "time": "string",
                "year": "number",
                "month": "number",
                "day": "number",
                "hour": "number",
                "minute": "number",
                "weekday": "number",
                "hasDay": "boolean",
                "hasTime": "boolean",
                "past": "boolean",
                "present": "boolean",
                "future": "boolean"
              }
            ]
          },
          "description": "Missing description"
        },
        {
          "name": "mousedown:time",
          "value": {
            "date": "string",
            "time": "string",
            "year": "number",
            "month": "number",
            "day": "number",
            "hour": "number",
            "minute": "number",
            "weekday": "number",
            "hasDay": "boolean",
            "hasTime": "boolean",
            "past": "boolean",
            "present": "boolean",
            "future": "boolean",
            "timeToY": "(time: string | number | {hour: number, minute: number}, clamp: boolean = false): number | false",
            "timeDelta": "(time: string | number | {hour: number, minute: number}): number | false",
            "minutesToPixels": "(minutes: number): number",
            "week": [
              {
                "date": "string",
                "time": "string",
                "year": "number",
                "month": "number",
                "day": "number",
                "hour": "number",
                "minute": "number",
                "weekday": "number",
                "hasDay": "boolean",
                "hasTime": "boolean",
                "past": "boolean",
                "present": "boolean",
                "future": "boolean"
              }
            ]
          },
          "description": "Missing description"
        },
        {
          "name": "mousemove:time",
          "value": {
            "date": "string",
            "time": "string",
            "year": "number",
            "month": "number",
            "day": "number",
            "hour": "number",
            "minute": "number",
            "weekday": "number",
            "hasDay": "boolean",
            "hasTime": "boolean",
            "past": "boolean",
            "present": "boolean",
            "future": "boolean",
            "timeToY": "(time: string | number | {hour: number, minute: number}, clamp: boolean = false): number | false",
            "timeDelta": "(time: string | number | {hour: number, minute: number}): number | false",
            "minutesToPixels": "(minutes: number): number",
            "week": [
              {
                "date": "string",
                "time": "string",
                "year": "number",
                "month": "number",
                "day": "number",
                "hour": "number",
                "minute": "number",
                "weekday": "number",
                "hasDay": "boolean",
                "hasTime": "boolean",
                "past": "boolean",
                "present": "boolean",
                "future": "boolean"
              }
            ]
          },
          "description": "Missing description"
        },
        {
          "name": "mouseup:time",
          "value": {
            "date": "string",
            "time": "string",
            "year": "number",
            "month": "number",
            "day": "number",
            "hour": "number",
            "minute": "number",
            "weekday": "number",
            "hasDay": "boolean",
            "hasTime": "boolean",
            "past": "boolean",
            "present": "boolean",
            "future": "boolean",
            "timeToY": "(time: string | number | {hour: number, minute: number}, clamp: boolean = false): number | false",
            "timeDelta": "(time: string | number | {hour: number, minute: number}): number | false",
            "minutesToPixels": "(minutes: number): number",
            "week": [
              {
                "date": "string",
                "time": "string",
                "year": "number",
                "month": "number",
                "day": "number",
                "hour": "number",
                "minute": "number",
                "weekday": "number",
                "hasDay": "boolean",
                "hasTime": "boolean",
                "past": "boolean",
                "present": "boolean",
                "future": "boolean"
              }
            ]
          },
          "description": "Missing description"
        },
        {
          "name": "mouseenter:time",
          "value": {
            "date": "string",
            "time": "string",
            "year": "number",
            "month": "number",
            "day": "number",
            "hour": "number",
            "minute": "number",
            "weekday": "number",
            "hasDay": "boolean",
            "hasTime": "boolean",
            "past": "boolean",
            "present": "boolean",
            "future": "boolean",
            "timeToY": "(time: string | number | {hour: number, minute: number}, clamp: boolean = false): number | false",
            "timeDelta": "(time: string | number | {hour: number, minute: number}): number | false",
            "minutesToPixels": "(minutes: number): number",
            "week": [
              {
                "date": "string",
                "time": "string",
                "year": "number",
                "month": "number",
                "day": "number",
                "hour": "number",
                "minute": "number",
                "weekday": "number",
                "hasDay": "boolean",
                "hasTime": "boolean",
                "past": "boolean",
                "present": "boolean",
                "future": "boolean"
              }
            ]
          },
          "description": "Missing description"
        },
        {
          "name": "mouseleave:time",
          "value": {
            "date": "string",
            "time": "string",
            "year": "number",
            "month": "number",
            "day": "number",
            "hour": "number",
            "minute": "number",
            "weekday": "number",
            "hasDay": "boolean",
            "hasTime": "boolean",
            "past": "boolean",
            "present": "boolean",
            "future": "boolean",
            "timeToY": "(time: string | number | {hour: number, minute: number}, clamp: boolean = false): number | false",
            "timeDelta": "(time: string | number | {hour: number, minute: number}): number | false",
            "minutesToPixels": "(minutes: number): number",
            "week": [
              {
                "date": "string",
                "time": "string",
                "year": "number",
                "month": "number",
                "day": "number",
                "hour": "number",
                "minute": "number",
                "weekday": "number",
                "hasDay": "boolean",
                "hasTime": "boolean",
                "past": "boolean",
                "present": "boolean",
                "future": "boolean"
              }
            ]
          },
          "description": "Missing description"
        },
        {
          "name": "touchstart:time",
          "value": {
            "date": "string",
            "time": "string",
            "year": "number",
            "month": "number",
            "day": "number",
            "hour": "number",
            "minute": "number",
            "weekday": "number",
            "hasDay": "boolean",
            "hasTime": "boolean",
            "past": "boolean",
            "present": "boolean",
            "future": "boolean",
            "timeToY": "(time: string | number | {hour: number, minute: number}, clamp: boolean = false): number | false",
            "timeDelta": "(time: string | number | {hour: number, minute: number}): number | false",
            "minutesToPixels": "(minutes: number): number",
            "week": [
              {
                "date": "string",
                "time": "string",
                "year": "number",
                "month": "number",
                "day": "number",
                "hour": "number",
                "minute": "number",
                "weekday": "number",
                "hasDay": "boolean",
                "hasTime": "boolean",
                "past": "boolean",
                "present": "boolean",
                "future": "boolean"
              }
            ]
          },
          "description": "Missing description"
        },
        {
          "name": "touchmove:time",
          "value": {
            "date": "string",
            "time": "string",
            "year": "number",
            "month": "number",
            "day": "number",
            "hour": "number",
            "minute": "number",
            "weekday": "number",
            "hasDay": "boolean",
            "hasTime": "boolean",
            "past": "boolean",
            "present": "boolean",
            "future": "boolean",
            "timeToY": "(time: string | number | {hour: number, minute: number}, clamp: boolean = false): number | false",
            "timeDelta": "(time: string | number | {hour: number, minute: number}): number | false",
            "minutesToPixels": "(minutes: number): number",
            "week": [
              {
                "date": "string",
                "time": "string",
                "year": "number",
                "month": "number",
                "day": "number",
                "hour": "number",
                "minute": "number",
                "weekday": "number",
                "hasDay": "boolean",
                "hasTime": "boolean",
                "past": "boolean",
                "present": "boolean",
                "future": "boolean"
              }
            ]
          },
          "description": "Missing description"
        },
        {
          "name": "touchend:time",
          "value": {
            "date": "string",
            "time": "string",
            "year": "number",
            "month": "number",
            "day": "number",
            "hour": "number",
            "minute": "number",
            "weekday": "number",
            "hasDay": "boolean",
            "hasTime": "boolean",
            "past": "boolean",
            "present": "boolean",
            "future": "boolean",
            "timeToY": "(time: string | number | {hour: number, minute: number}, clamp: boolean = false): number | false",
            "timeDelta": "(time: string | number | {hour: number, minute: number}): number | false",
            "minutesToPixels": "(minutes: number): number",
            "week": [
              {
                "date": "string",
                "time": "string",
                "year": "number",
                "month": "number",
                "day": "number",
                "hour": "number",
                "minute": "number",
                "weekday": "number",
                "hasDay": "boolean",
                "hasTime": "boolean",
                "past": "boolean",
                "present": "boolean",
                "future": "boolean"
              }
            ]
          },
          "description": "Missing description"
        },
        {
          "name": "click:time-category",
          "value": {
            "date": "string",
            "time": "string",
            "year": "number",
            "month": "number",
            "day": "number",
            "hour": "number",
            "minute": "number",
            "weekday": "number",
            "hasDay": "boolean",
            "hasTime": "boolean",
            "past": "boolean",
            "present": "boolean",
            "future": "boolean",
            "timeToY": "(time: string | number | {hour: number, minute: number}, clamp: boolean = false): number | false",
            "timeDelta": "(time: string | number | {hour: number, minute: number}): number | false",
            "minutesToPixels": "(minutes: number): number",
            "week": [
              {
                "date": "string",
                "time": "string",
                "year": "number",
                "month": "number",
                "day": "number",
                "hour": "number",
                "minute": "number",
                "weekday": "number",
                "hasDay": "boolean",
                "hasTime": "boolean",
                "past": "boolean",
                "present": "boolean",
                "future": "boolean"
              }
            ],
            "category": "string | null"
          },
          "description": "Missing description"
        },
        {
          "name": "contextmenu:time-category",
          "value": {
            "date": "string",
            "time": "string",
            "year": "number",
            "month": "number",
            "day": "number",
            "hour": "number",
            "minute": "number",
            "weekday": "number",
            "hasDay": "boolean",
            "hasTime": "boolean",
            "past": "boolean",
            "present": "boolean",
            "future": "boolean",
            "timeToY": "(time: string | number | {hour: number, minute: number}, clamp: boolean = false): number | false",
            "timeDelta": "(time: string | number | {hour: number, minute: number}): number | false",
            "minutesToPixels": "(minutes: number): number",
            "week": [
              {
                "date": "string",
                "time": "string",
                "year": "number",
                "month": "number",
                "day": "number",
                "hour": "number",
                "minute": "number",
                "weekday": "number",
                "hasDay": "boolean",
                "hasTime": "boolean",
                "past": "boolean",
                "present": "boolean",
                "future": "boolean"
              }
            ],
            "category": "string | null"
          },
          "description": "Missing description"
        },
        {
          "name": "mousedown:time-category",
          "value": {
            "date": "string",
            "time": "string",
            "year": "number",
            "month": "number",
            "day": "number",
            "hour": "number",
            "minute": "number",
            "weekday": "number",
            "hasDay": "boolean",
            "hasTime": "boolean",
            "past": "boolean",
            "present": "boolean",
            "future": "boolean",
            "timeToY": "(time: string | number | {hour: number, minute: number}, clamp: boolean = false): number | false",
            "timeDelta": "(time: string | number | {hour: number, minute: number}): number | false",
            "minutesToPixels": "(minutes: number): number",
            "week": [
              {
                "date": "string",
                "time": "string",
                "year": "number",
                "month": "number",
                "day": "number",
                "hour": "number",
                "minute": "number",
                "weekday": "number",
                "hasDay": "boolean",
                "hasTime": "boolean",
                "past": "boolean",
                "present": "boolean",
                "future": "boolean"
              }
            ],
            "category": "string | null"
          },
          "description": "Missing description"
        },
        {
          "name": "mousemove:time-category",
          "value": {
            "date": "string",
            "time": "string",
            "year": "number",
            "month": "number",
            "day": "number",
            "hour": "number",
            "minute": "number",
            "weekday": "number",
            "hasDay": "boolean",
            "hasTime": "boolean",
            "past": "boolean",
            "present": "boolean",
            "future": "boolean",
            "timeToY": "(time: string | number | {hour: number, minute: number}, clamp: boolean = false): number | false",
            "timeDelta": "(time: string | number | {hour: number, minute: number}): number | false",
            "minutesToPixels": "(minutes: number): number",
            "week": [
              {
                "date": "string",
                "time": "string",
                "year": "number",
                "month": "number",
                "day": "number",
                "hour": "number",
                "minute": "number",
                "weekday": "number",
                "hasDay": "boolean",
                "hasTime": "boolean",
                "past": "boolean",
                "present": "boolean",
                "future": "boolean"
              }
            ],
            "category": "string | null"
          },
          "description": "Missing description"
        },
        {
          "name": "mouseup:time-category",
          "value": {
            "date": "string",
            "time": "string",
            "year": "number",
            "month": "number",
            "day": "number",
            "hour": "number",
            "minute": "number",
            "weekday": "number",
            "hasDay": "boolean",
            "hasTime": "boolean",
            "past": "boolean",
            "present": "boolean",
            "future": "boolean",
            "timeToY": "(time: string | number | {hour: number, minute: number}, clamp: boolean = false): number | false",
            "timeDelta": "(time: string | number | {hour: number, minute: number}): number | false",
            "minutesToPixels": "(minutes: number): number",
            "week": [
              {
                "date": "string",
                "time": "string",
                "year": "number",
                "month": "number",
                "day": "number",
                "hour": "number",
                "minute": "number",
                "weekday": "number",
                "hasDay": "boolean",
                "hasTime": "boolean",
                "past": "boolean",
                "present": "boolean",
                "future": "boolean"
              }
            ],
            "category": "string | null"
          },
          "description": "Missing description"
        },
        {
          "name": "mouseenter:time-category",
          "value": {
            "date": "string",
            "time": "string",
            "year": "number",
            "month": "number",
            "day": "number",
            "hour": "number",
            "minute": "number",
            "weekday": "number",
            "hasDay": "boolean",
            "hasTime": "boolean",
            "past": "boolean",
            "present": "boolean",
            "future": "boolean",
            "timeToY": "(time: string | number | {hour: number, minute: number}, clamp: boolean = false): number | false",
            "timeDelta": "(time: string | number | {hour: number, minute: number}): number | false",
            "minutesToPixels": "(minutes: number): number",
            "week": [
              {
                "date": "string",
                "time": "string",
                "year": "number",
                "month": "number",
                "day": "number",
                "hour": "number",
                "minute": "number",
                "weekday": "number",
                "hasDay": "boolean",
                "hasTime": "boolean",
                "past": "boolean",
                "present": "boolean",
                "future": "boolean"
              }
            ],
            "category": "string | null"
          },
          "description": "Missing description"
        },
        {
          "name": "mouseleave:time-category",
          "value": {
            "date": "string",
            "time": "string",
            "year": "number",
            "month": "number",
            "day": "number",
            "hour": "number",
            "minute": "number",
            "weekday": "number",
            "hasDay": "boolean",
            "hasTime": "boolean",
            "past": "boolean",
            "present": "boolean",
            "future": "boolean",
            "timeToY": "(time: string | number | {hour: number, minute: number}, clamp: boolean = false): number | false",
            "timeDelta": "(time: string | number | {hour: number, minute: number}): number | false",
            "minutesToPixels": "(minutes: number): number",
            "week": [
              {
                "date": "string",
                "time": "string",
                "year": "number",
                "month": "number",
                "day": "number",
                "hour": "number",
                "minute": "number",
                "weekday": "number",
                "hasDay": "boolean",
                "hasTime": "boolean",
                "past": "boolean",
                "present": "boolean",
                "future": "boolean"
              }
            ],
            "category": "string | null"
          },
          "description": "Missing description"
        },
        {
          "name": "touchstart:time-category",
          "value": {
            "date": "string",
            "time": "string",
            "year": "number",
            "month": "number",
            "day": "number",
            "hour": "number",
            "minute": "number",
            "weekday": "number",
            "hasDay": "boolean",
            "hasTime": "boolean",
            "past": "boolean",
            "present": "boolean",
            "future": "boolean",
            "timeToY": "(time: string | number | {hour: number, minute: number}, clamp: boolean = false): number | false",
            "timeDelta": "(time: string | number | {hour: number, minute: number}): number | false",
            "minutesToPixels": "(minutes: number): number",
            "week": [
              {
                "date": "string",
                "time": "string",
                "year": "number",
                "month": "number",
                "day": "number",
                "hour": "number",
                "minute": "number",
                "weekday": "number",
                "hasDay": "boolean",
                "hasTime": "boolean",
                "past": "boolean",
                "present": "boolean",
                "future": "boolean"
              }
            ],
            "category": "string | null"
          },
          "description": "Missing description"
        },
        {
          "name": "touchmove:time-category",
          "value": {
            "date": "string",
            "time": "string",
            "year": "number",
            "month": "number",
            "day": "number",
            "hour": "number",
            "minute": "number",
            "weekday": "number",
            "hasDay": "boolean",
            "hasTime": "boolean",
            "past": "boolean",
            "present": "boolean",
            "future": "boolean",
            "timeToY": "(time: string | number | {hour: number, minute: number}, clamp: boolean = false): number | false",
            "timeDelta": "(time: string | number | {hour: number, minute: number}): number | false",
            "minutesToPixels": "(minutes: number): number",
            "week": [
              {
                "date": "string",
                "time": "string",
                "year": "number",
                "month": "number",
                "day": "number",
                "hour": "number",
                "minute": "number",
                "weekday": "number",
                "hasDay": "boolean",
                "hasTime": "boolean",
                "past": "boolean",
                "present": "boolean",
                "future": "boolean"
              }
            ],
            "category": "string | null"
          },
          "description": "Missing description"
        },
        {
          "name": "touchend:time-category",
          "value": {
            "date": "string",
            "time": "string",
            "year": "number",
            "month": "number",
            "day": "number",
            "hour": "number",
            "minute": "number",
            "weekday": "number",
            "hasDay": "boolean",
            "hasTime": "boolean",
            "past": "boolean",
            "present": "boolean",
            "future": "boolean",
            "timeToY": "(time: string | number | {hour: number, minute: number}, clamp: boolean = false): number | false",
            "timeDelta": "(time: string | number | {hour: number, minute: number}): number | false",
            "minutesToPixels": "(minutes: number): number",
            "week": [
              {
                "date": "string",
                "time": "string",
                "year": "number",
                "month": "number",
                "day": "number",
                "hour": "number",
                "minute": "number",
                "weekday": "number",
                "hasDay": "boolean",
                "hasTime": "boolean",
                "past": "boolean",
                "present": "boolean",
                "future": "boolean"
              }
            ],
            "category": "string | null"
          },
          "description": "Missing description"
        },
        {
          "name": "click:interval",
          "value": {
            "date": "string",
            "time": "string",
            "year": "number",
            "month": "number",
            "day": "number",
            "hour": "number",
            "minute": "number",
            "weekday": "number",
            "hasDay": "boolean",
            "hasTime": "boolean",
            "past": "boolean",
            "present": "boolean",
            "future": "boolean"
          },
          "description": "Missing description"
        },
        {
          "name": "contextmenu:interval",
          "value": {
            "date": "string",
            "time": "string",
            "year": "number",
            "month": "number",
            "day": "number",
            "hour": "number",
            "minute": "number",
            "weekday": "number",
            "hasDay": "boolean",
            "hasTime": "boolean",
            "past": "boolean",
            "present": "boolean",
            "future": "boolean"
          },
          "description": "Missing description"
        },
        {
          "name": "mousedown:interval",
          "value": {
            "date": "string",
            "time": "string",
            "year": "number",
            "month": "number",
            "day": "number",
            "hour": "number",
            "minute": "number",
            "weekday": "number",
            "hasDay": "boolean",
            "hasTime": "boolean",
            "past": "boolean",
            "present": "boolean",
            "future": "boolean"
          },
          "description": "Missing description"
        },
        {
          "name": "mousemove:interval",
          "value": {
            "date": "string",
            "time": "string",
            "year": "number",
            "month": "number",
            "day": "number",
            "hour": "number",
            "minute": "number",
            "weekday": "number",
            "hasDay": "boolean",
            "hasTime": "boolean",
            "past": "boolean",
            "present": "boolean",
            "future": "boolean"
          },
          "description": "Missing description"
        },
        {
          "name": "mouseup:interval",
          "value": {
            "date": "string",
            "time": "string",
            "year": "number",
            "month": "number",
            "day": "number",
            "hour": "number",
            "minute": "number",
            "weekday": "number",
            "hasDay": "boolean",
            "hasTime": "boolean",
            "past": "boolean",
            "present": "boolean",
            "future": "boolean"
          },
          "description": "Missing description"
        },
        {
          "name": "mouseenter:interval",
          "value": {
            "date": "string",
            "time": "string",
            "year": "number",
            "month": "number",
            "day": "number",
            "hour": "number",
            "minute": "number",
            "weekday": "number",
            "hasDay": "boolean",
            "hasTime": "boolean",
            "past": "boolean",
            "present": "boolean",
            "future": "boolean"
          },
          "description": "Missing description"
        },
        {
          "name": "mouseleave:interval",
          "value": {
            "date": "string",
            "time": "string",
            "year": "number",
            "month": "number",
            "day": "number",
            "hour": "number",
            "minute": "number",
            "weekday": "number",
            "hasDay": "boolean",
            "hasTime": "boolean",
            "past": "boolean",
            "present": "boolean",
            "future": "boolean"
          },
          "description": "Missing description"
        },
        {
          "name": "touchstart:interval",
          "value": {
            "date": "string",
            "time": "string",
            "year": "number",
            "month": "number",
            "day": "number",
            "hour": "number",
            "minute": "number",
            "weekday": "number",
            "hasDay": "boolean",
            "hasTime": "boolean",
            "past": "boolean",
            "present": "boolean",
            "future": "boolean"
          },
          "description": "Missing description"
        },
        {
          "name": "touchmove:interval",
          "value": {
            "date": "string",
            "time": "string",
            "year": "number",
            "month": "number",
            "day": "number",
            "hour": "number",
            "minute": "number",
            "weekday": "number",
            "hasDay": "boolean",
            "hasTime": "boolean",
            "past": "boolean",
            "present": "boolean",
            "future": "boolean"
          },
          "description": "Missing description"
        },
        {
          "name": "touchend:interval",
          "value": {
            "date": "string",
            "time": "string",
            "year": "number",
            "month": "number",
            "day": "number",
            "hour": "number",
            "minute": "number",
            "weekday": "number",
            "hasDay": "boolean",
            "hasTime": "boolean",
            "past": "boolean",
            "present": "boolean",
            "future": "boolean"
          },
          "description": "Missing description"
        }
      ],
      "sass": [
        {
          "name": "$calendar-line-width",
          "default": "1px !default;",
          "description": "Missing description"
        },
        {
          "name": "$calendar-daily-weekday-padding",
          "default": "3px 0px 0px 0px !default;",
          "description": "Missing description"
        },
        {
          "name": "$calendar-daily-weekday-font-size",
          "default": "11px !default;",
          "description": "Missing description"
        },
        {
          "name": "$calendar-daily-day-padding",
          "default": "0px 0px 3px 0px !default;",
          "description": "Missing description"
        },
        {
          "name": "$calendar-daily-day-font-size",
          "default": "40px !default;",
          "description": "Missing description"
        },
        {
          "name": "$calendar-daily-interval-gutter-top",
          "default": "-6px !default;",
          "description": "Missing description"
        },
        {
          "name": "$calendar-daily-interval-gutter-width",
          "default": "4px !default;",
          "description": "Missing description"
        },
        {
          "name": "$calendar-daily-interval-gutter-align",
          "default": "right !default;",
          "description": "Missing description"
        },
        {
          "name": "$calendar-daily-interval-gutter-line-width",
          "default": "8px !default;",
          "description": "Missing description"
        },
        {
          "name": "$calendar-daily-interval-gutter-font-size",
          "default": "10px !default;",
          "description": "Missing description"
        },
        {
          "name": "$calendar-weekly-weekday-padding",
          "default": "0px 4px 0px 4px !default;",
          "description": "Missing description"
        },
        {
          "name": "$calendar-weekly-weekday-font-size",
          "default": "11px !default;",
          "description": "Missing description"
        },
        {
          "name": "$calendar-weekly-day-padding",
          "default": "0px 0px 0px 0px !default;",
          "description": "Missing description"
        },
        {
          "name": "$calendar-weekly-day-label-size",
          "default": "32px !default;",
          "description": "Missing description"
        },
        {
          "name": "$calendar-weekly-day-label-font-size",
          "default": "12px !default;",
          "description": "Missing description"
        },
        {
          "name": "$calendar-weekly-day-label-margin",
          "default": "4px 0 0 0 !default;",
          "description": "Missing description"
        },
        {
          "name": "$calendar-weekly-day-month-left",
          "default": "36px !default;",
          "description": "Missing description"
        },
        {
          "name": "$calendar-weekly-weeknumber-flex-basis",
          "default": "24px !default;",
          "description": "Missing description"
        },
        {
          "name": "$calendar-weekly-weeknumber-padding-top",
          "default": "14.5px !default;",
          "description": "Missing description"
        },
        {
          "name": "$calendar-event-bottom-space",
          "default": "1px !default;",
          "description": "Missing description"
        },
        {
          "name": "$calendar-event-border-width",
          "default": "1px !default;",
          "description": "Missing description"
        },
        {
          "name": "$calendar-event-border-radius",
          "default": "$border-radius-root !default;",
          "description": "Missing description"
        },
        {
          "name": "$calendar-event-font-size",
          "default": "12px !default;",
          "description": "Missing description"
        },
        {
          "name": "$calendar-event-line-height",
          "default": "20px !default;",
          "description": "Missing description"
        },
        {
          "name": "$calendar-event-right-empty",
          "default": "10px !default;",
          "description": "Missing description"
        }
      ]
    },
    "v-calendar-daily": {
      "props": [
        {
          "name": "color",
          "type": "string",
          "default": "undefined",
          "source": "colorable",
          "description": "Missing description"
        },
        {
          "name": "dark",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "dayFormat",
          "type": "function",
          "default": "null",
          "source": "calendar-base",
          "description": "Missing description"
        },
        {
          "name": "end",
          "type": "string",
          "default": "'0000-00-00'",
          "source": "calendar-base",
          "description": "Missing description"
        },
        {
          "name": "firstInterval",
          "type": [
            "number",
            "string"
          ],
          "default": 0,
          "source": "calendar-with-intervals",
          "description": "Missing description"
        },
        {
          "name": "hideHeader",
          "type": "boolean",
          "default": "false",
          "source": "calendar-base",
          "description": "Missing description"
        },
        {
          "name": "intervalCount",
          "type": [
            "number",
            "string"
          ],
          "default": 24,
          "source": "calendar-with-intervals",
          "description": "Missing description"
        },
        {
          "name": "intervalFormat",
          "type": "function",
          "default": "null",
          "source": "calendar-with-intervals",
          "description": "Missing description"
        },
        {
          "name": "intervalHeight",
          "type": [
            "number",
            "string"
          ],
          "default": 40,
          "source": "calendar-with-intervals",
          "description": "Missing description"
        },
        {
          "name": "intervalMinutes",
          "type": [
            "number",
            "string"
          ],
          "default": 60,
          "source": "calendar-with-intervals",
          "description": "Missing description"
        },
        {
          "name": "intervalStyle",
          "type": "function",
          "default": "null",
          "source": "calendar-with-intervals",
          "description": "Missing description"
        },
        {
          "name": "light",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "locale",
          "type": "string",
          "default": "'en-us'",
          "source": "calendar-base",
          "description": "Missing description"
        },
        {
          "name": "maxDays",
          "type": "number",
          "default": 7,
          "source": "calendar-with-intervals",
          "description": "Missing description"
        },
        {
          "name": "now",
          "type": "string",
          "default": "undefined",
          "source": "times",
          "description": "Missing description"
        },
        {
          "name": "shortIntervals",
          "type": "boolean",
          "default": "true",
          "source": "calendar-with-intervals",
          "description": "Missing description"
        },
        {
          "name": "shortWeekdays",
          "type": "boolean",
          "default": "true",
          "source": "calendar-base",
          "description": "Missing description"
        },
        {
          "name": "showIntervalLabel",
          "type": "function",
          "default": "null",
          "source": "calendar-with-intervals",
          "description": "Missing description"
        },
        {
          "name": "start",
          "type": "string",
          "default": "'2020-08-13'",
          "source": "calendar-base",
          "description": "Missing description"
        },
        {
          "name": "weekdayFormat",
          "type": "function",
          "default": "null",
          "source": "calendar-base",
          "description": "Missing description"
        },
        {
          "name": "weekdays",
          "type": "array",
          "default": [
            0,
            1,
            2,
            3,
            4,
            5,
            6
          ],
          "source": "calendar-base",
          "description": "Missing description"
        }
      ],
      "mixins": [
        "colorable",
        "themeable",
        "times",
        "mouse"
      ],
      "sass": []
    },
    "v-calendar-weekly": {
      "props": [
        {
          "name": "color",
          "type": "string",
          "default": "undefined",
          "source": "colorable",
          "description": "Missing description"
        },
        {
          "name": "dark",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "dayFormat",
          "type": "function",
          "default": "null",
          "source": "calendar-base",
          "description": "Missing description"
        },
        {
          "name": "end",
          "type": "string",
          "default": "'0000-00-00'",
          "source": "calendar-base",
          "description": "Missing description"
        },
        {
          "name": "hideHeader",
          "type": "boolean",
          "default": "false",
          "source": "calendar-base",
          "description": "Missing description"
        },
        {
          "name": "light",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "locale",
          "type": "string",
          "default": "'en-us'",
          "source": "calendar-base",
          "description": "Missing description"
        },
        {
          "name": "minWeeks",
          "type": "any",
          "default": 1,
          "source": "v-calendar-weekly",
          "description": "Missing description"
        },
        {
          "name": "monthFormat",
          "type": "function",
          "default": "null",
          "source": "v-calendar-weekly",
          "description": "Missing description"
        },
        {
          "name": "now",
          "type": "string",
          "default": "undefined",
          "source": "times",
          "description": "Missing description"
        },
        {
          "name": "shortMonths",
          "type": "boolean",
          "default": "true",
          "source": "v-calendar-weekly",
          "description": "Missing description"
        },
        {
          "name": "shortWeekdays",
          "type": "boolean",
          "default": "true",
          "source": "calendar-base",
          "description": "Missing description"
        },
        {
          "name": "showMonthOnFirst",
          "type": "boolean",
          "default": "true",
          "source": "v-calendar-weekly",
          "description": "Missing description"
        },
        {
          "name": "start",
          "type": "string",
          "default": "'2020-08-13'",
          "source": "calendar-base",
          "description": "Missing description"
        },
        {
          "name": "weekdayFormat",
          "type": "function",
          "default": "null",
          "source": "calendar-base",
          "description": "Missing description"
        },
        {
          "name": "weekdays",
          "type": "array",
          "default": [
            0,
            1,
            2,
            3,
            4,
            5,
            6
          ],
          "source": "calendar-base",
          "description": "Missing description"
        }
      ],
      "mixins": [
        "colorable",
        "themeable",
        "times",
        "mouse"
      ],
      "sass": []
    },
    "v-calendar-monthly": {
      "props": [
        {
          "name": "color",
          "type": "string",
          "default": "undefined",
          "source": "colorable",
          "description": "Missing description"
        },
        {
          "name": "dark",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "dayFormat",
          "type": "function",
          "default": "null",
          "source": "calendar-base",
          "description": "Missing description"
        },
        {
          "name": "end",
          "type": "string",
          "default": "'0000-00-00'",
          "source": "calendar-base",
          "description": "Missing description"
        },
        {
          "name": "hideHeader",
          "type": "boolean",
          "default": "false",
          "source": "calendar-base",
          "description": "Missing description"
        },
        {
          "name": "light",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "locale",
          "type": "string",
          "default": "'en-us'",
          "source": "calendar-base",
          "description": "Missing description"
        },
        {
          "name": "minWeeks",
          "type": "any",
          "default": 1,
          "source": "v-calendar-weekly",
          "description": "Missing description"
        },
        {
          "name": "monthFormat",
          "type": "function",
          "default": "null",
          "source": "v-calendar-weekly",
          "description": "Missing description"
        },
        {
          "name": "now",
          "type": "string",
          "default": "undefined",
          "source": "times",
          "description": "Missing description"
        },
        {
          "name": "shortMonths",
          "type": "boolean",
          "default": "true",
          "source": "v-calendar-weekly",
          "description": "Missing description"
        },
        {
          "name": "shortWeekdays",
          "type": "boolean",
          "default": "true",
          "source": "calendar-base",
          "description": "Missing description"
        },
        {
          "name": "showMonthOnFirst",
          "type": "boolean",
          "default": "true",
          "source": "v-calendar-weekly",
          "description": "Missing description"
        },
        {
          "name": "start",
          "type": "string",
          "default": "'2020-08-13'",
          "source": "calendar-base",
          "description": "Missing description"
        },
        {
          "name": "weekdayFormat",
          "type": "function",
          "default": "null",
          "source": "calendar-base",
          "description": "Missing description"
        },
        {
          "name": "weekdays",
          "type": "array",
          "default": [
            0,
            1,
            2,
            3,
            4,
            5,
            6
          ],
          "source": "calendar-base",
          "description": "Missing description"
        }
      ],
      "mixins": [
        "colorable",
        "themeable",
        "times",
        "mouse"
      ],
      "sass": []
    },
    "v-card": {
      "props": [
        {
          "name": "activeClass",
          "type": "string",
          "default": "undefined",
          "source": "routable",
          "description": "Missing description"
        },
        {
          "name": "append",
          "type": "boolean",
          "default": "false",
          "source": "routable",
          "description": "Missing description"
        },
        {
          "name": "color",
          "type": "string",
          "default": "undefined",
          "source": "colorable",
          "description": "Missing description"
        },
        {
          "name": "dark",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "disabled",
          "type": "boolean",
          "default": "false",
          "source": "routable",
          "description": "Missing description"
        },
        {
          "name": "elevation",
          "type": [
            "number",
            "string"
          ],
          "default": "undefined",
          "source": "elevatable",
          "description": "Missing description"
        },
        {
          "name": "exact",
          "type": "boolean",
          "default": "false",
          "source": "routable",
          "description": "Missing description"
        },
        {
          "name": "exactActiveClass",
          "type": "string",
          "default": "undefined",
          "source": "routable",
          "description": "Missing description"
        },
        {
          "name": "flat",
          "type": "boolean",
          "default": "false",
          "source": "v-card",
          "description": "Removes the card's elevation."
        },
        {
          "name": "height",
          "type": [
            "number",
            "string"
          ],
          "default": "undefined",
          "source": "measurable",
          "description": "Missing description"
        },
        {
          "name": "hover",
          "type": "boolean",
          "default": "false",
          "source": "v-card",
          "description": "Will apply an elevation of 4dp when hovered (default 2dp). You can find more information on the [elevation page](/styles/elevation)."
        },
        {
          "name": "href",
          "type": [
            "string",
            "object"
          ],
          "default": "undefined",
          "source": "routable",
          "description": "Missing description"
        },
        {
          "name": "img",
          "type": "string",
          "default": "undefined",
          "source": "v-card",
          "description": "Specifies an image background for the card. For more advanced implementations, it is recommended that you use the [v-img](/components/images) component. You can find a [v-img example here](#media-with-text)."
        },
        {
          "name": "light",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "maxHeight",
          "type": [
            "number",
            "string"
          ],
          "default": "undefined",
          "source": "measurable",
          "description": "Missing description"
        },
        {
          "name": "maxWidth",
          "type": [
            "number",
            "string"
          ],
          "default": "undefined",
          "source": "measurable",
          "description": "Missing description"
        },
        {
          "name": "minHeight",
          "type": [
            "number",
            "string"
          ],
          "default": "undefined",
          "source": "measurable",
          "description": "Missing description"
        },
        {
          "name": "minWidth",
          "type": [
            "number",
            "string"
          ],
          "default": "undefined",
          "source": "measurable",
          "description": "Missing description"
        },
        {
          "name": "nuxt",
          "type": "boolean",
          "default": "false",
          "source": "routable",
          "description": "Missing description"
        },
        {
          "name": "raised",
          "type": "boolean",
          "default": "false",
          "source": "v-card",
          "description": "Specifies a higher default elevation (8dp). You can find more information on the [elevation page](/styles/elevation)."
        },
        {
          "name": "replace",
          "type": "boolean",
          "default": "false",
          "source": "routable",
          "description": "Missing description"
        },
        {
          "name": "ripple",
          "type": [
            "boolean",
            "object"
          ],
          "default": "undefined",
          "source": "routable",
          "description": "Missing description"
        },
        {
          "name": "tag",
          "type": "string",
          "default": "'div'",
          "source": "routable",
          "description": "Missing description"
        },
        {
          "name": "target",
          "type": "string",
          "default": "undefined",
          "source": "routable",
          "description": "Missing description"
        },
        {
          "name": "tile",
          "type": "boolean",
          "default": "false",
          "source": "v-sheet",
          "description": "Missing description"
        },
        {
          "name": "to",
          "type": [
            "string",
            "object"
          ],
          "default": "undefined",
          "source": "routable",
          "description": "Missing description"
        },
        {
          "name": "width",
          "type": [
            "number",
            "string"
          ],
          "default": "undefined",
          "source": "measurable",
          "description": "Missing description"
        }
      ],
      "mixins": [
        "routable",
        "v-sheet",
        "colorable",
        "elevatable",
        "measurable",
        "themeable"
      ],
      "events": [
        {
          "name": "click",
          "value": "void",
          "description": "Missing description"
        }
      ],
      "slots": [
        {
          "name": "progress",
          "description": "Missing description"
        },
        {
          "name": "default",
          "description": "Missing description"
        }
      ],
      "sass": [
        {
          "name": "$card-actions-padding",
          "default": "8px !default;",
          "description": "Missing description"
        },
        {
          "name": "$card-adjacent-sibling-text-padding-top",
          "default": "0 !default;",
          "description": "Missing description"
        },
        {
          "name": "$card-border-radius",
          "default": "$border-radius-root !default;",
          "description": "Missing description"
        },
        {
          "name": "$card-btn-margin-x",
          "default": "8px !default;",
          "description": "Missing description"
        },
        {
          "name": "$card-btn-padding",
          "default": "0 8px !default;",
          "description": "Missing description"
        },
        {
          "name": "$card-btn-small-margin-x",
          "default": "4px !default;",
          "description": "Missing description"
        },
        {
          "name": "$card-disabled-opacity",
          "default": "0.6 !default;",
          "description": "Missing description"
        },
        {
          "name": "$card-elevation",
          "default": "2 !default;",
          "description": "Missing description"
        },
        {
          "name": "$card-hover-elevation",
          "default": "8 !default;",
          "description": "Missing description"
        },
        {
          "name": "$card-link-focus-opacity",
          "default": "0.08 !default;",
          "description": "Missing description"
        },
        {
          "name": "$card-outlined-border-width",
          "default": "thin !default;",
          "description": "Missing description"
        },
        {
          "name": "$card-overflow-wrap",
          "default": "break-word !default;",
          "description": "Missing description"
        },
        {
          "name": "$card-raised-elevation",
          "default": "8 !default;",
          "description": "Missing description"
        },
        {
          "name": "$card-shaped-border-radius",
          "default": "map-get($rounded, 'xl') $card-border-radius !default;",
          "description": "Missing description"
        },
        {
          "name": "$card-subtitle-padding",
          "default": "16px !default;",
          "description": "Missing description"
        },
        {
          "name": "$card-text-font-size",
          "default": "map-deep-get($headings, 'subtitle-2', 'size') !default;",
          "description": "Missing description"
        },
        {
          "name": "$card-text-font-weight",
          "default": "400 !default;",
          "description": "Missing description"
        },
        {
          "name": "$card-text-letter-spacing",
          "default": "map-deep-get($headings, 'subtitle-2', 'letter-spacing') !default;",
          "description": "Missing description"
        },
        {
          "name": "$card-text-line-height",
          "default": "map-deep-get($headings, 'subtitle-2', 'line-height') !default;",
          "description": "Missing description"
        },
        {
          "name": "$card-title-adjacent-sibling-subtitle-margin-top",
          "default": "-16px !default;",
          "description": "Missing description"
        },
        {
          "name": "$card-title-adjacent-sibling-subtitle-text-padding-top",
          "default": "0 !default;",
          "description": "Missing description"
        },
        {
          "name": "$card-title-font-size",
          "default": "map-deep-get($headings, 'h6', 'size') !default;",
          "description": "Missing description"
        },
        {
          "name": "$card-title-font-weight",
          "default": "map-deep-get($headings, 'h6', 'weight') !default;",
          "description": "Missing description"
        },
        {
          "name": "$card-title-letter-spacing",
          "default": "map-deep-get($headings, 'h6', 'letter-spacing') !default;",
          "description": "Missing description"
        },
        {
          "name": "$card-title-line-height",
          "default": "map-deep-get($headings, 'h6', 'line-height') !default;",
          "description": "Missing description"
        },
        {
          "name": "$card-title-word-break",
          "default": "break-all !default;",
          "description": "Missing description"
        },
        {
          "name": "$card-white-space",
          "default": "normal !default;",
          "description": "Missing description"
        }
      ]
    },
    "v-card-media": {
      "props": [
        {
          "name": "alt",
          "type": "string",
          "default": "undefined",
          "source": "v-img",
          "description": "Alternate text for screen readers. Leave empty for decorative images"
        },
        {
          "name": "aspectRatio",
          "type": [
            "string",
            "number"
          ],
          "default": "undefined",
          "source": "v-responsive",
          "description": "Sets a base aspect ratio, calculated as width/height. This will only set a **minimum** height, the component can still grow if it has a lot of content."
        },
        {
          "name": "contain",
          "type": "boolean",
          "default": "false",
          "source": "v-img",
          "description": "Prevents the image from being cropped if it doesn't fit"
        },
        {
          "name": "gradient",
          "type": "string",
          "default": "undefined",
          "source": "v-img",
          "description": "Overlays a gradient onto the image. Only supports [linear-gradient](https://developer.mozilla.org/en-US/docs/Web/CSS/linear-gradient) syntax, anything else should be done with classes (see examples)"
        },
        {
          "name": "height",
          "type": [
            "number",
            "string"
          ],
          "default": "undefined",
          "source": "measurable",
          "description": "Missing description"
        },
        {
          "name": "lazySrc",
          "type": "string",
          "default": "undefined",
          "source": "v-img",
          "description": "Something to show while waiting for the main image to load, typically a small base64-encoded thumbnail. Has a slight blur filter applied.\n\nUse [vuetify-loader](https://github.com/vuetifyjs/vuetify-loader) to generate automatically"
        },
        {
          "name": "maxHeight",
          "type": [
            "number",
            "string"
          ],
          "default": "undefined",
          "source": "measurable",
          "description": "Missing description"
        },
        {
          "name": "maxWidth",
          "type": [
            "number",
            "string"
          ],
          "default": "undefined",
          "source": "measurable",
          "description": "Missing description"
        },
        {
          "name": "minHeight",
          "type": [
            "number",
            "string"
          ],
          "default": "undefined",
          "source": "measurable",
          "description": "Missing description"
        },
        {
          "name": "minWidth",
          "type": [
            "number",
            "string"
          ],
          "default": "undefined",
          "source": "measurable",
          "description": "Missing description"
        },
        {
          "name": "position",
          "type": "string",
          "default": "'center center'",
          "source": "v-img",
          "description": "Overrides the default to change which parts get cropped off. Uses the same syntax as [`background-position`](https://developer.mozilla.org/en-US/docs/Web/CSS/background-position)"
        },
        {
          "name": "sizes",
          "type": "string",
          "default": "undefined",
          "source": "v-img",
          "description": "For use with `srcset`, see [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-sizes)"
        },
        {
          "name": "src",
          "type": [
            "string",
            "object"
          ],
          "default": "undefined",
          "source": "v-img",
          "description": "The image URL. This prop is mandatory"
        },
        {
          "name": "srcset",
          "type": "string",
          "default": "undefined",
          "source": "v-img",
          "description": "A set of alternate images to use based on device size. [Read more...](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-srcset)"
        },
        {
          "name": "transition",
          "type": [
            "boolean",
            "string"
          ],
          "default": "fade-transition",
          "source": "v-img",
          "description": "The transition to use when switching from `lazy-src` to `src`"
        },
        {
          "name": "width",
          "type": [
            "number",
            "string"
          ],
          "default": "undefined",
          "source": "measurable",
          "description": "Missing description"
        }
      ],
      "mixins": [
        "measurable"
      ],
      "sass": []
    },
    "v-card-title": {
      "props": [
        {
          "name": "primaryTitle",
          "type": "boolean",
          "default": "false",
          "source": "v-card-title",
          "description": "Missing description"
        }
      ],
      "mixins": [],
      "slots": [
        {
          "name": "default",
          "description": "Missing description"
        }
      ],
      "sass": []
    },
    "v-card-actions": {
      "props": [],
      "mixins": [],
      "slots": [
        {
          "name": "default",
          "description": "Missing description"
        }
      ],
      "sass": []
    },
    "v-card-text": {
      "props": [],
      "mixins": [],
      "slots": [
        {
          "name": "default",
          "description": "Missing description"
        }
      ],
      "sass": []
    },
    "v-carousel": {
      "props": [
        {
          "name": "activeClass",
          "type": "string",
          "default": "'v-item--active'",
          "source": "base-item-group",
          "description": "Missing description"
        },
        {
          "name": "cycle",
          "type": "boolean",
          "default": "true",
          "source": "v-carousel",
          "description": "Determines if the carousel should cycle through images."
        },
        {
          "name": "dark",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "delimiterIcon",
          "type": "string",
          "default": "'$vuetify.icons.delimiter'",
          "source": "v-carousel",
          "description": "Sets icon for carousel delimiter"
        },
        {
          "name": "height",
          "type": [
            "number",
            "string"
          ],
          "default": 500,
          "source": "v-carousel",
          "description": "Mixins.Measurable.props.height"
        },
        {
          "name": "hideControls",
          "type": "boolean",
          "default": "false",
          "source": "v-carousel",
          "description": "Hides the navigation controls (left and right)."
        },
        {
          "name": "hideDelimiters",
          "type": "boolean",
          "default": "false",
          "source": "v-carousel",
          "description": "Hides the carousel's bottom delimiters."
        },
        {
          "name": "interval",
          "type": [
            "number",
            "string"
          ],
          "default": 6000,
          "source": "v-carousel",
          "description": "The duration between image cycles. Requires the **cycle** prop."
        },
        {
          "name": "light",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "mandatory",
          "type": "boolean",
          "default": "true",
          "source": "base-item-group",
          "description": "Missing description"
        },
        {
          "name": "max",
          "type": [
            "number",
            "string"
          ],
          "default": "undefined",
          "source": "base-item-group",
          "description": "Missing description"
        },
        {
          "name": "multiple",
          "type": "boolean",
          "default": "false",
          "source": "base-item-group",
          "description": "Missing description"
        },
        {
          "name": "nextIcon",
          "type": [
            "boolean",
            "string"
          ],
          "default": "$vuetify.icons.next",
          "source": "v-carousel",
          "description": "The displayed icon for forcing pagination to the next item."
        },
        {
          "name": "prevIcon",
          "type": [
            "boolean",
            "string"
          ],
          "default": "$vuetify.icons.prev",
          "source": "v-carousel",
          "description": "The displayed icon for forcing pagination to the previous item."
        },
        {
          "name": "reverse",
          "type": "boolean",
          "default": "false",
          "source": "v-window",
          "description": "Reverse the normal transition direction."
        },
        {
          "name": "touch",
          "type": "object",
          "default": "undefined",
          "source": "v-window",
          "description": "Provide a custom **left** and **right** function when swiped left or right."
        },
        {
          "name": "touchless",
          "type": "boolean",
          "default": "false",
          "source": "v-window",
          "description": "Disable touch support."
        },
        {
          "name": "value",
          "type": "any",
          "default": "undefined",
          "source": "proxyable",
          "description": "Missing description"
        },
        {
          "name": "vertical",
          "type": "boolean",
          "default": "false",
          "source": "v-window",
          "description": "Uses a vertical transition when changing windows."
        }
      ],
      "mixins": [
        "proxyable",
        "themeable"
      ],
      "events": [
        {
          "name": "change",
          "value": "number",
          "description": "Missing description"
        }
      ],
      "slots": [
        {
          "name": "default",
          "description": "Missing description"
        }
      ],
      "sass": [
        {
          "name": "$carousel-controls-bg",
          "default": "rgba(0, 0, 0, .3) !default;",
          "description": "Missing description"
        },
        {
          "name": "$carousel-controls-size",
          "default": "50px !default;",
          "description": "Missing description"
        },
        {
          "name": "$carousel-dot-margin",
          "default": "0 8px !default;",
          "description": "Missing description"
        },
        {
          "name": "$carousel-dot-inactive-opacity",
          "default": ".5 !default;",
          "description": "Missing description"
        },
        {
          "name": "$carousel-dot-active-opacity",
          "default": "1 !default;",
          "description": "Missing description"
        },
        {
          "name": "$carousel-dot-hover-opacity",
          "default": ".8 !default;",
          "description": "Missing description"
        }
      ]
    },
    "v-carousel-item": {
      "props": [
        {
          "name": "activeClass",
          "type": "string",
          "source": "groupable",
          "description": "Missing description"
        },
        {
          "name": "disabled",
          "type": "boolean",
          "default": "false",
          "source": "groupable",
          "description": "Missing description"
        },
        {
          "name": "lazy",
          "type": "boolean",
          "default": "false",
          "source": "bootable",
          "description": "Missing description"
        },
        {
          "name": "reverseTransition",
          "type": [
            "boolean",
            "string"
          ],
          "default": "undefined",
          "source": "v-window-item",
          "description": "Missing description"
        },
        {
          "name": "transition",
          "type": [
            "boolean",
            "string"
          ],
          "default": "undefined",
          "source": "v-window-item",
          "description": "Mixins.Transitionable.props.transition"
        },
        {
          "name": "value",
          "type": "any",
          "default": "undefined",
          "source": "v-window-item",
          "description": "Mixins.Groupable.props.value"
        }
      ],
      "mixins": [
        "bootable",
        "groupable"
      ],
      "slots": [
        {
          "name": "default",
          "description": "Missing description"
        }
      ],
      "sass": []
    },
    "v-checkbox": {
      "props": [
        {
          "name": "appendIcon",
          "type": "string",
          "default": "undefined",
          "source": "v-input",
          "description": "Appends an icon to the component, uses the same syntax as `v-icon`"
        },
        {
          "name": "appendIconCb",
          "type": "function",
          "default": "null",
          "source": "v-input",
          "description": "Missing description"
        },
        {
          "name": "backgroundColor",
          "type": "string",
          "default": "undefined",
          "source": "v-input",
          "description": "Changes the background-color of the input"
        },
        {
          "name": "color",
          "type": "string",
          "default": "'accent'",
          "source": "colorable",
          "description": "Missing description"
        },
        {
          "name": "dark",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "disabled",
          "type": "boolean",
          "default": false,
          "source": "validatable",
          "value": "boolean",
          "description": "Missing description"
        },
        {
          "name": "error",
          "type": "boolean",
          "default": "false",
          "source": "validatable",
          "description": "Missing description"
        },
        {
          "name": "errorCount",
          "type": [
            "number",
            "string"
          ],
          "default": 1,
          "source": "validatable",
          "description": "Missing description"
        },
        {
          "name": "errorMessages",
          "type": [
            "string",
            "array"
          ],
          "default": [],
          "source": "validatable",
          "description": "Missing description"
        },
        {
          "name": "falseValue",
          "type": "any",
          "default": "undefined",
          "source": "selectable",
          "description": "Missing description"
        },
        {
          "name": "height",
          "type": [
            "number",
            "string"
          ],
          "default": "undefined",
          "source": "v-input",
          "description": "Sets the height of the input"
        },
        {
          "name": "hideDetails",
          "type": "boolean",
          "default": "false",
          "source": "v-input",
          "description": "Hides hint and validation errors. When set to `auto` messages will be rendered only if there's a message (hint, error message, counter value etc) to display"
        },
        {
          "name": "hint",
          "type": "string",
          "default": "undefined",
          "source": "v-input",
          "description": "Hint text"
        },
        {
          "name": "id",
          "type": "string",
          "default": "undefined",
          "source": "selectable",
          "description": "Missing description"
        },
        {
          "name": "indeterminate",
          "type": "boolean",
          "default": "false",
          "source": "v-checkbox",
          "description": "Sets an indeterminate state for the checkbox"
        },
        {
          "name": "indeterminateIcon",
          "type": "string",
          "default": "'$vuetify.icons.checkboxIndeterminate'",
          "source": "v-checkbox",
          "description": "The icon used when in an indeterminate state"
        },
        {
          "name": "inputValue",
          "type": "any",
          "default": "undefined",
          "source": "selectable",
          "description": "Missing description"
        },
        {
          "name": "label",
          "type": "string",
          "source": "v-input",
          "description": "Sets input label"
        },
        {
          "name": "light",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "loading",
          "type": "boolean",
          "default": "false",
          "source": "v-input",
          "description": "Mixins.Loadable.props.loading"
        },
        {
          "name": "messages",
          "type": [
            "string",
            "array"
          ],
          "default": [],
          "source": "validatable",
          "description": "Missing description"
        },
        {
          "name": "multiple",
          "type": "boolean",
          "default": "false",
          "source": "selectable",
          "description": "Missing description"
        },
        {
          "name": "offIcon",
          "type": "string",
          "default": "'$vuetify.icons.checkboxOff'",
          "source": "v-checkbox",
          "description": "The icon used when inactive"
        },
        {
          "name": "onIcon",
          "type": "string",
          "default": "'$vuetify.icons.checkboxOn'",
          "source": "v-checkbox",
          "description": "The icon used when active"
        },
        {
          "name": "persistentHint",
          "type": "boolean",
          "default": "false",
          "source": "v-input",
          "description": "Forces hint to always be visible"
        },
        {
          "name": "prependIcon",
          "type": "string",
          "default": "undefined",
          "source": "v-input",
          "description": "Prepends an icon to the component, uses the same syntax as `v-icon`"
        },
        {
          "name": "prependIconCb",
          "type": "function",
          "default": "null",
          "source": "v-input",
          "description": "Missing description"
        },
        {
          "name": "readonly",
          "type": "boolean",
          "default": false,
          "source": "validatable",
          "value": "boolean",
          "description": "Missing description"
        },
        {
          "name": "ripple",
          "type": [
            "boolean",
            "object"
          ],
          "default": true,
          "source": "rippleable",
          "description": "Missing description"
        },
        {
          "name": "rules",
          "type": "array",
          "default": [],
          "source": "validatable",
          "description": "Missing description"
        },
        {
          "name": "success",
          "type": "boolean",
          "default": "false",
          "source": "validatable",
          "description": "Missing description"
        },
        {
          "name": "successMessages",
          "type": [
            "string",
            "array"
          ],
          "default": [],
          "source": "validatable",
          "description": "Missing description"
        },
        {
          "name": "trueValue",
          "type": "any",
          "default": "undefined",
          "source": "selectable",
          "description": "Missing description"
        },
        {
          "name": "validateOnBlur",
          "type": "boolean",
          "default": "false",
          "source": "validatable",
          "description": "Missing description"
        },
        {
          "name": "value",
          "type": "any",
          "source": "v-input",
          "description": "The input's value"
        },
        {
          "name": "valueComparator",
          "type": "function",
          "default": "null",
          "source": "comparable",
          "description": "Missing description"
        }
      ],
      "mixins": [
        "selectable",
        "rippleable",
        "comparable"
      ],
      "events": [
        {
          "name": "update:error",
          "source": "validatable",
          "value": "boolean",
          "description": "Missing description"
        },
        {
          "name": "click",
          "source": "v-input",
          "value": "MouseEvent",
          "description": "Missing description"
        },
        {
          "name": "mousedown",
          "source": "v-input",
          "value": "MouseEvent",
          "description": "Missing description"
        },
        {
          "name": "mouseup",
          "source": "v-input",
          "value": "MouseEvent",
          "description": "Missing description"
        },
        {
          "name": "click:append",
          "source": "v-input",
          "value": "Event",
          "description": "Missing description"
        },
        {
          "name": "click:prepend",
          "source": "v-input",
          "value": "Event",
          "description": "Missing description"
        },
        {
          "name": "update:indeterminate",
          "value": "boolean",
          "description": "Missing description"
        }
      ],
      "slots": [
        {
          "name": "append",
          "source": "v-input",
          "description": "Missing description"
        },
        {
          "name": "default",
          "source": "v-input",
          "description": "Missing description"
        },
        {
          "name": "prepend",
          "source": "v-input",
          "description": "Missing description"
        },
        {
          "name": "label",
          "source": "v-input",
          "description": "Missing description"
        },
        {
          "name": "message",
          "props": {
            "key": "number, // the messages index",
            "message": "string, // the message"
          },
          "source": "v-input",
          "description": "Missing description"
        }
      ],
      "sass": [
        {
          "name": "$checkbox-disabled-opacity",
          "default": ".6 !default;",
          "description": "Missing description"
        }
      ]
    },
    "v-chip": {
      "props": [
        {
          "name": "close",
          "type": "boolean",
          "default": "false",
          "source": "v-chip",
          "description": "Adds remove button"
        },
        {
          "name": "color",
          "type": "string",
          "default": "undefined",
          "source": "colorable",
          "description": "Missing description"
        },
        {
          "name": "dark",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "disabled",
          "type": "boolean",
          "default": "false",
          "source": "v-chip",
          "description": "Disables the chip, making it un-selectable"
        },
        {
          "name": "label",
          "type": "boolean",
          "default": "false",
          "source": "v-chip",
          "description": "Removes circle edges"
        },
        {
          "name": "light",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "outline",
          "type": "boolean",
          "default": "false",
          "source": "v-chip",
          "description": "Missing description"
        },
        {
          "name": "selected",
          "type": "boolean",
          "default": "false",
          "source": "v-chip",
          "description": "Missing description"
        },
        {
          "name": "small",
          "type": "boolean",
          "default": "false",
          "source": "v-chip",
          "description": "Missing description"
        },
        {
          "name": "textColor",
          "type": "string",
          "default": "undefined",
          "source": "v-chip",
          "description": "Missing description"
        },
        {
          "name": "value",
          "type": "boolean",
          "default": "true",
          "source": "toggleable",
          "description": "Missing description"
        }
      ],
      "mixins": [
        "colorable",
        "themeable",
        "toggleable"
      ],
      "events": [
        {
          "name": "input",
          "value": "boolean",
          "description": "Missing description"
        },
        {
          "name": "click",
          "value": "MouseEvent",
          "description": "Missing description"
        },
        {
          "name": "click:close",
          "value": "void",
          "description": "Missing description"
        },
        {
          "name": "update:active",
          "value": "boolean",
          "description": "Missing description"
        }
      ],
      "slots": [
        {
          "name": "default",
          "description": "Missing description"
        }
      ],
      "sass": [
        {
          "name": "$chip-avatar-size",
          "default": "24px !default;",
          "description": "Missing description"
        },
        {
          "name": "$chip-close-size",
          "default": "18px !default;",
          "description": "Missing description"
        },
        {
          "name": "$chip-icon-margin-after",
          "default": "6px !default;",
          "description": "Missing description"
        },
        {
          "name": "$chip-icon-margin-before",
          "default": "-6px !default;",
          "description": "Missing description"
        },
        {
          "name": "$chip-icon-right-margin-after",
          "default": "-4px !default;",
          "description": "Missing description"
        },
        {
          "name": "$chip-icon-right-margin-before",
          "default": "8px !default;",
          "description": "Missing description"
        },
        {
          "name": "$chip-icon-size",
          "default": "24px !default;",
          "description": "Missing description"
        },
        {
          "name": "$chip-label-border-radius",
          "default": "$border-radius-root !default;",
          "description": "Missing description"
        },
        {
          "name": "$chip-link-focus-opacity",
          "default": "0.32 !default;",
          "description": "Missing description"
        },
        {
          "name": "$chip-pill-avatar-margin-after",
          "default": "8px !default;",
          "description": "Missing description"
        },
        {
          "name": "$chip-pill-avatar-margin-before",
          "default": "-12px !default;",
          "description": "Missing description"
        },
        {
          "name": "$chip-pill-avatar-size",
          "default": "32px !default;",
          "description": "Missing description"
        },
        {
          "name": "$chip-pill-filter-margin",
          "default": "0 16px 0 0 !default;",
          "description": "Missing description"
        },
        {
          "name": "$chip-transition-duration",
          "default": "0.28s !default;",
          "description": "Missing description"
        },
        {
          "name": "$chip-transition-fn",
          "default": "map-get($transition, 'fast-out-slow-in') !default;",
          "description": "Missing description"
        },
        {
          "name": "$icon-outlined-border-width",
          "default": "thin !default;",
          "description": "Missing description"
        },
        {
          "name": "$chip-line-height",
          "default": "20px !default;",
          "description": "Missing description"
        },
        {
          "name": "$chip-padding",
          "default": "0 12px !default;",
          "description": "Missing description"
        },
        {
          "name": "$chip-white-space",
          "default": "nowrap !default;",
          "description": "Missing description"
        },
        {
          "name": "$chip-disabled-opacity",
          "default": "0.4 !default;",
          "description": "Missing description"
        },
        {
          "name": "$chip-filter-max-width",
          "default": "24px !default;",
          "description": "Missing description"
        },
        {
          "name": "$chip-outlined-active-opacity",
          "default": "0.08 !default;",
          "description": "Missing description"
        },
        {
          "name": "$chip-selected-opacity",
          "default": "0.28 !default;",
          "description": "Missing description"
        },
        {
          "name": "$icon-sizes",
          "default": "map-deep-merge(\n  (\n    'x-small': (\n      'font-size': 10,\n      'height': 16\n    ),\n    'small': (\n      'font-size': 12,\n      'height': 24\n    ),\n    'default': (\n      'font-size': 14,\n      'height': 32\n    ),\n    'large': (\n      'font-size': 16,\n      'height': 54\n    ),\n    'x-large': (\n      'font-size': 18,\n      'height': 66\n    )\n  ),\n  $icon-sizes\n);",
          "description": "Missing description"
        }
      ]
    },
    "v-combobox": {
      "props": [
        {
          "name": "allowOverflow",
          "type": "boolean",
          "default": "true",
          "source": "v-autocomplete",
          "description": "Allow the menu to overflow off the screen"
        },
        {
          "name": "appendIcon",
          "type": "string",
          "default": "'$vuetify.icons.dropdown'",
          "source": "v-input",
          "description": "Appends an icon to the component, uses the same syntax as `v-icon`"
        },
        {
          "name": "appendIconCb",
          "type": "function",
          "default": "null",
          "source": "v-input",
          "description": "Missing description"
        },
        {
          "name": "appendOuterIcon",
          "type": "string",
          "default": "undefined",
          "source": "v-text-field",
          "description": "Appends an icon to the outside the component's input, uses same syntax as `v-icon`"
        },
        {
          "name": "appendOuterIconCb",
          "type": "function",
          "default": "null",
          "source": "v-text-field",
          "description": "Missing description"
        },
        {
          "name": "attach",
          "type": "any",
          "default": false,
          "source": "v-select",
          "description": "Mixins.Detachable.props.attach"
        },
        {
          "name": "autoSelectFirst",
          "type": "boolean",
          "default": "false",
          "source": "v-autocomplete",
          "description": "When searching, will always highlight the first option"
        },
        {
          "name": "autofocus",
          "type": "boolean",
          "default": "false",
          "source": "v-text-field",
          "description": "Enables autofocus"
        },
        {
          "name": "backgroundColor",
          "type": "string",
          "default": "undefined",
          "source": "v-input",
          "description": "Changes the background-color of the input"
        },
        {
          "name": "box",
          "type": "boolean",
          "default": "false",
          "source": "v-text-field",
          "description": "Missing description"
        },
        {
          "name": "browserAutocomplete",
          "type": "string",
          "default": "'off'",
          "source": "v-text-field",
          "description": "Missing description"
        },
        {
          "name": "cacheItems",
          "type": "boolean",
          "default": "false",
          "source": "v-select",
          "description": "Keeps a local _unique_ copy of all items that have been passed through the **items** prop."
        },
        {
          "name": "chips",
          "type": "boolean",
          "default": "false",
          "source": "v-select",
          "description": "Changes display of selections to chips"
        },
        {
          "name": "clearIcon",
          "type": "string",
          "default": "'$vuetify.icons.clear'",
          "source": "v-text-field",
          "description": "Applied when using **clearable** and the input is dirty"
        },
        {
          "name": "clearIconCb",
          "type": "function",
          "default": "null",
          "source": "v-text-field",
          "description": "Missing description"
        },
        {
          "name": "clearable",
          "type": "boolean",
          "default": "false",
          "source": "v-text-field",
          "description": "Missing description"
        },
        {
          "name": "color",
          "type": "string",
          "default": "'primary'",
          "source": "colorable",
          "description": "Missing description"
        },
        {
          "name": "counter",
          "type": [
            "boolean",
            "number",
            "string"
          ],
          "default": "undefined",
          "source": "v-text-field",
          "description": "Creates counter for input length; if no number is specified, it defaults to 25. Does not apply any validation."
        },
        {
          "name": "dark",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "deletableChips",
          "type": "boolean",
          "default": "false",
          "source": "v-select",
          "description": "Adds a remove icon to selected chips"
        },
        {
          "name": "delimiters",
          "type": "array",
          "default": [],
          "source": "v-combobox",
          "description": "Accepts an array of strings that will trigger a new tag when typing. Does not replace the normal Tab and Enter keys."
        },
        {
          "name": "dense",
          "type": "boolean",
          "default": "false",
          "source": "v-select",
          "description": "Missing description"
        },
        {
          "name": "disabled",
          "type": "boolean",
          "default": false,
          "source": "validatable",
          "value": "boolean",
          "description": "Missing description"
        },
        {
          "name": "dontFillMaskBlanks",
          "type": "boolean",
          "default": "false",
          "source": "maskable",
          "description": "Missing description"
        },
        {
          "name": "error",
          "type": "boolean",
          "default": "false",
          "source": "validatable",
          "description": "Missing description"
        },
        {
          "name": "errorCount",
          "type": [
            "number",
            "string"
          ],
          "default": 1,
          "source": "validatable",
          "description": "Missing description"
        },
        {
          "name": "errorMessages",
          "type": [
            "string",
            "array"
          ],
          "default": [],
          "source": "validatable",
          "description": "Missing description"
        },
        {
          "name": "filter",
          "type": "function",
          "default": "(item: object, queryText: string, itemText: string): boolean",
          "source": "v-select",
          "description": "The function used for filtering items"
        },
        {
          "name": "flat",
          "type": "boolean",
          "default": "false",
          "source": "v-text-field",
          "description": "Mixins.Soloable.props.flat"
        },
        {
          "name": "fullWidth",
          "type": "boolean",
          "default": "false",
          "source": "v-text-field",
          "description": "Designates input type as full-width"
        },
        {
          "name": "height",
          "type": [
            "number",
            "string"
          ],
          "default": "undefined",
          "source": "v-input",
          "description": "Sets the height of the input"
        },
        {
          "name": "hideDetails",
          "type": "boolean",
          "default": "false",
          "source": "v-input",
          "description": "Hides hint and validation errors. When set to `auto` messages will be rendered only if there's a message (hint, error message, counter value etc) to display"
        },
        {
          "name": "hideNoData",
          "type": "boolean",
          "default": "false",
          "source": "v-autocomplete",
          "description": "Hides the menu when there are no options to show.  Useful for preventing the menu from opening before results are fetched asynchronously.  Also has the effect of opening the menu when the `items` array changes if not already open."
        },
        {
          "name": "hideSelected",
          "type": "boolean",
          "default": "false",
          "source": "v-select",
          "description": "Do not display in the select menu items that are already selected"
        },
        {
          "name": "hint",
          "type": "string",
          "default": "undefined",
          "source": "v-input",
          "description": "Hint text"
        },
        {
          "name": "itemAvatar",
          "type": [
            "string",
            "array",
            "function"
          ],
          "default": "avatar",
          "source": "v-select",
          "description": "Missing description"
        },
        {
          "name": "itemDisabled",
          "type": [
            "string",
            "array",
            "function"
          ],
          "default": "disabled",
          "source": "v-select",
          "description": "Set property of **items**'s disabled value"
        },
        {
          "name": "itemText",
          "type": [
            "string",
            "array",
            "function"
          ],
          "default": "text",
          "source": "v-select",
          "description": "Set property of **items**'s text value"
        },
        {
          "name": "itemValue",
          "type": [
            "string",
            "array",
            "function"
          ],
          "default": "value",
          "source": "v-select",
          "description": "Set property of **items**'s value - **must be primitive**. Dot notation is supported. **Note:** This is currently not supported with `v-combobox` [GitHub Issue](https://github.com/vuetifyjs/vuetify/issues/5479)"
        },
        {
          "name": "items",
          "type": "array",
          "default": [],
          "source": "v-select",
          "example": {
            "text": "string | number | object",
            "value": "string | number | object",
            "disabled": "boolean",
            "divider": "boolean",
            "header": "string"
          },
          "description": "Can be an array of objects or array of strings. When using objects, will look for a text, value and disabled keys. This can be changed using the **item-text**, **item-value** and **item-disabled** props.  Objects that have a **header** or **divider** property are considered special cases and generate a list header or divider; these items are not selectable."
        },
        {
          "name": "label",
          "type": "string",
          "source": "v-input",
          "description": "Sets input label"
        },
        {
          "name": "light",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "loading",
          "type": [
            "boolean",
            "string"
          ],
          "default": false,
          "source": "v-input",
          "description": "Mixins.Loadable.props.loading"
        },
        {
          "name": "mask",
          "type": [
            "object",
            "string"
          ],
          "default": "undefined",
          "source": "maskable",
          "description": "Missing description"
        },
        {
          "name": "menuProps",
          "type": [
            "string",
            "array",
            "object"
          ],
          "default": "{ \"closeOnClick\": false, \"closeOnContentClick\": false, \"disableKeys\": true, \"openOnClick\": false, \"maxHeight\": 304 }",
          "source": "v-select",
          "description": "Pass props through to the `v-menu` component. Accepts either a string for boolean props `menu-props=\"auto, overflowY\"`, or an object `:menu-props=\"{ auto: true, overflowY: true }\"`"
        },
        {
          "name": "messages",
          "type": [
            "string",
            "array"
          ],
          "default": [],
          "source": "validatable",
          "description": "Missing description"
        },
        {
          "name": "multiple",
          "type": "boolean",
          "default": "false",
          "source": "v-select",
          "description": "Changes select to multiple. Accepts array for value"
        },
        {
          "name": "noDataText",
          "type": "string",
          "default": "'$vuetify.noDataText'",
          "source": "filterable",
          "description": "Missing description"
        },
        {
          "name": "noFilter",
          "type": "boolean",
          "default": "false",
          "source": "v-autocomplete",
          "description": "Do not apply filtering when searching. Useful when data is being filtered server side"
        },
        {
          "name": "openOnClear",
          "type": "boolean",
          "default": "false",
          "source": "v-select",
          "description": "When using the **clearable** prop, once cleared, the select menu will either open or stay open, depending on the current state"
        },
        {
          "name": "outline",
          "type": "boolean",
          "default": "false",
          "source": "v-text-field",
          "description": "Missing description"
        },
        {
          "name": "persistentHint",
          "type": "boolean",
          "default": "false",
          "source": "v-input",
          "description": "Forces hint to always be visible"
        },
        {
          "name": "placeholder",
          "type": "string",
          "default": "undefined",
          "source": "v-text-field",
          "description": "Sets the input’s placeholder text"
        },
        {
          "name": "prefix",
          "type": "string",
          "default": "undefined",
          "source": "v-text-field",
          "description": "Displays prefix text"
        },
        {
          "name": "prependIcon",
          "type": "string",
          "default": "undefined",
          "source": "v-input",
          "description": "Prepends an icon to the component, uses the same syntax as `v-icon`"
        },
        {
          "name": "prependIconCb",
          "type": "function",
          "default": "null",
          "source": "v-input",
          "description": "Missing description"
        },
        {
          "name": "prependInnerIcon",
          "type": "string",
          "default": "undefined",
          "source": "v-text-field",
          "description": "Prepends an icon inside the component's input, uses the same syntax as `v-icon`"
        },
        {
          "name": "prependInnerIconCb",
          "type": "function",
          "default": "null",
          "source": "v-text-field",
          "description": "Missing description"
        },
        {
          "name": "readonly",
          "type": "boolean",
          "default": false,
          "source": "validatable",
          "value": "boolean",
          "description": "Missing description"
        },
        {
          "name": "returnMaskedValue",
          "type": "boolean",
          "default": "false",
          "source": "maskable",
          "description": "Missing description"
        },
        {
          "name": "returnObject",
          "type": "boolean",
          "default": "true",
          "source": "v-select",
          "description": "Changes the selection behavior to return the object directly rather than the value specified with **item-value**"
        },
        {
          "name": "reverse",
          "type": "boolean",
          "default": "false",
          "source": "v-text-field",
          "description": "Reverses the input orientation"
        },
        {
          "name": "rules",
          "type": "array",
          "default": [],
          "source": "validatable",
          "description": "Missing description"
        },
        {
          "name": "searchInput",
          "type": "any",
          "default": "undefined",
          "source": "v-select",
          "description": "Use the **.sync** modifier to catch user input from the search input"
        },
        {
          "name": "singleLine",
          "type": "boolean",
          "default": "false",
          "source": "v-text-field",
          "description": "Missing description"
        },
        {
          "name": "smallChips",
          "type": "boolean",
          "default": "false",
          "source": "v-select",
          "description": "Changes display of selections to chips with the **small** property"
        },
        {
          "name": "solo",
          "type": "boolean",
          "default": "false",
          "source": "v-text-field",
          "description": "Mixins.Soloable.props.solo"
        },
        {
          "name": "soloInverted",
          "type": "boolean",
          "default": "false",
          "source": "v-text-field",
          "description": "Mixins.Soloable.props.soloInverted"
        },
        {
          "name": "success",
          "type": "boolean",
          "default": "false",
          "source": "validatable",
          "description": "Missing description"
        },
        {
          "name": "successMessages",
          "type": [
            "string",
            "array"
          ],
          "default": [],
          "source": "validatable",
          "description": "Missing description"
        },
        {
          "name": "suffix",
          "type": "string",
          "default": "undefined",
          "source": "v-text-field",
          "description": "Displays suffix text"
        },
        {
          "name": "type",
          "type": "string",
          "default": "'text'",
          "source": "v-text-field",
          "description": "Sets input type"
        },
        {
          "name": "validateOnBlur",
          "type": "boolean",
          "default": "false",
          "source": "validatable",
          "description": "Missing description"
        },
        {
          "name": "value",
          "type": "any",
          "source": "v-input",
          "description": "The input's value"
        },
        {
          "name": "valueComparator",
          "type": "function",
          "default": "(a: any, b: any): boolean",
          "source": "v-select",
          "description": "The comparison algorithm used for values. [More info](https://github.com/vuetifyjs/vuetify/blob/master/packages/vuetify/src/util/helpers.ts)"
        }
      ],
      "mixins": [
        "comparable",
        "filterable"
      ],
      "events": [
        {
          "name": "update:error",
          "source": "validatable",
          "value": "boolean",
          "description": "Missing description"
        },
        {
          "name": "click",
          "source": "v-input",
          "value": "MouseEvent",
          "description": "Missing description"
        },
        {
          "name": "mousedown",
          "source": "v-input",
          "value": "MouseEvent",
          "description": "Missing description"
        },
        {
          "name": "mouseup",
          "source": "v-input",
          "value": "MouseEvent",
          "description": "Missing description"
        },
        {
          "name": "click:append",
          "source": "v-input",
          "value": "Event",
          "description": "Missing description"
        },
        {
          "name": "click:prepend",
          "source": "v-input",
          "value": "Event",
          "description": "Missing description"
        },
        {
          "name": "blur",
          "source": "v-text-field",
          "value": "Event",
          "description": "Emitted when the input is blurred"
        },
        {
          "name": "click:clear",
          "source": "v-text-field",
          "value": "Event",
          "description": "Emitted when clearable icon clicked"
        },
        {
          "name": "click:append-outer",
          "source": "v-text-field",
          "value": "Event",
          "description": "Emitted when appended outer icon is clicked"
        },
        {
          "name": "click:prepend-inner",
          "source": "v-text-field",
          "value": "Event",
          "description": "Emitted when prepended inner icon is clicked"
        },
        {
          "name": "focus",
          "source": "v-text-field",
          "value": "Event",
          "description": "Emitted when component is focused"
        },
        {
          "name": "change",
          "source": "v-text-field",
          "value": "any",
          "description": "Emitted when the input is changed by user interaction"
        },
        {
          "name": "input",
          "source": "v-text-field",
          "value": "any",
          "description": "Missing description"
        },
        {
          "name": "keydown",
          "source": "v-text-field",
          "value": "KeyboardEvent",
          "description": "Emitted when **any** key is pressed"
        },
        {
          "name": "update:search-input",
          "source": "v-select",
          "value": "string",
          "description": "The `search-input.sync` event"
        },
        {
          "name": "update:list-index",
          "source": "v-select",
          "value": "number",
          "description": "Emitted when menu item is selected using keyboard arrows"
        }
      ],
      "slots": [
        {
          "name": "append",
          "source": "v-input",
          "description": "Missing description"
        },
        {
          "name": "default",
          "source": "v-input",
          "description": "Missing description"
        },
        {
          "name": "prepend",
          "source": "v-input",
          "description": "Missing description"
        },
        {
          "name": "label",
          "source": "v-input",
          "description": "Missing description"
        },
        {
          "name": "message",
          "props": {
            "key": "number, // the messages index",
            "message": "string, // the message"
          },
          "source": "v-input",
          "description": "Missing description"
        },
        {
          "name": "append-outer",
          "source": "v-text-field",
          "description": "Adds an item outside the input and after input content"
        },
        {
          "name": "prepend-inner",
          "source": "v-text-field",
          "description": "Adds an item inside the input and before input content"
        },
        {
          "name": "progress",
          "source": "v-text-field",
          "description": "Missing description"
        },
        {
          "name": "append-item",
          "source": "v-select",
          "description": "Adds an item after menu content"
        },
        {
          "name": "prepend-item",
          "source": "v-select",
          "description": "Adds an item before menu content"
        },
        {
          "name": "item",
          "props": {
            "parent": "VueComponent",
            "item": "object",
            "on": "object // Only needed when providing your own v-list-item",
            "attrs": "object // Only needed when providing your own v-list-item"
          },
          "source": "v-select",
          "description": "Define a custom item appearance"
        },
        {
          "name": "no-data",
          "source": "v-select",
          "description": "Mixins.Filterable.slots.noData"
        },
        {
          "name": "selection",
          "props": {
            "parent": "VueComponent",
            "item": "object",
            "index": "number",
            "select": "function",
            "selected": "boolean",
            "disabled": "boolean"
          },
          "source": "v-select",
          "description": "Define a custom selection appearance"
        }
      ],
      "sass": []
    },
    "v-counter": {
      "props": [
        {
          "name": "dark",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "light",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "max",
          "type": [
            "number",
            "string"
          ],
          "default": "undefined",
          "source": "v-counter",
          "description": "Missing description"
        },
        {
          "name": "value",
          "type": [
            "number",
            "string"
          ],
          "default": "undefined",
          "source": "v-counter",
          "description": "Missing description"
        }
      ],
      "mixins": [
        "themeable"
      ],
      "sass": [
        {
          "name": "$counter-font-size",
          "default": "12px !default;",
          "description": "Missing description"
        },
        {
          "name": "$counter-line-height",
          "default": "$counter-font-size !default;",
          "description": "Missing description"
        },
        {
          "name": "$counter-min-height",
          "default": "12px !default;",
          "description": "Missing description"
        }
      ]
    },
    "v-data-iterator": {
      "props": [
        {
          "name": "contentClass",
          "type": "string",
          "default": "undefined",
          "source": "v-data-iterator",
          "description": "Missing description"
        },
        {
          "name": "contentProps",
          "type": "object",
          "default": "undefined",
          "source": "v-data-iterator",
          "description": "Missing description"
        },
        {
          "name": "contentTag",
          "type": "string",
          "default": "'div'",
          "source": "v-data-iterator",
          "description": "Missing description"
        },
        {
          "name": "customFilter",
          "type": "function",
          "default": "(items: any[], search: string) => any[]",
          "source": "v-data",
          "description": "Missing description"
        },
        {
          "name": "customGroup",
          "source": "v-data",
          "default": "(items: any[], groupBy: string[], groupDesc: boolean[]) => Record<string, any[]>",
          "description": "Missing description"
        },
        {
          "name": "customSort",
          "type": "function",
          "default": "(items: any[], sortBy: string[], sortDesc: boolean[], locale: string, customSorters?: Record<string, compareFn>) => any[]",
          "source": "v-data",
          "description": "Missing description"
        },
        {
          "name": "dark",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "disableFiltering",
          "source": "v-data",
          "description": "Missing description"
        },
        {
          "name": "disableInitialSort",
          "type": "boolean",
          "default": "false",
          "source": "data-iterable",
          "description": "Missing description"
        },
        {
          "name": "disablePagination",
          "source": "v-data",
          "description": "Missing description"
        },
        {
          "name": "disableSort",
          "source": "v-data",
          "description": "Missing description"
        },
        {
          "name": "expand",
          "type": "boolean",
          "default": "false",
          "source": "data-iterable",
          "description": "Missing description"
        },
        {
          "name": "expanded",
          "source": "v-data-iterator",
          "description": "Array of expanded items. Can be used with `.sync` modifier"
        },
        {
          "name": "filter",
          "type": "function",
          "default": "(val, search) => {}",
          "source": "data-iterable",
          "description": "Missing description"
        },
        {
          "name": "footerProps",
          "source": "v-data-iterator",
          "description": "See the `v-data-footer` API for more information"
        },
        {
          "name": "groupBy",
          "source": "v-data",
          "description": "Missing description"
        },
        {
          "name": "groupDesc",
          "source": "v-data",
          "description": "Missing description"
        },
        {
          "name": "hideActions",
          "type": "boolean",
          "default": "false",
          "source": "data-iterable",
          "description": "Missing description"
        },
        {
          "name": "hideDefaultFooter",
          "source": "v-data-iterator",
          "description": "Hides default footer"
        },
        {
          "name": "itemKey",
          "type": "string",
          "default": "'id'",
          "source": "v-data",
          "description": "Missing description"
        },
        {
          "name": "items",
          "type": "array",
          "default": [],
          "source": "v-data",
          "description": "Missing description"
        },
        {
          "name": "itemsPerPage",
          "source": "v-data",
          "description": "Missing description"
        },
        {
          "name": "light",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "loading",
          "type": [
            "boolean",
            "string"
          ],
          "default": false,
          "source": "v-data-iterator",
          "description": "If `true` and no items are provided, then a loading text will be shown"
        },
        {
          "name": "loadingText",
          "source": "v-data-iterator",
          "description": "Text shown when `loading` is true and no items are provided"
        },
        {
          "name": "locale",
          "source": "v-data",
          "description": "Missing description"
        },
        {
          "name": "multiSort",
          "source": "v-data",
          "description": "Missing description"
        },
        {
          "name": "mustSort",
          "type": "boolean",
          "default": "false",
          "source": "v-data",
          "description": "Missing description"
        },
        {
          "name": "nextIcon",
          "type": "string",
          "default": "'$vuetify.icons.next'",
          "source": "data-iterable",
          "description": "Missing description"
        },
        {
          "name": "noDataText",
          "type": "string",
          "default": "'$vuetify.noDataText'",
          "source": "v-data-iterator",
          "description": "Text shown when no items are provided to the component"
        },
        {
          "name": "noResultsText",
          "type": "string",
          "default": "'$vuetify.dataIterator.noResultsText'",
          "source": "v-data-iterator",
          "description": "Text shown when `search` prop is used and there are no results"
        },
        {
          "name": "options",
          "source": "v-data",
          "type": "DataOptions",
          "example": {
            "page": "number",
            "itemsPerPage": "number",
            "sortBy": "string[]",
            "sortDesc": "boolean[]",
            "groupBy": "string[]",
            "groupDesc": "boolean[]",
            "multiSort": "boolean",
            "mustSort": "boolean"
          },
          "description": "Missing description"
        },
        {
          "name": "page",
          "source": "v-data",
          "description": "Missing description"
        },
        {
          "name": "pagination",
          "type": "object",
          "source": "data-iterable",
          "description": "Missing description"
        },
        {
          "name": "prevIcon",
          "type": "string",
          "default": "'$vuetify.icons.prev'",
          "source": "data-iterable",
          "description": "Missing description"
        },
        {
          "name": "rowsPerPageItems",
          "type": "array",
          "default": [
            5,
            10,
            25,
            {
              "text": "$vuetify.dataIterator.rowsPerPageAll",
              "value": -1
            }
          ],
          "source": "data-iterable",
          "description": "Missing description"
        },
        {
          "name": "rowsPerPageText",
          "type": "string",
          "default": "'$vuetify.dataIterator.rowsPerPageText'",
          "source": "data-iterable",
          "description": "Missing description"
        },
        {
          "name": "search",
          "type": "any",
          "default": "undefined",
          "source": "v-data",
          "description": "Missing description"
        },
        {
          "name": "selectAll",
          "type": [
            "boolean",
            "string"
          ],
          "default": "undefined",
          "source": "data-iterable",
          "description": "Missing description"
        },
        {
          "name": "serverItemsLength",
          "source": "v-data",
          "description": "Missing description"
        },
        {
          "name": "singleExpand",
          "source": "v-data-iterator",
          "description": "Changes expansion mode to single expand"
        },
        {
          "name": "singleSelect",
          "source": "v-data-iterator",
          "description": "Changes selection mode to single select"
        },
        {
          "name": "sortBy",
          "source": "v-data",
          "description": "Missing description"
        },
        {
          "name": "sortDesc",
          "source": "v-data",
          "description": "Missing description"
        },
        {
          "name": "totalItems",
          "type": "number",
          "default": "undefined",
          "source": "data-iterable",
          "description": "Missing description"
        },
        {
          "name": "value",
          "type": "array",
          "default": [],
          "source": "v-data-iterator",
          "description": "Used for controlling selected rows"
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
          "name": "loading",
          "source": "data-iterator",
          "description": "Missing description"
        },
        {
          "name": "no-data",
          "source": "data-iterator",
          "description": "Missing description"
        },
        {
          "name": "no-results",
          "source": "data-iterator",
          "description": "Missing description"
        },
        {
          "name": "default",
          "props": {
            "items": "any[]",
            "pagination": {
              "page": "number",
              "itemsPerPage": "number",
              "pageStart": "number",
              "pageStop": "number",
              "pageCount": "number",
              "itemsLength": "number"
            },
            "options": {
              "page": "number",
              "itemsPerPage": "number",
              "sortBy": "string[]",
              "sortDesc": "boolean[]",
              "groupBy": "string[]",
              "groupDesc": "boolean[]",
              "multiSort": "boolean",
              "mustSort": "boolean"
            },
            "groupedItems": "Record<string, any[]>",
            "updateOptions": "(obj: any) => void",
            "sort": "(value: string) => void",
            "group": "(value: string) => void",
            "isSelected": "(item: any) => boolean",
            "select": "(item: any, value: boolean) => void",
            "isExpanded": "(item: any) => boolean",
            "expand": "(item: any, value: boolean) => void"
          },
          "source": "data-iterator",
          "description": "Missing description"
        },
        {
          "name": "footer",
          "props": {
            "items": "any[]",
            "pagination": {
              "page": "number",
              "itemsPerPage": "number",
              "pageStart": "number",
              "pageStop": "number",
              "pageCount": "number",
              "itemsLength": "number"
            },
            "options": {
              "page": "number",
              "itemsPerPage": "number",
              "sortBy": "string[]",
              "sortDesc": "boolean[]",
              "groupBy": "string[]",
              "groupDesc": "boolean[]",
              "multiSort": "boolean",
              "mustSort": "boolean"
            },
            "groupedItems": "Record<string, any[]>",
            "updateOptions": "(obj: any) => void",
            "sort": "(value: string) => void",
            "group": "(value: string) => void"
          },
          "source": "data-iterator",
          "description": "Missing description"
        },
        {
          "name": "footer.page-text",
          "props": {
            "pageStart": "number",
            "pageStop": "number",
            "itemsLength": "number"
          },
          "source": "data-iterator",
          "description": "Missing description"
        },
        {
          "name": "header",
          "props": {
            "items": "any[]",
            "pagination": {
              "page": "number",
              "itemsPerPage": "number",
              "pageStart": "number",
              "pageStop": "number",
              "pageCount": "number",
              "itemsLength": "number"
            },
            "options": {
              "page": "number",
              "itemsPerPage": "number",
              "sortBy": "string[]",
              "sortDesc": "boolean[]",
              "groupBy": "string[]",
              "groupDesc": "boolean[]",
              "multiSort": "boolean",
              "mustSort": "boolean"
            },
            "groupedItems": "Record<string, any[]>",
            "updateOptions": "(obj: any) => void",
            "sort": "(value: string) => void",
            "group": "(value: string) => void"
          },
          "source": "data-iterator",
          "description": "Missing description"
        },
        {
          "name": "item",
          "props": {
            "expand": "(v: boolean) => void",
            "item": "any",
            "isExpanded": "boolean",
            "isMobile": "boolean",
            "isSelected": "boolean",
            "select": "(v: boolean) => void"
          },
          "source": "data-iterator",
          "description": "Missing description"
        }
      ],
      "events": [
        {
          "name": "current-items",
          "source": "v-data",
          "value": "any[]",
          "description": "Missing description"
        },
        {
          "name": "page-count",
          "source": "v-data",
          "value": "number",
          "description": "Missing description"
        },
        {
          "name": "pagination",
          "source": "v-data",
          "value": {
            "page": "number",
            "itemsPerPage": "number",
            "pageStart": "number",
            "pageStop": "number",
            "pageCount": "number",
            "itemsLength": "number"
          },
          "description": "Missing description"
        },
        {
          "name": "update:options",
          "source": "v-data",
          "value": {
            "page": "number",
            "itemsPerPage": "number",
            "sortBy": "string[]",
            "sortDesc": "boolean[]",
            "groupBy": "string[]",
            "groupDesc": "boolean[]",
            "multiSort": "boolean",
            "mustSort": "boolean"
          },
          "description": "Missing description"
        },
        {
          "name": "update:page",
          "source": "v-data",
          "value": "number",
          "description": "Missing description"
        },
        {
          "name": "update:items-per-page",
          "source": "v-data",
          "value": "number",
          "description": "Missing description"
        },
        {
          "name": "update:sort-by",
          "source": "v-data",
          "value": "string | string[]",
          "description": "Missing description"
        },
        {
          "name": "update:sort-desc",
          "source": "v-data",
          "value": "boolean | boolean[]",
          "description": "Missing description"
        },
        {
          "name": "update:group-by",
          "source": "v-data",
          "value": "string | string[]",
          "description": "Missing description"
        },
        {
          "name": "update:group-desc",
          "source": "v-data",
          "value": "boolean | boolean[]",
          "description": "Missing description"
        },
        {
          "name": "update:multi-sort",
          "source": "v-data",
          "value": "boolean",
          "description": "Missing description"
        },
        {
          "name": "update:must-sort",
          "source": "v-data",
          "value": "boolean",
          "description": "Missing description"
        },
        {
          "name": "input",
          "source": "v-data-iterator",
          "value": "any[]",
          "description": "Array of selected items"
        },
        {
          "name": "update:expanded",
          "source": "v-data-iterator",
          "value": "any[]",
          "description": "The `.sync` event for `expanded` prop"
        },
        {
          "name": "item-selected",
          "source": "v-data-iterator",
          "value": "{ item: any, value: boolean }",
          "description": "Event emitted when an item is selected or deselected"
        },
        {
          "name": "item-expanded",
          "source": "v-data-iterator",
          "value": "{ item: any, value: boolean }",
          "description": "Event emitted when an item is expanded or closed"
        },
        {
          "name": "toggle-select-all",
          "source": "v-data-iterator",
          "value": "{ items: any[], value: boolean }",
          "description": "Missing description"
        }
      ],
      "sass": [
        {
          "name": "$data-footer-font-size",
          "default": "map-deep-get($headings, 'caption', 'size') !default;",
          "description": "Missing description"
        },
        {
          "name": "$data-footer-icons-after-btn-margin-start",
          "default": "7px !default;",
          "description": "Missing description"
        },
        {
          "name": "$data-footer-icons-before-btn-margin-end",
          "default": "7px !default;",
          "description": "Missing description"
        },
        {
          "name": "$data-footer-padding",
          "default": "0 8px !default;",
          "description": "Missing description"
        },
        {
          "name": "$data-footer-pagination-margin-end",
          "default": "32px !default;",
          "description": "Missing description"
        },
        {
          "name": "$data-footer-pagination-margin-start",
          "default": "24px !default;",
          "description": "Missing description"
        },
        {
          "name": "$data-footer-select-margin-end",
          "default": "14px !default;",
          "description": "Missing description"
        },
        {
          "name": "$data-footer-select-select-margin-start",
          "default": "34px !default;",
          "description": "Missing description"
        },
        {
          "name": "$data-footer-select-select-margin-y",
          "default": "13px !default;",
          "description": "Missing description"
        },
        {
          "name": "$data-footer-select-selections-comma-font-size",
          "default": "map-deep-get($headings, 'caption', 'size') !default;",
          "description": "Missing description"
        }
      ]
    },
    "v-data-table": {
      "props": [
        {
          "name": "customFilter",
          "type": "function",
          "default": "(value: any, search: string | null, item: any) => boolean",
          "source": "v-data",
          "description": "Missing description"
        },
        {
          "name": "customGroup",
          "source": "v-data",
          "default": "(items: any[], groupBy: string[], groupDesc: boolean[]) => Record<string, any[]>",
          "description": "Missing description"
        },
        {
          "name": "customSort",
          "type": "function",
          "default": "(items: any[], sortBy: string[], sortDesc: boolean[], locale: string, customSorters?: Record<string, compareFn>) => any[]",
          "source": "v-data",
          "description": "Missing description"
        },
        {
          "name": "dark",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "disableFiltering",
          "source": "v-data",
          "description": "Missing description"
        },
        {
          "name": "disableInitialSort",
          "type": "boolean",
          "default": "false",
          "source": "data-iterable",
          "description": "Missing description"
        },
        {
          "name": "disablePagination",
          "source": "v-data",
          "description": "Missing description"
        },
        {
          "name": "disableSort",
          "source": "v-data",
          "description": "Missing description"
        },
        {
          "name": "expand",
          "type": "boolean",
          "default": "false",
          "source": "data-iterable",
          "description": "Missing description"
        },
        {
          "name": "expanded",
          "source": "v-data-iterator",
          "description": "Array of expanded items. Can be used with `.sync` modifier"
        },
        {
          "name": "filter",
          "type": "function",
          "default": "(val, search) => {}",
          "source": "data-iterable",
          "description": "Missing description"
        },
        {
          "name": "footerProps",
          "source": "v-data-iterator",
          "description": "See the `v-data-footer` API for more information"
        },
        {
          "name": "groupBy",
          "source": "v-data",
          "description": "Missing description"
        },
        {
          "name": "groupDesc",
          "source": "v-data",
          "description": "Missing description"
        },
        {
          "name": "headerKey",
          "type": "string",
          "default": "undefined",
          "source": "v-data-table",
          "description": "Missing description"
        },
        {
          "name": "headerText",
          "type": "string",
          "default": "'text'",
          "source": "v-data-table",
          "description": "Missing description"
        },
        {
          "name": "headers",
          "type": "TableHeader[]",
          "default": [],
          "source": "v-data-table",
          "example": {
            "text": "string",
            "value": "string",
            "align?": "'start' | 'center' | 'end'",
            "sortable?": "boolean",
            "filterable?": "boolean",
            "groupable?": "boolean",
            "divider?": "boolean",
            "class?": "string | string[]",
            "width?": "string | number",
            "filter?": "(value: any, search: string, item: any) => boolean",
            "sort?": "(a: any, b: any) => number"
          },
          "description": "An array of objects that each describe a header column. See the example below for a definition of all properties"
        },
        {
          "name": "headersLength",
          "type": "number",
          "default": "undefined",
          "source": "v-data-table",
          "description": "Can be used in combination with `hide-default-header` to specify the number of columns in the table to allow expansion rows and loading bar to function properly"
        },
        {
          "name": "hideActions",
          "type": "boolean",
          "default": "false",
          "source": "data-iterable",
          "description": "Missing description"
        },
        {
          "name": "hideDefaultFooter",
          "source": "v-data-iterator",
          "description": "Hides default footer"
        },
        {
          "name": "hideHeaders",
          "type": "boolean",
          "default": "false",
          "source": "v-data-table",
          "description": "Missing description"
        },
        {
          "name": "itemKey",
          "type": "string",
          "default": "'id'",
          "source": "v-data",
          "description": "Missing description"
        },
        {
          "name": "items",
          "type": "array",
          "default": [],
          "source": "v-data",
          "description": "Missing description"
        },
        {
          "name": "itemsPerPage",
          "source": "v-data",
          "description": "Missing description"
        },
        {
          "name": "light",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "loading",
          "type": [
            "boolean",
            "string"
          ],
          "default": false,
          "source": "v-data-iterator",
          "description": "If `true` and no items are provided, then a loading text will be shown"
        },
        {
          "name": "loadingText",
          "source": "v-data-iterator",
          "description": "Text shown when `loading` is true and no items are provided"
        },
        {
          "name": "locale",
          "source": "v-data",
          "description": "Missing description"
        },
        {
          "name": "multiSort",
          "source": "v-data",
          "description": "Missing description"
        },
        {
          "name": "mustSort",
          "type": "boolean",
          "default": "false",
          "source": "v-data",
          "description": "Missing description"
        },
        {
          "name": "nextIcon",
          "type": "string",
          "default": "'$vuetify.icons.next'",
          "source": "data-iterable",
          "description": "Missing description"
        },
        {
          "name": "noDataText",
          "type": "string",
          "default": "'$vuetify.noDataText'",
          "source": "v-data-iterator",
          "description": "Text shown when no items are provided to the component"
        },
        {
          "name": "noResultsText",
          "type": "string",
          "default": "'$vuetify.dataIterator.noResultsText'",
          "source": "v-data-iterator",
          "description": "Text shown when `search` prop is used and there are no results"
        },
        {
          "name": "options",
          "source": "v-data",
          "type": "DataOptions",
          "example": {
            "page": "number",
            "itemsPerPage": "number",
            "sortBy": "string[]",
            "sortDesc": "boolean[]",
            "groupBy": "string[]",
            "groupDesc": "boolean[]",
            "multiSort": "boolean",
            "mustSort": "boolean"
          },
          "description": "Missing description"
        },
        {
          "name": "page",
          "source": "v-data",
          "description": "Missing description"
        },
        {
          "name": "pagination",
          "type": "object",
          "source": "data-iterable",
          "description": "Missing description"
        },
        {
          "name": "prevIcon",
          "type": "string",
          "default": "'$vuetify.icons.prev'",
          "source": "data-iterable",
          "description": "Missing description"
        },
        {
          "name": "rowsPerPageItems",
          "type": "array",
          "default": [
            5,
            10,
            25,
            {
              "text": "$vuetify.dataIterator.rowsPerPageAll",
              "value": -1
            }
          ],
          "source": "data-iterable",
          "description": "Missing description"
        },
        {
          "name": "rowsPerPageText",
          "type": "string",
          "default": "'$vuetify.dataTable.rowsPerPageText'",
          "source": "data-iterable",
          "description": "Missing description"
        },
        {
          "name": "search",
          "type": "any",
          "default": "undefined",
          "source": "v-data",
          "description": "Missing description"
        },
        {
          "name": "selectAll",
          "type": [
            "boolean",
            "string"
          ],
          "default": "undefined",
          "source": "data-iterable",
          "description": "Missing description"
        },
        {
          "name": "serverItemsLength",
          "source": "v-data",
          "description": "Missing description"
        },
        {
          "name": "singleExpand",
          "source": "v-data-iterator",
          "description": "Changes expansion mode to single expand"
        },
        {
          "name": "singleSelect",
          "source": "v-data-iterator",
          "description": "Changes selection mode to single select"
        },
        {
          "name": "sortBy",
          "source": "v-data",
          "description": "Missing description"
        },
        {
          "name": "sortDesc",
          "source": "v-data",
          "description": "Missing description"
        },
        {
          "name": "sortIcon",
          "type": "string",
          "default": "'$vuetify.icons.sort'",
          "source": "v-data-table",
          "description": "Missing description"
        },
        {
          "name": "totalItems",
          "type": "number",
          "default": "undefined",
          "source": "data-iterable",
          "description": "Missing description"
        },
        {
          "name": "value",
          "type": "array",
          "default": [],
          "source": "v-data-iterator",
          "description": "Used for controlling selected rows"
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
          "name": "body.append",
          "props": {
            "items": "any[]",
            "pagination": {
              "page": "number",
              "itemsPerPage": "number",
              "pageStart": "number",
              "pageStop": "number",
              "pageCount": "number",
              "itemsLength": "number"
            },
            "options": {
              "page": "number",
              "itemsPerPage": "number",
              "sortBy": "string[]",
              "sortDesc": "boolean[]",
              "groupBy": "string[]",
              "groupDesc": "boolean[]",
              "multiSort": "boolean",
              "mustSort": "boolean"
            },
            "groupedItems": "Record<string, any[]>",
            "updateOptions": "(obj: any) => void",
            "sort": "(value: string) => void",
            "group": "(value: string) => void",
            "headers": "TableHeader[]",
            "isMobile": "boolean",
            "isSelected": "(item: any) => boolean",
            "select": "(item: any, value: boolean) => void",
            "isExpanded": "(item: any) => boolean",
            "expand": "(item: any, value: boolean) => void"
          },
          "description": "Missing description"
        },
        {
          "name": "body.prepend",
          "props": {
            "items": "any[]",
            "pagination": {
              "page": "number",
              "itemsPerPage": "number",
              "pageStart": "number",
              "pageStop": "number",
              "pageCount": "number",
              "itemsLength": "number"
            },
            "options": {
              "page": "number",
              "itemsPerPage": "number",
              "sortBy": "string[]",
              "sortDesc": "boolean[]",
              "groupBy": "string[]",
              "groupDesc": "boolean[]",
              "multiSort": "boolean",
              "mustSort": "boolean"
            },
            "groupedItems": "Record<string, any[]>",
            "updateOptions": "(obj: any) => void",
            "sort": "(value: string) => void",
            "group": "(value: string) => void",
            "headers": "TableHeader[]",
            "isMobile": "boolean",
            "isSelected": "(item: any) => boolean",
            "select": "(item: any, value: boolean) => void",
            "isExpanded": "(item: any) => boolean",
            "expand": "(item: any, value: boolean) => void"
          },
          "description": "Missing description"
        },
        {
          "name": "body",
          "props": {
            "items": "any[]",
            "pagination": {
              "page": "number",
              "itemsPerPage": "number",
              "pageStart": "number",
              "pageStop": "number",
              "pageCount": "number",
              "itemsLength": "number"
            },
            "options": {
              "page": "number",
              "itemsPerPage": "number",
              "sortBy": "string[]",
              "sortDesc": "boolean[]",
              "groupBy": "string[]",
              "groupDesc": "boolean[]",
              "multiSort": "boolean",
              "mustSort": "boolean"
            },
            "groupedItems": "Record<string, any[]>",
            "updateOptions": "(obj: any) => void",
            "sort": "(value: string) => void",
            "group": "(value: string) => void",
            "headers": "TableHeader[]",
            "isMobile": "boolean",
            "isSelected": "(item: any) => boolean",
            "select": "(item: any, value: boolean) => void",
            "isExpanded": "(item: any) => boolean",
            "expand": "(item: any, value: boolean) => void"
          },
          "description": "Missing description"
        },
        {
          "name": "footer",
          "props": {
            "props": {
              "options": {
                "page": "number",
                "itemsPerPage": "number",
                "sortBy": "string[]",
                "sortDesc": "boolean[]",
                "groupBy": "string[]",
                "groupDesc": "boolean[]",
                "multiSort": "boolean",
                "mustSort": "boolean"
              },
              "pagination": {
                "page": "number",
                "itemsPerPage": "number",
                "pageStart": "number",
                "pageStop": "number",
                "pageCount": "number",
                "itemsLength": "number"
              },
              "itemsPerPageText": "string"
            },
            "on": "{}",
            "headers": "TableHeader[]",
            "widths": "[]"
          },
          "description": "Missing description"
        },
        {
          "name": "footer.page-text",
          "props": {
            "pageStart": "number",
            "pageStop": "number",
            "itemsLength": "number"
          },
          "description": "Missing description"
        },
        {
          "name": "header",
          "props": {
            "props": {
              "headers": "TableHeader[]",
              "options": {
                "page": "number",
                "itemsPerPage": "number",
                "sortBy": "string[]",
                "sortDesc": "boolean[]",
                "groupBy": "string[]",
                "groupDesc": "boolean[]",
                "multiSort": "boolean",
                "mustSort": "boolean"
              },
              "mobile": "boolean",
              "showGroupBy": "boolean",
              "someItems": "boolean",
              "everyItem": "boolean"
            },
            "on": {
              "sort": "(value: string) => void",
              "group": "(value: string) => void",
              "toggle-select-all": "(value: boolean) => void"
            }
          },
          "description": "Missing description"
        },
        {
          "name": "header.data-table-select",
          "props": {
            "props": {
              "value": "boolean",
              "indeterminate": "boolean"
            },
            "on": {
              "input": "(value: boolean) => void"
            }
          },
          "description": "Missing description"
        },
        {
          "name": "header.<name>",
          "props": {
            "header": "TableHeader"
          },
          "description": "Missing description"
        },
        {
          "name": "top",
          "props": {
            "items": "any[]",
            "pagination": {
              "page": "number",
              "itemsPerPage": "number",
              "pageStart": "number",
              "pageStop": "number",
              "pageCount": "number",
              "itemsLength": "number"
            },
            "options": {
              "page": "number",
              "itemsPerPage": "number",
              "sortBy": "string[]",
              "sortDesc": "boolean[]",
              "groupBy": "string[]",
              "groupDesc": "boolean[]",
              "multiSort": "boolean",
              "mustSort": "boolean"
            },
            "groupedItems": "Record<string, any[]>",
            "updateOptions": "(obj: any) => void",
            "sort": "(value: string) => void",
            "group": "(value: string) => void"
          },
          "description": "Missing description"
        },
        {
          "name": "progress",
          "description": "Missing description"
        },
        {
          "name": "group",
          "props": {
            "group": "string",
            "options": {
              "page": "number",
              "itemsPerPage": "number",
              "sortBy": "string[]",
              "sortDesc": "boolean[]",
              "groupBy": "string[]",
              "groupDesc": "boolean[]",
              "multiSort": "boolean",
              "mustSort": "boolean"
            },
            "items": "any[]",
            "headers": "TableHeader[]"
          },
          "description": "Missing description"
        },
        {
          "name": "group.header",
          "props": {
            "group": "string",
            "groupBy": "string[]",
            "items": "any[]",
            "headers": "TableHeader[]",
            "isOpen": "boolean",
            "toggle": "() => void",
            "remove": "() => void"
          },
          "description": "Missing description"
        },
        {
          "name": "group.summary",
          "props": {
            "group": "string",
            "groupBy": "string[]",
            "items": "any[]",
            "headers": "TableHeader[]",
            "isOpen": "boolean",
            "toggle": "() => void"
          },
          "description": "Missing description"
        },
        {
          "name": "item",
          "props": {
            "expand": "(v: boolean) => void",
            "item": "any",
            "isExpanded": "boolean",
            "isMobile": "boolean",
            "isSelected": "boolean",
            "select": "(v: boolean) => void",
            "headers": "TableHeader[]",
            "index": "number"
          },
          "description": "Missing description"
        },
        {
          "name": "item.data-table-select",
          "props": {
            "expand": "(v: boolean) => void",
            "item": "any",
            "isExpanded": "boolean",
            "isMobile": "boolean",
            "isSelected": "boolean",
            "select": "(v: boolean) => void",
            "headers": "TableHeader[]"
          },
          "description": "Missing description"
        },
        {
          "name": "item.data-table-expand",
          "props": {
            "expand": "(v: boolean) => void",
            "item": "any",
            "isExpanded": "boolean",
            "isMobile": "boolean",
            "isSelected": "boolean",
            "select": "(v: boolean) => void",
            "headers": "TableHeader[]"
          },
          "description": "Missing description"
        },
        {
          "name": "item.<name>",
          "props": {
            "item": "any",
            "header": "TableHeader",
            "value": "any"
          },
          "description": "Missing description"
        },
        {
          "name": "expanded-item",
          "props": {
            "item": "any",
            "headers": "TableHeader[]"
          },
          "description": "Missing description"
        },
        {
          "name": "loading",
          "source": "data-iterator",
          "description": "Missing description"
        },
        {
          "name": "no-data",
          "source": "data-iterator",
          "description": "Missing description"
        },
        {
          "name": "no-results",
          "source": "data-iterator",
          "description": "Missing description"
        }
      ],
      "events": [
        {
          "name": "click:row",
          "source": "v-data-table",
          "value": "any, {\n  expand: (value: boolean) => void,\n  headers: TableHeader[],\n  isExpanded: boolean,\n  isMobile: boolean,\n  isSelected: boolean,\n  item: any,\n  select: (value: boolean) => void\n}",
          "description": "Emits when a table row is clicked. This event provides 2 arguements: the first is the item data that was clicked and the second is the other related data provided by the `item` slot. **NOTE:** will not emit when table rows are defined through a slot such as `item` or `body`."
        },
        {
          "name": "contextmenu:row",
          "source": "v-data-table",
          "value": "MouseEvent, {\n  expand: (value: boolean) => void,\n  headers: TableHeader[],\n  isExpanded: boolean,\n  isMobile: boolean,\n  isSelected: boolean,\n  item: any,\n  select: (value: boolean) => void\n}",
          "description": "Emits when a table row is right-clicked. The item for the row is included. **NOTE:** will not emit when table rows are defined through a slot such as `item` or `body`."
        },
        {
          "name": "dblclick:row",
          "source": "v-data-table",
          "value": "MouseEvent, {\n  expand: (value: boolean) => void,\n  headers: TableHeader[],\n  isExpanded: boolean,\n  isMobile: boolean,\n  isSelected: boolean,\n  item: any,\n  select: (value: boolean) => void\n}",
          "description": "Emits when a table row is double-clicked. The item for the row is included. **NOTE:** will not emit when table rows are defined through a slot such as `item` or `body`."
        },
        {
          "name": "current-items",
          "source": "v-data",
          "value": "any[]",
          "description": "Missing description"
        },
        {
          "name": "page-count",
          "source": "v-data",
          "value": "number",
          "description": "Missing description"
        },
        {
          "name": "pagination",
          "source": "v-data",
          "value": {
            "page": "number",
            "itemsPerPage": "number",
            "pageStart": "number",
            "pageStop": "number",
            "pageCount": "number",
            "itemsLength": "number"
          },
          "description": "Missing description"
        },
        {
          "name": "update:options",
          "source": "v-data",
          "value": {
            "page": "number",
            "itemsPerPage": "number",
            "sortBy": "string[]",
            "sortDesc": "boolean[]",
            "groupBy": "string[]",
            "groupDesc": "boolean[]",
            "multiSort": "boolean",
            "mustSort": "boolean"
          },
          "description": "Missing description"
        },
        {
          "name": "update:page",
          "source": "v-data",
          "value": "number",
          "description": "Missing description"
        },
        {
          "name": "update:items-per-page",
          "source": "v-data",
          "value": "number",
          "description": "Missing description"
        },
        {
          "name": "update:sort-by",
          "source": "v-data",
          "value": "string | string[]",
          "description": "Missing description"
        },
        {
          "name": "update:sort-desc",
          "source": "v-data",
          "value": "boolean | boolean[]",
          "description": "Missing description"
        },
        {
          "name": "update:group-by",
          "source": "v-data",
          "value": "string | string[]",
          "description": "Missing description"
        },
        {
          "name": "update:group-desc",
          "source": "v-data",
          "value": "boolean | boolean[]",
          "description": "Missing description"
        },
        {
          "name": "update:multi-sort",
          "source": "v-data",
          "value": "boolean",
          "description": "Missing description"
        },
        {
          "name": "update:must-sort",
          "source": "v-data",
          "value": "boolean",
          "description": "Missing description"
        },
        {
          "name": "input",
          "source": "v-data-iterator",
          "value": "any[]",
          "description": "Array of selected items"
        },
        {
          "name": "update:expanded",
          "source": "v-data-iterator",
          "value": "any[]",
          "description": "The `.sync` event for `expanded` prop"
        },
        {
          "name": "item-selected",
          "source": "v-data-iterator",
          "value": "{ item: any, value: boolean }",
          "description": "Event emitted when an item is selected or deselected"
        },
        {
          "name": "item-expanded",
          "source": "v-data-iterator",
          "value": "{ item: any, value: boolean }",
          "description": "Event emitted when an item is expanded or closed"
        },
        {
          "name": "toggle-select-all",
          "source": "v-data-iterator",
          "value": "{ items: any[], value: boolean }",
          "description": "Missing description"
        }
      ],
      "sass": [
        {
          "name": "$data-table-border-radius",
          "default": "$border-radius-root !default;",
          "description": "Missing description"
        },
        {
          "name": "$data-table-dense-header-height",
          "default": "32px !default;",
          "description": "Missing description"
        },
        {
          "name": "$data-table-dense-row-height",
          "default": "$data-table-dense-header-height !default;",
          "description": "Missing description"
        },
        {
          "name": "$data-table-expanded-content-box-shadow",
          "default": "inset 0px 4px 8px -5px rgba(50, 50, 50, 0.75), inset 0px -4px 8px -5px rgba(50, 50, 50, 0.75) !default;",
          "description": "Missing description"
        },
        {
          "name": "$data-table-header-mobile-select-chip-height",
          "default": "24px !default;",
          "description": "Missing description"
        },
        {
          "name": "$data-table-header-mobile-select-margin-bottom",
          "default": "8px !default;",
          "description": "Missing description"
        },
        {
          "name": "$data-table-header-mobile-select-max-width",
          "default": "56px !default;",
          "description": "Missing description"
        },
        {
          "name": "$data-table-header-sort-badge-height",
          "default": "18px !default;",
          "description": "Missing description"
        },
        {
          "name": "$data-table-header-sort-badge-min-height",
          "default": "18px !default;",
          "description": "Missing description"
        },
        {
          "name": "$data-table-header-sort-badge-min-width",
          "default": "18px !default;",
          "description": "Missing description"
        },
        {
          "name": "$data-table-header-sort-badge-width",
          "default": "18px !default;",
          "description": "Missing description"
        },
        {
          "name": "$data-table-mobile-row-header-font-weight",
          "default": "600 !default;",
          "description": "Missing description"
        },
        {
          "name": "$data-table-mobile-row-min-height",
          "default": "48px !default;",
          "description": "Missing description"
        },
        {
          "name": "$data-table-progress-border-radius",
          "default": "$data-table-border-radius $data-table-border-radius 0 0 !default;",
          "description": "Missing description"
        },
        {
          "name": "$data-table-regular-header-height",
          "default": "48px !default;",
          "description": "Missing description"
        },
        {
          "name": "$data-table-regular-row-height",
          "default": "48px !default;",
          "description": "Missing description"
        },
        {
          "name": "$data-table-row-group-children-td-height",
          "default": "35px !default;",
          "description": "Missing description"
        },
        {
          "name": "$data-table-scroll-bar-width",
          "default": "17px !default;",
          "description": "Missing description"
        },
        {
          "name": "$edit-dialog-content-padding",
          "default": "0 16px !default;",
          "description": "Missing description"
        },
        {
          "name": "$edit-dialog-actions-padding",
          "default": "8px !default;",
          "description": "Missing description"
        },
        {
          "name": "$data-table-regular-header-font-size",
          "default": "map-deep-get($headings, 'caption', 'size') !default;",
          "description": "Missing description"
        },
        {
          "name": "$data-table-regular-row-font-size",
          "default": "map-deep-get($headings, 'subtitle-2', 'size') !default;",
          "description": "Missing description"
        }
      ]
    },
    "v-edit-dialog": {
      "props": [
        {
          "name": "cancelText",
          "type": "any",
          "default": "Cancel",
          "source": "v-edit-dialog",
          "description": "Sets the default text for the cancel button when using the **large** prop"
        },
        {
          "name": "dark",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "large",
          "type": "boolean",
          "default": "false",
          "source": "v-edit-dialog",
          "description": "Attaches a submit and cancel button to the dialog"
        },
        {
          "name": "lazy",
          "type": "boolean",
          "default": "false",
          "source": "v-edit-dialog",
          "description": "Missing description"
        },
        {
          "name": "light",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "persistent",
          "type": "boolean",
          "default": "false",
          "source": "v-edit-dialog",
          "description": "Missing description"
        },
        {
          "name": "returnValue",
          "type": "any",
          "default": "undefined",
          "source": "returnable",
          "description": "Missing description"
        },
        {
          "name": "saveText",
          "type": "any",
          "default": "Save",
          "source": "v-edit-dialog",
          "description": "Sets the default text for the save button when using the **large** prop"
        },
        {
          "name": "transition",
          "type": "string",
          "default": "'slide-x-reverse-transition'",
          "source": "v-edit-dialog",
          "description": "Mixins.Transitionable.props.transition"
        }
      ],
      "mixins": [
        "returnable",
        "themeable"
      ],
      "slots": [
        {
          "name": "input",
          "description": "Missing description"
        },
        {
          "name": "default",
          "description": "Missing description"
        }
      ],
      "events": [
        {
          "name": "cancel",
          "value": "void",
          "description": "Missing description"
        },
        {
          "name": "close",
          "value": "void",
          "description": "Missing description"
        },
        {
          "name": "open",
          "value": "void",
          "description": "Missing description"
        },
        {
          "name": "save",
          "value": "void",
          "description": "Missing description"
        }
      ],
      "sass": []
    },
    "v-table-overflow": {
      "props": [],
      "mixins": [],
      "sass": []
    },
    "v-date-picker": {
      "props": [
        {
          "name": "allowedDates",
          "type": "function",
          "default": "null",
          "source": "v-date-picker",
          "description": "Restricts which dates can be selected"
        },
        {
          "name": "color",
          "type": "string",
          "default": "undefined",
          "source": "colorable",
          "description": "Missing description"
        },
        {
          "name": "dark",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "dayFormat",
          "type": "function",
          "default": "null",
          "source": "v-date-picker",
          "description": "Allows you to customize the format of the day string that appears in the date table. Called with date (ISO 8601 **date** string) arguments."
        },
        {
          "name": "disabled",
          "type": "boolean",
          "default": "false",
          "source": "v-date-picker",
          "description": "Disables interaction with the picker"
        },
        {
          "name": "eventColor",
          "type": [
            "array",
            "function",
            "object",
            "string"
          ],
          "default": "warning",
          "source": "v-date-picker",
          "description": "Sets the color for event dot. It can be string (all events will have the same color) or `object` where attribute is the event date and value is boolean/color/array of colors for specified date or `function` taking date as a parameter and returning boolean/color/array of colors for that date"
        },
        {
          "name": "events",
          "type": [
            "array",
            "function",
            "object"
          ],
          "default": null,
          "source": "v-date-picker",
          "description": "Array of dates or object defining events or colors or function returning boolean/color/array of colors"
        },
        {
          "name": "firstDayOfWeek",
          "type": [
            "string",
            "number"
          ],
          "default": 0,
          "source": "v-date-picker",
          "description": "Sets the first day of the week, starting with 0 for Sunday."
        },
        {
          "name": "fullWidth",
          "type": "boolean",
          "default": "false",
          "source": "picker",
          "description": "Missing description"
        },
        {
          "name": "headerColor",
          "type": "string",
          "default": "undefined",
          "source": "picker",
          "description": "Missing description"
        },
        {
          "name": "headerDateFormat",
          "type": "function",
          "default": "null",
          "source": "v-date-picker",
          "description": "Allows you to customize the format of the month string that appears in the header of the calendar. Called with date (ISO 8601 **date** string) arguments."
        },
        {
          "name": "landscape",
          "type": "boolean",
          "default": "false",
          "source": "picker",
          "description": "Missing description"
        },
        {
          "name": "light",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "locale",
          "type": "string",
          "default": "'en-us'",
          "source": "v-date-picker",
          "description": "Sets the locale. Accepts a string with a BCP 47 language tag."
        },
        {
          "name": "max",
          "type": "string",
          "default": "undefined",
          "source": "v-date-picker",
          "description": "Maximum allowed date/month (ISO 8601 format)"
        },
        {
          "name": "min",
          "type": "string",
          "default": "undefined",
          "source": "v-date-picker",
          "description": "Minimum allowed date/month (ISO 8601 format)"
        },
        {
          "name": "monthFormat",
          "type": "function",
          "default": "null",
          "source": "v-date-picker",
          "description": "Formatting function used for displaying months in the months table. Called with date (ISO 8601 **date** string) arguments."
        },
        {
          "name": "multiple",
          "type": "boolean",
          "default": "false",
          "source": "v-date-picker",
          "description": "Allow the selection of multiple dates"
        },
        {
          "name": "nextIcon",
          "type": "string",
          "default": "'$vuetify.icons.next'",
          "source": "v-date-picker",
          "description": "Sets the icon for next month/year button"
        },
        {
          "name": "noTitle",
          "type": "boolean",
          "default": "false",
          "source": "picker",
          "description": "Missing description"
        },
        {
          "name": "pickerDate",
          "type": "string",
          "default": "undefined",
          "source": "v-date-picker",
          "description": "Displayed year/month"
        },
        {
          "name": "prevIcon",
          "type": "string",
          "default": "'$vuetify.icons.prev'",
          "source": "v-date-picker",
          "description": "Sets the icon for previous month/year button"
        },
        {
          "name": "reactive",
          "type": "boolean",
          "default": "false",
          "source": "v-date-picker",
          "description": "Updates the picker model when changing months/years automatically"
        },
        {
          "name": "readonly",
          "type": "boolean",
          "default": "false",
          "source": "v-date-picker",
          "description": "Makes the picker readonly (doesn't allow to select new date)"
        },
        {
          "name": "scrollable",
          "type": "boolean",
          "default": "false",
          "source": "v-date-picker",
          "description": "Allows changing displayed month with mouse scroll"
        },
        {
          "name": "showCurrent",
          "type": [
            "boolean",
            "string"
          ],
          "default": true,
          "source": "v-date-picker",
          "description": "Toggles visibility of the current date/month outline or shows the provided date/month as a current"
        },
        {
          "name": "showWeek",
          "type": "boolean",
          "default": "false",
          "source": "v-date-picker",
          "description": "Toggles visibility of the week numbers in the body of the calendar"
        },
        {
          "name": "titleDateFormat",
          "type": "function",
          "default": "null",
          "source": "v-date-picker",
          "description": "Allows you to customize the format of the date string that appears in the title of the date picker. Called with date (ISO 8601 **date** string) arguments."
        },
        {
          "name": "type",
          "type": "string",
          "default": "'date'",
          "source": "v-date-picker",
          "description": "Determines the type of the picker - `date` for date picker, `month` for month picker"
        },
        {
          "name": "value",
          "type": [
            "array",
            "string"
          ],
          "default": "undefined",
          "source": "v-date-picker",
          "description": "Date picker model (ISO 8601 format, YYYY-mm-dd or YYYY-mm)"
        },
        {
          "name": "weekdayFormat",
          "type": "function",
          "default": "null",
          "source": "v-date-picker",
          "description": "Allows you to customize the format of the weekday string that appears in the body of the calendar. Called with date (ISO 8601 **date** string) arguments."
        },
        {
          "name": "width",
          "type": [
            "number",
            "string"
          ],
          "default": 290,
          "source": "picker",
          "description": "Missing description"
        },
        {
          "name": "yearFormat",
          "type": "function",
          "default": "null",
          "source": "v-date-picker",
          "description": "Allows you to customize the format of the year string that appears in the header of the calendar. Called with date (ISO 8601 **date** string) arguments."
        },
        {
          "name": "yearIcon",
          "type": "string",
          "default": "undefined",
          "source": "v-date-picker",
          "description": "Sets the icon in the year selection button"
        }
      ],
      "mixins": [
        "picker",
        "colorable",
        "themeable"
      ],
      "events": [
        {
          "name": "input",
          "value": "string",
          "description": "Missing description"
        },
        {
          "name": "change",
          "value": "string",
          "description": "Missing description"
        },
        {
          "name": "update:picker-date",
          "value": "string",
          "description": "Missing description"
        },
        {
          "name": "<domevent>:date",
          "value": "string",
          "description": "Missing description"
        },
        {
          "name": "<domevent>:month",
          "value": "string",
          "description": "Missing description"
        },
        {
          "name": "<domevent>:year",
          "value": "number",
          "description": "Missing description"
        }
      ],
      "slots": [
        {
          "name": "default",
          "description": "Missing description"
        }
      ],
      "sass": [
        {
          "name": "$date-picker-years-font-size",
          "default": "16px !default;",
          "description": "Missing description"
        },
        {
          "name": "$date-picker-years-font-weight",
          "default": "400 !default;",
          "description": "Missing description"
        },
        {
          "name": "$date-picker-years-portrait-height",
          "default": "290px !default;",
          "description": "Missing description"
        },
        {
          "name": "$date-picker-years-landscape-height",
          "default": "290px !default;",
          "description": "Missing description"
        },
        {
          "name": "$date-picker-years-item-padding",
          "default": "8px 0 !default;",
          "description": "Missing description"
        },
        {
          "name": "$date-picker-years-active-font-size",
          "default": "26px !default;",
          "description": "Missing description"
        },
        {
          "name": "$date-picker-years-active-font-weight",
          "default": "500 !default;",
          "description": "Missing description"
        },
        {
          "name": "$date-picker-years-active-padding",
          "default": "10px 0 !default;",
          "description": "Missing description"
        },
        {
          "name": "$date-picker-years-item-hover-background",
          "default": "rgba(0, 0, 0, 0.12) !default;",
          "description": "Missing description"
        },
        {
          "name": "$date-picker-years-item-align",
          "default": "center !default;",
          "description": "Missing description"
        },
        {
          "name": "$date-picker-title-year-font-size",
          "default": "14px !default;",
          "description": "Missing description"
        },
        {
          "name": "$date-picker-title-year-font-weight",
          "default": "500 !default;",
          "description": "Missing description"
        },
        {
          "name": "$date-picker-title-year-bottom-margin",
          "default": "8px !default;",
          "description": "Missing description"
        },
        {
          "name": "$date-picker-title-date-font-size",
          "default": "34px !default;",
          "description": "Missing description"
        },
        {
          "name": "$date-picker-title-date-font-weight",
          "default": "500 !default;",
          "description": "Missing description"
        },
        {
          "name": "$date-picker-header-padding",
          "default": "4px 16px !default;",
          "description": "Missing description"
        },
        {
          "name": "$date-picker-header-value-transition",
          "default": "$primary-transition !default;",
          "description": "Missing description"
        },
        {
          "name": "$date-picker-header-button-font-weight",
          "default": "bold !default;",
          "description": "Missing description"
        },
        {
          "name": "$date-picker-header-button-padding",
          "default": "0.5rem !default;",
          "description": "Missing description"
        },
        {
          "name": "$date-picker-header-button-transition",
          "default": "$primary-transition !default;",
          "description": "Missing description"
        },
        {
          "name": "$date-picker-table-padding",
          "default": "0 12px !default;",
          "description": "Missing description"
        },
        {
          "name": "$date-picker-table-height",
          "default": "242px !default;",
          "description": "Missing description"
        },
        {
          "name": "$date-picker-table-font-size",
          "default": "12px !default;",
          "description": "Missing description"
        },
        {
          "name": "$date-picker-table-date-button-width",
          "default": "32px !default;",
          "description": "Missing description"
        },
        {
          "name": "$date-picker-table-date-button-height",
          "default": "32px !default;",
          "description": "Missing description"
        },
        {
          "name": "$date-picker-table-active-date-color",
          "default": "map-get($shades, 'white') !default;",
          "description": "Missing description"
        },
        {
          "name": "$date-picker-table-month-height",
          "default": "56px !default;",
          "description": "Missing description"
        },
        {
          "name": "$date-picker-table-month-min-width",
          "default": "40px !default;",
          "description": "Missing description"
        },
        {
          "name": "$date-picker-table-month-max-width",
          "default": "140px !default;",
          "description": "Missing description"
        },
        {
          "name": "$date-picker-table-date-padding",
          "default": "8px 0 !default;",
          "description": "Missing description"
        },
        {
          "name": "$date-picker-table-date-font-weight",
          "default": "600 !default;",
          "description": "Missing description"
        },
        {
          "name": "$date-picker-table-date-width",
          "default": "45px !default;",
          "description": "Missing description"
        },
        {
          "name": "$date-picker-event-size",
          "default": "8px !default;",
          "description": "Missing description"
        },
        {
          "name": "$date-picker-event-margin",
          "default": "0 1px !default;",
          "description": "Missing description"
        },
        {
          "name": "$date-picker-event-border-radius",
          "default": "50% !default;",
          "description": "Missing description"
        },
        {
          "name": "$date-picker-event-month-bottom",
          "default": "6px !default;",
          "description": "Missing description"
        },
        {
          "name": "$date-picker-event-date-bottom",
          "default": "8px !default;",
          "description": "Missing description"
        }
      ]
    },
    "v-date-picker-title": {
      "props": [
        {
          "name": "color",
          "type": "string",
          "default": "undefined",
          "source": "colorable",
          "description": "Missing description"
        },
        {
          "name": "date",
          "type": "string",
          "default": "undefined",
          "source": "v-date-picker-title",
          "description": "Missing description"
        },
        {
          "name": "disabled",
          "type": "boolean",
          "default": "false",
          "source": "v-date-picker-title",
          "description": "Missing description"
        },
        {
          "name": "readonly",
          "type": "boolean",
          "default": "false",
          "source": "v-date-picker-title",
          "description": "Missing description"
        },
        {
          "name": "selectingYear",
          "type": "boolean",
          "default": "false",
          "source": "v-date-picker-title",
          "description": "Missing description"
        },
        {
          "name": "value",
          "type": "string",
          "default": "undefined",
          "source": "v-date-picker-title",
          "description": "Missing description"
        },
        {
          "name": "year",
          "type": [
            "number",
            "string"
          ],
          "default": "undefined",
          "source": "v-date-picker-title",
          "description": "Missing description"
        },
        {
          "name": "yearIcon",
          "type": "string",
          "default": "undefined",
          "source": "v-date-picker-title",
          "description": "Missing description"
        }
      ],
      "mixins": [
        "colorable",
        "colorable"
      ],
      "sass": []
    },
    "v-date-picker-header": {
      "props": [
        {
          "name": "color",
          "type": "string",
          "default": "undefined",
          "source": "colorable",
          "description": "Missing description"
        },
        {
          "name": "dark",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "disabled",
          "type": "boolean",
          "default": "false",
          "source": "v-date-picker-header",
          "description": "Missing description"
        },
        {
          "name": "format",
          "type": "function",
          "default": "null",
          "source": "v-date-picker-header",
          "description": "Missing description"
        },
        {
          "name": "light",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "locale",
          "type": "string",
          "default": "'en-us'",
          "source": "v-date-picker-header",
          "description": "Missing description"
        },
        {
          "name": "max",
          "type": "string",
          "default": "undefined",
          "source": "v-date-picker-header",
          "description": "Missing description"
        },
        {
          "name": "min",
          "type": "string",
          "default": "undefined",
          "source": "v-date-picker-header",
          "description": "Missing description"
        },
        {
          "name": "nextIcon",
          "type": "string",
          "default": "'$vuetify.icons.next'",
          "source": "v-date-picker-header",
          "description": "Missing description"
        },
        {
          "name": "prevIcon",
          "type": "string",
          "default": "'$vuetify.icons.prev'",
          "source": "v-date-picker-header",
          "description": "Missing description"
        },
        {
          "name": "readonly",
          "type": "boolean",
          "default": "false",
          "source": "v-date-picker-header",
          "description": "Missing description"
        },
        {
          "name": "value",
          "type": [
            "number",
            "string"
          ],
          "default": "undefined",
          "source": "v-date-picker-header",
          "description": "Missing description"
        }
      ],
      "mixins": [
        "colorable",
        "themeable"
      ],
      "sass": []
    },
    "v-date-picker-date-table": {
      "props": [
        {
          "name": "allowedDates",
          "type": "function",
          "default": "null",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "color",
          "type": "string",
          "default": "undefined",
          "source": "colorable",
          "description": "Missing description"
        },
        {
          "name": "current",
          "type": "string",
          "default": "undefined",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "dark",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "disabled",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "eventColor",
          "type": [
            "array",
            "function",
            "object",
            "string"
          ],
          "default": "warning",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "events",
          "type": [
            "array",
            "function",
            "object"
          ],
          "default": null,
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "firstDayOfWeek",
          "type": [
            "string",
            "number"
          ],
          "default": 0,
          "source": "v-date-picker-date-table",
          "description": "Missing description"
        },
        {
          "name": "format",
          "type": "function",
          "default": "null",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "light",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "locale",
          "type": "string",
          "default": "'en-us'",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "max",
          "type": "string",
          "default": "undefined",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "min",
          "type": "string",
          "default": "undefined",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "readonly",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "scrollable",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "showWeek",
          "type": "boolean",
          "default": "false",
          "source": "v-date-picker-date-table",
          "description": "Missing description"
        },
        {
          "name": "tableDate",
          "type": "string",
          "default": "undefined",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "value",
          "type": [
            "string",
            "array"
          ],
          "default": "undefined",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "weekdayFormat",
          "type": "function",
          "default": "null",
          "source": "v-date-picker-date-table",
          "description": "Missing description"
        }
      ],
      "mixins": [
        "themeable",
        "colorable",
        "themeable"
      ],
      "sass": []
    },
    "v-date-picker-month-table": {
      "props": [
        {
          "name": "allowedDates",
          "type": "function",
          "default": "null",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "color",
          "type": "string",
          "default": "undefined",
          "source": "colorable",
          "description": "Missing description"
        },
        {
          "name": "current",
          "type": "string",
          "default": "undefined",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "dark",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "disabled",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "eventColor",
          "type": [
            "array",
            "function",
            "object",
            "string"
          ],
          "default": "warning",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "events",
          "type": [
            "array",
            "function",
            "object"
          ],
          "default": null,
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "format",
          "type": "function",
          "default": "null",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "light",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "locale",
          "type": "string",
          "default": "'en-us'",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "max",
          "type": "string",
          "default": "undefined",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "min",
          "type": "string",
          "default": "undefined",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "readonly",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "scrollable",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "tableDate",
          "type": "string",
          "default": "undefined",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "value",
          "type": [
            "string",
            "array"
          ],
          "default": "undefined",
          "source": "themeable",
          "description": "Missing description"
        }
      ],
      "mixins": [
        "themeable",
        "colorable",
        "themeable"
      ],
      "sass": []
    },
    "v-date-picker-years": {
      "props": [
        {
          "name": "color",
          "type": "string",
          "default": "undefined",
          "source": "colorable",
          "description": "Missing description"
        },
        {
          "name": "format",
          "type": "function",
          "default": "null",
          "source": "v-date-picker-years",
          "description": "Missing description"
        },
        {
          "name": "locale",
          "type": "string",
          "default": "'en-us'",
          "source": "v-date-picker-years",
          "description": "Missing description"
        },
        {
          "name": "max",
          "type": [
            "number",
            "string"
          ],
          "default": "undefined",
          "source": "v-date-picker-years",
          "description": "Missing description"
        },
        {
          "name": "min",
          "type": [
            "number",
            "string"
          ],
          "default": "undefined",
          "source": "v-date-picker-years",
          "description": "Missing description"
        },
        {
          "name": "readonly",
          "type": "boolean",
          "default": "false",
          "source": "v-date-picker-years",
          "description": "Missing description"
        },
        {
          "name": "value",
          "type": [
            "number",
            "string"
          ],
          "default": "undefined",
          "source": "v-date-picker-years",
          "description": "Missing description"
        }
      ],
      "mixins": [
        "colorable"
      ],
      "sass": []
    },
    "v-dialog": {
      "props": [
        {
          "name": "attach",
          "type": "any",
          "default": false,
          "source": "detachable",
          "description": "Missing description"
        },
        {
          "name": "contentClass",
          "type": "any",
          "default": "undefined",
          "source": "detachable",
          "description": "Missing description"
        },
        {
          "name": "dark",
          "type": "boolean",
          "default": "false",
          "source": "v-dialog",
          "description": "Mixins.Themeable.props.dark"
        },
        {
          "name": "disabled",
          "type": "boolean",
          "default": "false",
          "source": "v-dialog",
          "description": "Missing description"
        },
        {
          "name": "fullWidth",
          "type": "boolean",
          "default": "false",
          "source": "v-dialog",
          "description": "Forces the dialog to expand 100% of available width."
        },
        {
          "name": "fullscreen",
          "type": "boolean",
          "default": "false",
          "source": "v-dialog",
          "description": "Changes layout for fullscreen display."
        },
        {
          "name": "hideOverlay",
          "type": "boolean",
          "default": "false",
          "source": "overlayable",
          "description": "Missing description"
        },
        {
          "name": "lazy",
          "type": "boolean",
          "default": "false",
          "source": "bootable",
          "description": "Missing description"
        },
        {
          "name": "light",
          "type": "boolean",
          "default": "false",
          "source": "v-dialog",
          "description": "Mixins.Themeable.props.light"
        },
        {
          "name": "maxWidth",
          "type": [
            "string",
            "number"
          ],
          "default": "none",
          "source": "v-dialog",
          "description": "Mixins.Measurable.props.maxWidth"
        },
        {
          "name": "noClickAnimation",
          "type": "boolean",
          "default": "false",
          "source": "v-dialog",
          "description": "Disables the bounce effect when clicking outside of a `v-dialog`'s content when using the **persistent** prop."
        },
        {
          "name": "origin",
          "type": "string",
          "default": "'center center'",
          "source": "v-dialog",
          "description": "Mixins.Transitionable.props.origin"
        },
        {
          "name": "persistent",
          "type": "boolean",
          "default": "false",
          "source": "v-dialog",
          "description": "Clicking outside of the element will not deactivate it."
        },
        {
          "name": "returnValue",
          "type": "any",
          "default": "undefined",
          "source": "returnable",
          "description": "Missing description"
        },
        {
          "name": "scrollable",
          "type": "boolean",
          "default": "false",
          "source": "v-dialog",
          "description": "When set to true, expects a `v-card` and a `v-card-text` component with a designated height. For more information, check out the [scrollable example](/components/dialogs#scrollable)."
        },
        {
          "name": "transition",
          "type": [
            "string",
            "boolean"
          ],
          "default": "dialog-transition",
          "source": "v-dialog",
          "description": "Mixins.Transitionable.props.transition"
        },
        {
          "name": "value",
          "type": "any",
          "default": "undefined",
          "source": "toggleable",
          "description": "Missing description"
        },
        {
          "name": "width",
          "type": [
            "string",
            "number"
          ],
          "default": "auto",
          "source": "v-dialog",
          "description": "Mixins.Measurable.props.width"
        }
      ],
      "mixins": [
        "dependent",
        "detachable",
        "bootable",
        "overlayable",
        "returnable",
        "stackable",
        "toggleable"
      ],
      "slots": [
        {
          "name": "activator",
          "props": {
            "on": "{ [eventName]: eventHandler }",
            "value": "boolean"
          },
          "description": "Missing description"
        },
        {
          "name": "default",
          "description": "Missing description"
        }
      ],
      "events": [
        {
          "name": "click:outside",
          "value": "MouseEvent",
          "description": "Missing description"
        },
        {
          "name": "input",
          "value": "Boolean",
          "description": "Missing description"
        },
        {
          "name": "keydown",
          "value": "KeyboardEvent",
          "description": "Missing description"
        }
      ],
      "sass": [
        {
          "name": "$dialog-border-radius",
          "default": "$border-radius-root !default;",
          "description": "Missing description"
        },
        {
          "name": "$dialog-card-subtitle-padding",
          "default": "0 24px 20px !default;",
          "description": "Missing description"
        },
        {
          "name": "$dialog-card-text-padding",
          "default": "0 24px 20px !default;",
          "description": "Missing description"
        },
        {
          "name": "$dialog-card-title-font-size",
          "default": "map-deep-get($headings, 'h6', 'size') !default;",
          "description": "Missing description"
        },
        {
          "name": "$dialog-card-title-font-weight",
          "default": "map-deep-get($headings, 'h6', 'weight') !default;",
          "description": "Missing description"
        },
        {
          "name": "$dialog-card-title-letter-spacing",
          "default": "map-deep-get($headings, 'h6', 'letter-spacing') !default;",
          "description": "Missing description"
        },
        {
          "name": "$dialog-card-title-padding",
          "default": "16px 24px 10px !default;",
          "description": "Missing description"
        },
        {
          "name": "$dialog-elevation",
          "default": "24 !default;",
          "description": "Missing description"
        },
        {
          "name": "$dialog-margin",
          "default": "24px !default;",
          "description": "Missing description"
        },
        {
          "name": "$dialog-max-height",
          "default": "90% !default;",
          "description": "Missing description"
        }
      ]
    },
    "v-divider": {
      "props": [
        {
          "name": "dark",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "inset",
          "type": "boolean",
          "default": "false",
          "source": "v-divider",
          "description": "Adds indentation (72px) for **normal** dividers, reduces max height for **vertical**."
        },
        {
          "name": "light",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "vertical",
          "type": "boolean",
          "default": "false",
          "source": "v-divider",
          "description": "Displays dividers vertically"
        }
      ],
      "mixins": [],
      "sass": [
        {
          "name": "$divider-inset-margin",
          "default": "72px !default;",
          "description": "Missing description"
        },
        {
          "name": "$divider-inset-margin-top",
          "default": "8px !default;",
          "description": "Missing description"
        },
        {
          "name": "$divider-inset-max-height",
          "default": "calc(100% - 16px) !default;",
          "description": "Missing description"
        }
      ]
    },
    "v-expansion-panel": {
      "props": [
        {
          "name": "dark",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "disabled",
          "type": "boolean",
          "default": "false",
          "source": "v-expansion-panel",
          "description": "Disables the expansion-panel content"
        },
        {
          "name": "expand",
          "type": "boolean",
          "default": "false",
          "source": "v-expansion-panel",
          "description": "Missing description"
        },
        {
          "name": "focusable",
          "type": "boolean",
          "default": "false",
          "source": "v-expansion-panel",
          "description": "Missing description"
        },
        {
          "name": "inset",
          "type": "boolean",
          "default": "false",
          "source": "v-expansion-panel",
          "description": "Missing description"
        },
        {
          "name": "light",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "popout",
          "type": "boolean",
          "default": "false",
          "source": "v-expansion-panel",
          "description": "Missing description"
        },
        {
          "name": "readonly",
          "type": "boolean",
          "default": "false",
          "source": "v-expansion-panel",
          "description": "Makes the expansion-panel content read only."
        },
        {
          "name": "value",
          "type": [
            "number",
            "array"
          ],
          "default": null,
          "source": "v-expansion-panel",
          "description": "Controls the opened/closed state of content"
        }
      ],
      "mixins": [
        "themeable",
        "registrable-provide"
      ],
      "events": [
        {
          "name": "change",
          "value": "void",
          "description": "Missing description"
        },
        {
          "name": "click",
          "value": "MouseEvent",
          "description": "Missing description"
        }
      ],
      "slots": [
        {
          "name": "default",
          "description": "Missing description"
        }
      ],
      "sass": [
        {
          "name": "$expansion-panel-border-radius",
          "default": "$border-radius-root !default;",
          "description": "Missing description"
        },
        {
          "name": "$expansion-panel-active-margin",
          "default": "16px !default;",
          "description": "Missing description"
        },
        {
          "name": "$expansion-panel-header-font-size",
          "default": "0.9375rem !default;",
          "description": "Missing description"
        },
        {
          "name": "$expansion-panel-header-min-height",
          "default": "48px !default;",
          "description": "Missing description"
        },
        {
          "name": "$expansion-panel-active-header-min-height",
          "default": "64px !default;",
          "description": "Missing description"
        },
        {
          "name": "$expansion-panel-header-padding",
          "default": "16px 24px !default;",
          "description": "Missing description"
        },
        {
          "name": "$expansion-panel-content-padding",
          "default": "0 24px 16px !default;",
          "description": "Missing description"
        },
        {
          "name": "$expansion-panel-popout-max-width",
          "default": "calc(100% - #{$expansion-panel-active-margin * 2}) !default;",
          "description": "Missing description"
        },
        {
          "name": "$expansion-panel-popout-active-max-width",
          "default": "calc(100% + #{$expansion-panel-active-margin}) !default;",
          "description": "Missing description"
        },
        {
          "name": "$expansion-panel-inset-max-width",
          "default": "100% !default;",
          "description": "Missing description"
        },
        {
          "name": "$expansion-panel-inset-active-max-width",
          "default": "calc(100% - #{$expansion-panel-active-margin * 2}) !default;",
          "description": "Missing description"
        }
      ]
    },
    "v-expansion-panel-content": {
      "props": [
        {
          "name": "disabled",
          "type": "boolean",
          "default": "false",
          "source": "v-expansion-panel-content",
          "description": "Missing description"
        },
        {
          "name": "expandIcon",
          "type": "string",
          "default": "'$vuetify.icons.expand'",
          "source": "v-expansion-panel-content",
          "description": "Missing description"
        },
        {
          "name": "hideActions",
          "type": "boolean",
          "default": "false",
          "source": "v-expansion-panel-content",
          "description": "Missing description"
        },
        {
          "name": "lazy",
          "type": "boolean",
          "default": "false",
          "source": "bootable",
          "description": "Missing description"
        },
        {
          "name": "readonly",
          "type": "boolean",
          "default": "false",
          "source": "v-expansion-panel-content",
          "description": "Missing description"
        },
        {
          "name": "ripple",
          "type": [
            "boolean",
            "object"
          ],
          "default": false,
          "source": "rippleable",
          "description": "Missing description"
        },
        {
          "name": "value",
          "type": "any",
          "default": "undefined",
          "source": "toggleable",
          "description": "Missing description"
        }
      ],
      "mixins": [
        "bootable",
        "toggleable",
        "rippleable",
        "registrable-inject"
      ],
      "slots": [
        {
          "name": "default",
          "description": "Missing description"
        }
      ],
      "sass": []
    },
    "v-footer": {
      "props": [
        {
          "name": "absolute",
          "type": "boolean",
          "default": "false",
          "source": "positionable",
          "description": "Missing description"
        },
        {
          "name": "app",
          "type": "boolean",
          "default": "false",
          "source": "applicationable",
          "description": "Missing description"
        },
        {
          "name": "color",
          "type": "string",
          "default": "undefined",
          "source": "colorable",
          "description": "Missing description"
        },
        {
          "name": "dark",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "fixed",
          "type": "boolean",
          "default": "false",
          "source": "positionable",
          "description": "Missing description"
        },
        {
          "name": "height",
          "type": [
            "number",
            "string"
          ],
          "default": 32,
          "source": "v-footer",
          "description": "Missing description"
        },
        {
          "name": "inset",
          "type": "boolean",
          "default": "false",
          "source": "v-footer",
          "description": "Positions the toolbar offset from an application `v-navigation-drawer`"
        },
        {
          "name": "light",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        }
      ],
      "mixins": [
        "applicationable",
        "positionable",
        "colorable",
        "themeable"
      ],
      "slots": [
        {
          "name": "default",
          "description": "Missing description"
        }
      ],
      "sass": [
        {
          "name": "$footer-border-radius",
          "default": "0 !default;",
          "description": "Missing description"
        },
        {
          "name": "$footer-elevation",
          "default": "0 !default;",
          "description": "Missing description"
        },
        {
          "name": "$footer-padding",
          "default": "6px 16px !default;",
          "description": "Missing description"
        },
        {
          "name": "$footer-padless-padding",
          "default": "0px !default;",
          "description": "Missing description"
        },
        {
          "name": "$footer-shaped-border-radius",
          "default": "map-get($rounded, 'xl') $footer-border-radius !default;",
          "description": "Missing description"
        },
        {
          "name": "$footer-transition-duration",
          "default": "0.2s !default;",
          "description": "Missing description"
        },
        {
          "name": "$footer-transition-property",
          "default": "background-color, left, right !default;",
          "description": "Missing description"
        },
        {
          "name": "$footer-transition-timing-function",
          "default": "map-get($transition, 'fast-out-slow-in') !default;",
          "description": "Missing description"
        }
      ]
    },
    "v-form": {
      "props": [
        {
          "name": "lazyValidation",
          "type": "boolean",
          "default": "false",
          "source": "v-form",
          "description": "If enabled, **value** will always be _true_ unless there are visible validation errors. You can still call `validate()` to manually trigger validation"
        },
        {
          "name": "value",
          "type": "boolean",
          "default": "false",
          "source": "v-form",
          "description": "A boolean value representing the validity of the form."
        }
      ],
      "mixins": [
        "registrable-provide"
      ],
      "functions": [
        {
          "name": "reset",
          "signature": "(): void",
          "description": "Missing description"
        },
        {
          "name": "resetValidation",
          "signature": "(): void",
          "description": "Missing description"
        },
        {
          "name": "validate",
          "signature": "(): boolean",
          "description": "Missing description"
        }
      ],
      "events": [
        {
          "name": "input",
          "value": "boolean",
          "description": "Missing description"
        },
        {
          "name": "submit",
          "value": "event",
          "description": "Missing description"
        }
      ],
      "slots": [
        {
          "name": "default",
          "description": "Missing description"
        }
      ],
      "sass": []
    },
    "v-container": {
      "props": [
        {
          "name": "id",
          "type": "string",
          "default": "undefined",
          "source": "v-container",
          "description": "Missing description"
        },
        {
          "name": "tag",
          "type": "string",
          "default": "'div'",
          "source": "v-container",
          "description": "Components.Sheets.props.tag"
        }
      ],
      "mixins": [],
      "slots": [
        {
          "name": "default",
          "description": "Missing description"
        }
      ],
      "sass": []
    },
    "v-content": {
      "props": [
        {
          "name": "tag",
          "type": "string",
          "default": "'main'",
          "source": "v-content",
          "description": "Missing description"
        }
      ],
      "mixins": [
        "ssr-bootable"
      ],
      "sass": []
    },
    "v-flex": {
      "props": [
        {
          "name": "(size)(1-12)",
          "type": "boolean",
          "default": "false",
          "source": null,
          "description": "Missing description"
        },
        {
          "name": "alignSelfBaseline",
          "type": "boolean",
          "default": "false",
          "source": null,
          "description": "Missing description"
        },
        {
          "name": "alignSelfCenter",
          "type": "boolean",
          "default": "false",
          "source": null,
          "description": "Missing description"
        },
        {
          "name": "alignSelfEnd",
          "type": "boolean",
          "default": "false",
          "source": null,
          "description": "Missing description"
        },
        {
          "name": "alignSelfStart",
          "type": "boolean",
          "default": "false",
          "source": null,
          "description": "Missing description"
        },
        {
          "name": "grow",
          "type": "boolean",
          "default": "false",
          "source": null,
          "description": "Missing description"
        },
        {
          "name": "id",
          "type": "string",
          "default": "undefined",
          "source": "v-flex",
          "description": "Missing description"
        },
        {
          "name": "offset-(size)(0-12)",
          "type": "boolean",
          "default": "false",
          "source": null,
          "description": "Missing description"
        },
        {
          "name": "order-(size)(1-12)",
          "type": "boolean",
          "default": "false",
          "source": null,
          "description": "Missing description"
        },
        {
          "name": "shrink",
          "type": "boolean",
          "default": "false",
          "source": null,
          "description": "Missing description"
        },
        {
          "name": "tag",
          "type": "string",
          "default": "'div'",
          "source": "v-flex",
          "description": "Missing description"
        }
      ],
      "mixins": [],
      "slots": [
        {
          "name": "default",
          "description": "Missing description"
        }
      ],
      "sass": []
    },
    "v-layout": {
      "props": [
        {
          "name": "alignBaseline",
          "default": "false",
          "source": null,
          "type": "Boolean",
          "description": "Missing description"
        },
        {
          "name": "alignCenter",
          "default": "false",
          "source": null,
          "type": "Boolean",
          "description": "Missing description"
        },
        {
          "name": "alignContentCenter",
          "default": "false",
          "source": null,
          "type": "Boolean",
          "description": "Missing description"
        },
        {
          "name": "alignContentEnd",
          "default": "false",
          "source": null,
          "type": "Boolean",
          "description": "Missing description"
        },
        {
          "name": "alignContentSpaceAround",
          "default": "false",
          "source": null,
          "type": "Boolean",
          "description": "Missing description"
        },
        {
          "name": "alignContentSpaceBetween",
          "default": "false",
          "source": null,
          "type": "Boolean",
          "description": "Missing description"
        },
        {
          "name": "alignContentStart",
          "default": "false",
          "source": null,
          "type": "Boolean",
          "description": "Missing description"
        },
        {
          "name": "alignEnd",
          "default": "false",
          "source": null,
          "type": "Boolean",
          "description": "Missing description"
        },
        {
          "name": "alignStart",
          "default": "false",
          "source": null,
          "type": "Boolean",
          "description": "Missing description"
        },
        {
          "name": "column",
          "type": "boolean",
          "default": "false",
          "source": null,
          "description": "Missing description"
        },
        {
          "name": "d-{type}",
          "default": "false",
          "source": null,
          "type": "Boolean",
          "description": "Missing description"
        },
        {
          "name": "fillHeight",
          "default": "false",
          "source": null,
          "type": "Boolean",
          "description": "Missing description"
        },
        {
          "name": "id",
          "type": "string",
          "default": "undefined",
          "source": "v-layout",
          "description": "Missing description"
        },
        {
          "name": "justifyCenter",
          "default": "false",
          "source": null,
          "type": "Boolean",
          "description": "Missing description"
        },
        {
          "name": "justifyEnd",
          "default": "false",
          "source": null,
          "type": "Boolean",
          "description": "Missing description"
        },
        {
          "name": "justifySpaceAround",
          "default": "false",
          "source": null,
          "type": "Boolean",
          "description": "Missing description"
        },
        {
          "name": "justifySpaceBetween",
          "default": "false",
          "source": null,
          "type": "Boolean",
          "description": "Missing description"
        },
        {
          "name": "justifyStart",
          "default": "false",
          "source": null,
          "type": "Boolean",
          "description": "Missing description"
        },
        {
          "name": "reverse",
          "type": "boolean",
          "default": "false",
          "source": null,
          "description": "Missing description"
        },
        {
          "name": "row",
          "type": "boolean",
          "default": "true",
          "source": null,
          "description": "Missing description"
        },
        {
          "name": "tag",
          "type": "String",
          "default": "div",
          "source": null,
          "description": "Missing description"
        },
        {
          "name": "wrap",
          "type": "boolean",
          "default": "false",
          "source": null,
          "description": "Missing description"
        }
      ],
      "mixins": [],
      "slots": [
        {
          "name": "default",
          "description": "Missing description"
        }
      ],
      "sass": []
    },
    "v-spacer": {
      "props": [],
      "mixins": [],
      "slots": [
        "default"
      ],
      "sass": []
    },
    "v-hover": {
      "props": [
        {
          "name": "closeDelay",
          "type": [
            "number",
            "string"
          ],
          "default": 0,
          "source": "delayable",
          "description": "Missing description"
        },
        {
          "name": "disabled",
          "type": "boolean",
          "default": "false",
          "source": "v-hover",
          "description": "Turns off hover functionality"
        },
        {
          "name": "openDelay",
          "type": [
            "number",
            "string"
          ],
          "default": 0,
          "source": "delayable",
          "description": "Missing description"
        },
        {
          "name": "value",
          "type": "boolean",
          "default": "false",
          "source": "toggleable",
          "description": "Missing description"
        }
      ],
      "mixins": [
        "delayable",
        "toggleable"
      ],
      "slots": [
        {
          "name": "default",
          "props": {
            "hover": "boolean"
          },
          "description": "Missing description"
        }
      ],
      "sass": []
    },
    "v-icon": {
      "props": [
        {
          "name": "color",
          "type": "string",
          "default": "undefined",
          "source": "colorable",
          "description": "Missing description"
        },
        {
          "name": "dark",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "dense",
          "type": "boolean",
          "default": "false",
          "source": null,
          "description": "Missing description"
        },
        {
          "name": "disabled",
          "type": "boolean",
          "default": "false",
          "source": "v-icon",
          "description": "Mixins.Validatable.props.disabled"
        },
        {
          "name": "large",
          "type": "boolean",
          "default": "false",
          "source": "sizeable",
          "description": "Missing description"
        },
        {
          "name": "left",
          "type": "boolean",
          "default": "false",
          "source": "v-icon",
          "description": "Places the icon on the left, when used inside a button"
        },
        {
          "name": "light",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "medium",
          "type": "boolean",
          "default": "false",
          "source": "sizeable",
          "description": "Missing description"
        },
        {
          "name": "right",
          "type": "boolean",
          "default": "false",
          "source": "v-icon",
          "description": "Places the icon on the right, when used inside a button"
        },
        {
          "name": "size",
          "type": [
            "number",
            "string"
          ],
          "default": "undefined",
          "source": "sizeable",
          "description": "Missing description"
        },
        {
          "name": "small",
          "type": "boolean",
          "default": "false",
          "source": "sizeable",
          "description": "Missing description"
        },
        {
          "name": "xLarge",
          "type": "boolean",
          "default": "false",
          "source": "sizeable",
          "description": "Missing description"
        }
      ],
      "mixins": [
        "colorable",
        "sizeable",
        "themeable"
      ],
      "slots": [
        {
          "name": "default",
          "description": "Missing description"
        }
      ],
      "sass": [
        {
          "name": "$icon-size",
          "default": "24px !default;",
          "description": "Missing description"
        },
        {
          "name": "$icon-size-dense",
          "default": "20px !default;",
          "description": "Missing description"
        }
      ]
    },
    "v-img": {
      "props": [
        {
          "name": "alt",
          "type": "string",
          "default": "undefined",
          "source": "v-img",
          "description": "Alternate text for screen readers. Leave empty for decorative images"
        },
        {
          "name": "aspectRatio",
          "type": [
            "string",
            "number"
          ],
          "default": "undefined",
          "source": "v-responsive",
          "description": "Sets a base aspect ratio, calculated as width/height. This will only set a **minimum** height, the component can still grow if it has a lot of content."
        },
        {
          "name": "contain",
          "type": "boolean",
          "default": "false",
          "source": "v-img",
          "description": "Prevents the image from being cropped if it doesn't fit"
        },
        {
          "name": "gradient",
          "type": "string",
          "default": "undefined",
          "source": "v-img",
          "description": "Overlays a gradient onto the image. Only supports [linear-gradient](https://developer.mozilla.org/en-US/docs/Web/CSS/linear-gradient) syntax, anything else should be done with classes (see examples)"
        },
        {
          "name": "height",
          "type": [
            "number",
            "string"
          ],
          "default": "undefined",
          "source": "measurable",
          "description": "Missing description"
        },
        {
          "name": "lazySrc",
          "type": "string",
          "default": "undefined",
          "source": "v-img",
          "description": "Something to show while waiting for the main image to load, typically a small base64-encoded thumbnail. Has a slight blur filter applied.\n\nUse [vuetify-loader](https://github.com/vuetifyjs/vuetify-loader) to generate automatically"
        },
        {
          "name": "maxHeight",
          "type": [
            "number",
            "string"
          ],
          "default": "undefined",
          "source": "measurable",
          "description": "Missing description"
        },
        {
          "name": "maxWidth",
          "type": [
            "number",
            "string"
          ],
          "default": "undefined",
          "source": "measurable",
          "description": "Missing description"
        },
        {
          "name": "minHeight",
          "type": [
            "number",
            "string"
          ],
          "default": "undefined",
          "source": "measurable",
          "description": "Missing description"
        },
        {
          "name": "minWidth",
          "type": [
            "number",
            "string"
          ],
          "default": "undefined",
          "source": "measurable",
          "description": "Missing description"
        },
        {
          "name": "position",
          "type": "string",
          "default": "'center center'",
          "source": "v-img",
          "description": "Overrides the default to change which parts get cropped off. Uses the same syntax as [`background-position`](https://developer.mozilla.org/en-US/docs/Web/CSS/background-position)"
        },
        {
          "name": "sizes",
          "type": "string",
          "default": "undefined",
          "source": "v-img",
          "description": "For use with `srcset`, see [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-sizes)"
        },
        {
          "name": "src",
          "type": [
            "string",
            "object"
          ],
          "default": "undefined",
          "source": "v-img",
          "description": "The image URL. This prop is mandatory"
        },
        {
          "name": "srcset",
          "type": "string",
          "default": "undefined",
          "source": "v-img",
          "description": "A set of alternate images to use based on device size. [Read more...](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-srcset)"
        },
        {
          "name": "transition",
          "type": [
            "boolean",
            "string"
          ],
          "default": "fade-transition",
          "source": "v-img",
          "description": "The transition to use when switching from `lazy-src` to `src`"
        },
        {
          "name": "width",
          "type": [
            "number",
            "string"
          ],
          "default": "undefined",
          "source": "measurable",
          "description": "Missing description"
        }
      ],
      "mixins": [
        "measurable"
      ],
      "slots": [
        {
          "name": "placeholder",
          "description": "Missing description"
        },
        {
          "name": "default",
          "description": "Missing description"
        }
      ],
      "events": [
        {
          "name": "error",
          "value": "object | string",
          "description": "Missing description"
        },
        {
          "name": "load",
          "value": "object | string",
          "description": "Missing description"
        }
      ],
      "sass": [
        {
          "name": "$img-preload-filter",
          "default": "blur(2px) !default;",
          "description": "Missing description"
        }
      ]
    },
    "v-input": {
      "props": [
        {
          "name": "appendIcon",
          "type": "string",
          "default": "undefined",
          "source": "v-input",
          "description": "Appends an icon to the component, uses the same syntax as `v-icon`"
        },
        {
          "name": "appendIconCb",
          "type": "function",
          "default": "null",
          "source": "v-input",
          "description": "Missing description"
        },
        {
          "name": "backgroundColor",
          "type": "string",
          "default": "undefined",
          "source": "v-input",
          "description": "Changes the background-color of the input"
        },
        {
          "name": "color",
          "type": "string",
          "default": "undefined",
          "source": "colorable",
          "description": "Missing description"
        },
        {
          "name": "dark",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "disabled",
          "type": "boolean",
          "default": false,
          "source": "validatable",
          "value": "boolean",
          "description": "Missing description"
        },
        {
          "name": "error",
          "type": "boolean",
          "default": "false",
          "source": "validatable",
          "description": "Missing description"
        },
        {
          "name": "errorCount",
          "type": [
            "number",
            "string"
          ],
          "default": 1,
          "source": "validatable",
          "description": "Missing description"
        },
        {
          "name": "errorMessages",
          "type": [
            "string",
            "array"
          ],
          "default": [],
          "source": "validatable",
          "description": "Missing description"
        },
        {
          "name": "height",
          "type": [
            "number",
            "string"
          ],
          "default": "undefined",
          "source": "v-input",
          "description": "Sets the height of the input"
        },
        {
          "name": "hideDetails",
          "type": "boolean",
          "default": "false",
          "source": "v-input",
          "description": "Hides hint and validation errors. When set to `auto` messages will be rendered only if there's a message (hint, error message, counter value etc) to display"
        },
        {
          "name": "hint",
          "type": "string",
          "default": "undefined",
          "source": "v-input",
          "description": "Hint text"
        },
        {
          "name": "label",
          "type": "string",
          "source": "v-input",
          "description": "Sets input label"
        },
        {
          "name": "light",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "loading",
          "type": "boolean",
          "default": "false",
          "source": "v-input",
          "description": "Mixins.Loadable.props.loading"
        },
        {
          "name": "messages",
          "type": [
            "string",
            "array"
          ],
          "default": [],
          "source": "validatable",
          "description": "Missing description"
        },
        {
          "name": "persistentHint",
          "type": "boolean",
          "default": "false",
          "source": "v-input",
          "description": "Forces hint to always be visible"
        },
        {
          "name": "prependIcon",
          "type": "string",
          "default": "undefined",
          "source": "v-input",
          "description": "Prepends an icon to the component, uses the same syntax as `v-icon`"
        },
        {
          "name": "prependIconCb",
          "type": "function",
          "default": "null",
          "source": "v-input",
          "description": "Missing description"
        },
        {
          "name": "readonly",
          "type": "boolean",
          "default": false,
          "source": "validatable",
          "value": "boolean",
          "description": "Missing description"
        },
        {
          "name": "rules",
          "type": "array",
          "default": [],
          "source": "validatable",
          "description": "Missing description"
        },
        {
          "name": "success",
          "type": "boolean",
          "default": "false",
          "source": "validatable",
          "description": "Missing description"
        },
        {
          "name": "successMessages",
          "type": [
            "string",
            "array"
          ],
          "default": [],
          "source": "validatable",
          "description": "Missing description"
        },
        {
          "name": "validateOnBlur",
          "type": "boolean",
          "default": "false",
          "source": "validatable",
          "description": "Missing description"
        },
        {
          "name": "value",
          "type": "any",
          "source": "v-input",
          "description": "The input's value"
        }
      ],
      "mixins": [
        "colorable",
        "themeable",
        "validatable",
        "colorable",
        "registrable-inject"
      ],
      "events": [
        {
          "name": "update:error",
          "source": "validatable",
          "value": "boolean",
          "description": "Missing description"
        },
        {
          "name": "change",
          "value": "any",
          "description": "Missing description"
        },
        {
          "name": "mousedown",
          "source": "v-input",
          "value": "MouseEvent",
          "description": "Missing description"
        },
        {
          "name": "mouseup",
          "source": "v-input",
          "value": "MouseEvent",
          "description": "Missing description"
        },
        {
          "name": "click:append",
          "source": "v-input",
          "value": "Event",
          "description": "Missing description"
        },
        {
          "name": "click:prepend",
          "source": "v-input",
          "value": "Event",
          "description": "Missing description"
        }
      ],
      "slots": [
        {
          "name": "append",
          "source": "v-input",
          "description": "Missing description"
        },
        {
          "name": "default",
          "source": "v-input",
          "description": "Missing description"
        },
        {
          "name": "prepend",
          "source": "v-input",
          "description": "Missing description"
        },
        {
          "name": "label",
          "source": "v-input",
          "description": "Missing description"
        },
        {
          "name": "message",
          "props": {
            "key": "number, // the messages index",
            "message": "string, // the message"
          },
          "source": "v-input",
          "description": "Missing description"
        }
      ],
      "sass": [
        {
          "name": "$input-font-size",
          "default": "16px !default;",
          "description": "Missing description"
        },
        {
          "name": "$input-letter-spacing",
          "default": "normal !default;",
          "description": "Missing description"
        },
        {
          "name": "$input-text-align",
          "default": "left !default;",
          "description": "Missing description"
        },
        {
          "name": "$input-max-height",
          "default": "32px !default;",
          "description": "Missing description"
        },
        {
          "name": "$input-label-height",
          "default": "20px !default;",
          "description": "Missing description"
        },
        {
          "name": "$input-label-letter-spacing",
          "default": "20px !default;",
          "description": "Missing description"
        },
        {
          "name": "$input-prepend-append-outer-margin",
          "default": "9px !default;",
          "description": "Missing description"
        },
        {
          "name": "$input-icon-height",
          "default": "24px !default;",
          "description": "Missing description"
        },
        {
          "name": "$input-icon-min-width",
          "default": "24px !default;",
          "description": "Missing description"
        },
        {
          "name": "$input-icon-width",
          "default": "24px !default;",
          "description": "Missing description"
        },
        {
          "name": "$input-slot-margin-bottom",
          "default": "8px !default;",
          "description": "Missing description"
        },
        {
          "name": "$input-dense-slot-margin-bottom",
          "default": "4px !default;",
          "description": "Missing description"
        }
      ]
    },
    "v-item": {
      "props": [
        {
          "name": "activeClass",
          "type": "string",
          "source": "groupable",
          "description": "Missing description"
        },
        {
          "name": "disabled",
          "type": "boolean",
          "default": "false",
          "source": "groupable",
          "description": "Missing description"
        },
        {
          "name": "value",
          "type": "any",
          "default": "undefined",
          "source": "v-item",
          "description": "Missing description"
        }
      ],
      "mixins": [
        "groupable"
      ],
      "slots": [
        {
          "name": "default",
          "props": {
            "active": "boolean",
            "toggle": "Function"
          },
          "description": "Missing description"
        }
      ],
      "sass": []
    },
    "v-item-group": {
      "props": [
        {
          "name": "activeClass",
          "type": "string",
          "default": "'v-item--active'",
          "source": "base-item-group",
          "description": "Missing description"
        },
        {
          "name": "dark",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "light",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "mandatory",
          "type": "boolean",
          "default": "false",
          "source": "base-item-group",
          "description": "Missing description"
        },
        {
          "name": "max",
          "type": [
            "number",
            "string"
          ],
          "default": "undefined",
          "source": "base-item-group",
          "description": "Missing description"
        },
        {
          "name": "multiple",
          "type": "boolean",
          "default": "false",
          "source": "base-item-group",
          "description": "Missing description"
        },
        {
          "name": "value",
          "type": "any",
          "default": "undefined",
          "source": "proxyable",
          "description": "Missing description"
        }
      ],
      "mixins": [
        "proxyable",
        "themeable"
      ],
      "events": [
        {
          "name": "change",
          "value": "any[] | any",
          "description": "Missing description"
        }
      ],
      "sass": [
        {
          "name": "$item-group-transition",
          "default": "$primary-transition !default;",
          "description": "Missing description"
        }
      ]
    },
    "v-jumbotron": {
      "props": [
        {
          "name": "activeClass",
          "type": "string",
          "default": "undefined",
          "source": "routable",
          "description": "Missing description"
        },
        {
          "name": "append",
          "type": "boolean",
          "default": "false",
          "source": "routable",
          "description": "Missing description"
        },
        {
          "name": "color",
          "type": "string",
          "default": "undefined",
          "source": "colorable",
          "description": "Missing description"
        },
        {
          "name": "dark",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "disabled",
          "type": "boolean",
          "default": "false",
          "source": "routable",
          "description": "Missing description"
        },
        {
          "name": "exact",
          "type": "boolean",
          "default": "false",
          "source": "routable",
          "description": "Missing description"
        },
        {
          "name": "exactActiveClass",
          "type": "string",
          "default": "undefined",
          "source": "routable",
          "description": "Missing description"
        },
        {
          "name": "gradient",
          "type": "string",
          "default": "undefined",
          "source": "v-jumbotron",
          "description": "Missing description"
        },
        {
          "name": "height",
          "type": [
            "number",
            "string"
          ],
          "default": "400px",
          "source": "v-jumbotron",
          "description": "Missing description"
        },
        {
          "name": "href",
          "type": [
            "string",
            "object"
          ],
          "default": "undefined",
          "source": "routable",
          "description": "Missing description"
        },
        {
          "name": "light",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "nuxt",
          "type": "boolean",
          "default": "false",
          "source": "routable",
          "description": "Missing description"
        },
        {
          "name": "replace",
          "type": "boolean",
          "default": "false",
          "source": "routable",
          "description": "Missing description"
        },
        {
          "name": "ripple",
          "type": [
            "boolean",
            "object"
          ],
          "default": "undefined",
          "source": "routable",
          "description": "Missing description"
        },
        {
          "name": "src",
          "type": "string",
          "default": "undefined",
          "source": "v-jumbotron",
          "description": "Missing description"
        },
        {
          "name": "tag",
          "type": "string",
          "default": "'div'",
          "source": "routable",
          "description": "Missing description"
        },
        {
          "name": "target",
          "type": "string",
          "default": "undefined",
          "source": "routable",
          "description": "Missing description"
        },
        {
          "name": "to",
          "type": [
            "string",
            "object"
          ],
          "default": "undefined",
          "source": "routable",
          "description": "Missing description"
        }
      ],
      "mixins": [
        "colorable",
        "routable",
        "themeable"
      ],
      "sass": []
    },
    "v-list": {
      "props": [
        {
          "name": "dark",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "dense",
          "type": "boolean",
          "default": "false",
          "source": "v-list",
          "description": "Lowers max height of list tiles"
        },
        {
          "name": "expand",
          "type": "boolean",
          "default": "false",
          "source": "v-list",
          "description": "Will only collapse when explicitly closed"
        },
        {
          "name": "light",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "subheader",
          "type": "boolean",
          "default": "false",
          "source": "v-list",
          "description": "Removes top padding. Used when previous sibling is a header"
        },
        {
          "name": "threeLine",
          "type": "boolean",
          "default": "false",
          "source": "v-list",
          "description": "Increases list-item height for three lines. This prop uses [line-clamp](https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-line-clamp) and is not supported in all browsers."
        },
        {
          "name": "twoLine",
          "type": "boolean",
          "default": "false",
          "source": "v-list",
          "description": "Increases list-item height for two lines. This prop uses [line-clamp](https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-line-clamp) and is not supported in all browsers."
        }
      ],
      "mixins": [
        "registrable-provide",
        "themeable"
      ],
      "slots": [
        {
          "name": "default",
          "description": "Missing description"
        }
      ],
      "sass": [
        {
          "name": "$avatar-margin-x",
          "default": "16px !default;",
          "description": "Missing description"
        },
        {
          "name": "$list-border-radius",
          "default": "0 !default;",
          "description": "Missing description"
        },
        {
          "name": "$list-elevation",
          "default": "0 !default;",
          "description": "Missing description"
        },
        {
          "name": "$list-dense-subheader-font-size",
          "default": "0.75rem !default;",
          "description": "Missing description"
        },
        {
          "name": "$list-dense-subheader-height",
          "default": "40px !default;",
          "description": "Missing description"
        },
        {
          "name": "$list-item-avatar-margin-y",
          "default": "8px !default;",
          "description": "Missing description"
        },
        {
          "name": "$list-item-avatar-horizontal-margin-x",
          "default": "-16px !default;",
          "description": "Missing description"
        },
        {
          "name": "$list-item-icon-margin-y",
          "default": "16px !default;",
          "description": "Missing description"
        },
        {
          "name": "$list-item-min-height",
          "default": "48px !default;",
          "description": "Missing description"
        },
        {
          "name": "$list-item-two-line-min-height",
          "default": "64px !default;",
          "description": "Missing description"
        },
        {
          "name": "$list-item-three-line-min-height",
          "default": "88px !default;",
          "description": "Missing description"
        },
        {
          "name": "$list-item-title-font-size",
          "default": "map-deep-get($headings, 'subtitle-1', 'size') !default;",
          "description": "Missing description"
        },
        {
          "name": "$list-item-subtitle-font-size",
          "default": "map-deep-get($headings, 'subtitle-2', 'size') !default;",
          "description": "Missing description"
        },
        {
          "name": "$list-item-dense-title-font-size",
          "default": "0.8125rem !default;",
          "description": "Missing description"
        },
        {
          "name": "$list-item-dense-title-font-weight",
          "default": "500 !default;",
          "description": "Missing description"
        },
        {
          "name": "$list-padding",
          "default": "8px 0 !default;",
          "description": "Missing description"
        },
        {
          "name": "$list-dense-subheading-padding",
          "default": "0 8px !default;",
          "description": "Missing description"
        },
        {
          "name": "$list-nav-border-radius",
          "default": "$border-radius-root !default;",
          "description": "Missing description"
        },
        {
          "name": "$list-nav-rounded-item-margin-bottom",
          "default": "8px !default;",
          "description": "Missing description"
        },
        {
          "name": "$list-nav-rounded-item-dense-margin-bottom",
          "default": "4px !default;",
          "description": "Missing description"
        },
        {
          "name": "$list-nav-padding-left",
          "default": "8px !default;",
          "description": "Missing description"
        },
        {
          "name": "$list-nav-padding-right",
          "default": "8px !default;",
          "description": "Missing description"
        },
        {
          "name": "$list-nav-item-padding",
          "default": "0 8px !default;",
          "description": "Missing description"
        },
        {
          "name": "$list-shaped-padding",
          "default": "8px !default;",
          "description": "Missing description"
        },
        {
          "name": "$list-subheader-padding-top",
          "default": "0 !default;",
          "description": "Missing description"
        },
        {
          "name": "$list-group-header-icon-min-width",
          "default": "48px !default;",
          "description": "Missing description"
        },
        {
          "name": "$list-group-sub-group-child-margin",
          "default": "16px !default;",
          "description": "Missing description"
        },
        {
          "name": "$list-group-sub-group-header-margin",
          "default": "32px !default;",
          "description": "Missing description"
        },
        {
          "name": "$list-group-items-item-padding",
          "default": "40px !default;",
          "description": "Missing description"
        },
        {
          "name": "$list-group-no-action-item-padding",
          "default": "72px !default;",
          "description": "Missing description"
        },
        {
          "name": "$list-dense-subheader-padding",
          "default": "0 8px !default;",
          "description": "Missing description"
        },
        {
          "name": "$list-nav-rounded-dense-item-margin-bottom",
          "default": "4px !default;",
          "description": "Missing description"
        },
        {
          "name": "$list-group-no-action-sub-group-item-padding",
          "default": "88px !default;",
          "description": "Missing description"
        },
        {
          "name": "$list-group-dense-sub-group-header-padding",
          "default": "24px !default;",
          "description": "Missing description"
        },
        {
          "name": "$list-group-nav-no-action-item-padding",
          "default": "64px !default;",
          "description": "Missing description"
        },
        {
          "name": "$list-group-sub-group-item-padding",
          "default": "80px !default;",
          "description": "Missing description"
        },
        {
          "name": "$list-item-padding",
          "default": "0 16px !default;",
          "description": "Missing description"
        },
        {
          "name": "$list-item-action-margin",
          "default": "12px 0 !default;",
          "description": "Missing description"
        },
        {
          "name": "$list-item-action-text-font-size",
          "default": "map-deep-get($headings, 'caption', 'size') !default;",
          "description": "Missing description"
        },
        {
          "name": "$list-item-avatar-horizontal-margin",
          "default": "8px !default;",
          "description": "Missing description"
        },
        {
          "name": "$list-item-content-padding",
          "default": "12px 0 !default;",
          "description": "Missing description"
        },
        {
          "name": "$list-item-content-children-margin-bottom",
          "default": "2px !default;",
          "description": "Missing description"
        },
        {
          "name": "$list-item-icon-margin",
          "default": "16px 0 !default;",
          "description": "Missing description"
        },
        {
          "name": "$list-item-child-last-type-margin",
          "default": "16px !default;",
          "description": "Missing description"
        },
        {
          "name": "$list-item-child-min-width",
          "default": "24px !default;",
          "description": "Missing description"
        },
        {
          "name": "$list-item-title-subtitle-line-height",
          "default": "1.2 !default;",
          "description": "Missing description"
        },
        {
          "name": "$list-item-avatar-first-child-margin",
          "default": "16px !default;",
          "description": "Missing description"
        },
        {
          "name": "$list-item-action-icon-margin",
          "default": "32px !default;",
          "description": "Missing description"
        },
        {
          "name": "$list-dense-icon-height",
          "default": "24px !default;",
          "description": "Missing description"
        },
        {
          "name": "$list-dense-icon-margin",
          "default": "8px !default;",
          "description": "Missing description"
        },
        {
          "name": "$list-dense-min-height",
          "default": "40px !default;",
          "description": "Missing description"
        },
        {
          "name": "$list-item-dense-title-line-height",
          "default": "1rem !default;",
          "description": "Missing description"
        },
        {
          "name": "$list-item-dense-two-line-min-height",
          "default": "60px !default;",
          "description": "Missing description"
        },
        {
          "name": "$list-item-dense-three-line-min-height",
          "default": "76px !default;",
          "description": "Missing description"
        },
        {
          "name": "$list-dense-content-padding",
          "default": "8px 0 !default;",
          "description": "Missing description"
        },
        {
          "name": "$list-item-two-line-icon-margin-bottom",
          "default": "32px !default;",
          "description": "Missing description"
        },
        {
          "name": "$list-item-three-line-avatar-action-margin",
          "default": "16px !default;",
          "description": "Missing description"
        }
      ]
    },
    "v-list-group": {
      "props": [
        {
          "name": "activeClass",
          "type": "string",
          "default": "'primary--text'",
          "source": "v-list-group",
          "description": "Missing description"
        },
        {
          "name": "appendIcon",
          "type": "string",
          "default": "'$vuetify.icons.expand'",
          "source": "v-list-group",
          "description": "Missing description"
        },
        {
          "name": "disabled",
          "type": "boolean",
          "default": "false",
          "source": "v-list-group",
          "description": "Missing description"
        },
        {
          "name": "group",
          "type": "string",
          "default": "undefined",
          "source": "v-list-group",
          "description": "Missing description"
        },
        {
          "name": "lazy",
          "type": "boolean",
          "default": "false",
          "source": "bootable",
          "description": "Missing description"
        },
        {
          "name": "noAction",
          "type": "boolean",
          "default": "false",
          "source": "v-list-group",
          "description": "Missing description"
        },
        {
          "name": "prependIcon",
          "type": "string",
          "default": "undefined",
          "source": "v-list-group",
          "description": "Missing description"
        },
        {
          "name": "subGroup",
          "type": "boolean",
          "default": "false",
          "source": "v-list-group",
          "description": "Missing description"
        },
        {
          "name": "value",
          "type": "any",
          "default": "undefined",
          "source": "toggleable",
          "description": "Missing description"
        }
      ],
      "mixins": [
        "bootable",
        "registrable-inject",
        "toggleable"
      ],
      "slots": [
        {
          "name": "activator",
          "description": "Missing description"
        },
        {
          "name": "appendIcon",
          "description": "Missing description"
        },
        {
          "name": "prependIcon",
          "description": "Missing description"
        },
        {
          "name": "default",
          "description": "Missing description"
        }
      ],
      "events": [
        {
          "name": "click",
          "value": "MouseEvent",
          "description": "Missing description"
        }
      ],
      "sass": []
    },
    "v-list-tile": {
      "props": [
        {
          "name": "activeClass",
          "type": "string",
          "default": "'primary--text'",
          "source": "routable",
          "description": "Missing description"
        },
        {
          "name": "append",
          "type": "boolean",
          "default": "false",
          "source": "routable",
          "description": "Missing description"
        },
        {
          "name": "avatar",
          "type": "boolean",
          "default": "false",
          "source": "v-list-tile",
          "description": "Missing description"
        },
        {
          "name": "color",
          "type": "string",
          "default": "undefined",
          "source": "colorable",
          "description": "Missing description"
        },
        {
          "name": "dark",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "disabled",
          "type": "boolean",
          "default": "false",
          "source": "routable",
          "description": "Missing description"
        },
        {
          "name": "exact",
          "type": "boolean",
          "default": "false",
          "source": "routable",
          "description": "Missing description"
        },
        {
          "name": "exactActiveClass",
          "type": "string",
          "default": "undefined",
          "source": "routable",
          "description": "Missing description"
        },
        {
          "name": "href",
          "type": [
            "string",
            "object"
          ],
          "default": "undefined",
          "source": "routable",
          "description": "Missing description"
        },
        {
          "name": "inactive",
          "type": "boolean",
          "default": "false",
          "source": "v-list-tile",
          "description": "Missing description"
        },
        {
          "name": "light",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "nuxt",
          "type": "boolean",
          "default": "false",
          "source": "routable",
          "description": "Missing description"
        },
        {
          "name": "replace",
          "type": "boolean",
          "default": "false",
          "source": "routable",
          "description": "Missing description"
        },
        {
          "name": "ripple",
          "type": [
            "boolean",
            "object"
          ],
          "default": "undefined",
          "source": "routable",
          "description": "Missing description"
        },
        {
          "name": "tag",
          "type": "string",
          "default": "undefined",
          "source": "routable",
          "description": "Missing description"
        },
        {
          "name": "target",
          "type": "string",
          "default": "undefined",
          "source": "routable",
          "description": "Missing description"
        },
        {
          "name": "to",
          "type": [
            "string",
            "object"
          ],
          "default": "undefined",
          "source": "routable",
          "description": "Missing description"
        },
        {
          "name": "value",
          "type": "any",
          "default": "undefined",
          "source": "toggleable",
          "description": "Missing description"
        }
      ],
      "mixins": [
        "colorable",
        "routable",
        "toggleable",
        "themeable"
      ],
      "sass": []
    },
    "v-list-tile-action": {
      "props": [],
      "mixins": [],
      "sass": []
    },
    "v-list-tile-avatar": {
      "props": [
        {
          "name": "color",
          "type": "string",
          "default": "undefined",
          "source": "v-list-tile-avatar",
          "description": "Missing description"
        },
        {
          "name": "size",
          "type": [
            "number",
            "string"
          ],
          "default": 40,
          "source": "v-list-tile-avatar",
          "description": "Missing description"
        },
        {
          "name": "tile",
          "type": "boolean",
          "default": "false",
          "source": "v-list-tile-avatar",
          "description": "Missing description"
        }
      ],
      "mixins": [],
      "sass": []
    },
    "v-list-tile-action-text": {
      "props": [],
      "mixins": [],
      "sass": []
    },
    "v-list-tile-content": {
      "props": [],
      "mixins": [],
      "sass": []
    },
    "v-list-tile-title": {
      "props": [],
      "mixins": [],
      "sass": []
    },
    "v-list-tile-sub-title": {
      "props": [],
      "mixins": [],
      "sass": []
    },
    "v-menu": {
      "props": [
        {
          "name": "absolute",
          "type": "boolean",
          "default": "false",
          "source": "positionable",
          "description": "Missing description"
        },
        {
          "name": "activator",
          "type": "any",
          "default": "undefined",
          "source": "menuable",
          "description": "Missing description"
        },
        {
          "name": "allowOverflow",
          "type": "boolean",
          "default": "false",
          "source": "menuable",
          "description": "Missing description"
        },
        {
          "name": "attach",
          "type": "any",
          "default": false,
          "source": "detachable",
          "description": "Missing description"
        },
        {
          "name": "auto",
          "type": "boolean",
          "default": "false",
          "source": "v-menu",
          "description": "Missing description"
        },
        {
          "name": "bottom",
          "type": "boolean",
          "default": "false",
          "source": "positionable",
          "description": "Missing description"
        },
        {
          "name": "closeDelay",
          "type": [
            "number",
            "string"
          ],
          "default": 0,
          "source": "delayable",
          "description": "Missing description"
        },
        {
          "name": "closeOnClick",
          "type": "boolean",
          "default": "true",
          "source": "v-menu",
          "description": "Designates if menu should close on outside-activator click"
        },
        {
          "name": "closeOnContentClick",
          "type": "boolean",
          "default": "true",
          "source": "v-menu",
          "description": "Designates if menu should close when its content is clicked"
        },
        {
          "name": "contentClass",
          "type": "any",
          "default": "undefined",
          "source": "detachable",
          "description": "Missing description"
        },
        {
          "name": "dark",
          "type": "boolean",
          "default": "false",
          "source": "menuable",
          "description": "Missing description"
        },
        {
          "name": "disableKeys",
          "type": "boolean",
          "default": "false",
          "source": "v-menu",
          "description": "Removes all keyboard interaction"
        },
        {
          "name": "disabled",
          "type": "boolean",
          "default": "false",
          "source": "v-menu",
          "description": "Disables the menu"
        },
        {
          "name": "fixed",
          "type": "boolean",
          "default": "false",
          "source": "positionable",
          "description": "Missing description"
        },
        {
          "name": "fullWidth",
          "type": "boolean",
          "default": "false",
          "source": "v-menu",
          "description": "Missing description"
        },
        {
          "name": "inputActivator",
          "type": "boolean",
          "default": "false",
          "source": "menuable",
          "description": "Missing description"
        },
        {
          "name": "lazy",
          "type": "boolean",
          "default": "false",
          "source": "bootable",
          "description": "Missing description"
        },
        {
          "name": "left",
          "type": "boolean",
          "default": "false",
          "source": "positionable",
          "description": "Missing description"
        },
        {
          "name": "light",
          "type": "boolean",
          "default": "false",
          "source": "menuable",
          "description": "Missing description"
        },
        {
          "name": "maxHeight",
          "type": "any",
          "default": "auto",
          "source": "v-menu",
          "description": "Sets the max height of the menu content"
        },
        {
          "name": "maxWidth",
          "type": [
            "number",
            "string"
          ],
          "default": "auto",
          "source": "menuable",
          "description": "Missing description"
        },
        {
          "name": "minWidth",
          "type": [
            "number",
            "string"
          ],
          "default": "undefined",
          "source": "menuable",
          "description": "Missing description"
        },
        {
          "name": "nudgeBottom",
          "type": [
            "number",
            "string"
          ],
          "default": 0,
          "source": "menuable",
          "description": "Missing description"
        },
        {
          "name": "nudgeLeft",
          "type": [
            "number",
            "string"
          ],
          "default": 0,
          "source": "menuable",
          "description": "Missing description"
        },
        {
          "name": "nudgeRight",
          "type": [
            "number",
            "string"
          ],
          "default": 0,
          "source": "menuable",
          "description": "Missing description"
        },
        {
          "name": "nudgeTop",
          "type": [
            "number",
            "string"
          ],
          "default": 0,
          "source": "menuable",
          "description": "Missing description"
        },
        {
          "name": "nudgeWidth",
          "type": [
            "number",
            "string"
          ],
          "default": 0,
          "source": "menuable",
          "description": "Missing description"
        },
        {
          "name": "offsetOverflow",
          "type": "boolean",
          "default": "false",
          "source": "menuable",
          "description": "Missing description"
        },
        {
          "name": "offsetX",
          "type": "boolean",
          "default": "false",
          "source": "v-menu",
          "description": "Offset the menu on the x-axis. Works in conjunction with direction left/right"
        },
        {
          "name": "offsetY",
          "type": "boolean",
          "default": "false",
          "source": "v-menu",
          "description": "Offset the menu on the y-axis. Works in conjunction with direction top/bottom"
        },
        {
          "name": "openDelay",
          "type": [
            "number",
            "string"
          ],
          "default": 0,
          "source": "delayable",
          "description": "Missing description"
        },
        {
          "name": "openOnClick",
          "type": "boolean",
          "default": "true",
          "source": "v-menu",
          "description": "Designates whether menu should open on activator click"
        },
        {
          "name": "openOnHover",
          "type": "boolean",
          "default": "false",
          "source": "v-menu",
          "description": "Designates whether menu should open on activator hover"
        },
        {
          "name": "origin",
          "type": "string",
          "default": "'top left'",
          "source": "v-menu",
          "description": "Mixins.Transitionable.props.origin"
        },
        {
          "name": "positionX",
          "type": "number",
          "default": "undefined",
          "source": "menuable",
          "description": "Missing description"
        },
        {
          "name": "positionY",
          "type": "number",
          "default": "undefined",
          "source": "menuable",
          "description": "Missing description"
        },
        {
          "name": "returnValue",
          "type": "any",
          "default": "undefined",
          "source": "returnable",
          "description": "Missing description"
        },
        {
          "name": "right",
          "type": "boolean",
          "default": "false",
          "source": "positionable",
          "description": "Missing description"
        },
        {
          "name": "top",
          "type": "boolean",
          "default": "false",
          "source": "positionable",
          "description": "Missing description"
        },
        {
          "name": "transition",
          "type": [
            "boolean",
            "string"
          ],
          "default": "v-menu-transition",
          "source": "v-menu",
          "description": "Mixins.Transitionable.props.transition"
        },
        {
          "name": "value",
          "type": "any",
          "default": "undefined",
          "source": "toggleable",
          "description": "Missing description"
        },
        {
          "name": "zIndex",
          "type": [
            "number",
            "string"
          ],
          "default": "undefined",
          "source": "menuable",
          "description": "Missing description"
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
        "returnable",
        "toggleable",
        "themeable"
      ],
      "slots": [
        {
          "name": "activator",
          "props": {
            "attrs": "{ role: string, aria-haspopup: boolean, aria-expanded: string }",
            "on": "{ [eventName]: eventHandler }",
            "value": "boolean"
          },
          "description": "Missing description"
        },
        {
          "name": "default",
          "description": "Missing description"
        }
      ],
      "sass": [
        {
          "name": "$menu-content-border-radius",
          "default": "$border-radius-root !default;",
          "description": "Missing description"
        },
        {
          "name": "$menu-content-elevation",
          "default": "8 !default;",
          "description": "Missing description"
        }
      ]
    },
    "v-navigation-drawer": {
      "props": [
        {
          "name": "absolute",
          "type": "boolean",
          "default": "false",
          "source": "positionable",
          "description": "Missing description"
        },
        {
          "name": "app",
          "type": "boolean",
          "default": "false",
          "source": "applicationable",
          "description": "Missing description"
        },
        {
          "name": "clipped",
          "type": "boolean",
          "default": "false",
          "source": "v-navigation-drawer",
          "description": "Missing description"
        },
        {
          "name": "dark",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "disableResizeWatcher",
          "type": "boolean",
          "default": "false",
          "source": "v-navigation-drawer",
          "description": "Missing description"
        },
        {
          "name": "disableRouteWatcher",
          "type": "boolean",
          "default": "false",
          "source": "v-navigation-drawer",
          "description": "Missing description"
        },
        {
          "name": "fixed",
          "type": "boolean",
          "default": "false",
          "source": "positionable",
          "description": "Missing description"
        },
        {
          "name": "floating",
          "type": "boolean",
          "default": "false",
          "source": "v-navigation-drawer",
          "description": "Missing description"
        },
        {
          "name": "height",
          "type": [
            "number",
            "string"
          ],
          "default": "100%",
          "source": "v-navigation-drawer",
          "description": "Missing description"
        },
        {
          "name": "hideOverlay",
          "type": "boolean",
          "default": "false",
          "source": "overlayable",
          "description": "Missing description"
        },
        {
          "name": "light",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "miniVariant",
          "type": "boolean",
          "default": "false",
          "source": "v-navigation-drawer",
          "description": "Missing description"
        },
        {
          "name": "miniVariantWidth",
          "type": [
            "number",
            "string"
          ],
          "default": 80,
          "source": "v-navigation-drawer",
          "description": "Missing description"
        },
        {
          "name": "mobileBreakPoint",
          "type": [
            "number",
            "string"
          ],
          "default": 1264,
          "source": "v-navigation-drawer",
          "description": "Missing description"
        },
        {
          "name": "permanent",
          "type": "boolean",
          "default": "false",
          "source": "v-navigation-drawer",
          "description": "Missing description"
        },
        {
          "name": "right",
          "type": "boolean",
          "default": "false",
          "source": "v-navigation-drawer",
          "description": "Missing description"
        },
        {
          "name": "stateless",
          "type": "boolean",
          "default": "false",
          "source": "v-navigation-drawer",
          "description": "Missing description"
        },
        {
          "name": "temporary",
          "type": "boolean",
          "default": "false",
          "source": "v-navigation-drawer",
          "description": "Missing description"
        },
        {
          "name": "touchless",
          "type": "boolean",
          "default": "false",
          "source": "v-navigation-drawer",
          "description": "Missing description"
        },
        {
          "name": "value",
          "type": "any",
          "default": "undefined",
          "source": "v-navigation-drawer",
          "description": "Missing description"
        },
        {
          "name": "width",
          "type": [
            "number",
            "string"
          ],
          "default": 300,
          "source": "v-navigation-drawer",
          "description": "Missing description"
        }
      ],
      "mixins": [
        "applicationable",
        "positionable",
        "dependent",
        "overlayable",
        "ssr-bootable",
        "themeable"
      ],
      "slots": [
        {
          "name": "append",
          "description": "Missing description"
        },
        {
          "name": "img",
          "props": {
            "height": "string",
            "src": "string | srcObject"
          },
          "description": "Missing description"
        },
        {
          "name": "prepend",
          "description": "Missing description"
        },
        {
          "name": "default",
          "description": "Missing description"
        }
      ],
      "events": [
        {
          "name": "input",
          "value": "boolean",
          "description": "Missing description"
        },
        {
          "name": "transitionend",
          "value": "object",
          "description": "Missing description"
        },
        {
          "name": "update:mini-variant",
          "value": "boolean",
          "description": "Missing description"
        }
      ],
      "sass": [
        {
          "name": "$navigation-drawer-border-width",
          "default": "1px !default;",
          "description": "Missing description"
        },
        {
          "name": "$navigation-drawer-mobile-temporary-elevation",
          "default": "16 !default;",
          "description": "Missing description"
        }
      ]
    },
    "v-overflow-btn": {
      "props": [
        {
          "name": "allowOverflow",
          "type": "boolean",
          "default": "true",
          "source": "v-autocomplete",
          "description": "Allow the menu to overflow off the screen"
        },
        {
          "name": "appendIcon",
          "type": "string",
          "default": "'$vuetify.icons.dropdown'",
          "source": "v-input",
          "description": "Appends an icon to the component, uses the same syntax as `v-icon`"
        },
        {
          "name": "appendIconCb",
          "type": "function",
          "default": "null",
          "source": "v-input",
          "description": "Missing description"
        },
        {
          "name": "appendOuterIcon",
          "type": "string",
          "default": "undefined",
          "source": "v-text-field",
          "description": "Appends an icon to the outside the component's input, uses same syntax as `v-icon`"
        },
        {
          "name": "appendOuterIconCb",
          "type": "function",
          "default": "null",
          "source": "v-text-field",
          "description": "Missing description"
        },
        {
          "name": "attach",
          "type": "any",
          "default": false,
          "source": "v-select",
          "description": "Mixins.Detachable.props.attach"
        },
        {
          "name": "autoSelectFirst",
          "type": "boolean",
          "default": "false",
          "source": "v-autocomplete",
          "description": "When searching, will always highlight the first option"
        },
        {
          "name": "autofocus",
          "type": "boolean",
          "default": "false",
          "source": "v-text-field",
          "description": "Enables autofocus"
        },
        {
          "name": "backgroundColor",
          "type": "string",
          "default": "undefined",
          "source": "v-input",
          "description": "Changes the background-color of the input"
        },
        {
          "name": "box",
          "type": "boolean",
          "default": "false",
          "source": "v-text-field",
          "description": "Missing description"
        },
        {
          "name": "browserAutocomplete",
          "type": "string",
          "default": "'off'",
          "source": "v-text-field",
          "description": "Missing description"
        },
        {
          "name": "cacheItems",
          "type": "boolean",
          "default": "false",
          "source": "v-select",
          "description": "Keeps a local _unique_ copy of all items that have been passed through the **items** prop."
        },
        {
          "name": "chips",
          "type": "boolean",
          "default": "false",
          "source": "v-select",
          "description": "Changes display of selections to chips"
        },
        {
          "name": "clearIcon",
          "type": "string",
          "default": "'$vuetify.icons.clear'",
          "source": "v-text-field",
          "description": "Applied when using **clearable** and the input is dirty"
        },
        {
          "name": "clearIconCb",
          "type": "function",
          "default": "null",
          "source": "v-text-field",
          "description": "Missing description"
        },
        {
          "name": "clearable",
          "type": "boolean",
          "default": "false",
          "source": "v-text-field",
          "description": "Missing description"
        },
        {
          "name": "color",
          "type": "string",
          "default": "'primary'",
          "source": "colorable",
          "description": "Missing description"
        },
        {
          "name": "counter",
          "type": [
            "boolean",
            "number",
            "string"
          ],
          "default": "undefined",
          "source": "v-text-field",
          "description": "Creates counter for input length; if no number is specified, it defaults to 25. Does not apply any validation."
        },
        {
          "name": "dark",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "deletableChips",
          "type": "boolean",
          "default": "false",
          "source": "v-select",
          "description": "Adds a remove icon to selected chips"
        },
        {
          "name": "dense",
          "type": "boolean",
          "default": "false",
          "source": "v-select",
          "description": "Missing description"
        },
        {
          "name": "disabled",
          "type": "boolean",
          "default": false,
          "source": "validatable",
          "value": "boolean",
          "description": "Missing description"
        },
        {
          "name": "dontFillMaskBlanks",
          "type": "boolean",
          "default": "false",
          "source": "maskable",
          "description": "Missing description"
        },
        {
          "name": "editable",
          "type": "boolean",
          "default": "false",
          "source": "v-overflow-btn",
          "description": "Creates an editable button"
        },
        {
          "name": "error",
          "type": "boolean",
          "default": "false",
          "source": "validatable",
          "description": "Missing description"
        },
        {
          "name": "errorCount",
          "type": [
            "number",
            "string"
          ],
          "default": 1,
          "source": "validatable",
          "description": "Missing description"
        },
        {
          "name": "errorMessages",
          "type": [
            "string",
            "array"
          ],
          "default": [],
          "source": "validatable",
          "description": "Missing description"
        },
        {
          "name": "filter",
          "type": "function",
          "default": "(item: object, queryText: string, itemText: string): boolean",
          "source": "v-select",
          "description": "The function used for filtering items"
        },
        {
          "name": "flat",
          "type": "boolean",
          "default": "false",
          "source": "v-text-field",
          "description": "Mixins.Soloable.props.flat"
        },
        {
          "name": "fullWidth",
          "type": "boolean",
          "default": "false",
          "source": "v-text-field",
          "description": "Designates input type as full-width"
        },
        {
          "name": "height",
          "type": [
            "number",
            "string"
          ],
          "default": "undefined",
          "source": "v-input",
          "description": "Sets the height of the input"
        },
        {
          "name": "hideDetails",
          "type": "boolean",
          "default": "false",
          "source": "v-input",
          "description": "Hides hint and validation errors. When set to `auto` messages will be rendered only if there's a message (hint, error message, counter value etc) to display"
        },
        {
          "name": "hideNoData",
          "type": "boolean",
          "default": "false",
          "source": "v-autocomplete",
          "description": "Hides the menu when there are no options to show.  Useful for preventing the menu from opening before results are fetched asynchronously.  Also has the effect of opening the menu when the `items` array changes if not already open."
        },
        {
          "name": "hideSelected",
          "type": "boolean",
          "default": "false",
          "source": "v-select",
          "description": "Do not display in the select menu items that are already selected"
        },
        {
          "name": "hint",
          "type": "string",
          "default": "undefined",
          "source": "v-input",
          "description": "Hint text"
        },
        {
          "name": "itemAvatar",
          "type": [
            "string",
            "array",
            "function"
          ],
          "default": "avatar",
          "source": "v-select",
          "description": "Missing description"
        },
        {
          "name": "itemDisabled",
          "type": [
            "string",
            "array",
            "function"
          ],
          "default": "disabled",
          "source": "v-select",
          "description": "Set property of **items**'s disabled value"
        },
        {
          "name": "itemText",
          "type": [
            "string",
            "array",
            "function"
          ],
          "default": "text",
          "source": "v-select",
          "description": "Set property of **items**'s text value"
        },
        {
          "name": "itemValue",
          "type": [
            "string",
            "array",
            "function"
          ],
          "default": "value",
          "source": "v-select",
          "description": "Set property of **items**'s value - **must be primitive**. Dot notation is supported. **Note:** This is currently not supported with `v-combobox` [GitHub Issue](https://github.com/vuetifyjs/vuetify/issues/5479)"
        },
        {
          "name": "items",
          "type": "array",
          "default": [],
          "source": "v-select",
          "example": {
            "text": "string | number | object",
            "value": "string | number | object",
            "disabled": "boolean",
            "divider": "boolean",
            "header": "string"
          },
          "description": "Can be an array of objects or array of strings. When using objects, will look for a text, value and disabled keys. This can be changed using the **item-text**, **item-value** and **item-disabled** props.  Objects that have a **header** or **divider** property are considered special cases and generate a list header or divider; these items are not selectable."
        },
        {
          "name": "label",
          "type": "string",
          "source": "v-input",
          "description": "Sets input label"
        },
        {
          "name": "light",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "loading",
          "type": [
            "boolean",
            "string"
          ],
          "default": false,
          "source": "v-input",
          "description": "Mixins.Loadable.props.loading"
        },
        {
          "name": "mask",
          "type": [
            "object",
            "string"
          ],
          "default": "undefined",
          "source": "maskable",
          "description": "Missing description"
        },
        {
          "name": "menuProps",
          "type": [
            "string",
            "array",
            "object"
          ],
          "default": "{ \"closeOnClick\": false, \"closeOnContentClick\": false, \"disableKeys\": true, \"openOnClick\": false, \"maxHeight\": 304 }",
          "source": "v-select",
          "description": "Pass props through to the `v-menu` component. Accepts either a string for boolean props `menu-props=\"auto, overflowY\"`, or an object `:menu-props=\"{ auto: true, overflowY: true }\"`"
        },
        {
          "name": "messages",
          "type": [
            "string",
            "array"
          ],
          "default": [],
          "source": "validatable",
          "description": "Missing description"
        },
        {
          "name": "multiple",
          "type": "boolean",
          "default": "false",
          "source": "v-select",
          "description": "Changes select to multiple. Accepts array for value"
        },
        {
          "name": "noDataText",
          "type": "string",
          "default": "'$vuetify.noDataText'",
          "source": "filterable",
          "description": "Missing description"
        },
        {
          "name": "noFilter",
          "type": "boolean",
          "default": "false",
          "source": "v-autocomplete",
          "description": "Do not apply filtering when searching. Useful when data is being filtered server side"
        },
        {
          "name": "openOnClear",
          "type": "boolean",
          "default": "false",
          "source": "v-select",
          "description": "When using the **clearable** prop, once cleared, the select menu will either open or stay open, depending on the current state"
        },
        {
          "name": "outline",
          "type": "boolean",
          "default": "false",
          "source": "v-text-field",
          "description": "Missing description"
        },
        {
          "name": "persistentHint",
          "type": "boolean",
          "default": "false",
          "source": "v-input",
          "description": "Forces hint to always be visible"
        },
        {
          "name": "placeholder",
          "type": "string",
          "default": "undefined",
          "source": "v-text-field",
          "description": "Sets the input’s placeholder text"
        },
        {
          "name": "prefix",
          "type": "string",
          "default": "undefined",
          "source": "v-text-field",
          "description": "Displays prefix text"
        },
        {
          "name": "prependIcon",
          "type": "string",
          "default": "undefined",
          "source": "v-input",
          "description": "Prepends an icon to the component, uses the same syntax as `v-icon`"
        },
        {
          "name": "prependIconCb",
          "type": "function",
          "default": "null",
          "source": "v-input",
          "description": "Missing description"
        },
        {
          "name": "prependInnerIcon",
          "type": "string",
          "default": "undefined",
          "source": "v-text-field",
          "description": "Prepends an icon inside the component's input, uses the same syntax as `v-icon`"
        },
        {
          "name": "prependInnerIconCb",
          "type": "function",
          "default": "null",
          "source": "v-text-field",
          "description": "Missing description"
        },
        {
          "name": "readonly",
          "type": "boolean",
          "default": false,
          "source": "validatable",
          "value": "boolean",
          "description": "Missing description"
        },
        {
          "name": "returnMaskedValue",
          "type": "boolean",
          "default": "false",
          "source": "maskable",
          "description": "Missing description"
        },
        {
          "name": "returnObject",
          "type": "boolean",
          "default": "false",
          "source": "v-select",
          "description": "Changes the selection behavior to return the object directly rather than the value specified with **item-value**"
        },
        {
          "name": "reverse",
          "type": "boolean",
          "default": "false",
          "source": "v-text-field",
          "description": "Reverses the input orientation"
        },
        {
          "name": "rules",
          "type": "array",
          "default": [],
          "source": "validatable",
          "description": "Missing description"
        },
        {
          "name": "searchInput",
          "type": "any",
          "default": "undefined",
          "source": "v-select",
          "description": "Use the **.sync** modifier to catch user input from the search input"
        },
        {
          "name": "segmented",
          "type": "boolean",
          "default": "false",
          "source": "v-overflow-btn",
          "description": "Creates a segmented button"
        },
        {
          "name": "singleLine",
          "type": "boolean",
          "default": "false",
          "source": "v-text-field",
          "description": "Missing description"
        },
        {
          "name": "smallChips",
          "type": "boolean",
          "default": "false",
          "source": "v-select",
          "description": "Changes display of selections to chips with the **small** property"
        },
        {
          "name": "solo",
          "type": "boolean",
          "default": "false",
          "source": "v-text-field",
          "description": "Mixins.Soloable.props.solo"
        },
        {
          "name": "soloInverted",
          "type": "boolean",
          "default": "false",
          "source": "v-text-field",
          "description": "Mixins.Soloable.props.soloInverted"
        },
        {
          "name": "success",
          "type": "boolean",
          "default": "false",
          "source": "validatable",
          "description": "Missing description"
        },
        {
          "name": "successMessages",
          "type": [
            "string",
            "array"
          ],
          "default": [],
          "source": "validatable",
          "description": "Missing description"
        },
        {
          "name": "suffix",
          "type": "string",
          "default": "undefined",
          "source": "v-text-field",
          "description": "Displays suffix text"
        },
        {
          "name": "transition",
          "type": "any",
          "default": "undefined",
          "source": "v-overflow-btn",
          "description": "Missing description"
        },
        {
          "name": "type",
          "type": "string",
          "default": "'text'",
          "source": "v-text-field",
          "description": "Sets input type"
        },
        {
          "name": "validateOnBlur",
          "type": "boolean",
          "default": "false",
          "source": "validatable",
          "description": "Missing description"
        },
        {
          "name": "value",
          "type": "any",
          "source": "v-input",
          "description": "The input's value"
        },
        {
          "name": "valueComparator",
          "type": "function",
          "default": "(a: any, b: any): boolean",
          "source": "v-select",
          "description": "The comparison algorithm used for values. [More info](https://github.com/vuetifyjs/vuetify/blob/master/packages/vuetify/src/util/helpers.ts)"
        }
      ],
      "mixins": [
        "comparable",
        "filterable"
      ],
      "events": [
        {
          "name": "update:error",
          "source": "validatable",
          "value": "boolean",
          "description": "Missing description"
        },
        {
          "name": "click",
          "source": "v-input",
          "value": "MouseEvent",
          "description": "Missing description"
        },
        {
          "name": "mousedown",
          "source": "v-input",
          "value": "MouseEvent",
          "description": "Missing description"
        },
        {
          "name": "mouseup",
          "source": "v-input",
          "value": "MouseEvent",
          "description": "Missing description"
        },
        {
          "name": "click:append",
          "source": "v-input",
          "value": "Event",
          "description": "Missing description"
        },
        {
          "name": "click:prepend",
          "source": "v-input",
          "value": "Event",
          "description": "Missing description"
        },
        {
          "name": "blur",
          "source": "v-text-field",
          "value": "Event",
          "description": "Emitted when the input is blurred"
        },
        {
          "name": "click:clear",
          "source": "v-text-field",
          "value": "Event",
          "description": "Emitted when clearable icon clicked"
        },
        {
          "name": "click:append-outer",
          "source": "v-text-field",
          "value": "Event",
          "description": "Emitted when appended outer icon is clicked"
        },
        {
          "name": "click:prepend-inner",
          "source": "v-text-field",
          "value": "Event",
          "description": "Emitted when prepended inner icon is clicked"
        },
        {
          "name": "focus",
          "source": "v-text-field",
          "value": "Event",
          "description": "Emitted when component is focused"
        },
        {
          "name": "change",
          "source": "v-text-field",
          "value": "any",
          "description": "Emitted when the input is changed by user interaction"
        },
        {
          "name": "input",
          "source": "v-text-field",
          "value": "any",
          "description": "Missing description"
        },
        {
          "name": "keydown",
          "source": "v-text-field",
          "value": "KeyboardEvent",
          "description": "Emitted when **any** key is pressed"
        },
        {
          "name": "update:search-input",
          "source": "v-select",
          "value": "string",
          "description": "The `search-input.sync` event"
        },
        {
          "name": "update:list-index",
          "source": "v-select",
          "value": "number",
          "description": "Emitted when menu item is selected using keyboard arrows"
        }
      ],
      "slots": [
        {
          "name": "append",
          "source": "v-input",
          "description": "Missing description"
        },
        {
          "name": "default",
          "source": "v-input",
          "description": "Missing description"
        },
        {
          "name": "prepend",
          "source": "v-input",
          "description": "Missing description"
        },
        {
          "name": "label",
          "source": "v-input",
          "description": "Missing description"
        },
        {
          "name": "message",
          "props": {
            "key": "number, // the messages index",
            "message": "string, // the message"
          },
          "source": "v-input",
          "description": "Missing description"
        },
        {
          "name": "append-outer",
          "source": "v-text-field",
          "description": "Adds an item outside the input and after input content"
        },
        {
          "name": "prepend-inner",
          "source": "v-text-field",
          "description": "Adds an item inside the input and before input content"
        },
        {
          "name": "progress",
          "source": "v-text-field",
          "description": "Missing description"
        },
        {
          "name": "append-item",
          "source": "v-select",
          "description": "Adds an item after menu content"
        },
        {
          "name": "prepend-item",
          "source": "v-select",
          "description": "Adds an item before menu content"
        },
        {
          "name": "item",
          "props": {
            "parent": "VueComponent",
            "item": "object",
            "on": "object // Only needed when providing your own v-list-item",
            "attrs": "object // Only needed when providing your own v-list-item"
          },
          "source": "v-select",
          "description": "Define a custom item appearance"
        },
        {
          "name": "no-data",
          "source": "v-select",
          "description": "Mixins.Filterable.slots.noData"
        },
        {
          "name": "selection",
          "props": {
            "parent": "VueComponent",
            "item": "object",
            "index": "number",
            "select": "function",
            "selected": "boolean",
            "disabled": "boolean"
          },
          "source": "v-select",
          "description": "Define a custom selection appearance"
        }
      ],
      "sass": [
        {
          "name": "$overflow-active-slot-border-radius",
          "default": "$border-radius-root $border-radius-root 0 0 !default;",
          "description": "Missing description"
        },
        {
          "name": "$overflow-append-inner-height",
          "default": "48px !default;",
          "description": "Missing description"
        },
        {
          "name": "$overflow-append-inner-width",
          "default": "42px !default;",
          "description": "Missing description"
        },
        {
          "name": "$overflow-append-prepend-margin-bottom",
          "default": "12px !default;",
          "description": "Missing description"
        },
        {
          "name": "$overflow-append-prepend-margin-top",
          "default": "12px !default;",
          "description": "Missing description"
        },
        {
          "name": "$overflow-dense-input-margin-x",
          "default": "16px !default;",
          "description": "Missing description"
        },
        {
          "name": "$overflow-dense-slot-height",
          "default": "38px !default;",
          "description": "Missing description"
        },
        {
          "name": "$overflow-focused-active-border-radius",
          "default": "$border-radius-root !default;",
          "description": "Missing description"
        },
        {
          "name": "$overflow-focused-active-slot-box-shadow",
          "default": "0 1px 6px 0 rgba(32,33,36,0.28) !default;",
          "description": "Missing description"
        },
        {
          "name": "$overflow-focused-active-slot-elevation",
          "default": "2 !default;",
          "description": "Missing description"
        },
        {
          "name": "$overflow-input-slot-border-width",
          "default": "2px 0 !default;",
          "description": "Missing description"
        },
        {
          "name": "$overflow-label-margin-x",
          "default": "16px !default;",
          "description": "Missing description"
        },
        {
          "name": "$overflow-label-top",
          "default": "calc(50% - 10px) !default;",
          "description": "Missing description"
        },
        {
          "name": "$overflow-margin-top",
          "default": "12px !default;",
          "description": "Missing description"
        },
        {
          "name": "$overflow-menu-content-box-shadow",
          "default": "0 4px 6px 0 rgba(32,33,36,0.28) !default;",
          "description": "Missing description"
        },
        {
          "name": "$overflow-menu-content-select-list-border-radius",
          "default": "0 0 $border-radius-root $border-radius-root !default;",
          "description": "Missing description"
        },
        {
          "name": "$overflow-segmented-input-slot-border-width",
          "default": "thin 0 !default;",
          "description": "Missing description"
        },
        {
          "name": "$overflow-segmented-selections-btn-height",
          "default": "48px !default;",
          "description": "Missing description"
        },
        {
          "name": "$overflow-segmented-selections-btn-margin-x",
          "default": "-16px !default;",
          "description": "Missing description"
        },
        {
          "name": "$overflow-selection-comma-margin-x",
          "default": "16px !default;",
          "description": "Missing description"
        },
        {
          "name": "$overflow-slot-height",
          "default": "48px !default;",
          "description": "Missing description"
        },
        {
          "name": "$overflow-editable-select-slot-padding",
          "default": "8px 16px !default;",
          "description": "Missing description"
        }
      ]
    },
    "v-pagination": {
      "props": [
        {
          "name": "circle",
          "type": "boolean",
          "default": "false",
          "source": "v-pagination",
          "description": "Shape pagination elements as circles"
        },
        {
          "name": "color",
          "type": "string",
          "default": "undefined",
          "source": "colorable",
          "description": "Missing description"
        },
        {
          "name": "dark",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "disabled",
          "type": "boolean",
          "default": "false",
          "source": "v-pagination",
          "description": "Disables component"
        },
        {
          "name": "length",
          "type": "number",
          "default": 0,
          "source": "v-pagination",
          "description": "The length of the pagination component"
        },
        {
          "name": "light",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "nextIcon",
          "type": "string",
          "default": "'$vuetify.icons.next'",
          "source": "v-pagination",
          "description": "Specify the icon to use for the next icon"
        },
        {
          "name": "prevIcon",
          "type": "string",
          "default": "'$vuetify.icons.prev'",
          "source": "v-pagination",
          "description": "Specify the icon to use for the prev icon"
        },
        {
          "name": "totalVisible",
          "type": [
            "number",
            "string"
          ],
          "default": "undefined",
          "source": "v-pagination",
          "description": "Specify the max total visible pagination numbers"
        },
        {
          "name": "value",
          "type": "number",
          "default": 0,
          "source": "v-pagination",
          "description": "Current selected page"
        }
      ],
      "mixins": [
        "colorable",
        "themeable"
      ],
      "events": [
        {
          "name": "input",
          "value": "number",
          "description": "Missing description"
        },
        {
          "name": "next",
          "value": "void",
          "description": "Missing description"
        },
        {
          "name": "previous",
          "value": "void",
          "description": "Missing description"
        }
      ],
      "sass": [
        {
          "name": "$pagination-border-radius",
          "default": "$border-radius-root !default;",
          "description": "Missing description"
        },
        {
          "name": "$pagination-disabled-opacity",
          "default": "0.6 !default;",
          "description": "Missing description"
        },
        {
          "name": "$pagination-item-font-size",
          "default": "map-deep-get($headings, 'subtitle-1', 'size') !default;",
          "description": "Missing description"
        },
        {
          "name": "$pagination-item-height",
          "default": "34px !default;",
          "description": "Missing description"
        },
        {
          "name": "$pagination-item-margin",
          "default": ".3rem !default;",
          "description": "Missing description"
        },
        {
          "name": "$pagination-item-min-width",
          "default": "34px !default;",
          "description": "Missing description"
        },
        {
          "name": "$pagination-item-padding",
          "default": "0 5px !default;",
          "description": "Missing description"
        },
        {
          "name": "$pagination-more-height",
          "default": "32px !default;",
          "description": "Missing description"
        },
        {
          "name": "$pagination-more-margin",
          "default": ".3rem !default;",
          "description": "Missing description"
        },
        {
          "name": "$pagination-more-width",
          "default": "32px !default;",
          "description": "Missing description"
        },
        {
          "name": "$pagination-navigation-disabled-opacity",
          "default": "0.6 !default;",
          "description": "Missing description"
        },
        {
          "name": "$pagination-navigation-height",
          "default": "32px !default;",
          "description": "Missing description"
        },
        {
          "name": "$pagination-navigation-margin",
          "default": ".3rem 10px !default;",
          "description": "Missing description"
        },
        {
          "name": "$pagination-navigation-width",
          "default": "32px !default;",
          "description": "Missing description"
        }
      ]
    },
    "v-sheet": {
      "props": [
        {
          "name": "color",
          "type": "string",
          "default": "undefined",
          "source": "colorable",
          "description": "Missing description"
        },
        {
          "name": "dark",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "elevation",
          "type": [
            "number",
            "string"
          ],
          "default": "undefined",
          "source": "elevatable",
          "description": "Missing description"
        },
        {
          "name": "height",
          "type": [
            "number",
            "string"
          ],
          "default": "undefined",
          "source": "measurable",
          "description": "Missing description"
        },
        {
          "name": "light",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "maxHeight",
          "type": [
            "number",
            "string"
          ],
          "default": "undefined",
          "source": "measurable",
          "description": "Missing description"
        },
        {
          "name": "maxWidth",
          "type": [
            "number",
            "string"
          ],
          "default": "undefined",
          "source": "measurable",
          "description": "Missing description"
        },
        {
          "name": "minHeight",
          "type": [
            "number",
            "string"
          ],
          "default": "undefined",
          "source": "measurable",
          "description": "Missing description"
        },
        {
          "name": "minWidth",
          "type": [
            "number",
            "string"
          ],
          "default": "undefined",
          "source": "measurable",
          "description": "Missing description"
        },
        {
          "name": "tag",
          "type": "string",
          "default": "div",
          "source": "v-sheet",
          "description": "Specify a custom tag used on the root element."
        },
        {
          "name": "tile",
          "type": "boolean",
          "default": "false",
          "source": "v-sheet",
          "description": "Missing description"
        },
        {
          "name": "width",
          "type": [
            "number",
            "string"
          ],
          "default": "undefined",
          "source": "measurable",
          "description": "Missing description"
        }
      ],
      "mixins": [
        "colorable",
        "elevatable",
        "measurable",
        "themeable"
      ],
      "slots": [
        {
          "name": "default",
          "description": "Missing description"
        }
      ],
      "sass": [
        {
          "name": "$sheet-border-radius",
          "default": "0 !default;",
          "description": "Missing description"
        },
        {
          "name": "$sheet-elevation",
          "default": "0 !default;",
          "description": "Missing description"
        },
        {
          "name": "$sheet-outlined-border-width",
          "default": "thin !default;",
          "description": "Missing description"
        },
        {
          "name": "$sheet-shaped-border-radius",
          "default": "map-get($rounded, 'xl') $sheet-border-radius !default;",
          "description": "Missing description"
        }
      ]
    },
    "v-parallax": {
      "props": [
        {
          "name": "alt",
          "type": "string",
          "default": "undefined",
          "source": "v-parallax",
          "description": "Attaches an alt property to the parallax image"
        },
        {
          "name": "height",
          "type": [
            "string",
            "number"
          ],
          "default": 500,
          "source": "translatable",
          "description": "Missing description"
        },
        {
          "name": "src",
          "type": "string",
          "default": "undefined",
          "source": "v-parallax",
          "description": "The image to parallax"
        }
      ],
      "mixins": [
        "translatable"
      ],
      "slots": [
        {
          "name": "default",
          "description": "Missing description"
        }
      ],
      "sass": [
        {
          "name": "$parallax-transition",
          "default": ".3s opacity map-get($transition, 'swing') !default;",
          "description": "Missing description"
        },
        {
          "name": "$parallax-padding",
          "default": "0 1rem !default;",
          "description": "Missing description"
        }
      ]
    },
    "v-picker": {
      "props": [
        {
          "name": "color",
          "type": "string",
          "default": "undefined",
          "source": "colorable",
          "description": "Missing description"
        },
        {
          "name": "dark",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "fullWidth",
          "type": "boolean",
          "default": "false",
          "source": "v-picker",
          "description": "Missing description"
        },
        {
          "name": "landscape",
          "type": "boolean",
          "default": "false",
          "source": "v-picker",
          "description": "Missing description"
        },
        {
          "name": "light",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "transition",
          "type": "string",
          "default": "'fade-transition'",
          "source": "v-picker",
          "description": "Missing description"
        },
        {
          "name": "width",
          "type": [
            "number",
            "string"
          ],
          "default": 290,
          "source": "v-picker",
          "description": "Missing description"
        }
      ],
      "mixins": [
        "colorable",
        "themeable"
      ],
      "sass": [
        {
          "name": "$picker-border-radius",
          "default": "$border-radius-root !default;",
          "description": "Missing description"
        },
        {
          "name": "$picker-title-padding",
          "default": "16px !default;",
          "description": "Missing description"
        },
        {
          "name": "$picker-inactive-btn-opacity",
          "default": ".6 !default;",
          "description": "Missing description"
        },
        {
          "name": "$picker-active-btn-opacity",
          "default": "1 !default;",
          "description": "Missing description"
        },
        {
          "name": "$picker-landscape-title-width",
          "default": "170px !default;",
          "description": "Missing description"
        },
        {
          "name": "$picker-font-size",
          "default": "1rem !default;",
          "description": "Missing description"
        }
      ]
    },
    "v-progress-circular": {
      "props": [
        {
          "name": "button",
          "type": "boolean",
          "default": "false",
          "source": "v-progress-circular",
          "description": "Deprecated - Pending removal"
        },
        {
          "name": "color",
          "type": "string",
          "default": "undefined",
          "source": "colorable",
          "description": "Missing description"
        },
        {
          "name": "indeterminate",
          "type": "boolean",
          "default": "false",
          "source": "v-progress-circular",
          "description": "Constantly animates, use when loading progress is unknown."
        },
        {
          "name": "rotate",
          "type": [
            "number",
            "string"
          ],
          "default": 0,
          "source": "v-progress-circular",
          "description": "Rotates the circle start point in deg"
        },
        {
          "name": "size",
          "type": [
            "number",
            "string"
          ],
          "default": 32,
          "source": "v-progress-circular",
          "description": "Sets the diameter of the circle in pixels"
        },
        {
          "name": "value",
          "type": [
            "number",
            "string"
          ],
          "default": 0,
          "source": "v-progress-circular",
          "description": "The percentage value for current progress"
        },
        {
          "name": "width",
          "type": [
            "number",
            "string"
          ],
          "default": 4,
          "source": "v-progress-circular",
          "description": "Sets the stroke of the circle in pixels"
        }
      ],
      "mixins": [
        "colorable"
      ],
      "slots": [
        {
          "name": "default",
          "props": {
            "value": "number"
          },
          "description": "Missing description"
        }
      ],
      "sass": [
        {
          "name": "$progress-circular-rotate-animation",
          "default": "progress-circular-rotate 1.4s linear infinite !default;",
          "description": "Missing description"
        },
        {
          "name": "$progress-circular-rotate-dash",
          "default": "progress-circular-dash 1.4s ease-in-out infinite !default;",
          "description": "Missing description"
        },
        {
          "name": "$process-circular-intermediate-svg-transition",
          "default": "all .2s ease-in-out !default;",
          "description": "Missing description"
        },
        {
          "name": "$progress-circular-underlay-stroke",
          "default": "rgba(map-get($shades, 'black'), 0.1) !default;",
          "description": "Missing description"
        },
        {
          "name": "$progress-circular-overlay-transition",
          "default": "all .6s ease-in-out !default;",
          "description": "Missing description"
        }
      ]
    },
    "v-progress-linear": {
      "props": [
        {
          "name": "active",
          "type": "boolean",
          "default": "true",
          "source": "v-progress-linear",
          "description": "Components.ProgressCircular.props.active"
        },
        {
          "name": "backgroundColor",
          "type": "string",
          "default": "undefined",
          "source": "v-progress-linear",
          "description": "Components.ProgressCircular.props.backgroundColor"
        },
        {
          "name": "backgroundOpacity",
          "type": [
            "number",
            "string"
          ],
          "default": "undefined",
          "source": "v-progress-linear",
          "description": "Components.ProgressCircular.props.backgroundOpacity"
        },
        {
          "name": "bufferValue",
          "type": [
            "number",
            "string"
          ],
          "default": 100,
          "source": "v-progress-linear",
          "description": "Components.ProgressCircular.props.bufferValue"
        },
        {
          "name": "color",
          "type": "string",
          "default": "'primary'",
          "source": "colorable",
          "description": "Missing description"
        },
        {
          "name": "height",
          "type": [
            "number",
            "string"
          ],
          "default": 7,
          "source": "v-progress-linear",
          "description": "Mixins.Measurable.props.height"
        },
        {
          "name": "indeterminate",
          "type": "boolean",
          "default": "false",
          "source": "v-progress-linear",
          "description": "Components.ProgressCircular.props.indeterminate"
        },
        {
          "name": "query",
          "type": "boolean",
          "default": "false",
          "source": "v-progress-linear",
          "description": "Animates like **indeterminate** prop but inverse"
        },
        {
          "name": "value",
          "type": [
            "number",
            "string"
          ],
          "default": 0,
          "source": "v-progress-linear",
          "description": "Components.ProgressCircular.props.value"
        }
      ],
      "mixins": [
        "colorable"
      ],
      "events": [
        {
          "name": "change",
          "value": "number",
          "description": "Missing description"
        }
      ],
      "slots": [
        {
          "name": "default",
          "props": {
            "value": "number"
          },
          "description": "Missing description"
        }
      ],
      "sass": [
        {
          "name": "$progress-linear-border-radius",
          "default": "$border-radius-root !default;",
          "description": "Missing description"
        },
        {
          "name": "$progress-linear-stream-opacity",
          "default": "0.3 !default;",
          "description": "Missing description"
        },
        {
          "name": "$progress-linear-stream-border-width",
          "default": "4px !default;",
          "description": "Missing description"
        },
        {
          "name": "$progress-linear-stripe-gradient",
          "default": "linear-gradient(\n  135deg,\n  hsla(0, 0%, 100%, .25) 25%,\n  transparent 0,\n  transparent 50%,\n  hsla(0, 0%, 100%, .25) 0,\n  hsla(0, 0%, 100%, .25) 75%,\n  transparent 0,\n  transparent\n) !default;",
          "description": "Missing description"
        },
        {
          "name": "$progress-linear-stripe-background-size",
          "default": "40px 40px !default;",
          "description": "Missing description"
        }
      ]
    },
    "v-radio-group": {
      "props": [
        {
          "name": "appendIcon",
          "type": "string",
          "default": "undefined",
          "source": "v-input",
          "description": "Appends an icon to the component, uses the same syntax as `v-icon`"
        },
        {
          "name": "appendIconCb",
          "type": "function",
          "default": "null",
          "source": "v-input",
          "description": "Missing description"
        },
        {
          "name": "backgroundColor",
          "type": "string",
          "default": "undefined",
          "source": "v-input",
          "description": "Changes the background-color of the input"
        },
        {
          "name": "color",
          "type": "string",
          "default": "undefined",
          "source": "colorable",
          "description": "Missing description"
        },
        {
          "name": "column",
          "type": "boolean",
          "default": "true",
          "source": "v-radio-group",
          "description": "Missing description"
        },
        {
          "name": "dark",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "disabled",
          "type": "boolean",
          "default": false,
          "source": "validatable",
          "value": "boolean",
          "description": "Missing description"
        },
        {
          "name": "error",
          "type": "boolean",
          "default": "false",
          "source": "validatable",
          "description": "Missing description"
        },
        {
          "name": "errorCount",
          "type": [
            "number",
            "string"
          ],
          "default": 1,
          "source": "validatable",
          "description": "Missing description"
        },
        {
          "name": "errorMessages",
          "type": [
            "string",
            "array"
          ],
          "default": [],
          "source": "validatable",
          "description": "Missing description"
        },
        {
          "name": "height",
          "type": [
            "number",
            "string"
          ],
          "default": "auto",
          "source": "v-input",
          "description": "Sets the height of the input"
        },
        {
          "name": "hideDetails",
          "type": "boolean",
          "default": "false",
          "source": "v-input",
          "description": "Hides hint and validation errors. When set to `auto` messages will be rendered only if there's a message (hint, error message, counter value etc) to display"
        },
        {
          "name": "hint",
          "type": "string",
          "default": "undefined",
          "source": "v-input",
          "description": "Hint text"
        },
        {
          "name": "label",
          "type": "string",
          "source": "v-input",
          "description": "Sets input label"
        },
        {
          "name": "light",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "loading",
          "type": "boolean",
          "default": "false",
          "source": "v-input",
          "description": "Mixins.Loadable.props.loading"
        },
        {
          "name": "mandatory",
          "type": "boolean",
          "default": "true",
          "source": "v-radio-group",
          "description": "Missing description"
        },
        {
          "name": "messages",
          "type": [
            "string",
            "array"
          ],
          "default": [],
          "source": "validatable",
          "description": "Missing description"
        },
        {
          "name": "name",
          "type": "string",
          "default": "undefined",
          "source": "v-radio-group",
          "description": "Missing description"
        },
        {
          "name": "persistentHint",
          "type": "boolean",
          "default": "false",
          "source": "v-input",
          "description": "Forces hint to always be visible"
        },
        {
          "name": "prependIcon",
          "type": "string",
          "default": "undefined",
          "source": "v-input",
          "description": "Prepends an icon to the component, uses the same syntax as `v-icon`"
        },
        {
          "name": "prependIconCb",
          "type": "function",
          "default": "null",
          "source": "v-input",
          "description": "Missing description"
        },
        {
          "name": "readonly",
          "type": "boolean",
          "default": false,
          "source": "validatable",
          "value": "boolean",
          "description": "Missing description"
        },
        {
          "name": "row",
          "type": "boolean",
          "default": "false",
          "source": "v-radio-group",
          "description": "Missing description"
        },
        {
          "name": "rules",
          "type": "array",
          "default": [],
          "source": "validatable",
          "description": "Missing description"
        },
        {
          "name": "success",
          "type": "boolean",
          "default": "false",
          "source": "validatable",
          "description": "Missing description"
        },
        {
          "name": "successMessages",
          "type": [
            "string",
            "array"
          ],
          "default": [],
          "source": "validatable",
          "description": "Missing description"
        },
        {
          "name": "validateOnBlur",
          "type": "boolean",
          "default": "false",
          "source": "validatable",
          "description": "Missing description"
        },
        {
          "name": "value",
          "type": "any",
          "source": "v-input",
          "description": "The input's value"
        },
        {
          "name": "valueComparator",
          "type": "function",
          "default": "null",
          "source": "comparable",
          "description": "Missing description"
        }
      ],
      "mixins": [
        "comparable",
        "registrable-provide"
      ],
      "events": [
        {
          "name": "update:error",
          "source": "validatable",
          "value": "boolean",
          "description": "Missing description"
        },
        {
          "name": "change",
          "value": "any",
          "description": "Missing description"
        },
        {
          "name": "mousedown",
          "source": "v-input",
          "value": "MouseEvent",
          "description": "Missing description"
        },
        {
          "name": "mouseup",
          "source": "v-input",
          "value": "MouseEvent",
          "description": "Missing description"
        },
        {
          "name": "click:append",
          "source": "v-input",
          "value": "Event",
          "description": "Missing description"
        },
        {
          "name": "click:prepend",
          "source": "v-input",
          "value": "Event",
          "description": "Missing description"
        }
      ],
      "slots": [
        {
          "name": "append",
          "source": "v-input",
          "description": "Missing description"
        },
        {
          "name": "default",
          "source": "v-input",
          "description": "Missing description"
        },
        {
          "name": "prepend",
          "source": "v-input",
          "description": "Missing description"
        },
        {
          "name": "label",
          "source": "v-input",
          "description": "Missing description"
        },
        {
          "name": "message",
          "props": {
            "key": "number, // the messages index",
            "message": "string, // the message"
          },
          "source": "v-input",
          "description": "Missing description"
        }
      ],
      "sass": [
        {
          "name": "$radio-margin-right",
          "default": "16px !default;",
          "description": "Missing description"
        },
        {
          "name": "$radio-group-padding",
          "default": "8px !default;",
          "description": "Missing description"
        }
      ]
    },
    "v-radio": {
      "props": [
        {
          "name": "color",
          "type": "string",
          "default": "'accent'",
          "source": "colorable",
          "description": "Missing description"
        },
        {
          "name": "dark",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "disabled",
          "type": "boolean",
          "default": false,
          "source": "validatable",
          "value": "boolean",
          "description": "Missing description"
        },
        {
          "name": "label",
          "type": "string",
          "source": "v-input",
          "description": "Sets input label"
        },
        {
          "name": "light",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "offIcon",
          "type": "string",
          "default": "'$vuetify.icons.radioOff'",
          "source": "v-radio",
          "description": "Missing description"
        },
        {
          "name": "onIcon",
          "type": "string",
          "default": "'$vuetify.icons.radioOn'",
          "source": "v-radio",
          "description": "Missing description"
        },
        {
          "name": "readonly",
          "type": "boolean",
          "default": false,
          "source": "validatable",
          "value": "boolean",
          "description": "Missing description"
        },
        {
          "name": "ripple",
          "type": [
            "boolean",
            "object"
          ],
          "default": true,
          "source": "rippleable",
          "description": "Missing description"
        },
        {
          "name": "value",
          "type": "any",
          "source": "v-input",
          "description": "The input's value"
        }
      ],
      "mixins": [
        "colorable",
        "rippleable",
        "registrable-inject",
        "themeable"
      ],
      "events": [
        {
          "name": "update:error",
          "source": "validatable",
          "value": "boolean",
          "description": "Missing description"
        },
        {
          "name": "change",
          "value": "any",
          "description": "Missing description"
        },
        {
          "name": "mousedown",
          "source": "v-input",
          "value": "MouseEvent",
          "description": "Missing description"
        },
        {
          "name": "mouseup",
          "source": "v-input",
          "value": "MouseEvent",
          "description": "Missing description"
        },
        {
          "name": "click:append",
          "source": "v-input",
          "value": "Event",
          "description": "Missing description"
        },
        {
          "name": "click:prepend",
          "source": "v-input",
          "value": "Event",
          "description": "Missing description"
        }
      ],
      "slots": [
        {
          "name": "append",
          "source": "v-input",
          "description": "Missing description"
        },
        {
          "name": "default",
          "source": "v-input",
          "description": "Missing description"
        },
        {
          "name": "prepend",
          "source": "v-input",
          "description": "Missing description"
        },
        {
          "name": "label",
          "source": "v-input",
          "description": "Missing description"
        },
        {
          "name": "message",
          "props": {
            "key": "number, // the messages index",
            "message": "string, // the message"
          },
          "source": "v-input",
          "description": "Missing description"
        }
      ],
      "sass": []
    },
    "v-range-slider": {
      "props": [
        {
          "name": "alwaysDirty",
          "type": "boolean",
          "default": "false",
          "source": "v-slider",
          "description": "When used with the **thumb-label** prop will always show the thumb label."
        },
        {
          "name": "appendIcon",
          "type": "string",
          "default": "undefined",
          "source": "v-input",
          "description": "Appends an icon to the component, uses the same syntax as `v-icon`"
        },
        {
          "name": "appendIconCb",
          "type": "function",
          "default": "null",
          "source": "v-input",
          "description": "Missing description"
        },
        {
          "name": "backgroundColor",
          "type": "string",
          "default": "undefined",
          "source": "v-input",
          "description": "Changes the background-color of the input"
        },
        {
          "name": "color",
          "type": "string",
          "default": "undefined",
          "source": "colorable",
          "description": "Missing description"
        },
        {
          "name": "dark",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "disabled",
          "type": "boolean",
          "default": false,
          "source": "validatable",
          "value": "boolean",
          "description": "Missing description"
        },
        {
          "name": "error",
          "type": "boolean",
          "default": "false",
          "source": "validatable",
          "description": "Missing description"
        },
        {
          "name": "errorCount",
          "type": [
            "number",
            "string"
          ],
          "default": 1,
          "source": "validatable",
          "description": "Missing description"
        },
        {
          "name": "errorMessages",
          "type": [
            "string",
            "array"
          ],
          "default": [],
          "source": "validatable",
          "description": "Missing description"
        },
        {
          "name": "height",
          "type": [
            "number",
            "string"
          ],
          "default": "undefined",
          "source": "v-input",
          "description": "Sets the height of the input"
        },
        {
          "name": "hideDetails",
          "type": "boolean",
          "default": "false",
          "source": "v-input",
          "description": "Hides hint and validation errors. When set to `auto` messages will be rendered only if there's a message (hint, error message, counter value etc) to display"
        },
        {
          "name": "hint",
          "type": "string",
          "default": "undefined",
          "source": "v-input",
          "description": "Hint text"
        },
        {
          "name": "inverseLabel",
          "type": "boolean",
          "default": "false",
          "source": "v-slider",
          "description": "Reverse the label position. Works with **rtl**."
        },
        {
          "name": "label",
          "type": "string",
          "source": "v-input",
          "description": "Sets input label"
        },
        {
          "name": "light",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "loading",
          "type": [
            "boolean",
            "string"
          ],
          "default": false,
          "source": "v-input",
          "description": "Mixins.Loadable.props.loading"
        },
        {
          "name": "max",
          "type": [
            "number",
            "string"
          ],
          "default": 100,
          "source": "v-slider",
          "description": "Sets the maximum allowed value"
        },
        {
          "name": "messages",
          "type": [
            "string",
            "array"
          ],
          "default": [],
          "source": "validatable",
          "description": "Missing description"
        },
        {
          "name": "min",
          "type": [
            "number",
            "string"
          ],
          "default": 0,
          "source": "v-slider",
          "description": "Sets the minimum allowed value"
        },
        {
          "name": "persistentHint",
          "type": "boolean",
          "default": "false",
          "source": "v-input",
          "description": "Forces hint to always be visible"
        },
        {
          "name": "prependIcon",
          "type": "string",
          "default": "undefined",
          "source": "v-input",
          "description": "Prepends an icon to the component, uses the same syntax as `v-icon`"
        },
        {
          "name": "prependIconCb",
          "type": "function",
          "default": "null",
          "source": "v-input",
          "description": "Missing description"
        },
        {
          "name": "readonly",
          "type": "boolean",
          "default": false,
          "source": "validatable",
          "value": "boolean",
          "description": "Missing description"
        },
        {
          "name": "rules",
          "type": "array",
          "default": [],
          "source": "validatable",
          "description": "Missing description"
        },
        {
          "name": "step",
          "type": [
            "number",
            "string"
          ],
          "default": 1,
          "source": "v-slider",
          "description": "If greater than 0, sets step interval for ticks"
        },
        {
          "name": "success",
          "type": "boolean",
          "default": "false",
          "source": "validatable",
          "description": "Missing description"
        },
        {
          "name": "successMessages",
          "type": [
            "string",
            "array"
          ],
          "default": [],
          "source": "validatable",
          "description": "Missing description"
        },
        {
          "name": "thumbColor",
          "type": "string",
          "default": "undefined",
          "source": "v-slider",
          "description": "Sets the thumb and thumb label color"
        },
        {
          "name": "thumbLabel",
          "type": [
            "boolean",
            "string"
          ],
          "default": "undefined",
          "source": "v-slider",
          "description": "Show thumb label. If `true` it shows label when using slider. If set to `'always'` it always shows label."
        },
        {
          "name": "thumbSize",
          "type": [
            "number",
            "string"
          ],
          "default": 32,
          "source": "v-slider",
          "description": "Controls the size of the thumb label."
        },
        {
          "name": "tickLabels",
          "type": "array",
          "default": [],
          "source": "v-slider",
          "description": "When provided with Array<string>, will attempt to map the labels to each step in index order"
        },
        {
          "name": "tickSize",
          "type": [
            "number",
            "string"
          ],
          "default": 1,
          "source": "v-slider",
          "description": "Controls the size of **ticks**"
        },
        {
          "name": "ticks",
          "type": [
            "boolean",
            "string"
          ],
          "default": false,
          "source": "v-slider",
          "description": "Show track ticks. If `true` it shows ticks when using slider. If set to `'always'` it always shows ticks."
        },
        {
          "name": "trackColor",
          "type": "string",
          "default": "undefined",
          "source": "v-slider",
          "description": "Sets the track's color"
        },
        {
          "name": "validateOnBlur",
          "type": "boolean",
          "default": "false",
          "source": "validatable",
          "description": "Missing description"
        },
        {
          "name": "value",
          "type": "any",
          "source": "v-input",
          "description": "The input's value"
        }
      ],
      "mixins": [
        "loadable"
      ],
      "events": [
        {
          "name": "update:error",
          "source": "validatable",
          "value": "boolean",
          "description": "Missing description"
        },
        {
          "name": "click",
          "source": "v-input",
          "value": "MouseEvent",
          "description": "Missing description"
        },
        {
          "name": "mousedown",
          "source": "v-input",
          "value": "MouseEvent",
          "description": "Missing description"
        },
        {
          "name": "mouseup",
          "source": "v-input",
          "value": "MouseEvent",
          "description": "Missing description"
        },
        {
          "name": "click:append",
          "source": "v-input",
          "value": "Event",
          "description": "Missing description"
        },
        {
          "name": "click:prepend",
          "source": "v-input",
          "value": "Event",
          "description": "Missing description"
        },
        {
          "name": "start",
          "source": "v-slider",
          "value": "number",
          "description": "Slider value emitted at start of slider movement"
        },
        {
          "name": "end",
          "source": "v-slider",
          "value": "number",
          "description": "Slider value emitted at the end of slider movement"
        }
      ],
      "slots": [
        {
          "name": "append",
          "source": "v-input",
          "description": "Missing description"
        },
        {
          "name": "default",
          "source": "v-input",
          "description": "Missing description"
        },
        {
          "name": "prepend",
          "source": "v-input",
          "description": "Missing description"
        },
        {
          "name": "label",
          "source": "v-input",
          "description": "Missing description"
        },
        {
          "name": "message",
          "props": {
            "key": "number, // the messages index",
            "message": "string, // the message"
          },
          "source": "v-input",
          "description": "Missing description"
        },
        {
          "name": "progress",
          "source": "v-slider",
          "description": "Missing description"
        },
        {
          "name": "thumb-label",
          "props": {
            "value": "number | string"
          },
          "source": "v-slider",
          "description": "Replaces the content inside the thumb label"
        }
      ],
      "sass": []
    },
    "v-rating": {
      "props": [
        {
          "name": "backgroundColor",
          "type": "string",
          "default": "'accent'",
          "source": "v-rating",
          "description": "The color used empty icons"
        },
        {
          "name": "clearable",
          "type": "boolean",
          "default": "false",
          "source": "v-rating",
          "description": "Allows for the component to be cleared. Triggers when the icon containing the current value is clicked."
        },
        {
          "name": "closeDelay",
          "type": [
            "number",
            "string"
          ],
          "default": 0,
          "source": "delayable",
          "description": "Missing description"
        },
        {
          "name": "color",
          "type": "string",
          "default": "'primary'",
          "source": "colorable",
          "description": "Missing description"
        },
        {
          "name": "dark",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "dense",
          "type": "boolean",
          "default": "false",
          "source": "v-rating",
          "description": "Icons have a smaller size"
        },
        {
          "name": "emptyIcon",
          "type": "string",
          "default": "'$vuetify.icons.ratingEmpty'",
          "source": "v-rating",
          "description": "The icon displayed when empty"
        },
        {
          "name": "fullIcon",
          "type": "string",
          "default": "'$vuetify.icons.ratingFull'",
          "source": "v-rating",
          "description": "The icon displayed when full"
        },
        {
          "name": "halfIcon",
          "type": "string",
          "default": "'$vuetify.icons.ratingHalf'",
          "source": "v-rating",
          "description": "The icon displayed when half (requires **half-increments** prop)"
        },
        {
          "name": "halfIncrements",
          "type": "boolean",
          "default": "false",
          "source": "v-rating",
          "description": "Allows the selection of half increments"
        },
        {
          "name": "hover",
          "type": "boolean",
          "default": "false",
          "source": "v-rating",
          "description": "Provides visual feedback when hovering over icons"
        },
        {
          "name": "large",
          "type": "boolean",
          "default": "false",
          "source": "sizeable",
          "description": "Missing description"
        },
        {
          "name": "length",
          "type": [
            "number",
            "string"
          ],
          "default": 5,
          "source": "v-rating",
          "description": "The amount of ratings to show"
        },
        {
          "name": "light",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "medium",
          "type": "boolean",
          "default": "false",
          "source": "sizeable",
          "description": "Missing description"
        },
        {
          "name": "openDelay",
          "type": [
            "number",
            "string"
          ],
          "default": 0,
          "source": "delayable",
          "description": "Missing description"
        },
        {
          "name": "readonly",
          "type": "boolean",
          "default": "false",
          "source": "v-rating",
          "description": "Removes all hover effects and pointer events"
        },
        {
          "name": "ripple",
          "type": [
            "boolean",
            "object"
          ],
          "default": true,
          "source": "rippleable",
          "description": "Missing description"
        },
        {
          "name": "size",
          "type": [
            "number",
            "string"
          ],
          "default": "undefined",
          "source": "sizeable",
          "description": "Missing description"
        },
        {
          "name": "small",
          "type": "boolean",
          "default": "false",
          "source": "sizeable",
          "description": "Missing description"
        },
        {
          "name": "value",
          "type": "number",
          "default": 0,
          "source": "v-rating",
          "description": "The rating value"
        },
        {
          "name": "xLarge",
          "type": "boolean",
          "default": "false",
          "source": "sizeable",
          "description": "Missing description"
        }
      ],
      "mixins": [
        "colorable",
        "delayable",
        "rippleable",
        "sizeable",
        "themeable"
      ],
      "events": [
        {
          "name": "input",
          "value": "Number",
          "description": "Missing description"
        }
      ],
      "slots": [
        {
          "name": "item",
          "props": {
            "click": "(i: number) => void",
            "index": "number",
            "isFilled": "boolean",
            "isHalfFilled": "?boolean",
            "isHalfHovered": "?boolean",
            "isHovered": "boolean",
            "value": "number"
          },
          "description": "Missing description"
        },
        {
          "name": "default",
          "description": "Missing description"
        }
      ],
      "sass": [
        {
          "name": "$rating-padding",
          "default": "0.5rem !default;",
          "description": "Missing description"
        },
        {
          "name": "$rating-border-radius",
          "default": "50% !default;",
          "description": "Missing description"
        },
        {
          "name": "$rating-dense-padding",
          "default": "0.1rem !default;",
          "description": "Missing description"
        }
      ]
    },
    "v-responsive": {
      "props": [
        {
          "name": "aspectRatio",
          "type": [
            "string",
            "number"
          ],
          "default": "undefined",
          "source": "v-responsive",
          "description": "Sets a base aspect ratio, calculated as width/height. This will only set a **minimum** height, the component can still grow if it has a lot of content."
        },
        {
          "name": "height",
          "type": [
            "number",
            "string"
          ],
          "default": "undefined",
          "source": "measurable",
          "description": "Missing description"
        },
        {
          "name": "maxHeight",
          "type": [
            "number",
            "string"
          ],
          "default": "undefined",
          "source": "measurable",
          "description": "Missing description"
        },
        {
          "name": "maxWidth",
          "type": [
            "number",
            "string"
          ],
          "default": "undefined",
          "source": "measurable",
          "description": "Missing description"
        },
        {
          "name": "minHeight",
          "type": [
            "number",
            "string"
          ],
          "default": "undefined",
          "source": "measurable",
          "description": "Missing description"
        },
        {
          "name": "minWidth",
          "type": [
            "number",
            "string"
          ],
          "default": "undefined",
          "source": "measurable",
          "description": "Missing description"
        },
        {
          "name": "width",
          "type": [
            "number",
            "string"
          ],
          "default": "undefined",
          "source": "measurable",
          "description": "Missing description"
        }
      ],
      "mixins": [
        "measurable"
      ],
      "slots": [
        {
          "name": "default",
          "description": "Missing description"
        }
      ],
      "sass": [
        {
          "name": "$responsive-transition",
          "default": "padding-bottom 0.2s map-get($transition, 'swing') !default;",
          "description": "Missing description"
        }
      ]
    },
    "v-select": {
      "props": [
        {
          "name": "appendIcon",
          "type": "string",
          "default": "'$vuetify.icons.dropdown'",
          "source": "v-input",
          "description": "Appends an icon to the component, uses the same syntax as `v-icon`"
        },
        {
          "name": "appendIconCb",
          "type": "function",
          "default": "null",
          "source": "v-input",
          "description": "Missing description"
        },
        {
          "name": "appendOuterIcon",
          "type": "string",
          "default": "undefined",
          "source": "v-text-field",
          "description": "Appends an icon to the outside the component's input, uses same syntax as `v-icon`"
        },
        {
          "name": "appendOuterIconCb",
          "type": "function",
          "default": "null",
          "source": "v-text-field",
          "description": "Missing description"
        },
        {
          "name": "attach",
          "type": "any",
          "default": false,
          "source": "v-select",
          "description": "Mixins.Detachable.props.attach"
        },
        {
          "name": "autofocus",
          "type": "boolean",
          "default": "false",
          "source": "v-text-field",
          "description": "Enables autofocus"
        },
        {
          "name": "backgroundColor",
          "type": "string",
          "default": "undefined",
          "source": "v-input",
          "description": "Changes the background-color of the input"
        },
        {
          "name": "box",
          "type": "boolean",
          "default": "false",
          "source": "v-text-field",
          "description": "Missing description"
        },
        {
          "name": "browserAutocomplete",
          "type": "string",
          "default": "'on'",
          "source": "v-text-field",
          "description": "Missing description"
        },
        {
          "name": "cacheItems",
          "type": "boolean",
          "default": "false",
          "source": "v-select",
          "description": "Keeps a local _unique_ copy of all items that have been passed through the **items** prop."
        },
        {
          "name": "chips",
          "type": "boolean",
          "default": "false",
          "source": "v-select",
          "description": "Changes display of selections to chips"
        },
        {
          "name": "clearIcon",
          "type": "string",
          "default": "'$vuetify.icons.clear'",
          "source": "v-text-field",
          "description": "Applied when using **clearable** and the input is dirty"
        },
        {
          "name": "clearIconCb",
          "type": "function",
          "default": "null",
          "source": "v-text-field",
          "description": "Missing description"
        },
        {
          "name": "clearable",
          "type": "boolean",
          "default": "false",
          "source": "v-text-field",
          "description": "Missing description"
        },
        {
          "name": "color",
          "type": "string",
          "default": "'primary'",
          "source": "colorable",
          "description": "Missing description"
        },
        {
          "name": "counter",
          "type": [
            "boolean",
            "number",
            "string"
          ],
          "default": "undefined",
          "source": "v-text-field",
          "description": "Creates counter for input length; if no number is specified, it defaults to 25. Does not apply any validation."
        },
        {
          "name": "dark",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "deletableChips",
          "type": "boolean",
          "default": "false",
          "source": "v-select",
          "description": "Adds a remove icon to selected chips"
        },
        {
          "name": "dense",
          "type": "boolean",
          "default": "false",
          "source": "v-select",
          "description": "Missing description"
        },
        {
          "name": "disabled",
          "type": "boolean",
          "default": false,
          "source": "validatable",
          "value": "boolean",
          "description": "Missing description"
        },
        {
          "name": "dontFillMaskBlanks",
          "type": "boolean",
          "default": "false",
          "source": "maskable",
          "description": "Missing description"
        },
        {
          "name": "error",
          "type": "boolean",
          "default": "false",
          "source": "validatable",
          "description": "Missing description"
        },
        {
          "name": "errorCount",
          "type": [
            "number",
            "string"
          ],
          "default": 1,
          "source": "validatable",
          "description": "Missing description"
        },
        {
          "name": "errorMessages",
          "type": [
            "string",
            "array"
          ],
          "default": [],
          "source": "validatable",
          "description": "Missing description"
        },
        {
          "name": "filter",
          "default": "(item: object, queryText: string, itemText: string): boolean",
          "source": "v-select",
          "description": "The function used for filtering items"
        },
        {
          "name": "flat",
          "type": "boolean",
          "default": "false",
          "source": "v-text-field",
          "description": "Mixins.Soloable.props.flat"
        },
        {
          "name": "fullWidth",
          "type": "boolean",
          "default": "false",
          "source": "v-text-field",
          "description": "Designates input type as full-width"
        },
        {
          "name": "height",
          "type": [
            "number",
            "string"
          ],
          "default": "undefined",
          "source": "v-input",
          "description": "Sets the height of the input"
        },
        {
          "name": "hideDetails",
          "type": "boolean",
          "default": "false",
          "source": "v-input",
          "description": "Hides hint and validation errors. When set to `auto` messages will be rendered only if there's a message (hint, error message, counter value etc) to display"
        },
        {
          "name": "hideSelected",
          "type": "boolean",
          "default": "false",
          "source": "v-select",
          "description": "Do not display in the select menu items that are already selected"
        },
        {
          "name": "hint",
          "type": "string",
          "default": "undefined",
          "source": "v-input",
          "description": "Hint text"
        },
        {
          "name": "itemAvatar",
          "type": [
            "string",
            "array",
            "function"
          ],
          "default": "avatar",
          "source": "v-select",
          "description": "Missing description"
        },
        {
          "name": "itemDisabled",
          "type": [
            "string",
            "array",
            "function"
          ],
          "default": "disabled",
          "source": "v-select",
          "description": "Set property of **items**'s disabled value"
        },
        {
          "name": "itemText",
          "type": [
            "string",
            "array",
            "function"
          ],
          "default": "text",
          "source": "v-select",
          "description": "Set property of **items**'s text value"
        },
        {
          "name": "itemValue",
          "type": [
            "string",
            "array",
            "function"
          ],
          "default": "value",
          "source": "v-select",
          "description": "Set property of **items**'s value - **must be primitive**. Dot notation is supported. **Note:** This is currently not supported with `v-combobox` [GitHub Issue](https://github.com/vuetifyjs/vuetify/issues/5479)"
        },
        {
          "name": "items",
          "type": "array",
          "default": [],
          "source": "v-select",
          "example": {
            "text": "string | number | object",
            "value": "string | number | object",
            "disabled": "boolean",
            "divider": "boolean",
            "header": "string"
          },
          "description": "Can be an array of objects or array of strings. When using objects, will look for a text, value and disabled keys. This can be changed using the **item-text**, **item-value** and **item-disabled** props.  Objects that have a **header** or **divider** property are considered special cases and generate a list header or divider; these items are not selectable."
        },
        {
          "name": "label",
          "type": "string",
          "source": "v-input",
          "description": "Sets input label"
        },
        {
          "name": "light",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "loading",
          "type": [
            "boolean",
            "string"
          ],
          "default": false,
          "source": "v-input",
          "description": "Mixins.Loadable.props.loading"
        },
        {
          "name": "mask",
          "type": [
            "object",
            "string"
          ],
          "default": "undefined",
          "source": "maskable",
          "description": "Missing description"
        },
        {
          "name": "menuProps",
          "type": [
            "string",
            "array",
            "object"
          ],
          "default": "{ \"closeOnClick\": false, \"closeOnContentClick\": false, \"disableKeys\": true, \"openOnClick\": false, \"maxHeight\": 304 }",
          "source": "v-select",
          "description": "Pass props through to the `v-menu` component. Accepts either a string for boolean props `menu-props=\"auto, overflowY\"`, or an object `:menu-props=\"{ auto: true, overflowY: true }\"`"
        },
        {
          "name": "messages",
          "type": [
            "string",
            "array"
          ],
          "default": [],
          "source": "validatable",
          "description": "Missing description"
        },
        {
          "name": "multiple",
          "type": "boolean",
          "default": "false",
          "source": "v-select",
          "description": "Changes select to multiple. Accepts array for value"
        },
        {
          "name": "noDataText",
          "type": "string",
          "default": "'$vuetify.noDataText'",
          "source": "filterable",
          "description": "Missing description"
        },
        {
          "name": "openOnClear",
          "type": "boolean",
          "default": "false",
          "source": "v-select",
          "description": "When using the **clearable** prop, once cleared, the select menu will either open or stay open, depending on the current state"
        },
        {
          "name": "outline",
          "type": "boolean",
          "default": "false",
          "source": "v-text-field",
          "description": "Missing description"
        },
        {
          "name": "persistentHint",
          "type": "boolean",
          "default": "false",
          "source": "v-input",
          "description": "Forces hint to always be visible"
        },
        {
          "name": "placeholder",
          "type": "string",
          "default": "undefined",
          "source": "v-text-field",
          "description": "Sets the input’s placeholder text"
        },
        {
          "name": "prefix",
          "type": "string",
          "default": "undefined",
          "source": "v-text-field",
          "description": "Displays prefix text"
        },
        {
          "name": "prependIcon",
          "type": "string",
          "default": "undefined",
          "source": "v-input",
          "description": "Prepends an icon to the component, uses the same syntax as `v-icon`"
        },
        {
          "name": "prependIconCb",
          "type": "function",
          "default": "null",
          "source": "v-input",
          "description": "Missing description"
        },
        {
          "name": "prependInnerIcon",
          "type": "string",
          "default": "undefined",
          "source": "v-text-field",
          "description": "Prepends an icon inside the component's input, uses the same syntax as `v-icon`"
        },
        {
          "name": "prependInnerIconCb",
          "type": "function",
          "default": "null",
          "source": "v-text-field",
          "description": "Missing description"
        },
        {
          "name": "readonly",
          "type": "boolean",
          "default": false,
          "source": "validatable",
          "value": "boolean",
          "description": "Missing description"
        },
        {
          "name": "returnMaskedValue",
          "type": "boolean",
          "default": "false",
          "source": "maskable",
          "description": "Missing description"
        },
        {
          "name": "returnObject",
          "type": "boolean",
          "default": "false",
          "source": "v-select",
          "description": "Changes the selection behavior to return the object directly rather than the value specified with **item-value**"
        },
        {
          "name": "reverse",
          "type": "boolean",
          "default": "false",
          "source": "v-text-field",
          "description": "Reverses the input orientation"
        },
        {
          "name": "rules",
          "type": "array",
          "default": [],
          "source": "validatable",
          "description": "Missing description"
        },
        {
          "name": "searchInput",
          "type": "any",
          "default": "undefined",
          "source": "v-select",
          "description": "Use the **.sync** modifier to catch user input from the search input"
        },
        {
          "name": "singleLine",
          "type": "boolean",
          "default": "false",
          "source": "v-text-field",
          "description": "Missing description"
        },
        {
          "name": "smallChips",
          "type": "boolean",
          "default": "false",
          "source": "v-select",
          "description": "Changes display of selections to chips with the **small** property"
        },
        {
          "name": "solo",
          "type": "boolean",
          "default": "false",
          "source": "v-text-field",
          "description": "Mixins.Soloable.props.solo"
        },
        {
          "name": "soloInverted",
          "type": "boolean",
          "default": "false",
          "source": "v-text-field",
          "description": "Mixins.Soloable.props.soloInverted"
        },
        {
          "name": "success",
          "type": "boolean",
          "default": "false",
          "source": "validatable",
          "description": "Missing description"
        },
        {
          "name": "successMessages",
          "type": [
            "string",
            "array"
          ],
          "default": [],
          "source": "validatable",
          "description": "Missing description"
        },
        {
          "name": "suffix",
          "type": "string",
          "default": "undefined",
          "source": "v-text-field",
          "description": "Displays suffix text"
        },
        {
          "name": "type",
          "type": "string",
          "default": "'text'",
          "source": "v-text-field",
          "description": "Sets input type"
        },
        {
          "name": "validateOnBlur",
          "type": "boolean",
          "default": "false",
          "source": "validatable",
          "description": "Missing description"
        },
        {
          "name": "value",
          "type": "any",
          "source": "v-input",
          "description": "The input's value"
        },
        {
          "name": "valueComparator",
          "type": "function",
          "default": "(a: any, b: any): boolean",
          "source": "v-select",
          "description": "The comparison algorithm used for values. [More info](https://github.com/vuetifyjs/vuetify/blob/master/packages/vuetify/src/util/helpers.ts)"
        }
      ],
      "mixins": [
        "comparable",
        "filterable"
      ],
      "events": [
        {
          "name": "update:error",
          "source": "validatable",
          "value": "boolean",
          "description": "Missing description"
        },
        {
          "name": "click",
          "source": "v-input",
          "value": "MouseEvent",
          "description": "Missing description"
        },
        {
          "name": "mousedown",
          "source": "v-input",
          "value": "MouseEvent",
          "description": "Missing description"
        },
        {
          "name": "mouseup",
          "source": "v-input",
          "value": "MouseEvent",
          "description": "Missing description"
        },
        {
          "name": "click:append",
          "source": "v-input",
          "value": "Event",
          "description": "Missing description"
        },
        {
          "name": "click:prepend",
          "source": "v-input",
          "value": "Event",
          "description": "Missing description"
        },
        {
          "name": "blur",
          "source": "v-text-field",
          "value": "Event",
          "description": "Emitted when the input is blurred"
        },
        {
          "name": "click:clear",
          "source": "v-text-field",
          "value": "Event",
          "description": "Emitted when clearable icon clicked"
        },
        {
          "name": "click:append-outer",
          "source": "v-text-field",
          "value": "Event",
          "description": "Emitted when appended outer icon is clicked"
        },
        {
          "name": "click:prepend-inner",
          "source": "v-text-field",
          "value": "Event",
          "description": "Emitted when prepended inner icon is clicked"
        },
        {
          "name": "focus",
          "source": "v-text-field",
          "value": "Event",
          "description": "Emitted when component is focused"
        },
        {
          "name": "change",
          "source": "v-text-field",
          "value": "any",
          "description": "Emitted when the input is changed by user interaction"
        },
        {
          "name": "input",
          "source": "v-text-field",
          "value": "any",
          "description": "Missing description"
        },
        {
          "name": "keydown",
          "source": "v-text-field",
          "value": "KeyboardEvent",
          "description": "Emitted when **any** key is pressed"
        },
        {
          "name": "update:search-input",
          "source": "v-select",
          "value": "string",
          "description": "The `search-input.sync` event"
        },
        {
          "name": "update:list-index",
          "source": "v-select",
          "value": "number",
          "description": "Emitted when menu item is selected using keyboard arrows"
        }
      ],
      "slots": [
        {
          "name": "append",
          "source": "v-input",
          "description": "Missing description"
        },
        {
          "name": "default",
          "source": "v-input",
          "description": "Missing description"
        },
        {
          "name": "prepend",
          "source": "v-input",
          "description": "Missing description"
        },
        {
          "name": "label",
          "source": "v-input",
          "description": "Missing description"
        },
        {
          "name": "message",
          "props": {
            "key": "number, // the messages index",
            "message": "string, // the message"
          },
          "source": "v-input",
          "description": "Missing description"
        },
        {
          "name": "append-outer",
          "source": "v-text-field",
          "description": "Adds an item outside the input and after input content"
        },
        {
          "name": "prepend-inner",
          "source": "v-text-field",
          "description": "Adds an item inside the input and before input content"
        },
        {
          "name": "progress",
          "source": "v-text-field",
          "description": "Missing description"
        },
        {
          "name": "append-item",
          "source": "v-select",
          "description": "Adds an item after menu content"
        },
        {
          "name": "prepend-item",
          "source": "v-select",
          "description": "Adds an item before menu content"
        },
        {
          "name": "item",
          "props": {
            "parent": "VueComponent",
            "item": "object",
            "on": "object // Only needed when providing your own v-list-item",
            "attrs": "object // Only needed when providing your own v-list-item"
          },
          "source": "v-select",
          "description": "Define a custom item appearance"
        },
        {
          "name": "no-data",
          "source": "v-select",
          "description": "Mixins.Filterable.slots.noData"
        },
        {
          "name": "selection",
          "props": {
            "parent": "VueComponent",
            "item": "object",
            "index": "number",
            "select": "function",
            "selected": "boolean",
            "disabled": "boolean"
          },
          "source": "v-select",
          "description": "Define a custom selection appearance"
        }
      ],
      "sass": [
        {
          "name": "$select-chip-margin",
          "default": "4px !default;",
          "description": "Missing description"
        },
        {
          "name": "$select-dense-chip-margin",
          "default": "0 4px 0 4px !default;",
          "description": "Missing description"
        },
        {
          "name": "$select-selected-chip-opacity",
          "default": ".22 !default;",
          "description": "Missing description"
        },
        {
          "name": "$select-prefix-line-height",
          "default": "20px !default;",
          "description": "Missing description"
        },
        {
          "name": "$select-prefix-top",
          "default": "7px !default;",
          "description": "Missing description"
        },
        {
          "name": "$select-selections-padding-top",
          "default": "20px !default;",
          "description": "Missing description"
        },
        {
          "name": "$select-outlined-selections-padding-top",
          "default": "8px 0 !default;",
          "description": "Missing description"
        },
        {
          "name": "$select-outlined-dense-selections-padding-top",
          "default": "4px 0 !default;",
          "description": "Missing description"
        },
        {
          "name": "$select-chips-selections-padding-top",
          "default": "42px !default;",
          "description": "Missing description"
        },
        {
          "name": "$select-active-icon-flip",
          "default": "true !default;",
          "description": "Missing description"
        },
        {
          "name": "$select-chips-dense-selections-padding-top",
          "default": "40px !default;",
          "description": "Missing description"
        },
        {
          "name": "$select-active-chip-opacity",
          "default": "0.2 !default;",
          "description": "Missing description"
        },
        {
          "name": "$select-small-chips-selections-min-height",
          "default": "26px !default;",
          "description": "Missing description"
        },
        {
          "name": "$select-chips-box-enclosed-selections-min-height",
          "default": "68px !default;",
          "description": "Missing description"
        },
        {
          "name": "$select-chips-dense-selections-min-height",
          "default": "40px !default;",
          "description": "Missing description"
        },
        {
          "name": "$select-small-chips-dense-selections-min-height",
          "default": "38px !default;",
          "description": "Missing description"
        },
        {
          "name": "$select-selections-line-height",
          "default": "18px !default;",
          "description": "Missing description"
        },
        {
          "name": "$select-selections-margin",
          "default": "7px 4px 7px 0 !default;",
          "description": "Missing description"
        },
        {
          "name": "$select-dense-selections-margin",
          "default": "5px 4px 3px 0 !default;",
          "description": "Missing description"
        }
      ]
    },
    "v-slider": {
      "props": [
        {
          "name": "alwaysDirty",
          "type": "boolean",
          "default": "false",
          "source": "v-slider",
          "description": "When used with the **thumb-label** prop will always show the thumb label."
        },
        {
          "name": "appendIcon",
          "type": "string",
          "default": "undefined",
          "source": "v-input",
          "description": "Appends an icon to the component, uses the same syntax as `v-icon`"
        },
        {
          "name": "appendIconCb",
          "type": "function",
          "default": "null",
          "source": "v-input",
          "description": "Missing description"
        },
        {
          "name": "backgroundColor",
          "type": "string",
          "default": "undefined",
          "source": "v-input",
          "description": "Changes the background-color of the input"
        },
        {
          "name": "color",
          "type": "string",
          "default": "undefined",
          "source": "colorable",
          "description": "Missing description"
        },
        {
          "name": "dark",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "disabled",
          "type": "boolean",
          "default": false,
          "source": "validatable",
          "value": "boolean",
          "description": "Missing description"
        },
        {
          "name": "error",
          "type": "boolean",
          "default": "false",
          "source": "validatable",
          "description": "Missing description"
        },
        {
          "name": "errorCount",
          "type": [
            "number",
            "string"
          ],
          "default": 1,
          "source": "validatable",
          "description": "Missing description"
        },
        {
          "name": "errorMessages",
          "type": [
            "string",
            "array"
          ],
          "default": [],
          "source": "validatable",
          "description": "Missing description"
        },
        {
          "name": "height",
          "type": [
            "number",
            "string"
          ],
          "default": "undefined",
          "source": "v-input",
          "description": "Sets the height of the input"
        },
        {
          "name": "hideDetails",
          "type": "boolean",
          "default": "false",
          "source": "v-input",
          "description": "Hides hint and validation errors. When set to `auto` messages will be rendered only if there's a message (hint, error message, counter value etc) to display"
        },
        {
          "name": "hint",
          "type": "string",
          "default": "undefined",
          "source": "v-input",
          "description": "Hint text"
        },
        {
          "name": "inverseLabel",
          "type": "boolean",
          "default": "false",
          "source": "v-slider",
          "description": "Reverse the label position. Works with **rtl**."
        },
        {
          "name": "label",
          "type": "string",
          "source": "v-input",
          "description": "Sets input label"
        },
        {
          "name": "light",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "loading",
          "type": [
            "boolean",
            "string"
          ],
          "default": false,
          "source": "v-input",
          "description": "Mixins.Loadable.props.loading"
        },
        {
          "name": "max",
          "type": [
            "number",
            "string"
          ],
          "default": 100,
          "source": "v-slider",
          "description": "Sets the maximum allowed value"
        },
        {
          "name": "messages",
          "type": [
            "string",
            "array"
          ],
          "default": [],
          "source": "validatable",
          "description": "Missing description"
        },
        {
          "name": "min",
          "type": [
            "number",
            "string"
          ],
          "default": 0,
          "source": "v-slider",
          "description": "Sets the minimum allowed value"
        },
        {
          "name": "persistentHint",
          "type": "boolean",
          "default": "false",
          "source": "v-input",
          "description": "Forces hint to always be visible"
        },
        {
          "name": "prependIcon",
          "type": "string",
          "default": "undefined",
          "source": "v-input",
          "description": "Prepends an icon to the component, uses the same syntax as `v-icon`"
        },
        {
          "name": "prependIconCb",
          "type": "function",
          "default": "null",
          "source": "v-input",
          "description": "Missing description"
        },
        {
          "name": "readonly",
          "type": "boolean",
          "default": false,
          "source": "validatable",
          "value": "boolean",
          "description": "Missing description"
        },
        {
          "name": "rules",
          "type": "array",
          "default": [],
          "source": "validatable",
          "description": "Missing description"
        },
        {
          "name": "step",
          "type": [
            "number",
            "string"
          ],
          "default": 1,
          "source": "v-slider",
          "description": "If greater than 0, sets step interval for ticks"
        },
        {
          "name": "success",
          "type": "boolean",
          "default": "false",
          "source": "validatable",
          "description": "Missing description"
        },
        {
          "name": "successMessages",
          "type": [
            "string",
            "array"
          ],
          "default": [],
          "source": "validatable",
          "description": "Missing description"
        },
        {
          "name": "thumbColor",
          "type": "string",
          "default": "undefined",
          "source": "v-slider",
          "description": "Sets the thumb and thumb label color"
        },
        {
          "name": "thumbLabel",
          "type": [
            "boolean",
            "string"
          ],
          "default": "undefined",
          "source": "v-slider",
          "description": "Show thumb label. If `true` it shows label when using slider. If set to `'always'` it always shows label."
        },
        {
          "name": "thumbSize",
          "type": [
            "number",
            "string"
          ],
          "default": 32,
          "source": "v-slider",
          "description": "Controls the size of the thumb label."
        },
        {
          "name": "tickLabels",
          "type": "array",
          "default": [],
          "source": "v-slider",
          "description": "When provided with Array<string>, will attempt to map the labels to each step in index order"
        },
        {
          "name": "tickSize",
          "type": [
            "number",
            "string"
          ],
          "default": 1,
          "source": "v-slider",
          "description": "Controls the size of **ticks**"
        },
        {
          "name": "ticks",
          "type": [
            "boolean",
            "string"
          ],
          "default": false,
          "source": "v-slider",
          "description": "Show track ticks. If `true` it shows ticks when using slider. If set to `'always'` it always shows ticks."
        },
        {
          "name": "trackColor",
          "type": "string",
          "default": "undefined",
          "source": "v-slider",
          "description": "Sets the track's color"
        },
        {
          "name": "validateOnBlur",
          "type": "boolean",
          "default": "false",
          "source": "validatable",
          "description": "Missing description"
        },
        {
          "name": "value",
          "type": "any",
          "source": "v-input",
          "description": "The input's value"
        }
      ],
      "mixins": [
        "loadable"
      ],
      "events": [
        {
          "name": "update:error",
          "source": "validatable",
          "value": "boolean",
          "description": "Missing description"
        },
        {
          "name": "click",
          "source": "v-input",
          "value": "MouseEvent",
          "description": "Missing description"
        },
        {
          "name": "mousedown",
          "source": "v-input",
          "value": "MouseEvent",
          "description": "Missing description"
        },
        {
          "name": "mouseup",
          "source": "v-input",
          "value": "MouseEvent",
          "description": "Missing description"
        },
        {
          "name": "click:append",
          "source": "v-input",
          "value": "Event",
          "description": "Missing description"
        },
        {
          "name": "click:prepend",
          "source": "v-input",
          "value": "Event",
          "description": "Missing description"
        },
        {
          "name": "start",
          "source": "v-slider",
          "value": "number",
          "description": "Slider value emitted at start of slider movement"
        },
        {
          "name": "end",
          "source": "v-slider",
          "value": "number",
          "description": "Slider value emitted at the end of slider movement"
        }
      ],
      "slots": [
        {
          "name": "append",
          "source": "v-input",
          "description": "Missing description"
        },
        {
          "name": "default",
          "source": "v-input",
          "description": "Missing description"
        },
        {
          "name": "prepend",
          "source": "v-input",
          "description": "Missing description"
        },
        {
          "name": "label",
          "source": "v-input",
          "description": "Missing description"
        },
        {
          "name": "message",
          "props": {
            "key": "number, // the messages index",
            "message": "string, // the message"
          },
          "source": "v-input",
          "description": "Missing description"
        },
        {
          "name": "progress",
          "source": "v-slider",
          "description": "Missing description"
        },
        {
          "name": "thumb-label",
          "props": {
            "value": "number | string"
          },
          "source": "v-slider",
          "description": "Replaces the content inside the thumb label"
        }
      ],
      "sass": [
        {
          "name": "$chip-group-no-color-opacity",
          "default": ".22 !default;",
          "description": "Missing description"
        },
        {
          "name": "$chip-group-opacity",
          "default": ".32 !default;",
          "description": "Missing description"
        },
        {
          "name": "$slider-horizontal-left",
          "default": "8px !default;",
          "description": "Missing description"
        },
        {
          "name": "$slider-horizontal-min-height",
          "default": "32px !default;",
          "description": "Missing description"
        },
        {
          "name": "$slider-horizontal-right",
          "default": "8px !default;",
          "description": "Missing description"
        },
        {
          "name": "$slider-label-margin-end",
          "default": "12px !default;",
          "description": "Missing description"
        },
        {
          "name": "$slider-label-margin-start",
          "default": "12px !default;",
          "description": "Missing description"
        },
        {
          "name": "$slider-state-track-background-opacity",
          "default": "0.4 !default;",
          "description": "Missing description"
        },
        {
          "name": "$slider-thumb-before-opacity",
          "default": "0.3 !default;",
          "description": "Missing description"
        },
        {
          "name": "$slider-thumb-border-radius",
          "default": "50% !default;",
          "description": "Missing description"
        },
        {
          "name": "$slider-thumb-focused-size-increase",
          "default": "24px !default;",
          "description": "Missing description"
        },
        {
          "name": "$slider-thumb-label-font-size",
          "default": "map-deep-get($headings, 'caption', 'size') !default;",
          "description": "Missing description"
        },
        {
          "name": "$slider-thumb-label-height",
          "default": "32px !default;",
          "description": "Missing description"
        },
        {
          "name": "$slider-thumb-label-transition",
          "default": ".3s map-get($transition, 'fast-in-fast-out') !default;",
          "description": "Missing description"
        },
        {
          "name": "$slider-thumb-label-width",
          "default": "32px !default;",
          "description": "Missing description"
        },
        {
          "name": "$slider-thumb-size",
          "default": "12px !default;",
          "description": "Missing description"
        },
        {
          "name": "$slider-tick-border-radius",
          "default": "0 !default;",
          "description": "Missing description"
        },
        {
          "name": "$slider-track-border-radius",
          "default": "0 !default;",
          "description": "Missing description"
        },
        {
          "name": "$slider-track-width",
          "default": "2px !default;",
          "description": "Missing description"
        },
        {
          "name": "$slider-transition",
          "default": ".3s map-get($transition, 'swing') !default;",
          "description": "Missing description"
        },
        {
          "name": "$slider-vertical-margin-bottom",
          "default": "12px !default;",
          "description": "Missing description"
        },
        {
          "name": "$slider-vertical-margin-top",
          "default": "12px !default;",
          "description": "Missing description"
        },
        {
          "name": "$slider-vertical-min-height",
          "default": "150px !default;",
          "description": "Missing description"
        }
      ]
    },
    "v-snackbar": {
      "props": [
        {
          "name": "absolute",
          "type": "boolean",
          "default": "false",
          "source": "positionable",
          "description": "Missing description"
        },
        {
          "name": "autoHeight",
          "type": "boolean",
          "default": "false",
          "source": "v-snackbar",
          "description": "Missing description"
        },
        {
          "name": "bottom",
          "type": "boolean",
          "default": "false",
          "source": "positionable",
          "description": "Missing description"
        },
        {
          "name": "color",
          "type": "string",
          "default": "undefined",
          "source": "colorable",
          "description": "Missing description"
        },
        {
          "name": "left",
          "type": "boolean",
          "default": "false",
          "source": "positionable",
          "description": "Missing description"
        },
        {
          "name": "multiLine",
          "type": "boolean",
          "default": "false",
          "source": "v-snackbar",
          "description": "Gives the snackbar a larger minimum height."
        },
        {
          "name": "right",
          "type": "boolean",
          "default": "false",
          "source": "positionable",
          "description": "Missing description"
        },
        {
          "name": "timeout",
          "type": "number",
          "default": 6000,
          "source": "v-snackbar",
          "description": "Time (in milliseconds) to wait until snackbar is automatically hidden.  Use `-1` to keep open indefinitely (`0` in version < 2.3 ). It is recommended for this number to be between `4000` and `10000`. Changes to this property will reset the timeout."
        },
        {
          "name": "top",
          "type": "boolean",
          "default": "false",
          "source": "positionable",
          "description": "Missing description"
        },
        {
          "name": "value",
          "type": "any",
          "default": "undefined",
          "source": "toggleable",
          "description": "Missing description"
        },
        {
          "name": "vertical",
          "type": "boolean",
          "default": "false",
          "source": "v-snackbar",
          "description": "Stacks snackbar content on top of the actions (button)."
        }
      ],
      "mixins": [
        "colorable",
        "toggleable",
        "positionable"
      ],
      "events": [
        {
          "name": "input",
          "value": "boolean",
          "description": "Missing description"
        }
      ],
      "slots": [
        {
          "name": "action",
          "props": {
            "attrs": "object"
          },
          "description": "Missing description"
        },
        {
          "name": "default",
          "description": "Missing description"
        }
      ],
      "sass": [
        {
          "name": "$snackbar-absolute-z-index",
          "default": "1 !default;",
          "description": "Missing description"
        },
        {
          "name": "$snackbar-action-margin",
          "default": "8px !default;",
          "description": "Missing description"
        },
        {
          "name": "$snackbar-background-color",
          "default": "#333333 !default;",
          "description": "Missing description"
        },
        {
          "name": "$snackbar-border-radius",
          "default": "$border-radius-root !default;",
          "description": "Missing description"
        },
        {
          "name": "$snackbar-bottom",
          "default": "0 !default;",
          "description": "Missing description"
        },
        {
          "name": "$snackbar-btn-padding",
          "default": "0 8px !default;",
          "description": "Missing description"
        },
        {
          "name": "$snackbar-color",
          "default": "hsla(0, 0%, 100%, .87) !default;",
          "description": "Missing description"
        },
        {
          "name": "$snackbar-content-font-size",
          "default": "map-deep-get($headings, 'body-2', 'size') !default;",
          "description": "Missing description"
        },
        {
          "name": "$snackbar-content-font-weight",
          "default": "map-deep-get($headings, 'body-2', 'weight') !default;",
          "description": "Missing description"
        },
        {
          "name": "$snackbar-content-letter-spacing",
          "default": "map-deep-get($headings, 'body-2', 'letter-spacing') !default;",
          "description": "Missing description"
        },
        {
          "name": "$snackbar-content-line-height",
          "default": "map-deep-get($headings, 'body-2', 'line-height') !default;",
          "description": "Missing description"
        },
        {
          "name": "$snackbar-content-padding",
          "default": "14px 16px !default;",
          "description": "Missing description"
        },
        {
          "name": "$snackbar-content-text-transform",
          "default": "map-deep-get($headings, 'body-2', 'text-transform') !default;",
          "description": "Missing description"
        },
        {
          "name": "$snackbar-elevation",
          "default": "6 !default;",
          "description": "Missing description"
        },
        {
          "name": "$snackbar-left",
          "default": "0 !default;",
          "description": "Missing description"
        },
        {
          "name": "$snackbar-multi-line-wrapper-min-height",
          "default": "68px !default;",
          "description": "Missing description"
        },
        {
          "name": "$snackbar-right",
          "default": "0 !default;",
          "description": "Missing description"
        },
        {
          "name": "$snackbar-shaped-border-radius",
          "default": "map-get($rounded, 'xl') $snackbar-border-radius !default;",
          "description": "Missing description"
        },
        {
          "name": "$snackbar-top",
          "default": "0 !default;",
          "description": "Missing description"
        },
        {
          "name": "$snackbar-transition-wrapper-transform",
          "default": ".8 !default;",
          "description": "Missing description"
        },
        {
          "name": "$snackbar-vertical-action-margin-bottom",
          "default": "8px !default;",
          "description": "Missing description"
        },
        {
          "name": "$snackbar-vertical-wrapper-btn-margin-top",
          "default": "0 !default;",
          "description": "Missing description"
        },
        {
          "name": "$snackbar-vertical-wrapper-padding",
          "default": "initial !default;",
          "description": "Missing description"
        },
        {
          "name": "$snackbar-wrapper-margin",
          "default": "8px !default;",
          "description": "Missing description"
        },
        {
          "name": "$snackbar-wrapper-max-width",
          "default": "$snackbar-content-max-width !default;",
          "description": "Missing description"
        },
        {
          "name": "$snackbar-wrapper-min-height",
          "default": "48px !default;",
          "description": "Missing description"
        },
        {
          "name": "$snackbar-wrapper-min-width",
          "default": "$snackbar-content-min-width !default;",
          "description": "Missing description"
        },
        {
          "name": "$snackbar-wrapper-padding",
          "default": "0 !default;",
          "description": "Missing description"
        },
        {
          "name": "$snackbar-z-index",
          "default": "1000 !default;",
          "description": "Missing description"
        },
        {
          "name": "$snackbar-btn-margin-right",
          "default": "0 !default;",
          "description": "Missing description"
        },
        {
          "name": "$snackbar-content-first-btn-margin",
          "default": "0 !default;",
          "description": "Missing description"
        },
        {
          "name": "$snackbar-corner-offset",
          "default": "0 !default;",
          "description": "Missing description"
        },
        {
          "name": "$snackbar-font-size",
          "default": "$snackbar-content-font-size !default;",
          "description": "Missing description"
        }
      ]
    },
    "v-sparkline": {
      "props": [
        {
          "name": "autoDraw",
          "type": "boolean",
          "default": "false",
          "source": "VSparkline",
          "description": "Missing description"
        },
        {
          "name": "autoDrawDuration",
          "type": "number",
          "default": 2000,
          "source": "VSparkline",
          "description": "Missing description"
        },
        {
          "name": "autoDrawEasing",
          "type": "string",
          "default": "'ease'",
          "source": "VSparkline",
          "description": "Missing description"
        },
        {
          "name": "autoLineWidth",
          "type": "boolean",
          "default": "false",
          "source": "VSparkline",
          "description": "Missing description"
        },
        {
          "name": "color",
          "type": "string",
          "default": "'primary'",
          "source": "colorable",
          "description": "Missing description"
        },
        {
          "name": "fill",
          "type": "boolean",
          "default": "false",
          "source": "VSparkline",
          "description": "Missing description"
        },
        {
          "name": "gradient",
          "type": "array",
          "default": [],
          "source": "VSparkline",
          "description": "Missing description"
        },
        {
          "name": "gradientDirection",
          "type": "string",
          "default": "'top'",
          "source": "VSparkline",
          "description": "Missing description"
        },
        {
          "name": "height",
          "type": [
            "string",
            "number"
          ],
          "default": 75,
          "source": "VSparkline",
          "description": "Missing description"
        },
        {
          "name": "labelSize",
          "type": [
            "number",
            "string"
          ],
          "default": 7,
          "source": "VSparkline",
          "description": "Missing description"
        },
        {
          "name": "labels",
          "type": "array",
          "default": [],
          "source": "VSparkline",
          "description": "Missing description"
        },
        {
          "name": "lineWidth",
          "type": [
            "string",
            "number"
          ],
          "default": 4,
          "source": "VSparkline",
          "description": "Missing description"
        },
        {
          "name": "padding",
          "type": [
            "string",
            "number"
          ],
          "default": 8,
          "source": "VSparkline",
          "description": "Missing description"
        },
        {
          "name": "showLabels",
          "type": "boolean",
          "default": "false",
          "source": "VSparkline",
          "description": "Missing description"
        },
        {
          "name": "smooth",
          "type": [
            "boolean",
            "number",
            "string"
          ],
          "default": false,
          "source": "VSparkline",
          "description": "Missing description"
        },
        {
          "name": "type",
          "type": "string",
          "default": "'trend'",
          "source": "VSparkline",
          "description": "Missing description"
        },
        {
          "name": "value",
          "type": "array",
          "default": [],
          "source": "VSparkline",
          "description": "Missing description"
        },
        {
          "name": "width",
          "type": [
            "number",
            "string"
          ],
          "default": 300,
          "source": "VSparkline",
          "description": "Missing description"
        }
      ],
      "mixins": [
        "colorable"
      ],
      "slots": [
        {
          "name": "label",
          "description": "Missing description"
        }
      ],
      "sass": []
    },
    "v-speed-dial": {
      "props": [
        {
          "name": "absolute",
          "type": "boolean",
          "default": "false",
          "source": "positionable",
          "description": "Missing description"
        },
        {
          "name": "bottom",
          "type": "boolean",
          "default": "false",
          "source": "positionable",
          "description": "Missing description"
        },
        {
          "name": "direction",
          "type": "string",
          "default": "'top'",
          "source": "v-speed-dial",
          "description": "Direction in which speed-dial content will show. Possible values are `top`, `bottom`, `left`, `right`."
        },
        {
          "name": "fixed",
          "type": "boolean",
          "default": "false",
          "source": "positionable",
          "description": "Missing description"
        },
        {
          "name": "left",
          "type": "boolean",
          "default": "false",
          "source": "positionable",
          "description": "Missing description"
        },
        {
          "name": "mode",
          "type": "string",
          "default": "undefined",
          "source": "transitionable",
          "description": "Missing description"
        },
        {
          "name": "openOnHover",
          "type": "boolean",
          "default": "false",
          "source": "v-speed-dial",
          "description": "Opens speed-dial on hover"
        },
        {
          "name": "origin",
          "type": "string",
          "default": "undefined",
          "source": "transitionable",
          "description": "Missing description"
        },
        {
          "name": "right",
          "type": "boolean",
          "default": "false",
          "source": "positionable",
          "description": "Missing description"
        },
        {
          "name": "top",
          "type": "boolean",
          "default": "false",
          "source": "positionable",
          "description": "Missing description"
        },
        {
          "name": "transition",
          "type": "string",
          "default": "'scale-transition'",
          "source": "transitionable",
          "description": "Missing description"
        },
        {
          "name": "value",
          "type": "any",
          "default": "undefined",
          "source": "toggleable",
          "description": "Missing description"
        }
      ],
      "mixins": [
        "positionable",
        "toggleable",
        "transitionable"
      ],
      "slots": [
        {
          "name": "activator",
          "description": "Missing description"
        },
        {
          "name": "default",
          "description": "Missing description"
        }
      ],
      "sass": [
        {
          "name": "$speed-dial-padding",
          "default": "16px !default;",
          "description": "Missing description"
        },
        {
          "name": "$speed-dial-button-margin",
          "default": "6px !default;",
          "description": "Missing description"
        },
        {
          "name": "$speed-dial-z-index",
          "default": "1 !default;",
          "description": "Missing description"
        }
      ]
    },
    "v-stepper": {
      "props": [
        {
          "name": "altLabels",
          "type": "boolean",
          "default": "false",
          "source": "v-stepper",
          "description": "Places the labels beneath the step"
        },
        {
          "name": "dark",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "light",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "nonLinear",
          "type": "boolean",
          "default": "false",
          "source": "v-stepper",
          "description": "Allow user to jump to any step"
        },
        {
          "name": "value",
          "type": [
            "number",
            "string"
          ],
          "default": "undefined",
          "source": "v-stepper",
          "description": "Missing description"
        },
        {
          "name": "vertical",
          "type": "boolean",
          "default": "false",
          "source": "v-stepper",
          "description": "Display steps vertically"
        }
      ],
      "mixins": [
        "registrable-provide",
        "themeable"
      ],
      "events": [
        {
          "name": "change",
          "value": "number",
          "description": "Missing description"
        }
      ],
      "slots": [
        {
          "name": "default",
          "description": "Missing description"
        }
      ],
      "sass": [
        {
          "name": "$stepper-alt-labels-flex-basis",
          "default": "175px !default;",
          "description": "Missing description"
        },
        {
          "name": "$stepper-alt-labels-header-divider",
          "default": "35px -67px 0 !default;",
          "description": "Missing description"
        },
        {
          "name": "$stepper-alt-labels-step-step-margin-bottom",
          "default": "11px !default;",
          "description": "Missing description"
        },
        {
          "name": "$stepper-border-radius",
          "default": "$border-radius-root !default;",
          "description": "Missing description"
        },
        {
          "name": "$stepper-content-btn-margin",
          "default": "24px 8px 8px 0 !default;",
          "description": "Missing description"
        },
        {
          "name": "$stepper-content-padding",
          "default": "24px 24px 16px 24px !default;",
          "description": "Missing description"
        },
        {
          "name": "$stepper-elevation",
          "default": "2 !default;",
          "description": "Missing description"
        },
        {
          "name": "$stepper-header-divider-margin",
          "default": "0 -16px !default;",
          "description": "Missing description"
        },
        {
          "name": "$stepper-header-elevation",
          "default": "2 !default;",
          "description": "Missing description"
        },
        {
          "name": "$stepper-header-height",
          "default": "72px !default;",
          "description": "Missing description"
        },
        {
          "name": "$stepper-label-line-height",
          "default": "1 !default;",
          "description": "Missing description"
        },
        {
          "name": "$stepper-label-small-font-size",
          "default": "map-deep-get($headings, 'caption', 'size') !default;",
          "description": "Missing description"
        },
        {
          "name": "$stepper-label-small-font-weight",
          "default": "300 !default;",
          "description": "Missing description"
        },
        {
          "name": "$stepper-step-error-icon-font-size",
          "default": "map-deep-get($headings, 'h5', 'size')  !default;",
          "description": "Missing description"
        },
        {
          "name": "$stepper-step-padding",
          "default": "24px !default;",
          "description": "Missing description"
        },
        {
          "name": "$stepper-step-step-font-size",
          "default": "map-deep-get($headings, 'caption', 'size') !default;",
          "description": "Missing description"
        },
        {
          "name": "$stepper-step-step-height",
          "default": "24px !default;",
          "description": "Missing description"
        },
        {
          "name": "$stepper-step-step-icon-font-size",
          "default": "map-deep-get($headings, 'h6', 'size') !default;",
          "description": "Missing description"
        },
        {
          "name": "$stepper-step-step-margin",
          "default": "8px !default;",
          "description": "Missing description"
        },
        {
          "name": "$stepper-step-step-min-width",
          "default": "24px !default;",
          "description": "Missing description"
        },
        {
          "name": "$stepper-step-step-width",
          "default": "24px !default;",
          "description": "Missing description"
        },
        {
          "name": "$stepper-vertical-content-ltr-margin",
          "default": "-8px -36px -16px 36px !default;",
          "description": "Missing description"
        },
        {
          "name": "$stepper-vertical-content-rtl-margin",
          "default": "-8px 36px -16px -36px !default;",
          "description": "Missing description"
        },
        {
          "name": "$stepper-vertical-content-padding",
          "default": "16px 60px 16px 23px !default;",
          "description": "Missing description"
        },
        {
          "name": "$stepper-vertical-padding-bottom",
          "default": "36px !default;",
          "description": "Missing description"
        },
        {
          "name": "$stepper-vertical-step-padding",
          "default": "24px 24px 16px !default;",
          "description": "Missing description"
        },
        {
          "name": "$stepper-vertical-step-step-margin",
          "default": "12px !default;",
          "description": "Missing description"
        }
      ]
    },
    "v-stepper-content": {
      "props": [
        {
          "name": "step",
          "type": [
            "number",
            "string"
          ],
          "default": "undefined",
          "source": "v-stepper-content",
          "description": "Sets step to associate the content to"
        }
      ],
      "mixins": [
        "registrable-inject"
      ],
      "slots": [
        {
          "name": "default",
          "description": "Missing description"
        }
      ],
      "sass": []
    },
    "v-stepper-step": {
      "props": [
        {
          "name": "color",
          "type": "string",
          "default": "'primary'",
          "source": "colorable",
          "description": "Missing description"
        },
        {
          "name": "complete",
          "type": "boolean",
          "default": "false",
          "source": "v-stepper-step",
          "description": "Missing description"
        },
        {
          "name": "completeIcon",
          "type": "string",
          "default": "'$vuetify.icons.complete'",
          "source": "v-stepper-step",
          "description": "Missing description"
        },
        {
          "name": "editIcon",
          "type": "string",
          "default": "'$vuetify.icons.edit'",
          "source": "v-stepper-step",
          "description": "Missing description"
        },
        {
          "name": "editable",
          "type": "boolean",
          "default": "false",
          "source": "v-stepper-step",
          "description": "Missing description"
        },
        {
          "name": "errorIcon",
          "type": "string",
          "default": "'$vuetify.icons.error'",
          "source": "v-stepper-step",
          "description": "Missing description"
        },
        {
          "name": "rules",
          "type": "array",
          "default": [],
          "source": "v-stepper-step",
          "description": "Missing description"
        },
        {
          "name": "step",
          "type": [
            "number",
            "string"
          ],
          "default": "undefined",
          "source": "v-stepper-step",
          "description": "Content to display inside step circle"
        }
      ],
      "mixins": [
        "colorable",
        "registrable-inject"
      ],
      "events": [
        {
          "name": "click",
          "value": "MouseEvent",
          "description": "Missing description"
        }
      ],
      "slots": [
        {
          "name": "default",
          "description": "Missing description"
        }
      ],
      "sass": []
    },
    "v-stepper-header": {
      "props": [],
      "mixins": [],
      "slots": [
        {
          "name": "default",
          "description": "Missing description"
        }
      ],
      "sass": []
    },
    "v-stepper-items": {
      "props": [],
      "mixins": [],
      "slots": [
        {
          "name": "default",
          "description": "Missing description"
        }
      ],
      "sass": []
    },
    "v-subheader": {
      "props": [
        {
          "name": "dark",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "inset",
          "type": "boolean",
          "default": "false",
          "source": "v-subheader",
          "description": "Adds indentation (72px)"
        },
        {
          "name": "light",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        }
      ],
      "mixins": [
        "themeable"
      ],
      "slots": [
        {
          "name": "default",
          "description": "Missing description"
        }
      ],
      "sass": [
        {
          "name": "$subheader-inset-margin",
          "default": "56px !default;",
          "description": "Missing description"
        },
        {
          "name": "$subheader-item-single-height",
          "default": "48px !default;",
          "description": "Missing description"
        },
        {
          "name": "$subheader-left-padding",
          "default": "16px !default;",
          "description": "Missing description"
        },
        {
          "name": "$subheader-right-padding",
          "default": "16px !default;",
          "description": "Missing description"
        }
      ]
    },
    "v-switch": {
      "props": [
        {
          "name": "appendIcon",
          "type": "string",
          "default": "undefined",
          "source": "v-input",
          "description": "Appends an icon to the component, uses the same syntax as `v-icon`"
        },
        {
          "name": "appendIconCb",
          "type": "function",
          "default": "null",
          "source": "v-input",
          "description": "Missing description"
        },
        {
          "name": "backgroundColor",
          "type": "string",
          "default": "undefined",
          "source": "v-input",
          "description": "Changes the background-color of the input"
        },
        {
          "name": "color",
          "type": "string",
          "default": "'accent'",
          "source": "colorable",
          "description": "Missing description"
        },
        {
          "name": "dark",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "disabled",
          "type": "boolean",
          "default": false,
          "source": "validatable",
          "value": "boolean",
          "description": "Missing description"
        },
        {
          "name": "error",
          "type": "boolean",
          "default": "false",
          "source": "validatable",
          "description": "Missing description"
        },
        {
          "name": "errorCount",
          "type": [
            "number",
            "string"
          ],
          "default": 1,
          "source": "validatable",
          "description": "Missing description"
        },
        {
          "name": "errorMessages",
          "type": [
            "string",
            "array"
          ],
          "default": [],
          "source": "validatable",
          "description": "Missing description"
        },
        {
          "name": "falseValue",
          "type": "any",
          "default": "undefined",
          "source": "selectable",
          "description": "Missing description"
        },
        {
          "name": "height",
          "type": [
            "number",
            "string"
          ],
          "default": "undefined",
          "source": "v-input",
          "description": "Sets the height of the input"
        },
        {
          "name": "hideDetails",
          "type": "boolean",
          "default": "false",
          "source": "v-input",
          "description": "Hides hint and validation errors. When set to `auto` messages will be rendered only if there's a message (hint, error message, counter value etc) to display"
        },
        {
          "name": "hint",
          "type": "string",
          "default": "undefined",
          "source": "v-input",
          "description": "Hint text"
        },
        {
          "name": "id",
          "type": "string",
          "default": "undefined",
          "source": "selectable",
          "description": "Missing description"
        },
        {
          "name": "inputValue",
          "type": "any",
          "default": "undefined",
          "source": "selectable",
          "description": "Missing description"
        },
        {
          "name": "label",
          "type": "string",
          "source": "v-input",
          "description": "Sets input label"
        },
        {
          "name": "light",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "loading",
          "type": [
            "boolean",
            "string"
          ],
          "default": false,
          "source": "v-input",
          "description": "Mixins.Loadable.props.loading"
        },
        {
          "name": "messages",
          "type": [
            "string",
            "array"
          ],
          "default": [],
          "source": "validatable",
          "description": "Missing description"
        },
        {
          "name": "multiple",
          "type": "boolean",
          "default": "false",
          "source": "selectable",
          "description": "Missing description"
        },
        {
          "name": "persistentHint",
          "type": "boolean",
          "default": "false",
          "source": "v-input",
          "description": "Forces hint to always be visible"
        },
        {
          "name": "prependIcon",
          "type": "string",
          "default": "undefined",
          "source": "v-input",
          "description": "Prepends an icon to the component, uses the same syntax as `v-icon`"
        },
        {
          "name": "prependIconCb",
          "type": "function",
          "default": "null",
          "source": "v-input",
          "description": "Missing description"
        },
        {
          "name": "readonly",
          "type": "boolean",
          "default": false,
          "source": "validatable",
          "value": "boolean",
          "description": "Missing description"
        },
        {
          "name": "ripple",
          "type": [
            "boolean",
            "object"
          ],
          "default": true,
          "source": "rippleable",
          "description": "Missing description"
        },
        {
          "name": "rules",
          "type": "array",
          "default": [],
          "source": "validatable",
          "description": "Missing description"
        },
        {
          "name": "success",
          "type": "boolean",
          "default": "false",
          "source": "validatable",
          "description": "Missing description"
        },
        {
          "name": "successMessages",
          "type": [
            "string",
            "array"
          ],
          "default": [],
          "source": "validatable",
          "description": "Missing description"
        },
        {
          "name": "trueValue",
          "type": "any",
          "default": "undefined",
          "source": "selectable",
          "description": "Missing description"
        },
        {
          "name": "validateOnBlur",
          "type": "boolean",
          "default": "false",
          "source": "validatable",
          "description": "Missing description"
        },
        {
          "name": "value",
          "type": "any",
          "source": "v-input",
          "description": "The input's value"
        },
        {
          "name": "valueComparator",
          "type": "function",
          "default": "null",
          "source": "comparable",
          "description": "Missing description"
        }
      ],
      "mixins": [
        "selectable",
        "rippleable",
        "comparable"
      ],
      "events": [
        {
          "name": "update:error",
          "source": "validatable",
          "value": "boolean",
          "description": "Missing description"
        },
        {
          "name": "change",
          "value": "any",
          "description": "Missing description"
        },
        {
          "name": "mousedown",
          "source": "v-input",
          "value": "MouseEvent",
          "description": "Missing description"
        },
        {
          "name": "mouseup",
          "source": "v-input",
          "value": "MouseEvent",
          "description": "Missing description"
        },
        {
          "name": "click:append",
          "source": "v-input",
          "value": "Event",
          "description": "Missing description"
        },
        {
          "name": "click:prepend",
          "source": "v-input",
          "value": "Event",
          "description": "Missing description"
        }
      ],
      "slots": [
        {
          "name": "append",
          "source": "v-input",
          "description": "Missing description"
        },
        {
          "name": "default",
          "source": "v-input",
          "description": "Missing description"
        },
        {
          "name": "prepend",
          "source": "v-input",
          "description": "Missing description"
        },
        {
          "name": "label",
          "source": "v-input",
          "description": "Missing description"
        },
        {
          "name": "message",
          "props": {
            "key": "number, // the messages index",
            "message": "string, // the message"
          },
          "source": "v-input",
          "description": "Missing description"
        }
      ],
      "sass": [
        {
          "name": "$switch-dirty-offset-x",
          "default": "20px !default;",
          "description": "Missing description"
        },
        {
          "name": "$switch-disabled-opacity",
          "default": ".6 !default;",
          "description": "Missing description"
        },
        {
          "name": "$switch-ripple-dense-top",
          "default": "calc(50% - 22px) !default;",
          "description": "Missing description"
        },
        {
          "name": "$switch-ripple-dense-x",
          "default": "-12px !default;",
          "description": "Missing description"
        },
        {
          "name": "$switch-ripple-top",
          "default": "calc(50% - 24px) !default;",
          "description": "Missing description"
        },
        {
          "name": "$switch-ripple-x",
          "default": "-14px !default;",
          "description": "Missing description"
        },
        {
          "name": "$switch-thumb-dense-height",
          "default": "18px !default;",
          "description": "Missing description"
        },
        {
          "name": "$switch-thumb-dense-width",
          "default": "18px !default;",
          "description": "Missing description"
        },
        {
          "name": "$switch-thumb-elevation",
          "default": "4 !default;",
          "description": "Missing description"
        },
        {
          "name": "$switch-thumb-height",
          "default": "20px !default;",
          "description": "Missing description"
        },
        {
          "name": "$switch-thumb-top",
          "default": "calc(50% - 10px) !default;",
          "description": "Missing description"
        },
        {
          "name": "$switch-thumb-width",
          "default": "20px !default;",
          "description": "Missing description"
        },
        {
          "name": "$switch-track-border-radius",
          "default": "8px !default;",
          "description": "Missing description"
        },
        {
          "name": "$switch-track-dense-height",
          "default": "12px !default;",
          "description": "Missing description"
        },
        {
          "name": "$switch-track-dense-inset-height",
          "default": "22px !default;",
          "description": "Missing description"
        },
        {
          "name": "$switch-track-dense-inset-width",
          "default": "44px !default;",
          "description": "Missing description"
        },
        {
          "name": "$switch-track-dense-top",
          "default": "calc(50% - 12px) !default;",
          "description": "Missing description"
        },
        {
          "name": "$switch-track-dense-width",
          "default": "32px !default;",
          "description": "Missing description"
        },
        {
          "name": "$switch-track-height",
          "default": "14px !default;",
          "description": "Missing description"
        },
        {
          "name": "$switch-track-inset-border-radius",
          "default": "14px !default;",
          "description": "Missing description"
        },
        {
          "name": "$switch-track-inset-height",
          "default": "28px !default;",
          "description": "Missing description"
        },
        {
          "name": "$switch-track-inset-opacity",
          "default": ".32 !default;",
          "description": "Missing description"
        },
        {
          "name": "$switch-track-inset-width",
          "default": "48px !default;",
          "description": "Missing description"
        },
        {
          "name": "$switch-track-opacity",
          "default": ".6 !default;",
          "description": "Missing description"
        },
        {
          "name": "$switch-track-top",
          "default": "calc(50% - 7px) !default;",
          "description": "Missing description"
        },
        {
          "name": "$switch-track-width",
          "default": "36px !default;",
          "description": "Missing description"
        },
        {
          "name": "$switch-track-x",
          "default": "2px !default;",
          "description": "Missing description"
        },
        {
          "name": "$switch-width",
          "default": "38px !default;",
          "description": "Missing description"
        }
      ]
    },
    "v-system-bar": {
      "props": [
        {
          "name": "absolute",
          "type": "boolean",
          "default": "false",
          "source": "positionable",
          "description": "Missing description"
        },
        {
          "name": "app",
          "type": "boolean",
          "default": "false",
          "source": "applicationable",
          "description": "Missing description"
        },
        {
          "name": "color",
          "type": "string",
          "default": "undefined",
          "source": "colorable",
          "description": "Missing description"
        },
        {
          "name": "dark",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "fixed",
          "type": "boolean",
          "default": "false",
          "source": "positionable",
          "description": "Missing description"
        },
        {
          "name": "height",
          "type": [
            "number",
            "string"
          ],
          "default": "undefined",
          "source": "v-system-bar",
          "description": "Mixins.Measurable.props.height"
        },
        {
          "name": "light",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "lightsOut",
          "type": "boolean",
          "default": "false",
          "source": "v-system-bar",
          "description": "Reduces the system bar opacity."
        },
        {
          "name": "status",
          "type": "boolean",
          "default": "false",
          "source": "v-system-bar",
          "description": "Missing description"
        },
        {
          "name": "window",
          "type": "boolean",
          "default": "false",
          "source": "v-system-bar",
          "description": "Increases the system bar height to 32px (24px default)."
        }
      ],
      "mixins": [
        "applicationable",
        "positionable",
        "colorable",
        "themeable"
      ],
      "sass": [
        {
          "name": "$system-bar-font-size",
          "default": "map-deep-get($headings, 'body-2', 'size') !default;",
          "description": "Missing description"
        },
        {
          "name": "$system-bar-font-weight",
          "default": "map-deep-get($headings, 'body-2', 'weight') !default;",
          "description": "Missing description"
        },
        {
          "name": "$system-bar-icon-font-size",
          "default": "map-deep-get($headings, 'subtitle-1', 'size') !default;",
          "description": "Missing description"
        },
        {
          "name": "$system-bar-padding",
          "default": "0 8px !default;",
          "description": "Missing description"
        },
        {
          "name": "$system-bar-icon-margin-right",
          "default": "4px !default;",
          "description": "Missing description"
        },
        {
          "name": "$system-bar-window-icon-margin-right",
          "default": "8px !default;",
          "description": "Missing description"
        },
        {
          "name": "$system-bar-window-icon-font-size",
          "default": "map-deep-get($headings, 'h6', 'size') !default;",
          "description": "Missing description"
        }
      ]
    },
    "v-tabs": {
      "props": [
        {
          "name": "activeClass",
          "type": "string",
          "default": "'v-tabs__item--active'",
          "source": "base-item-group",
          "description": "Missing description"
        },
        {
          "name": "alignWithTitle",
          "type": "boolean",
          "default": "false",
          "source": "v-tabs",
          "description": "Make `v-tabs` lined up with the toolbar title"
        },
        {
          "name": "centered",
          "type": "boolean",
          "default": "false",
          "source": "v-tabs",
          "description": "Missing description"
        },
        {
          "name": "color",
          "type": "string",
          "default": "undefined",
          "source": "colorable",
          "description": "Missing description"
        },
        {
          "name": "dark",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "fixedTabs",
          "type": "boolean",
          "default": "false",
          "source": "v-tabs",
          "description": "Missing description"
        },
        {
          "name": "grow",
          "type": "boolean",
          "default": "false",
          "source": "v-tabs",
          "description": "Force `v-tab`'s to take up all available space"
        },
        {
          "name": "height",
          "type": [
            "number",
            "string"
          ],
          "default": "undefined",
          "source": "v-tabs",
          "description": "Sets the height of the tabs bar"
        },
        {
          "name": "hideSlider",
          "type": "boolean",
          "default": "false",
          "source": "v-tabs",
          "description": "Hide's the generated `v-tabs-slider`"
        },
        {
          "name": "iconsAndText",
          "type": "boolean",
          "default": "false",
          "source": "v-tabs",
          "description": "Will stack icon and text vertically"
        },
        {
          "name": "light",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "mandatory",
          "type": "boolean",
          "default": "true",
          "source": "base-item-group",
          "description": "Missing description"
        },
        {
          "name": "max",
          "type": [
            "number",
            "string"
          ],
          "default": "undefined",
          "source": "base-item-group",
          "description": "Missing description"
        },
        {
          "name": "mobileBreakPoint",
          "type": [
            "number",
            "string"
          ],
          "default": 1264,
          "source": "v-tabs",
          "description": "Missing description"
        },
        {
          "name": "multiple",
          "type": "boolean",
          "default": "false",
          "source": "base-item-group",
          "description": "Missing description"
        },
        {
          "name": "nextIcon",
          "type": "string",
          "default": "'$vuetify.icons.next'",
          "source": "v-tabs",
          "description": "Right pagination icon"
        },
        {
          "name": "prevIcon",
          "type": "string",
          "default": "'$vuetify.icons.prev'",
          "source": "v-tabs",
          "description": "Left pagination icon"
        },
        {
          "name": "right",
          "type": "boolean",
          "default": "false",
          "source": "v-tabs",
          "description": "Aligns tabs to the right"
        },
        {
          "name": "showArrows",
          "type": "boolean",
          "default": "false",
          "source": "v-tabs",
          "description": "Show pagination arrows if the tab items overflow their container. For mobile devices, arrows will only display when using this prop."
        },
        {
          "name": "sliderColor",
          "type": "string",
          "default": "'accent'",
          "source": "v-tabs",
          "description": "Changes the background color of an auto-generated `v-tabs-slider`"
        },
        {
          "name": "value",
          "type": [
            "number",
            "string"
          ],
          "default": "undefined",
          "source": "proxyable",
          "description": "Missing description"
        }
      ],
      "mixins": [
        "colorable",
        "ssr-bootable",
        "themeable"
      ],
      "events": [
        {
          "name": "change",
          "value": "number",
          "description": "Missing description"
        }
      ],
      "slots": [
        {
          "name": "default",
          "description": "Missing description"
        }
      ],
      "sass": [
        {
          "name": "$tab-disabled-opacity",
          "default": ".5 !default;",
          "description": "Missing description"
        },
        {
          "name": "$tab-font-size",
          "default": "map-deep-get($headings, 'subtitle-2', 'size') !default;",
          "description": "Missing description"
        },
        {
          "name": "$tab-font-weight",
          "default": "map-deep-get($headings, 'subtitle-2', 'weight') !default;",
          "description": "Missing description"
        },
        {
          "name": "$tab-line-height",
          "default": "normal !default;",
          "description": "Missing description"
        },
        {
          "name": "$tabs-bar-background-color",
          "default": "'cards' !default;",
          "description": "Missing description"
        },
        {
          "name": "$tabs-bar-height",
          "default": "48px !default;",
          "description": "Missing description"
        },
        {
          "name": "$tabs-icons-and-text-bar-height",
          "default": "72px !default;",
          "description": "Missing description"
        },
        {
          "name": "$tabs-icons-and-text-first-tab-margin-bottom",
          "default": "6px !default;",
          "description": "Missing description"
        },
        {
          "name": "$tabs-item-align-with-title-margin",
          "default": "42px !default;",
          "description": "Missing description"
        },
        {
          "name": "$tabs-item-focus-opacity",
          "default": "0.20 !default;",
          "description": "Missing description"
        },
        {
          "name": "$tabs-item-hover-opacity",
          "default": "0.16 !default;",
          "description": "Missing description"
        },
        {
          "name": "$tabs-item-letter-spacing",
          "default": ".0892857143em !default;",
          "description": "Missing description"
        },
        {
          "name": "$tabs-item-max-width",
          "default": "360px !default;",
          "description": "Missing description"
        },
        {
          "name": "$tabs-item-min-width",
          "default": "90px !default;",
          "description": "Missing description"
        },
        {
          "name": "$tabs-item-padding",
          "default": "0 16px !default;",
          "description": "Missing description"
        },
        {
          "name": "$tabs-item-vertical-height",
          "default": "$tabs-bar-height !default;",
          "description": "Missing description"
        },
        {
          "name": "$tabs-item-vertical-icons-and-text-height",
          "default": "$tabs-icons-and-text-bar-height !default;",
          "description": "Missing description"
        }
      ]
    },
    "v-tab": {
      "props": [
        {
          "name": "activeClass",
          "type": "string",
          "source": "routable",
          "description": "Missing description"
        },
        {
          "name": "append",
          "type": "boolean",
          "default": "false",
          "source": "routable",
          "description": "Missing description"
        },
        {
          "name": "dark",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "disabled",
          "type": "boolean",
          "default": "false",
          "source": "routable",
          "description": "Missing description"
        },
        {
          "name": "exact",
          "type": "boolean",
          "default": "false",
          "source": "routable",
          "description": "Missing description"
        },
        {
          "name": "exactActiveClass",
          "type": "string",
          "default": "undefined",
          "source": "routable",
          "description": "Missing description"
        },
        {
          "name": "href",
          "type": [
            "string",
            "object"
          ],
          "default": "undefined",
          "source": "routable",
          "description": "Missing description"
        },
        {
          "name": "light",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "nuxt",
          "type": "boolean",
          "default": "false",
          "source": "routable",
          "description": "Missing description"
        },
        {
          "name": "replace",
          "type": "boolean",
          "default": "false",
          "source": "routable",
          "description": "Missing description"
        },
        {
          "name": "ripple",
          "type": [
            "boolean",
            "object"
          ],
          "default": true,
          "source": "routable",
          "description": "Missing description"
        },
        {
          "name": "tag",
          "type": "string",
          "default": "undefined",
          "source": "routable",
          "description": "Missing description"
        },
        {
          "name": "target",
          "type": "string",
          "default": "undefined",
          "source": "routable",
          "description": "Missing description"
        },
        {
          "name": "to",
          "type": [
            "string",
            "object"
          ],
          "default": "undefined",
          "source": "routable",
          "description": "Missing description"
        }
      ],
      "mixins": [
        "routable",
        "groupable",
        "themeable"
      ],
      "events": [
        {
          "name": "change",
          "value": "void",
          "description": "Missing description"
        },
        {
          "name": "click",
          "value": "ClickEvent",
          "description": "Missing description"
        },
        {
          "name": "keydown",
          "value": "KeyboardEvent",
          "description": "Missing description"
        }
      ],
      "slots": [
        {
          "name": "default",
          "description": "Missing description"
        }
      ],
      "sass": []
    },
    "v-tab-item": {
      "props": [
        {
          "name": "activeClass",
          "type": "string",
          "source": "groupable",
          "description": "Missing description"
        },
        {
          "name": "disabled",
          "type": "boolean",
          "default": "false",
          "source": "groupable",
          "description": "Missing description"
        },
        {
          "name": "id",
          "type": "string",
          "default": "undefined",
          "source": "v-tab-item",
          "description": "Missing description"
        },
        {
          "name": "lazy",
          "type": "boolean",
          "default": "false",
          "source": "bootable",
          "description": "Missing description"
        },
        {
          "name": "reverseTransition",
          "type": [
            "boolean",
            "string"
          ],
          "default": "undefined",
          "source": "v-window-item",
          "description": "Missing description"
        },
        {
          "name": "transition",
          "type": [
            "boolean",
            "string"
          ],
          "default": "undefined",
          "source": "v-window-item",
          "description": "Mixins.Transitionable.props.transition"
        },
        {
          "name": "value",
          "type": "any",
          "default": "undefined",
          "source": "v-window-item",
          "description": "Mixins.Groupable.props.value"
        }
      ],
      "mixins": [
        "bootable",
        "groupable"
      ],
      "slots": [
        {
          "name": "default",
          "description": "Missing description"
        }
      ],
      "sass": []
    },
    "v-tabs-items": {
      "props": [
        {
          "name": "activeClass",
          "type": "string",
          "default": "'v-item--active'",
          "source": "base-item-group",
          "description": "Missing description"
        },
        {
          "name": "cycle",
          "type": "boolean",
          "default": "false",
          "source": "v-tabs-items",
          "description": "Missing description"
        },
        {
          "name": "dark",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "light",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "mandatory",
          "type": "boolean",
          "default": "true",
          "source": "base-item-group",
          "description": "Missing description"
        },
        {
          "name": "max",
          "type": [
            "number",
            "string"
          ],
          "default": "undefined",
          "source": "base-item-group",
          "description": "Missing description"
        },
        {
          "name": "multiple",
          "type": "boolean",
          "default": "false",
          "source": "base-item-group",
          "description": "Missing description"
        },
        {
          "name": "reverse",
          "type": "boolean",
          "default": "false",
          "source": "v-window",
          "description": "Reverse the normal transition direction."
        },
        {
          "name": "touch",
          "type": "object",
          "default": "undefined",
          "source": "v-window",
          "description": "Provide a custom **left** and **right** function when swiped left or right."
        },
        {
          "name": "touchless",
          "type": "boolean",
          "default": "false",
          "source": "v-window",
          "description": "Disable touch support."
        },
        {
          "name": "value",
          "type": "any",
          "default": "undefined",
          "source": "proxyable",
          "description": "Missing description"
        },
        {
          "name": "vertical",
          "type": "boolean",
          "default": "false",
          "source": "v-window",
          "description": "Uses a vertical transition when changing windows."
        }
      ],
      "mixins": [
        "proxyable",
        "themeable"
      ],
      "events": [
        {
          "name": "change",
          "value": "string",
          "description": "Missing description"
        }
      ],
      "slots": [
        {
          "name": "default",
          "description": "Missing description"
        }
      ],
      "sass": []
    },
    "v-tabs-slider": {
      "props": [
        {
          "name": "color",
          "type": "string",
          "default": "undefined",
          "source": "colorable",
          "description": "Missing description"
        }
      ],
      "mixins": [
        "colorable"
      ],
      "sass": []
    },
    "v-textarea": {
      "props": [
        {
          "name": "appendIcon",
          "type": "string",
          "default": "undefined",
          "source": "v-input",
          "description": "Appends an icon to the component, uses the same syntax as `v-icon`"
        },
        {
          "name": "appendIconCb",
          "type": "function",
          "default": "null",
          "source": "v-input",
          "description": "Missing description"
        },
        {
          "name": "appendOuterIcon",
          "type": "string",
          "default": "undefined",
          "source": "v-text-field",
          "description": "Appends an icon to the outside the component's input, uses same syntax as `v-icon`"
        },
        {
          "name": "appendOuterIconCb",
          "type": "function",
          "default": "null",
          "source": "v-text-field",
          "description": "Missing description"
        },
        {
          "name": "autoGrow",
          "type": "boolean",
          "default": "false",
          "source": "v-textarea",
          "description": "Automatically grow the textarea depending on amount of text"
        },
        {
          "name": "autofocus",
          "type": "boolean",
          "default": "false",
          "source": "v-text-field",
          "description": "Enables autofocus"
        },
        {
          "name": "backgroundColor",
          "type": "string",
          "default": "undefined",
          "source": "v-input",
          "description": "Changes the background-color of the input"
        },
        {
          "name": "box",
          "type": "boolean",
          "default": "false",
          "source": "v-text-field",
          "description": "Missing description"
        },
        {
          "name": "browserAutocomplete",
          "type": "string",
          "default": "undefined",
          "source": "v-text-field",
          "description": "Missing description"
        },
        {
          "name": "clearIcon",
          "type": "string",
          "default": "'$vuetify.icons.clear'",
          "source": "v-text-field",
          "description": "Applied when using **clearable** and the input is dirty"
        },
        {
          "name": "clearIconCb",
          "type": "function",
          "default": "null",
          "source": "v-text-field",
          "description": "Missing description"
        },
        {
          "name": "clearable",
          "type": "boolean",
          "default": "false",
          "source": "v-text-field",
          "description": "Missing description"
        },
        {
          "name": "color",
          "type": "string",
          "default": "'primary'",
          "source": "colorable",
          "description": "Missing description"
        },
        {
          "name": "counter",
          "type": [
            "boolean",
            "number",
            "string"
          ],
          "default": "undefined",
          "source": "v-text-field",
          "description": "Creates counter for input length; if no number is specified, it defaults to 25. Does not apply any validation."
        },
        {
          "name": "dark",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "disabled",
          "type": "boolean",
          "default": false,
          "source": "validatable",
          "value": "boolean",
          "description": "Missing description"
        },
        {
          "name": "dontFillMaskBlanks",
          "type": "boolean",
          "default": "false",
          "source": "maskable",
          "description": "Missing description"
        },
        {
          "name": "error",
          "type": "boolean",
          "default": "false",
          "source": "validatable",
          "description": "Missing description"
        },
        {
          "name": "errorCount",
          "type": [
            "number",
            "string"
          ],
          "default": 1,
          "source": "validatable",
          "description": "Missing description"
        },
        {
          "name": "errorMessages",
          "type": [
            "string",
            "array"
          ],
          "default": [],
          "source": "validatable",
          "description": "Missing description"
        },
        {
          "name": "flat",
          "type": "boolean",
          "default": "false",
          "source": "v-text-field",
          "description": "Mixins.Soloable.props.flat"
        },
        {
          "name": "fullWidth",
          "type": "boolean",
          "default": "false",
          "source": "v-text-field",
          "description": "Designates input type as full-width"
        },
        {
          "name": "height",
          "type": [
            "number",
            "string"
          ],
          "default": "undefined",
          "source": "v-input",
          "description": "Sets the height of the input"
        },
        {
          "name": "hideDetails",
          "type": "boolean",
          "default": "false",
          "source": "v-input",
          "description": "Hides hint and validation errors. When set to `auto` messages will be rendered only if there's a message (hint, error message, counter value etc) to display"
        },
        {
          "name": "hint",
          "type": "string",
          "default": "undefined",
          "source": "v-input",
          "description": "Hint text"
        },
        {
          "name": "label",
          "type": "string",
          "source": "v-input",
          "description": "Sets input label"
        },
        {
          "name": "light",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "loading",
          "type": [
            "boolean",
            "string"
          ],
          "default": false,
          "source": "v-input",
          "description": "Mixins.Loadable.props.loading"
        },
        {
          "name": "mask",
          "type": [
            "object",
            "string"
          ],
          "default": "undefined",
          "source": "maskable",
          "description": "Missing description"
        },
        {
          "name": "messages",
          "type": [
            "string",
            "array"
          ],
          "default": [],
          "source": "validatable",
          "description": "Missing description"
        },
        {
          "name": "noResize",
          "type": "boolean",
          "default": "false",
          "source": "v-textarea",
          "description": "Remove resize handle"
        },
        {
          "name": "outline",
          "type": "boolean",
          "default": "false",
          "source": "v-text-field",
          "description": "Missing description"
        },
        {
          "name": "persistentHint",
          "type": "boolean",
          "default": "false",
          "source": "v-input",
          "description": "Forces hint to always be visible"
        },
        {
          "name": "placeholder",
          "type": "string",
          "default": "undefined",
          "source": "v-text-field",
          "description": "Sets the input’s placeholder text"
        },
        {
          "name": "prefix",
          "type": "string",
          "default": "undefined",
          "source": "v-text-field",
          "description": "Displays prefix text"
        },
        {
          "name": "prependIcon",
          "type": "string",
          "default": "undefined",
          "source": "v-input",
          "description": "Prepends an icon to the component, uses the same syntax as `v-icon`"
        },
        {
          "name": "prependIconCb",
          "type": "function",
          "default": "null",
          "source": "v-input",
          "description": "Missing description"
        },
        {
          "name": "prependInnerIcon",
          "type": "string",
          "default": "undefined",
          "source": "v-text-field",
          "description": "Prepends an icon inside the component's input, uses the same syntax as `v-icon`"
        },
        {
          "name": "prependInnerIconCb",
          "type": "function",
          "default": "null",
          "source": "v-text-field",
          "description": "Missing description"
        },
        {
          "name": "readonly",
          "type": "boolean",
          "default": false,
          "source": "validatable",
          "value": "boolean",
          "description": "Missing description"
        },
        {
          "name": "returnMaskedValue",
          "type": "boolean",
          "default": "false",
          "source": "maskable",
          "description": "Missing description"
        },
        {
          "name": "reverse",
          "type": "boolean",
          "default": "false",
          "source": "v-text-field",
          "description": "Reverses the input orientation"
        },
        {
          "name": "rowHeight",
          "type": [
            "number",
            "string"
          ],
          "default": 24,
          "source": "v-textarea",
          "description": "Height value for each row. Requires the use of the **auto-grow** prop."
        },
        {
          "name": "rows",
          "type": [
            "number",
            "string"
          ],
          "default": 5,
          "source": "v-textarea",
          "description": "Default row count"
        },
        {
          "name": "rules",
          "type": "array",
          "default": [],
          "source": "validatable",
          "description": "Missing description"
        },
        {
          "name": "singleLine",
          "type": "boolean",
          "default": "false",
          "source": "v-text-field",
          "description": "Missing description"
        },
        {
          "name": "solo",
          "type": "boolean",
          "default": "false",
          "source": "v-text-field",
          "description": "Mixins.Soloable.props.solo"
        },
        {
          "name": "soloInverted",
          "type": "boolean",
          "default": "false",
          "source": "v-text-field",
          "description": "Mixins.Soloable.props.soloInverted"
        },
        {
          "name": "success",
          "type": "boolean",
          "default": "false",
          "source": "validatable",
          "description": "Missing description"
        },
        {
          "name": "successMessages",
          "type": [
            "string",
            "array"
          ],
          "default": [],
          "source": "validatable",
          "description": "Missing description"
        },
        {
          "name": "suffix",
          "type": "string",
          "default": "undefined",
          "source": "v-text-field",
          "description": "Displays suffix text"
        },
        {
          "name": "type",
          "type": "string",
          "default": "'text'",
          "source": "v-text-field",
          "description": "Sets input type"
        },
        {
          "name": "validateOnBlur",
          "type": "boolean",
          "default": "false",
          "source": "validatable",
          "description": "Missing description"
        },
        {
          "name": "value",
          "type": "any",
          "source": "v-input",
          "description": "The input's value"
        }
      ],
      "mixins": [
        "maskable",
        "loadable"
      ],
      "events": [
        {
          "name": "update:error",
          "source": "validatable",
          "value": "boolean",
          "description": "Missing description"
        },
        {
          "name": "click",
          "source": "v-input",
          "value": "MouseEvent",
          "description": "Missing description"
        },
        {
          "name": "mousedown",
          "source": "v-input",
          "value": "MouseEvent",
          "description": "Missing description"
        },
        {
          "name": "mouseup",
          "source": "v-input",
          "value": "MouseEvent",
          "description": "Missing description"
        },
        {
          "name": "click:append",
          "source": "v-input",
          "value": "Event",
          "description": "Missing description"
        },
        {
          "name": "click:prepend",
          "source": "v-input",
          "value": "Event",
          "description": "Missing description"
        },
        {
          "name": "blur",
          "source": "v-text-field",
          "value": "Event",
          "description": "Emitted when the input is blurred"
        },
        {
          "name": "click:clear",
          "source": "v-text-field",
          "value": "Event",
          "description": "Emitted when clearable icon clicked"
        },
        {
          "name": "click:append-outer",
          "source": "v-text-field",
          "value": "Event",
          "description": "Emitted when appended outer icon is clicked"
        },
        {
          "name": "click:prepend-inner",
          "source": "v-text-field",
          "value": "Event",
          "description": "Emitted when prepended inner icon is clicked"
        },
        {
          "name": "focus",
          "source": "v-text-field",
          "value": "Event",
          "description": "Emitted when component is focused"
        },
        {
          "name": "change",
          "source": "v-text-field",
          "value": "any",
          "description": "Emitted when the input is changed by user interaction"
        },
        {
          "name": "input",
          "source": "v-text-field",
          "value": "any",
          "description": "Missing description"
        },
        {
          "name": "keydown",
          "source": "v-text-field",
          "value": "KeyboardEvent",
          "description": "Emitted when **any** key is pressed"
        }
      ],
      "slots": [
        {
          "name": "append",
          "source": "v-input",
          "description": "Missing description"
        },
        {
          "name": "default",
          "source": "v-input",
          "description": "Missing description"
        },
        {
          "name": "prepend",
          "source": "v-input",
          "description": "Missing description"
        },
        {
          "name": "label",
          "source": "v-input",
          "description": "Missing description"
        },
        {
          "name": "message",
          "props": {
            "key": "number, // the messages index",
            "message": "string, // the message"
          },
          "source": "v-input",
          "description": "Missing description"
        },
        {
          "name": "append-outer",
          "source": "v-text-field",
          "description": "Adds an item outside the input and after input content"
        },
        {
          "name": "prepend-inner",
          "source": "v-text-field",
          "description": "Adds an item inside the input and before input content"
        },
        {
          "name": "progress",
          "source": "v-text-field",
          "description": "Missing description"
        }
      ],
      "sass": [
        {
          "name": "$textarea-box-enclosed-prefix-margin-top",
          "default": "24px !default;",
          "description": "Missing description"
        },
        {
          "name": "$textarea-box-enclosed-single-outlined-label-top",
          "default": "18px !default;",
          "description": "Missing description"
        },
        {
          "name": "$textarea-box-enclosed-single-outlined-margin-top",
          "default": "10px !default;",
          "description": "Missing description"
        },
        {
          "name": "$textarea-dense-box-enclosed-single-outlined-margin-top",
          "default": "6px !default;",
          "description": "Missing description"
        },
        {
          "name": "$textarea-dense-append-prepend-margin-top",
          "default": "8px !default;",
          "description": "Missing description"
        },
        {
          "name": "$textarea-enclosed-text-slot-margin",
          "default": "-12px !default;",
          "description": "Missing description"
        },
        {
          "name": "$textarea-enclosed-text-slot-padding",
          "default": "12px !default;",
          "description": "Missing description"
        },
        {
          "name": "$textarea-line-height",
          "default": "1.75rem !default;",
          "description": "Missing description"
        },
        {
          "name": "$textarea-min-height",
          "default": "32px !default;",
          "description": "Missing description"
        },
        {
          "name": "$textarea-padding",
          "default": "0 !default;",
          "description": "Missing description"
        },
        {
          "name": "$textarea-prefix-padding-top",
          "default": "2px !default;",
          "description": "Missing description"
        },
        {
          "name": "$textarea-solo-append-padding",
          "default": "12px !default;",
          "description": "Missing description"
        },
        {
          "name": "$textarea-solo-append-prepend-margin-top",
          "default": "12px !default;",
          "description": "Missing description"
        }
      ]
    },
    "v-text-field": {
      "props": [
        {
          "name": "appendIcon",
          "type": "string",
          "default": "undefined",
          "source": "v-input",
          "description": "Appends an icon to the component, uses the same syntax as `v-icon`"
        },
        {
          "name": "appendIconCb",
          "type": "function",
          "default": "null",
          "source": "v-input",
          "description": "Missing description"
        },
        {
          "name": "appendOuterIcon",
          "type": "string",
          "default": "undefined",
          "source": "v-text-field",
          "description": "Appends an icon to the outside the component's input, uses same syntax as `v-icon`"
        },
        {
          "name": "appendOuterIconCb",
          "type": "function",
          "default": "null",
          "source": "v-text-field",
          "description": "Missing description"
        },
        {
          "name": "autofocus",
          "type": "boolean",
          "default": "false",
          "source": "v-text-field",
          "description": "Enables autofocus"
        },
        {
          "name": "backgroundColor",
          "type": "string",
          "default": "undefined",
          "source": "v-input",
          "description": "Changes the background-color of the input"
        },
        {
          "name": "box",
          "type": "boolean",
          "default": "false",
          "source": "v-text-field",
          "description": "Missing description"
        },
        {
          "name": "browserAutocomplete",
          "type": "string",
          "default": "undefined",
          "source": "v-text-field",
          "description": "Missing description"
        },
        {
          "name": "clearIcon",
          "type": "string",
          "default": "'$vuetify.icons.clear'",
          "source": "v-text-field",
          "description": "Applied when using **clearable** and the input is dirty"
        },
        {
          "name": "clearIconCb",
          "type": "function",
          "default": "null",
          "source": "v-text-field",
          "description": "Missing description"
        },
        {
          "name": "clearable",
          "type": "boolean",
          "default": "false",
          "source": "v-text-field",
          "description": "Missing description"
        },
        {
          "name": "color",
          "type": "string",
          "default": "'primary'",
          "source": "colorable",
          "description": "Missing description"
        },
        {
          "name": "counter",
          "type": [
            "boolean",
            "number",
            "string"
          ],
          "default": "undefined",
          "source": "v-text-field",
          "description": "Creates counter for input length; if no number is specified, it defaults to 25. Does not apply any validation."
        },
        {
          "name": "dark",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "disabled",
          "type": "boolean",
          "default": false,
          "source": "validatable",
          "value": "boolean",
          "description": "Missing description"
        },
        {
          "name": "dontFillMaskBlanks",
          "type": "boolean",
          "default": "false",
          "source": "maskable",
          "description": "Missing description"
        },
        {
          "name": "error",
          "type": "boolean",
          "default": "false",
          "source": "validatable",
          "description": "Missing description"
        },
        {
          "name": "errorCount",
          "type": [
            "number",
            "string"
          ],
          "default": 1,
          "source": "validatable",
          "description": "Missing description"
        },
        {
          "name": "errorMessages",
          "type": [
            "string",
            "array"
          ],
          "default": [],
          "source": "validatable",
          "description": "Missing description"
        },
        {
          "name": "flat",
          "type": "boolean",
          "default": "false",
          "source": "v-text-field",
          "description": "Mixins.Soloable.props.flat"
        },
        {
          "name": "fullWidth",
          "type": "boolean",
          "default": "false",
          "source": "v-text-field",
          "description": "Designates input type as full-width"
        },
        {
          "name": "height",
          "type": [
            "number",
            "string"
          ],
          "default": "undefined",
          "source": "v-input",
          "description": "Sets the height of the input"
        },
        {
          "name": "hideDetails",
          "type": "boolean",
          "default": "false",
          "source": "v-input",
          "description": "Hides hint and validation errors. When set to `auto` messages will be rendered only if there's a message (hint, error message, counter value etc) to display"
        },
        {
          "name": "hint",
          "type": "string",
          "default": "undefined",
          "source": "v-input",
          "description": "Hint text"
        },
        {
          "name": "label",
          "type": "string",
          "source": "v-input",
          "description": "Sets input label"
        },
        {
          "name": "light",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "loading",
          "type": [
            "boolean",
            "string"
          ],
          "default": false,
          "source": "v-input",
          "description": "Mixins.Loadable.props.loading"
        },
        {
          "name": "mask",
          "type": [
            "object",
            "string"
          ],
          "default": "undefined",
          "source": "maskable",
          "description": "Missing description"
        },
        {
          "name": "messages",
          "type": [
            "string",
            "array"
          ],
          "default": [],
          "source": "validatable",
          "description": "Missing description"
        },
        {
          "name": "outline",
          "type": "boolean",
          "default": "false",
          "source": "v-text-field",
          "description": "Missing description"
        },
        {
          "name": "persistentHint",
          "type": "boolean",
          "default": "false",
          "source": "v-input",
          "description": "Forces hint to always be visible"
        },
        {
          "name": "placeholder",
          "type": "string",
          "default": "undefined",
          "source": "v-text-field",
          "description": "Sets the input’s placeholder text"
        },
        {
          "name": "prefix",
          "type": "string",
          "default": "undefined",
          "source": "v-text-field",
          "description": "Displays prefix text"
        },
        {
          "name": "prependIcon",
          "type": "string",
          "default": "undefined",
          "source": "v-input",
          "description": "Prepends an icon to the component, uses the same syntax as `v-icon`"
        },
        {
          "name": "prependIconCb",
          "type": "function",
          "default": "null",
          "source": "v-input",
          "description": "Missing description"
        },
        {
          "name": "prependInnerIcon",
          "type": "string",
          "default": "undefined",
          "source": "v-text-field",
          "description": "Prepends an icon inside the component's input, uses the same syntax as `v-icon`"
        },
        {
          "name": "prependInnerIconCb",
          "type": "function",
          "default": "null",
          "source": "v-text-field",
          "description": "Missing description"
        },
        {
          "name": "readonly",
          "type": "boolean",
          "default": false,
          "source": "validatable",
          "value": "boolean",
          "description": "Missing description"
        },
        {
          "name": "returnMaskedValue",
          "type": "boolean",
          "default": "false",
          "source": "maskable",
          "description": "Missing description"
        },
        {
          "name": "reverse",
          "type": "boolean",
          "default": "false",
          "source": "v-text-field",
          "description": "Reverses the input orientation"
        },
        {
          "name": "rules",
          "type": "array",
          "default": [],
          "source": "validatable",
          "description": "Missing description"
        },
        {
          "name": "singleLine",
          "type": "boolean",
          "default": "false",
          "source": "v-text-field",
          "description": "Missing description"
        },
        {
          "name": "solo",
          "type": "boolean",
          "default": "false",
          "source": "v-text-field",
          "description": "Mixins.Soloable.props.solo"
        },
        {
          "name": "soloInverted",
          "type": "boolean",
          "default": "false",
          "source": "v-text-field",
          "description": "Mixins.Soloable.props.soloInverted"
        },
        {
          "name": "success",
          "type": "boolean",
          "default": "false",
          "source": "validatable",
          "description": "Missing description"
        },
        {
          "name": "successMessages",
          "type": [
            "string",
            "array"
          ],
          "default": [],
          "source": "validatable",
          "description": "Missing description"
        },
        {
          "name": "suffix",
          "type": "string",
          "default": "undefined",
          "source": "v-text-field",
          "description": "Displays suffix text"
        },
        {
          "name": "type",
          "type": "string",
          "default": "'text'",
          "source": "v-text-field",
          "description": "Sets input type"
        },
        {
          "name": "validateOnBlur",
          "type": "boolean",
          "default": "false",
          "source": "validatable",
          "description": "Missing description"
        },
        {
          "name": "value",
          "type": "any",
          "source": "v-input",
          "description": "The input's value"
        }
      ],
      "mixins": [
        "maskable",
        "loadable"
      ],
      "events": [
        {
          "name": "update:error",
          "source": "validatable",
          "value": "boolean",
          "description": "Missing description"
        },
        {
          "name": "click",
          "source": "v-input",
          "value": "MouseEvent",
          "description": "Missing description"
        },
        {
          "name": "mousedown",
          "source": "v-input",
          "value": "MouseEvent",
          "description": "Missing description"
        },
        {
          "name": "mouseup",
          "source": "v-input",
          "value": "MouseEvent",
          "description": "Missing description"
        },
        {
          "name": "click:append",
          "source": "v-input",
          "value": "Event",
          "description": "Missing description"
        },
        {
          "name": "click:prepend",
          "source": "v-input",
          "value": "Event",
          "description": "Missing description"
        },
        {
          "name": "blur",
          "source": "v-text-field",
          "value": "Event",
          "description": "Emitted when the input is blurred"
        },
        {
          "name": "click:clear",
          "source": "v-text-field",
          "value": "Event",
          "description": "Emitted when clearable icon clicked"
        },
        {
          "name": "click:append-outer",
          "source": "v-text-field",
          "value": "Event",
          "description": "Emitted when appended outer icon is clicked"
        },
        {
          "name": "click:prepend-inner",
          "source": "v-text-field",
          "value": "Event",
          "description": "Emitted when prepended inner icon is clicked"
        },
        {
          "name": "focus",
          "source": "v-text-field",
          "value": "Event",
          "description": "Emitted when component is focused"
        },
        {
          "name": "change",
          "source": "v-text-field",
          "value": "any",
          "description": "Emitted when the input is changed by user interaction"
        },
        {
          "name": "input",
          "source": "v-text-field",
          "value": "any",
          "description": "Missing description"
        },
        {
          "name": "keydown",
          "source": "v-text-field",
          "value": "KeyboardEvent",
          "description": "Emitted when **any** key is pressed"
        }
      ],
      "slots": [
        {
          "name": "append",
          "source": "v-input",
          "description": "Missing description"
        },
        {
          "name": "default",
          "source": "v-input",
          "description": "Missing description"
        },
        {
          "name": "prepend",
          "source": "v-input",
          "description": "Missing description"
        },
        {
          "name": "label",
          "source": "v-input",
          "description": "Missing description"
        },
        {
          "name": "message",
          "props": {
            "key": "number, // the messages index",
            "message": "string, // the message"
          },
          "source": "v-input",
          "description": "Missing description"
        },
        {
          "name": "append-outer",
          "source": "v-text-field",
          "description": "Adds an item outside the input and after input content"
        },
        {
          "name": "prepend-inner",
          "source": "v-text-field",
          "description": "Adds an item inside the input and before input content"
        },
        {
          "name": "progress",
          "source": "v-text-field",
          "description": "Missing description"
        }
      ],
      "sass": [
        {
          "name": "$text-field-border-radius",
          "default": "$border-radius-root !default;",
          "description": "Missing description"
        },
        {
          "name": "$text-field-line-height",
          "default": "20px !default;",
          "description": "Missing description"
        },
        {
          "name": "$text-field-padding",
          "default": "8px 0 8px !default;",
          "description": "Missing description"
        },
        {
          "name": "$text-field-dense-padding",
          "default": "4px 0 2px !default;",
          "description": "Missing description"
        },
        {
          "name": "$text-field-append-prepend-margin",
          "default": "4px !default;",
          "description": "Missing description"
        },
        {
          "name": "$text-field-dense-append-prepend-margin",
          "default": "0px !default;",
          "description": "Missing description"
        },
        {
          "name": "$text-field-dense-icon-append-prepend-margin-top",
          "default": "8px !default;",
          "description": "Missing description"
        },
        {
          "name": "$text-field-filled-full-width-outlined-slot-min-height",
          "default": "56px !default;",
          "description": "Missing description"
        },
        {
          "name": "$text-field-filled-full-width-outlined-dense-slot-min-height",
          "default": "52px !default;",
          "description": "Missing description"
        },
        {
          "name": "$text-field-filled-full-width-outlined-single-line-slot-min-height",
          "default": "40px !default;",
          "description": "Missing description"
        },
        {
          "name": "$text-field-filled-border-radius",
          "default": "$text-field-border-radius $text-field-border-radius 0 0 !default;",
          "description": "Missing description"
        },
        {
          "name": "$text-field-counter-margin",
          "default": "8px !default;",
          "description": "Missing description"
        },
        {
          "name": "$text-field-label-top",
          "default": "6px !default;",
          "description": "Missing description"
        },
        {
          "name": "$text-field-label-active-transform",
          "default": "translateY(-18px) scale(.75) !default;",
          "description": "Missing description"
        },
        {
          "name": "$text-field-details-min-height",
          "default": "14px !default;",
          "description": "Missing description"
        },
        {
          "name": "$text-field-filled-full-width-label-top",
          "default": "18px !default;",
          "description": "Missing description"
        },
        {
          "name": "$text-field-filled-full-width-label-active-transform",
          "default": "translateY(-6px) scale(.75) !default;",
          "description": "Missing description"
        },
        {
          "name": "$text-field-dense-label-top",
          "default": "17px !default;",
          "description": "Missing description"
        },
        {
          "name": "$text-field-dense-label-active-transform",
          "default": "translateY(-10px) scale(.75) !default;",
          "description": "Missing description"
        },
        {
          "name": "$text-field-single-line-label-top",
          "default": "11px !default;",
          "description": "Missing description"
        },
        {
          "name": "$text-field-filled-margin-top",
          "default": "22px !default;",
          "description": "Missing description"
        },
        {
          "name": "$text-field-enclosed-prepend-append-margin-top",
          "default": "17px !default;",
          "description": "Missing description"
        },
        {
          "name": "$text-field-dense-prepend-append-margin-top",
          "default": "14px !default;",
          "description": "Missing description"
        },
        {
          "name": "$text-field-single-line-prepend-append-margin-top",
          "default": "9px !default;",
          "description": "Missing description"
        },
        {
          "name": "$text-field-outlined-prepend-append-margin-top",
          "default": "8px !default;",
          "description": "Missing description"
        },
        {
          "name": "$text-field-enclosed-details-padding",
          "default": "0 12px !default;",
          "description": "Missing description"
        },
        {
          "name": "$text-field-details-margin-bottom",
          "default": "8px !default;",
          "description": "Missing description"
        },
        {
          "name": "$text-field-outlined-margin-bottom",
          "default": "16px !default;",
          "description": "Missing description"
        },
        {
          "name": "$text-field-outlined-label-position-x",
          "default": "18px !default;",
          "description": "Missing description"
        },
        {
          "name": "$text-field-outlined-label-position-y",
          "default": "-24px !default;",
          "description": "Missing description"
        },
        {
          "name": "$text-field-outlined-dense-label-position-x",
          "default": "10px !default;",
          "description": "Missing description"
        },
        {
          "name": "$text-field-outlined-dense-label-position-y",
          "default": "-16px !default;",
          "description": "Missing description"
        },
        {
          "name": "$text-field-prefix-max-height",
          "default": "32px !default;",
          "description": "Missing description"
        },
        {
          "name": "$text-field-outlined-append-prepend-outer-margin-top",
          "default": "18px !default;",
          "description": "Missing description"
        },
        {
          "name": "$text-field-outlined-fieldset-top",
          "default": "-5px !default;",
          "description": "Missing description"
        },
        {
          "name": "$text-field-outlined-fieldset-border-width",
          "default": "1px !default;",
          "description": "Missing description"
        },
        {
          "name": "$text-field-outlined-fieldset-padding",
          "default": "8px !default;",
          "description": "Missing description"
        },
        {
          "name": "$text-field-outlined-legend-line-height",
          "default": "11px !default;",
          "description": "Missing description"
        },
        {
          "name": "$text-field-rounded-legend-margin",
          "default": "12px !default;",
          "description": "Missing description"
        },
        {
          "name": "$text-field-rounded-border-radius",
          "default": "28px !default;",
          "description": "Missing description"
        },
        {
          "name": "$text-field-shaped-border-radius",
          "default": "16px 16px 0 0 !default;",
          "description": "Missing description"
        },
        {
          "name": "$text-field-outlined-fieldset-border",
          "default": "2px solid currentColor !default;",
          "description": "Missing description"
        },
        {
          "name": "$text-field-outlined-rounded-slot-padding",
          "default": "0 24px !default;",
          "description": "Missing description"
        },
        {
          "name": "$text-field-solo-label-top",
          "default": "calc(50% - 9px) !default;",
          "description": "Missing description"
        },
        {
          "name": "$text-field-solo-control-min-height",
          "default": "48px !default;",
          "description": "Missing description"
        },
        {
          "name": "$text-field-solo-dense-control-min-height",
          "default": "38px !default;",
          "description": "Missing description"
        },
        {
          "name": "$text-field-solo-outer-margin-top",
          "default": "12px !default;",
          "description": "Missing description"
        },
        {
          "name": "$text-field-solo-dense-outer-margin-top",
          "default": "7px !default;",
          "description": "Missing description"
        }
      ]
    },
    "v-timeline": {
      "props": [
        {
          "name": "alignTop",
          "type": "boolean",
          "default": "false",
          "source": "v-timeline",
          "description": "Align caret and dot of timeline items to the top"
        },
        {
          "name": "dark",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "dense",
          "type": "boolean",
          "default": "false",
          "source": "v-timeline",
          "description": "Hide opposite slot content, and position all items to one side of timeline"
        },
        {
          "name": "light",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        }
      ],
      "mixins": [
        "themeable"
      ],
      "slots": [
        {
          "name": "default",
          "description": "Missing description"
        }
      ],
      "sass": [
        {
          "name": "$timeline-divider-center",
          "default": "50% !default;",
          "description": "Missing description"
        },
        {
          "name": "$timeline-divider-width",
          "default": "96px !default;",
          "description": "Missing description"
        },
        {
          "name": "$timeline-item-padding",
          "default": "24px !default;",
          "description": "Missing description"
        },
        {
          "name": "$timeline-line-width",
          "default": "2px !default;",
          "description": "Missing description"
        },
        {
          "name": "$timeline-wedge-size",
          "default": "10px !default;",
          "description": "Missing description"
        },
        {
          "name": "$timeline-dot-small-size",
          "default": "24px !default;",
          "description": "Missing description"
        },
        {
          "name": "$timeline-dot-regular-size",
          "default": "38px !default;",
          "description": "Missing description"
        },
        {
          "name": "$timeline-dot-large-size",
          "default": "52px !default;",
          "description": "Missing description"
        },
        {
          "name": "$timeline-inner-dot-small-size",
          "default": "18px !default;",
          "description": "Missing description"
        },
        {
          "name": "$timeline-inner-dot-regular-size",
          "default": "30px !default;",
          "description": "Missing description"
        },
        {
          "name": "$timeline-inner-dot-large-size",
          "default": "42px !default;",
          "description": "Missing description"
        }
      ]
    },
    "v-timeline-item": {
      "props": [
        {
          "name": "color",
          "type": "string",
          "default": "'primary'",
          "source": "colorable",
          "description": "Missing description"
        },
        {
          "name": "dark",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "fillDot",
          "type": "boolean",
          "default": "false",
          "source": "v-timeline-item",
          "description": "Remove padding from dot container"
        },
        {
          "name": "hideDot",
          "type": "boolean",
          "default": "false",
          "source": "v-timeline-item",
          "description": "Hide display of timeline dot"
        },
        {
          "name": "icon",
          "type": "string",
          "default": "undefined",
          "source": "v-timeline-item",
          "description": "Specify icon for dot container"
        },
        {
          "name": "iconColor",
          "type": "string",
          "default": "undefined",
          "source": "v-timeline-item",
          "description": "Mixins.Colorable.props.color"
        },
        {
          "name": "large",
          "type": "boolean",
          "default": "false",
          "source": "v-timeline-item",
          "description": "Large size dot"
        },
        {
          "name": "left",
          "type": "boolean",
          "default": "false",
          "source": "v-timeline-item",
          "description": "Explicitly set the item to a left orientation"
        },
        {
          "name": "light",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "right",
          "type": "boolean",
          "default": "false",
          "source": "v-timeline-item",
          "description": "Explicitly set the item to a right orientation"
        },
        {
          "name": "small",
          "type": "boolean",
          "default": "false",
          "source": "v-timeline-item",
          "description": "Small size dot"
        }
      ],
      "mixins": [
        "colorable",
        "themeable"
      ],
      "slots": [
        {
          "name": "icon",
          "description": "Missing description"
        },
        {
          "name": "opposite",
          "description": "Missing description"
        },
        {
          "name": "default",
          "description": "Missing description"
        }
      ],
      "sass": []
    },
    "v-time-picker": {
      "props": [
        {
          "name": "allowedHours",
          "type": "function",
          "default": "null",
          "source": "v-time-picker",
          "description": "Restricts which hours can be selected"
        },
        {
          "name": "allowedMinutes",
          "type": "function",
          "default": "null",
          "source": "v-time-picker",
          "description": "Restricts which minutes can be selected"
        },
        {
          "name": "allowedSeconds",
          "type": "function",
          "default": "null",
          "source": "v-time-picker",
          "description": "Restricts which seconds can be selected"
        },
        {
          "name": "color",
          "type": "string",
          "default": "undefined",
          "source": "colorable",
          "description": "Missing description"
        },
        {
          "name": "dark",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "disabled",
          "type": "boolean",
          "default": "false",
          "source": "v-time-picker",
          "description": "disables picker"
        },
        {
          "name": "format",
          "type": "string",
          "default": "'ampm'",
          "source": "v-time-picker",
          "description": "Defines the format of a time displayed in picker. Available options are `ampm` and `24hr`."
        },
        {
          "name": "fullWidth",
          "type": "boolean",
          "default": "false",
          "source": "picker",
          "description": "Missing description"
        },
        {
          "name": "headerColor",
          "type": "string",
          "default": "undefined",
          "source": "picker",
          "description": "Missing description"
        },
        {
          "name": "landscape",
          "type": "boolean",
          "default": "false",
          "source": "picker",
          "description": "Missing description"
        },
        {
          "name": "light",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "max",
          "type": "string",
          "default": "undefined",
          "source": "v-time-picker",
          "description": "Maximum allowed time"
        },
        {
          "name": "min",
          "type": "string",
          "default": "undefined",
          "source": "v-time-picker",
          "description": "Minimum allowed time"
        },
        {
          "name": "noTitle",
          "type": "boolean",
          "default": "false",
          "source": "picker",
          "description": "Missing description"
        },
        {
          "name": "readonly",
          "type": "boolean",
          "default": "false",
          "source": "v-time-picker",
          "description": "Puts picker in readonly state"
        },
        {
          "name": "scrollable",
          "type": "boolean",
          "default": "false",
          "source": "v-time-picker",
          "description": "Allows changing hour/minute with mouse scroll"
        },
        {
          "name": "useSeconds",
          "type": "boolean",
          "default": "false",
          "source": "v-time-picker",
          "description": "Toggles the use of seconds in picker"
        },
        {
          "name": "value",
          "type": "any",
          "default": "undefined",
          "source": "v-time-picker",
          "description": "Time picker model (ISO 8601 format, 24hr hh:mm)"
        },
        {
          "name": "width",
          "type": [
            "number",
            "string"
          ],
          "default": 290,
          "source": "picker",
          "description": "Missing description"
        }
      ],
      "mixins": [
        "picker",
        "colorable",
        "themeable"
      ],
      "events": [
        {
          "name": "input",
          "value": "string",
          "description": "Missing description"
        },
        {
          "name": "change",
          "value": "string",
          "description": "Missing description"
        },
        {
          "name": "click:hour",
          "value": "string",
          "description": "Missing description"
        },
        {
          "name": "click:minute",
          "value": "string",
          "description": "Missing description"
        },
        {
          "name": "click:second",
          "value": "string",
          "description": "Missing description"
        },
        {
          "name": "update:period",
          "value": "string",
          "description": "Missing description"
        }
      ],
      "slots": [
        {
          "name": "default",
          "description": "Missing description"
        }
      ],
      "sass": [
        {
          "name": "$time-picker-title-color",
          "default": "map-get($shades, 'white') !default;",
          "description": "Missing description"
        },
        {
          "name": "$time-picker-title-btn-height",
          "default": "70px !default;",
          "description": "Missing description"
        },
        {
          "name": "$time-picker-landscape-title-btn-height",
          "default": "55px !default;",
          "description": "Missing description"
        },
        {
          "name": "$time-picker-ampm-title-margin-start",
          "default": "8px !default;",
          "description": "Missing description"
        },
        {
          "name": "$time-picker-ampm-title-margin-bottom",
          "default": "6px !default;",
          "description": "Missing description"
        },
        {
          "name": "$time-picker-ampm-title-margin",
          "default": "0 0 $time-picker-ampm-title-margin-bottom $time-picker-ampm-title-margin-start !default;",
          "description": "Missing description"
        },
        {
          "name": "$time-picker-ampm-title-margin-rtl",
          "default": "0 $time-picker-ampm-title-margin-start $time-picker-ampm-title-margin-bottom 0 !default;",
          "description": "Missing description"
        },
        {
          "name": "$time-picker-ampm-title-font-size",
          "default": "16px !default;",
          "description": "Missing description"
        },
        {
          "name": "$time-picker-landscape-ampm-title-margin",
          "default": "16px 0 0 !default;",
          "description": "Missing description"
        },
        {
          "name": "$time-picker-number-font-size",
          "default": "16px !default;",
          "description": "Missing description"
        },
        {
          "name": "$time-picker-indicator-size",
          "default": "40px !default;",
          "description": "Missing description"
        },
        {
          "name": "$time-picker-clock-padding",
          "default": "10px !default;",
          "description": "Missing description"
        },
        {
          "name": "$time-picker-clock-max-width",
          "default": "290px !default;",
          "description": "Missing description"
        },
        {
          "name": "$time-picker-clock-hand-height",
          "default": "calc(50% - 4px) !default;",
          "description": "Missing description"
        },
        {
          "name": "$time-picker-clock-hand-width",
          "default": "2px !default;",
          "description": "Missing description"
        },
        {
          "name": "$time-picker-clock-hand-left",
          "default": "calc(50% - 1px) !default;",
          "description": "Missing description"
        },
        {
          "name": "$time-picker-clock-center-size",
          "default": "8px !default;",
          "description": "Missing description"
        },
        {
          "name": "$time-picker-clock-end-size",
          "default": "10px !default;",
          "description": "Missing description"
        },
        {
          "name": "$time-picker-clock-end-top",
          "default": "-4px !default;",
          "description": "Missing description"
        },
        {
          "name": "$time-picker-clock-inner-hand-height",
          "default": "14px !default;",
          "description": "Missing description"
        },
        {
          "name": "$time-picker-clock-inner-offset",
          "default": "27px !default;",
          "description": "Missing description"
        },
        {
          "name": "$time-picker-ampm-padding",
          "default": "10px !default;",
          "description": "Missing description"
        },
        {
          "name": "$time-picker-clock-end-border-width",
          "default": "2px !default;",
          "description": "Missing description"
        },
        {
          "name": "$time-picker-clock-end-border-style",
          "default": "solid !default;",
          "description": "Missing description"
        },
        {
          "name": "$time-picker-clock-end-border-color",
          "default": "inherit !default;",
          "description": "Missing description"
        }
      ]
    },
    "v-time-picker-clock": {
      "props": [
        {
          "name": "allowedValues",
          "type": "function",
          "default": "null",
          "source": "v-time-picker-clock",
          "description": "Missing description"
        },
        {
          "name": "color",
          "type": "string",
          "default": "undefined",
          "source": "colorable",
          "description": "Missing description"
        },
        {
          "name": "dark",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "disabled",
          "type": "boolean",
          "default": "false",
          "source": "v-time-picker-clock",
          "description": "Missing description"
        },
        {
          "name": "double",
          "type": "boolean",
          "default": "false",
          "source": "v-time-picker-clock",
          "description": "Missing description"
        },
        {
          "name": "format",
          "type": "function",
          "default": "(val: string): string",
          "source": "v-time-picker-clock",
          "description": "Missing description"
        },
        {
          "name": "light",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "max",
          "type": "number",
          "default": "undefined",
          "source": "v-time-picker-clock",
          "description": "Missing description"
        },
        {
          "name": "min",
          "type": "number",
          "default": "undefined",
          "source": "v-time-picker-clock",
          "description": "Missing description"
        },
        {
          "name": "readonly",
          "type": "boolean",
          "default": "false",
          "source": "v-time-picker-clock",
          "description": "Missing description"
        },
        {
          "name": "rotate",
          "type": "number",
          "default": 0,
          "source": "v-time-picker-clock",
          "description": "Missing description"
        },
        {
          "name": "scrollable",
          "type": "boolean",
          "default": "false",
          "source": "v-time-picker-clock",
          "description": "Missing description"
        },
        {
          "name": "step",
          "type": "number",
          "default": 1,
          "source": "v-time-picker-clock",
          "description": "Missing description"
        },
        {
          "name": "value",
          "type": "number",
          "default": "undefined",
          "source": "v-time-picker-clock",
          "description": "Missing description"
        }
      ],
      "mixins": [
        "colorable",
        "themeable"
      ],
      "sass": []
    },
    "v-time-picker-title": {
      "props": [
        {
          "name": "ampm",
          "type": "boolean",
          "default": "false",
          "source": "v-time-picker-title",
          "description": "Missing description"
        },
        {
          "name": "color",
          "type": "string",
          "default": "undefined",
          "source": "colorable",
          "description": "Missing description"
        },
        {
          "name": "disabled",
          "type": "boolean",
          "default": "false",
          "source": "v-time-picker-title",
          "description": "Missing description"
        },
        {
          "name": "hour",
          "type": "number",
          "default": "undefined",
          "source": "v-time-picker-title",
          "description": "Missing description"
        },
        {
          "name": "minute",
          "type": "number",
          "default": "undefined",
          "source": "v-time-picker-title",
          "description": "Missing description"
        },
        {
          "name": "period",
          "type": "string",
          "default": "undefined",
          "source": "v-time-picker-title",
          "description": "Missing description"
        },
        {
          "name": "readonly",
          "type": "boolean",
          "default": "false",
          "source": "v-time-picker-title",
          "description": "Missing description"
        },
        {
          "name": "second",
          "type": "number",
          "default": "undefined",
          "source": "v-time-picker-title",
          "description": "Missing description"
        },
        {
          "name": "selecting",
          "type": "number",
          "default": "undefined",
          "source": "v-time-picker-title",
          "description": "Missing description"
        },
        {
          "name": "useSeconds",
          "type": "boolean",
          "default": "false",
          "source": "v-time-picker-title",
          "description": "Missing description"
        }
      ],
      "mixins": [
        "colorable",
        "colorable"
      ],
      "sass": []
    },
    "v-toolbar": {
      "props": [
        {
          "name": "absolute",
          "type": "boolean",
          "default": "false",
          "source": "positionable",
          "description": "Missing description"
        },
        {
          "name": "app",
          "type": "boolean",
          "default": "false",
          "source": "applicationable",
          "description": "Missing description"
        },
        {
          "name": "card",
          "type": "boolean",
          "default": "false",
          "source": "v-toolbar",
          "description": "Missing description"
        },
        {
          "name": "clippedLeft",
          "type": "boolean",
          "default": "false",
          "source": "v-toolbar",
          "description": "Missing description"
        },
        {
          "name": "clippedRight",
          "type": "boolean",
          "default": "false",
          "source": "v-toolbar",
          "description": "Missing description"
        },
        {
          "name": "color",
          "type": "string",
          "default": "undefined",
          "source": "colorable",
          "description": "Missing description"
        },
        {
          "name": "dark",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "dense",
          "type": "boolean",
          "default": "false",
          "source": "v-toolbar",
          "description": "Reduces the height of the toolbar content to 48px (96px when using the **prominent** prop)."
        },
        {
          "name": "extended",
          "type": "boolean",
          "default": "false",
          "source": "v-toolbar",
          "description": "Use this prop to increase the height of the toolbar _without_ using the `extension` slot for adding content. May be used in conjunction with the **extension-height** prop, and any of the other props that affect the height of the toolbar, e.g. **prominent**, **dense**, etc., **WITH THE EXCEPTION** of **height**."
        },
        {
          "name": "extensionHeight",
          "type": [
            "number",
            "string"
          ],
          "default": "undefined",
          "source": "v-toolbar",
          "description": "Specify an explicit height for the `extension` slot. "
        },
        {
          "name": "fixed",
          "type": "boolean",
          "default": "false",
          "source": "positionable",
          "description": "Missing description"
        },
        {
          "name": "flat",
          "type": "boolean",
          "default": "false",
          "source": "v-toolbar",
          "description": "Removes the toolbar's box-shadow."
        },
        {
          "name": "floating",
          "type": "boolean",
          "default": "false",
          "source": "v-toolbar",
          "description": "Applies **display: inline-flex** to the component."
        },
        {
          "name": "height",
          "type": [
            "number",
            "string"
          ],
          "default": "undefined",
          "source": "v-toolbar",
          "description": "Designates a specific height for the toolbar. Overrides the heights imposed by other props, e.g. **prominent**, **dense**, **extended**, etc."
        },
        {
          "name": "invertedScroll",
          "type": "boolean",
          "default": "false",
          "source": "v-toolbar",
          "description": "Missing description"
        },
        {
          "name": "light",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "manualScroll",
          "type": "boolean",
          "default": "false",
          "source": "v-toolbar",
          "description": "Missing description"
        },
        {
          "name": "prominent",
          "type": "boolean",
          "default": "false",
          "source": "v-toolbar",
          "description": "Increases the height of the toolbar content to 128px."
        },
        {
          "name": "scrollOffScreen",
          "type": "boolean",
          "default": "false",
          "source": "v-toolbar",
          "description": "Missing description"
        },
        {
          "name": "scrollTarget",
          "type": "string",
          "default": "undefined",
          "source": "v-toolbar",
          "description": "Missing description"
        },
        {
          "name": "scrollThreshold",
          "type": "number",
          "default": 300,
          "source": "v-toolbar",
          "description": "Missing description"
        },
        {
          "name": "scrollToolbarOffScreen",
          "type": "boolean",
          "default": "false",
          "source": "v-toolbar",
          "description": "Missing description"
        },
        {
          "name": "tabs",
          "type": "boolean",
          "default": "false",
          "source": "v-toolbar",
          "description": "Missing description"
        }
      ],
      "mixins": [
        "applicationable",
        "positionable",
        "colorable",
        "ssr-bootable",
        "themeable"
      ],
      "slots": [
        {
          "name": "extension",
          "description": "Missing description"
        },
        {
          "name": "img",
          "props": {
            "props": "{ height: string, src: string | srcObject }"
          },
          "description": "Missing description"
        },
        {
          "name": "default",
          "description": "Missing description"
        }
      ],
      "sass": [
        {
          "name": "$toolbar-btn-icon-size",
          "default": "48px !default;",
          "description": "Missing description"
        },
        {
          "name": "$toolbar-content-padding-y",
          "default": "4px !default;",
          "description": "Missing description"
        },
        {
          "name": "$toolbar-content-padding-x",
          "default": "16px !default;",
          "description": "Missing description"
        },
        {
          "name": "$toolbar-elevation",
          "default": "4 !default;",
          "description": "Missing description"
        },
        {
          "name": "$toolbar-border-radius",
          "default": "0 !default;",
          "description": "Missing description"
        },
        {
          "name": "$toolbar-shaped-border-radius",
          "default": "map-get($rounded, 'xl') $toolbar-border-radius !default;",
          "description": "Missing description"
        },
        {
          "name": "$toolbar-title-padding",
          "default": "20px !default;",
          "description": "Missing description"
        },
        {
          "name": "$toolbar-transition",
          "default": "0.2s map-get($transition, 'fast-out-slow-in') transform,\n                     0.2s map-get($transition, 'fast-out-slow-in') background-color,\n                     0.2s map-get($transition, 'fast-out-slow-in') left,\n                     0.2s map-get($transition, 'fast-out-slow-in') right,\n                     280ms map-get($transition, 'fast-out-slow-in') box-shadow,\n                     0.25s map-get($transition, 'fast-out-slow-in') max-width,\n                     0.25s map-get($transition, 'fast-out-slow-in') width !default;",
          "description": "Missing description"
        },
        {
          "name": "$toolbar-collapsed-max-width",
          "default": "112px !default;",
          "description": "Missing description"
        },
        {
          "name": "$toolbar-collapsed-border-radius",
          "default": "24px !default;",
          "description": "Missing description"
        },
        {
          "name": "$toolbar-promient-padding",
          "default": "6px !default;",
          "description": "Missing description"
        }
      ]
    },
    "v-toolbar-side-icon": {
      "props": [],
      "mixins": [],
      "sass": []
    },
    "v-toolbar-title": {
      "props": [],
      "mixins": [],
      "slots": [
        {
          "name": "default",
          "description": "Missing description"
        }
      ],
      "sass": []
    },
    "v-toolbar-items": {
      "props": [],
      "mixins": [],
      "slots": [
        {
          "name": "default",
          "description": "Missing description"
        }
      ],
      "sass": []
    },
    "v-tooltip": {
      "props": [
        {
          "name": "absolute",
          "type": "boolean",
          "default": "false",
          "source": "positionable",
          "description": "Missing description"
        },
        {
          "name": "activator",
          "type": "any",
          "default": "undefined",
          "source": "menuable",
          "description": "Missing description"
        },
        {
          "name": "allowOverflow",
          "type": "boolean",
          "default": "false",
          "source": "menuable",
          "description": "Missing description"
        },
        {
          "name": "attach",
          "type": "any",
          "default": false,
          "source": "detachable",
          "description": "Missing description"
        },
        {
          "name": "bottom",
          "type": "boolean",
          "default": "false",
          "source": "positionable",
          "description": "Missing description"
        },
        {
          "name": "closeDelay",
          "type": [
            "number",
            "string"
          ],
          "default": 200,
          "source": "delayable",
          "description": "Missing description"
        },
        {
          "name": "color",
          "type": "string",
          "default": "undefined",
          "source": "colorable",
          "description": "Missing description"
        },
        {
          "name": "contentClass",
          "type": "any",
          "default": "undefined",
          "source": "detachable",
          "description": "Missing description"
        },
        {
          "name": "dark",
          "type": "boolean",
          "default": "false",
          "source": "menuable",
          "description": "Missing description"
        },
        {
          "name": "debounce",
          "type": [
            "number",
            "string"
          ],
          "default": 0,
          "source": "v-tooltip",
          "description": "Duration before tooltip is shown and hidden when hovered"
        },
        {
          "name": "disabled",
          "type": "boolean",
          "default": "false",
          "source": "v-tooltip",
          "description": "Disables the tooltip"
        },
        {
          "name": "fixed",
          "type": "boolean",
          "default": "true",
          "source": "positionable",
          "description": "Missing description"
        },
        {
          "name": "inputActivator",
          "type": "boolean",
          "default": "false",
          "source": "menuable",
          "description": "Missing description"
        },
        {
          "name": "lazy",
          "type": "boolean",
          "default": "false",
          "source": "bootable",
          "description": "Missing description"
        },
        {
          "name": "left",
          "type": "boolean",
          "default": "false",
          "source": "positionable",
          "description": "Missing description"
        },
        {
          "name": "light",
          "type": "boolean",
          "default": "false",
          "source": "menuable",
          "description": "Missing description"
        },
        {
          "name": "maxWidth",
          "type": [
            "number",
            "string"
          ],
          "default": "auto",
          "source": "menuable",
          "description": "Missing description"
        },
        {
          "name": "minWidth",
          "type": [
            "number",
            "string"
          ],
          "default": "undefined",
          "source": "menuable",
          "description": "Missing description"
        },
        {
          "name": "nudgeBottom",
          "type": [
            "number",
            "string"
          ],
          "default": 0,
          "source": "menuable",
          "description": "Missing description"
        },
        {
          "name": "nudgeLeft",
          "type": [
            "number",
            "string"
          ],
          "default": 0,
          "source": "menuable",
          "description": "Missing description"
        },
        {
          "name": "nudgeRight",
          "type": [
            "number",
            "string"
          ],
          "default": 0,
          "source": "menuable",
          "description": "Missing description"
        },
        {
          "name": "nudgeTop",
          "type": [
            "number",
            "string"
          ],
          "default": 0,
          "source": "menuable",
          "description": "Missing description"
        },
        {
          "name": "nudgeWidth",
          "type": [
            "number",
            "string"
          ],
          "default": 0,
          "source": "menuable",
          "description": "Missing description"
        },
        {
          "name": "offsetOverflow",
          "type": "boolean",
          "default": "false",
          "source": "menuable",
          "description": "Missing description"
        },
        {
          "name": "openDelay",
          "type": [
            "number",
            "string"
          ],
          "default": 200,
          "source": "delayable",
          "description": "Missing description"
        },
        {
          "name": "positionX",
          "type": "number",
          "default": "undefined",
          "source": "menuable",
          "description": "Missing description"
        },
        {
          "name": "positionY",
          "type": "number",
          "default": "undefined",
          "source": "menuable",
          "description": "Missing description"
        },
        {
          "name": "right",
          "type": "boolean",
          "default": "false",
          "source": "positionable",
          "description": "Missing description"
        },
        {
          "name": "tag",
          "type": "string",
          "default": "'span'",
          "source": "v-tooltip",
          "description": "Specifies a custom tag for the activator wrapper"
        },
        {
          "name": "top",
          "type": "boolean",
          "default": "false",
          "source": "positionable",
          "description": "Missing description"
        },
        {
          "name": "transition",
          "type": "string",
          "default": "undefined",
          "source": "v-tooltip",
          "description": "Mixins.Transitionable.props.transition"
        },
        {
          "name": "value",
          "type": "any",
          "default": "undefined",
          "source": "toggleable",
          "description": "Missing description"
        },
        {
          "name": "zIndex",
          "type": "any",
          "default": "undefined",
          "source": "menuable",
          "description": "Missing description"
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
        "toggleable"
      ],
      "slots": [
        {
          "name": "activator",
          "props": {
            "on": "{ [eventName]: eventHandler }",
            "value": "boolean"
          },
          "description": "Missing description"
        },
        {
          "name": "default",
          "description": "Missing description"
        }
      ],
      "sass": [
        {
          "name": "$tooltip-background-color",
          "default": "rgba(map-get($grey, 'darken-2'), 0.9) !default;",
          "description": "Missing description"
        },
        {
          "name": "$tooltip-text-color",
          "default": "map-get($shades, 'white') !default;",
          "description": "Missing description"
        },
        {
          "name": "$tooltip-border-radius",
          "default": "$border-radius-root !default;",
          "description": "Missing description"
        },
        {
          "name": "$tooltip-font-size",
          "default": "14px !default;",
          "description": "Missing description"
        },
        {
          "name": "$tooltip-transition-timing-function",
          "default": "map-get($transition, 'linear-out-slow-in') !default;",
          "description": "Missing description"
        },
        {
          "name": "$tooltip-transition-enter-duration",
          "default": "150ms !default;",
          "description": "Missing description"
        },
        {
          "name": "$tooltip-transition-leave-duration",
          "default": "75ms !default;",
          "description": "Missing description"
        },
        {
          "name": "$tooltip-padding",
          "default": "5px 16px !default;",
          "description": "Missing description"
        }
      ]
    },
    "v-treeview": {
      "props": [
        {
          "name": "activatable",
          "type": "boolean",
          "default": "false",
          "source": "v-treeview",
          "description": "Allows user to mark a node as active by clicking on it"
        },
        {
          "name": "active",
          "type": "array",
          "default": [],
          "source": "v-treeview",
          "description": "Syncable prop that allows one to control which nodes are active. The array consists of the `item-key` of each active item."
        },
        {
          "name": "activeClass",
          "type": "string",
          "default": "'v-treeview-node--active'",
          "source": "v-treeview",
          "description": "The class applied to the node when active"
        },
        {
          "name": "dark",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "expandIcon",
          "type": "string",
          "default": "'$vuetify.icons.subgroup'",
          "source": "v-treeview",
          "description": "Icon used to indicate that a node can be expanded"
        },
        {
          "name": "filter",
          "type": "function",
          "default": "null",
          "source": "v-treeview",
          "description": "Custom item filtering function. By default it will use case-insensitive search in item's label."
        },
        {
          "name": "hoverable",
          "type": "boolean",
          "default": "false",
          "source": "v-treeview",
          "description": "Applies a hover class when mousing over nodes"
        },
        {
          "name": "indeterminateIcon",
          "type": "string",
          "default": "'$vuetify.icons.checkboxIndeterminate'",
          "source": "v-treeview",
          "description": "Icon used when node is in an indeterminate state. Only visible when `selectable` is `true`."
        },
        {
          "name": "itemChildren",
          "type": "string",
          "default": "'children'",
          "source": "v-treeview",
          "description": "Property on supplied `items` that contains its children"
        },
        {
          "name": "itemKey",
          "type": "string",
          "default": "'id'",
          "source": "v-treeview",
          "description": "Property on supplied `items` used to keep track of node state. The value of this property has to be unique among all items."
        },
        {
          "name": "itemText",
          "type": "string",
          "default": "'name'",
          "source": "v-treeview",
          "description": "Property on supplied `items` that contains its label text"
        },
        {
          "name": "items",
          "type": "array",
          "default": [],
          "source": "v-treeview",
          "description": "An array of items used to build the treeview"
        },
        {
          "name": "light",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "loadChildren",
          "type": "function",
          "default": "null",
          "source": "v-treeview",
          "description": "A function used when dynamically loading children. If this prop is set, then the supplied function will be run if expanding an item that has a `item-children` property that is an empty array. Supports returning a Promise."
        },
        {
          "name": "loadingIcon",
          "type": "string",
          "default": "'$vuetify.icons.loading'",
          "source": "v-treeview",
          "description": "Icon used when node is in a loading state"
        },
        {
          "name": "multipleActive",
          "type": "boolean",
          "default": "false",
          "source": "v-treeview",
          "description": "When `true`, allows user to have multiple active nodes at the same time"
        },
        {
          "name": "offIcon",
          "type": "string",
          "default": "'$vuetify.icons.checkboxOff'",
          "source": "v-treeview",
          "description": "Icon used when node is not selected. Only visible when `selectable` is `true`."
        },
        {
          "name": "onIcon",
          "type": "string",
          "default": "'$vuetify.icons.checkboxOn'",
          "source": "v-treeview",
          "description": "Icon used when leaf node is selected or when a branch node is fully selected. Only visible when `selectable` is `true`."
        },
        {
          "name": "open",
          "type": "array",
          "default": [],
          "source": "v-treeview",
          "description": "Syncable prop that allows one to control which nodes are open. The array consists of the `item-key` of each open item."
        },
        {
          "name": "openAll",
          "type": "boolean",
          "default": "false",
          "source": "v-treeview",
          "description": "When `true` will cause all branch nodes to be opened when component is mounted"
        },
        {
          "name": "openOnClick",
          "type": "boolean",
          "default": "false",
          "source": "v-treeview",
          "description": "When `true` will cause nodes to be opened by clicking anywhere on it, instead of only opening by clicking on expand icon. When using this prop with `activatable` you will be unable to mark nodes with children as active."
        },
        {
          "name": "returnObject",
          "type": "boolean",
          "default": "false",
          "source": "v-treeview",
          "description": "When `true` will make `v-model`, `active.sync` and `open.sync` return the complete object instead of just the key"
        },
        {
          "name": "search",
          "type": "string",
          "default": "undefined",
          "source": "v-treeview",
          "description": "The search model for filtering results"
        },
        {
          "name": "selectable",
          "type": "boolean",
          "default": "false",
          "source": "v-treeview",
          "description": "Will render a checkbox next to each node allowing them to be selected"
        },
        {
          "name": "selectedColor",
          "type": "string",
          "default": "'accent'",
          "source": "v-treeview",
          "description": "The color of the selection checkbox"
        },
        {
          "name": "transition",
          "type": "boolean",
          "default": "false",
          "source": "v-treeview",
          "description": "Applies a transition when nodes are opened and closed"
        },
        {
          "name": "value",
          "type": "array",
          "default": [],
          "source": "v-treeview",
          "description": "Allows one to control which nodes are selected. The array consists of the `item-key` of each selected item. Is used with `@input` event to allow for `v-model` binding."
        }
      ],
      "mixins": [
        "registrable-provide",
        "themeable"
      ],
      "slots": [
        {
          "name": "append",
          "props": {
            "item": "any",
            "leaf": "boolean",
            "selected": "boolean",
            "indeterminate": "boolean",
            "active": "boolean",
            "open": "boolean"
          },
          "description": "Missing description"
        },
        {
          "name": "label",
          "props": {
            "item": "any",
            "leaf": "boolean",
            "selected": "boolean",
            "indeterminate": "boolean",
            "active": "boolean",
            "open": "boolean"
          },
          "description": "Missing description"
        },
        {
          "name": "prepend",
          "props": {
            "item": "any",
            "leaf": "boolean",
            "selected": "boolean",
            "indeterminate": "boolean",
            "active": "boolean",
            "open": "boolean"
          },
          "description": "Missing description"
        }
      ],
      "functions": [
        {
          "name": "updateAll",
          "signature": "(val: boolean): void",
          "description": "Missing description"
        }
      ],
      "events": [
        {
          "name": "input",
          "value": "array",
          "description": "Missing description"
        },
        {
          "name": "update:active",
          "value": "array",
          "description": "Missing description"
        },
        {
          "name": "update:open",
          "value": "array",
          "description": "Missing description"
        }
      ],
      "sass": [
        {
          "name": "$treeview-transition",
          "default": ".2s map-get($transition, 'linear-out-slow-in') !default;",
          "description": "Missing description"
        },
        {
          "name": "$treeview-label-font-size",
          "default": "inherit !default;",
          "description": "Missing description"
        },
        {
          "name": "$treeview-node-height",
          "default": "48px !default;",
          "description": "Missing description"
        },
        {
          "name": "$treeview-node-height-dense",
          "default": "40px !default;",
          "description": "Missing description"
        },
        {
          "name": "$treeview-node-shaped-margin",
          "default": "8px !default;",
          "description": "Missing description"
        },
        {
          "name": "$treeview-node-padding",
          "default": "8px !default;",
          "description": "Missing description"
        },
        {
          "name": "$treeview-node-margin",
          "default": "6px !default;",
          "description": "Missing description"
        },
        {
          "name": "$treeview-node-level-width",
          "default": "24px !default;",
          "description": "Missing description"
        }
      ]
    },
    "v-treeview-node": {
      "props": [
        {
          "name": "activatable",
          "type": "boolean",
          "default": "false",
          "source": "v-treeview-node",
          "description": "Missing description"
        },
        {
          "name": "activeClass",
          "type": "string",
          "default": "'v-treeview-node--active'",
          "source": "v-treeview-node",
          "description": "Missing description"
        },
        {
          "name": "expandIcon",
          "type": "string",
          "default": "'$vuetify.icons.subgroup'",
          "source": "v-treeview-node",
          "description": "Missing description"
        },
        {
          "name": "indeterminateIcon",
          "type": "string",
          "default": "'$vuetify.icons.checkboxIndeterminate'",
          "source": "v-treeview-node",
          "description": "Missing description"
        },
        {
          "name": "item",
          "type": "object",
          "default": null,
          "source": "v-treeview-node",
          "description": "Missing description"
        },
        {
          "name": "itemChildren",
          "type": "string",
          "default": "'children'",
          "source": "v-treeview-node",
          "description": "Missing description"
        },
        {
          "name": "itemKey",
          "type": "string",
          "default": "'id'",
          "source": "v-treeview-node",
          "description": "Missing description"
        },
        {
          "name": "itemText",
          "type": "string",
          "default": "'name'",
          "source": "v-treeview-node",
          "description": "Missing description"
        },
        {
          "name": "loadChildren",
          "type": "function",
          "default": "null",
          "source": "v-treeview-node",
          "description": "Missing description"
        },
        {
          "name": "loadingIcon",
          "type": "string",
          "default": "'$vuetify.icons.loading'",
          "source": "v-treeview-node",
          "description": "Missing description"
        },
        {
          "name": "offIcon",
          "type": "string",
          "default": "'$vuetify.icons.checkboxOff'",
          "source": "v-treeview-node",
          "description": "Missing description"
        },
        {
          "name": "onIcon",
          "type": "string",
          "default": "'$vuetify.icons.checkboxOn'",
          "source": "v-treeview-node",
          "description": "Missing description"
        },
        {
          "name": "openOnClick",
          "type": "boolean",
          "default": "false",
          "source": "v-treeview-node",
          "description": "Missing description"
        },
        {
          "name": "selectable",
          "type": "boolean",
          "default": "false",
          "source": "v-treeview-node",
          "description": "Missing description"
        },
        {
          "name": "selectedColor",
          "type": "string",
          "default": "'accent'",
          "source": "v-treeview-node",
          "description": "Missing description"
        },
        {
          "name": "transition",
          "type": "boolean",
          "default": "false",
          "source": "v-treeview-node",
          "description": "Missing description"
        }
      ],
      "mixins": [
        "registrable-inject"
      ],
      "sass": []
    },
    "v-window": {
      "props": [
        {
          "name": "activeClass",
          "type": "string",
          "default": "'v-item--active'",
          "source": "base-item-group",
          "description": "Missing description"
        },
        {
          "name": "dark",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "light",
          "type": "boolean",
          "default": "false",
          "source": "themeable",
          "description": "Missing description"
        },
        {
          "name": "mandatory",
          "type": "boolean",
          "default": "true",
          "source": "base-item-group",
          "description": "Missing description"
        },
        {
          "name": "max",
          "type": [
            "number",
            "string"
          ],
          "default": "undefined",
          "source": "base-item-group",
          "description": "Missing description"
        },
        {
          "name": "multiple",
          "type": "boolean",
          "default": "false",
          "source": "base-item-group",
          "description": "Missing description"
        },
        {
          "name": "reverse",
          "type": "boolean",
          "default": "false",
          "source": "v-window",
          "description": "Reverse the normal transition direction."
        },
        {
          "name": "touch",
          "type": "object",
          "default": "undefined",
          "source": "v-window",
          "example": {
            "left": "Function",
            "right": "Function"
          },
          "description": "Provide a custom **left** and **right** function when swiped left or right."
        },
        {
          "name": "touchless",
          "type": "boolean",
          "default": "false",
          "source": "v-window",
          "description": "Disable touch support."
        },
        {
          "name": "value",
          "type": "any",
          "default": "undefined",
          "source": "proxyable",
          "description": "Missing description"
        },
        {
          "name": "vertical",
          "type": "boolean",
          "default": "false",
          "source": "v-window",
          "description": "Uses a vertical transition when changing windows."
        }
      ],
      "mixins": [
        "proxyable",
        "themeable"
      ],
      "events": [
        {
          "name": "change",
          "value": "number",
          "description": "Missing description"
        }
      ],
      "slots": [
        {
          "name": "default",
          "description": "Missing description"
        }
      ],
      "sass": [
        {
          "name": "$window-transition",
          "default": ".3s cubic-bezier(.25, .8, .50, 1) !default;",
          "description": "Missing description"
        },
        {
          "name": "$window-controls-margin",
          "default": "0 16px !default;",
          "description": "Missing description"
        },
        {
          "name": "$window-controls-top",
          "default": "calc(50% - 20px) !default;",
          "description": "Missing description"
        }
      ]
    },
    "v-window-item": {
      "props": [
        {
          "name": "activeClass",
          "type": "string",
          "source": "groupable",
          "description": "Missing description"
        },
        {
          "name": "disabled",
          "type": "boolean",
          "default": "false",
          "source": "groupable",
          "description": "Missing description"
        },
        {
          "name": "lazy",
          "type": "boolean",
          "default": "false",
          "source": "bootable",
          "description": "Missing description"
        },
        {
          "name": "reverseTransition",
          "type": [
            "boolean",
            "string"
          ],
          "default": "undefined",
          "source": "v-window-item",
          "description": "Missing description"
        },
        {
          "name": "transition",
          "type": [
            "boolean",
            "string"
          ],
          "default": "undefined",
          "source": "v-window-item",
          "description": "Mixins.Transitionable.props.transition"
        },
        {
          "name": "value",
          "type": "any",
          "default": "undefined",
          "source": "v-window-item",
          "description": "Mixins.Groupable.props.value"
        }
      ],
      "mixins": [
        "bootable",
        "groupable"
      ],
      "slots": [
        {
          "name": "default",
          "description": "Missing description"
        }
      ],
      "sass": []
    },
    "v-bottom-sheet-transition": {
      "props": [
        {
          "name": "group",
          "type": "boolean",
          "default": "false",
          "source": "bottom-sheet-transition",
          "description": "Missing description"
        },
        {
          "name": "hideOnLeave",
          "type": "boolean",
          "default": "false",
          "source": "bottom-sheet-transition",
          "description": "Missing description"
        },
        {
          "name": "leaveAbsolute",
          "type": "boolean",
          "default": "false",
          "source": "bottom-sheet-transition",
          "description": "Missing description"
        },
        {
          "name": "mode",
          "type": "string",
          "default": "undefined",
          "source": "bottom-sheet-transition",
          "description": "Missing description"
        },
        {
          "name": "origin",
          "type": "string",
          "default": "'top center 0'",
          "source": "bottom-sheet-transition",
          "description": "Missing description"
        }
      ],
      "mixins": [],
      "sass": []
    },
    "v-carousel-transition": {
      "props": [
        {
          "name": "group",
          "type": "boolean",
          "default": "false",
          "source": "carousel-transition",
          "description": "Missing description"
        },
        {
          "name": "hideOnLeave",
          "type": "boolean",
          "default": "false",
          "source": "carousel-transition",
          "description": "Missing description"
        },
        {
          "name": "leaveAbsolute",
          "type": "boolean",
          "default": "false",
          "source": "carousel-transition",
          "description": "Missing description"
        },
        {
          "name": "mode",
          "type": "string",
          "default": "undefined",
          "source": "carousel-transition",
          "description": "Missing description"
        },
        {
          "name": "origin",
          "type": "string",
          "default": "'top center 0'",
          "source": "carousel-transition",
          "description": "Missing description"
        }
      ],
      "mixins": [],
      "sass": []
    },
    "v-carousel-reverse-transition": {
      "props": [
        {
          "name": "group",
          "type": "boolean",
          "default": "false",
          "source": "carousel-reverse-transition",
          "description": "Missing description"
        },
        {
          "name": "hideOnLeave",
          "type": "boolean",
          "default": "false",
          "source": "carousel-reverse-transition",
          "description": "Missing description"
        },
        {
          "name": "leaveAbsolute",
          "type": "boolean",
          "default": "false",
          "source": "carousel-reverse-transition",
          "description": "Missing description"
        },
        {
          "name": "mode",
          "type": "string",
          "default": "undefined",
          "source": "carousel-reverse-transition",
          "description": "Missing description"
        },
        {
          "name": "origin",
          "type": "string",
          "default": "'top center 0'",
          "source": "carousel-reverse-transition",
          "description": "Missing description"
        }
      ],
      "mixins": [],
      "sass": []
    },
    "v-tab-transition": {
      "props": [
        {
          "name": "group",
          "type": "boolean",
          "default": "false",
          "source": "tab-transition",
          "description": "Missing description"
        },
        {
          "name": "hideOnLeave",
          "type": "boolean",
          "default": "false",
          "source": "tab-transition",
          "description": "Missing description"
        },
        {
          "name": "leaveAbsolute",
          "type": "boolean",
          "default": "false",
          "source": "tab-transition",
          "description": "Missing description"
        },
        {
          "name": "mode",
          "type": "string",
          "default": "undefined",
          "source": "tab-transition",
          "description": "Missing description"
        },
        {
          "name": "origin",
          "type": "string",
          "default": "'top center 0'",
          "source": "tab-transition",
          "description": "Missing description"
        }
      ],
      "mixins": [],
      "sass": []
    },
    "v-tab-reverse-transition": {
      "props": [
        {
          "name": "group",
          "type": "boolean",
          "default": "false",
          "source": "tab-reverse-transition",
          "description": "Missing description"
        },
        {
          "name": "hideOnLeave",
          "type": "boolean",
          "default": "false",
          "source": "tab-reverse-transition",
          "description": "Missing description"
        },
        {
          "name": "leaveAbsolute",
          "type": "boolean",
          "default": "false",
          "source": "tab-reverse-transition",
          "description": "Missing description"
        },
        {
          "name": "mode",
          "type": "string",
          "default": "undefined",
          "source": "tab-reverse-transition",
          "description": "Missing description"
        },
        {
          "name": "origin",
          "type": "string",
          "default": "'top center 0'",
          "source": "tab-reverse-transition",
          "description": "Missing description"
        }
      ],
      "mixins": [],
      "sass": []
    },
    "v-menu-transition": {
      "props": [
        {
          "name": "group",
          "type": "boolean",
          "default": "false",
          "source": "menu-transition",
          "description": "Missing description"
        },
        {
          "name": "hideOnLeave",
          "type": "boolean",
          "default": "false",
          "source": "menu-transition",
          "description": "Missing description"
        },
        {
          "name": "leaveAbsolute",
          "type": "boolean",
          "default": "false",
          "source": "menu-transition",
          "description": "Missing description"
        },
        {
          "name": "mode",
          "type": "string",
          "default": "undefined",
          "source": "menu-transition",
          "description": "Missing description"
        },
        {
          "name": "origin",
          "type": "string",
          "default": "'top center 0'",
          "source": "menu-transition",
          "description": "Missing description"
        }
      ],
      "mixins": [],
      "sass": []
    },
    "v-fab-transition": {
      "props": [
        {
          "name": "group",
          "type": "boolean",
          "default": "false",
          "source": "fab-transition",
          "description": "Missing description"
        },
        {
          "name": "hideOnLeave",
          "type": "boolean",
          "default": "false",
          "source": "fab-transition",
          "description": "Missing description"
        },
        {
          "name": "leaveAbsolute",
          "type": "boolean",
          "default": "false",
          "source": "fab-transition",
          "description": "Missing description"
        },
        {
          "name": "mode",
          "type": "string",
          "default": "'out-in'",
          "source": "fab-transition",
          "description": "Missing description"
        },
        {
          "name": "origin",
          "type": "string",
          "default": "'center center'",
          "source": "fab-transition",
          "description": "Missing description"
        }
      ],
      "mixins": [],
      "sass": []
    },
    "v-dialog-transition": {
      "props": [
        {
          "name": "group",
          "type": "boolean",
          "default": "false",
          "source": "dialog-transition",
          "description": "Missing description"
        },
        {
          "name": "hideOnLeave",
          "type": "boolean",
          "default": "false",
          "source": "dialog-transition",
          "description": "Missing description"
        },
        {
          "name": "leaveAbsolute",
          "type": "boolean",
          "default": "false",
          "source": "dialog-transition",
          "description": "Missing description"
        },
        {
          "name": "mode",
          "type": "string",
          "default": "undefined",
          "source": "dialog-transition",
          "description": "Missing description"
        },
        {
          "name": "origin",
          "type": "string",
          "default": "'top center 0'",
          "source": "dialog-transition",
          "description": "Missing description"
        }
      ],
      "mixins": [],
      "sass": []
    },
    "v-dialog-bottom-transition": {
      "props": [
        {
          "name": "group",
          "type": "boolean",
          "default": "false",
          "source": "dialog-bottom-transition",
          "description": "Missing description"
        },
        {
          "name": "hideOnLeave",
          "type": "boolean",
          "default": "false",
          "source": "dialog-bottom-transition",
          "description": "Missing description"
        },
        {
          "name": "leaveAbsolute",
          "type": "boolean",
          "default": "false",
          "source": "dialog-bottom-transition",
          "description": "Missing description"
        },
        {
          "name": "mode",
          "type": "string",
          "default": "undefined",
          "source": "dialog-bottom-transition",
          "description": "Missing description"
        },
        {
          "name": "origin",
          "type": "string",
          "default": "'top center 0'",
          "source": "dialog-bottom-transition",
          "description": "Missing description"
        }
      ],
      "mixins": [],
      "sass": []
    },
    "v-fade-transition": {
      "props": [
        {
          "name": "group",
          "type": "boolean",
          "default": "false",
          "source": "fade-transition",
          "description": "Missing description"
        },
        {
          "name": "hideOnLeave",
          "type": "boolean",
          "default": "false",
          "source": "fade-transition",
          "description": "Missing description"
        },
        {
          "name": "leaveAbsolute",
          "type": "boolean",
          "default": "false",
          "source": "fade-transition",
          "description": "Missing description"
        },
        {
          "name": "mode",
          "type": "string",
          "default": "undefined",
          "source": "fade-transition",
          "description": "Missing description"
        },
        {
          "name": "origin",
          "type": "string",
          "default": "'top center 0'",
          "source": "fade-transition",
          "description": "Missing description"
        }
      ],
      "mixins": [],
      "sass": []
    },
    "v-scale-transition": {
      "props": [
        {
          "name": "group",
          "type": "boolean",
          "default": "false",
          "source": "scale-transition",
          "description": "Missing description"
        },
        {
          "name": "hideOnLeave",
          "type": "boolean",
          "default": "false",
          "source": "scale-transition",
          "description": "Missing description"
        },
        {
          "name": "leaveAbsolute",
          "type": "boolean",
          "default": "false",
          "source": "scale-transition",
          "description": "Missing description"
        },
        {
          "name": "mode",
          "type": "string",
          "default": "undefined",
          "source": "scale-transition",
          "description": "Missing description"
        },
        {
          "name": "origin",
          "type": "string",
          "default": "'top center 0'",
          "source": "scale-transition",
          "description": "Missing description"
        }
      ],
      "mixins": [],
      "sass": []
    },
    "v-scroll-x-transition": {
      "props": [
        {
          "name": "group",
          "type": "boolean",
          "default": "false",
          "source": "scroll-x-transition",
          "description": "Missing description"
        },
        {
          "name": "hideOnLeave",
          "type": "boolean",
          "default": "false",
          "source": "scroll-x-transition",
          "description": "Missing description"
        },
        {
          "name": "leaveAbsolute",
          "type": "boolean",
          "default": "false",
          "source": "scroll-x-transition",
          "description": "Missing description"
        },
        {
          "name": "mode",
          "type": "string",
          "default": "undefined",
          "source": "scroll-x-transition",
          "description": "Missing description"
        },
        {
          "name": "origin",
          "type": "string",
          "default": "'top center 0'",
          "source": "scroll-x-transition",
          "description": "Missing description"
        }
      ],
      "mixins": [],
      "sass": []
    },
    "v-scroll-x-reverse-transition": {
      "props": [
        {
          "name": "group",
          "type": "boolean",
          "default": "false",
          "source": "scroll-x-reverse-transition",
          "description": "Missing description"
        },
        {
          "name": "hideOnLeave",
          "type": "boolean",
          "default": "false",
          "source": "scroll-x-reverse-transition",
          "description": "Missing description"
        },
        {
          "name": "leaveAbsolute",
          "type": "boolean",
          "default": "false",
          "source": "scroll-x-reverse-transition",
          "description": "Missing description"
        },
        {
          "name": "mode",
          "type": "string",
          "default": "undefined",
          "source": "scroll-x-reverse-transition",
          "description": "Missing description"
        },
        {
          "name": "origin",
          "type": "string",
          "default": "'top center 0'",
          "source": "scroll-x-reverse-transition",
          "description": "Missing description"
        }
      ],
      "mixins": [],
      "sass": []
    },
    "v-scroll-y-transition": {
      "props": [
        {
          "name": "group",
          "type": "boolean",
          "default": "false",
          "source": "scroll-y-transition",
          "description": "Missing description"
        },
        {
          "name": "hideOnLeave",
          "type": "boolean",
          "default": "false",
          "source": "scroll-y-transition",
          "description": "Missing description"
        },
        {
          "name": "leaveAbsolute",
          "type": "boolean",
          "default": "false",
          "source": "scroll-y-transition",
          "description": "Missing description"
        },
        {
          "name": "mode",
          "type": "string",
          "default": "undefined",
          "source": "scroll-y-transition",
          "description": "Missing description"
        },
        {
          "name": "origin",
          "type": "string",
          "default": "'top center 0'",
          "source": "scroll-y-transition",
          "description": "Missing description"
        }
      ],
      "mixins": [],
      "sass": []
    },
    "v-scroll-y-reverse-transition": {
      "props": [
        {
          "name": "group",
          "type": "boolean",
          "default": "false",
          "source": "scroll-y-reverse-transition",
          "description": "Missing description"
        },
        {
          "name": "hideOnLeave",
          "type": "boolean",
          "default": "false",
          "source": "scroll-y-reverse-transition",
          "description": "Missing description"
        },
        {
          "name": "leaveAbsolute",
          "type": "boolean",
          "default": "false",
          "source": "scroll-y-reverse-transition",
          "description": "Missing description"
        },
        {
          "name": "mode",
          "type": "string",
          "default": "undefined",
          "source": "scroll-y-reverse-transition",
          "description": "Missing description"
        },
        {
          "name": "origin",
          "type": "string",
          "default": "'top center 0'",
          "source": "scroll-y-reverse-transition",
          "description": "Missing description"
        }
      ],
      "mixins": [],
      "sass": []
    },
    "v-slide-x-transition": {
      "props": [
        {
          "name": "group",
          "type": "boolean",
          "default": "false",
          "source": "slide-x-transition",
          "description": "Missing description"
        },
        {
          "name": "hideOnLeave",
          "type": "boolean",
          "default": "false",
          "source": "slide-x-transition",
          "description": "Missing description"
        },
        {
          "name": "leaveAbsolute",
          "type": "boolean",
          "default": "false",
          "source": "slide-x-transition",
          "description": "Missing description"
        },
        {
          "name": "mode",
          "type": "string",
          "default": "undefined",
          "source": "slide-x-transition",
          "description": "Missing description"
        },
        {
          "name": "origin",
          "type": "string",
          "default": "'top center 0'",
          "source": "slide-x-transition",
          "description": "Missing description"
        }
      ],
      "mixins": [],
      "sass": []
    },
    "v-slide-x-reverse-transition": {
      "props": [
        {
          "name": "group",
          "type": "boolean",
          "default": "false",
          "source": "slide-x-reverse-transition",
          "description": "Missing description"
        },
        {
          "name": "hideOnLeave",
          "type": "boolean",
          "default": "false",
          "source": "slide-x-reverse-transition",
          "description": "Missing description"
        },
        {
          "name": "leaveAbsolute",
          "type": "boolean",
          "default": "false",
          "source": "slide-x-reverse-transition",
          "description": "Missing description"
        },
        {
          "name": "mode",
          "type": "string",
          "default": "undefined",
          "source": "slide-x-reverse-transition",
          "description": "Missing description"
        },
        {
          "name": "origin",
          "type": "string",
          "default": "'top center 0'",
          "source": "slide-x-reverse-transition",
          "description": "Missing description"
        }
      ],
      "mixins": [],
      "sass": []
    },
    "v-slide-y-transition": {
      "props": [
        {
          "name": "group",
          "type": "boolean",
          "default": "false",
          "source": "slide-y-transition",
          "description": "Missing description"
        },
        {
          "name": "hideOnLeave",
          "type": "boolean",
          "default": "false",
          "source": "slide-y-transition",
          "description": "Missing description"
        },
        {
          "name": "leaveAbsolute",
          "type": "boolean",
          "default": "false",
          "source": "slide-y-transition",
          "description": "Missing description"
        },
        {
          "name": "mode",
          "type": "string",
          "default": "undefined",
          "source": "slide-y-transition",
          "description": "Missing description"
        },
        {
          "name": "origin",
          "type": "string",
          "default": "'top center 0'",
          "source": "slide-y-transition",
          "description": "Missing description"
        }
      ],
      "mixins": [],
      "sass": []
    },
    "v-slide-y-reverse-transition": {
      "props": [
        {
          "name": "group",
          "type": "boolean",
          "default": "false",
          "source": "slide-y-reverse-transition",
          "description": "Missing description"
        },
        {
          "name": "hideOnLeave",
          "type": "boolean",
          "default": "false",
          "source": "slide-y-reverse-transition",
          "description": "Missing description"
        },
        {
          "name": "leaveAbsolute",
          "type": "boolean",
          "default": "false",
          "source": "slide-y-reverse-transition",
          "description": "Missing description"
        },
        {
          "name": "mode",
          "type": "string",
          "default": "undefined",
          "source": "slide-y-reverse-transition",
          "description": "Missing description"
        },
        {
          "name": "origin",
          "type": "string",
          "default": "'top center 0'",
          "source": "slide-y-reverse-transition",
          "description": "Missing description"
        }
      ],
      "mixins": [],
      "sass": []
    },
    "v-expand-transition": {
      "props": [
        {
          "name": "mode",
          "type": "string",
          "default": "'in-out'",
          "source": "expand-transition",
          "description": "Missing description"
        }
      ],
      "mixins": [],
      "sass": []
    },
    "v-expand-x-transition": {
      "props": [
        {
          "name": "mode",
          "type": "string",
          "default": "'in-out'",
          "source": "expand-x-transition",
          "description": "Missing description"
        }
      ],
      "mixins": [],
      "sass": []
    },
    "v-row-expand-transition": {
      "props": [
        {
          "name": "mode",
          "type": "string",
          "default": "'in-out'",
          "source": "row-expand-transition",
          "description": "Missing description"
        }
      ],
      "mixins": [],
      "sass": []
    },
    "$vuetify": {
      "functions": [
        {
          "name": "goTo",
          "signature": "(target: string | number | HTMLElement | VueComponent, options?: object): void",
          "description": "Missing description"
        }
      ],
      "sass": []
    },
    "internationalization": {
      "api": [
        {
          "name": "locales",
          "default": "{ en: VuetifyLocale }",
          "type": "Record<string, VuetifyLocale>",
          "description": "Missing description"
        },
        {
          "name": "current",
          "default": "en",
          "type": "string",
          "description": "Missing description"
        },
        {
          "name": "t",
          "default": "(key: string, ...params: Array<string | number>): string",
          "type": "Function",
          "description": "Missing description"
        }
      ],
      "sass": []
    },
    "v-ripple": {
      "options": [
        {
          "name": "value",
          "default": "{}",
          "type": "object",
          "description": "Missing description"
        },
        {
          "name": "center",
          "default": "false",
          "type": "boolean",
          "description": "Missing description"
        },
        {
          "name": "class",
          "default": "\"\"",
          "type": "string",
          "description": "Missing description"
        }
      ],
      "type": "undefined",
      "sass": []
    },
    "v-resize": {
      "options": [
        {
          "name": "modifiers.quiet",
          "default": "false",
          "type": "boolean",
          "description": "Missing description"
        },
        {
          "name": "value",
          "default": "undefined",
          "type": "Function",
          "description": "Missing description"
        }
      ],
      "type": "undefined",
      "sass": []
    },
    "v-scroll": {
      "options": [
        {
          "name": "arg:target",
          "default": "window",
          "type": "string",
          "description": "Missing description"
        },
        {
          "name": "arg:self",
          "default": false,
          "type": "boolean",
          "description": "Missing description"
        },
        {
          "name": "value",
          "default": "(): {}",
          "type": "Function",
          "description": "Missing description"
        }
      ],
      "type": "undefined",
      "sass": []
    },
    "v-touch": {
      "options": [
        {
          "name": "value",
          "default": "{}",
          "type": "object",
          "description": "Missing description"
        }
      ],
      "type": "undefined",
      "sass": []
    },
    "v-click-outside": {
      "options": [
        {
          "name": "value",
          "default": "undefined",
          "type": "((e: Event) => void) | ClickOutsideBindingArgs",
          "snippet": "ts_directive_click_outside_value",
          "description": "Missing description"
        }
      ],
      "type": "undefined",
      "sass": []
    }
  }
}
