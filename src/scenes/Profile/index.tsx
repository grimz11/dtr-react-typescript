import "./index.less";
import * as React from "react";
import { Avatar, Col, Row, Input, Button, Card, Image } from "antd";
import Stores from "../../stores/storeIdentifier";
import { inject, observer } from "mobx-react";
import AppConsts from "../../utils/appconst";
import RecordDtrTable from "../../components/RecordDtrTable";
import UserStore from "../../stores/userStore";
import utils from "../../utils/utils";
import IUserOutput from "../../services/user/dto/userOutput";
import HyperstacksImg from "../../assets/images/hyperstacks.png";
import ImageUploader from "react-images-upload";

import {
  CalendarOutlined,
  HomeOutlined,
  MailOutlined,
  PhoneOutlined,
  SaveOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import moment from "moment";

const { Meta } = Card;

interface IPropsProfile {
  userStore: UserStore;
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
    };
  }

  async componentDidMount() {
    await this.props.userStore.getUser(parseInt(utils.getCookie("id")));
    console.log("Profile", this.props.userStore.currentLogin);
    this.setState({ ...this.state, user: this.props.userStore.currentLogin });
  }

  handleChangeCoverPhoto = async (picture: any, successImages: any) => {
    document
      .querySelector(".coverPhoto")
      ?.setAttribute("src", successImages[0]);
    // console.log("el", successImages[0].split(";"));
    const memeType = successImages[0].split(";")[0];
    const name = successImages[0].split(";")[1];
    const base = successImages[0].split(";")[2];
    await this.props.userStore.updateUser(parseInt(utils.getCookie("id")), {
      memeType,
      name,
      base,
    });

    console.log("memeType", memeType);
    console.log("successImages", name);
    console.log("base", base);
  };
  handleChangeAvatar = (picture: any, successImages: any) => {
    document
      .querySelector(".avatar img")
      ?.setAttribute("src", successImages[0]);
  };
  handleUpdateUser = async () => {
    const {emailRef, phoneRef, birthdayRef,addressRef } = this.state;
    // console.log('emailRef', this.state?.emailRef?.current.state?.value);
    // console.log('phoneRef', this.state?.phoneRef?.current.state?.value);
    // console.log('birthdayRef', this.state?.birthdayRef?.current.state?.value);
    // console.log('addressRef', this.state?.addressRef?.current.state?.value);
    await this.props.userStore.updateUser(parseInt(utils.getCookie("id")), {
      email: emailRef?.current.state?.value,
      phoneNumber: phoneRef?.current.state?.value,
      address: addressRef?.current.state?.value
    });
    
  }
  render() {
    const { user }: any = this.state;
    return (
      <Row>
        <Col span={12}>
          <Card
            hoverable
            style={{ width: "95%" }}
            cover={
              user.coverPhoto ? (
                <Image
                  style={{ width: "100%" }}
                  height={450}
                  src={
                    user.coverPhoto &&
                    AppConsts.appBaseUrl + user.coverPhoto?.url
                  }
                  className="coverPhoto"
                />
              ) : (
                ""
              )
            }
            actions={[
              <Button type="primary" icon={<SaveOutlined />} size="large" onClick={this.handleUpdateUser}>
                Update Information
              </Button>,
              // <ImageUploader
              //   withIcon={false}
              //   buttonText="Change Avatar"
              //   onChange={this.handleChangeAvatar}
              //   imgExtension={[".jpg", ".gif", ".png", ".gif"]}
              //   maxFileSize={5242880}
              // />,
              // <ImageUploader
              //   withIcon={false}
              //   buttonText="Change Cover Photo"
              //   onChange={this.handleChangeCoverPhoto}
              //   imgExtension={[".jpg", ".gif", ".png", ".gif"]}
              //   maxFileSize={5242880}
              // />,
            ]}
          >
            <Meta />
            <Meta
              avatar={
                <Avatar
                  src={AppConsts.appBaseUrl + user.avatar?.url}
                  className="avatar"
                />
              }
              title={
                user.firstname &&
                user.firstname + " " + (user.lastname ? user.lastname : "")
              }
            />
            <br></br>
            <Meta
              avatar={<MailOutlined style={{ width: "30px" }} />}
              title={
                <Input
                  placeholder={user.email && user.email}
                  ref={this.state?.emailRef}
                />
              }
            />
            <br></br>
            <Meta
              avatar={<PhoneOutlined style={{ width: "30px" }} />}
              title={
                <Input placeholder={user.phoneNumber && user.phoneNumber} ref={this.state?.phoneRef}/>
              }
              
            />
            <br></br>
            <Meta
              avatar={<CalendarOutlined style={{ width: "30px" }} />}
              title={
                <Input
                  placeholder={
                    user.birthday &&
                    moment(
                      user.birthday && user.birthday,
                      "YYYY MM DD hh:mm:ss A Z"
                    ).format("MM-DD-YYYY")
                  }
                  ref={this.state?.birthdayRef}
                />
              }
            />
            <br></br>
            <Meta
              avatar={<HomeOutlined style={{ width: "30px" }} />}
              title={<Input placeholder={user.address && user.address} ref={this.state?.addressRef}/>}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card hoverable style={{ width: "100%" }}>
            <Meta
              avatar={<Avatar src={AppConsts.appBaseUrl + user.avatar?.url} />}
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
