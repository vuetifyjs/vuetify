// VCommandPalette.tsx
// Styles
import './VCommandPalette.sass'

// Components (Vuetify)
import { VDialog } from '@/components/VDialog'
import { VTextField } from '@/components/VTextField'
import { VList, VListItem } from '@/components/VList'
import { VHotKey } from '../VHotKey/VHotKey'

// Composables (Vuetify and CommandCore)
import { makeComponentProps } from '@/composables/component'
import { makeThemeProps, provideTheme } from '@/composables/theme'
import { useProxiedModel } from '@/composables/proxiedModel'
import { CommandCoreSymbol, type ActionDefinition } from '@/labs/command-core'
import { useId } from 'vue'

// Utilities
import { computed, ref, watch, inject, nextTick, unref } from 'vue'
import { genericComponent, propsFactory, useRender } from '@/util'

export const makeVCommandPaletteProps = propsFactory({
  modelValue: Boolean,
  placeholder: {
    type: String,
    default: 'Search commands...',
  },
  closeOnExecute: {
    type: Boolean,
    default: true,
  },
  width: {
    type: [String, Number],
    default: 600,
  },
  // ... other props like width, etc.
  ...makeComponentProps(),
  ...makeThemeProps(),
}, 'VCommandPalette')

export const VCommandPalette = genericComponent()({
  name: 'VCommandPalette',
  props: makeVCommandPaletteProps(),
  emits: {
    'update:modelValue': (val: boolean) => true,
  },
  setup(props, { emit }) {
    provideTheme(props)
    const isActive = useProxiedModel(props, 'modelValue')
    const commandCore = inject(CommandCoreSymbol)

    const searchText = ref('')
    const searchInputRef = ref<InstanceType<typeof VTextField> | null>(null)
    const listRef = ref<HTMLElement | null>(null) // For focusing list items
    const selectedIndex = ref(0)
    const listId = useId()

    // Helper to generate unique IDs for list items
    const getItemHTMLId = (actionId: string, index: number) => {
      return `${listId}-item-${index}`
    }

    const activeDescendantId = computed(() => {
      if (isActive.value && filteredActions.value.length > 0 && selectedIndex.value >= 0 && selectedIndex.value < filteredActions.value.length) {
        const action = filteredActions.value[selectedIndex.value];
        return getItemHTMLId(action.id, selectedIndex.value);
      }
      return undefined;
    })

    watch(isActive, async (val) => {
      if (val) {
        await nextTick()
        searchInputRef.value?.focus()
        searchText.value = ''
        selectedIndex.value = 0
      } else {
        searchText.value = '' // Clear search on close as well
      }
    })

    const filteredActions = computed(() => {
      if (!commandCore || !commandCore.allActions.value) return []
      const query = searchText.value.toLowerCase().trim()
      const actions = commandCore.allActions.value.filter(action => !action.meta?.paletteHidden)

      if (!query) return actions

      return actions.filter(action => {
        const titleValue = unref(action.title)
        const titleMatch = titleValue.toLowerCase().includes(query)

        let keywordMatch = false;
        if (action.keywords) {
          if (typeof action.keywords === 'string') {
            keywordMatch = action.keywords.toLowerCase().includes(query);
          } else {
            keywordMatch = action.keywords.some(k => k.toLowerCase().includes(query));
          }
        }
        return titleMatch || keywordMatch
      })
    })

    watch(filteredActions, (newActions, oldActions) => {
      // Reset index if the list fundamentally changes or becomes empty
      // or if the previously selected item is no longer visible
      if (newActions.length === 0 || selectedIndex.value >= newActions.length) {
        selectedIndex.value = 0
      } else if (oldActions[selectedIndex.value] && newActions.indexOf(oldActions[selectedIndex.value]) === -1) {
        selectedIndex.value = 0
      }
    }, { deep: true })

    function onActionClick(action: ActionDefinition) {
      if (!commandCore) return
      commandCore.executeAction(action.id, { trigger: 'command-palette' })
        .then(() => {
          if (props.closeOnExecute) {
            isActive.value = false
          }
        })
        .catch(err => {
          console.error(`[VCommandPalette] Failed to execute action "${action.id}":`, err)
        })
    }

    function scrollToSelected() {
      nextTick(() => {
        const selectedItemEl = listRef.value?.querySelector(`.v-list-item[data-index="${selectedIndex.value}"]`) as HTMLElement | undefined;
        selectedItemEl?.scrollIntoView?.({ block: 'nearest' });
      });
    }

    function handleKeydown(event: KeyboardEvent) {
      const items = filteredActions.value
      if (items.length === 0 && event.key !== 'Escape') return

      if (event.key === 'ArrowDown') {
        event.preventDefault()
        selectedIndex.value = (selectedIndex.value + 1) % items.length
        scrollToSelected()
      } else if (event.key === 'ArrowUp') {
        event.preventDefault()
        selectedIndex.value = (selectedIndex.value - 1 + items.length) % items.length
        scrollToSelected()
      } else if (event.key === 'Enter') {
        event.preventDefault()
        if (items[selectedIndex.value]) {
          onActionClick(items[selectedIndex.value])
        }
      } else if (event.key === 'Escape') {
        isActive.value = false
      }
    }

    // Watch for isActive and focus the text field or the first item if no text field
    watch(isActive, (val) => {
      if (val) {
        nextTick(() => {
          searchInputRef.value?.focus()
        });
      }
    });


    useRender(() => (
      <VDialog
        v-model={isActive.value}
        width={props.width}
        scrollable
        class="v-command-palette-dialog"
        contentClass="v-command-palette-dialog__content"
        scrim="#000000"
      >
        <div
          class="v-command-palette"
          role="dialog"
          aria-modal="true"
          aria-label="Command Palette"
          onKeydown={handleKeydown} // Handle keydown on the entire palette container for list navigation
        >
          <VTextField
            ref={searchInputRef}
            v-model={searchText.value}
            placeholder={props.placeholder}
            prependInnerIcon="$search"
            hideDetails
            density="compact"
            autofocus
            class="v-command-palette__search"
            // ARIA attributes for combobox pattern
            role="combobox"
            aria-haspopup="listbox"
            aria-expanded={isActive.value && filteredActions.value.length > 0}
            aria-controls={listId}
            aria-activedescendant={activeDescendantId.value}
          />
          <VList
            ref={listRef}
            id={listId}
            role="listbox"
            aria-label="Commands"
            class="v-command-palette__list"
            lines="one"
          >
            {filteredActions.value.length === 0 && (
              <VListItem
                id={`${listId}-no-results`}
                role="option" // Even no-results can be an option explaining state
                disabled
                title={searchText.value ? 'No results found.' : 'Type to search commands...'}
                class="v-command-palette__no-results"
              />
            )}
            {filteredActions.value.map((action, index) => (
              <VListItem
                key={action.id}
                id={getItemHTMLId(action.id, index)}
                role="option"
                aria-selected={index === selectedIndex.value}
                title={unref(action.title)}
                active={index === selectedIndex.value}
                onClick={() => onActionClick(action)}
                class={{ 'v-command-palette__item--selected': index === selectedIndex.value }}
                data-index={index}
                value={action.id}
              >
                {{
                  append: () => {
                    const displayHotkey = Array.isArray(action.hotkey) ? action.hotkey[0] : action.hotkey;
                    return displayHotkey ? <VHotKey hotkey={displayHotkey} dense /> : null;
                  },
                }}
              </VListItem>
            ))}
          </VList>
        </div>
      </VDialog>
    ))
    return {}
  }
})

export type VCommandPalette = InstanceType<typeof VCommandPalette>
