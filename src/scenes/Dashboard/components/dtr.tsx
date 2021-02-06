import {
  Col,
  Button,
  List,
  TimePicker,
  DatePicker,
  Badge,
  Skeleton,
  Typography,
  Table,
  Tag,
  Space,
} from "antd";
import "./index.less";
import moment from "moment";
import { FieldTimeOutlined } from "@ant-design/icons";

import IRecordInput from "../../../services/record/dto/recordInput";

const { Column, ColumnGroup } = Table;

const DTR = ({ data: props, handleOnClick }: any) => {
  // if (!props) {
  //   return (
  //     <Col span={16} className="col-1-time-in">
  //       <Skeleton avatar paragraph={{ rows: 4 }} />
  //     </Col>
  //   );
  // } else {
    console.log('props', props.personRecord);
    const data = [props.personRecord]
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
      
      <Table dataSource={data[0]}>
        <Column title="Last Seen" dataIndex="hoursRendered" key="id"/>
        <Column title="Time In" dataIndex="created_at" key="timein" />
        <Column
          title="Date"
          dataIndex="date"
          key="id"
        />
        <Column
          title="Hours Rendered"
          key="id"
          dataIndex="hoursRendered"
        />
      </Table>
    </Col>
  );
};

export default DTR;
