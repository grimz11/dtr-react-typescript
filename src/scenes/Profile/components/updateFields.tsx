import "./updateFields.less";
import * as React from "react";
import {
  Form,
  Input,
  Button,
  Checkbox,
  DatePicker,
  Row,
  Col,
  Typography,
} from "antd";
import Avatar from "antd/lib/avatar/avatar";
import AppConsts from "../../../utils/appconst";
import {
  CalendarOutlined,
  HomeOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
import moment from "moment";

const { Text } = Typography;

const UpdateFields = ({ props, handleUpdateUser }: any) => {
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const onFinish = () => {};

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
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
  console.log("props", props);

  return (
    <Row className="user-form">
      {/* <Col span={12}> */}
      <Form
        {...layout}
        name="basic"
        onFinish={handleUpdateUser}
        // onFinishFailed={onFinishFailed}
      >
        <Form.Item name="name" className="profile-name" label={<MailOutlined style={{ width: "30px" }} />}>
          <span>
            {props.user.firstname &&
              props.user.firstname +
                " " +
                (props.user ? props.user.lastname : "")}
          </span>
        </Form.Item>

        <Form.Item name="quotes" className="profile-quotes"
        label={<MailOutlined style={{ width: "30px" }} />}>
          {/* <Input placeholder={props.user.quotes}/> */}
          
          <span>{props.user.quotes && `${"“" + props.user.quotes + "”"}`}</span>
        </Form.Item>

        <Form.Item
          label={<MailOutlined style={{ width: "30px" }} />}
          name="email"
        >
          <span>{props.user.email && props.user.email}</span>
        </Form.Item>

        <Form.Item
          name="phoneNumber"
          label={<PhoneOutlined style={{ width: "30px" }} />}
        >
          {/* <Input
            placeholder={props.user && props.user.phoneNumber}
            ref={props.addresRef}
          /> */}
          <span>{props.user.phoneNumber && props.user.phoneNumber}</span>
        </Form.Item>

        <Form.Item
          name="birthday"
          label={<CalendarOutlined style={{ width: "30px" }} {...config} />}
        >
          {/* <DatePicker
            defaultValue={
              props.user.birthday
                ? moment(props.user.birthday, "MM-DD-YYYY")
                : moment("2019-06-07")
            }
            format={"MM-DD-YYYY"}
          /> */}
          <span>{props.user.birthday && props.user.birthday}</span>
        </Form.Item>
        <Form.Item
          name="address"
          label={<HomeOutlined style={{ width: "30px" }} />}
        >
          {/* <Input placeholder={props.user.address && props.user.address} /> */}
          <span>{props.user.address && props.user.address}</span>
        </Form.Item>
      </Form>
      {/* </Col> */}
      {/* <Col span={12}>
        <span>
          <Text type="secondary">{props.user.quotes}</Text>
        </span>
      </Col> */}
    </Row>
  );
};

export default UpdateFields;
