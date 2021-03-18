import "./index.less";
import * as React from "react";
import { Col, Row, Tabs } from "antd";
import Stores from "../../stores/storeIdentifier";
import { inject, observer } from "mobx-react";
import UserStore from "../../stores/userStore";
import utils from "../../utils/utils";

import UpdateFields from "./components/updateFields";
import SecuritySettings from "./components/securitySettings";

const { TabPane } = Tabs;

interface IPropsProfile {
  userStore: UserStore;
  match: any;
}

@inject(Stores.RecordStore, Stores.UserStore)
@observer
class Profile extends React.Component<IPropsProfile, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      user: [],
    };
  }

  render() {
    const { id }: any = this.props.match.params;
    return (
      <Row>
        <Col span={24}>
          <Tabs tabPosition="left" className="account-dark-theme">
            <TabPane tab="Profile" key="1">
              <UpdateFields id={this.props.match.params.id} />
            </TabPane>
            <TabPane
              tab="Security Settings"
              key="2"
              disabled={
                parseInt(id) === parseInt(utils.getCookie("id")) ||
                id === undefined
                  ? false
                  : true
              }
            >
              <SecuritySettings />
            </TabPane>
            <TabPane tab="Display Theme" key="3" disabled={true}></TabPane>
            <TabPane tab="Delete Account" key="4" disabled={true}></TabPane>
          </Tabs>
        </Col>
      </Row>
    );
  }
}

export default Profile;
