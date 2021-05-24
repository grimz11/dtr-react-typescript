import "./index.less";

import * as React from "react";

import { Avatar, Col, Dropdown, Menu, Row } from "antd";

import { Link } from "react-router-dom";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import Stores from "../../stores/storeIdentifier";
import { inject, observer } from "mobx-react";
import UserStore from "../../stores/userStore";
import utils from "../../utils/utils";
import RecordStore from "../../stores/recordStore";
import { toJS } from "mobx";
import createAvatar from "../../utils/createAvatar";

export interface ILocalProps {
  collapsed?: any;
  toggle?: any;
  userStore?: UserStore;
  recordStore?: RecordStore;
}

const userDropdownMenu = (
  <Menu>
    <Menu.Item key="2">
      <Link to="/logout">
        <LogoutOutlined />
        <span>Logout</span>
      </Link>
    </Menu.Item>
  </Menu>
);

@inject(Stores.UserStore, Stores.RecordStore)
@observer
export class Header extends React.Component<ILocalProps> {
  state = {
    avatar: "",
    firstname: "",
    lastname: "",
  };

  async componentDidMount() {
    await this.props.userStore?.getUserProfile(
      parseInt(await utils.getCookie("id")),
    );
    const userProfile: any = toJS(this.props.userStore?.$userProfile);
    this.setState({
      ...this.state,
      avatar: userProfile?.avatar?.url,
      firstname: userProfile && `${userProfile.firstname}`,
      lastname: userProfile && `${userProfile.lastname}`,
    });
  }

  render() {
    const { avatar, firstname, lastname } = this.state;
    return (
      <Row className={"header-container"}>
        <Col style={{ textAlign: "left" }} span={12}>
          {this.props.collapsed ? (
            <MenuUnfoldOutlined
              className="trigger"
              onClick={this.props.toggle}
            />
          ) : (
            <MenuFoldOutlined className="trigger" onClick={this.props.toggle} />
          )}
        </Col>
        <Col
          style={{ padding: "0px 15px 0px 15px", textAlign: "right" }}
          span={12}
        >
          <Dropdown overlay={userDropdownMenu} trigger={["click"]}>
            <span>
              <span className="user-name">{firstname}</span>
              <Avatar
                src={avatar && avatar}
                style={{
                  backgroundColor: `${
                    createAvatar(`${firstname} ${lastname}`).color
                  }`,
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                {createAvatar(`${firstname} ${lastname}`).name}
              </Avatar>
            </span>
          </Dropdown>
        </Col>
      </Row>
    );
  }
}

export default Header;
