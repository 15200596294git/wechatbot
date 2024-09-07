// @ts-nocheck
import { WechatyBuilder, ScanStatus, log, Message } from 'wechaty'
import qrcodeTerminal from 'qrcode-terminal'
import { getResult } from '../request.ts'
import schedule from 'node-schedule'

import { holiday, overtime, drinkWater, waterText, fishText, workdayCountdown, orderText, drinkingText, reverseDrivingText, offWorkText } from '../general/moyu.ts'
import { moring, order, fish, groupSend, haoNoDrinking, haoNoReverseDriving, logout } from '../general/timer.ts'
import { isWithinInterval, startOfDay, endOfDay, getHours, set } from 'date-fns';

function onScan(qrcode, status) {
  if (status === ScanStatus.Waiting || status === ScanStatus.Timeout) {
    qrcodeTerminal.generate(qrcode, { small: true }) // show qrcode on console

    const qrcodeImageUrl = [
      'https://wechaty.js.org/qrcode/',
      encodeURIComponent(qrcode),
    ].join('')

    log.info(
      'StarterBot',
      'onScan: %s(%s) - %s',
      ScanStatus[status],
      status,
      qrcodeImageUrl
    )
  } else {
    log.info('StarterBot', 'onScan: %s(%s)', ScanStatus[status], status)
  }
}

function onLogin(user) {
  log.info('StarterBot', '%s login', user)

  moring(bot)
  fish(bot)
  order(bot)
  haoNoDrinking()
  haoNoReverseDriving()
  logout(bot)

}

function onLogout(user) {
  log.info('StarterBot', '%s logout', user)
}

async function onMessage(msg: Message) {
  // '收到消息'
  console.log("🚀 ~ onMessage ~ '收到消息':", '收到消息')
  const metionSelf = await msg.mentionSelf()
  const mentionText = await msg.mentionText()

  // const room = await bot?.Room?.find('ᑋᵉᑊᑊᵒ ᵕ̈ ²⁰²⁴')

  const talker = msg.talker()
  if (metionSelf) {
    if (mentionText.trim() === '') {
      await msg.say(`${talker.name()}, 请输入你要问的问题`)
      return
    } else if (mentionText === '摸鱼办') {

      // 获取当前时间
      const now = new Date();

      // 设置时间区间的开始和结束
      const startTime = set(now, { hours: 9, minutes: 0, seconds: 0 });
      const endTime = set(now, { hours: 18, minutes: 0, seconds: 0 });

      // 检查当前时间是否在 9 点到 18 点之间
      const isInWorkingHours = isWithinInterval(now, { start: startTime, end: endTime });
      if (!isInWorkingHours) {
        // groupSend(bot, `现在是下班时间，请上班时间再摸鱼哦！`)
        msg.say('现在是下班时间，请上班时间再摸鱼哦！')
      } else {

        const { hour, minute } = workdayCountdown()
        let text = [fishText(), waterText()].join('\n')
        if (hour < 4) {
          text += `\n距离18:00下班还有${hour}小时，${minute}分钟`
        }
        msg.say(text)
        // groupSend(bot, text)
      }
      return
    } else if (mentionText === '喝水办') {
      msg.say(waterText())
      // groupSend(bot, waterText())
      return
    } else if (mentionText === '假日办') {
      msg.say(await holiday())
      // groupSend(bot, await holiday())
      return
    } else if(mentionText === '豪哥酒驾') {
      msg.say('小蟹提醒豪哥:\n' + drinkingText())
      return 
    } else if(mentionText === '豪哥逆行') {
      msg.say('小蟹提醒豪哥:\n' + reverseDrivingText())
      return
    } else if(mentionText === '下班测试') {
      msg.say(await offWorkText())
      return
    }
    try {
      const result = await getResult(mentionText)
      msg.say(`${talker.name()}, ${result}`)
    } catch (error) {
      msg.say(`${error.message}`)
    }
  }
}

export function startBot(cb: (url: string)=> void) {


  const bot = WechatyBuilder.build({
    // name: 'ding-dong-bot',
    /**
     * How to set Wechaty Puppet Provider:
     *
     *  1. Specify a `puppet` option when instantiating Wechaty. (like `{ puppet: 'wechaty-puppet-padlocal' }`, see below)
     *  1. Set the `WECHATY_PUPPET` environment variable to the puppet NPM module name. (like `wechaty-puppet-padlocal`)
     *
     * You can use the following providers:
     *  - wechaty-puppet-wechat (no token required)
     *  - wechaty-puppet-padlocal (token required)
     *  - wechaty-puppet-service (token required, see: <https://wechaty.js.org/docs/puppet-services>)
     *  - etc. see: <https://github.com/wechaty/wechaty-puppet/wiki/Directory>
     */
    // puppet: 'wechaty-puppet-wechat4u',
  })
  
  bot.on('scan', (qrcode, status)=> {
    const qrcodeImageUrl = [
      'https://wechaty.js.org/qrcode/',
      encodeURIComponent(qrcode),
    ].join('')
    cb(qrcodeImageUrl)

    onScan(qrcode, status)
  })
  bot.on('login', onLogin)
  bot.on('logout', onLogout)
  bot.on('message', onMessage)
  
  bot
  .start()
  // .then(() => log.info('StarterBot', 'Starter Bot Started.'))
  // .catch((e) => log.error('StarterBot', e))
}

// startBot((url)=> {
//   console.log("🚀 ~ startBot ~ url:", url)
// })
