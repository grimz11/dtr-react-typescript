import "./updateFields.less";
import * as React from "react";
import {
  Form,
  Input,
  Button,
  DatePicker,
  Row,
  Typography,
  Skeleton,
  Space,
  Card,
  Image,
  Progress,
  Avatar,
} from "antd";
import {
  CalendarOutlined,
  HomeOutlined,
  MailOutlined,
  PhoneOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
import moment from "moment";
import { inject, observer } from "mobx-react";
import Stores from "../../../stores/storeIdentifier";
import utils from "../../../utils/utils";
import ImageUploader from "react-images-upload";
import AppConsts from "../../../utils/appconst";
import axios from "axios";
import ProgressModal from "../../../components/Modal";
import createAvatar from "../../../utils/createAvatar";

const { Text, Title } = Typography;

const UpdateFields = inject(Stores.UserStore)(
  observer(({ userStore, id }: any) => {
    const [active, setActive] = React.useState(false);
    const [user, setUser] = React.useState(userStore.$userProfile);
    const [form] = Form.useForm();
    const [avatar, setAvatar] = React.useState("");
    const [avatarChanged, setAvatarChanged] = React.useState(false);
    const [percent, setPercent] = React.useState(0);
    const [modalStatus, setModalStatus] = React.useState(false);

    React.useEffect(() => {
      form.resetFields();
      const res = async () => {
        if (id) {
          await userStore.getUserProfile(parseInt(id));
          setUser(userStore.$userProfile);
        } else {
          await userStore.getUserProfile(parseInt(utils.getCookie("id")));
          setUser(userStore.$userProfile);
        }
      };
      res();
      return () => {
        setUser({});
        form.resetFields();
      };
    }, [active, modalStatus]);

    const onChangeBirthday = async (date: any, dateString: string) => {
      const newBday = moment(dateString).format("YYYY-MM-DD");
      setUser({ ...user, birthday: newBday });
    };

    const onFinish = async (values: any) => {
      if (active) {
        avatarChanged && setModalStatus(true);
        await userStore.updateUser(parseInt(id ? id : utils.getCookie("id")), {
          email: values.email,
          phoneNumber: values.phoneNumber,
          address: values.address,
          birthday: user.birthday, //moment(values.birthday).format("YYYY-MM-DD"),
          department: values.department,
          quotes: values.quotes,
          firstname: values.fullname[0],
          lastname: values.fullname[1],
        });
        await userStore.getUserProfile(
          parseInt(id ? id : utils.getCookie("id")),
        );
        avatarChanged && (await uploadImage());
        setActive(false);
      }
    };
    const calculatePercentProgress = (value: any, total: any) =>
      Math.round((value / total) * 100);

    const uploadImage = async () => {
      const formData = new FormData();
      formData.append("files", avatar);
      formData.append("ref", "user");
      formData.append("refId", utils.getCookie("id"));
      formData.append("field", "avatar");
      formData.append("source", "users-permissions");

      await axios({
        method: "POST",
        url: `${AppConsts.appBaseUrl}/upload`,
        data: formData,
        onUploadProgress: (progress) =>
          setPercent(calculatePercentProgress(progress.loaded, progress.total)),
        headers: {
          Authorization: "Bearer " + utils.getCookie("access_token"),
        },
      });
    };

    const onChangeAvatar = async (file: any, localAvatar: any) => {
      document.querySelector(".avatar")?.setAttribute("src", localAvatar[0]);
      setAvatar(file[0]);
      setAvatarChanged(true);
    };

    const config = {
      rules: [
        {
          type: "object" as const,
          required: true,
          message: "Please select time!",
        },
      ],
    };
    return (
      <Row className="user-form">
        <Card
          style={{ width: "95%" }}
          cover={
            user ? (
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "1.5rem",
                  }}
                >
                  {user.avatar ? (
                    <Image
                      className="avatar"
                      style={{ height: 220, width: 220, borderRadius: "100%" }}
                      src={user.avatar.url}
                    />
                  ) : (
                    <Avatar
                      style={{
                        backgroundColor: `${
                          createAvatar(`${user.firstname} ${user.lastname}`)
                            .color
                        }`,
                        color: "#fff",
                        height: 200,
                        width: 210,
                      }}
                    >
                      <p style={{ margin: "revert", fontSize: "60px" }}>
                        {
                          createAvatar(`${user.firstname} ${user.lastname}`)
                            .name
                        }
                      </p>
                    </Avatar>
                  )}
                </div>
                {active && (
                  <div>
                    <ImageUploader
                      withIcon={false}
                      maxFileSize={5242880}
                      imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                      onChange={onChangeAvatar}
                      label="Max file size: 5mb, accepted: jpg | gif | png "
                      singleImage={true}
                      withPreview
                    />
                  </div>
                )}
              </>
            ) : (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Image
                  style={{ height: 220, width: 220, borderRadius: "100%" }}
                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                />
              </div>
            )
          }
        >
          <Form
            layout="horizontal"
            name="basic"
            form={form}
            onFinish={onFinish}
          >
            {user.firstname ? (
              <div>
                <Form.Item
                  name="fullname"
                  className="profile-name"
                  initialValue={
                    user.firstname && [user.firstname, user.lastname]
                  }
                >
                  <Title level={4} disabled={active ? true : false}>
                    {user.firstname &&
                      user.firstname + " " + (user ? user.lastname : "")}
                  </Title>
                  <div>
                    {active ? (
                      <Form.Item
                        name="quotes"
                        className="quotesEdit"
                        initialValue={user.quotes && user.quotes}
                      >
                        <TextArea
                          placeholder={user.quotes}
                          autoSize
                          maxLength={150}
                          allowClear
                        />
                      </Form.Item>
                    ) : (
                      user.quotes && `${"“" + user.quotes + "”"}`
                    )}
                  </div>
                </Form.Item>

                <Form.Item
                  className={`${active ? "emailEdit" : "profile-detail-cont"} `}
                  label={<MailOutlined style={{ width: "30px" }} />}
                  name="email"
                  initialValue={user.email && user.email}
                >
                  <span>
                    {user.email ? (
                      <Text disabled={active ? true : false}>{user.email}</Text>
                    ) : (
                      "n/a"
                    )}
                  </span>
                </Form.Item>

                <Form.Item
                  className="profile-detail-cont"
                  name="phoneNumber"
                  label={<PhoneOutlined style={{ width: "30px" }} />}
                  initialValue={user.phoneNumber && user.phoneNumber}
                >
                  <span>
                    {active ? (
                      <Input
                        defaultValue={user.phoneNumber}
                        placeholder={user.phoneNumber}
                        className="editFields"
                      />
                    ) : user.phoneNumber ? (
                      user.phoneNumber
                    ) : (
                      "n/a"
                    )}
                  </span>
                </Form.Item>

                <Form.Item
                  className="profile-detail-cont"
                  name="birthday"
                  label={
                    <CalendarOutlined style={{ width: "30px" }} {...config} />
                  }
                  initialValue={user.birthday && user.birthday}
                >
                  <span>
                    {active ? (
                      <DatePicker
                        className="editFields"
                        defaultValue={
                          user!.birthday && moment(user.birthday, "YYYY-MM-DD")
                        }
                        format={"MM-DD-YYYY"}
                        style={{ width: "100%" }}
                        onChange={onChangeBirthday}
                      />
                    ) : user.birthday ? (
                      moment(user.birthday).format("MMMM DD, YYYY")
                    ) : (
                      "n/a"
                    )}
                  </span>
                </Form.Item>
                <Form.Item
                  className="profile-detail-cont"
                  name="address"
                  label={<HomeOutlined style={{ width: "30px" }} />}
                  initialValue={user.address && user.address}
                >
                  <span>
                    {active ? (
                      <Input
                        defaultValue={user.address}
                        placeholder={user.address}
                        className="editFields"
                      />
                    ) : user.address ? (
                      user.address
                    ) : (
                      "n/a"
                    )}
                  </span>
                </Form.Item>
                <Form.Item
                  className="profile-detail-cont"
                  name="department"
                  label={<TeamOutlined style={{ width: "30px" }} />}
                  initialValue={user.department && user.department}
                >
                  <span>
                    {active ? (
                      <Input
                        defaultValue={user.department}
                        placeholder={user.department}
                        className="editFields"
                      />
                    ) : user.department ? (
                      user.department
                    ) : (
                      "n/a"
                    )}
                  </span>
                </Form.Item>
                <br />
                <div className="submitBtns">
                  {!active &&
                    (parseInt(id) === parseInt(utils.getCookie("id")) ||
                      id === undefined) && (
                      <Button
                        type="primary"
                        onClick={() => setActive(true)}
                        size="large"
                      >
                        Edit Information
                      </Button>
                    )}
                  {active && (
                    <>
                      <Button type="primary" htmlType="submit" size="large">
                        Submit
                      </Button>
                      <Button
                        type="primary"
                        danger
                        onClick={() => setActive(false)}
                        size="large"
                      >
                        Cancel
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div>
                <Skeleton.Input
                  className="skeleton-center"
                  style={{ width: 160 }}
                  active
                  size="small"
                />
                <Skeleton.Input
                  className="skeleton-center"
                  style={{ width: 360 }}
                  active
                  size="small"
                />
                <br />
                <br />
                <Space className="mb-10">
                  <Skeleton.Input
                    style={{ width: 30, marginRight: 5 }}
                    active
                    size="small"
                  />
                  <Skeleton.Input style={{ width: 360 }} active size="small" />
                </Space>
                <Space className="mb-10">
                  <Skeleton.Input
                    style={{ width: 30, marginRight: 5 }}
                    active
                    size="small"
                  />
                  <Skeleton.Input style={{ width: 360 }} active size="small" />
                </Space>
                <Space className="mb-10">
                  <Skeleton.Input
                    style={{ width: 30, marginRight: 5 }}
                    active
                    size="small"
                  />
                  <Skeleton.Input style={{ width: 360 }} active size="small" />
                </Space>
                <Space className="mb-10">
                  <Skeleton.Input
                    style={{ width: 30, marginRight: 5 }}
                    active
                    size="small"
                  />
                  <Skeleton.Input style={{ width: 360 }} active size="small" />
                </Space>
              </div>
            )}
          </Form>
        </Card>
        {modalStatus && <ProgressModal percent={percent} />}
      </Row>
    );
  }),
);

export default UpdateFields;
