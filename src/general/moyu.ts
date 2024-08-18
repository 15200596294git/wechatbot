// @ts-nocheck
import {
  isAfter,
  differenceInDays,
  nextFriday,
  differenceInHours,
  differenceInMinutes,
  nextSaturday,
} from 'date-fns'
import { Wechaty } from 'wechaty'
import { isHoliday, isWorkingday, nextHoliday } from '../utils/date.js'



function createRandomSelector(array) {
  return function () {
    const randomIndex = Math.floor(Math.random() * array.length)
    return array[randomIndex]
  }
}

const getRandomFish = createRandomSelector(fishTextArray)
const getRandomWater = createRandomSelector(drinkWaterMessages)


// 下班倒计时
export function workdayCountdown() {
  const now = new Date()

  // 下班时间
  const currentDateAtSixPM = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    18,
    0,
    0,
    0
  )
  const h = differenceInHours(currentDateAtSixPM, now)
  const m = differenceInMinutes(currentDateAtSixPM, now) % 60

  return {
    hour: h as number,
    minute: m as number
  }
}

// 摸鱼文本
export async function fish() {
  // 节假日，直接返回
  if (await isHoliday()) return ''
  const now = new Date()

  // 下班时间
  const currentDateAtSixPM = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    18,
    0,
    0,
    0
  )
  const h = differenceInHours(currentDateAtSixPM, now)
  const m = differenceInMinutes(currentDateAtSixPM, now) % 60
  return m > 0 ? `${getRandomFish()}\n` : '已下班!\n'
}

export async function drinkWater() {
  // 节假日，直接返回
  if (await isHoliday()) return ''
  const now = new Date()

  return `${getRandomWater()}\n`
}

// 节假日
export async function holiday() {
  // 节假日，直接返回
  if (await isHoliday()) return ''
  const now = new Date()

  // 下班时间
  const currentDateAtSixPM = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    18,
    0,
    0,
    0
  )

  const { holidayName, date } = await nextHoliday()
  const holidayDis = differenceInDays(date, now)

  const holidayText = `距离${holidayName},还有${holidayDis}天!\n`

  const h = differenceInHours(currentDateAtSixPM, now)
  const m = differenceInMinutes(currentDateAtSixPM, now) % 60
  // return overtimeText = m > 0 ? `${holidayText}` : ''
  return `${holidayText}`
}


