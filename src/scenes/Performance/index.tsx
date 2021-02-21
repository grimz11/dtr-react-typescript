import "./index.less";
import * as React from "react";
import { Col, Row, Result, Progress } from "antd";
import Stores from "../../stores/storeIdentifier";
import { inject, observer } from "mobx-react";

@inject(Stores.RecordStore, Stores.UserStore)
@observer
class Profile extends React.Component<any> {
  async componentDidMount() {}

  handleOnchange = () => {
    this.setState({
      ...this.state,
      peopleData: this.props.userStore.allUsers,
    });
  };

  render() {
    return (
      <Row>
        <Col style={{ margin: "auto" }}>
          <Result
            status="403"
            title="Coming Soon....."
            subTitle="Sorry, work is still in progress."
            extra={
              <Progress
                type="circle"
                percent={75}
                format={(percent) => `${percent} %`}
              />
            }
          />
        </Col>
      </Row>
    );
  }
}

export default Profile;
