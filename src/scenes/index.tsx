import * as React from "react";
import {
  Col,
  Layout,
  Menu,
  Row,
} from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";

import { Link } from "react-router-dom";
import Dashboard from "./Dashboard";
import IHomeRecordStore from "./indexStore";

const { Header, Sider, Content } = Layout;

class Home extends React.Component<any> {
  state = {
    collapsed: false,
    time: new Date(),
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo">
            <img
              src="https://hyperstacksinc.com/assets/icons/hyperstacks-logo-orange.svg"
              alt=""
            />
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1" icon={<HomeOutlined />} >
              Dashboard
              <Link to="/dashboard" />
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              Admin
              <Link to="/admin" />
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />}>
              Profile
              <Link to="/profile" />
            </Menu.Item>
            <Menu.Item key="4" icon={<UploadOutlined />}>
              Leave Request
              <Link to="/leavrequest" />
            </Menu.Item>
            <Menu.Item key="5" icon={<UploadOutlined />}>
              Logout
              <Link to="/logout" />
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(
              this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: this.toggle,
              }
            )}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
            }}
          >
          <Dashboard/>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default Home;
