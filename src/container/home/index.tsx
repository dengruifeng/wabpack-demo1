import { Tag } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import './index.less';

export const Home = () => {
  const hrefList = [
    {
      href: '/page1',
      name: '页面1',
    },
    {
      href: '/login',
      name: 'login',
    },
  ];

  const getColor = () => {
    let color = '#';
    for (var i = 0; i < 6; i++) color += parseInt(Math.random() * 16 + '').toString(16);
    return color;
  };

  return (
    <div className="test-css">
      <h1 className="test-css-home">首页</h1>
      {hrefList.map((item, index) => {
        return (
          <Link key={index} to={item.href}>
            <Tag color={getColor()}>{item.name}</Tag>
          </Link>
        );
      })}
    </div>
  );
};
