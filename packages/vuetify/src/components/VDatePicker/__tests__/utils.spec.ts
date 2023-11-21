// @ts-nocheck
/* eslint-disable */

import { getWeek } from '../utils'
import { describe, expect, it } from '@jest/globals'

describe('getWeek', () => {
  it.each([
    [1, new Date(2001, 0, 1)],
    [1, new Date(2001, 11, 31)],
    [1, new Date(2002, 11, 30)],
    [1, new Date(2003, 11, 29)],
    [1, new Date(2010, 0, 4)],
    [1, new Date(2005, 0, 3)],
    [1, new Date(2006, 0, 2)],
    [1, new Date(1996, 11, 30)],
    [52, new Date(2006, 0, 1)],
    [53, new Date(2005, 0, 1)],
    [53, new Date(2010, 0, 3)],
  ])('should return week %s for date %s', (expected, given) => {
    expect(getWeek(given)).toBe(expected)
  })
})
