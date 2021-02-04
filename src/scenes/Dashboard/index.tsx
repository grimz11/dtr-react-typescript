import "./index.less";
import * as React from "react";
import {
  Layout,
  Menu,
  Row,
  Col,
  Button,
  List,
  TimePicker,
  DatePicker,
  Badge,
} from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeTwoTone,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { FieldTimeOutlined } from "@ant-design/icons";
import moment from "moment";

import { inject, observer } from "mobx-react";
import Stores from "../../stores/storeIdentifier";
import RecordStore from "../../stores/recordStore";
import UserStore from "../../stores/userStore";
import utils from "../../utils/utils";
import IRecordInput from "../../services/record/dto/recordInput";

const { Header, Sider, Content } = Layout;

interface IDashboardRecordStore {
  recordStore: RecordStore;
  userStore: UserStore;
}

@inject(Stores.RecordStore, Stores.UserStore)
@observer
class Dashboard extends React.Component<IDashboardRecordStore> {
  state = {
    collapsed: false,
    time: new Date(),
    data: [],
    id: utils.getCookie('id'),
  };
  async componentDidMount() {
    await this.getUser();
    const userId = this.props.userStore!.currentLogin!.id;
    const recordData = await this.props.recordStore.getRecord(userId);
    this.setState({ ...this.state, data: recordData, id: utils.getCookie('id') });
    
  }
  async getUser(){
    await this.props.userStore.getUser(parseInt(this.state!.id));
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  handleOnClick = async () => {
    console.log('handle click');
    const payload:IRecordInput = {
      userId: this.props.userStore.currentLogin
    };
    console.log('payload', payload);
    
    this.props.recordStore.timeIn(payload);
  }

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
            <Menu.Item key="1" icon={<HomeTwoTone />}>
              Dashboard
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              Daily Time Records
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />}>
              Profile
            </Menu.Item>
            <Menu.Item key="4" icon={<UploadOutlined />}>
              Logout
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
            <Row>
              <Col span={12} className="col-1-time-in">
                <div>
                  <Button
                    type="primary"
                    shape="round"
                    icon={<FieldTimeOutlined />}
                    size="large"
                    onClick={this.handleOnClick}
                  >
                    Time In
                  </Button>
                </div>
                <br></br>
                <List
                  itemLayout="horizontal"
                  dataSource={this.state.data}
                  renderItem={(item: any) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={
                          item.timeOut ? <Badge status="success"/> : <Badge status="default" />
                        }
                        title={moment(item.created_at,
                          "YYYY MM DD hh:mm:ss A Z").startOf('hour').fromNow()}
                        description={
                          <div>
                            <TimePicker
                              defaultValue={moment(
                                item.created_at,
                                "YYYY MM DD hh:mm:ss A Z"
                              )}
                              disabled
                            />
                            <DatePicker
                              defaultValue={moment(
                                item.created_at,
                                "YYYY-MM-DD"
                              )}
                              disabled
                            />
                            <span> Total Hours: {item.hoursOfTheDay}</span>
                          </div>
                        }
                      />
                    </List.Item>
                  )}
                />
              </Col>
              <Col span={12}>col-12</Col>
            </Row>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default Dashboard;
