// 任何页面都可能用到的类
export interface IMenuItem {
  name?: string;
  key: string;
  show?: boolean;
  type?: number;
  label?: string;
  content?: JSX.Element | string;
  render?: (params: any) => JSX.Element;
}
