import "./index.less";
import * as React from "react";
import { Avatar, Col, List, Row, Input, Button } from "antd";
import Stores from "../../stores/storeIdentifier";
import { inject, observer } from "mobx-react";
import AppConsts from "../../utils/appconst";
import RecordDtrTable from "../../components/RecordDtrTable";

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
    await this.props.userStore.getUser(parseInt(id));
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

  handleOnSearch = async (value: any) => {
    this.props.userStore.allUsers.find((item: any) => {
      // const res = () => {
      //   if (item.username.toLowerCase() === value.toLowerCase()) {
      //     return item;
      //   } else if (
      //     item.lastname &&
      //     item.lastname.toLowerCase() === value.toLowerCase()
      //   ) {
      //     return item;
      //   }
      // };
      // this.setState({
      //   peopleData: res ? [res] : this.props.userStore.allUsers,
      // });
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
              onChange: (page) => {
              },
              pageSize: 7,
            }}
            dataSource={peopleData}
            renderItem={(item: any) => (
              <List.Item key={item.id}>
                <List.Item.Meta
                  avatar={
                    <Avatar src={AppConsts.appBaseUrl + item.avatar!.url} />
                  }
                  title={
                    <Button
                      data-value={item.id}
                      href={item.href}
                      onClick={this.handleOnlick.bind(this, item.id)} 
                      size="small"
                    >
                      {item.firstname} {item.lastname}
                    </Button>
                  }
                  // description={item.}
                />
                {item.content}
              </List.Item>
            )}
          />
        </Col>
        <Col span={3}/>
        <Col span={14} className="col-1-time-in">
          <RecordDtrTable data={personData.sort().reverse()} dataSize={10}/>
        </Col>
      </Row>
    );
  }
}

export default Admin;
