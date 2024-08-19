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

