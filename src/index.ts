// @ts-nocheck
import { WechatyBuilder, ScanStatus, log, Message } from 'wechaty'

import qrcodeTerminal from 'qrcode-terminal'

import { getResult } from './request.ts'

import { fish, holiday, overtime, drinkWater } from './jobs/moyu.js'
import schedule from 'node-schedule'

// other

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

  // 测试群 叮叮咚咚
  // ᑋᵉᑊᑊᵒ ᵕ̈ ²⁰²⁴


  // 摸鱼+下班提醒 1小时一次， 12:00-14:00不提醒
  schedule.scheduleJob('0 0 9-12,14-18 * * ?', async() => {
    const room = await bot?.Room?.find('ᑋᵉᑊᑊᵒ ᵕ̈ ²⁰²⁴')
    let texts = await Promise.all([fish(), overtime()])
    room?.say(texts.join(''))
  })

  // 喝水提醒30分钟一次，12:00-14:00不提醒
  schedule.scheduleJob('0 0/30 9-12,14-18 * * ?', async() => {
    const room = await bot?.Room?.find('ᑋᵉᑊᑊᵒ ᵕ̈ ²⁰²⁴')
    let texts = await Promise.all([drinkWater()])
    room?.say(texts.join(''))
  })
}

function onLogout(user) {
  log.info('StarterBot', '%s logout', user)
}

async function onMessage(msg: Message) {
  // '收到消息'
  console.log("🚀 ~ onMessage ~ '收到消息':", '收到消息')
  const metionSelf = await msg.mentionSelf()
  const mentionText = await msg.mentionText()

  // 测试群 叮叮咚咚
  // ᑋᵉᑊᑊᵒ ᵕ̈ ²⁰²⁴
  const room = await bot?.Room?.find('ᑋᵉᑊᑊᵒ ᵕ̈ ²⁰²⁴')

  const talker = msg.talker()
  if (metionSelf) {
    if (mentionText.trim() === '') {
      await msg.say(`${talker.name()}, 请输入你要问的问题`)
      return
    } else if (mentionText === '摸鱼办') {
      let texts = await Promise.all([fish(), overtime()])
      texts = texts.filter((t) => t !== '已下班!\n')
      if (!texts.length) {
        room?.say(`现在是下班时间，请上班时间再摸鱼哦！`)
      } else {
        room?.say(texts.join(''))
      }
      return
    } else if (mentionText === '喝水办') {
      room?.say(await drinkWater())
      return
    } else if (mentionText === '假日办') {
      room?.say(await holiday())
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

const bot = WechatyBuilder.build({
  name: 'ding-dong-bot',
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
  // puppet: 'wechaty-puppet-wechat',
})

bot.on('scan', onScan)
bot.on('login', onLogin)
bot.on('logout', onLogout)
bot.on('message', onMessage)

bot
  .start()
  .then(() => log.info('StarterBot', 'Starter Bot Started.'))
  .catch((e) => log.error('StarterBot', e))
