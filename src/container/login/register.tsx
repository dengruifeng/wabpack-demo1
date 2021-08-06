import React from 'react';
import { Form, Button, Row, message } from 'antd';
import { RegisterFormMap } from './config';
import { renderFormItem } from './login';
import { getPublicKey, userRegister } from 'api/login';
import JSEncrypt from 'jsencrypt';

export const RegisterFrom: React.FC<any> = (props: { fn: (t: string) => any }) => {
  const [form] = Form.useForm();

  React.useEffect(() => {
    //
  }, []);

  const handleSubmit = async (e: any) => {
    let pubKey = '';
    await getPublicKey()
      .then((res) => {
        pubKey = res;
      })
      .catch(() => {
        message.error('网络错误, 请稍后刷新重试！');
      });
    if (!pubKey) {
      message.error('网络错误, 请稍后刷新重试！');
      return;
    }
    const encryptor = new JSEncrypt({}); // 创建加密对象实例
    encryptor.setPublicKey(pubKey); //设置公钥
    e.password = encryptor.encrypt(e.password) as string; // 对内容进行加密
    const req = {
      domainAccount: e.userName,
      password: e.password,
      name: e.realName,
      email: e.mailbox,
      mobile: e.phone,
    };
    userRegister(req)
      .then(() => {
        message.success('注册成功');
        props.fn('login');
      })
      .catch(() => {
        message.error('注册失败');
      });
  };

  const onValuesChange = (value: { [x: string]: any }) => {
    Object.keys(value).forEach((key) => {
      switch (key) {
        case 'userName':
          //
          break;
        case 'password':
          //
          break;
        default:
          break;
      }
    });
  };

  return (
    <>
      <Form
        name="normal_login"
        form={form}
        className="login-form"
        onFinish={handleSubmit}
        layout={'vertical'}
        onValuesChange={onValuesChange}
      >
        {RegisterFormMap.map((formItem) => {
          return (
            <>
              <Row key={formItem.key}>
                <Form.Item key={formItem.key} name={formItem.key} label={formItem.label} rules={formItem.rules} style={{ width: '100%' }}>
                  {renderFormItem(formItem)}
                </Form.Item>
              </Row>
            </>
          );
        })}
        <Form.Item key={'submit'}>
          <Row>
            <Button style={{ width: '100%', height: 40 }} type="primary" htmlType="submit">
              立即注册
            </Button>
          </Row>
        </Form.Item>
      </Form>
    </>
  );
};
