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
  Skeleton,
  List, Space, 
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


const { Text, Title } = Typography;

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
        // {...layout}
        layout="horizontal"
        name="basic"
        onFinish={handleUpdateUser}
        // onFinishFailed={onFinishFailed}
      >
        {props.user.firstname ? (
          <div>
            <Form.Item name="name" className="profile-name">
              <Title level={4}>
                {props.user.firstname &&
                  props.user.firstname +
                    " " +
                    (props.user ? props.user.lastname : "")}
              </Title>
              <div>{props.user.quotes && `${"“" + props.user.quotes + "”"}`}</div>
            </Form.Item>
            
            <Form.Item
              className="profile-detail-cont"
              label={<MailOutlined style={{ width: "30px" }} />}
              name="email"
            >
              <span>{props.user.email && props.user.email}</span>
            </Form.Item>

            <Form.Item
              className="profile-detail-cont"
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
              className="profile-detail-cont"
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
              className="profile-detail-cont"
              name="address"
              label={<HomeOutlined style={{ width: "30px" }} />}
            >
              {/* <Input placeholder={props.user.address && props.user.address} /> */}
              <span>{props.user.address && props.user.address}</span>
            </Form.Item>
        </div>
        ):(
          <div>
            <Skeleton.Input  className="skeleton-center"  style={{ width: 160 }} active size='small' />
            <Skeleton.Input  className="skeleton-center" style={{ width: 360 }} active size='small' />
            <br/>
            <br/>
            <Space  className="mb-10">
              <Skeleton.Input  style={{ width: 30, marginRight:5 }} active size='small' />
              <Skeleton.Input  style={{ width: 360 }} active size='small' />
            </Space>
            <Space  className="mb-10">
              <Skeleton.Input  style={{ width: 30, marginRight:5 }} active size='small' />
              <Skeleton.Input  style={{ width: 360 }} active size='small' />
            </Space>
            <Space  className="mb-10">
              <Skeleton.Input  style={{ width: 30, marginRight:5 }} active size='small' />
              <Skeleton.Input  style={{ width: 360 }} active size='small' />
            </Space>

          </div>
        )}
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
