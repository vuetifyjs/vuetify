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
        events={['2025-02-09']}
        eventColor="red"
      />
    ))

    const eventElements = document.querySelectorAll('.v-badge')
    expect(eventElements.length).toBeGreaterThan(0)
  })

  it('renders event markers when events is a function', async () => {
    render(() => (
      <VDatePicker
        events={(date: string) => date === '2025-02-09'}
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
        events={['2025-02-09', '2025-02-20']}
        eventColor={{ '2025-02-09': 'red', '2025-02-20': 'blue lighten-1' }}
      />
    ))

    const eventElements = document.querySelectorAll('.v-badge')
    expect(eventElements.length).toBeGreaterThan(0)
  })

  it('renders event markers with colors defined by a function', async () => {
    render(() => (
      <VDatePicker
        events={['2025-02-09', '2025-02-20']}
        eventColor={(date: string) => ({ '2025-02-09': 'red' }[date])}
      />
    ))

    const eventElements = document.querySelectorAll('.v-badge')
    expect(eventElements.length).toBeGreaterThan(0)
  })
})