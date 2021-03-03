import * as React from "react";
import "./index.less";

import { Spin, Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import logo from "../../assets/images/hyperstacks-logo-orange.svg";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

import { inject, observer } from "mobx-react";
import Stores from "../../stores/storeIdentifier";
import AccountAuthStore from "../../stores/accountAuthStore";
import { Redirect } from "react-router-dom";

interface ILoginUserStore {
  accountAuthStore: AccountAuthStore;
  location?: any;
}

@inject(Stores.AccountAuthStore)
@observer
class Login extends React.Component<ILoginUserStore> {
  state = {
    from: { from: { pathname: "/dashboard" } },
    loading: false,
  };
  handleSubmit = async (values: any) => {
    this.setState({ loading: true });
    await this.props.accountAuthStore.login({
      identifier: values.username,
      password: values.password,
    });
    const { state } = await this.props.location;
    this.setState({ loading: false });
    window.location.href = (await state)
      ? await state.from.pathname
      : "/#/dashboard";
  };

  public render() {
    let { from } = this.props.location.state || { from: { pathname: "/" } };

    if (this.props.accountAuthStore!.isAuthenticated)
      return <Redirect to={from} />;

    return (
      <Spin spinning={this.state.loading} size="large" tip="Authenticating...">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={this.handleSubmit}
        >
          <div className="logo-login">
            <img src={logo} alt="Hyperstacks Logo" />
          </div>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username or Email!",
              },
            ]}
          >
            <Input
              size="large"
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username/Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Password"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="/">
              Forgot password
            </a>
          </Form.Item>

          <Form.Item>
            <Button
              size="large"
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    );
  }
}
export default Login;
