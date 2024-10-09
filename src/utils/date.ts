// @ts-nocheck
import ChineseHolidays from 'chinese-holidays'

const options = {
  // offline: true
}

export async function isWorkingday(x: Date) {
  const book = await ChineseHolidays.ready(options)
  book.isWorkingday(x)
}

export async function isHoliday(x: Date) {
  const book = await ChineseHolidays.ready(options)
  book.isHoliday(x)
}

// 获取下一个节假日的日期
export async function nextHoliday() {
  const now = new Date()
  const book = await ChineseHolidays.ready(options)
  const holidays = book.all()

  console.log("🚀 ~ nextHoliday ~ holidays:", holidays)


  // @ts-ignore
  const idx = holidays.findIndex((d) => new Date(d.range[0]) > now)
  if(idx === -1) return null

  return {
    holidayName: holidays[idx].name,
    date: new Date(holidays[idx].range[0])
  }
}
