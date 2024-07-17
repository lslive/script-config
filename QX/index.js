/**
 * 工具类
 * @return {{read: ((function(*=): (*|null|undefined))|*), isRequest: boolean, isLoon: boolean, isQuanX: boolean, isNode: boolean, done: ((function(*=): (*|undefined))|*), notify: notify, isSurge: boolean, post: post, AnError: (function(*, *=, *=, *=, *): void), get: get, time: (function(): void), isJSBox: boolean, write: ((function(*=, *=): (*|undefined))|*)}}
 */
function Env() {
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
    options.headers['User-Agent'] =
      'JD4iPhone/167169 (iPhone; iOS 13.4.1; Scale/3.00)';
    if (isQuanX) {
      if (typeof options == 'string')
        options = {
          url: options,
        };
      options['method'] = 'GET';
      //options["opts"] = {
      //  "hints": false
      //}
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
    options.headers['User-Agent'] =
      'JD4iPhone/167169 (iPhone; iOS 13.4.1; Scale/3.00)';
    if (options.body)
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    if (isQuanX) {
      if (typeof options == 'string')
        options = {
          url: options,
        };
      options['method'] = 'POST';
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



var _0xodf='jsjiami.com.v6',_0xodf_=function(){return['_0xodf'],_0x2a00=[_0xodf,'\x6e\x6f\x77','\x75\x6e\x64\x65\x66\x69\x6e\x65\x64','\x66\x75\x6e\x63\x74\x69\x6f\x6e','\x43\x6f\x6f\x6b\x69\x65\x53\x65\x74\x2e\x6a\x73\x6f\x6e','\x72\x65\x71\x75\x65\x73\x74','\x73\x74\x72\x69\x6e\x67','\x6f\x62\x6a\x65\x63\x74','\x6f\x70\x65\x6e\x55\x72\x6c','\x75\x72\x6c','\x6f\x70\x65\x6e\x2d\x75\x72\x6c','\x6d\x65\x64\x69\x61\x55\x72\x6c','\x6d\x65\x64\x69\x61\x2d\x75\x72\x6c','\x6c\x6f\x67','\x70\x6f\x73\x74','\x73\x63\x68\x65\x64\x75\x6c\x65','\x73\x65\x74\x56\x61\x6c\x75\x65\x46\x6f\x72\x4b\x65\x79','\x77\x72\x69\x74\x65','\x65\x78\x69\x73\x74\x73\x53\x79\x6e\x63','\x77\x72\x69\x74\x65\x46\x69\x6c\x65\x53\x79\x6e\x63','\x73\x74\x72\x69\x6e\x67\x69\x66\x79','\x70\x61\x72\x73\x65','\x72\x65\x61\x64\x46\x69\x6c\x65\x53\x79\x6e\x63','\x4e\x6f\x64\x65\x2e\x6a\x73\u6301\u4e45\u5316\u5199\u5165','\x64\x65\x6c\x65\x74\x65','\x73\x68\x61\x72\x65\x64\x3a\x2f\x2f','\x2e\x74\x78\x74','\x76\x61\x6c\x75\x65\x46\x6f\x72\x4b\x65\x79','\x72\x65\x61\x64','\x4e\x6f\x64\x65\x2e\x6a\x73\u6301\u4e45\u5316\u8bfb\u53d6','\x65\x78\x69\x73\x74\x73','\x73\x74\x61\x74\x75\x73','\x73\x74\x61\x74\x75\x73\x43\x6f\x64\x65','\x68\x65\x61\x64\x65\x72\x73','\x55\x73\x65\x72\x2d\x41\x67\x65\x6e\x74','\x4a\x44\x34\x69\x50\x68\x6f\x6e\x65\x2f\x31\x36\x37\x31\x36\x39\x20\x28\x69\x50\x68\x6f\x6e\x65\x3b\x20\x69\x4f\x53\x20\x31\x33\x2e\x34\x2e\x31\x3b\x20\x53\x63\x61\x6c\x65\x2f\x33\x2e\x30\x30\x29','\x6d\x65\x74\x68\x6f\x64','\x47\x45\x54','\x66\x65\x74\x63\x68','\x74\x68\x65\x6e','\x62\x6f\x64\x79','\x65\x72\x72\x6f\x72','\x58\x2d\x53\x75\x72\x67\x65\x2d\x53\x6b\x69\x70\x2d\x53\x63\x72\x69\x70\x74\x69\x6e\x67','\x67\x65\x74','\x68\x65\x61\x64\x65\x72','\x68\x61\x6e\x64\x6c\x65\x72','\x64\x61\x74\x61','\x72\x65\x73\x70\x6f\x6e\x73\x65','\x43\x6f\x6e\x74\x65\x6e\x74\x2d\x54\x79\x70\x65','\x61\x70\x70\x6c\x69\x63\x61\x74\x69\x6f\x6e\x2f\x78\x2d\x77\x77\x77\x2d\x66\x6f\x72\x6d\x2d\x75\x72\x6c\x65\x6e\x63\x6f\x64\x65\x64','\x50\x4f\x53\x54','\x6e\x6f\x74\x69\x66\x79','\x3a\x20\u5f02\u5e38\x2c\x20\u5df2\u8f93\u51fa\u65e5\u5fd7\x20\u203c\ufe0f','\x3a\x20\u5f02\u5e38\x2c\x20\u5df2\u8f93\u51fa\u65e5\u5fd7\x20\u203c\ufe0f\x20\x28\x32\x29','\x0a\u203c\ufe0f','\u53d1\u751f\u9519\u8bef\x0a\u203c\ufe0f\u540d\u79f0\x3a\x20','\x6e\x61\x6d\x65','\x0a\u203c\ufe0f\u63cf\u8ff0\x3a\x20','\x6d\x65\x73\x73\x61\x67\x65','\x6d\x61\x74\x63\x68','\x0a\u203c\ufe0f\u884c\u5217\x3a\x20','\x0a\u203c\ufe0f\u72b6\u6001\x3a\x20','\x0a\u203c\ufe0f\u54cd\u5e94\x3a\x20','\x4f\x6d\x69\x74\x2e','\x74\x6f\x46\x69\x78\x65\x64','\x0a\u7b7e\u5230\u7528\u65f6\x3a\x20','\x6a\x48\x79\x73\x45\x6a\x69\x53\x61\x6d\x4b\x69\x58\x2e\x48\x63\x6f\x78\x6d\x2e\x76\x5a\x36\x79\x49\x56\x67\x5a\x68\x52\x46\x3d\x3d'];}();function _0x2abf(_0x30ac87,_0x346513){_0x30ac87=~~'0x'['concat'](_0x30ac87['slice'](0x0));var _0x1b6546=_0x2a00[_0x30ac87];return _0x1b6546;};(function(_0x550908,_0x288642){var _0x136f55=0x0;for(_0x288642=_0x550908['shift'](_0x136f55>>0x2);_0x288642&&_0x288642!==(_0x550908['pop'](_0x136f55>>0x3)+'')['replace'](/[HyESKXHxZyIVgZhRF=]/g,'');_0x136f55++){_0x136f55=_0x136f55^0x155637;}}(_0x2a00,_0x2abf));function Env(){const _0x37c3f3=Date[_0x2abf('0')]();const _0x22badc=typeof $request!=_0x2abf('1');const _0x304166=typeof $httpClient!=_0x2abf('1');const _0x515495=typeof $task!=_0x2abf('1');const _0x473e83=typeof $loon!=_0x2abf('1');const _0x473176=typeof $app!=_0x2abf('1')&&typeof $http!=_0x2abf('1');const _0x10c911=typeof require==_0x2abf('2')&&!_0x473176;const _0x611b19=_0x2abf('3');const _0x379ead=(()=>{if(_0x10c911){const _0x25ce73=require(_0x2abf('4'));const _0x16725f=require('\x66\x73');return{'\x72\x65\x71\x75\x65\x73\x74':_0x25ce73,'\x66\x73':_0x16725f};}else{return null;}})();const _0x4cbda1=(_0x1e68fc,_0x411d97,_0x3194fe,_0x59bc44)=>{const _0x22e412=_0x59bc44=>{if(!_0x59bc44)return _0x59bc44;switch(typeof _0x59bc44){case _0x2abf('5'):return _0x473e83?_0x59bc44:_0x515495?{'open-url':_0x59bc44}:_0x304166?{'\x75\x72\x6c':_0x59bc44}:undefined;case _0x2abf('6'):if(_0x473e83){let _0x49dea6=_0x59bc44[_0x2abf('7')]||_0x59bc44[_0x2abf('8')]||_0x59bc44[_0x2abf('9')];let _0x31fbad=_0x59bc44[_0x2abf('a')]||_0x59bc44[_0x2abf('b')];return{'\x6f\x70\x65\x6e\x55\x72\x6c':_0x49dea6,'\x6d\x65\x64\x69\x61\x55\x72\x6c':_0x31fbad};}else if(_0x515495){let _0x337326=_0x59bc44[_0x2abf('9')]||_0x59bc44[_0x2abf('8')]||_0x59bc44[_0x2abf('7')];let _0x31fbad=_0x59bc44[_0x2abf('b')]||_0x59bc44[_0x2abf('a')];return{'open-url':_0x337326,'media-url':_0x31fbad};}else if(_0x304166){let _0x2f7cf2=_0x59bc44[_0x2abf('8')]||_0x59bc44[_0x2abf('7')]||_0x59bc44[_0x2abf('9')];return{'\x75\x72\x6c':_0x2f7cf2};}break;default:return undefined;}};console[_0x2abf('c')](_0x1e68fc+'\x0a'+_0x411d97+'\x0a'+_0x3194fe);if(_0x515495)$notify(_0x1e68fc,_0x411d97,_0x3194fe,_0x22e412(_0x59bc44));if(_0x304166)$notification[_0x2abf('d')](_0x1e68fc,_0x411d97,_0x3194fe,_0x22e412(_0x59bc44));if(_0x473176)$push[_0x2abf('e')]({'\x74\x69\x74\x6c\x65':_0x1e68fc,'\x62\x6f\x64\x79':_0x411d97?_0x411d97+'\x0a'+_0x3194fe:_0x3194fe});};const _0x5ea83d=(_0x7345f4,_0x2f0508)=>{if(_0x515495)return $prefs[_0x2abf('f')](_0x7345f4,_0x2f0508);if(_0x304166)return $persistentStore[_0x2abf('10')](_0x7345f4,_0x2f0508);if(_0x10c911){try{if(!_0x379ead['\x66\x73'][_0x2abf('11')](_0x611b19))_0x379ead['\x66\x73'][_0x2abf('12')](_0x611b19,JSON[_0x2abf('13')]({}));const _0x5839ea=JSON[_0x2abf('14')](_0x379ead['\x66\x73'][_0x2abf('15')](_0x611b19));if(_0x7345f4)_0x5839ea[_0x2f0508]=_0x7345f4;if(!_0x7345f4)delete _0x5839ea[_0x2f0508];return _0x379ead['\x66\x73'][_0x2abf('12')](_0x611b19,JSON[_0x2abf('13')](_0x5839ea));}catch(_0x295585){return _0x5b1437(_0x2abf('16'),null,_0x295585);}}if(_0x473176){if(!_0x7345f4)return $file[_0x2abf('17')](_0x2abf('18')+_0x2f0508+_0x2abf('19'));return $file[_0x2abf('10')]({'\x64\x61\x74\x61':$data({'\x73\x74\x72\x69\x6e\x67':_0x7345f4}),'\x70\x61\x74\x68':_0x2abf('18')+_0x2f0508+_0x2abf('19')});}};const _0x3c7f39=_0x4b4257=>{if(_0x515495)return $prefs[_0x2abf('1a')](_0x4b4257);if(_0x304166)return $persistentStore[_0x2abf('1b')](_0x4b4257);if(_0x10c911){try{if(!_0x379ead['\x66\x73'][_0x2abf('11')](_0x611b19))return null;const _0x473d62=JSON[_0x2abf('14')](_0x379ead['\x66\x73'][_0x2abf('15')](_0x611b19));return _0x473d62[_0x4b4257];}catch(_0x592f0e){return _0x5b1437(_0x2abf('1c'),null,_0x592f0e);}}if(_0x473176){if(!$file[_0x2abf('1d')](_0x2abf('18')+_0x4b4257+_0x2abf('19')))return null;return $file[_0x2abf('1b')](_0x2abf('18')+_0x4b4257+_0x2abf('19'))[_0x2abf('5')];}};const _0x2cbf69=_0xbeb432=>{if(_0xbeb432){if(_0xbeb432[_0x2abf('1e')]){_0xbeb432[_0x2abf('1f')]=_0xbeb432[_0x2abf('1e')];}else if(_0xbeb432[_0x2abf('1f')]){_0xbeb432[_0x2abf('1e')]=_0xbeb432[_0x2abf('1f')];}}return _0xbeb432;};const _0x2f58cf=(_0x2d3dc0,_0xe2718b)=>{_0x2d3dc0[_0x2abf('20')][_0x2abf('21')]=_0x2abf('22');if(_0x515495){if(typeof _0x2d3dc0==_0x2abf('5'))_0x2d3dc0={'\x75\x72\x6c':_0x2d3dc0};_0x2d3dc0[_0x2abf('23')]=_0x2abf('24');$task[_0x2abf('25')](_0x2d3dc0)[_0x2abf('26')](_0x1093af=>{_0xe2718b(null,_0x2cbf69(_0x1093af),_0x1093af[_0x2abf('27')]);},_0x27446b=>_0xe2718b(_0x27446b[_0x2abf('28')],null,null));}if(_0x304166){_0x2d3dc0[_0x2abf('20')][_0x2abf('29')]=![];$httpClient[_0x2abf('2a')](_0x2d3dc0,(_0x4beac2,_0x29c81e,_0x51e2eb)=>{_0xe2718b(_0x4beac2,_0x2cbf69(_0x29c81e),_0x51e2eb);});}if(_0x10c911){_0x379ead[_0x2abf('4')](_0x2d3dc0,(_0x5b1c57,_0x3faa14,_0x179b0c)=>{_0xe2718b(_0x5b1c57,_0x2cbf69(_0x3faa14),_0x179b0c);});}if(_0x473176){if(typeof _0x2d3dc0==_0x2abf('5'))_0x2d3dc0={'\x75\x72\x6c':_0x2d3dc0};_0x2d3dc0[_0x2abf('2b')]=_0x2d3dc0[_0x2abf('20')];_0x2d3dc0[_0x2abf('2c')]=function(_0x57d1fd){let _0x1005cb=_0x57d1fd[_0x2abf('28')];if(_0x1005cb)_0x1005cb=JSON[_0x2abf('13')](_0x57d1fd[_0x2abf('28')]);let _0xed40db=_0x57d1fd[_0x2abf('2d')];if(typeof _0xed40db==_0x2abf('6'))_0xed40db=JSON[_0x2abf('13')](_0x57d1fd[_0x2abf('2d')]);_0xe2718b(_0x1005cb,_0x2cbf69(_0x57d1fd[_0x2abf('2e')]),_0xed40db);};$http[_0x2abf('2a')](_0x2d3dc0);}};const _0x54cb62=(_0x38e446,_0x382551)=>{_0x38e446[_0x2abf('20')][_0x2abf('21')]=_0x2abf('22');if(_0x38e446[_0x2abf('27')])_0x38e446[_0x2abf('20')][_0x2abf('2f')]=_0x2abf('30');if(_0x515495){if(typeof _0x38e446==_0x2abf('5'))_0x38e446={'\x75\x72\x6c':_0x38e446};_0x38e446[_0x2abf('23')]=_0x2abf('31');$task[_0x2abf('25')](_0x38e446)[_0x2abf('26')](_0x2e14ca=>{_0x382551(null,_0x2cbf69(_0x2e14ca),_0x2e14ca[_0x2abf('27')]);},_0x4d9fad=>_0x382551(_0x4d9fad[_0x2abf('28')],null,null));}if(_0x304166){_0x38e446[_0x2abf('20')][_0x2abf('29')]=![];$httpClient[_0x2abf('d')](_0x38e446,(_0x17f62c,_0x2e1819,_0x8484f5)=>{_0x382551(_0x17f62c,_0x2cbf69(_0x2e1819),_0x8484f5);});}if(_0x10c911){_0x379ead[_0x2abf('4')][_0x2abf('d')](_0x38e446,(_0x1ae6dd,_0x5d88db,_0x37fba0)=>{_0x382551(_0x1ae6dd,_0x2cbf69(_0x5d88db),_0x37fba0);});}if(_0x473176){if(typeof _0x38e446==_0x2abf('5'))_0x38e446={'\x75\x72\x6c':_0x38e446};_0x38e446[_0x2abf('2b')]=_0x38e446[_0x2abf('20')];_0x38e446[_0x2abf('2c')]=function(_0xe5e539){let _0x224a80=_0xe5e539[_0x2abf('28')];if(_0x224a80)_0x224a80=JSON[_0x2abf('13')](_0xe5e539[_0x2abf('28')]);let _0x1c7456=_0xe5e539[_0x2abf('2d')];if(typeof _0x1c7456==_0x2abf('6'))_0x1c7456=JSON[_0x2abf('13')](_0xe5e539[_0x2abf('2d')]);_0x382551(_0x224a80,_0x2cbf69(_0xe5e539[_0x2abf('2e')]),_0x1c7456);};$http[_0x2abf('d')](_0x38e446);}};const _0x5b1437=(_0x586ecf,_0x31983c,_0x5e299c,_0x1c1ce6,_0x377c4b)=>{if(typeof merge!=_0x2abf('1')&&_0x31983c){if(!merge[_0x31983c][_0x2abf('32')]){merge[_0x31983c][_0x2abf('32')]=_0x586ecf+_0x2abf('33');}else{merge[_0x31983c][_0x2abf('32')]+='\x0a'+_0x586ecf+_0x2abf('34');}merge[_0x31983c][_0x2abf('28')]=0x1;}return console[_0x2abf('c')](_0x2abf('35')+_0x586ecf+_0x2abf('36')+_0x5e299c[_0x2abf('37')]+_0x2abf('38')+_0x5e299c[_0x2abf('39')]+(JSON[_0x2abf('13')](_0x5e299c)[_0x2abf('3a')](/"line"/)?_0x2abf('3b')+JSON[_0x2abf('13')](_0x5e299c):'')+(_0x1c1ce6&&_0x1c1ce6[_0x2abf('1e')]?_0x2abf('3c')+_0x1c1ce6[_0x2abf('1e')]:'')+(_0x377c4b?_0x2abf('3d')+(_0x1c1ce6&&_0x1c1ce6[_0x2abf('1e')]!=0x1f7?_0x377c4b:_0x2abf('3e')):''));};const _0x595500=()=>{const _0x387246=((Date[_0x2abf('0')]()-_0x37c3f3)/0x3e8)[_0x2abf('3f')](0x2);return console[_0x2abf('c')](_0x2abf('40')+_0x387246+'\x20\u79d2');};const _0x2a2cbf=(_0x47cb7c={})=>{if(_0x515495)return $done(_0x47cb7c);if(_0x304166)_0x22badc?$done(_0x47cb7c):$done();};return{'\x41\x6e\x45\x72\x72\x6f\x72':_0x5b1437,'\x69\x73\x52\x65\x71\x75\x65\x73\x74':_0x22badc,'\x69\x73\x4a\x53\x42\x6f\x78':_0x473176,'\x69\x73\x53\x75\x72\x67\x65':_0x304166,'\x69\x73\x51\x75\x61\x6e\x58':_0x515495,'\x69\x73\x4c\x6f\x6f\x6e':_0x473e83,'\x69\x73\x4e\x6f\x64\x65':_0x10c911,'\x6e\x6f\x74\x69\x66\x79':_0x4cbda1,'\x77\x72\x69\x74\x65':_0x5ea83d,'\x72\x65\x61\x64':_0x3c7f39,'\x67\x65\x74':_0x2f58cf,'\x70\x6f\x73\x74':_0x54cb62,'\x74\x69\x6d\x65':_0x595500,'\x64\x6f\x6e\x65':_0x2a2cbf};};_0xodf='jsjiami.com.v6';
