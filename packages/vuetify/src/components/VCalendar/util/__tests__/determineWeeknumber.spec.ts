import determineWeeknumber from '../determineWeeknumber'

describe('VDatePicker/util/determineWeeknumber.ts', () => {
  it('should return 53 as weeknumber', () => {
    expect(determineWeeknumber(2010, 0, 1, 1, 4)).toBe(53)
    expect(determineWeeknumber(2016, 0, 1, 0, 4)).toBe(53)
  })

  it('should return 52 as weeknumber', () => {
    expect(determineWeeknumber(2006, 0, 1, 1, 4)).toBe(52)
    expect(determineWeeknumber(2005, 11, 31, 0, 4)).toBe(52)
  })

  it('should return 1 as weeknumber', () => {
    expect(determineWeeknumber(2006, 0, 1, 0, 4)).toBe(1)
    expect(determineWeeknumber(2017, 0, 1, 0, 4)).toBe(1)
    expect(determineWeeknumber(2019, 11, 31, 0, 4)).toBe(1)
    expect(determineWeeknumber(2020, 0, 1, 0, 4)).toBe(1)
    expect(determineWeeknumber(2020, 0, 1, 1, 4)).toBe(1)
  })

  it('should return 2 as weeknumber', () => {
    expect(determineWeeknumber(2020, 0, 8, 0, 4)).toBe(2)
    expect(determineWeeknumber(2020, 0, 8, 1, 4)).toBe(2)
  })

  it('should return 5 as weeknumber', () => {
    expect(determineWeeknumber(2018, 1, 1, 2, 4)).toBe(5)
  })
})
