import { WechatyBuilder, Message } from 'wechaty'

import { getResult } from './request.ts'

const wechaty = WechatyBuilder.build() // get a Wechaty instance

async function onMessage(message: Message) {

  const contact = message.talker()

  const text = message.text()

  const mentionSelf = await message.mentionSelf()

  if(mentionSelf) {
    // message.say(`你好${contact?.name()}`)
    message.say(await getResult(text))
  }

}

wechaty
  .on('scan', (qrcode, status) => console.log(`Scan QR Code to login: ${status}\nhttps://wechaty.js.org/qrcode/${encodeURIComponent(qrcode)}`))
  .on('login',            user => console.log(`User ${user} logged in`))
  .on('message', onMessage)
wechaty.start()