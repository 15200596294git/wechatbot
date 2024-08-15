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
import { isHoliday, isWorkingday, nextHoliday } from '../utils/date.ts'

const fishTextArray = [
  '工作只是一种状态，摸鱼才是真正的生活方式。',
  '今天的目标：保持高效，顺便摸个鱼。',
  '工作再忙，也要给自己留点摸鱼的时间。',
  '我的工作技能：高效处理任务+摸鱼精通。',
  '保持生产力的秘密？合理的摸鱼时间。',
  '人在办公室，心在外面飘',
  '虚情假意上班，真心实意下班',
  '你摸鱼我摸鱼，老板宝马变青桔',
  '枯藤老树昏鸦，上班摸鱼下班回家5划划水，看看表，舒服一秒是一秒',
  '周一摸鱼，无人能及，周二摸鱼，工作多余',
  '摸鱼的最高境界就是不会被发现,还被老板点赞',
  '努力不一定被看到 但摸鱼一定会被看见',
  '闹钟一响 请假理由千万条',
  '天天想辞职，月月拿满勤',
  '正义都能迟到，为什么上班不行',
  '锄禾日当午，上班好辛苦。上完一上午，还要上下午',
  '今天搬砖不狠，明天地位不稳',
  '我的状态是挣钱如捉鬼，花钱如流水',
  '上班摸鱼下班钓鱼',
  '人之初性本善不想上班怎么办',
  '职场三连: 摸鱼，摆烂，等下班',
  '职场净化军:谁爱卷谁卷，他强任他强，我是摆烂王',
  '《正在划水 划不会涨的薪水》',
  '正在上班 上那不挣钱的班',
  '装模作样上班 真心实意摸鱼',
  '摸鱼是我对抗资本的最后一点尊严',
]

const drinkWaterMessages = [
  '每天八杯水，健康生活我做主！',
  '记得喝水哦，水是最好的美容液！',
  '让清水滋润你的每一天，喝水从现在开始！',
  '给身体加点水，清新一天好心情！',
  '喝水是最简单的保养，养成习惯，你会感受到变化。',
  '水是生命之源，保持充足的水分，活力满满！',
  '每次感觉口渴时，都是身体在提醒你喝水！',
  '一杯清水，满满的健康；每天坚持，你会更美丽。',
  '给自己喝水的时间，身体会感谢你！',
  '健康从喝水开始，让清水带走疲惫。',
]

function createRandomSelector(array) {
  return function () {
    const randomIndex = Math.floor(Math.random() * array.length)
    return array[randomIndex]
  }
}

const getRandomFish = createRandomSelector(fishTextArray)
const getRandomWater = createRandomSelector(drinkWaterMessages)

export async function moyu() {
  const now = new Date()
  let ret
  try {
    ret = await ChineseHolidays.ready()
  } catch (error) {
    return null
  }

  // console.log("🚀 ~ moyu ~ ret:", ret.all())
  const afterDate = ret.all().filter((d) => {
    const start_date = d.range[0]
    return isAfter(new Date(start_date), now)
  })

  const afterDay = afterDate[0]
  const holidayDis = differenceInDays(afterDay.range[0], now)
  console.log(`距离下一个节假日放假${afterDay.name},还有${holidayDis}天!`)

  // 距离周五还有几天
  const dayDis = differenceInDays(nextFriday(now), now)
  console.log(`距离下一个周五还有${dayDis}天！`)

  // 距离今天下班
  const hourDis = differenceInHours()
  const minDis = differenceInMinutes()
  // const
}

export async function myb(bot) {
  const now = new Date()

  // 测试群 叮叮咚咚
  // ᑋᵉᑊᑊᵒ ᵕ̈ ²⁰²⁴
  const room = await bot?.Room?.find('ᑋᵉᑊᑊᵒ ᵕ̈ ²⁰²⁴')

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
  const overtimeText = m > 0 ? `距离18:00下班还有${h}小时${m}分钟` : ''

  const dayDis = differenceInDays(nextSaturday(now), now)
  const weekendText = `距离周末还有${dayDis}天！`

  // room?.say(`距离18:00下班还有${h}小时${m}分钟\n${getRandomFishText()}---摸鱼办!`)
  room?.say(`${overtimeText}\n${weekendText}\n${getRandomFishText()}---摸鱼办!`)
}

// 下班倒计时
export async function overtime() {
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
  return m > 0 ? `距离18:00下班还有${h}小时${m}分钟!\n` : '已下班!\n'
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


