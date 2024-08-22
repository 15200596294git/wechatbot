// 定义定时任务
import schedule, { Job } from 'node-schedule'

import { workdayCountdown, morningText, fishText, waterText, orderText } from './moyu.js'
import { Wechaty } from 'wechaty'
import { WECHAT_GROUPS } from '../config/global.js'

function groupsAssiatant(groups:string[]) {
  return function(bot: Wechaty, text: string) {
    groups.forEach((groupName)=> {
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
  schedule.scheduleJob('30 9-11,14-17/1 * * 1-5', () => {

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