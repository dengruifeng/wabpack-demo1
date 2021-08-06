import React, { useState } from 'react';
import { LOGIN_MENU, LOGIN_MENU_MAP } from './config';
import { debounce } from 'lodash';
import './index.less';

export const Login: React.FC<any> = () => {
  const defaultKey = window.location.hash.replace('#', '') || LOGIN_MENU[0].key;
  const [selectedKeys, setSelectedKeys] = useState([defaultKey]);
  const [critical, setCritical] = useState(false);

  React.useEffect(() => {
    if (window.innerWidth < 1366) {
      setCritical(true);
    }
  }, [critical]);

  React.useEffect(() => {
    window.addEventListener('resize', handleResize); //监听窗口大小改变
    return () => window.removeEventListener('resize', debounce(handleResize, 500));
  }, []);

  const handleResize = (e: any) => {
    if (e.target.innerWidth < 1366) {
      setCritical(true);
    } else {
      setCritical(false);
    }
  };

  const renderContent = () => {
    return LOGIN_MENU_MAP.get(selectedKeys[0])?.render(handleMenuClick) || LOGIN_MENU_MAP.get(LOGIN_MENU[0].key)?.render(handleMenuClick);
  };

  const handleMenuClick = (e: string) => {
    setSelectedKeys([e]);
    window.location.hash = e;
  };

  const isLogin = defaultKey === 'login';

  return (
    <div className="login-box">
      <div className="login-box-form">
        <div className="login-box-form-center">
          <div className="login-box-form-center-title">
            <div className="login-box-form-center-title-left">{isLogin ? '登录' : '账号注册'}</div>
            <div className="login-box-form-center-title-right">
              {defaultKey === 'register' ? (
                <div>
                  已有账号，<a onClick={() => handleMenuClick('login')}>直接登录</a>
                </div>
              ) : (
                <div>
                  {' '}
                  还没账号，<a onClick={() => handleMenuClick('register')}>立即注册</a>
                </div>
              )}
            </div>
          </div>
          <div className="login-box-form-center-content">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};
