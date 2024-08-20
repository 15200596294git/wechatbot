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
import { createRandomSelector } from '../utils/common.ts'
import { MORNING_MESSAGES, FISH_MESSAGES, WATER_MESSAGES, ORDER_MESSAGES } from './constant.ts'


export function morningText() {
  const sayMorning = createRandomSelector(MORNING_MESSAGES)
  return sayMorning()
}

export function fishText() {
  const fish = createRandomSelector(FISH_MESSAGES)
  return fish()
}

export function waterText() {
  const water = createRandomSelector(WATER_MESSAGES)
  return water()
}

// 外卖
export function orderText() {
  const o = createRandomSelector(ORDER_MESSAGES)
  return o()
}

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

  const holidayText = `距离${holidayName},还有${holidayDis}天!`

  const h = differenceInHours(currentDateAtSixPM, now)
  const m = differenceInMinutes(currentDateAtSixPM, now) % 60
  // return overtimeText = m > 0 ? `${holidayText}` : ''
  return `${holidayText}`
}


