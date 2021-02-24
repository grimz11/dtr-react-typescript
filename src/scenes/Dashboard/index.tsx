import "./index.less";
import * as React from "react";
import { Col, Row } from "antd";

import moment from "moment";

import { inject, observer } from "mobx-react";
import Stores from "../../stores/storeIdentifier";
import utils from "../../utils/utils";
import IRecordInput from "../../services/record/dto/recordInput";
import ActivityFeed from "./components/activityFeed";
import DTR from "./components/dtr";

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
    await this.getCurrentLoginUser();
    await this.getRecord();
    await this.getAllRecords();
    await this.checkWorkingStatus();
  }
  async getCurrentLoginUser() {
    await this.props.userStore.getCurrentLoginUser(
      parseInt(await this.state!.id),
    );
  }
  async getRecord() {
    const userId = this.props.userStore!.$currentLogin!.id;
    await this.props.recordStore.getRecord(userId);
    this.setState({
      ...this.state,
      personRecord: this.props.recordStore.$personRecords.sort().reverse(),
      id: utils.getCookie("id"),
    });
  }
  async getAllRecords() {
    await this.props.recordStore.getAllRecordsLimit();
    this.setState({
      ...this.state,
      peopleRecords: this.props.recordStore.$peopleRecords
        .sort()
        .reverse()
        .slice(0, 40),
    });
  }
  async checkWorkingStatus() {
    this.state.personRecord.find((item: IRecordInput) => {
      // console.log("every", item);
      const date = item.created_at;
      this.setState({
        ...this.state,
        timeBtn: item!.currentlyWorking ? true : false,
        recordId: item.id,
        timeInRecord: date,
      });

      return true;
    });
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  // async calculateTimeElapse(date: string) {
  //   let startTime: any, endTime: any;
  //   startTime = new Date(date);
  //   endTime = new Date();
  //   let timeDiff = endTime - startTime;
  //   timeDiff /= 1000;
  //   let seconds = Math.round(timeDiff);
  //   const hours = moment
  //     .utc(moment.duration(seconds, "seconds").asMilliseconds())
  //     .format("HH:mm:ss");

  //   return hours;
  // }

  async calculateTimeElapse(date: string) {
    let hoursRendered = "";
    let startTime = moment(date);
    let now = moment();
    let duration: any = moment.duration(now.diff(startTime));
    let hours = duration.days() * 24 + duration.hours();
    hours = hours < 10 ? "0" + hours : hours;
    let minutes =
      duration.minutes() < 10 ? "0" + duration.minutes() : duration.minutes();
    let seconds =
      duration.seconds() < 10 ? "0" + duration.seconds() : duration.seconds();
    hoursRendered = hours + ":" + minutes + ":" + seconds;
    return hoursRendered;
  }

  public handleOnClick = async () => {
    await this.checkWorkingStatus();
    const recordTime = await this.calculateTimeElapse(this.state.timeInRecord);
    if (this.state.timeBtn) {
      const payloadOut: IRecordInput = {
        currentlyWorking: false,
        userId: this.props.userStore!.$currentLogin,
        timeOut: new Date().getTime(),
        hoursRendered: recordTime,
      };
      await this.props.recordStore.timeOut(this.state.recordId, payloadOut);
    } else {
      const payloadIn: IRecordInput = {
        currentlyWorking: true,
        userId: this.props.userStore!.$currentLogin,
        hoursRendered: "00:00:00",
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
