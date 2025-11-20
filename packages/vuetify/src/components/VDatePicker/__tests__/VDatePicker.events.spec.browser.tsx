// Utilities
import { render } from '@test'
import { VDatePicker } from '../VDatePicker'

describe('VDatePicker events', () => {
  it('renders event markers when events is an array', async () => {
    render(() => (
      <VDatePicker
        type="month"
        month={ 3 }
        year={ 2022 }
        events={['2022-04-09']}
        eventColor="red"
      />
    ))

    const eventElements = document.querySelectorAll('.v-badge')
    expect(eventElements.length).toBeGreaterThan(0)
  })

  it('renders event markers when events is a function', async () => {
    render(() => (
      <VDatePicker
        month={ 3 }
        year={ 2022 }
        events={ (date: string) => date === '2022-04-09' }
        eventColor="red"
      />
    ))

    // Query the DOM for the event markers
    const eventElements = document.querySelectorAll('.v-badge')
    expect(eventElements.length).toBeGreaterThan(0)
  })

  it('renders event markers with colors defined by an object', async () => {
    render(() => (
      <VDatePicker
        month={ 3 }
        year={ 2022 }
        events={['2022-04-09', '2022-04-20']}
        eventColor={{ '2022-04-09': 'red', '2022-04-20': 'blue lighten-1' }}
      />
    ))

    const eventElements = document.querySelectorAll('.v-badge')
    expect(eventElements.length).toBeGreaterThan(0)
  })

  it('renders event markers with colors defined by a function', async () => {
    render(() => (
      <VDatePicker
        month={ 3 }
        year={ 2022 }
        events={['2022-04-09', '2022-04-20']}
        eventColor={ (date: string) => ({ '2022-04-09': 'red' }[date] || false) }
      />
    ))

    const eventElements = document.querySelectorAll('.v-badge')
    expect(eventElements.length).toBeGreaterThan(0)
  })

  it('uses default color when eventColor is not set', async () => {
    render(() => (
      <VDatePicker
        type="month"
        month={ 3 }
        year={ 2022 }
        events={{ '2022-04-09': true }}
      />
    ))

    const eventElements = document.querySelectorAll('.v-badge')
    expect(eventElements.length).toBeGreaterThan(0)

    const hasSurfaceVariant = Array.from(eventElements).some(el =>
      el.querySelector('.v-badge__badge')?.classList.contains('bg-surface-variant')
    )
    expect(hasSurfaceVariant).toBe(true)
  })
})
