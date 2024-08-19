// 定义定时任务
import schedule, { Job } from 'node-schedule'

import { MORNING_MESSAGES, FISH_MESSAGES, WATER_MESSAGES, ORDER_MESSAGES } from './constant'
import { createRandomSelector } from '../utils/common.ts'
import { workdayCountdown } from './moyu'
import { Wechaty } from 'wechaty'
import { WECHAT_GROUPS } from '../config/global'

// 早上好,每天早上9:00
export function moring(bot: Wechaty) {
  schedule.scheduleJob('0 9 * * *', async () => {
    const sayMorning = createRandomSelector(MORNING_MESSAGES)
    const text = sayMorning()

    WECHAT_GROUPS.forEach(async (groupName) => {
      const room = await bot.Room.find(groupName)
      await room?.say(text)
    })

  })
}

// 喝水,摸鱼文案,下班倒计时
export function fish(bot: Wechaty) {
  schedule.scheduleJob('30 9-11,14-17/1 * * *', () => {
    const fish = createRandomSelector(FISH_MESSAGES)
    const water = createRandomSelector(WATER_MESSAGES)
    const { hour, minute } = workdayCountdown()

    let text = [fish,water].join('\n')
    if(hour < 4) {
      text += `\n距离18:00下班还有${hour}小时，${minute}分钟`
    }

    WECHAT_GROUPS.forEach(async (groupName) => {
      const room = await bot.Room.find(groupName)
      await room?.say(text)
    })
  })
}

// 拉屎

// 点外卖, 11-11.30，每10分钟提醒一次
export function order(bot: Wechaty) {
  let job:Job
  const startJob = ()=> {
    job = schedule.scheduleJob('*/10 11 * * *', ()=> {
      const o = createRandomSelector(ORDER_MESSAGES)
      const text = o()
  
      WECHAT_GROUPS.forEach(async (groupName) => {
        const room = await bot.Room.find(groupName)
        await room?.say(text)
      })
  
    })
  }
  const stopJob = ()=> {
    job.cancel()
  }


  schedule.scheduleJob('0 11 * * *', ()=> {
    startJob()
  })

  schedule.scheduleJob('30 11 * * *', ()=> {
    stopJob
  })


}

// 睡觉

// 起床干活

// 17:30-18:00 每10分钟提醒