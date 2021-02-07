import "./index.less";
import * as React from "react";
import { Col, Layout, Menu, Row } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined,
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
import { Link } from "react-router-dom";
import IHomeRecordStore from "../indexStore";


@inject(Stores.RecordStore, Stores.UserStore)
@observer
class Dashboard extends React.Component<any> {
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
      personRecord: this.props.recordStore.personRecords.sort().reverse(),
      id: utils.getCookie("id"),
    });
  }
  async getAllRecords() {
    const recordData = await this.props.recordStore.getAllRecords();
    console.log("recordData", recordData);

    this.setState({
      ...this.state,
      peopleRecords: this.props.recordStore.peopleRecords
        .sort()
        .reverse()
        .slice(0, 9),
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
    await this.getAllRecords();

    this.setState({ ...this.state, timeBtn: !this.state.timeBtn });
  };

  render() {
    const { peopleRecords } = this.state;
    return (
      <Row>
        <DTR data={this.state} handleOnClick={this.handleOnClick} />
        <Col span={2} />
        <ActivityFeed peopleRecords={peopleRecords} />
      </Row>
    );
  }
}

export default Dashboard;
