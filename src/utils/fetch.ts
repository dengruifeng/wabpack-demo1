import { notification } from 'antd';

const window = self.window;
export interface IRes { //与后端约定的格式
  code: number;
  message: string;
  data: any;
}

interface IInit extends RequestInit {
  body?: BodyInit | null | any;
}

const checkStatus = (res: Response) => {
  if (res.status === 401) {
    window.location.href = '/login';
  }

  if (res.status === 405 || res.status === 403) {
    location.href = '/403';
  }

  if (res.status === 404) {
    notification.error({ message: '接口不存在' });
  }

  return res;
};

const filter = (res: IRes) => {
  // if (res.code !== 0 && res.code !== 200) {
  //   notification.error({
  //     message: '错误',
  //     description: res.message || '服务错误，请重试！',
  //   });
  //   throw res;
  // }
  res.data = res;
  return res.data; // 返回数据
};

const addCustomHeader = (init?: IInit) => { // 自定义添加头部信息
  init = init || {};
  init.headers = Object.assign(init?.headers || {}, {
    // 'X-SSO-USER': 'admin',
  });
  return init;
};

export default function fetch(url: string, init?: IInit) {
  if (!init) init = {};

  // if (!init.credentials) init.credentials = 'include'; // 默认same-origin，不管同源请求，还是跨域请求，一律发送 Cookie。
  if (init.body && typeof init.body === 'object') init.body = JSON.stringify(init.body); // 转化JSON 字符串
  if (init.body && !init.method) init.method = 'POST'; // 存在body，默认请求方法POST
  if (init.method) init.method = init.method.toUpperCase(); // 兼容下，字符串转换为大写

  if (['POST', 'PUT', 'DELETE'].includes(init.method || '')) { // 提交JSON数据， 默认值是'text/plain;charset=UTF-8'
    init.headers = Object.assign({}, init.headers || {
      'Content-Type': 'application/json',
    });
  }

  init = addCustomHeader(init);
  console.log(init);
  return window
    .fetch(url, init)
    .then(res => checkStatus(res)) //检验响应码
    .then((res) => res.json())
    .then((res) => filter(res)) // 根据业务需求，进行对应过滤
    .catch(err => console.log(`请求失败！ + url: ${url}`, err));
}

export function formFetch(url: string, init?: IInit) { // 表单fetch，用于上传文件等
  if (!init) init = {};

  init = addCustomHeader(init)
  return window
    .fetch(url, init)
    .then(res => checkStatus(res))
    .then((res) => res.json())
    .then((res) => filter(res))
    .catch(err => console.log(`请求失败！ + url: ${url}`, err));
}
