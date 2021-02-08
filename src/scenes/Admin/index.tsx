import "./index.less";
import * as React from "react";
import { Avatar, Col, List, Row, Input } from "antd";
import Stores from "../../stores/storeIdentifier";
import { inject, observer } from "mobx-react";
import IHomeRecordStore from "../indexStore";
import AppConsts from "../../utils/appconst";
import RecordDtrTable from "../../components/RecordDtrTable";

const { Search } = Input;

@inject(Stores.RecordStore, Stores.UserStore)
@observer
class Admin extends React.Component<IHomeRecordStore> {
  state = {
    personData: [],
    peopleData: [],
  };
  async componentDidMount() {
    const allusers = await this.props.userStore.getAllUsers();
    this.setState({ ...this.state, peopleData: allusers });
  }
  handleOnlick = async (id: any, e: any) => {
    await this.props.userStore.getUser(parseInt(id));
    this.setState({
      personData: this.props.userStore!.currentLogin!.recordData,
    });
  };
  searchPerson(nameKey: string, myArray: any) {
    for (var i = 0; i < myArray.length; i++) {
      if (myArray[i].name === nameKey) {
        return myArray[i];
      }
    }
  }
  onSearch = (value: any) => {
    console.log("person data", this.state.peopleData);

    const searchResult = this.state.peopleData.find((x: any) => {
      // console.log('person data', x);
      
      const res = this.searchPerson(value, x);
      // console.log("firstnmam,e", x);
      console.log("res", res);
      // if (x.firstname == value || x.lastname || x.username || x.email) return x;
    });
    console.log("person data", searchResult);

    // this.setState({...this.state, personData: })
  };

  render() {
    const { personData, peopleData } = this.state;
    return (
      <Row>
        <Col span={8} className="col-1-time-in">
          <Search
            placeholder="Search employee"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={this.onSearch}
            style={{ width: 300, marginBottom: "25px"}}
          />
          <List
            itemLayout="vertical"
            size="default"
            pagination={{
              onChange: (page) => {
                console.log(page);
              },
              pageSize: 8,
            }}
            dataSource={peopleData}
            renderItem={(item: any) => (
              <List.Item key={item.id}>
                <List.Item.Meta
                  avatar={
                    <Avatar src={AppConsts.appBaseUrl + item.avatar!.url} />
                  }
                  title={
                    <a
                      data-value={item.id}
                      href={item.href}
                      onClick={this.handleOnlick.bind(this, item.id)}
                    >
                      {item.firstname} {item.lastname}
                    </a>
                  }
                  // description={item.}
                />
                {item.content}
              </List.Item>
            )}
          />
        </Col>
        <Col span={14} className="col-1-time-in">
          <RecordDtrTable data={personData.sort().reverse()} />
        </Col>
      </Row>
    );
  }
}

export default Admin;
