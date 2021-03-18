import "./index.less";
import * as React from "react";
import {
  Avatar,
  Col,
  List,
  Row,
  Input,
  Button,
  Tooltip,
  Card,
  Skeleton,
  DatePicker,
  Space,
} from "antd";
import Stores from "../../stores/storeIdentifier";
import { inject, observer } from "mobx-react";
import RecordDtrTable from "../../components/RecordDtrTable";
import { Link } from "react-router-dom";
import RecordStore from "../../stores/recordStore";
import UserStore from "../../stores/userStore";
import IUserOutput from "../../services/user/dto/userOutput";
import { toJS } from "mobx";
import IUsersRecord from "../../services/user/dto/userRecord";
import moment, { Moment } from "moment";

const { Search } = Input;

interface ILocalProps {
  recordStore: RecordStore;
  userStore: UserStore;
}
interface ILocalState {
  personRecords: Array<IUsersRecord>;
  peopleData: Array<IUserOutput>;
  personDataFilterByDate: Array<IUsersRecord>;
  loading: boolean;
  isClick: boolean;
  isFilterByDate: boolean;
}

@inject(Stores.RecordStore, Stores.UserStore)
@observer
class Admin extends React.Component<ILocalProps, ILocalState> {
  state = {
    personRecords: [],
    peopleData: [],
    personDataFilterByDate: [],
    loading: true,
    isClick: true,
    isFilterByDate: false,
  };

  async componentDidMount() {
    await this.props.userStore.getAllUsers();
    this.getUsersRecordsFilterByDate(
      moment(Date.now()).format("YYYY-MM-DD").toString(),
    );
    const allUsers = toJS(this.props.userStore.$allUsers);

    this.setState({
      ...this.state,
      peopleData: allUsers,
      loading: false,
      isClick: false,
      isFilterByDate: true,
    });
  }
  async componentWillUnmount() {
    this.setState({
      isFilterByDate: false,
    });
  }
  handleOnclick = async (id: number, e: any): Promise<void> => {
    this.setState({ isClick: true });
    await this.props.recordStore.getRecord(id);
    await this.props.recordStore.getRecord(id);
    const userRecord = toJS(this.props.recordStore.$personRecords);
    this.setState({
      personRecords: userRecord,
      isClick: false,
      isFilterByDate: false,
    });
  };

  handleOnchange = (): void => {
    this.setState({
      ...this.state,
      peopleData: this.props.userStore.$allUsers,
    });
  };

  handleClickProfile = async (id: string): Promise<void> => {
    await this.props.userStore.getUserProfile(parseInt(id));
    <Link to={`account/profile/${id}`}></Link>;
  };

  handleOnSearch = async (value: any): Promise<void> => {
    this.props.userStore.$allUsers.find((item: any) => {
      if (item.username.toLowerCase() === value.toLowerCase()) {
        this.setState({
          peopleData: item ? [item] : this.props.userStore.$allUsers,
        });
      } else if (
        item.lastname &&
        item.lastname.toLowerCase() === value.toLowerCase()
      ) {
        this.setState({
          peopleData: item ? [item] : this.props.userStore.$allUsers,
        });
      }
      return true;
    });
  };

  onChange = async (date: Moment | null, dateSelected: string) => {
    this.getUsersRecordsFilterByDate(dateSelected);
  };
  async getUsersRecordsFilterByDate(dateSelected: string) {
    await this.props.recordStore.getUsersRecordsFilterByDate(dateSelected);
    const res = toJS(this.props.recordStore.$personDataFilterByDate);
    this.setState({ personDataFilterByDate: res, isFilterByDate: true });
  }
  render() {
    const {
      isFilterByDate,
      personRecords,
      peopleData,
      loading,
      isClick,
      personDataFilterByDate,
    } = this.state;
    return (
      <Row justify="start" gutter={[16, 16]}>
        <Col span={24} xs={24} lg={8} xl={6} xxl={5} className="col-1-time-in">
          <Card size="small">
            <Search
              placeholder="Search employee"
              allowClear
              enterButton
              size="large"
              onSearch={this.handleOnSearch}
              onChange={this.handleOnchange}
              style={{ marginBottom: "25px" }}
            />
            <Skeleton loading={loading} avatar active>
              <List
                itemLayout="vertical"
                size="default"
                style={{
                  marginBottom: "25px",
                  overflowY: "auto",
                  maxHeight: "445px",
                }}
                dataSource={peopleData}
                renderItem={(item: any) => (
                  <List.Item key={item.id}>
                    <List.Item.Meta
                      avatar={
                        <Tooltip
                          title="View Profile"
                          color="#1890ff"
                          placement="bottom"
                        >
                          <Link to={`account/profile/${item.id}`}>
                            <Avatar
                              src={
                                item.avatar
                                  ? item.avatar!.url
                                  : "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                              }
                            />
                          </Link>
                        </Tooltip>
                      }
                      title={
                        <Tooltip
                          title="View Record"
                          color="#1890ff"
                          placement="bottom"
                        >
                          <Button
                            data-value={item.id}
                            href={item.href}
                            onClick={this.handleOnclick.bind(this, item.id)}
                            size="small"
                          >
                            {item.firstname} {item.lastname}
                          </Button>
                        </Tooltip>
                      }
                    />
                    {item.content}
                  </List.Item>
                )}
              />
            </Skeleton>
          </Card>
        </Col>
        <Col
          span={24}
          xs={24}
          lg={16}
          xl={18}
          xxl={15}
          className="col-1-time-in"
        >
          <Card size="small" loading={isClick && !!personRecords}>
            <div
              style={{
                borderBottom: "1px solid rgb(240 240 240)",
                paddingBottom: "30px",
              }}
            >
              <DatePicker
                placeholder="Search all employees by Date"
                onChange={this.onChange}
                size="large"
                style={{ width: "32.5%" }}
              />
            </div>
            <div>
              <RecordDtrTable
                data={
                  isFilterByDate
                    ? personDataFilterByDate.sort().reverse()
                    : personRecords.sort().reverse()
                }
                dataSize={8}
              />
            </div>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default Admin;
