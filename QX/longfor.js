const {
  AnError,
  isRequest,
  isJSBox,
  isSurge,
  isQuanX,
  isLoon,
  isNode,
  notify,
  write,
  read,
  get,
  post,
  time,
  done,
} = nobyda();

const token = `8a6548d3a11b4a2a876318ff60cd4a4d`;
const XLFDXRiskCaptchaToken = `undefined`;
const XLFDXRiskToken = `65193a59jKtBUjaLFMMxfL2s2Lsymhv5b98ajLY1`;
const Cookie = `SERVERID=e13b2eca6d4150ad68f7afa42be4d72b|1696758964|1696758962; _dx_app_d1a43734fc59aeae9f1562dbd70fdf54=65227cb4MRUZrjIlogdOc1aho1SvdpoczPBcg6b1; zg_d5bd8e6372844af9b43b8ce5bb74b787=%7B%22sid%22%3A%201696758963214%2C%22updated%22%3A%201696758964749%2C%22info%22%3A%201696556931207%2C%22superProperty%22%3A%20%22%7B%5C%22%E6%89%8B%E6%9C%BA%E5%8F%B7%5C%22%3A%20%5C%22157****2457%5C%22%2C%5C%22%E6%8C%87%E7%BA%B9%E8%AF%86%E5%88%AB%5C%22%3A%20%5C%2265227cb4lhRTQk32yowdrI9lclHHIkhvjQ6BCSm1%5C%22%2C%5C%22%E9%BE%99%E6%B0%91ID%5C%22%3A%20%5C%2233349690%5C%22%2C%5C%22%E7%94%A8%E6%88%B7%E7%B1%BB%E5%9E%8B%5C%22%3A%20%5C%22C1%5C%22%2C%5C%22%E6%B3%A8%E5%86%8C%E6%97%B6%E9%97%B4%5C%22%3A%20%5C%222021-02-28%2016%3A04%3A00%5C%22%2C%5C%22lmid%5C%22%3A%20%5C%2233349690%5C%22%2C%5C%22%E9%A1%B5%E9%9D%A2code%5C%22%3A%20%5C%2211111111111686241863606037740000%5C%22%2C%5C%22activity_no%5C%22%3A%20%5C%2211111111111686241863606037740000%5C%22%2C%5C%22storeName%5C%22%3A%20%5C%22%25E8%25A5%25BF%25E5%25AE%2589%25E5%25A4%25A7%25E5%2585%25B4%25E6%2598%259F%25E6%2582%25A6%25E8%258D%259F%5C%22%2C%5C%22channel%5C%22%3A%20%5C%22C2%5C%22%2C%5C%22buCode%5C%22%3A%20%5C%22C20400%5C%22%2C%5C%22ua%5C%22%3A%20%5C%22Mozilla%2F5.0%20(iPhone%3B%20CPU%20iPhone%20OS%2016_7%20like%20Mac%20OS%20X)%20AppleWebKit%2F605.1.15%20(KHTML%2C%20like%20Gecko)%20Mobile%2F15E148%20MicroMessenger%2F8.0.42(0x18002a2a)%20NetType%2FWIFI%20Language%2Fzh_CN%20miniProgram%2Fwx50282644351869da%5C%22%7D%22%2C%22platform%22%3A%20%22%7B%7D%22%2C%22utm%22%3A%20%22%7B%7D%22%2C%22referrerDomain%22%3A%20%22llt.longfor.com%22%2C%22landHref%22%3A%20%22https%3A%2F%2Flongzhu.longfor.com%2Flongball-homeh5%2F%23%2Fsign-in-prize%3FminiShare%3Dtrue%26activity_no%3D11111111111686241863606037740000%26lltsource%3Dc2lzgzh%26sessionId%3D8a6548d3a11b4a2a876318ff60cd4a4d%26openId%3DoAjtH4yj5f2jJvzWHA--ulN7NCBY%26storeName%3D%25E8%25A5%25BF%25E5%25AE%2589%25E5%25A4%25A7%25E5%2585%25B4%25E6%2598%259F%25E6%2582%25A6%25E8%258D%259F%26token%3D8a6548d3a11b4a2a876318ff60cd4a4d%26channel%3DC2%26buCode%3DC20400%22%2C%22cuid%22%3A%20%2233349690%22%2C%22zs%22%3A%200%2C%22sc%22%3A%200%2C%22firstScreen%22%3A%201696758963214%7D; _dx_uzZo5y=f31df9101411e0a5c416d662d7d6b1f6b3bbe33b8b5d5ed1ddc9d659e94d9b3ce145c631; zg_did=%7B%22did%22%3A%20%2218ad974a8c47ff-09dd71c6868d5c-24b245e-505c8-18ad974a8c5195e%22%7D; acw_tc=2760828016967589628262326e63cf36b010e0f5cfa3fcdfd1914a07c1bd50`;
const XGAIAAPIKEY = `c06753f1-3e68-437d-b592-b94656ea5517`;
const XLFUserToken = `8a6548d3a11b4a2a876318ff60cd4a4d`;
// 龙珠签到
(function Start() {
  const a = new Promise((resolve, rejects) => {
    LHSing(function (err, res, body) {
      const r = JSON.parse(body);
      if (r.code == '0000') {
        notify('龙珠签到', '', '签到成功');
      } else {
        notify('龙珠签到', '', '签到失败' + body);
      }
      resolve();
    });
  });
  const b = new Promise((resolve, rejects) => {
    LHHuaTi(function (err, res, body) {
      console.log(body);
      const r = JSON.parse(body);
      if (r.code == '0000') {
        notify('龙珠话题', '', '签到成功');
      } else {
        notify('龙珠话题', '', '签到失败' + body);
      }
      resolve();
    });
  });
  // const c = new Promise((resolve, rejects) => {
  //   LHzhuanpan(function (err, res, body) {
  //     console.log(body + '我是LHzhuanpan');
  //     resolve();
  //   });
  // });
  Promise.all([a, b]).then(() => {
    done();
  });
})();

function LHSing(cb) {
  const headers = {
    'Accept-Encoding': `gzip, deflate, br`,
    Host: `longzhu.longfor.com`,
    Origin: `https://longzhu.longfor.com`,
    'Sec-Fetch-Dest': `empty`,
    Connection: `keep-alive`,
    'Accept-Language': `zh-CN,zh-Hans;q=0.9`,
    'Sec-Fetch-Site': `same-origin`,
    'Content-Type': `application/json;charset=UTF-8`,
    'User-Agent': `Mozilla/5.0 (iPhone; CPU iPhone OS 16_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.42(0x18002a29) NetType/WIFI Language/zh_CN miniProgram/wx50282644351869da`,
    'X-LF-DXRisk-Source': `5`,
    Referer: `https://longzhu.longfor.com/longball-homeh5/`,
    Accept: `application/json, text/plain, */*`,
    'X-LF-Bu-Code': `C20400`,
    'X-LF-Channel': `C2`,
    'Sec-Fetch-Mode': `cors`,
    token: token,
    'X-LF-DXRisk-Captcha-Token': XLFDXRiskCaptchaToken,
    'X-LF-DXRisk-Token': XLFDXRiskToken,
    Cookie: Cookie,
    'X-GAIA-API-KEY': XGAIAAPIKEY,
    'X-LF-UserToken': XLFUserToken,
  };
  const url = `https://longzhu.longfor.com/proxy/lmarketing-task-api-mvc-prod/openapi/task/v1/signature/clock`;
  const method = `POST`;
  const body = `{"activity_no":"11111111111686241863606037740000"}`;
  const myRequest = {
    url: url,
    method: method,
    headers: headers,
    body: body,
  };
  post(myRequest, cb);
}
function LHHuaTi(cb) {
  // 两个日期字符串
  const dateString1 = '2023-10-5';
  // 创建一个表示当前日期的 Date 对象
  const currentDate = new Date();
  const dateString2 = `${currentDate.getFullYear()}-${
    currentDate.getMonth() + 1
  }-${currentDate.getDate()}`;
  // 计算两个日期相差几天
  function DateDiff(date1, date2) {
    // date1 和 date2 是 2016-06-18 格式
    let strDate, oDate1, oDate2, result;
    strDate = date1.split('-');
    oDate1 = new Date(strDate[1] + '/' + strDate[2] + '/' + strDate[0]);
    strDate = date2.split('-');
    oDate2 = new Date(strDate[1] + '/' + strDate[2] + '/' + strDate[0]);
    result = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24); // 把相差的毫秒數轉換為天數
    return result;
  }
  let DayTime = DateDiff(dateString1, dateString2);
  let numid = 8153 + DayTime;
  console.log(DayTime, numid);
  const time = Math.round(new Date().getTime() / 1000).toString();
  const url = `https://longzhu.longfor.com/proxy/lmarketing-task-api-prod/openapi/task/v1/information/list?task_id=${numid}`;
  const method = `GET`;
  const body = ``;
  const headers = {
    'X-LF-Channel': `C3`,
    'User-Agent': `Mozilla/5.0 (iPhone; CPU iPhone OS 16_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.42(0x18002a2a) NetType/4G Language/zh_CN miniProgram/wx1c1c8c073e2be1fc`,
    'X-LF-Bu-Code': `C30403`,
    Cookie: `SERVERID=f3c7e85ec13830172979a766a029921a|${time}|${time}; zg_d5bd8e6372844af9b43b8ce5bb74b787=%7B%22sid%22%3A%201696745480962%2C%22updated%22%3A%201696747166884%2C%22info%22%3A%201696556931207%2C%22superProperty%22%3A%20%22%7B%7D%22%2C%22platform%22%3A%20%22%7B%7D%22%2C%22utm%22%3A%20%22%7B%7D%22%2C%22referrerDomain%22%3A%20%22%22%2C%22landHref%22%3A%20%22https%3A%2F%2Flongzhu.longfor.com%2Flongball-homeh5%2F%23%2Finformation%2F%3Ftask_id%3D8156%26channel%3DC3%26buCode%3DC30403%26miniShare%3Dfalse%26sessionId%3D6c6a1e9f12774593b0aafde8fc745fcf%26token%3D6c6a1e9f12774593b0aafde8fc745fcf%26GyVersion%3D4.9.0%26GyUnionid%3DoxlmWwjro73zgBpjKMrNmyX4MJgY%26GyUserId%3D3252920%26GyPhone%3D15709242457%26GyLmId%3D33349690%26GyVirtualPhone%3D%26GyNewMember%3D0%22%2C%22cuid%22%3A%20%2233349690%22%2C%22zs%22%3A%200%2C%22sc%22%3A%200%2C%22firstScreen%22%3A%201696745480962%7D; zg_did=%7B%22did%22%3A%20%2218ad974a8c47ff-09dd71c6868d5c-24b245e-505c8-18ad974a8c5195e%22%7D; _dx_app_d1a43734fc59aeae9f1562dbd70fdf54=65224e72pxWGfGnzSufB38rqRBgrmKrmJbjkd0g1; _dx_uzZo5y=f31df9101411e0a5c416d662d7d6b1f6b3bbe33b8b5d5ed1ddc9d659e94d9b3ce145c631; acw_tc=2760826216967454807618376e0f1f870489907024aa0251c4ea21b84fddee`,
    'X-GAIA-API-KEY': `caed5282-9019-418d-8854-3c34d02e0b4e`,
    'X-LF-UserToken': `1a0587235081406c9bf67ee3b061b111`,
  };
  const myRequest = {
    url: url,
    method: method,
    headers: headers,
    body: body,
  };
  get(myRequest, function (err, res, body) {
    let a = JSON.parse(body);
    if (a.code == '0000') {
      const url1 = `https://longzhu.longfor.com/proxy/lmarketing-task-api-prod/openapi/task/v1/information/user`;
      const method1 = `POST`;
      const body1 = {
        token: '8fe450bf5a2a4384a188177d4e7d901a',
        channel: 'C3',
        bu_code: 'C30403',
        task_id: numid,
        item_id: a.data.information[0].item_id,
        item_content: '{"user_answer":[0,1,0]}',
      };
      const headers1 = {
        Host: `longzhu.longfor.com`,
        Origin: `https://longzhu.longfor.com`,
        'X-LF-DXRisk-Token': `651a7e03MkfzK7b6bxlegAd6lchZxVrGJqi6OlN1`,
        'Content-Type': `application/json;charset=UTF-8`,
        'X-LF-DXRisk-Source': `5`,
        Referer: `https://longzhu.longfor.com/longball-homeh5/`,
        'X-LF-DXRisk-Captcha-Token': ``,
        'X-LF-Bu-Code': `C30403`,
        'EagleEye-TraceID': `a5ed03a265cb44e68c7a53aa0f9c1738`,
        'Sec-Fetch-Mode': `cors`,
        'X-LF-Channel': `C3`,
        'User-Agent': `Mozilla/5.0 (iPhone; CPU iPhone OS 16_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.42(0x18002a2a) NetType/4G Language/zh_CN miniProgram/wx1c1c8c073e2be1fc`,
        'X-LF-Bu-Code': `C30403`,
        Cookie: `SERVERID=f3c7e85ec13830172979a766a029921a|${time}|${time}; zg_d5bd8e6372844af9b43b8ce5bb74b787=%7B%22sid%22%3A%201696745480962%2C%22updated%22%3A%201696747166884%2C%22info%22%3A%201696556931207%2C%22superProperty%22%3A%20%22%7B%7D%22%2C%22platform%22%3A%20%22%7B%7D%22%2C%22utm%22%3A%20%22%7B%7D%22%2C%22referrerDomain%22%3A%20%22%22%2C%22landHref%22%3A%20%22https%3A%2F%2Flongzhu.longfor.com%2Flongball-homeh5%2F%23%2Finformation%2F%3Ftask_id%3D8156%26channel%3DC3%26buCode%3DC30403%26miniShare%3Dfalse%26sessionId%3D6c6a1e9f12774593b0aafde8fc745fcf%26token%3D6c6a1e9f12774593b0aafde8fc745fcf%26GyVersion%3D4.9.0%26GyUnionid%3DoxlmWwjro73zgBpjKMrNmyX4MJgY%26GyUserId%3D3252920%26GyPhone%3D15709242457%26GyLmId%3D33349690%26GyVirtualPhone%3D%26GyNewMember%3D0%22%2C%22cuid%22%3A%20%2233349690%22%2C%22zs%22%3A%200%2C%22sc%22%3A%200%2C%22firstScreen%22%3A%201696745480962%7D; zg_did=%7B%22did%22%3A%20%2218ad974a8c47ff-09dd71c6868d5c-24b245e-505c8-18ad974a8c5195e%22%7D; _dx_app_d1a43734fc59aeae9f1562dbd70fdf54=65224e72pxWGfGnzSufB38rqRBgrmKrmJbjkd0g1; _dx_uzZo5y=f31df9101411e0a5c416d662d7d6b1f6b3bbe33b8b5d5ed1ddc9d659e94d9b3ce145c631; acw_tc=2760826216967454807618376e0f1f870489907024aa0251c4ea21b84fddee`,
        'X-GAIA-API-KEY': `caed5282-9019-418d-8854-3c34d02e0b4e`,
        'X-LF-UserToken': `1a0587235081406c9bf67ee3b061b111`,
      };
      const myRequest1 = {
        url: url1,
        method: method1,
        headers: headers1,
        body: JSON.stringify(body1),
      };
      post(myRequest1, cb);
    } else {
      notify('龙珠话题', '', '获取话题失败' + body);
      done();
    }
  });
}

function LHzhuanpan(cb) {
  const url = `https://openapi.longfor.com/llt-gateway-prod/api/v1/activity/auth/lottery/sign`;
  const method = `OPTIONS`;
  const headers = {
    'Access-Control-Request-Method': `POST`,
    Origin: `https://llt.longfor.com`,
    'User-Agent': `Mozilla/5.0 (iPhone; CPU iPhone OS 16_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.42(0x18002a2a) NetType/4G Language/zh_CN miniProgram/wx50282644351869da`,
    'Access-Control-Request-Headers': `authtoken,bucode,channel,content-type,x-gaia-api-key,x-lf-dxrisk-source,x-lf-dxrisk-token`,
    'Sec-Fetch-Mode': `cors`,
    Referer: `https://llt.longfor.com/`,
    Host: `openapi.longfor.com`,
    'Accept-Language': `zh-CN,zh-Hans;q=0.9`,
    Accept: `*/*`,
  };
  const body = ``;
  const myRequest = {
    url: url,
    method: method,
    headers: headers,
    body: body,
  };
  get(myRequest, function () {
    const url1 = `https://openapi.longfor.com/llt-gateway-prod/api/v1/activity/auth/lottery/sign`;
    const method1 = `POST`;
    const headers1 = {
      'Accept-Encoding': `gzip, deflate, br`,
      bucode: `C20400`,
      Host: `openapi.longfor.com`,
      Origin: `https://llt.longfor.com`,
      'Sec-Fetch-Dest': `empty`,
      Connection: `keep-alive`,
      channel: `C2`,
      'Sec-Fetch-Site': `same-site`,
      'User-Agent': `Mozilla/5.0 (iPhone; CPU iPhone OS 16_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.42(0x18002a2a) NetType/4G Language/zh_CN miniProgram/wx50282644351869da`,
      'Content-Type': `application/json`,
      Referer: `https://llt.longfor.com/`,
      'X-LF-DXRisk-Source': `5`,
      'Accept-Language': `zh-CN,zh-Hans;q=0.9`,
      Accept: `application/json, text/plain, */*`,
      authtoken: `36c59a03d09143fc9cab7fecee53a1fb`,
      'Sec-Fetch-Mode': `cors`,
      'X-LF-DXRisk-Token': XLFDXRiskToken,
      Cookie: Cookie,
      'x-gaia-api-key': XGAIAAPIKEY,
      'X-LF-UserToken': XLFUserToken,
    };
    const body1 = `{"component_no":"CE16H35W57Q2FAPV","activity_no":"AP232091D6WUVCH1"}`;
    const myRequest1 = {
      url: url1,
      method: method1,
      headers: headers1,
      body: body1,
    };
    post(myRequest1, cb);
  });
}

function nobyda() {
  const start = Date.now();
  // 判断是否是重写
  const isRequest = typeof $request != 'undefined';
  // 判断是否是Surge
  const isSurge = typeof $httpClient != 'undefined';
  // 判断是否是QuanX
  const isQuanX = typeof $task != 'undefined';
  // 判断是否是Loon
  const isLoon = typeof $loon != 'undefined';
  // 判断是否是JSBox
  const isJSBox = typeof $app != 'undefined' && typeof $http != 'undefined';
  // 判断是否是Node环境
  const isNode = typeof require == 'function' && !isJSBox;
  const NodeSet = 'CookieSet.json';
  /**
   * 引入Nodejs中的request模块和fs模块
   * @type {{request: *, fs: module:fs}|null}
   */
  const node = (() => {
    if (isNode) {
      const request = require('request');
      const fs = require('fs');
      return {
        request,
        fs,
      };
    } else {
      return null;
    }
  })();
  /**
   * 提示信息
   * @param {string} title 标题
   * @param {string} subtitle 副标题
   * @param {string} message 提示信息
   * @param {*} rawopts 设置
   */
  const notify = (title, subtitle, message, rawopts) => {
    const Opts = (rawopts) => {
      //Modified from https://github.com/chavyleung/scripts/blob/master/Env.js
      if (!rawopts) return rawopts;
      switch (typeof rawopts) {
        case 'string':
          return isLoon
            ? rawopts
            : isQuanX
            ? {
                'open-url': rawopts,
              }
            : isSurge
            ? {
                url: rawopts,
              }
            : undefined;
        case 'object':
          if (isLoon) {
            let openUrl = rawopts.openUrl || rawopts.url || rawopts['open-url'];
            let mediaUrl = rawopts.mediaUrl || rawopts['media-url'];
            return {
              openUrl,
              mediaUrl,
            };
          } else if (isQuanX) {
            let openUrl = rawopts['open-url'] || rawopts.url || rawopts.openUrl;
            let mediaUrl = rawopts['media-url'] || rawopts.mediaUrl;
            return {
              'open-url': openUrl,
              'media-url': mediaUrl,
            };
          } else if (isSurge) {
            let openUrl = rawopts.url || rawopts.openUrl || rawopts['open-url'];
            return {
              url: openUrl,
            };
          }
          break;
        default:
          return undefined;
      }
    };
    console.log(`${title}\n${subtitle}\n${message}`);
    if (isQuanX) $notify(title, subtitle, message, Opts(rawopts));
    if (isSurge) $notification.post(title, subtitle, message, Opts(rawopts));
    if (isJSBox)
      $push.schedule({
        title: title,
        body: subtitle ? subtitle + '\n' + message : message,
      });
  };
  // 将获得的cookies信息储存起来
  const write = (value, key) => {
    if (isQuanX) return $prefs.setValueForKey(value, key);
    if (isSurge) return $persistentStore.write(value, key);
    if (isNode) {
      try {
        if (!node.fs.existsSync(NodeSet))
          node.fs.writeFileSync(NodeSet, JSON.stringify({}));
        const dataValue = JSON.parse(node.fs.readFileSync(NodeSet));
        if (value) dataValue[key] = value;
        if (!value) delete dataValue[key];
        return node.fs.writeFileSync(NodeSet, JSON.stringify(dataValue));
      } catch (er) {
        return AnError('Node.js持久化写入', null, er);
      }
    }
    if (isJSBox) {
      if (!value) return $file.delete(`shared://${key}.txt`);
      return $file.write({
        data: $data({
          string: value,
        }),
        path: `shared://${key}.txt`,
      });
    }
  };
  // 将获取的cookies信息读出来
  const read = (key) => {
    if (isQuanX) return $prefs.valueForKey(key);
    if (isSurge) return $persistentStore.read(key);
    if (isNode) {
      try {
        if (!node.fs.existsSync(NodeSet)) return null;
        const dataValue = JSON.parse(node.fs.readFileSync(NodeSet));
        return dataValue[key];
      } catch (er) {
        return AnError('Node.js持久化读取', null, er);
      }
    }
    if (isJSBox) {
      if (!$file.exists(`shared://${key}.txt`)) return null;
      return $file.read(`shared://${key}.txt`).string;
    }
  };
  const adapterStatus = (response) => {
    if (response) {
      if (response.status) {
        response['statusCode'] = response.status;
      } else if (response.statusCode) {
        response['status'] = response.statusCode;
      }
    }
    return response;
  };
  // get请求
  const get = (options, callback) => {
    if (isQuanX) {
      $task.fetch(options).then(
        (response) => {
          callback(null, adapterStatus(response), response.body);
        },
        (reason) => callback(reason.error, null, null)
      );
    }
    if (isSurge) {
      options.headers['X-Surge-Skip-Scripting'] = false;
      $httpClient.get(options, (error, response, body) => {
        callback(error, adapterStatus(response), body);
      });
    }
    if (isNode) {
      node.request(options, (error, response, body) => {
        callback(error, adapterStatus(response), body);
      });
    }
    if (isJSBox) {
      if (typeof options == 'string')
        options = {
          url: options,
        };
      options['header'] = options['headers'];
      options['handler'] = function (resp) {
        let error = resp.error;
        if (error) error = JSON.stringify(resp.error);
        let body = resp.data;
        if (typeof body == 'object') body = JSON.stringify(resp.data);
        callback(error, adapterStatus(resp.response), body);
      };
      $http.get(options);
    }
  };
  // post请求
  const post = (options, callback) => {
    if (isQuanX) {
      $task.fetch(options).then(
        (response) => {
          callback(null, adapterStatus(response), response.body);
        },
        (reason) => callback(reason.error, null, null)
      );
    }
    if (isSurge) {
      options.headers['X-Surge-Skip-Scripting'] = false;
      $httpClient.post(options, (error, response, body) => {
        callback(error, adapterStatus(response), body);
      });
    }
    if (isNode) {
      node.request.post(options, (error, response, body) => {
        callback(error, adapterStatus(response), body);
      });
    }
    if (isJSBox) {
      if (typeof options == 'string')
        options = {
          url: options,
        };
      options['header'] = options['headers'];
      options['handler'] = function (resp) {
        let error = resp.error;
        if (error) error = JSON.stringify(resp.error);
        let body = resp.data;
        if (typeof body == 'object') body = JSON.stringify(resp.data);
        callback(error, adapterStatus(resp.response), body);
      };
      $http.post(options);
    }
  };
  // 异常信息
  const AnError = (name, keyname, er, resp, body) => {
    if (typeof merge != 'undefined' && keyname) {
      if (!merge[keyname].notify) {
        merge[keyname].notify = `${name}: 异常, 已输出日志 ‼️`;
      } else {
        merge[keyname].notify += `\n${name}: 异常, 已输出日志 ‼️ (2)`;
      }
      merge[keyname].error = 1;
    }
    return console.log(
      `\n‼️${name}发生错误\n‼️名称: ${er.name}\n‼️描述: ${er.message}${
        JSON.stringify(er).match(/"line"/)
          ? `\n‼️行列: ${JSON.stringify(er)}`
          : ``
      }${resp && resp.status ? `\n‼️状态: ${resp.status}` : ``}${
        body ? `\n‼️响应: ${resp && resp.status != 503 ? body : `Omit.`}` : ``
      }`
    );
  };
  // 总共用时
  const time = () => {
    const end = ((Date.now() - start) / 1000).toFixed(2);
    return console.log('\n签到用时: ' + end + ' 秒');
  };
  // 关闭请求
  const done = (value = {}) => {
    if (isQuanX) return $done(value);
    if (isSurge) isRequest ? $done(value) : $done();
  };
  return {
    AnError,
    isRequest,
    isJSBox,
    isSurge,
    isQuanX,
    isLoon,
    isNode,
    notify,
    write,
    read,
    get,
    post,
    time,
    done,
  };
}
