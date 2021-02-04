import * as React from 'react';
import './index.less';

import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import logo from '../../images/hyperstacks-logo-orange.svg';

import { inject, observer } from 'mobx-react';
import Stores from '../../stores/storeIdentifier';
import AccountAuthStore from '../../stores/accountAuthStore';

interface ILoginUserStore{
  accountAuthStore: AccountAuthStore;
}

@inject(Stores.AccountAuthStore)
@observer
class Login extends React.Component<ILoginUserStore> {
  state = {
    from: { from: { pathname: '/dashboard' } }
  }
  onFinish = async (values:any) => {
    const res = await this.props.accountAuthStore.login({identifier: values.username, password:values.password});
    let { from } = { from: { pathname: '/dashboard' } };
    
    if(res) return window.location.href = from.pathname;
  };

  public render() {
    // if(!utils.getToken('access_token')) return <Redirect to={this.state.from.from}/>
    return (
      
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={this.onFinish}
      >
        <div className="logo">
          <img src={logo} alt="Hyperstacks Logo"/>
        </div>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your Username!',
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
  
          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>
  
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <a href="">register now!</a>
        </Form.Item>
      </Form>
    );
  
  }
}
export default Login;