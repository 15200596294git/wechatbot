import { WechatyBuilder } from 'wechaty';
import { getResult } from './request.js';
const wechaty = WechatyBuilder.build(); // get a Wechaty instance
console.log('日志');
async function onMessage(message) {
    const contact = message.talker();
    let text = message.text();
    const room = message.room();
    const messionText = await message.mentionText();
    console.log('messionText', messionText);
    // console.log('messionText', text)
    const mentionSelf = await message.mentionSelf();
    if (mentionSelf && room) {
        // 获取艾特我的人
        const messionMeOfContact = (await room.alias(contact)) || contact.name();
        if (!messionText.trim()) {
            message.say(`${messionMeOfContact} 请输入你想要问的问题`);
            return;
        }
        console.log('发送的 messionText', messionText);
        const ret = await getResult(messionText);
        message.say(`${messionMeOfContact} ${ret}`);
    }
}
wechaty
    .on('scan', (qrcode, status) => console.log(`Scan QR Code to login: ${status}\nhttps://wechaty.js.org/qrcode/${encodeURIComponent(qrcode)}`))
    .on('login', (user) => console.log(`User ${user} logged in`))
    .on('message', onMessage);
wechaty.start();
