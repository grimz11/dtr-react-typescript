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
} from "antd";
import Stores from "../../stores/storeIdentifier";
import { inject, observer } from "mobx-react";
import RecordDtrTable from "../../components/RecordDtrTable";
import { Link } from "react-router-dom";
import RecordStore from "../../stores/recordStore";
import UserStore from "../../stores/userStore";

const { Search } = Input;
const { Meta } = Card;

interface IPropsEmployee {
  recordStore: RecordStore;
  userStore: UserStore;
}

@inject(Stores.RecordStore, Stores.UserStore)
@observer
class Admin extends React.Component<IPropsEmployee> {
  state = {
    personData: [],
    peopleData: [],
    loading: true,
    isClick: true,
  };
  async componentDidMount() {
    const allusers = await this.props.userStore.getAllUsers();
    this.setState({
      ...this.state,
      peopleData: allusers,
      loading: false,
      isClick: false,
    });
    console.log("personData", !!this.state.personData.length);
  }
  handleOnlick = async (id: any, e: any) => {
    this.setState({ isClick: true });
    const res = await this.props.recordStore.getRecord(id);
    this.setState({
      personData: res,
      isClick: false,
    });
    console.log("personData", !!this.state.personData.length);
  };
  handleOnchange = () => {
    this.setState({
      ...this.state,
      peopleData: this.props.userStore.$allUsers,
    });
  };
  handleClickProfile = async (id: any) => {
    await this.props.userStore.getUserProfile(parseInt(id));
    <Link to={`account/profile/${id}`}></Link>;
  };
  handleOnSearch = async (value: any) => {
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

  render() {
    const { personData, peopleData, loading, isClick } = this.state;
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
                            onClick={this.handleOnlick.bind(this, item.id)}
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
          <Card size="small" loading={isClick && !!personData}>
            <RecordDtrTable data={personData.sort().reverse()} dataSize={8} />
          </Card>
        </Col>
      </Row>
    );
  }
}

export default Admin;
