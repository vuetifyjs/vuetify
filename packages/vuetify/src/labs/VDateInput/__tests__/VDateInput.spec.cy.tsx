/// <reference types="../../../../types/cypress" />

// Components
import { VDateInput } from '../'
import { VLocaleProvider } from '../../../components/VLocaleProvider'

// Utilities
import { ref } from 'vue'

describe('VDateInput', () => {
  function expectDate (value: Date | null, expectedYear: number, expectedMonth: number, expectedDate: number) {
    expect(value?.getFullYear()).to.be.equal(expectedYear)
    expect(value?.getMonth()).to.be.equal(expectedMonth)
    expect(value?.getDate()).to.be.equal(expectedDate)
  }

  it('should set model to null when invalid date string is typed', () => {
    const model = ref(new Date(2024, 5, 1))

    cy
      .mount(() => (
        <VDateInput v-model={ model.value } multiple={ false } />
      ))
      .get('.v-text-field input')
      .should('have.value', '06/01/2024')
      .click()
      .clear()
      .type('invalid-value')
      .should(() => {
        expectDate(model.value, 2024, 5, 1)
      })
      .type('{enter}')
      .should(() => {
        expect(model.value).to.be.null
      })
      .clear()
      .type('other-invalid-value')
      .blur()
      .should(() => {
        expect(model.value).to.be.null
      })
      .click()
      .clear()
      .type('06/02/2000')
      .blur()
      .should(() => {
        expectDate(model.value, 2000, 5, 2)
      })
  })

  it('should format and parse input value when default locale is used and multiple is false', () => {
    const model = ref(new Date(2024, 5, 1))

    cy
      .mount(() => (
        <VDateInput v-model={ model.value } multiple={ false } />
      ))
      .get('.v-text-field input')
      .should('have.value', '06/01/2024')
      .click()
      .clear()
      .type('10/02/2025')
      .should(() => {
        expectDate(model.value, 2024, 5, 1)
      })
      .type('{enter}')
      .should(() => {
        expectDate(model.value, 2025, 9, 2)
      })
      .clear()
      .type('12/31/2023')
      .blur()
      .should(() => {
        expectDate(model.value, 2023, 11, 31)
      })
  })

  it('should format and parse input value when default locale is used and multiple is range', () => {
    const model = ref([new Date(2024, 5, 1), new Date(2024, 5, 6)])

    cy
      .mount(() => (
        <VDateInput v-model={ model.value } multiple="range" />
      ))
      .get('.v-text-field input')
      .should('have.value', '06/01/2024 - 06/06/2024')
      .click()
      .clear()
      .type('12/31/2023 - 02/01/2024')
      .should(() => {
        expectDate(model.value[0], 2024, 5, 1)
        expectDate(model.value[1], 2024, 5, 6)
      })
      .type('{enter}')
      .should(() => {
        expectDate(model.value[0], 2023, 11, 31)
        expectDate(model.value[1], 2024, 1, 1)
      })
      .clear()
      .type('12/31/2022 - 02/01/2023')
      .blur()
      .should(() => {
        expectDate(model.value[0], 2022, 11, 31)
        expectDate(model.value[1], 2023, 1, 1)
      })
  })

  it('should be readonly when multiple is true', () => {
    const model = ref([new Date(2024, 5, 1)])

    cy
      .mount(() => (
        <VDateInput v-model={ model.value } multiple />
      ))
      .get('.v-text-field')
      .should('have.class', 'v-input--readonly')
  })

  it('should format and parse input value when "pl" locale is used and multiple is false', () => {
    const model = ref(new Date(2024, 5, 1))

    cy
      .mount(() => (
        <VLocaleProvider locale="pl">
          <VDateInput v-model={ model.value } multiple={ false } />
        </VLocaleProvider>
      ))
      .get('.v-text-field input')
      .should('have.value', '01.06.2024')
      .click()
      .clear()
      .type('02.10.2025')
      .should(() => {
        expectDate(model.value, 2024, 5, 1)
      })
      .type('{enter}')
      .should(() => {
        expectDate(model.value, 2025, 9, 2)
      })
      .clear()
      .type('31.12.2023')
      .blur()
      .should(() => {
        expectDate(model.value, 2023, 11, 31)
      })
  })

  it('should format and parse input value when "pl" locale is used and multiple is range', () => {
    const model = ref([new Date(2024, 5, 1), new Date(2024, 5, 6)])

    cy
      .mount(() => (
        <VLocaleProvider locale="pl">
          <VDateInput v-model={ model.value } multiple="range" />
        </VLocaleProvider>
      ))
      .get('.v-text-field input')
      .should('have.value', '01.06.2024 - 06.06.2024')
      .click()
      .clear()
      .type('31.12.2023 - 01.02.2024')
      .should(() => {
        expectDate(model.value[0], 2024, 5, 1)
        expectDate(model.value[1], 2024, 5, 6)
      })
      .type('{enter}')
      .should(() => {
        expectDate(model.value[0], 2023, 11, 31)
        expectDate(model.value[1], 2024, 1, 1)
      })
      .clear()
      .type('31.12.2022 - 01.02.2023')
      .blur()
      .should(() => {
        expectDate(model.value[0], 2022, 11, 31)
        expectDate(model.value[1], 2023, 1, 1)
      })
  })

  it('should format and parse input value when "pl" locale is used and multiple is false but when ISO dates are typed', () => {
    const model = ref(new Date(2024, 5, 1))

    cy
      .mount(() => (
        <VLocaleProvider locale="pl">
          <VDateInput v-model={ model.value } multiple={ false } />
        </VLocaleProvider>
      ))
      .get('.v-text-field input')
      .should('have.value', '01.06.2024')
      .click()
      .clear()
      .type('2025-10-02')
      .should(() => {
        expectDate(model.value, 2024, 5, 1)
      })
      .type('{enter}')
      .should('have.value', '02.10.2025')
      .should(() => {
        expectDate(model.value, 2025, 9, 2)
      })
      .clear()
      .type('2023-12-31')
      .blur()
      .should('have.value', '31.12.2023')
      .should(() => {
        expectDate(model.value, 2023, 11, 31)
      })
  })

  it('should format and parse input value when "pl" locale is used and multiple is range but when ISO dates are typed', () => {
    const model = ref([new Date(2024, 5, 1), new Date(2024, 5, 6)])

    cy
      .mount(() => (
        <VLocaleProvider locale="pl">
          <VDateInput v-model={ model.value } multiple="range" />
        </VLocaleProvider>
      ))
      .get('.v-text-field input')
      .should('have.value', '01.06.2024 - 06.06.2024')
      .click()
      .clear()
      .type('2023-12-31 - 2024-02-01')
      .should(() => {
        expectDate(model.value[0], 2024, 5, 1)
        expectDate(model.value[1], 2024, 5, 6)
      })
      .type('{enter}')
      .should('have.value', '31.12.2023 - 01.02.2024')
      .should(() => {
        expectDate(model.value[0], 2023, 11, 31)
        expectDate(model.value[1], 2024, 1, 1)
      })
      .clear()
      .type('2022-12-31 - 2023-02-01')
      .blur()
      .should('have.value', '31.12.2022 - 01.02.2023')
      .should(() => {
        expectDate(model.value[0], 2022, 11, 31)
        expectDate(model.value[1], 2023, 1, 1)
      })
  })

  it('should format and parse input value when "sv" locale is used and multiple is false', () => {
    const model = ref(new Date(2024, 5, 1))

    cy
      .mount(() => (
        <VLocaleProvider locale="sv">
          <VDateInput v-model={ model.value } multiple={ false } />
        </VLocaleProvider>
      ))
      .get('.v-text-field input')
      .should('have.value', '2024-06-01')
      .click()
      .clear()
      .type('2025-10-02')
      .should(() => {
        expectDate(model.value, 2024, 5, 1)
      })
      .type('{enter}')
      .should(() => {
        expectDate(model.value, 2025, 9, 2)
      })
      .clear()
      .type('2023-12-31')
      .blur()
      .should(() => {
        expectDate(model.value, 2023, 11, 31)
      })
  })

  it('should format and parse input value when "sv" locale is used and multiple is range', () => {
    const model = ref([new Date(2024, 5, 1), new Date(2024, 5, 6)])

    cy
      .mount(() => (
        <VLocaleProvider locale="sv">
          <VDateInput v-model={ model.value } multiple="range" />
        </VLocaleProvider>
      ))
      .get('.v-text-field input')
      .should('have.value', '2024-06-01 - 2024-06-06')
      .click()
      .clear()
      .type('2023-12-31 - 2024-02-01')
      .should(() => {
        expectDate(model.value[0], 2024, 5, 1)
        expectDate(model.value[1], 2024, 5, 6)
      })
      .type('{enter}')
      .should(() => {
        expectDate(model.value[0], 2023, 11, 31)
        expectDate(model.value[1], 2024, 1, 1)
      })
      .clear()
      .type('2022-12-31 - 2023-02-01')
      .blur()
      .should(() => {
        expectDate(model.value[0], 2022, 11, 31)
        expectDate(model.value[1], 2023, 1, 1)
      })
  })
})
