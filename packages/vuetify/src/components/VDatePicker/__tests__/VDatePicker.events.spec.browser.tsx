// @ts-nocheck
/* eslint-disable */

import { render, screen } from '@test'
import { ref } from 'vue'
import { VDatePicker } from '../VDatePicker'

describe('VDatePicker events', () => {
  it('renders event markers when events is an array', async () => {
    render(() => (
      <VDatePicker
        type="month"
        events={['2025-04-09']}
        eventColor="red"
      />
    ))

    const eventElements = document.querySelectorAll('.v-badge')
    expect(eventElements.length).toBeGreaterThan(0)
  })

  it('renders event markers when events is a function', async () => {
    render(() => (
      <VDatePicker
        events={(date: string) => date === '2025-04-09'}
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
        events={['2025-04-09', '2025-04-20']}
        eventColor={{ '2025-04-09': 'red', '2025-04-20': 'blue lighten-1' }}
      />
    ))

    const eventElements = document.querySelectorAll('.v-badge')
    expect(eventElements.length).toBeGreaterThan(0)
  })

  it('renders event markers with colors defined by a function', async () => {
    render(() => (
      <VDatePicker
        events={['2025-04-09', '2025-04-20']}
        eventColor={(date: string) => ({ '2025-04-09': 'red' }[date])}
      />
    ))

    const eventElements = document.querySelectorAll('.v-badge')
    expect(eventElements.length).toBeGreaterThan(0)
  })

  it('uses default color when eventColor is null', async () => {
    render(() => (
      <VDatePicker
        type="month"
        events={{ '2025-04-09': true }}
        eventColor={null}
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