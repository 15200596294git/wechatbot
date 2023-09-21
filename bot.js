import { WechatyBuilder } from 'wechaty'

const wechaty = WechatyBuilder.build() // get a Wechaty instance

async function onMessage(message) {

  const contact = message.from()

  const mentionSelf = await message.mentionSelf() 

  // if(mentionSelf) {
  //   message.say(`你好${contact?.name()}`)
  // }

  message.say(`你好${contact?.name()}`)
}

wechaty
  .on('scan', (qrcode, status) => console.log(`Scan QR Code to login: ${status}\nhttps://wechaty.js.org/qrcode/${encodeURIComponent(qrcode)}`))
  .on('login',            user => console.log(`User ${user} logged in`))
  .on('message', onMessage)
wechaty.start()