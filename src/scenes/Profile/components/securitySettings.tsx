import { Card, List, Row } from "antd";
import { inject, observer } from "mobx-react";
import * as React from "react";
import Stores from "../../../stores/storeIdentifier";

const SecuritySettings = inject(Stores.UserStore)(
  observer(({ userStore }: any) => {
    const { $userProfile } = userStore;
    return (
      <Row className="user-form">
        <Card style={{ width: "95%" }}>
          <List
            itemLayout="vertical"
            dataSource={[$userProfile]}
            renderItem={(item: any) => (
              <List.Item>
                <List.Item.Meta title="Username" description={item.username} />
                <br />
                <div>
                  <span style={{ fontSize: "25px", fontWeight: "bold" }}>
                    Change Password
                  </span>
                </div>
                <br />
                <List.Item.Meta
                  title="Old Password"
                  description="Oh nooo, not available yet 😞."
                />
                <List.Item.Meta
                  title="New Password"
                  description="Oh nooo, not available yet 😞."
                />
                <List.Item.Meta
                  title="Confirm Password"
                  description="Oh nooo, not available yet 😞."
                />
              </List.Item>
            )}
          />
        </Card>
      </Row>
    );
  }),
);

export default SecuritySettings;
