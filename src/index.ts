
// @ts-nocheck
import { WechatyBuilder, ScanStatus, log, Message } from 'wechaty'

import qrcodeTerminal from 'qrcode-terminal'

import { getResult } from './request.ts'

import { testRule, rule2 } from './jobs/moyu.js'
import schedule, {Job} from 'node-schedule'


// other

function onScan(qrcode, status) {
  if (status === ScanStatus.Waiting || status === ScanStatus.Timeout) {
    qrcodeTerminal.generate(qrcode, { small: true })  // show qrcode on console

    const qrcodeImageUrl = [
      'https://wechaty.js.org/qrcode/',
      encodeURIComponent(qrcode),
    ].join('')

    log.info('StarterBot', 'onScan: %s(%s) - %s', ScanStatus[status], status, qrcodeImageUrl)

  } else {
    log.info('StarterBot', 'onScan: %s(%s)', ScanStatus[status], status)
  }
}

let job1: Job
function onLogin(user) {
  log.info('StarterBot', '%s login', user)

  // 开启定时任务
  const job = schedule.scheduleJob(testRule, async () => {
    await bot.say('每小时发送一次')

    // const room = await bot.Room.find('ᑋᵉᑊᑊᵒ ᵕ̈ ²⁰²⁴')
    // room?.say('Hello world!')
  })

  // schedule.scheduleJob(rule2, async()=> {
  //   const room = await bot.Room.find('ᑋᵉᑊᑊᵒ ᵕ̈ ²⁰²⁴')
  //   room?.say(`早上好各位，我是你们的AI小助手！`)
  // })

  if(job1) job1.cancel()
  job1 = schedule.scheduleJob(rule2, async () => {
    const room = await bot.Room.find('叮叮咚咚')
    room?.say(`早上好各位，我是你们的AI小助手！`)
  })

}

function onLogout(user) {
  log.info('StarterBot', '%s logout', user)
}

async function onMessage(msg: Message) {
  // '收到消息'
  // log.info('StarterBot', msg.toString())
  console.log("🚀 ~ onMessage ~ '收到消息':", '收到消息')

  const metionSelf = await msg.mentionSelf()
  // console.log("🚀 ~ onMessage ~ metionSelf:", metionSelf)
  const mentionText = await msg.mentionText()
  // console.log("🚀 ~ onMessage ~ mentionText:", mentionText)

  const talker = msg.talker()
  if (metionSelf) {
    if (mentionText.trim() === '') {
      await msg.say(`${talker.name()}, 请输入你要问的问题`)
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

bot.start()
  .then(() => log.info('StarterBot', 'Starter Bot Started.'))
  .catch(e => log.error('StarterBot', e))