import fetch from "node-fetch";
export const getResult = async (ques) => {
    const url = "https://luckycola.com.cn/ai/openwxyy";
    const params = new URLSearchParams();
    params.append("ques", ques);
    params.append("appKey", "650c49ce03abd6bee56f640b");
    params.append("uid", "NmkklW1695304110026gZP7PgepBS");
    params.append("isLongChat", "1");
    const res = await fetch(url, {
        method: "post",
        body: params,
    });
    const json = await res.json();
    console.log(JSON.stringify(json));
    if (json.code !== 0) {
        return json.msg;
    }
    return json.data.result;
};
// console.log(await getResult('早上好'));
