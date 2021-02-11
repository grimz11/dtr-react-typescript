import "./index.less";
import * as React from "react";
import { Avatar, Col, List, Row, Input, Button } from "antd";
import Stores from "../../stores/storeIdentifier";
import { inject, observer } from "mobx-react";
import AppConsts from "../../utils/appconst";
import RecordDtrTable from "../../components/RecordDtrTable";
import { IdcardFilled, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Search } = Input;

@inject(Stores.RecordStore, Stores.UserStore)
@observer
class Admin extends React.Component<any> {
  state = {
    personData: [],
    peopleData: [],
  };
  async componentDidMount() {
    const allusers = await this.props.userStore.getAllUsers();
    this.setState({
      ...this.state,
      peopleData: allusers,
    });
  }
  handleOnlick = async (id: any, e: any) => {
    await this.props.userStore.getCurrentLoginUser(parseInt(id));
    this.setState({
      personData: this.props.userStore!.currentLogin!.recordData,
    });
  };
  handleOnchange = () => {
    this.setState({
      ...this.state,
      peopleData: this.props.userStore.allUsers,
    });
  };
  handleClickProfile = async (id: any) => {
    const user = await this.props.userStore.getUserProfile(parseInt(id));
    // console.log("profile click", user);
    <Link to={`profile/${id}`}></Link>;
  };
  handleOnSearch = async (value: any) => {
    this.props.userStore.allUsers.find((item: any) => {
      if (item.username.toLowerCase() === value.toLowerCase()) {
        this.setState({
          peopleData: item ? [item] : this.props.userStore.allUsers,
        });
      } else if (
        item.lastname &&
        item.lastname.toLowerCase() === value.toLowerCase()
      ) {
        this.setState({
          peopleData: item ? [item] : this.props.userStore.allUsers,
        });
      }
    });
  };

  render() {
    const { personData, peopleData } = this.state;
    return (
      <Row>
        <Col span={5} className="col-1-time-in">
          <Search
            placeholder="Search employee"
            allowClear
            enterButton
            size="large"
            onSearch={this.handleOnSearch}
            onChange={this.handleOnchange}
            style={{ width: 300, marginBottom: "25px" }}
          />
          <List
            itemLayout="vertical"
            size="default"
            pagination={{
              onChange: (page) => {},
              pageSize: 7,
            }}
            dataSource={peopleData}
            renderItem={(item: any) => (
              <List.Item key={item.id}>
                <List.Item.Meta
                  avatar={
                    // <span
                    //   style={{ cursor: "pointer" }}
                    //   onClick={this.handleClickProfile.bind(this, item.id)}
                    // >
                    <Link to={`profile/${item.id}`}>
                      <Avatar src={AppConsts.appBaseUrl + item.avatar!.url} />
                    </Link>

                    // </span>
                  }
                  title={
                    <span>
                      <Button
                        data-value={item.id}
                        href={item.href}
                        onClick={this.handleOnlick.bind(this, item.id)}
                        size="small"
                      >
                        {item.firstname} {item.lastname}
                      </Button>
                      {/* <Button icon={<IdcardFilled />}></Button> */}

                      {/* <Button
                      data-value={item.id}
                      href={item.href}
                      onClick={this.handleOnlick.bind(this, item.id)} 
                      size="small"
                    >
                      {item.firstname} {item.lastname}
                    </Button> */}
                    </span>
                  }
                  // description={item.}
                />
                {item.content}
              </List.Item>
            )}
          />
        </Col>
        <Col span={3} />
        <Col span={14} className="col-1-time-in">
          <RecordDtrTable data={personData.sort().reverse()} dataSize={10} />
        </Col>
      </Row>
    );
  }
}

export default Admin;
