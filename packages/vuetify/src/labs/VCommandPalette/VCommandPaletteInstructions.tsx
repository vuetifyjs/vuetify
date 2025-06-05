// Styles
import './VCommandPaletteInstructions.scss'

// Components
import { VHotkey } from './VHotkey'

// Composables
import { useLocale } from '@/composables/locale'

// Utilities
import { genericComponent, propsFactory, useRender } from '@/util'

export const makeVCommandPaletteInstructionsProps = propsFactory({
  hasItems: Boolean,
  hasParent: Boolean,
  hasSelection: Boolean,
}, 'VCommandPaletteInstructions')

export const VCommandPaletteInstructions = genericComponent()({
  name: 'VCommandPaletteInstructions',
  props: makeVCommandPaletteInstructionsProps(),
  setup (props) {
    const { t } = useLocale()

    useRender(() => (
      <div class="v-command-palette-instructions">
        { props.hasItems && (
          <div key="select-instruction" class="d-flex align-center">
            <VHotkey keys="enter" />
            <span class="ms-2">{ t('$vuetify.commandPalette.instructions.select') }</span>
          </div>
        )}
        { props.hasItems && (
          <div key="navigate-instruction" class="d-flex align-center">
            <VHotkey keys="arrowup arrowdown" />
            <span class="ms-2">{ t('$vuetify.commandPalette.instructions.navigate') }</span>
          </div>
        )}
        { props.hasParent && (
          <div key="back-instruction" class="d-flex align-center">
            <VHotkey keys="backspace" />
            <span class="ms-2">{ t('$vuetify.commandPalette.instructions.goBack') }</span>
          </div>
        )}
        <div class="d-flex align-center">
          <VHotkey keys="escape" />
          <span class="ms-2">{ t('$vuetify.commandPalette.instructions.close') }</span>
        </div>
      </div>
    ))
  },
})
