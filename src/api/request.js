import axios from 'axios';
import { getQueryString, judgeType } from '@/utils/common';

// console.log("VITE_PROXY_URL: ", import.meta.env.VITE_PROXY_URL);

let pendingReqs = new Map(); // 当前正在请求的接口

/**
 * 取消正在请求的接口
 * @param {*} key 有值，取消重复请求；无值，取消所有请求
 */
function removePending(key) {
  if (key && pendingReqs.has(key)) {
    pendingReqs.get(key)();
    pendingReqs.delete(key);
  } else if (!key) {
    pendingReqs.forEach((value) => {
      value();
    });
    pendingReqs.clear();
  }
}

const instance = axios.create({
  // @ts-ignore
  baseURL: process.env.NODE_ENV === 'production' ? '' : '/api', // api的base_url
});

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // removePending(`${config.method}-${config.url}`);
    // config.cancelToken = new axios.CancelToken(function (cancel) {
    //   pendingReqs.set(`${config.method}-${config.url}`, cancel);
    // });
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    removePending(`${response.config.method}-${response.config.url}`);
    if (response.status === 200) {
      return response.data;
    } else {
      return Promise.reject(response);
    }
  },
  function (error) {
    if (error.response) {
      let config = error.response.config;
      removePending(`${config.method}-${config.url}`);

      // pad 端如果 session 失效就登出
      const sourceEquipment = getQueryString('sourceEquipment');
      if (sourceEquipment === 'pad') {
        const type = judgeType();
        window.setTimeout(() => {
          if (type == 'android') {
            // @ts-ignore
            window.android.loginOut('');
          } else {
            // @ts-ignore
            window.webkit.messageHandlers.loginOut.postMessage('');
          }
        }, 500);
      }
    }
    return Promise.reject(error);
  }
);

export default { instance, removePending };
