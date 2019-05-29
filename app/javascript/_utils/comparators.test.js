import { dateTimeComparator } from './comparators'

describe('#dateTimeComparator', () => {
  it('compare timestamps - first is less', () => {
    const dateTime1 = '2019-05-20 11:13:41'
    const dateTime2 = '2019-06-20 10:15:25'
    expect(dateTimeComparator(dateTime1, dateTime2)).toEqual(-1)
  })

  it('compare timestamps - equal timestamps', () => {
    const dateTime = '2019-05-20 10:13:41'
    expect(dateTimeComparator(dateTime, dateTime)).toEqual(-1)
  })

  it('compare timestamp and date', () => {
    const dateTime1 = '2019-05-20 10:13:41'
    const dateTime2 = '2019-06-20'
    expect(dateTimeComparator(dateTime1, dateTime2)).toEqual(-1)
  })

  it('compare date and timestamp', () => {
    const dateTime1 = '2019-07-21'
    const dateTime2 = '2019-06-20  10:13:41'
    expect(dateTimeComparator(dateTime1, dateTime2)).toEqual(1)
  })

  it('compare timestamps - first is greater', () => {
    const dateTime1 = '2019-07-20 10:13:41'
    const dateTime2 = '2019-06-20 09:02:05'
    expect(dateTimeComparator(dateTime1, dateTime2)).toEqual(1)
  })

  it('compare with empty dates', () => {
    const testData = ['2019-07-20 10:13:41', '', '2018-07-20 10:13:41', '', '']
    const sortedData = ['', '', '', '2018-07-20 10:13:41', '2019-07-20 10:13:41']
    expect(testData.sort(dateTimeComparator)).toEqual(sortedData)
  })
})
