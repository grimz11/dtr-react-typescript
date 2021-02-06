import "./index.less";
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
  HomeTwoTone,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import moment from "moment";

import { inject, observer } from "mobx-react";
import Stores from "../../stores/storeIdentifier";
import RecordStore from "../../stores/recordStore";
import UserStore from "../../stores/userStore";
import utils from "../../utils/utils";
import IRecordInput from "../../services/record/dto/recordInput";
import ActivityFeed from "./components/activityFeed";
import DTR from "./components/dtr";

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
    await this.props.recordStore.getRecord(userId);
    this.setState({
      ...this.state,
      personRecord: this.props.recordStore.records.sort().reverse(),
      id: utils.getCookie("id"),
    });
  }
  async getAllRecords() {
    const recordData = await this.props.recordStore.getAllRecords();
    console.log('recordData', recordData);
    
    this.setState({
      ...this.state,
      peopleRecords: this.props.recordStore.records.sort().reverse(),
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

    return hours;
  }

  public handleOnClick = async () => {
    await this.checkWorkingStatus();
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
    console.log('Get Oversavable Record', this.props.recordStore.records);
    
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
              <DTR data={this.state} handleOnClick={this.handleOnClick}/>
              <Col span={2}/>
              <ActivityFeed peopleRecords={peopleRecords}/>
            </Row>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default Dashboard;
