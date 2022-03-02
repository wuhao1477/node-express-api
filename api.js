import request from "request";
var cookie;

export async function main(kuaidi_number) {
  let token = await getToken(kuaidi_number); //token可以多次使用的，但这里就不写多次使用了避免特殊情况发生
  console.log("获取的token为：" + token, "要查询的订单号为：" + kuaidi_number);
  let data = await kuaidi(token, kuaidi_number);
  console.log(data);
  return data;
}
//获取token和cookie的值
export function getToken(kuaidi_number) {
  return new Promise((resolve) => {
    let opts = {
      url: "https://www.baidu.com/s?wd=" + kuaidi_number,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36",
      },
    };
    request.get(opts, (_e, b, d) => {
      cookie = b.headers["set-cookie"].toString(); //获取传回来的cookie值
      let checkUrl = d.substring(d.indexOf("checkUrl")); //截取字符串获取tokenv2的值
      checkUrl = checkUrl.substring(
        checkUrl.indexOf("tokenV2=") + 8,
        checkUrl.indexOf('",')
      );
      resolve(checkUrl);
    });
  });
}

//请求快递数据
export function kuaidi(token, kuaidi_number) {
  return new Promise((resolve) => {
    let opts = {
      url:
        "https://express.baidu.com/express/api/express?tokenV2=" +
        token +
        "&nu=" +
        kuaidi_number,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36",
        Connection: "keep-alive",
        Cookie: cookie,
      },
    };
    request.get(opts, (_e, _d, b) => {
      resolve(JSON.parse(b));
    });
  });
}
