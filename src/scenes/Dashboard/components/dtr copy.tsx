import {
  Col,
  Button,
  List,
  TimePicker,
  DatePicker,
  Badge,
  Skeleton,
  Typography,
  Table, Tag, Space
} from "antd";
import "./index.less";
import moment from "moment";
import { FieldTimeOutlined } from "@ant-design/icons";

import IRecordInput from "../../../services/record/dto/recordInput";

const DTR = ({data:props, handleOnClick}:any) => {

  // if (!props) {
  //   return (
  //     <Col span={16} className="col-1-time-in">
  //       <Skeleton avatar paragraph={{ rows: 4 }} />
  //     </Col>
  //   );
  // } else {
    return (
      <Col span={14} className="col-1-time-in">
        <div>
          <Button
            type={"primary"}
            shape="round"
            icon={<FieldTimeOutlined />}
            size="large"
            danger={props?.timeBtn ? true : false}
            onClick={handleOnClick}
          >
            {props?.timeBtn ? "Time Out" : "Time In"}
          </Button>
        </div>
        <br></br>
        <List
          header={<div>
            <span><Typography.Text mark>Last seen</Typography.Text></span>
            <span><Typography.Text mark> Time In </Typography.Text></span>
            </div>}
          bordered
          itemLayout="horizontal"
          dataSource={props?.personRecord}
          renderItem={(item: IRecordInput) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  item.currentlyWorking ? (
                    <Badge status="success" />
                  ) : (
                    <Badge status="default" />
                  )
                }
                title={moment(item.created_at, "YYYY MM DD hh:mm:ss A Z")
                  .startOf("minutes")
                  .fromNow()}
                description={
                  <div>
                    <TimePicker
                      defaultValue={moment(
                        item.created_at,
                        "YYYY MM DD hh:mm:ss A Z"
                      )}
                      disabled
                    />
                    <DatePicker
                      defaultValue={moment(item.created_at, "YYYY-MM-DD")}
                      disabled
                    />
                    <span> Total Hours: {item.hoursRendered}</span>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </Col>
    );
  }

export default DTR;
