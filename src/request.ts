import fetch from "node-fetch";

export const getResult = async (ques: string) => {
  const url = "https://luckycola.com.cn/openai/openaiV3";

  const params = new URLSearchParams();
  params.append("ques", ques);
  params.append("appKey", "650c49ce03abd6bee56f640b");
  params.append("uid", "NmkklW1695304110026gZP7PgepBS");
  params.append("isLongChat", "1");

  const res = await fetch(url, {
    method: "post",
    body: params,
  });

  interface ResData {
    code: number
    msg: string
    data: {
        result: string
        count: string
        longChat: 0 | 1
    }
  }

  const json = await res.json() as ResData

  if(json.code !== 0) {
    return json.msg
  }

  return json.data.result
};

const APP_KEY = 'cc8cba0a7069'
export async function DailySentenceApi() {
  const url = `https://whyta.cn/api/tx/zaoan?key=${APP_KEY}`
  
  const res = await fetch(url)
  const resJson = await res.json()
  const content = resJson.result.content
  return content
}

export async function playboyQuotesApi() {
  const url = `https://whyta.cn/api/tx/zhanan?key=${APP_KEY}`
  
  const res = await fetch(url)
  const resJson = await res.json()
  const content = resJson.result.content
  return content
}

export async function simpDiaryApi() {
  const url = `https://whyta.cn/api/tx/tiangou?key=${APP_KEY}`
  
  const res = await fetch(url)
  const resJson = await res.json()
  const content = resJson.result.content
  return content
}

export async function lewdTalkApi() {
  const url = 'https://api.vvhan.com/api/text/sexy'
  const res = await fetch(url)
  const text  = await res.text()
  // console.log("🚀 ~ lewdTalkApi ~ res:", text)
  return text
}

export async function slackOffCalendarApi() {
  const url = 'https://api.vvhan.com/api/moyu?type=json'
  const res = await fetch(url)
  const resJson = await res.json()
  return resJson.url
}

export async function bonusWomanApi() {
  const url = 'https://api.vvhan.com/api/wallpaper/mobileGirl?type=json'
  const res = await fetch(url)
  const resJson = await res.json()
  return resJson.url
}