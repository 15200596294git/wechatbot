import axios from 'axios';
const apiKey = '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';
// const openai = new OpenAI({
//   apiKey: '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', // defaults to process.env["OPENAI_API_KEY"]
// });
async function main() {
    // const chatCompletion = await openai.chat.completions.create({
    //   messages: [{ role: 'user', content: 'Say this is a test' }],
    //   model: 'gpt-3.5-turbo',
    // });
    // console.log(chatCompletion.choices);
    // 'https://api.openai.com/v1/chat/completions',
    const res = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: '下午好' }],
        temperature: 0.7,
    }, {
        headers: {
            // "Content-Type": "",
            Authorization: `Bearer ${apiKey}`
        },
        // proxy: {
        //   protocol: 'http',
        //   host: '127.0.0.1',
        //   port: 33210,
        // }
    });
    console.log(res.data.data);
}
main();
