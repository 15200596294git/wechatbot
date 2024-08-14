// @ts-nocheck
import ChineseHolidays from 'chinese-holidays'

export async function isWorkingday(x: Date) {
  const book = await ChineseHolidays.ready()
  book.isWorkingday(x)
}

export async function isHoliday(x: Date) {
  const book = await ChineseHolidays.ready()
  book.isHoliday(x)
}

// 获取下一个节假日的日期
export async function nextHoliday() {
  const now = new Date()
  const book = await ChineseHolidays.ready()
  const holidays = book.all()

  // @ts-ignore
  const idx = holidays.findIndex((d) => new Date(d.range[0]) > now)
  return {
    holidayName: holidays[idx].name,
    date: new Date(holidays[idx].range[0])
  }
}
