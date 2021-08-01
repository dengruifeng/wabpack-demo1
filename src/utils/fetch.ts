import { notification } from 'antd';
import { csrfTokenMethod } from '../constants/api';
import { getCookie, getCurrentProject } from './utils';

const window = self.window;
export interface IRes {
  code: number;
  message: string;
  data: any;
}

const checkStatus = (res: Response) => {
  if (res.status === 401) {
    window.location.href = '/login';
    // notification.error({ message: '无权限访问' });
  }

  if (res.status === 405 || res.status === 403) {
    location.href = '/403';
  }

  if (res.status === 404) {
    notification.error({ message: '接口不存在' });
  }

  return res;
};

const filter = (init: IInit) => (res: IRes) => {
  if (res.code !== 0 && res.code !== 200) {
    if (!init.errorNoTips) {
      notification.error({
        message: '错误',
        description: res.message || '服务错误，请重试！',
      });
    }
    throw res;
  }

  return res.data ? res.data : {
    message: '提示',
    description: res.message || '服务错误，请重试！',
  };
};

interface IInit extends RequestInit {
  errorNoTips?: boolean;
  body?: BodyInit | null | any;
  prefix?: 'admin' | 'ams' | 'sql';
}

const uPrefix = {
  admin: '/api/es/admin',
  ams: '/api/es/ams',
  sql: '',
};
const addCustomHeader = (init?: IInit) => {
  init.headers = Object.assign(init.headers || {}, {// :TODO
    'X-Data-Center': 'cn',
    'X-SSO-USER': getCookie('domainAccount'),
    'X-ARIUS-APP-ID': getCurrentProject()?.id,
  });
  return init;
};

export default function fetch(url: string, init?: IInit) {
  if (!init) init = {};
  const prefix = uPrefix[init.prefix] || uPrefix.admin;

  if (!init.credentials) init.credentials = 'include';
  if (init.body && typeof init.body === 'object') init.body = JSON.stringify(init.body);
  if (init.body && !init.method) init.method = 'POST';
  if (init.method) init.method = init.method.toUpperCase();

  if (csrfTokenMethod.includes(init.method)) {
    init.headers = Object.assign({}, init.headers || {
      'Content-Type': 'application/json',
    });
  }

  init = addCustomHeader(init)
  const realUrl = `${prefix}${url}`;
  return window
    .fetch(realUrl, init)
    .then(res => checkStatus(res))
    .then((res) => res.json())
    .then(filter(init));
}

export function formFetch(url: string, init?: IInit) {
  if (!init) init = {};
  const prefix = uPrefix[init.prefix] || uPrefix.admin;

  url = url.indexOf('?') > 0 ?
    `${url}&dataCenter=${'cn'}` : `${url}?dataCenter=${'cn'}`; // :TODO

  if (!/^http(s)?:\/\//.test(url)) {
    url = `${prefix}${url}`;
  }

  init = addCustomHeader(init)
  return window
    .fetch(url, init)
    .then(res => checkStatus(res))
    .then((res) => res.json())
    .then(filter(init));
}
