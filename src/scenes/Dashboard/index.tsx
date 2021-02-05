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
import Avatar from "antd/lib/avatar/avatar";

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
    personRecord: [],
    peopleRecords: [],
    id: utils.getCookie("id"),
    timeBtn: false,
    recordId: 0,
    timeInRecord: "",
  };
  async componentDidMount() {
    await this.getUser();
    await this.getRecord();
    await this.getAllRecords();
    await this.checkWorkingStatus();
  }
  async getUser() {
    await this.props.userStore.getUser(parseInt(this.state!.id));
  }
  async getRecord() {
    const userId = this.props.userStore!.currentLogin!.id;
    const recordData = await this.props.recordStore.getRecord(userId);
    this.setState({
      ...this.state,
      personRecord: recordData.sort().reverse(),
      id: utils.getCookie("id"),
    });
  }
  async getAllRecords() {
    const recordData = await this.props.recordStore.getAllRecords();
    console.log('recordData', recordData);
    
    this.setState({
      ...this.state,
      peopleRecords: recordData.sort().reverse(),
    });
  }
  async checkWorkingStatus() {
    this.state.personRecord.every((item: IRecordInput) => {
      const date = item.created_at;
      this.setState({
        ...this.state,
        timeBtn: item.currentlyWorking ? true : false,
        recordId: item.id,
        timeInRecord: date,
      });
    });
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  async calculateTimeElapse(date: string) {
    let startTime: any, endTime: any;
    startTime = new Date(date);
    endTime = new Date();
    let timeDiff = endTime - startTime;
    timeDiff /= 1000;
    let seconds = Math.round(timeDiff);
    const hours = moment
      .utc(moment.duration(seconds, "seconds").asMilliseconds())
      .format("HH:mm:ss");
    console.log("hours", hours);

    return hours;
  }

  handleOnClick = async () => {
    await this.getRecord();
    const recordTime = await this.calculateTimeElapse(this.state.timeInRecord);

    if (this.state.timeBtn) {
      const payloadOut: IRecordInput = {
        currentlyWorking: false,
        userId: this.props.userStore!.currentLogin,
        timeOut: new Date().getTime(),
        hoursRendered: recordTime,
      };
      await this.props.recordStore.timeOut(this.state.recordId, payloadOut);
    } else {
      const payloadIn: IRecordInput = {
        currentlyWorking: true,
        userId: this.props.userStore!.currentLogin,
        hoursRendered: "00.00:00",
      };
      await this.props.recordStore.timeIn(payloadIn);
    }
    await this.getRecord();
    this.setState({ ...this.state, timeBtn: !this.state.timeBtn });
  };

  render() {
    const { personRecord, timeBtn, peopleRecords } = this.state;
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
              <Col span={16} className="col-1-time-in">
                <div>
                  <Button
                    type={"primary"}
                    shape="round"
                    icon={<FieldTimeOutlined />}
                    size="large"
                    onClick={this.handleOnClick}
                    danger={timeBtn ? true : false}
                  >
                    {timeBtn ? "Time Out" : "Time In"}
                  </Button>
                </div>
                <br></br>
                <List
                  itemLayout="horizontal"
                  dataSource={personRecord}
                  renderItem={(item: IRecordInput) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={
                          item.currentlyWorking ? (
                            <Badge status="success" />
                          ) : (
                            <Badge status="default" />
                          )
                        }
                        title={moment(
                          item.created_at,
                          "YYYY MM DD hh:mm:ss A Z"
                        )
                          .startOf("minutes")
                          .fromNow()}
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
                            <span> Total Hours: {item.hoursRendered}</span>
                          </div>
                        }
                      />
                    </List.Item>
                  )}
                />
              </Col>
              <Col span={8}>
                {" "}
                <div>
                  <h1>Activity Feed</h1>
                </div>
                <br></br>
                <List
                  itemLayout="horizontal"
                  dataSource={peopleRecords}
                  renderItem={(item: IRecordInput) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={
                          <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>
                        }
                        
                        title={`${item.userId?.username} was login ` + moment(
                          item.created_at,
                          "YYYY MM DD hh:mm:ss A Z"
                        )
                          .startOf("minutes")
                          .fromNow()}
                        description={"Test"}
                      />
                    </List.Item>
                  )}
                />
              </Col>
            </Row>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default Dashboard;
