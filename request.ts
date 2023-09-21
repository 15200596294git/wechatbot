import fetch from "node-fetch";

export const getResult = async (ques) => {
  const url = "https://luckycola.com.cn/ai/openwxyy";

  const params = new URLSearchParams();
  params.append("ques", ques);
  params.append("appKey", "178Jc6xNi1wa021695304110026nPbfNh9pi3");
  params.append("uid", "NmkklW1695304110026gZP7PgepBS");
  params.append("isLongChat", "0");

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

console.log(await getResult('你好'));
