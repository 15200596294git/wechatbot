// @ts-nocheck
import schedule from 'node-schedule'
import ChineseHolidays from 'chinese-holidays'
import { nextSunday,isAfter, differenceInDays, nextFriday, differenceInHours, differenceInMilliseconds, differenceInMinutes, nextSaturday } from 'date-fns'

export async function moyu() {
  const now = new Date()
  let ret
  try {
    ret = await ChineseHolidays.ready()
  } catch (error) {
    return null
  }
  

  // console.log("🚀 ~ moyu ~ ret:", ret.all())
  const afterDate = ret.all().filter(d=> {
    const start_date = d.range[0]
    return isAfter(new Date(start_date), now)
  })

  const afterDay = afterDate[0]
  const holidayDis = differenceInDays(afterDay.range[0], now)
  console.log(`距离下一个节假日放假${afterDay.name},还有${holidayDis}天!`)

  // 距离周五还有几天
  const dayDis = differenceInDays(nextFriday(now) , now)
  console.log(`距离下一个周五还有${dayDis}天！`);
  
  // 距离今天下班
  const hourDis = differenceInHours()
  const minDis = differenceInMinutes()
  // const
}

export async function myb(bot) {
  const now = new Date()
  const fishTextArray = [
    '工作只是一种状态，摸鱼才是真正的生活方式。',
    '今天的目标：保持高效，顺便摸个鱼。',
    '工作再忙，也要给自己留点摸鱼的时间。',
    '我的工作技能：高效处理任务+摸鱼精通。',
    '保持生产力的秘密？合理的摸鱼时间。',
  ]

  function getRandomFishText() {
    const randomIndex = Math.floor(Math.random() * fishTextArray.length)
    return fishTextArray[randomIndex]
  }
  // 测试群 叮叮咚咚
  // ᑋᵉᑊᑊᵒ ᵕ̈ ²⁰²⁴
  const room = await bot?.Room?.find('ᑋᵉᑊᑊᵒ ᵕ̈ ²⁰²⁴')

  // 下班时间
  const currentDateAtSixPM = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 18, 0, 0, 0);
  const h = differenceInHours(currentDateAtSixPM, now)
  const m = (differenceInMinutes(currentDateAtSixPM, now)) % 60
  const overtimeText = h > 0 ? `距离18:00下班还有${h}小时${m}分钟`  : ''

  const dayDis = differenceInDays(nextSaturday(now) , now)
  const weekendText = `距离周末还有${dayDis}天！`;

  // room?.say(`距离18:00下班还有${h}小时${m}分钟\n${getRandomFishText()}---摸鱼办!`)
  room?.say(`${overtimeText}\n${weekendText}\n${getRandomFishText()}---摸鱼办!`)
  
}



myb()

// const job = schedule.scheduleJob(rule, ()=> {})



const testRule = new schedule.RecurrenceRule()
testRule.minute = 30

// schedule.scheduleJob(testRule, ()=> {
//   console.log('每分钟执行');
  
// })

export {
  testRule,
}

