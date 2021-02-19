import "./index.less";
import * as React from "react";
import { Avatar, Col, Row, Input, Button, Card, Image } from "antd";
import Stores from "../../stores/storeIdentifier";
import { inject, observer } from "mobx-react";
import AppConsts from "../../utils/appconst";
import UserStore from "../../stores/userStore";
import utils from "../../utils/utils";
import ImageUploader from "react-images-upload";

import {
  CalendarOutlined,
  HomeOutlined,
  MailOutlined,
  PhoneOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import moment from "moment";
import UpdateFields from "./components/updateFields";

const { Meta } = Card;

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
      coverPhotoRef: React.createRef(),
      emailRef: React.createRef(),
      phoneRef: React.createRef(),
      birthdayRef: React.createRef(),
      addressRef: React.createRef(),
      fileRef: undefined,
    };
  }

  async componentDidMount() {
    if (this.props.match.params.id) {
      await this.props.userStore.getUserProfile(
        parseInt(this.props.match.params.id)
      );
      this.setState({ ...this.state, user: this.props.userStore.userProfile });
    } else {
      await this.props.userStore.getCurrentLoginUser(
        parseInt(await utils.getCookie("id"))
      );
      this.setState({ ...this.state, user: this.props.userStore.currentLogin });
    }
    console.log("Profile", this.props.userStore.currentLogin);
    console.log("Params", this.props.match.params.id);
  }

  handleChangeCoverPhoto = async (picture: any, successImages: any) => {
    document
      .querySelector(".coverPhoto")
      ?.setAttribute("src", successImages[0]);
    console.log("successImages", successImages[0]);
    console.log("picture", picture);

    const name = successImages[0].split(";")[1];
    const formData = new FormData();

    formData.append("files", picture[0]);
    formData.append("field", "image");
    formData.append("ref", "user");
    formData.append("refId", "3");

    await this.props.userStore.uploadImage(formData);
  };
  handleChangeAvatar = (picture: any, successImages: any) => {
    document
      .querySelector(".avatar img")
      ?.setAttribute("src", successImages[0]);
  };
  handleUpdateUser = async (props: any) => {
    const { emailRef, phoneRef, birthdayRef, addressRef } = this.state;
    console.log("addressRef", addressRef);

    // await this.props.userStore.updateUser(parseInt(utils.getCookie("id")), {
    //   email: emailRef?.current.state?.value,
    //   phoneNumber: phoneRef?.current.state?.value,
    //   address: addressRef?.current.state?.value,
    // });
  };
  render() {
    const { user }: any = this.state;
    return (
      <Row>
        <Col span={12}>
          <Card
            hoverable
            style={{ width: "95%" }}
            cover={
              user.avatar ? (
                <Avatar style={{ height: 220, width: 220 }} className="coverPhoto">
                  <Image
                    style={{ height: 220, width: 220, borderRadius: "100%" }}
                    src={
                      user.avatar &&
                      AppConsts.appBaseUrl + user.avatar?.url
                    }
                    
                  />
                </Avatar>
              ) : (
                <Avatar style={{ height: 220, width: 220 }} className="coverPhoto">
                <Image
                  style={{ height: 220, width: 220, borderRadius: "100%" }}
                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                  
                />
              </Avatar>
              )
            }
            actions={[
              <Button
                type="primary"
                icon={<SaveOutlined />}
                size="large"
                onClick={this.handleUpdateUser}
              >
                Edit Information
              </Button>,
            ]}
          >
            <UpdateFields
              props={this.state}
              handleUpdateUser={this.handleUpdateUser}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card hoverable style={{ width: "100%" }}>
            <Meta
              // avatar={<Avatar src={AppConsts.appBaseUrl + user.avatar?.url} />}
              title={
                user.firstname &&
                user.firstname + " " + (user.lastname ? user.lastname : "")
              }
              description="Hello from hyperstacks"
            />
          </Card>
        </Col>
      </Row>
    );
  }
}

export default Profile;
