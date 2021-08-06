import { Tag } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import imgUrl from 'assets/img/test1.jpeg';
import svgUrl from 'assets/img/test.svg';

import './index.less';

export const Page1 = () => {
  return (
    <div className="test-css">
      <h1 className="test-css-home">我是Page1</h1>
      <Link to={'/'}>
        <Tag>返回首页666</Tag>
      </Link>
      <h1>测试图片引入</h1>
      <img src={imgUrl} alt="imgUrl" />
      <img src={svgUrl} alt="svgUrl" />
    </div>
  );
};
