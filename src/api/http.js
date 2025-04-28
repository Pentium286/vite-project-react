import axiosInstance from './request';
import { message } from 'antd';

const request = axiosInstance.instance;

export default {
  get(url, params = {}, tips = {}, extra = {}) {
    return new Promise((resolve, reject) => {
      let config = {
        method: 'get',
        url,
        params,
      };
      config = extra ? Object.assign(config, extra) : config;
      request(config)
        .then((res) => {
          if (res.success) {
            if (tips.successTip) {
              message({
                content: tips.successTip,
                duration: 3000,
                className: 'toastRequest',
              });
            }
            resolve(res);
          } else if (tips.errorTip || res.message) {
            message({
              content: tips.errorTip || res.message,
              duration: 3000,
            });
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  post(url, params = {}, tips, extra) {
    return new Promise((resolve, reject) => {
      let config = {
        method: 'post',
        url,
        data: params,
      };
      config = extra ? Object.assign(config, extra) : config;
      request(config)
        .then((res) => {
          if (res.success) {
            if (tips.successTip) {
              message({
                content: tips.successTip,
                duration: 3000,
              });
            }
            resolve(res);
          } else if (tips.errorTip || res.message) {
            message({
              content: tips.errorTip || res.message,
              duration: 3000,
            });
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};