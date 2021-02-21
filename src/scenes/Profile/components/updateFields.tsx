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

const { Text, Title } = Typography;

const UpdateFields = inject(Stores.UserStore)(
  observer(({ userStore, id }: any) => {
    const [active, setActive] = React.useState(false);
    const [user, setUser] = React.useState(userStore.$userProfile);
    const [form] = Form.useForm();

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
    }, [active, form, id, userStore]);

    const onFinish = async (values: any) => {
      if (active) {
        await userStore.updateUser(parseInt(id ? id : utils.getCookie("id")), {
          email: values.email,
          phoneNumber: values.phoneNumber,
          address: values.address,
          birthday: moment(values.birthday).format("YYYY-MM-DD"),
          department: values.department,
          quotes: values.quotes,
          firstname: values.fullname[0],
          lastname: values.fullname[1],
        });
        await userStore.getUserProfile(
          parseInt(id ? id : utils.getCookie("id")),
        );
        setActive(false);
      }
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
    console.log("id", id);
    console.log("UserStore", userStore);

    return (
      <Row className="user-form">
        <Card
          hoverable
          style={{ width: "95%" }}
          cover={
            user.avatar ? (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Image
                  style={{ height: 220, width: 220, borderRadius: "100%" }}
                  src={user.avatar && user.avatar?.url}
                />
              </div>
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
      </Row>
    );
  }),
);

export default UpdateFields;
