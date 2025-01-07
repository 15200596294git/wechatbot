// 定义定时任务
import schedule, { Job } from 'node-schedule'

import { workdayCountdown, morningText, fishText, waterText, orderText, drinkingText, reverseDrivingText, offWorkText } from './moyu.ts'
import { Wechaty } from 'wechaty'
import { WECHAT_GROUPS } from '../config/global.ts'

function groupsAssiatant(groups: typeof WECHAT_GROUPS) {
  return function(bot: Wechaty, text: string) {
    Object.entries(groups).forEach(([_, groupName])=> {
      bot.Room.find(groupName)
      .then(room=> room?.say(text))
    })
  }
}

export const groupSend = groupsAssiatant(WECHAT_GROUPS)

// 早上好,每天早上9:00
export function moring(bot: Wechaty) {
  schedule.scheduleJob('0 9 * * 1-5', async () => {
    
    groupSend(bot, morningText())

  })
}

// 喝水,摸鱼文案,下班倒计时
export function fish(bot: Wechaty) {
  schedule.scheduleJob('*/30 9-11,14-17 * * 1-5', () => {

    const { hour, minute } = workdayCountdown()

    let text = [fishText(),waterText()].join('\n')
    if(hour < 4) {
      text += `\n距离18:00下班还有${hour}小时，${minute}分钟`
    }

    groupSend(bot, text)

  })
}

// 拉屎

// 点外卖, 11-11.30，每10分钟提醒一次
export function order(bot: Wechaty) {
  let job:Job
  const startJob = ()=> {
    job = schedule.scheduleJob('*/10 11 * * 1-5', ()=> {
      groupSend(bot, orderText())
    })
  }
  const stopJob = ()=> {
    job.cancel()
  }


  schedule.scheduleJob('0 11 * * *', ()=> {
    startJob()
  })

  schedule.scheduleJob('30 11 * * *', ()=> {
    stopJob()
  })
}

// 下班
export function getOffWork(bot: Wechaty) {
  schedule.scheduleJob('0 18 * * 1-5', async () => {
    groupSend(bot, offWorkText())
  })
}

// 不要逆行
export function haoNoDrinking(bot: Wechaty) {
  schedule.scheduleJob('0 18 * * 1-5', ()=> {
    bot.Room.find(WECHAT_GROUPS.faimly)
    .then(room=> room?.say('小蟹提醒豪哥:/n' + drinkingText()))
  })
}

// 不要酒驾
export function haoNoReverseDriving(bot:Wechaty) {
  schedule.scheduleJob('0 18 * * 1-5', ()=> {
    bot.Room.find(WECHAT_GROUPS.faimly)
    .then(room=> room?.say('小蟹提醒豪哥:/n' + reverseDrivingText()))
  })
}

// 每天晚上12点注销机器人
export async function logout(bot: Wechaty) {
  // schedule.scheduleJob('0 0 * * *', ()=> {
  //   bot.logout()
  // })
}

// 心跳，每5分钟发送一次消息
export function ping(bot:Wechaty) {
  schedule.scheduleJob('*/5 * * * *', async()=> {
    const targetContact = await bot.Contact.find({ name: 'hustle' })

    if (targetContact) {
      // 发送消息
      await targetContact.say('ping！')
      console.log('消息已发送！')
    } else {
      console.log('未找到目标联系人')
    }
  })
}