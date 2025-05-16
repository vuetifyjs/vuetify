// VCommandPalette.tsx
// Styles
import './VCommandPalette.scss'

// Components (Vuetify)
import { VDialog } from '@/components/VDialog'
import { VTextField } from '@/components/VTextField'
import { VIcon } from '@/components/VIcon'
import { VBtn } from '@/components/VBtn'
import { VHotKey } from '../VHotKey/VHotKey'
import { VProgressLinear } from '@/components/VProgressLinear'
import { VCommandPaletteList, type VCommandPaletteListItemScope, type VCommandPaletteListNoResultsScope } from './VCommandPaletteList'
import { VCommandPaletteHeader } from './VCommandPaletteHeader'
import { VCommandPaletteSearch } from './VCommandPaletteSearch'

// Composables (Vuetify and CommandCore)
import { makeComponentProps } from '@/composables/component'
import { makeThemeProps, provideTheme } from '@/composables/theme'
import { CommandCoreSymbol, type ActionDefinition, type ActionContext } from '@/labs/command-core'
import { useCommandPaletteCore, type CommandPaletteListRef } from '../../composables/useCommandPaletteCore' // Added type import

// Utilities
import { ref, inject, nextTick, type VNode } from 'vue'
import { genericComponent, propsFactory, useRender } from '@/util'
import { isHeaderItem } from '../../utils' // Import from centralized utils

// Import existing scope types
import type { VCommandPaletteHeaderProps } from './VCommandPaletteHeader'

// Explicit Slot Type Definitions
interface VCommandPaletteHeaderScopeProps {
  parentAction?: ActionDefinition<any>;
  navigateBack: () => void;
  title?: string;
}

interface VCommandPaletteItemScopeProps extends VCommandPaletteListItemScope {}

interface VCommandPaletteNoResultsScopeProps extends VCommandPaletteListNoResultsScope {}

type HeaderSlotFunc = (scope: VCommandPaletteHeaderScopeProps) => VNode[];
type ItemSlotFunc = (scope: VCommandPaletteItemScopeProps) => VNode[];
type NoResultsSlotFunc = (scope: VCommandPaletteNoResultsScopeProps) => VNode[];

interface VCommandPaletteTypedSlots {
  item?: ItemSlotFunc;
  header?: HeaderSlotFunc;
  'no-results'?: NoResultsSlotFunc;
}

// Type for slots to pass to VCommandPaletteList
interface VCommandPaletteListSlots {
  item?: ItemSlotFunc;
  'no-results'?: NoResultsSlotFunc;
}

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
  ...makeComponentProps(),
  ...makeThemeProps(),
}, 'VCommandPalette')

// Re-defining slot types for genericComponent
export const VCommandPalette = genericComponent<{
  item?: ItemSlotFunc;
  header?: HeaderSlotFunc;
  'no-results'?: NoResultsSlotFunc;
}>()({
  name: 'VCommandPalette',
  props: makeVCommandPaletteProps(),
  emits: {
    'update:modelValue': (val: boolean) => true,
    'update:list': () => true,
  },
  setup(props, { emit, slots }) {
    provideTheme(props)

    // Cast slots to our more specific typed interface
    const typedSlots = slots as VCommandPaletteTypedSlots;

    // Inject commandCore - this is used by useCommandPaletteCore
    const commandCore = inject(CommandCoreSymbol)

    // Refs for internal components and for the core composable
    const searchComponentRef = ref<InstanceType<typeof VCommandPaletteSearch> | null>(null) // Ref for VCommandPaletteSearch component instance
    const textFieldInstanceRef = ref<InstanceType<typeof VTextField> | null>(null) // Ref for the VTextField instance itself
    const listRef = ref<CommandPaletteListRef | null>(null)

    // Use the centralized core composable, passing the ref for the VTextField instance
    const core = useCommandPaletteCore(
      props,
      commandCore,
      emit,
      textFieldInstanceRef, // Pass the VTextField instance ref here
      listRef
    )

    // Create properly typed slots for VCommandPaletteList
    const commandPaletteListSlots: VCommandPaletteListSlots = {
      item: typedSlots.item,
      'no-results': typedSlots['no-results']
    }

    // Render with our new approach - delegating most logic to the core composable
    useRender(() => (
      <VDialog
        v-model={core.isActive.value}
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
          aria-label="Command Palette Dialog"
          onKeydown={core.handleKeydown}
        >
          {/* Header component with back button and title */}
          {typedSlots.header ? (() => {
            const headerContent = typedSlots.header({
              parentAction: core.currentParentAction.value,
              navigateBack: core.navigateBack,
              title: core.currentLevelTitle.value
            });

            // If header slot returned a raw HTML string, render via innerHTML so markup is parsed
            if (typeof headerContent === 'string') {
              return <div innerHTML={headerContent} /> as VNode;
            }

            return headerContent as unknown as VNode;
          })() : (
            <VCommandPaletteHeader
              title={core.currentLevelTitle.value}
              isRootLevel={core.isRootLevel.value}
              listId={core.listId}
              onNavigateBack={core.navigateBack}
            />
          )}

          {/* Search component */}
          <VCommandPaletteSearch
            ref={searchComponentRef} // Assign VCommandPaletteSearch instance to its own ref
            inputRef={textFieldInstanceRef} // Pass the VTextField instance ref as a prop
            modelValue={core.searchText.value}
            placeholder={props.placeholder}
            autofocus
            onUpdate:modelValue={(val) => core.searchText.value = val}
            role="combobox"
            aria-haspopup="listbox"
            aria-expanded={(core.isActive.value && core.groupedAndSortedActions.value.length > 0) ? 'true' : 'false'}
            aria-controls={core.listId}
            aria-activedescendant={core.activeDescendantId.value}
            aria-labelledby={`${core.listId}-title`}
          />

          {/* Loading indicator */}
          {core.isLoadingSubItems.value && (
            <div class="v-command-palette__loader">
              <VProgressLinear indeterminate color="primary" />
            </div>
          )}

          {/* Command list */}
          {!core.isLoadingSubItems.value && (
            <VCommandPaletteList
              ref={listRef}
              actions={core.groupedAndSortedActions.value}
              selectedIndex={core.selectedIndex.value}
              listId={core.listId}
              searchText={core.searchText.value}
              onActionClick={core.handleItemActivated}
              onItemNavigate={core.handleItemActivated}
              // TODO: This is a temporary workaround for slot type mismatch issues
              // The type definition for v-slots in VCommandPaletteList and the function signatures
              // expected by TypeScript are incompatible. This needs a proper fix in the future.
              v-slots={{
                item: typedSlots.item,
                'no-results': typedSlots['no-results']
              } as any}
            />
          )}
        </div>
      </VDialog>
    ))

    // Expose focus method for programmatic focus
    return {
      focus: core.focusSearchInput,
      core, // For direct access in tests
    }
  }
})

export type VCommandPalette = InstanceType<typeof VCommandPalette>
