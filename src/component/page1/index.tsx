import { Tag } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import "./index.less"

export const Page1 = () => {
  return (
    <div className="test-css">
      <h1 className="test-css-home">我是Page1</h1>
      <Link to={'/'}>
            <Tag>返回首页</Tag>
      </Link>
    </ div>
  );
}