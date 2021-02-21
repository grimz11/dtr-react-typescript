import "./index.less";
import * as React from "react";
import { Col, Row, Card, Image } from "antd";
import Stores from "../../stores/storeIdentifier";
import { inject, observer } from "mobx-react";
import AppConsts from "../../utils/appconst";
import UserStore from "../../stores/userStore";
import utils from "../../utils/utils";
import ImageUploader from "react-images-upload";

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
    };
  }

  async componentDidMount() {
    // if (this.props.match.params.id) {
    //   await this.props.userStore.getUserProfile(
    //     parseInt(this.props.match.params.id)
    //   );
    //   this.setState({ ...this.state, user: this.props.userStore.$userProfile });
    // } else {
    //   await this.props.userStore.getCurrentLoginUser(
    //     parseInt(await utils.getCookie("id"))
    //   );
    //   this.setState({
    //     ...this.state,
    //     user: this.props.userStore.$currentLogin,
    //   });
    // }
    // console.log("Profile", this.props.userStore.$currentLogin);
    if(this.props.match.params.id === undefined){
      console.log('undifined');
      
    }
    console.log("Params", this.props.match.params.id);
  }

  // handleChangeCoverPhoto = async (picture: any, successImages: any) => {
  //   document
  //     .querySelector(".coverPhoto")
  //     ?.setAttribute("src", successImages[0]);
  //   console.log("successImages", successImages[0]);
  //   console.log("picture", picture);

  //   const name = successImages[0].split(";")[1];
  //   const formData = new FormData();

  //   formData.append("files", picture[0]);
  //   formData.append("field", "image");
  //   formData.append("ref", "user");
  //   formData.append("refId", "3");

  //   await this.props.userStore.uploadImage(formData);
  // };
  // handleChangeAvatar = (picture: any, successImages: any) => {
  //   document
  //     .querySelector(".avatar img")
  //     ?.setAttribute("src", successImages[0]);
  // };

  render() {
    const { user }: any = this.state;
    return (
      <Row>
        <Col span={12}>
          <UpdateFields id={this.props.match.params.id} />
        </Col>
        <Col span={12}>
          <Card hoverable style={{ width: "100%" }}>
            {/* <Meta
              title={
                user.firstname &&
                user.firstname + " " + (user.lastname ? user.lastname : "")
              }
              description="Hello from hyperstacks"
            /> */}
          </Card>
        </Col>
      </Row>
    );
  }
}

export default Profile;
