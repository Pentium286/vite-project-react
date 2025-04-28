/**
 * @description 获取url中'?'截取参数
 * @param {String} name 参数key
 * @example getQueryString('key');
 */
export const getQueryString = (name) => {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  let r = location.search.substr(1).match(reg); // 获取url中'?'符后的字符串并正则匹配
  let context = '';
  if (r !== null) {
    context = r[2];
    reg = null;
    r = null;
  }
  return context === null || context === '' || context === 'undefined' ? '' : context;
};

export const isEmpty = (o) => {
  if (o == null || o == undefined) return true;
  switch (typeof o) {
    case 'boolean':
      return false;
    case 'object':
      for (let t in o) return false;
      return true;
    case 'string':
      return o.length <= 0;
    case 'number':
      return o.toString().length <= 0;
    case 'function':
      return false;
  }
  return true;
};

// 判断是 iOS 还是 Android
export function judgeType() {
  const u = navigator.userAgent;
  const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; // android 终端
  const isIos = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios 终端
  // isiPad = (navigator.userAgent.match(/(iPad)/) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1))
  return isAndroid ? 'android' : isIos ? 'ios' : '';
}